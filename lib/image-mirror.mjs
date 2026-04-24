/**
 * 图片镜像：源站 URL → Supabase Storage 公开 URL
 *
 * 策略：
 *   1. 只镜像白名单域名（避免把 data:/blob: 等奇怪 URL 也往里扔）
 *   2. 每个原 URL 用 sha256(url).slice(0, 24) 作为 key，天然去重 + 幂等
 *   3. 下载带 Referer（ecool.fun 做防盗链，不带 Referer 会 403）
 *   4. 扩展名从 Content-Type 推导，更稳（有的 URL 连后缀都没有）
 *   5. 同一 URL 在本次进程内只上传一次（Map 缓存）
 *   6. 失败不抛，返回 { ok: false, ... }；调用方决定"保留原 URL 还是跳过"
 *
 * 该模块对 scraper.js（新爬取）和 scripts/migrate-images.mjs（存量迁移）共用。
 */
import { createHash } from "node:crypto";

/** 能镜像的图床域名（同时也是允许被 rewrite 的判定） */
export const MIRROR_HOSTS = new Set([
  "static.ecool.fun",
  "p1-jj.byteimg.com",
  "p3-juejin.byteimg.com",
  "p6-juejin.byteimg.com",
  "p9-juejin.byteimg.com",
  "pic1.zhimg.com",
  "pic2.zhimg.com",
  "pic3.zhimg.com",
  "pic4.zhimg.com",
  "static.vue-js.com",
  "user-images.githubusercontent.com",
  "raw.githubusercontent.com",
]);

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

/** host → 下载时使用的 Referer；没在表里的走空 Referer */
const REFERER_MAP = {
  "static.ecool.fun": "https://fe.ecool.fun/",
};

/** Content-Type → 扩展名（只覆盖常见图片；其它走默认 bin） */
const MIME_EXT = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/svg+xml": "svg",
  "image/bmp": "bmp",
  "image/x-icon": "ico",
};

function extFromContentType(ct, fallbackFromUrl = "jpg") {
  if (!ct) return fallbackFromUrl;
  const base = ct.split(";")[0].trim().toLowerCase();
  return MIME_EXT[base] || fallbackFromUrl;
}

function extFromUrl(url) {
  try {
    const p = new URL(url).pathname.toLowerCase();
    const m = p.match(/\.([a-z0-9]{2,5})$/);
    if (m && ["jpg", "jpeg", "png", "gif", "webp", "avif", "svg", "bmp", "ico"].includes(m[1])) {
      return m[1] === "jpeg" ? "jpg" : m[1];
    }
  } catch {}
  return "jpg";
}

/** 判断 URL 是否属于白名单 host，属于才会被镜像/改写 */
export function shouldMirror(url) {
  try {
    const u = new URL(url);
    if (u.protocol !== "http:" && u.protocol !== "https:") return false;
    return MIRROR_HOSTS.has(u.host);
  } catch {
    return false;
  }
}

/**
 * 在 scraper.js 脚本里实时打印下载进度，和 console.log('☁️') 的风格保持一致。
 * 生产代码里不会对 stdout 静默，故留一个简单 logger 注入口。
 */
export function createImageMirror({ supabase, bucket = "question-images", logger = () => {} }) {
  const cache = new Map(); // origUrl -> publicUrl（本次进程去重）

  async function mirrorOne(origUrl) {
    if (cache.has(origUrl)) {
      return { ok: true, url: cache.get(origUrl), cached: true };
    }
    if (!shouldMirror(origUrl)) {
      return { ok: false, reason: "not-in-whitelist", origUrl };
    }

    const u = new URL(origUrl);
    const referer = REFERER_MAP[u.host];

    let res;
    try {
      res = await fetch(origUrl, {
        headers: {
          "user-agent": UA,
          ...(referer ? { referer } : {}),
        },
      });
    } catch (err) {
      return { ok: false, reason: `network: ${err.message}`, origUrl };
    }
    if (!res.ok) {
      return { ok: false, reason: `http ${res.status}`, origUrl };
    }

    const ct = res.headers.get("content-type") || "";
    if (!/^image\//i.test(ct)) {
      return { ok: false, reason: `non-image content-type: ${ct}`, origUrl };
    }

    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.byteLength === 0) {
      return { ok: false, reason: "empty body", origUrl };
    }

    const ext = extFromContentType(ct, extFromUrl(origUrl));
    const hash = createHash("sha256").update(origUrl).digest("hex").slice(0, 24);
    const key = `mirror/${hash}.${ext}`;

    const { error: upErr } = await supabase.storage
      .from(bucket)
      .upload(key, buf, {
        contentType: ct.split(";")[0].trim(),
        upsert: true,
        cacheControl: "31536000, immutable",
      });
    if (upErr) {
      return { ok: false, reason: `upload: ${upErr.message}`, origUrl };
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(key);
    const publicUrl = data.publicUrl;
    cache.set(origUrl, publicUrl);
    logger(`    ⤵  ${origUrl}\n      → ${publicUrl}`);
    return { ok: true, url: publicUrl, cached: false };
  }

  /**
   * 扫 Markdown 文本里所有图片 URL，逐个镜像并替换。
   * 覆盖两类形态：
   *   - Markdown 图片 `![alt](url "title")`
   *   - HTML `<img ... src="url" ...>`
   *
   * 返回 { text, replaced, failed }：
   *   - text：替换后的 Markdown
   *   - replaced：成功镜像的 URL 数
   *   - failed：[{origUrl, reason}]，保留原 URL 未替换
   */
  async function rewriteMarkdown(md) {
    if (!md) return { text: md, replaced: 0, failed: [] };

    // 1. 先抽出所有候选 URL（不直接 replaceAll，因为下载是异步且顺序不定）
    const candidates = new Set();
    const MD_IMG = /!\[[^\]]*\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)/g;
    const HTML_IMG = /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
    for (const m of md.matchAll(MD_IMG)) candidates.add(m[1]);
    for (const m of md.matchAll(HTML_IMG)) candidates.add(m[1]);

    // 2. 只处理白名单里的 URL；限并发顺序下载（串行就够，图片通常几张）
    const mapping = new Map(); // origUrl -> newUrl
    const failed = [];
    for (const u of candidates) {
      if (!shouldMirror(u)) continue;
      const r = await mirrorOne(u);
      if (r.ok) mapping.set(u, r.url);
      else failed.push({ origUrl: u, reason: r.reason });
    }

    // 3. 全局字符串替换（URL 里无正则特殊字符时直接 split/join 最稳）
    let out = md;
    for (const [orig, mirrored] of mapping) {
      out = out.split(orig).join(mirrored);
    }

    return { text: out, replaced: mapping.size, failed };
  }

  return { mirrorOne, rewriteMarkdown, cache };
}
