---
level: 2
---

# cookie、localStorage和sessionStorage 三者之间有什么区别

## 题目要点

是cookie、localStorage和sessionStorage三者的区别：

1. **存储时间**：
   - cookie：可设置有效期，甚至永久。
   - sessionStorage：当前会话有效，窗口或标签页关闭即失效。
   - localStorage：除非手动删除，否则永久存储。

2. **存储容量**：
   - cookie：较小，约4KB，且总数有限制。
   - sessionStorage和localStorage：较大，通常约5MB。

3. **与服务端通信**：
   - cookie：会随HTTP请求发送到服务器。
   - sessionStorage和localStorage：不参与与服务端的通信。

4. **数据共享性**：
   - cookie和localStorage：同源下所有窗口/标签页共享。
   - sessionStorage：仅当前窗口/标签页有效。

5. **操作便捷性**：
   - cookie：读写较繁琐，需手动解析字符串。
   - sessionStorage和localStorage：提供简单API（setItem, getItem等）进行读写操作。

## 参考答案

## 生命周期

* cookie：可设置失效时间，没有设置的话，默认是关闭浏览器后失效
* localStorage：除非被手动清除，否则将会永久保存。
* sessionStorage： 仅在当前网页会话下有效，关闭页面或浏览器后就会被清除。

## 存放数据大小

* cookie：4KB左右
* localStorage和sessionStorage：可以保存5MB的信息。

## http请求

* cookie：每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题
* localStorage和sessionStorage：仅在客户端（即浏览器）中保存，不参与和服务器的通信

## 易用性

* cookie：需要程序员自己封装，原生的 Cookie API 不友好
* localStorage和sessionStorage：原生 API 可以接受，亦可再次封装来对Object和Array有更好的支持

## 应用场景

从安全性来说，因为每次http请求都会携带cookie信息，这样无形中浪费了带宽，所以cookie应该尽可能少的使用，另外cookie还需要指定作用域，不可以跨域调用（当前页面只能读取页面所在域的 `cookie`，即 `document.cookie` ），限制比较多。但是用来识别用户登录来说，cookie还是比storage更好用的。其他情况下，可以使用storage，就用storage。

storage在存储数据的大小上面秒杀了cookie，现在基本上很少使用cookie了。

localStorage和sessionStorage唯一的差别一个是永久保存在浏览器里面，一个是关闭网页就清除了信息。localStorage可以用来夸页面传递参数，sessionStorage用来保存一些临时的数据，防止用户刷新页面之后丢失了一些参数。
