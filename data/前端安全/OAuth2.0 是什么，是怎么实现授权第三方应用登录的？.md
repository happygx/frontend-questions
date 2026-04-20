---
level: 3
---

# OAuth2.0 是什么，是怎么实现授权第三方应用登录的？

## 题目要点

OAuth2.0 登录通过授权码、安全令牌等机制，让客户端可以安全地代表用户访问资源，适用于第三方应用授权登录，提升用户体验的同时保障用户信息安全。

## 参考答案

OAuth2.0 是一种授权协议，允许第三方应用在不获取用户密码的情况下，安全地访问用户的资源。OAuth2.0 通过 `Access Token` 实现登录授权，应用可以使用该令牌访问用户授权的资源。

### OAuth2.0 登录原理
OAuth2.0 登录主要涉及四个角色：
1. **资源拥有者（Resource Owner）**：通常是用户，拥有资源和访问权限。
2. **客户端（Client）**：需要访问资源的第三方应用（例如社交平台上的某个应用）。
3. **资源服务器（Resource Server）**：存储资源的服务器，提供接口供客户端访问资源。
4. **授权服务器（Authorization Server）**：负责用户认证，并发放 `Access Token` 和 `Refresh Token`。

### OAuth2.0 授权流程
OAuth2.0 提供了四种授权模式，其中最常见的是“授权码模式”（Authorization Code Flow），适合 web 应用，流程如下：

1. **用户授权请求**
   - 用户在客户端应用上点击“使用某平台登录”（例如使用 Google 登录），客户端应用将用户跳转到授权服务器的授权页面。
   - 客户端会传递 `client_id`、`redirect_uri`、`response_type` 等参数。

2. **用户同意授权**
   - 用户在授权页面上登录，并同意授权客户端访问自己的某些资源（如用户信息、邮箱等）。
   - 授权服务器验证用户身份后，生成一个**授权码（Authorization Code）**，将其重定向返回给客户端。

3. **交换授权码获取访问令牌**
   - 客户端收到授权码后，直接向授权服务器请求 `Access Token`。该请求包含 `client_id`、`client_secret`、`grant_type`、`code`、`redirect_uri` 等参数。
   - 授权服务器验证授权码有效后，返回 `Access Token` 和 `Refresh Token`（可选）。

4. **使用 Access Token 访问资源**
   - 客户端拿到 `Access Token` 后，可以在需要时携带该令牌向资源服务器发起请求，资源服务器验证令牌有效性后允许访问。
   - 如果 `Access Token` 过期，可以通过 `Refresh Token` 请求新的 `Access Token`，避免用户重新登录。

### OAuth2.0 中的关键令牌
1. **Authorization Code（授权码）**：用于交换 `Access Token` 的临时凭据。
2. **Access Token（访问令牌）**：允许客户端访问资源的凭证，通常有过期时间。
3. **Refresh Token（刷新令牌）**：当 `Access Token` 过期时，使用 `Refresh Token` 获取新的 `Access Token`，无需用户重新登录。

### 安全性
- **Access Token 有时效性**，过期后需要重新获取，减少安全风险。
- **Refresh Token** 通常有效期较长，用于延长用户会话，适合安全性高的场景。
