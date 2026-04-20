---
level: 1
---

# cookie中的 HttpOnly 属性有什么用途？

## 题目要点

**答题要点：**

在Web开发中，Cookie用于存储客户端与服务器之间的会话信息。然而，Cookies可以被客户端脚本（如JavaScript）读取和修改，这可能导致安全风险，尤其是对于那些包含敏感信息的Cookies。

为了提高安全性，开发者可以设置Cookie的`HttpOnly`属性。当一个Cookie设置了`HttpOnly`属性时，它就只能通过HTTP协议头进行设置和访问，而不能通过JavaScript脚本访问。这意味着即使攻击者能够访问用户的Cookies，也无法通过JavaScript脚本来读取或修改这些Cookies，从而提高了网站的安全性。

简单来说，`HttpOnly`属性用于防止跨站脚本攻击（XSS）中的Cookie劫持，因为即使攻击者能够注入恶意脚本，也无法访问这些标记为`HttpOnly`的Cookies。
举例来说，如果一个Cookie包含了用户的会话ID，没有设置`HttpOnly`属性，那么攻击者可以利用XSS攻击读取并修改这个Cookie，从而获取用户的会话信息。但如果这个Cookie设置了`HttpOnly`属性，攻击者就无法通过JavaScript脚本访问它，从而减少了安全风险。
因此，建议对于包含敏感信息的Cookies，都应设置`HttpOnly`属性，以增强网站的安全性。

## 参考答案

MDN 上对HttpOnly属性的解释： 

> JavaScript Document.cookie API 无法访问带有 HttpOnly 属性的cookie；此类 Cookie 仅作用于服务器。例如，持久化服务器端会话的 Cookie 不需要对 JavaScript 可用，而应具有 HttpOnly 属性。此预防措施有助于缓解跨站点脚本（XSS） (en-US)攻击。

也就是说，对于设置了 HttpOnly 属性为 true 的cookie，无法通过 js 进行访问或其他操作，只是在发送对应域下的请求时，浏览器会自动带上。这样可以有效缓解 XSS 攻击。
