---
level: 3
---

# 说说你对 http 协议中 HSTS 的理解

## 题目要点

HSTS 是一种重要的 Web 安全策略，通过强制使用 HTTPS，有效防止协议降级攻击和中间人攻击。然而，为了确保其安全性，服务器和站点必须全面支持 HTTPS，且在部署 HSTS 时需要谨慎配置，避免对用户体验产生负面影响。结合 HSTS Preload，可以进一步提升首访的安全性。

## 参考答案

### **什么是 HSTS？**

HSTS，全称是 **HTTP Strict Transport Security**，即 **HTTP 严格传输安全**，是一种 Web 安全机制。HSTS 可以通过 HTTP 响应头 `Strict-Transport-Security`，指示浏览器在一段时间内强制使用 HTTPS 来访问某个网站，禁止通过 HTTP 连接，从而防止中间人攻击（MITM）和协议降级攻击。

---

### **HSTS 的工作原理**

1. **服务器启用 HSTS**：服务器通过响应头 `Strict-Transport-Security` 告诉浏览器，该站点应该始终通过 HTTPS 访问。
2. **浏览器强制 HTTPS**：
   - 浏览器会记录 HSTS 策略，接下来的访问会自动从 HTTP 跳转到 HTTPS，无需服务器返回重定向。
   - 即使用户手动输入 `http://example.com`，浏览器也会直接使用 `https://example.com`。
3. **保护作用**：避免中间人通过拦截 HTTP 请求或劫持协议的方式，实施攻击。

---

### **HSTS 响应头**

HSTS 的配置通过设置 HTTP 响应头 `Strict-Transport-Security` 来实现。其常用语法如下：
```http
```
- **`max-age`**：  
  - 必须字段，单位是秒，表示 HSTS 策略在浏览器中生效的时间。
  - 常见设置为 31536000（1 年）。

- **`includeSubDomains`**（可选）：  
  - 如果指定，策略适用于主域名及其所有子域名。

- **`preload`**（可选）：  
  - 让网站加入 HSTS Preload 列表，避免首次访问被降级为 HTTP。

---

### **HSTS 示例**

#### **基础配置**
仅强制主域名使用 HTTPS：
```http
```
强制主域名及所有子域名使用 HTTPS：
```http
```
在主域名、子域名启用 HSTS，并支持预加载：
```http
```

### **HSTS 的优势**

1. **防止协议降级攻击**：  
   即使攻击者尝试通过 HTTP 劫持用户连接，HSTS 也会强制浏览器直接使用 HTTPS。

2. **提高数据传输安全性**：  
   所有的传输内容都会通过 HTTPS 加密，防止敏感数据被窃取。

3. **性能优化**：  
   避免 HTTP 到 HTTPS 的 301 重定向，提高首屏加载速度。

4. **提升 SEO 排名**：  
   搜索引擎（如 Google）优先处理 HTTPS 站点，HSTS 可以提高安全性评分。

---

### **HSTS 的局限性**

1. **首次访问的风险**：
   - 如果用户首次访问时使用 HTTP，并且中间人进行了劫持，那么 HSTS 无法生效。
   - 解决方法：加入 **HSTS Preload 列表**，让浏览器内置对站点的 HSTS 支持。

2. **错误配置的影响**：
   - 例如设置了错误的子域名策略或低效的过期时间，可能导致站点无法正常访问。

3. **对开发环境的影响**：
   - 开发测试时，HSTS 会缓存策略，导致本地开发过程中调试不便。

4. **需要完全支持 HTTPS**：
   - 所有资源（包括图片、脚本、第三方库等）必须通过 HTTPS 加载。

---

### **HSTS 与 HSTS Preload 列表**

HSTS Preload 是一个由浏览器维护的内置列表，记录了启用 HSTS 的站点。在用户首次访问这些站点时，浏览器会直接使用 HTTPS。

#### **加入 HSTS Preload 的条件**：
- 设置 `Strict-Transport-Security` 响应头，且包含以下字段：
  ```http
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  ```
- 支持 HTTPS，并确保主域及其子域始终通过 HTTPS 访问。
- 在 Google 的 [HSTS Preload 网站](https://hstspreload.org/) 提交申请。
