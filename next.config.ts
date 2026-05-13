import type { NextConfig } from "next";

/**
 * 从 NEXT_PUBLIC_SUPABASE_URL 推导 Storage 域名，加入 next/image 白名单。
 * 当前 MarkdownContent 用 react-markdown 渲染原生 <img>，不走 next/image；
 * 此处配置为将来切换 next/image 预留，不影响现有渲染。
 */
function supabaseImageHost(): string | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

const supaHost = supabaseImageHost();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...(supaHost
        ? [
            {
              protocol: "https" as const,
              hostname: supaHost,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
