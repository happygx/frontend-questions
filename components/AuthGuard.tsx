"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import type { ReactNode } from "react";

type Status = "checking" | "authed" | "redirecting";

interface Props {
  children: ReactNode;
  /** 登录后要跳回的路径（编码前的原始路径） */
  redirectTo: string;
}

/**
 * 客户端认证守卫：
 *   - 匿名用户 / 未登录 → 跳转 /login?next=<redirectTo>
 *   - 已登录邮箱账号   → 正常渲染 children
 *
 * checking 阶段渲染骨架屏，防止内容闪现。
 */
export default function AuthGuard({ children, redirectTo }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    let cancelled = false;
    // getSession() 读 localStorage，无网络请求无 Web Lock，不与 AuthBar/FavoritesProvider 争锁
    getSupabaseBrowser()
      .auth.getSession()
      .then(({ data: { session } }) => {
        if (cancelled) return;
        const user = session?.user;
        if (user && !user.is_anonymous) {
          setStatus("authed");
        } else {
          setStatus("redirecting");
          router.replace(`/login?next=${encodeURIComponent(redirectTo)}`);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("redirecting");
        router.replace(`/login?next=${encodeURIComponent(redirectTo)}`);
      });
    return () => {
      cancelled = true;
    };
  }, [router, redirectTo]);

  if (status === "checking") return <Skeleton />;
  if (status === "redirecting") return null;
  return <>{children}</>;
}

function Skeleton() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="h-0.5 bg-gradient-to-r from-gray-200 to-gray-100" />
      <header className="h-14 border-b border-gray-200/60 bg-white/90 shadow-sm" />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="animate-pulse">
          {/* 分类 + 难度 */}
          <div className="mb-4 flex items-center gap-2">
            <div className="h-5 w-16 rounded-full bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-5 w-10 rounded-full bg-gray-200" />
          </div>
          {/* 标题 */}
          <div className="mb-2 h-7 w-3/4 rounded-lg bg-gray-200" />
          <div className="mb-8 h-5 w-1/2 rounded-lg bg-gray-200" />
          {/* 内容卡片 */}
          <div className="rounded-2xl border border-gray-200/60 bg-white px-6 py-8 shadow-sm space-y-3">
            {[92, 78, 85, 62, 74, 88, 55, 70].map((w, i) => (
              <div
                key={i}
                className="h-3 rounded bg-gray-100"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
