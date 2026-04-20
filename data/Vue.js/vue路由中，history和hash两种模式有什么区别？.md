---
level: 2
---

# vue路由中，history和hash两种模式有什么区别？

## 题目要点

前端路由有 hash 模式和 history 模式两种。

#### hash 模式

- **实现方式**：通过在 URL 后面添加井号 `#` 加上路径来切换页面，例如 `http://example.com/#/a`。
- **优缺点**：
  - **优点**：兼容性好，支持老版本的浏览器。
  - **缺点**：URL 中存在井号 `#`，不够美观。

#### history 模式

- **实现方式**：使用 HTML5 的 History API 直接更改 URL，例如 `http://example.com/a`。
- **优缺点**：
  - **优点**：URL 更美观，没有井号 `#`。
  - **缺点**：兼容性不如 hash 模式，且需要服务端支持，否则刷新页面会返回 404。

## 参考答案

前端路由有两种模式：hash 模式和 history 模式，接下来分析这两种模式的实现方式和优缺点。

## hash 模式

hash 模式是一种把前端路由的路径用井号 `#` 拼接在真实 URL 后面的模式。当井号 `#` 后面的路径发生变化时，浏览器并不会重新发起请求，而是会触发 `hashchange` 事件。

**示例**：

我们新建一个 `hash.html` 文件，内容为：

```html
<a href="#/b">B页面</a>
<div id="app"></div>
<script>
  function render() {
    app.innerHTML = window.location.hash
  }
  window.addEventListener('hashchange', render)
  render()
</script>
```

总结一下 hash 模式的优缺点：

- **优点**：浏览器兼容性较好，连 IE8 都支持
- **缺点**：路径在井号 `#` 的后面，比较丑

## history 模式

history API 是 H5 提供的新特性，允许开发者直接更改前端路由，即更新浏览器 URL 地址而不重新发起请求。


**示例**：

我们新建一个 `history.html`，内容为：

```html
<a href="javascript:toB();">B页面</a>
<div id="app"></div>
<script>
  function render() {
    app.innerHTML = window.location.pathname
  }
  function toA() {
    history.pushState({}, null, '/a')
    render()
  }
  function toB() {
    history.pushState({}, null, '/b')
    render()
  }
  window.addEventListener('popstate', render)
</script>
```

```js
history.pushState({}, null, '/a') // 路由压栈
history.back() // 返回
history.forward() // 前进
history.go(-2) // 后退2次
```

- 用户点击浏览器的前进和后退操作
- 手动调用 history 的 `back`、`forward` 和 `go` 方法

监听不到：

- history 的 `pushState` 和 `replaceState`方法

这也是为什么上面的 `toA` 和 `toB` 函数内部需要手动调用 `render` 方法的原因。另外，大家可能也注意到 `light-server` 的命令多了 `--historyindex '/history.html'` 参数，这是干什么的呢？

浏览器在刷新的时候，会按照路径发送真实的资源请求，如果这个路径是前端通过 history API 设置的 URL，那么在服务端往往不存在这个资源，于是就返回 404 了。上面的参数的意思就是如果后端资源不存在就返回 `history.html` 的内容。

因此在线上部署基于 history API 的单页面应用的时候，一定要后端配合支持才行，否则会出现大量的 404。以最常用的 Nginx 为例，只需要在配置的 `location /` 中增加下面一行即可：

```
```

- **优点**：路径比较正规，没有井号 `#`
- **缺点**：兼容性不如 hash，且需要服务端支持，否则一刷新页面就404了


[history-mdn]: https://developer.mozilla.org/zh-CN/docs/Web/API/History

> 本答案由“前端面试题宝典”收集整理，PC端访问请前往： https://fe.ecool.fun/
