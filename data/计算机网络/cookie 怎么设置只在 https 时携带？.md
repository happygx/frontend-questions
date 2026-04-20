---
level: 1
---

# cookie 怎么设置只在 https 时携带？

## 题目要点

**答题要点：**

设置cookie的`secure`属性确实是确保cookie只在HTTPS请求中携带的方法。这个属性可以防止cookie在非安全连接（如HTTP）中被泄露，因为在不安全的连接上传输cookie可能会被中间人攻击者截获。

- **设置`secure`属性**：在设置cookie时，通过指定`secure`属性，可以确保cookie只在HTTPS请求中被发送。
- **默认行为**：如果不设置`secure`属性，cookie会在HTTP和HTTPS请求中都被发送。
- **安全性注意**：即使设置了`secure`属性，cookie本身的内容在客户端仍然可见，因此不应该在cookie中存储敏感信息。

此外，`secure`属性并不防止客户端通过浏览器工具查看cookie，它只是防止cookie在不安全的连接上传输。

## 参考答案

设置 `cookie` 的 `secure` 属性。

`secure`选项用来设置`cookie`只在确保安全的请求中才会发送。当请求是`HTTPS`或者其他安全协议时，包含 `secure` 选项的 `cookie` 才能被发送至服务器。

默认情况下，cookie不会带secure选项(即为空)。所以默认情况下，不管是HTTPS协议还是HTTP协议的请求，cookie 都会被发送至服务端。

但要注意一点，secure选项只是限定了在安全情况下才可以传输给服务端，但并不代表你不能看到这个 cookie。
