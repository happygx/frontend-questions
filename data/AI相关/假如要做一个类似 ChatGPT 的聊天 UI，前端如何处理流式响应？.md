---
level: 3
---

# 假如要做一个类似 ChatGPT 的聊天 UI，前端如何处理流式响应？

## 题目要点

- 前端处理流式响应核心在于：**按段读取、逐步更新 UI**；
- 常见实现方式：**Fetch + ReadableStream**（现代浏览器支持好）；
- 结合打字机动画、markdown 渲染、滚动跟随等优化，可以实现 ChatGPT 类聊天体验。

## 参考答案

前端要实现类似 ChatGPT 的**流式响应效果**，通常是配合后端使用 **SSE（Server-Sent Events）** 或 **Fetch + ReadableStream** 实现“打字机式”文字逐字输出的体验。

---

## 实现核心思路

1. **向后端发起请求**，并开启流式传输；
2. **逐步读取响应内容**；
3. **动态追加到聊天窗口**，模拟打字效果。

---

## 方式一：使用 Fetch + ReadableStream（主流方式）

```ts
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ message: '你好' }),
  headers: {
    'Content-Type': 'application/json',
  },
});

// 读取响应体
const reader = response.body?.getReader();
const decoder = new TextDecoder('utf-8');
let result = '';

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value, { stream: true });
  result += chunk;
  updateMessage(result); // 更新 UI，追加内容
}
```

---

## 方式二：使用 SSE（EventSource）

后端返回 `Content-Type: text/event-stream` 的响应：

```ts

eventSource.onmessage = (event) => {
  const content = event.data;
  appendToChat(content); // 每次追加一小段内容
};

eventSource.onerror = () => {
  eventSource.close();
};
```

- 使用 ReadableStream 时注意字符编码，建议使用 `TextDecoder('utf-8')`；
- 数据格式建议后端输出 JSON + 分段内容（比如用 `\n\n` 分隔）；
- 若使用 SSE，记得后端返回 `Cache-Control: no-cache`；
- 适配 markdown 渲染，建议使用 `react-markdown` 动态渲染 assistant 回复内容；
- 若支持中途中止回复，可使用 `AbortController` 中断 fetch。
