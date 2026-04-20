---
level: 2.5
---

# CORS 请求中，什么情况下会触发预检请求？

## 题目要点

预检请求是浏览器为安全地处理复杂跨域请求而引入的机制。它主要在非简单请求中被触发，用于确保目标服务器明确允许该跨域请求。通过优化请求方法、请求头以及服务器设置，可以减少不必要的预检请求，从而提升性能和用户体验。

## 参考答案

在 **CORS** (Cross-Origin Resource Sharing) 请求中，**预检请求（Preflight Request）** 是浏览器为确保跨域安全而发送的一种请求。它使用 `OPTIONS` 方法，在实际请求之前询问目标服务器是否允许这种跨域操作。

---

### **触发预检请求的条件**

预检请求会在以下情况下被触发：

1. **请求方法不属于简单方法**：  
   请求方法不在以下列表中时会触发预检请求：
   - `GET`
   - `POST`
   - `HEAD`

2. **请求头包含非简单头**：  
   如果请求中使用了自定义头或某些不被认为是“简单头”的 HTTP 请求头，浏览器会触发预检请求。例如：
   - 自定义头，如 `X-Custom-Header`。
   - 非简单头，如 `Content-Type` 设置为以下值之外的类型：
     - `text/plain`
     - `application/x-www-form-urlencoded`
     - `multipart/form-data`

3. **`Content-Type` 非简单类型**：  
   当 `Content-Type` 不属于以下简单类型时：
   - `text/plain`
   - `application/x-www-form-urlencoded`
   - `multipart/form-data`

4. **`credentials` 的使用**：  
   如果请求设置了跨域凭据标志（`credentials: include`），并且跨域时不符合简单请求规则，也可能触发预检请求。

5. **使用了其他 HTTP 方法**：  
   如果使用了如 `PUT`、`DELETE`、`PATCH` 等方法，通常会触发预检请求。

---

### **预检请求的作用**

1. **探测服务器支持的跨域规则**：  
   预检请求通过 `OPTIONS` 方法发送，包含浏览器希望执行的跨域请求的相关信息，如：
   - 请求方法
   - 请求头
   - 请求的源站

   服务器需要在响应中明确表明是否允许该跨域请求。

2. **确定跨域安全性**：  
   预检请求帮助浏览器在实际发送数据之前验证目标服务器是否允许该操作，以防止潜在的安全威胁。

---

### **预检请求示例**

#### **请求示例**
客户端请求：
```http
Host: example.com
Origin: https://my-origin.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-Custom-Header
```
如果服务器允许跨域，则会返回类似的响应：
```http
Access-Control-Allow-Origin: https://my-origin.com
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Max-Age: 3600
```

### **如何避免触发预检请求？**

1. **使用简单请求**：
   - 确保使用 `GET`、`POST` 或 `HEAD` 方法。
   - 避免自定义请求头，使用默认的 `Content-Type`（如 `application/x-www-form-urlencoded`）。

2. **优化服务器设置**：
   - 在响应中添加 `Access-Control-Max-Age`，指定预检请求结果的缓存时间（单位为秒），减少频繁的预检请求。例如：
     ```http
     Access-Control-Max-Age: 3600
     ```

3. **合并请求**：
   - 如果可以，将多个复杂请求拆分为简单请求，以减少跨域复杂度。
