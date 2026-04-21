/**
 * 前端面试题宝典 - 爬虫脚本
 * 使用方法：
 *   1. 填写下方 COOKIE 字段（从浏览器复制）
 *   2. node scraper.js
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import TurndownService from "turndown";
import { createClient } from "@supabase/supabase-js";

/** ESM 下无 __dirname，用脚本文件所在目录（兼容无 import.meta.dirname 的旧 Node） */
const SCRAPER_DIR =
  typeof import.meta.dirname === "string"
    ? import.meta.dirname
    : dirname(fileURLToPath(import.meta.url));

// 手动加载 .env.local（Node 脚本环境下 Next.js 不会自动注入）
try {
  const envPath = join(SCRAPER_DIR, ".env.local");
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split(/\r?\n/)) {
    const m = line.match(/^\s*([^#=\s][^=]*?)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  // .env.local 不存在时忽略
}

// ─────────────────────────────────────────────
// 配置区：运行前请填写 Cookie
// ─────────────────────────────────────────────
const CONFIG = {
  // 从浏览器 DevTools → Network → 任意请求 → Request Headers → cookie 复制整行内容
  COOKIE: `csrfToken=fSSsn5ANn6eZ6l4ggeqW1oMb; 
  utoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcktleSI6ImN1XzJjYTNjMGJiLTNiYTMtNGU1Ni04OTJlLTY2MThhNTcyYTUyNSIsInZpZCI6OSwiaWF0IjoxNzc2NTgyNDI5LCJleHAiOjE3NzcxODcyMjl9.bnp_qwxsNr7CxuE27GeXFmx8V-PLEnvH871DE7ZBX84; 
  utoken.sig=YRtV3iWBOhjQy6qKpCyfz0V5whZfx1ttu7v6E80Br5k`,

  // 每次请求之间的随机延迟范围（毫秒），避免触发反爬
  DELAY_MIN: 600,
  DELAY_MAX: 1400,

  // 每页获取题目数量（不建议超过 50）
  PAGE_SIZE: 20,

  BASE_URL: "https://fe.ecool.fun",

  // Supabase：URL 与密钥从 .env.local 读取（脚本开头已加载）
  SUPABASE_URL: (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim(),
  /** 服务角色密钥：可绕过 RLS，爬虫写入 tags/questions 必须用此 key；勿用于前端、勿提交 Git */
  SUPABASE_SERVICE_ROLE_KEY: (
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  ).trim(),
  /** 仅作后备；anon 默认无法 insert tags/questions（RLS），写入会失败 */
  SUPABASE_ANON_KEY: (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim(),
};

// ─────────────────────────────────────────────
// 工具函数
// ─────────────────────────────────────────────

// TurndownService 仅作备用，处理极少数 renderType=html 的题目
const td = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});

/** 随机延迟 */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const randomDelay = () =>
  sleep(
    CONFIG.DELAY_MIN + Math.random() * (CONFIG.DELAY_MAX - CONFIG.DELAY_MIN),
  );

/**
 * 清理代码围栏中多余的 HTML 属性，例如：
 *   ```js id="abc123"  →  ```js
 *   ```javascript data-x="y"  →  ```javascript
 */
function cleanCodeFences(md) {
  return md.replace(/^(`{3,})(\w*)\s+[^\n]+/gm, "$1$2");
}

/**
 * 将内容转为 Markdown：
 *   - renderType=md：内容本身已是 Markdown，只做围栏清理
 *   - 其他：走 HTML→Markdown 转换
 */
function toMarkdown(content, renderType) {
  if (!content) return "";
  if (renderType === "md") {
    return cleanCodeFences(content.trim());
  }
  return cleanCodeFences(td.turndown(content).trim());
}

// 清理 Cookie 中的换行和多余空白（防止模板字符串带入缩进/换行导致 Header 非法）
const CLEAN_COOKIE = CONFIG.COOKIE.replace(/\s*\n\s*/g, " ").trim();

// ─────────────────────────────────────────────
// Supabase 客户端
// ─────────────────────────────────────────────
let supabase = null;

function getSupabase() {
  if (!supabase) {
    const url = CONFIG.SUPABASE_URL;
    const serviceKey = CONFIG.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = CONFIG.SUPABASE_ANON_KEY;
    const key = serviceKey || anonKey;
    if (!url || !key) {
      throw new Error(
        "❌ 未配置 Supabase：请在 .env.local 填写 NEXT_PUBLIC_SUPABASE_URL，并至少填写 SUPABASE_SERVICE_ROLE_KEY（爬虫写入）或 NEXT_PUBLIC_SUPABASE_ANON_KEY",
      );
    }
    if (!serviceKey) {
      console.warn(
        "\n⚠️  未配置 SUPABASE_SERVICE_ROLE_KEY。使用 anon key 写入时，若 tags/questions 启用了 RLS，会出现「violates row-level security」且数据进不了库。\n" +
          "   请到 Supabase → Project Settings → API → service_role，复制密钥到 .env.local：\n" +
          "   SUPABASE_SERVICE_ROLE_KEY=eyJ...\n" +
          "   （该密钥拥有完整数据库权限，仅用于本机脚本，不要用于 Next 前端。）\n",
      );
    }
    supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return supabase;
}

/** 将分类标签 upsert 到 Supabase */
async function upsertTag(tagId, tagName) {
  const { error } = await getSupabase()
    .from("tags")
    .upsert({ id: tagId, tag_name: tagName }, { onConflict: "id" });
  if (error) throw new Error(`upsertTag failed: ${error.message}`);
}

/**
 * 接口常返回 0.5、1.5、2.5 等半档难度；Supabase questions.level 为 integer，直接写入会报
 * invalid input syntax for type integer。四舍五入到 1–5，非法值则 null。
 */
function normalizeLevelForDb(raw) {
  if (raw == null || raw === "") return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return null;
  const rounded = Math.round(n);
  if (rounded < 1) return null;
  if (rounded > 5) return 5;
  return rounded;
}

/**
 * 将题目-标签多对多关联写入 question_tags 表。
 * 使用 onConflict 保证幂等，重复运行不产生重复行。
 */
async function upsertQuestionTag(exerciseKey, tagId) {
  const { error } = await getSupabase()
    .from("question_tags")
    .upsert(
      { exercise_key: String(exerciseKey), tag_id: tagId },
      { onConflict: "exercise_key,tag_id" },
    );
  if (error) throw new Error(`upsertQuestionTag failed: ${error.message}`);
}

/**
 * 将题目详情写入 Supabase。
 *
 * 源站同一道题可属于多个分类，若对 tag_id 无条件 upsert，每次运行都会用
 * "最后处理该题的分类"覆盖 tag_id，导致各分类题目计数与源站不一致。
 *
 * 策略：
 *   - 题目不存在 → INSERT，写入完整数据（含 tag_id 作为主分类）
 *   - 题目已存在 → UPDATE 内容字段，保留原始 tag_id（主分类不变）
 */
async function upsertQuestion(detail, tagId) {
  const renderType = detail.renderType || "md";
  const exerciseKey = String(detail.exerciseKey || detail.key || detail.id);

  const contentFields = {
    title: detail.title || "（无标题）",
    level: normalizeLevelForDb(detail.level ?? detail.difficulty),
    pivot: detail.pivot ? toMarkdown(detail.pivot, renderType) : null,
    explanation: detail.explanation
      ? toMarkdown(detail.explanation, renderType)
      : null,
    render_type: renderType,
  };

  // 1. 检查题目是否已存在
  const { data: existing, error: selectErr } = await getSupabase()
    .from("questions")
    .select("exercise_key")
    .eq("exercise_key", exerciseKey)
    .maybeSingle();
  if (selectErr) throw new Error(`upsertQuestion select failed: ${selectErr.message}`);

  if (existing) {
    // 2a. 已存在：仅更新内容，不改 tag_id
    const { error } = await getSupabase()
      .from("questions")
      .update(contentFields)
      .eq("exercise_key", exerciseKey);
    if (error) throw new Error(`upsertQuestion update failed: ${error.message}`);
  } else {
    // 2b. 不存在：完整插入（含 tag_id）
    const { error } = await getSupabase()
      .from("questions")
      .insert({ exercise_key: exerciseKey, tag_id: tagId, ...contentFields });
    if (error) throw new Error(`upsertQuestion insert failed: ${error.message}`);
  }
}

/** 通用请求封装 */
async function apiFetch(url) {
  const res = await fetch(url, {
    headers: {
      cookie: CLEAN_COOKIE,
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      referer: "https://fe.ecool.fun/topic-list",
      accept: "application/json, text/plain, */*",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const json = await res.json();
  // 该 API 成功时 code = 0，message = "ok"
  if (json.code !== 0)
    throw new Error(`API error ${json.code}: ${json.message || ""} → ${url}`);
  return json.data;
}

// ─────────────────────────────────────────────
// API 封装
// ─────────────────────────────────────────────

/** 获取所有分类标签 */
async function fetchTags() {
  const data = await apiFetch(
    `${CONFIG.BASE_URL}/api/tag/list?vid=9&exerciseCate=0`,
  );
  // 实际结构：{ list: [...], total: N }
  return Array.isArray(data) ? data : data.list || data.records || [];
}

/** 获取某分类下所有题目（自动翻页） */
async function fetchAllExercises(tagId) {
  const exercises = [];
  let pageNum = 1;
  let total = Infinity;

  while (exercises.length < total) {
    const url =
      `${CONFIG.BASE_URL}/api/exercise/list?vid=9&tagId=${tagId}&exerciseCate=0` +
      `&pageNum=${pageNum}&pageSize=${CONFIG.PAGE_SIZE}` +
      `&ignoreMaster=1&difficulty=&orderBy=default&order=desc`;

    const data = await apiFetch(url);

    // 兼容不同分页结构
    const list = data.records || data.list || data || [];
    total = data.total ?? data.totalCount ?? list.length;

    if (list.length === 0) break;
    exercises.push(...list);
    console.log(`    第 ${pageNum} 页，已获取 ${exercises.length}/${total} 题`);

    if (exercises.length >= total) break;
    pageNum++;
    await randomDelay();
  }

  return exercises;
}

/** 获取题目详情（含答案） */
async function fetchDetail(exerciseKey, tagId) {
  const url =
    `${CONFIG.BASE_URL}/api/exercise/practice/detail?vid=9` +
    `&difficulty=&exerciseCate=0&ignoreMaster=1&order=desc&orderBy=default` +
    `&tagId=${tagId}&exerciseKey=${exerciseKey}`;
  return await apiFetch(url);
}

// ─────────────────────────────────────────────
// 主流程
// ─────────────────────────────────────────────

async function main() {
  console.log("========================================");
  console.log("  前端面试题宝典 爬虫启动");
  console.log("========================================\n");

  if (CONFIG.COOKIE === "PASTE_YOUR_COOKIE_HERE") {
    console.error("❌ 请先在 scraper.js 的 CONFIG.COOKIE 中填写你的 Cookie！");
    process.exit(1);
  }

  // 1. 获取所有分类
  console.log("📂 正在获取分类列表...");
  const tags = await fetchTags();
  console.log(`   共 ${tags.length} 个分类\n`);

  let totalSaved = 0;
  let totalFailed = 0;
  const failureLog = [];

  // 2. 遍历每个分类
  for (const tag of tags) {
    const tagId = tag.id || tag.tagId;
    const tagName = tag.tagName || tag.name || String(tagId);

    try {
      await upsertTag(tagId, tagName);
    } catch (err) {
      console.warn(`   ⚠️  Supabase upsertTag 失败：${err.message}`);
    }

    console.log(`\n📁 分类：${tagName}（id=${tagId}）`);

    // 3. 获取该分类所有题目
    let exercises;
    try {
      exercises = await fetchAllExercises(tagId);
    } catch (err) {
      console.error(`   ⚠️  获取题目列表失败：${err.message}`);
      totalFailed++;
      failureLog.push({ kind: "list", tagId, tagName, message: err.message });
      continue;
    }

    console.log(`   共 ${exercises.length} 道题，开始逐题写入 Supabase...\n`);

    // 4. 逐题拉取详情并写入 Supabase
    for (let i = 0; i < exercises.length; i++) {
      const ex = exercises[i];
      const exerciseKey = ex.exerciseKey || ex.key || ex.id;
      const title = ex.title || String(exerciseKey);

      process.stdout.write(
        `   [${i + 1}/${exercises.length}] ⬆  ${title.slice(0, 60)}... `,
      );

      try {
        const detail = await fetchDetail(exerciseKey, tagId);
        await upsertQuestion(detail, tagId);
        await upsertQuestionTag(exerciseKey, tagId);
        console.log("☁️");
        totalSaved++;
      } catch (err) {
        console.log(`❌ ${err.message}`);
        totalFailed++;
        failureLog.push({
          kind: "detail",
          tagId,
          tagName,
          exerciseKey: String(exerciseKey),
          title: title.slice(0, 80),
          message: err.message,
        });
      }

      await randomDelay();
    }
  }

  console.log("\n========================================");
  console.log(`  完成！成功：${totalSaved}，失败：${totalFailed}`);
  if (failureLog.length > 0) {
    console.log("\n  失败明细（共 " + failureLog.length + " 条）：");
    for (const f of failureLog) {
      if (f.kind === "list") {
        console.log(
          `    · [题目列表] ${f.tagName}（id=${f.tagId}）→ ${f.message}`,
        );
      } else {
        console.log(
          `    · [拉详情/写库] ${f.tagName}（id=${f.tagId}）exerciseKey=${f.exerciseKey} → ${f.message}`,
        );
      }
    }
  }
  console.log("========================================");
}

main().catch((err) => {
  console.error("\n❌ 脚本发生未捕获错误：", err);
  process.exit(1);
});
