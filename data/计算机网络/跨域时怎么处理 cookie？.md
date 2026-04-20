---
level: 2.5
---

# 跨域时怎么处理 cookie？

## 题目要点

跨域请求默认不携带Cookie，但若需携带，可采取以下措施：

1. **客户端设置**：在发起跨域请求时，将`withCredentials`属性设为`true`。
   - XMLHttpRequest示例：`xhr.withCredentials = true;`
   - Fetch API示例：`fetch(url, { credentials: 'include' });`
2. **服务端处理CORS**：服务器端需配置允许跨域请求携带Cookie。
   - Express框架使用`cors`中间件，并设置`credentials: true`。
   - 其他后端或原生Node.js需设置响应头：

     ```javascript
     response.setHeader('Access-Control-Allow-Origin', 'http://example.com');
     response.setHeader('Access-Control-Allow-Credentials', 'true');
     ```

需谨慎处理跨域携带Cookie的设置，确保安全措施得当，防止安全风险，并遵循同源策略，只允许信任的域名访问。

## 参考答案

在默认情况下，跨域请求是不会携带 Cookie 的，这是为了保护用户隐私和安全考虑。然而，如果确实需要在跨域请求中携带 Cookie，可以通过以下方式进行处理：

1. **设置 withCredentials 属性**：在发送跨域请求的客户端代码中，将 `withCredentials` 属性设置为 `true`。例如，在使用 XMLHttpRequest 或 Fetch API 发起请求时，可以添加如下配置：

   ```javascript
   // XMLHttpRequest
   const xhr = new XMLHttpRequest();
   xhr.withCredentials = true;
   xhr.open('GET', 'https://example.com', true);
   xhr.send();

   // Fetch API
   fetch('https://example.com', { credentials: 'include' })
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => console.log(error));
   ```

2. **服务端处理 CORS（跨域资源共享）请求**：在服务器端，需要对来自其他域的请求进行特殊的处理，以允许跨域请求携带 Cookie。具体的方法取决于所使用的后端技术。

   - 对于 Express 框架，可以使用 `cors` 中间件，并将 `credentials` 设置为 `true`：

     ```javascript
     const express = require('express');
     const cors = require('cors');

     const app = express();
     app.use(cors({ origin: 'http://example.com', credentials: true }));
     ```

   - 对于其他后端框架或原生 Node.js，需要在响应头中设置适当的 CORS 头部：

     ```javascript
     response.setHeader('Access-Control-Allow-Origin', 'http://example.com');
     response.setHeader('Access-Control-Allow-Credentials', 'true');
     ```

需要注意，启用跨域请求携带 Cookie 的设置需谨慎，确保服务端和客户端都进行了适当的安全措施，以防止潜在的安全风险。此外，还要注意遵循同源策略，并只允许受信任的域名访问和携带 Cookie。
