---
level: 2
---

# HTTP Request Header和Response Header里面分别都有哪些比较重要的字段

## 题目要点

### HTTP Request Header

1.  **Host**：目标服务器的域名或IP地址。
2.  **User-Agent**：客户端（如浏览器）的标识信息。
3.  **Accept**：客户端可接受的响应内容类型。
4.  **Content-Type**（仅POST/PUT）：请求体的数据类型。
5.  **Content-Length**（仅POST/PUT）：请求体的长度。
6.  **Cookie**：服务器之前设置的cookie信息。
7.  **Authorization**：身份验证信息。
8.  **Referer**：请求来源的URL。

### HTTP Response Header

1.  **Content-Type**：响应体的媒体类型。
2.  **Content-Length**：响应体的长度。
3.  **Cache-Control**：缓存控制策略。
4.  **Expires**：响应内容过期时间。
5.  **Content-Encoding**：响应体的压缩编码方式。
6.  **Set-Cookie**：在客户端设置新的cookie。
7.  **Location**：重定向的目标URL。
8.  **Access-Control-Allow-Origin**：允许跨域请求的来源。
9.  **ETag**：资源的唯一标识，用于缓存验证。

## 参考答案

HTTP Request Header（请求头）和Response Header（响应头）在HTTP通信中扮演着至关重要的角色，它们分别包含了客户端向服务器发送请求时和服务器向客户端返回响应时所需的各种重要信息。以下是这两部分中一些比较重要的字段及其简要说明：

### HTTP Request Header（请求头）

1.  **Host**：指定目标服务器的域名或IP地址。这是必须的字段，因为HTTP是一个基于TCP/IP的协议，没有主机名和端口号，服务器无法知道请求来自哪里。
2.  **User-Agent**：发送请求的用户代理（通常是浏览器标识）。这个字段包含了浏览器名称、版本、操作系统等信息，服务器可以根据这些信息来决定返回给客户端的内容格式。
3.  **Accept**：指定客户端可以接受的内容类型。例如，可以指定接受HTML、JSON、XML等格式的数据。
4.  **Content-Type**：指定在POST或PUT请求中发送的数据的类型。例如，如果发送的是JSON数据，则此字段应设置为`application/json`。
5.  **Content-Length**：指定POST或PUT请求中发送的数据的长度（以字节为单位）。
6.  **Cookie**：包含由服务器发送的cookie信息，这些信息将在后续的请求中自动包含，以便服务器识别用户或保存状态信息。
7.  **Authorization**：用于向服务器提供身份验证信息，例如Bearer token或Basic authentication。
8.  **Referer**：指定原始URL，即从哪个URL页面跳转到了当前页面。这个字段可以用于防盗链、统计来源等。
9.  **Accept-Encoding**：指定浏览器可以支持的web服务器返回内容压缩编码类型。服务器会根据这个字段来选择是否对返回的内容进行压缩，以及使用哪种压缩方式。
10.  **Accept-Language**：浏览器可接受的自然语言的类型。如果没有这个请求头，服务器默认客户端支持所有自然语言。

### HTTP Response Header（响应头）

1.  **Content-Type**：指定响应体的媒体类型。例如，`text/html`表示HTML文档，`application/json`表示JSON数据等。这个字段告诉客户端如何解析返回的数据。
2.  **Content-Length**：指定响应体的长度（以字节为单位）。这个字段有助于客户端了解需要接收多少数据。
3.  **Cache-Control**：指定缓存策略，如缓存的有效期、是否可以缓存等。这个字段对于控制缓存行为非常重要。
4.  **Expires**：设置了Cache-Control缓存时，expires指定缓存过期时间。这个字段告诉客户端响应内容在何时过期，过期后需要重新从服务器获取。
5.  **Content-Encoding**：服务器对响应数据的编码方式，但这里的编码方式不同于编码字符集（如GB2312, UTF-8等），而是指压缩方式，如gzip。这个字段告诉客户端如何解压返回的数据。
6.  **Set-Cookie**：在客户端设置Cookie。这个字段用于在客户端存储一些状态信息，以便在后续的请求中发送给服务器。
7.  **Location**：指定重定向的目标URL。当服务器希望客户端访问另一个URL时，会使用这个字段。
8.  **Access-Control-Allow-Origin**：指定允许跨域请求的来源（CORS）。这个字段用于实现跨域资源共享（CORS）。
9.  **ETag**：资源的一个标识，类似于键值对中的key。ETag通常用于校验一个资源实体是否被修改过，在数据缓存和PUT方法更新资源时非常有用。
