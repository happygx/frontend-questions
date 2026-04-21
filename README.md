# 前端题库

一个基于 Next.js + Supabase 构建的前端面试题库，支持分类筛选、难度过滤、关键词搜索、登录收藏等功能。

## 功能特性

- **题目浏览**：支持分类 Tab、难度筛选、标题关键词搜索、分页
- **题目详情**：独立详情页，Markdown 渲染，展示题目要点与参考答案
- **多对多分类**：一道题可属于多个分类，分类计数与源站完全一致
- **收藏系统**：匿名登录后即可收藏题目，收藏数据与账号绑定持久化
- **路由保护**：未登录用户点击题目详情自动跳转登录页，登录后回到原页面
- **数据爬取**：内置 `scraper.js`，可从源站抓取题目并写入 Supabase

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 16（App Router） |
| UI | Tailwind CSS v4 |
| 数据库 | Supabase（PostgreSQL + RLS） |
| 认证 | Supabase Auth（匿名登录 + 邮箱登录） |
| Markdown | react-markdown + remark-gfm |
| 部署 | Vercel |

## 目录结构

```
├── app/
│   ├── page.tsx                # 题库首页（列表 + 筛选）
│   ├── favorites/page.tsx      # 收藏页
│   ├── login/page.tsx          # 登录页（支持 ?next= 跳回参数）
│   ├── question/[id]/page.tsx  # 题目详情页（路由保护）
│   ├── auth/callback/page.tsx  # OAuth/邮件链接回调处理
│   └── api/
│       ├── questions/route.ts  # 题目列表 + 分类接口
│       ├── questions/batch/    # 批量查询接口（收藏页）
│       └── question/route.ts   # 单题详情接口
├── components/
│   ├── QuestionCard.tsx        # 题目卡片（列表行）
│   ├── CategoryTabs.tsx        # 分类 Tab 栏
│   ├── DifficultyFilter.tsx    # 难度筛选
│   ├── Pagination.tsx          # 分页器
│   ├── MarkdownContent.tsx     # Markdown 渲染器
│   ├── FavoriteButton.tsx      # 收藏按钮
│   ├── AuthBar.tsx             # 顶部登录状态栏
│   └── AuthGuard.tsx           # 路由保护（未登录重定向）
├── lib/
│   ├── questions.ts            # 题目查询逻辑（分类/搜索/详情）
│   ├── favorites.ts            # 收藏状态管理
│   ├── supabase-browser.ts     # 浏览器端 Supabase 客户端
│   └── supabase-server.ts      # 服务端 Supabase 客户端
├── supabase/migrations/
│   ├── 20260420120000_favorites.sql     # 收藏表 + RLS 策略
│   └── 20260421000000_question_tags.sql # 题目-分类多对多关联表
└── scraper.js                  # 题目爬虫（写入 Supabase）
```

## 数据库结构

```
tags              questions            question_tags (多对多)
─────────         ─────────────────    ──────────────────────
id   (PK)    ←──  tag_id (主分类)      exercise_key  (FK→questions)
tag_name          exercise_key (UK)    tag_id        (FK→tags)
                  title                PK(exercise_key, tag_id)
                  level
                  pivot
                  explanation

favorites
──────────────────────
user_id      (FK→auth.users)
exercise_key
created_at
PK(user_id, exercise_key)
```

## 本地开发

**1. 克隆项目**

```bash
git clone https://github.com/happygx/frontend-questions.git
cd frontend-questions
npm install
```

**2. 配置环境变量**

在项目根目录创建 `.env.local`：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

在 [Supabase 控制台](https://supabase.com/dashboard) → 项目 → **Settings → API** 获取以上两个值。

**3. 初始化数据库**

在 Supabase 控制台 → **SQL Editor** 中依次执行：

```bash
supabase/migrations/20260420120000_favorites.sql
supabase/migrations/20260421000000_question_tags.sql
```

同时在 **Authentication → Providers** 中开启 **Anonymous** 匿名登录。

**4. 启动开发服务器**

```bash
npm run dev
# 访问 http://localhost:6600
```

**5. 爬取题目数据（可选）**

```bash
npm run scrape
```

> 爬虫会从源站抓取题目并通过 `upsert` 写入 Supabase，重复运行不会产生重复数据。

## 部署到 Vercel

**1. 导入仓库**

登录 [vercel.com](https://vercel.com) → **Add New → Project** → 选择 `frontend-questions` 仓库 → Import。

**2. 添加环境变量**

在部署配置页面 **Environment Variables** 中添加（选择 Production / Preview / Development 全部环境）：

| 变量名 | 值 |
|--------|----|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名公钥 |

**3. 部署**

点击 **Deploy**，等待构建完成（约 1-2 分钟）。

**4. 配置 Supabase 允许 Vercel 域名**

部署完成后，在 Supabase 控制台 → **Authentication → URL Configuration**：

- **Site URL**：`https://your-project.vercel.app`
- **Redirect URLs**：添加 `https://your-project.vercel.app/**`

> **注意**：更新环境变量后必须触发一次**无缓存重新部署**（Deployments → Redeploy → 取消勾选 "Use existing Build Cache"），否则 `NEXT_PUBLIC_*` 变量不会生效。

## 常见问题

**接口报错 "Supabase 未配置"**  
→ 环境变量未生效，执行无缓存重新部署（见上）。

**登录后跳转失败**  
→ 检查 Supabase Redirect URLs 是否已添加 Vercel 域名。

**分类数量与题目总数不一致**  
→ 各分类计数来自 `question_tags`（允许一题多类），"全部"计数来自 `questions` 表（不重复），属于正常行为。

**接口报错 "more than one relationship was found for questions and tags"**  
→ 在 Supabase select 中为 `tags` 嵌套查询加 `!tag_id` 消歧义：`tags!tag_id(tag_name)`。
