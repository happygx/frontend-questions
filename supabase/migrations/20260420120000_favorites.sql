-- 收藏表：依赖 Supabase Auth（匿名登录后 auth.uid() 即 user_id）
-- 控制台需开启：Authentication → Providers → Anonymous

create table if not exists public.favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  exercise_key text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, exercise_key)
);

create index if not exists favorites_user_created_idx
  on public.favorites (user_id, created_at desc);

alter table public.favorites enable row level security;

create policy "favorites_select_own"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "favorites_insert_own"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "favorites_delete_own"
  on public.favorites for delete
  using (auth.uid() = user_id);
