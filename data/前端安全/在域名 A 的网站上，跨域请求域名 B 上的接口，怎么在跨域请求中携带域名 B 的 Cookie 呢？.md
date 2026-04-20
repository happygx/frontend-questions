---
level: 3
---

# 在域名 A 的网站上，跨域请求域名 B 上的接口，怎么在跨域请求中携带域名 B 的 Cookie 呢？

## 题目要点

在跨域请求中带 Cookie 需要服务端和客户端的共同支持，包括配置 `Access-Control-Allow-Credentials`、`SameSite=None` 等，并在前端请求中启用凭证携带的设置。

## 参考答案

要在跨域请求中携带其他域名下的 Cookie，通常需要确保以下几点：

### 1. **服务器允许跨域请求带上 Cookie**
   - 服务器端设置 `Access-Control-Allow-Origin` 为指定的域或 `*`（但带 Cookie 时不能使用 `*`），例如：
     ```http
     Access-Control-Allow-Origin: https://example.com
     ```
   - 服务器需要设置 `Access-Control-Allow-Credentials` 为 `true`，允许发送凭证（如 Cookie、HTTP 认证信息）：
     ```http
     Access-Control-Allow-Credentials: true
     ```
   - 确保服务器设置的 Cookie `Domain` 属性符合你要共享的域范围。对于 `.example.com` 的 Cookie，`sub.example.com` 和 `another-sub.example.com` 下的请求都可以使用该 Cookie。

### 2. **客户端请求设置**
   - 客户端请求中需要设置 `withCredentials` 为 `true`，允许在跨域请求中发送 Cookie：
     ```javascript
     axios.get('https://api.example.com/data', {
       withCredentials: true
     });
     ```
   - 如果使用 `fetch`，也可以设置 `credentials` 为 `"include"`：
     ```javascript
     fetch('https://api.example.com/data', {
       credentials: 'include'
     });
     ```

### 3. **Cookie 属性的正确配置**
   - Cookie 必须设置 `SameSite=None`，允许跨站点发送，并且设置 `Secure` 属性确保只有在 HTTPS 连接下才发送该 Cookie。示例：
     ```http
     Set-Cookie: sessionId=abc123; SameSite=None; Secure
     ```
   - 确保 Cookie 的 `Domain` 属性被设置为共享的父域名或适合的子域名。这样，API 请求才会自动携带该域的 Cookie。

### 4. **前端和服务端的协议匹配**
   - 确保前端和服务端都通过 HTTPS 访问，`SameSite=None` Cookie 只能在 HTTPS 下使用。
