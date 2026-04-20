---
level: 1.5
---

# JSONP 是如何实现跨域的?

## 题目要点

JSONP 通过利用 `<script>` 标签的跨域特性和回调函数的方式实现跨域数据请求。尽管它在某些场景下有效，但由于安全和功能限制，现代开发中更多地推荐使用 CORS 作为跨域解决方案。

## 参考答案

## JSONP

JSONP 的实现原理是通过添加一个 script 标签，指定 src 属性为跨域请求的 URL，而这个 URL 返回的不是 JSON 数据，而是一段可执行的 JavaScript 代码，这段代码会调用一个指定的函数，并且将 JSON 数据作为参数传入函数中。

例如，假设我们从 `http://example.com` 域名下请求数据，我们可以通过在 `http://example.com` 中添加如下代码实现 JSONP 请求：

```js
  // 处理获取到的数据
}

const script = document.createElement('script');
script.src = 'http://example.org/api/data?callback=handleData';
document.head.appendChild(script);
```
```js
```

### 如何获取 jsonp 的相应参数

获取 JSONP 响应结果的方法有两种，**一种是通过回调函数参数获取**，**另一种是通过 script 标签加载完成后解析全局变量获取**。

假设服务器返回以下 JSONP 响应：

```js
```

我们可以使用以下两种方式获取响应结果：

**1. 通过回调函数参数获取**
在客户端定义一个全局函数作为回调函数，服务器返回的数据会作为回调函数的参数传入，这个参数可以在回调函数中处理。
```js
  console.log(data.name); // Alice
  console.log(data.age); // 20
}

// 创建 script 标签
const script = document.createElement('script');
script.src = 'http://example.com/api?callback=handleResponse';

// 插入到文档中开始加载数据
document.body.appendChild(script);
```
在客户端定义一个全局函数作为回调函数，服务器返回的数据会作为一个全局变量赋值给该函数所在的对象，我们可以在 script 标签加载完成后解析全局变量获取响应结果。
```js
  console.log(myData.name); // Alice
  console.log(myData.age); // 20
}

// 创建 script 标签
const script = document.createElement('script');
script.src = 'http://example.com/api?callback=handleResponse';

// 插入到文档中开始加载数据
document.body.appendChild(script);

// script 标签加载完成后解析全局变量
window.myData = {};
script.onload = () => {
  delete window.myData; // 删除全局变量
};
```
