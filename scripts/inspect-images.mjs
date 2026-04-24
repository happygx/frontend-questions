/**
 * 图片巡检工具。
 *
 *   - 扫全库 questions.pivot/explanation，抽出所有图片 URL
 *   - 统计域名分布
 *   - 可选 HEAD 探活（带 Referer 豁免 ecool 防盗链），输出 bad-urls.json
 *
 * 用法：
 *   node scripts/inspect-images.mjs                # 只打印域名分布
 *   node scripts/inspect-images.mjs --check        # 额外做 HEAD 探活
 *   node scripts/inspect-images.mjs --check --concurrency 10
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
for (const line of readFileSync(join(__dirname, "..", ".env.local"), "utf-8").split(/\r?\n/)) {
  const m = line.match(/^\s*([^#=\s][^=]*?)\s*=\s*(.*)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}

const args = process.argv.slice(2);
const CHECK = args.includes("--check");
const CONCURRENCY = (() => {
  const i = args.indexOf("--concurrency");
  return i >= 0 ? Math.max(1, Number(args[i + 1])) : 8;
})();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } },
);

const REFERER_MAP = { "static.ecool.fun": "https://fe.ecool.fun/" };

const CHUNK = 1000;
async function fetchAll() {
  const rows = [];
  let from = 0;
  for (;;) {
    const { data, error } = await supabase
      .from("questions")
      .select("exercise_key, pivot, explanation")
      .range(from, from + CHUNK - 1);
    if (error) throw new Error(error.message);
    if (!data?.length) break;
    rows.push(...data);
    if (data.length < CHUNK) break;
    from += CHUNK;
  }
  return rows;
}

const MD_IMG = /!\[[^\]]*\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)/g;
const HTML_IMG = /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;

const rows = await fetchAll();
const refs = []; // { url, key, field }
for (const r of rows) {
  for (const m of (r.pivot ?? "").matchAll(MD_IMG)) refs.push({ url: m[1], key: r.exercise_key, field: "pivot" });
  for (const m of (r.pivot ?? "").matchAll(HTML_IMG)) refs.push({ url: m[1], key: r.exercise_key, field: "pivot" });
  for (const m of (r.explanation ?? "").matchAll(MD_IMG)) refs.push({ url: m[1], key: r.exercise_key, field: "explanation" });
  for (const m of (r.explanation ?? "").matchAll(HTML_IMG)) refs.push({ url: m[1], key: r.exercise_key, field: "explanation" });
}

const uniq = new Map(); // url -> { hosts, refs:[] }
for (const r of refs) {
  let host = "(invalid)";
  try { host = new URL(r.url).host; } catch {}
  if (!uniq.has(r.url)) uniq.set(r.url, { host, refs: [] });
  uniq.get(r.url).refs.push(r);
}

const hostStats = new Map();
for (const { host, refs } of uniq.values()) {
  hostStats.set(host, (hostStats.get(host) ?? 0) + refs.length);
}

console.log(`扫题目 ${rows.length} 条，发现图片引用 ${refs.length} 次，去重 URL ${uniq.size} 个\n`);
console.log("域名分布（按引用数）：");
for (const [h, n] of [...hostStats.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(5)}  ${h}`);
}

if (!CHECK) {
  console.log("\n如需 HEAD 探活，加 --check 参数。");
  process.exit(0);
}

console.log(`\n开始 HEAD 探活（并发 ${CONCURRENCY}）...\n`);

async function headOne(url) {
  let host;
  try { host = new URL(url).host; } catch { return { url, status: 0, note: "invalid-url" }; }
  const referer = REFERER_MAP[host];
  const headers = {
    ...(referer ? { referer } : {}),
    "user-agent": "Mozilla/5.0 (inspect-images)",
  };

  let headStatus = 0;
  let headErr = "";
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow", headers });
    headStatus = res.status;
    if (res.ok) return { url, status: res.status };
  } catch (err) {
    headErr = String(err?.message || err);
  }

  // Supabase Storage 对部分 object 的 HEAD / Range 请求会 400，但完整 GET 正常；
  // 某些 CDN 对 HEAD 拒绝或超时。做完整 GET 二次确认，拿到 headers 立即取消 body，不占带宽。
  // 高并发下可能瞬时 4xx，给 1 次退避重试，大幅降低误报。
  let lastStatus = 0;
  let lastErr = "";
  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt > 0) await new Promise((r) => setTimeout(r, 500));
    try {
      const res = await fetch(url, { method: "GET", redirect: "follow", headers });
      try { await res.body?.cancel(); } catch { /* 已关闭则忽略 */ }
      if (res.ok) {
        return {
          url,
          status: res.status,
          note: `HEAD ${headStatus || "failed"} → GET ok${attempt ? ` (retry ${attempt})` : ""}`,
        };
      }
      lastStatus = res.status;
    } catch (err) {
      lastErr = String(err?.message || err);
    }
  }
  return {
    url,
    status: lastStatus,
    note: lastStatus
      ? `HEAD ${headStatus || "err"} GET ${lastStatus} (retried)`
      : `HEAD: ${headErr}; GET: ${lastErr}`,
  };
}

async function runPool(tasks, limit) {
  const results = [];
  let idx = 0;
  let done = 0;
  const total = tasks.length;
  async function worker() {
    while (idx < tasks.length) {
      const i = idx++;
      results[i] = await tasks[i]();
      done++;
      if (done % 50 === 0 || done === total) {
        process.stdout.write(`  进度 ${done}/${total}\r`);
      }
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
  process.stdout.write("\n");
  return results;
}

const tasks = [...uniq.keys()].map((u) => () => headOne(u));
const results = await runPool(tasks, CONCURRENCY);

const bad = results.filter((r) => r.status < 200 || r.status >= 400);
console.log(`\n存活：${results.length - bad.length} / ${results.length}`);
if (bad.length > 0) {
  console.log(`\n存在 ${bad.length} 个异常 URL，详情写入 bad-urls.json`);
  // 回填被引用题目，便于人工追查
  const withRefs = bad.map((b) => ({
    ...b,
    refs: uniq.get(b.url)?.refs ?? [],
  }));
  writeFileSync(join(__dirname, "..", "bad-urls.json"), JSON.stringify(withRefs, null, 2));
  // 按原因简要聚合
  const byStatus = new Map();
  for (const b of bad) byStatus.set(b.status, (byStatus.get(b.status) ?? 0) + 1);
  console.log("按状态：");
  for (const [s, n] of [...byStatus.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(5)}  ${s === 0 ? "network" : `HTTP ${s}`}`);
  }
}
