---
level: 1.5
---

# CORS 是如何实现跨域的？

## 题目要点

- 简单请求通过 `Origin` + `Access-Control-Allow-Origin` 快速协商
- 非简单请求需预检 OPTIONS 验证
- 带凭证的请求需严格配置源和 `Allow-Credentials`
- 服务端通过响应头声明跨域权限策略
- 现代浏览器自动处理 CORS 流程，开发者只需正确配置头部

## 参考答案

CORS (Cross-Origin Resource Sharing) 的实现机制是通过 HTTP 头部协商来安全地控制跨域请求，其核心流程可分为**简单请求**和**预检请求**两种模式：

### 一、简单请求（Simple Request）
满足以下条件的请求会直接发送（无需预检）：
1. **方法限制**：GET / HEAD / POST
2. **头部限制**：仅允许以下安全头部：
   - `Accept`、`Accept-Language`、`Content-Language`
   - `Content-Type` 仅限 `text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded`
3. **流程**：
   - 浏览器自动添加 `Origin` 头部（如 `Origin: https://foo.com`）
   - 服务端响应需包含：
     ```http
     Access-Control-Allow-Origin: https://foo.com  // 或 *（不推荐带凭证时使用）
     Access-Control-Allow-Credentials: true       // 可选，允许携带 Cookie
     ```
   - 若响应头未通过验证，浏览器会拦截响应

### 二、预检请求（Preflight Request）
不满足简单请求条件的请求（如 PUT/DELETE 或自定义头部），会先发送 OPTIONS 请求进行协商：
1. **预检请求头部**：
   ```http
   OPTIONS /resource HTTP/1.1
   Origin: https://foo.com
   Access-Control-Request-Method: DELETE
   Access-Control-Request-Headers: X-Custom-Header
   ```
2. **服务端必须响应**：
   ```http
   HTTP/1.1 204 No Content
   Access-Control-Allow-Origin: https://foo.com
   Access-Control-Allow-Methods: GET, POST, DELETE
   Access-Control-Allow-Headers: X-Custom-Header
   Access-Control-Max-Age: 86400  // 缓存预检结果（秒）
   ```
3. **正式请求**：预检通过后才会发送实际请求

### 三、关键控制头部
| 头部字段                          | 作用                                                                 |
|-----------------------------------|----------------------------------------------------------------------|
| `Access-Control-Allow-Origin`     | 指定允许访问的源（需精确匹配或配置动态白名单）                       |
| `Access-Control-Expose-Headers`   | 允许前端访问的额外响应头（默认仅能获取简单响应头）                   |
| `Access-Control-Allow-Credentials`| 是否允许携带 Cookie（需配合 `credentials: 'include'` 使用）          |
| `Access-Control-Allow-Methods`    | 预检请求中声明允许的 HTTP 方法                                       |
| `Access-Control-Allow-Headers`    | 预检请求中声明允许的自定义请求头                                     |

### 四、实际场景示例
**带凭证的 API 调用**：
```javascript
  credentials: 'include',
  headers: { 'Authorization': 'Bearer token' }
})
```
```http
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: Authorization
```
1. 避免滥用 `*` 通配符，应配置明确的源白名单
2. 敏感操作应结合 CSRF 防护（如 SameSite Cookie）
3. 对于复杂请求，合理设置 `Access-Control-Max-Age` 减少预检开销
