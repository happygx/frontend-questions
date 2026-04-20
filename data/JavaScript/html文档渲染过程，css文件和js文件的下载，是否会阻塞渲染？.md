---
level: 3
---

# html文档渲染过程，css文件和js文件的下载，是否会阻塞渲染？

## 题目要点

### HTML 文档渲染过程

1. **解析 HTML**：浏览器开始解析 HTML 文档，构建 DOM 树。
2. **解析 CSS**：在解析过程中，浏览器会并行下载和解析 CSS 文件。
3. **解析 JS**：同样，浏览器会并行下载和解析 JS 文件。
4. **构建 Render Tree**：将 DOM 树和 CSSOM（CSS 对象模型）树合并，生成 Render Tree。
5. **布局**：计算 Render Tree 中每个节点的几何位置。
6. **绘制**：将 Render Tree 中的节点绘制到屏幕上。

### CSS 文件下载和解析

- **不会阻塞 HTML 解析**：CSS 文件的下载不会阻塞 HTML 的解析，但会阻塞 DOM 的渲染。
- **阻塞 DOM 渲染**：在 CSS 文件下载和解析完成之前，浏览器不会开始布局和绘制过程。
- **优先级**：为了优化性能，浏览器会尽可能早地渲染页面，而不是等待所有 CSS 文件都加载和解析完成。

### JS 文件下载和解析

- **阻塞渲染**：JS 文件的下载和解析会阻塞 GUI 渲染进程，包括 DOM 和 CSS 的解析和渲染。
- **执行顺序**：浏览器会等待 JS 文件下载和解析完成后，才会执行其中的代码。
- **影响**：JS 文件未下载和解析完成之前，后续的 HTML 和 CSS 无法解析。

### 总结

- **CSS 文件**：下载和解析不会阻塞 HTML 的解析，但会阻塞 DOM 的渲染。浏览器会尽可能早地渲染页面，而不是等待所有 CSS 文件都加载和解析完成。
- **JS 文件**：下载和解析会阻塞 GUI 渲染进程，包括 DOM 和 CSS 的解析和渲染。浏览器会等待 JS 文件下载和解析完成后，才会执行其中的代码。

## 参考答案

浏览器内有多个进程，其中渲染进程被称为浏览器内核，负责页面渲染和执行 JS 脚本等。渲染进程负责浏览器的解析和渲染，内部有 JS 引擎线程、 GUI 渲染线程、事件循环管理线程、定时器线程、HTTP 线程。

JS 引擎线程负责执行 JS 脚本，GUI 渲染线程负责页面的解析和渲染，两者是互斥的，也就是执行 JS 的时候页面是停止解析和渲染的。这是因为如果在页面渲染的同时 JS 引擎修改了页面元素，比如清空页面，会造成后续页面渲染的不必要和错误。而由于 JS 经常要操作 DOM ，就要涉及 JS 引擎线程和 GUI 渲染线程的通信，而线程间通信代价是非常昂贵的，这也是造成 JS 操作 DOM 效率不高的原因。


浏览器的 HTML/CSS 的解析和渲染都属于 GUI渲染线程，所以和 JS 引擎线程是互斥、阻塞的。下面从代码实际运行的角度分析浏览器解析和渲染的顺序，以及互相间的阻塞关系。

## CSS 阻塞

* css 文件的下载和解析不会影响 DOM 的解析，但是会阻塞 DOM 的渲染。因为 CSSOM Tree 要和 DOM Tree 合成 Render Tree 才能绘制页面。下面的 test1 在 css 下载并解析完成前是默认样式， test2 在 css 下载并解析完成之前不会显示：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css">
<div>test2</div>
```

```html
<script>
    alert('ok')
</script>
```

```html
    alert('ok')
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css">
```

## js 阻塞

js 文件的下载和解析会阻塞 GUI 渲染进程，也就是会阻塞 DOM 和 CSS 的解析和渲染。

js 文件没下载并解析完成之前，后续的 HTML 和 CSS 无法解析：

```html
<div>test</div>
```

```html
<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
```

* 第一，GUI 渲染线程会尽可能早的将内容呈现到屏幕上，并不会等到所有的 HTML 都解析完成之后再去构建和布局 Render Tree，而是解析完一部分内容就显示一部分内容，同时，可能还在通过网络下载其余内容。下面 test1 会在 js 文件下载完成前渲染完成，而 test2 则会在 js 文件下载并执行完之后渲染：

```html
  <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
  <div>test2</div>
```

```html
  <script>
    document.body.remove()
  </script>  
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css">
  <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
</body>
```
