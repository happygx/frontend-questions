"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import {
  backupFavoriteKeysBeforeSignIn,
  mergePendingFavoriteKeysToUser,
} from "@/lib/auth-session";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

function mapAuthError(message: string): string {
  const m = message.toLowerCase();
  if (
    m.includes("invalid login credentials") ||
    m.includes("invalid_credentials")
  ) {
    return "邮箱或密码错误";
  }
  if (m.includes("email not confirmed")) {
    return "该账号邮箱尚未确认，请在 Supabase 中确认用户或关闭「邮箱确认」要求";
  }
  return message;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setErr("请输入邮箱");
      return;
    }
    if (!password) {
      setErr("请输入密码");
      return;
    }

    setBusy(true);
    try {
      await backupFavoriteKeysBeforeSignIn();
      const supabase = getSupabaseBrowser();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });
      if (error) {
        setErr(mapAuthError(error.message));
        return;
      }

      const uid = data.session?.user?.id ?? data.user?.id;
      if (uid) await mergePendingFavoriteKeysToUser(uid);

      // 登录成功后跳回来源页（若有）
      router.replace(next);
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "登录失败");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12">
      <Link href="/" className="mb-6 text-sm text-gray-500 hover:text-gray-800">
        ← 返回题库
      </Link>

      <h1 className="text-xl font-semibold text-gray-900">登录</h1>

      {next !== "/" && (
        <p className="mt-2 text-sm text-gray-500">
          登录后将自动跳转到您之前访问的页面。
        </p>
      )}

      <form onSubmit={(e) => void onSubmit(e)} className="mt-8 space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            邮箱
          </label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            密码
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
          />
        </div>

        {err ? (
          <p className="text-sm text-red-600" role="alert">
            {err}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {busy ? "登录中…" : "登录"}
        </button>
      </form>
    </div>
  );
}

// useSearchParams 需要 Suspense 边界
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <span className="text-sm text-gray-400">加载中…</span>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
