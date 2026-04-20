---
level: 2
---

# ajax、axios、fetch有什么区别？

## 题目要点

### AJAX

- **定义**：AJAX 是一种用于创建交互式网页的技术，它通过在后台与服务器进行数据交换，实现网页的部分更新，而不需要重新加载整个页面。
- **优点**：
  - 提高网页的交互性和用户体验。
  - 减轻服务器和网络的负担，因为不需要每次交互都加载整个页面。
- **缺点**：
  - 原生 XHR 架构不清晰，配置和调用方式混乱。
  - 不符合关注分离的原则。
  - 不利于MVVM架构的前端开发。

### Fetch API

- **定义**：Fetch API 是现代浏览器提供的一种用于在浏览器中与服务器交换数据的机制，它取代了传统的 XMLHttpRequest 对象。
- **优点**：
  - 语法简洁，基于 Promise 实现，支持 async/await。
  - 提供丰富的 API，如 request 和 response。
  - 是 ES 规范中的新实现方式，与原生 JavaScript 更贴合。
- **缺点**：
  - 默认不处理错误状态码，如 400 或 500。
  - 不支持自动带上 cookie。
  - 不支持超时控制和取消请求。
  - 无法原生监测请求进度。

### Axios

- **定义**：Axios 是一个基于 Promise 的 HTTP 客户端，用于浏览器和 node.js，它可以拦截请求和响应，自动转换 JSON 数据，并且可以抵御 XSRF 攻击。
- **优点**：
  - 浏览器端和 node.js 端都可以使用。
  - 支持 Promise API，易于使用。
  - 支持拦截请求和响应。
  - 自动转换 JSON 数据。
  - 支持抵御 XSRF 攻击。
- **缺点**：
  - 虽然基于原生 XHR，但提供了更友好的 API。
  - 功能强大，但可能增加学习成本。

AJAX 是传统的解决方案，Fetch API 是现代浏览器推荐的新标准，而 Axios 是一个更强大的库，提供了一系列的便捷功能。在实际开发中，应根据项目需求和团队熟悉度选择合适的技术。

## 参考答案

## （1）AJAX

Ajax 即“AsynchronousJavascriptAndXML”（异步 JavaScript 和 XML），是指一种创建交互式网页应用的网页开发技术。它是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。通过在后台与服务器进行少量数据交换，Ajax 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。传统的网页（不使用 Ajax）如果需要更新内容，必须重载整个网页页面。其缺点如下：

* 本身是针对MVC编程，不符合前端MVVM的浪潮
* 基于原生XHR开发，XHR本身的架构不清晰
* 不符合关注分离（Separation of Concerns）的原则
* 配置和调用方式非常混乱，而且基于事件的异步模型不友好。

## （2）Fetch
fetch号称是AJAX的替代品，是在ES6出现的，使用了ES6中的promise对象。Fetch是基于promise设计的。Fetch的代码结构比起ajax简单多。fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象。

fetch的优点：

* 语法简洁，更加语义化
* 基于标准 Promise 实现，支持 async/await
* 更加底层，提供的API丰富（request, response）
* 脱离了XHR，是ES规范里新的实现方式

fetch的缺点：

* fetch只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
* fetch默认不会带cookie，需要添加配置项： fetch(url, {credentials: 'include'})
* fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
* fetch没有办法原生监测请求的进度，而XHR可以

## （3）Axios

Axios 是一种基于Promise封装的HTTP客户端，其特点如下：

* 浏览器端发起XMLHttpRequests请求
* node端发起http请求
* 支持Promise API
* 监听请求和返回
* 对请求和返回进行转化
* 取消请求
* 自动转换json数据
* 客户端支持抵御XSRF攻击
