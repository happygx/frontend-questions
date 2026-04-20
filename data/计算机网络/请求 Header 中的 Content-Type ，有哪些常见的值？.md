---
level: 2.5
---

# 请求 Header 中的 Content-Type ，有哪些常见的值?

## 题目要点

常见的 `Content-Type` 包括 `application/json`、`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`、`application/xml` 等，选择的值应根据数据的格式和应用场景决定，确保客户端和服务端正确解析数据。

## 参考答案

请求头中的 `Content-Type` 用于指明请求体中数据的格式，以下是常见的 `Content-Type` 值：

1. **application/json**
   - **用途**：传输 JSON 格式的数据，是前后端交互的常见选择。
   - **示例**：`{ "key": "value" }`

2. **application/x-www-form-urlencoded**
   - **用途**：表单数据的默认格式，将数据以键值对的形式传递，通常在简单表单提交中使用。
   - **格式**：`key1=value1&key2=value2`

3. **multipart/form-data**
   - **用途**：上传文件时常用的格式，允许在一个请求中包含文本字段和文件字段。
   - **格式**：数据被分段发送，每段包含字段信息，适合文件和表单混合数据的提交。

4. **text/plain**
   - **用途**：发送未经编码的纯文本内容，适用于简单的文本数据传输。
   - **示例**：`plain text`

5. **application/xml**
   - **用途**：用于传输 XML 格式的数据，通常用于某些旧系统或特定接口。
   - **示例**：`<note><to>User</to></note>`

6. **application/octet-stream**
   - **用途**：用于传输任意的二进制数据，常用于文件下载或上传，表示未知的文件类型。
   - **特点**：数据以字节流的形式传递，适合音视频、图片等多媒体数据。

7. **application/javascript**
   - **用途**：用于传输 JavaScript 代码或脚本内容。
   - **场景**：在接口返回的响应头中更常见，适合动态生成和执行的脚本数据。

8. **text/html**
   - **用途**：传输 HTML 文档，适合网页内容的传输。
   - **特点**：常用于返回页面内容，浏览器会将其识别为 HTML 并渲染。

9. **image/png**、**image/jpeg**、**image/gif**
   - **用途**：传输图像文件，`Content-Type` 中会包含图像的具体格式。
   - **场景**：用于直接访问图片 URL 或上传图像。
