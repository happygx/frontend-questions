---
level: 3
---

# 说说你对 Server-sent events(SSE，服务端推送) 的了解

## 题目要点

SSE 是一种轻量级的技术，适用于需要从服务器实时推送更新的应用场景，如实时通知、消息流和实时数据更新。它的实现简单、自动重连机制良好，但仅支持单向通信和文本格式数据。如果需要双向通信或支持二进制数据，可以考虑使用 WebSocket。

## 参考答案

Server-Sent Events (SSE) 是一种基于 HTTP 的技术，用于实现服务器向客户端推送实时更新。与 WebSocket 不同，SSE 只支持从服务器到客户端的单向通信，并且是基于文本的事件流。

### **特点与工作原理**

1. **单向通信**：
   - SSE 允许服务器主动向客户端推送消息，但客户端不能直接通过 SSE 向服务器发送数据（虽然可以通过其他方法，如普通的 HTTP 请求）。

2. **连接建立**：
   - 客户端通过向服务器发起 `EventSource` 请求来建立连接。服务器通过 HTTP 头 `Content-Type: text/event-stream` 声明响应内容类型，表明数据流是 SSE 格式。

   ```javascript
   const eventSource = new EventSource('your-endpoint-url');

   eventSource.onmessage = function(event) {
     console.log('New message:', event.data);
   };

   eventSource.onerror = function(error) {
     console.error('Error:', error);
   };
   ```

3. **事件格式**：
   - SSE 数据格式简单，每条消息以 `data:` 开头，字段之间用空行分隔。事件类型、重试时间等信息可以通过特定字段传递。

   ```
   data: Hello World
   data: This is another line of data
   ```

4. **自动重连**：
   - 如果连接中断，浏览器会自动重连。服务器也可以通过 `retry:` 指令指定重连间隔。

   ```
   retry: 5000
   ```

5. **事件类型**：
   - 可以指定事件类型，客户端通过 `addEventListener` 监听特定事件类型的消息。

   ```javascript
   eventSource.addEventListener('custom-event', function(event) {
     console.log('Custom event:', event.data);
   });
   ```

6. **兼容性**：
   - SSE 在大多数现代浏览器中得到支持，但不支持 IE 和一些较老的浏览器。需要检查浏览器兼容性，或考虑使用 Polyfill。

### **优点**

- **简单**：易于实现和使用。
- **自动重连**：浏览器自动处理连接断开和重连。
- **基于标准**：基于标准的 HTTP 协议和文本格式。

### **缺点**

- **单向通信**：只支持从服务器到客户端的消息传递，客户端需要通过其他手段与服务器通信。
- **限制**：不支持二进制数据和大规模数据传输。
