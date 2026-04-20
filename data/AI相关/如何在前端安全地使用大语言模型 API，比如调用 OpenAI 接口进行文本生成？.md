---
level: 3
---

# 如何在前端安全地使用大语言模型 API，比如调用 OpenAI 接口进行文本生成？

## 题目要点

- 前端不应暴露任何敏感密钥；
- 正确的方式是调用后端中转接口，由后端与 OpenAI 通信；
- 后端可以做权限验证、限流、内容过滤等安全控制；
- 推荐配合流式输出实现 ChatGPT 类体验，保障安全与交互质量。

## 参考答案

## 推荐方式：前端 → 后端中转 → OpenAI API

前端**不应该直接调用 OpenAI 接口并暴露 API Key**，推荐通过后端中转调用，确保密钥安全、具备权限控制和请求管理能力。

---

### 架构示意：

```
    ↓ fetch 请求
后端接口（自建中转 API）
    ↓ 携带 API Key，请求参数控制
OpenAI 接口（如 gpt-3.5）
```

## 后端中转实现（Node.js 示例）

```ts
import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
      stream: true,
    }),
  });

  res.setHeader('Content-Type', 'text/event-stream');
  openaiRes.body.pipe(res);
});

export default router;
```

## 前端请求中转接口（示例）：

```ts
  method: 'POST',
  body: JSON.stringify({ message: '你好' }),
  headers: { 'Content-Type': 'application/json' },
});
```

## 不推荐做法：前端直接调用 OpenAI 接口

```ts
fetch('https://api.openai.com/v1/chat/completions', {
  headers: {
    Authorization: 'Bearer sk-xxxx', // 任何人都能拿到
  },
});
```
- API Key 暴露在前端代码中；
- 任何用户都可以复制密钥进行滥用；
- 一旦泄露，可能导致额度被刷完或账号被封；
- 无法做权限控制、调用审计等功能。

---

## 安全实践建议：

1. 永远不要在前端暴露密钥；
2. 搭建后端中转层，并做：
   - 用户鉴权（如 token、cookie 验证）
   - 频率限制（防止滥用）
   - 日志记录（追踪异常或攻击）
3. 接入限流、模型参数限制等防护；
4. 对输出内容做安全过滤（如禁词、脱敏）；
