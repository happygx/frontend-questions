---
level: 1
---

# websocket 中的 Handshaking 是什么？

## 题目要点

* **Handshaking** 就是 WebSocket 连接建立前的 **HTTP 升级握手过程**。
* 其核心是：客户端发起 **HTTP Upgrade 请求** → 服务端返回 **101 Switching Protocols** 响应 → 双方协议切换 → 进入 WebSocket 通信阶段。

## 参考答案

在 **WebSocket** 协议中，**Handshaking（握手）** 是指客户端和服务器在建立 WebSocket 连接之前进行的一次 **升级请求与确认过程**。

它的作用是：

1. **确认双方是否支持 WebSocket 协议**；
2. **将原本的 HTTP/1.1 长连接升级为 WebSocket 专用的全双工连接**；
3. **协商必要的协议参数**（例如子协议 `Sec-WebSocket-Protocol`、扩展 `Sec-WebSocket-Extensions` 等）。

---

### 握手流程

1. **客户端发起请求（HTTP Upgrade 请求）**
   客户端首先通过 **HTTP 协议** 发起请求，请求头中带有一些特殊字段，表明希望将 HTTP 连接升级为 WebSocket：

   ```http
   GET /chat HTTP/1.1
   Host: example.com:80
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
   Sec-WebSocket-Version: 13
   ```

   * `Upgrade: websocket` 表示想升级协议
   * `Connection: Upgrade` 表示连接类型支持升级
   * `Sec-WebSocket-Key` 是客户端随机生成的一个 Base64 编码字符串，用于校验
   * `Sec-WebSocket-Version` 指定 WebSocket 版本（通常是 13）

2. **服务器响应（HTTP 101 Switching Protocols）**
   如果服务器支持 WebSocket，它会返回 **101 状态码**，并在响应头中确认升级：

   ```http
   HTTP/1.1 101 Switching Protocols
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
   ```

   * `101 Switching Protocols` 表示协议成功切换
   * `Sec-WebSocket-Accept` 是服务端根据客户端 `Sec-WebSocket-Key` 计算出的校验值，保证握手合法

3. **连接建立成功**
   当握手完成后，HTTP 连接会升级为 WebSocket 通道，接下来就进入真正的 **双向全双工通信** 阶段，消息将以 WebSocket 帧的格式进行传输，而不是 HTTP。
