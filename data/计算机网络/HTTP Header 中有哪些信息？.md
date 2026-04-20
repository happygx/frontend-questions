---
level: 2.5
---

# HTTP Header 中有哪些信息？

## 题目要点

HTTP 头部信息分为请求头、响应头、通用头和其他头部信息，它们用于传递客户端和服务器之间的各种元数据和控制指令。常见的头部信息包括内容类型、缓存控制、身份验证和 cookie 等。

## 参考答案

常见的 HTTP 头部信息包括以下几类：

### 请求头（Request Headers）
1. **Accept**：指定客户端能够接受的内容类型。例如：`Accept: application/json, text/html`.
2. **Accept-Encoding**：指定客户端能够接受的编码格式。例如：`Accept-Encoding: gzip, deflate`.
3. **Accept-Language**：指定客户端能够接受的语言。例如：`Accept-Language: en-US, en;q=0.9`.
4. **Authorization**：用于身份验证的头部。例如：`Authorization: Bearer <token>`.
5. **Cookie**：发送给服务器的 cookie 信息。例如：`Cookie: sessionId=abc123`.
6. **Host**：指定请求的目标主机和端口。例如：`Host: www.example.com`.
7. **User-Agent**：标识发出请求的用户代理（通常是浏览器）。例如：`User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36`.

### 响应头（Response Headers）
1. **Content-Type**：响应体的内容类型。例如：`Content-Type: text/html; charset=UTF-8`.
2. **Content-Length**：响应体的长度（字节数）。例如：`Content-Length: 1234`.
3. **Date**：响应被发送的日期和时间。例如：`Date: Mon, 16 Aug 2024 12:00:00 GMT`.
4. **Server**：服务器的软件信息。例如：`Server: Apache/2.4.41 (Ubuntu)`.
5. **Set-Cookie**：用于在客户端设置 cookie。例如：`Set-Cookie: sessionId=abc123; Path=/; HttpOnly`.
6. **Cache-Control**：指定缓存策略。例如：`Cache-Control: no-cache, no-store, must-revalidate`.

### 通用头（General Headers）
1. **Connection**：指定是否保持连接或关闭连接。例如：`Connection: keep-alive`.
2. **Upgrade**：用于升级协议。例如：`Upgrade: websocket`.
3. **Via**：标识请求/响应经过的中间代理。例如：`Via: 1.1 example.com`.

### 其他头部信息
1. **Location**：在重定向响应中，指定重定向的目标 URL。例如：`Location: https://www.example.com/new-page`.
2. **ETag**：资源的标识符，用于缓存控制。例如：`ETag: "12345"`.
3. **If-Modified-Since**：请求中指定的时间，服务器只在资源在此时间之后被修改时才返回资源。例如：`If-Modified-Since: Mon, 16 Aug 2024 10:00:00 GMT`.
