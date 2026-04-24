/**
 * 存量图片迁移：扫全库 questions.pivot/explanation，把命中白名单域名的图片
 * 下载到 Supabase Storage 并替换 Markdown 内的 URL。
 *
 * 幂等：
 *   - 图片 key 由 sha256(origUrl) 决定，重复迁移会命中 upsert，不会复制
 *   - 同一行的 Markdown 再次跑时已不含白名单域名，UPDATE 会因为 text 无变化被 no-op 掉
 *
 * 用法：
 *   node scripts/migrate-images.mjs --dry-run      # 仅打印待处理统计
 *   node scripts/migrate-images.mjs                # 实际执行
 *   node scripts/migrate-images.mjs --limit 50     # 只处理前 50 条（快速冒烟）
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { createImageMirror, shouldMirror } from "../lib/image-mirror.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
for (const line of readFileSync(join(__dirname, "..", ".env.local"), "utf-8").split(/\r?\n/)) {
  const m = line.match(/^\s*([^#=\s][^=]*?)\s*=\s*(.*)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const LIMIT = (() => {
  const i = args.indexOf("--limit");
  return i >= 0 ? Number(args[i + 1]) : 0;
})();

const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
if (!url || !serviceKey) {
  console.error("❌ 缺少 NEXT_PUBLIC_SUPABASE_URL 或 SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const mirror = createImageMirror({
  supabase,
  bucket: process.env.IMAGE_BUCKET || "question-images",
});

// 分页拉取所有行：PostgREST 单次最多 1000 行
const CHUNK = 1000;
async function fetchAllQuestions() {
  const rows = [];
  let from = 0;
  for (;;) {
    const { data, error } = await supabase
      .from("questions")
      .select("exercise_key, pivot, explanation")
      .range(from, from + CHUNK - 1);
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) break;
    rows.push(...data);
    if (data.length < CHUNK) break;
    from += CHUNK;
  }
  return rows;
}

/** 抽出文本中所有图片 URL（MD + HTML img） */
function extractImageUrls(md) {
  if (!md) return [];
  const urls = new Set();
  for (const m of md.matchAll(/!\[[^\]]*\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)/g)) {
    urls.add(m[1]);
  }
  for (const m of md.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)) {
    urls.add(m[1]);
  }
  return [...urls];
}

console.log(`========================================`);
console.log(`  存量图片迁移 ${DRY_RUN ? "(dry-run)" : ""}`);
console.log(`========================================\n`);

const allRows = await fetchAllQuestions();
console.log(`扫全库 questions：${allRows.length} 条`);

// 预筛：有白名单域名图片的行
const todo = [];
let totalImgUrls = 0;
const urlSet = new Set();
for (const r of allRows) {
  const pivotUrls = extractImageUrls(r.pivot).filter(shouldMirror);
  const explainUrls = extractImageUrls(r.explanation).filter(shouldMirror);
  if (pivotUrls.length === 0 && explainUrls.length === 0) continue;
  todo.push(r);
  for (const u of pivotUrls) urlSet.add(u);
  for (const u of explainUrls) urlSet.add(u);
  totalImgUrls += pivotUrls.length + explainUrls.length;
}

console.log(`其中需要处理：${todo.length} 条题目，涉及 ${urlSet.size} 张去重后图片（${totalImgUrls} 次引用）\n`);

if (DRY_RUN) {
  console.log("--dry-run：不执行下载与写回，退出。");
  process.exit(0);
}

const scope = LIMIT > 0 ? todo.slice(0, LIMIT) : todo;
console.log(`即将处理：${scope.length} 条${LIMIT > 0 ? `（--limit ${LIMIT}）` : ""}\n`);

let ok = 0;
let updated = 0;
let failed = 0;
const failures = [];

for (let i = 0; i < scope.length; i++) {
  const row = scope[i];
  const tag = `[${i + 1}/${scope.length}] ${row.exercise_key}`;
  try {
    const { text: newPivot, failed: f1 } = await mirror.rewriteMarkdown(row.pivot);
    const { text: newExplain, failed: f2 } = await mirror.rewriteMarkdown(row.explanation);
    const changed = newPivot !== row.pivot || newExplain !== row.explanation;
    if (changed) {
      const { error } = await supabase
        .from("questions")
        .update({ pivot: newPivot, explanation: newExplain })
        .eq("exercise_key", row.exercise_key);
      if (error) throw new Error(error.message);
      updated++;
      console.log(`${tag} ✅ updated`);
    } else {
      console.log(`${tag} ⏭  no-change`);
    }
    ok++;
    if (f1.length || f2.length) {
      failures.push({ key: row.exercise_key, failed: [...f1, ...f2] });
    }
  } catch (err) {
    failed++;
    console.log(`${tag} ❌ ${err.message}`);
    failures.push({ key: row.exercise_key, failed: [{ reason: err.message }] });
  }
}

console.log(`\n========================================`);
console.log(`  处理完成：ok=${ok} updated=${updated} failed=${failed}`);
if (failures.length > 0) {
  const byReason = new Map();
  for (const f of failures) {
    for (const item of f.failed) {
      const k = item.reason || "unknown";
      byReason.set(k, (byReason.get(k) ?? 0) + 1);
    }
  }
  console.log(`\n  图片镜像失败（按原因聚合）：`);
  for (const [reason, n] of [...byReason.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`    ${String(n).padStart(5)}  ${reason}`);
  }
}
console.log(`========================================`);
