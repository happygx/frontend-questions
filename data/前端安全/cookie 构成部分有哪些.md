---
level: 2
---

# cookie 构成部分有哪些

## 参考答案

Cookie 是一种存储在用户浏览器中的小型数据，通常用于保存用户的会话信息或跟踪用户行为。Cookie 由以下几个部分构成：

### **1. 名称（Name）**
- **描述**：Cookie 的键，用于唯一标识该 Cookie。
- **示例**：`username`

### **2. 值（Value）**
- **描述**：与 Cookie 名称关联的数据。可以是字符串或其他数据类型的编码形式。
- **示例**：`john_doe`

### **3. 域（Domain）**
- **描述**：指定 Cookie 可以被哪些域名访问。通常用于限制 Cookie 的使用范围。
- **默认**：如果未设置，默认是创建 Cookie 的域。
- **示例**：`.example.com`（允许子域名访问）

### **4. 路径（Path）**
- **描述**：指定 Cookie 可以被哪些路径访问。通常用于控制 Cookie 在网站中的具体路径。
- **默认**：如果未设置，默认是创建 Cookie 的路径。
- **示例**：`/`（允许整个网站访问）

### **5. 过期时间（Expires）**
- **描述**：指定 Cookie 的过期日期和时间。到达此时间后，Cookie 将被删除。
- **默认**：如果未设置，Cookie 会被视为会话 Cookie，并在浏览器关闭时删除。
- **示例**：`Wed, 01 Jan 2025 00:00:00 GMT`

### **6. 最大有效期（Max-Age）**
- **描述**：指定 Cookie 的有效期（以秒为单位）。与 `Expires` 类似，但通常以相对时间表示。
- **示例**：`3600`（表示 Cookie 将在 1 小时后过期）

### **7. 安全标志（Secure）**
- **描述**：如果设置了 `Secure`，则 Cookie 仅在使用 HTTPS 协议时发送，确保数据传输的安全性。
- **示例**：`Secure`

### **8. HttpOnly 标志（HttpOnly）**
- **描述**：如果设置了 `HttpOnly`，则 Cookie 不能通过 JavaScript 访问，这有助于防止 XSS 攻击。
- **示例**：`HttpOnly`

### **9. SameSite 标志（SameSite）**
- **描述**：控制 Cookie 的跨站点请求策略，减少 CSRF 攻击的风险。可以设置为 `Strict`、`Lax` 或 `None`。
- **示例**：`SameSite=Lax`
