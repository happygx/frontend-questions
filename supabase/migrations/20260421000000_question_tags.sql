-- ─────────────────────────────────────────────────────────────────
-- 多对多关联表：question_tags
--
-- 背景：源站同一道题可属于多个分类，原 questions.tag_id 只能存一个，
--       导致爬虫 upsert 时后处理的分类覆盖先前的 tag_id，分类计数失真。
--
-- 新方案：
--   - questions.tag_id  保留，作为"主分类"（首次爬入时确定，不再更新）
--   - question_tags     多对多关联表，记录全量所属分类，供查询/统计使用
-- ─────────────────────────────────────────────────────────────────

create table if not exists public.question_tags (
  exercise_key text not null references public.questions(exercise_key) on delete cascade,
  tag_id       int  not null references public.tags(id)                on delete cascade,
  primary key (exercise_key, tag_id)
);

create index if not exists question_tags_tag_id_idx
  on public.question_tags (tag_id);

create index if not exists question_tags_exercise_key_idx
  on public.question_tags (exercise_key);

-- 从现有 questions.tag_id 迁移存量数据（每道题的主分类先写进来）
insert into public.question_tags (exercise_key, tag_id)
select exercise_key, tag_id
from   public.questions
where  tag_id is not null
on conflict do nothing;

-- RLS：question_tags 公开只读（匿名用户可查询）
alter table public.question_tags enable row level security;

create policy "question_tags_select_public"
  on public.question_tags for select
  using (true);
