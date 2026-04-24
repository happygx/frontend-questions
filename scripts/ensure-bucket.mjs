/**
 * 幂等地创建/校对 Supabase Storage 的图片镜像 bucket。
 *
 *   - 已存在：打印当前配置并退出
 *   - 不存在：以 public=true 创建
 *
 * 运行：node scripts/ensure-bucket.mjs
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
for (const line of readFileSync(join(__dirname, "..", ".env.local"), "utf-8").split(/\r?\n/)) {
  const m = line.match(/^\s*([^#=\s][^=]*?)\s*=\s*(.*)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}

const BUCKET = process.env.IMAGE_BUCKET || "question-images";

const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
if (!url || !serviceKey) {
  console.error("❌ .env.local 缺少 NEXT_PUBLIC_SUPABASE_URL 或 SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const DESIRED = {
  public: true,
  fileSizeLimit: 20 * 1024 * 1024, // 单张图片 20MB 上限
  allowedMimeTypes: ["image/*"],
};

const { data: existing, error: getErr } = await supabase.storage.getBucket(BUCKET);
if (existing) {
  console.log(`✅ bucket '${BUCKET}' 已存在：public=${existing.public}`);
  if (!existing.public) {
    console.log("   → 改为公开可读（前端直链渲染需要）");
    const { error } = await supabase.storage.updateBucket(BUCKET, DESIRED);
    if (error) throw error;
    console.log("   ✅ 已更新为 public");
  }
  process.exit(0);
}

// getBucket 失败且不是 "not found" 以外的其他错误时需要报错
if (getErr && !/not found|does not exist/i.test(getErr.message)) {
  console.error("❌ getBucket 异常：", getErr.message);
  process.exit(1);
}

console.log(`📦 bucket '${BUCKET}' 不存在，正在创建 ...`);
const { error } = await supabase.storage.createBucket(BUCKET, DESIRED);
if (error) {
  console.error("❌ 创建失败：", error.message);
  process.exit(1);
}
console.log(`✅ 已创建 public bucket '${BUCKET}'（单文件 20MB，仅限 image/*）`);
