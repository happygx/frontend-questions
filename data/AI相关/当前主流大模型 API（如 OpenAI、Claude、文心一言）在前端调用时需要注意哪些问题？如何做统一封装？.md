---
level: 3
---

# 当前主流大模型 API（如 OpenAI、Claude、文心一言）在前端调用时需要注意哪些问题？如何做统一封装？

## 题目要点

1. 前端不应直接调用大模型 API，要通过安全后端代理；
2. 注意不同模型 API 的参数格式、流式解析方式差异；
3. 封装统一接口便于切换模型，提升稳定性和扩展性；
4. 前端应实现良好的流式处理、错误提示、响应中断支持。

## 参考答案

在前端调用主流大模型 API（如 OpenAI、Claude、文心一言）时，**安全性、稳定性、通用性、可扩展性** 是核心关注点。

下面从注意事项和封装思路两个方面说明。

---

## 一、调用注意事项

### 1. **API Key 安全性**
- 不要在浏览器中直接暴露 API Key。
- 正确做法：**前端调用自己后端的中转接口**，由后端与大模型服务通信。
- 可以对请求做鉴权 + 限流防刷。

### 2. **跨域和网络限制**
- 一些 API 不支持跨域直接请求，前端必须通过后端代理；
- Claude、文心一言等大模型需要内网白名单、API Token 等设置。

### 3. **流式响应处理（SSE / Stream）**
- OpenAI 使用 `fetch` + `ReadableStream` 处理 `text/event-stream`；
- 前端需做好流数据拼接、打断重试、超时控制；
- Claude（Anthropic）也支持流式返回，处理方式类似。

### 4. **模型差异兼容**
- 不同模型接口返回格式不一样，前端需有统一的数据结构；
- 如 OpenAI 的流式响应按 `delta.content` 解析，而文心一言可能是 `result` 字段。

---

## 二、封装建议（前后端协作）

### 后端接口结构（前端不直接调用大模型）

```ts
{
  provider: 'openai' | 'claude' | 'wenxin',
  model: 'gpt-4' | 'claude-3-opus',
  messages: [
    { role: 'user', content: '写一段产品介绍文案' }
  ],
  stream: true
}
```

```ts
export interface ChatRequest {
  provider: 'openai' | 'claude' | 'wenxin';
  model: string;
  messages: Message[];
  stream?: boolean;
}

export function chat(request: ChatRequest, onMessage: (text: string) => void) {
  return fetch('/api/llm/chat', {
    method: 'POST',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => {
    if (request.stream) {
      const reader = res.body?.getReader()
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      reader?.read().then(function process({ done, value }) {
        if (done) return;
        buffer += decoder.decode(value, { stream: true });
        buffer.split('\n\n').forEach(line => {
          if (line.startsWith('data:')) {
            const payload = JSON.parse(line.replace('data: ', ''));
            onMessage(payload.delta?.content || payload.result || '');
          }
        });
        return reader.read().then(process);
      });
    } else {
      return res.json();
    }
  });
}
```

```ts
  provider: 'openai',
  model: 'gpt-4',
  messages: [{ role: 'user', content: '介绍下 AIGC 是什么' }],
  stream: true
}, (text) => {
  setOutput(prev => prev + text); // 实现流式展示
});
```

## 三、部分建议

| 方向         | 建议                                  |
|--------------|---------------------------------------|
| 多模型兼容   | 使用 adapter 设计模式封装不同模型调用逻辑 |
| 错误处理     | 包括超时、断流、token 过期等兜底提示    |
| 日志监控     | 后端记录请求上下文，便于调试与审计       |
| 并发控制     | 防止用户快速连续请求，前端加锁节流       |
| 缓存优化     | 可选将上下文或部分结果缓存               |
