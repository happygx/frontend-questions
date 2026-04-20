---
level: 3
---

# HTML 部分标签中的 crossorigin 属性，作用是什么？

## 题目要点

- **`crossorigin="anonymous"`**：请求不包含凭证，适用于公开资源。
- **`crossorigin="use-credentials"`**：请求包含凭证，适用于需要用户认证的资源。

## 参考答案

`crossorigin` 属性用于指定如何处理跨域请求，特别是在加载外部资源（如图片、字体或脚本）时。它主要用于 `<link>` 和 `<img>` 标签以及一些其他 HTML 元素。该属性的作用是定义浏览器如何处理 CORS（跨域资源共享）请求。

### **`crossorigin` 属性的取值和作用**

1. **`anonymous`**

   - **作用**：请求不会包含凭证（如 Cookies 和 HTTP 认证信息）。这是默认的 CORS 策略，适用于大多数情况，特别是公共资源。
   - **示例**：
     ```html
     <link rel="stylesheet" href="styles.css" crossorigin="anonymous">
     <img src="image.jpg" crossorigin="anonymous">
     ```
   - **用途**：用于公共资源，例如从 CDN 加载的样式表或图片，这些资源不需要用户认证。

2. **`use-credentials`**

   - **作用**：请求会包含凭证（如 Cookies 和 HTTP 认证信息），用于需要身份验证的资源。要求服务器在响应头中包含 `Access-Control-Allow-Credentials: true`。
   - **示例**：
     ```html
     <link rel="stylesheet" href="styles.css" crossorigin="use-credentials">
     <img src="image.jpg" crossorigin="use-credentials">
     ```
   - **用途**：用于需要用户认证的资源，例如需要登录的内容。

### **如何工作**

- **资源请求**：当浏览器请求跨域资源时，会根据 `crossorigin` 属性的值决定是否发送凭证。
- **响应头**：服务器需要在响应头中设置 CORS 相关的头信息（如 `Access-Control-Allow-Origin` 和 `Access-Control-Allow-Credentials`），以允许资源被成功加载。
