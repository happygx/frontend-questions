---
level: 3
---

# js和css是否阻塞DOM树构建和渲染？

## 题目要点

JavaScript (JS) 和层叠样式表 (CSS) 都可能以不同的方式影响 DOM（文档对象模型）树的构建和渲染过程。

#### CSS 对 DOM 树构建的影响

1. **阻塞渲染**：
   - CSS 会阻塞 DOM 的解析和渲染。浏览器必须在构建 DOM 树时获取到 CSS，以便正确渲染页面。
   - 这被称为“渲染阻塞资源”，因为浏览器会等待 CSS 加载完成才能进行渲染。

2. **关键渲染路径**：
   - CSS 是关键渲染路径的一部分，直接影响页面的首次渲染时间。

3. **异步加载**：
   - 如果 CSS 文件被标记为异步加载（`async` 或 `defer`），它们不会阻塞 DOM 的解析，但会影响渲染。

#### JS 对 DOM 树构建的影响

1. **阻塞 DOM 解析**：
   - 内联 JavaScript（直接在 HTML 中编写的 JS）会阻塞 DOM 解析，直到脚本执行完成。
   - 外部 JavaScript 文件如果被放置在文档头部，也会阻塞 DOM 解析，直到文件下载并执行完成。

2. **修改 DOM**：
   - JS 可以在 DOM 解析完成后修改 DOM 树，这可能会触发重新渲染和重排。

3. **异步 JavaScript**：
   - 使用 `async` 或 `defer` 属性的外部 JS 文件可以异步加载，不会阻塞 DOM 解析，但会影响 DOM 的最终渲染。

4. **DOMContentLoaded 事件**：
   - `DOMContentLoaded` 事件在 DOM 树构建完成但不包括 CSS 和图片等资源时触发，可以用于执行不依赖于 CSS 的 JS 代码。

#### 考察重点

- 理解：CSS 和 JS 如何影响 DOM 树的构建和渲染。
- 优化：知道如何通过异步加载或延迟执行 JS 和 CSS 来优化页面加载性能。

## 参考答案

先做个总结，然后再进行具体的分析：

CSS不会阻塞DOM的解析，但是会影响JAVAScript的运行，javascript会阻止DOM树的解析，最终css（CSSOM）会影响DOM树的渲染，也可以说最终会影响渲染树的生成。

接下来我们先看javascript对DOM树构建和渲染是如何造成影响的，分成三种类型来讲解：

## JavaScript脚本在html页面中

```html
  <body>
    <div>1</div>
    <script>
      let div1 = document.getElementsByTagName('div')[0]
      div1.innerText = 'time.geekbang'
    </script>
    <div>test</div>
  </body>
</html>
```

当解析到script脚本标签时，HTML解析器暂停工作，javascript引擎介入，并执行script标签中的这段脚本。

因为这段javascript脚本修改了DOM中第一个div中的内容，所以执行这段脚本之后，div节点内容已经修改为time.geekbang了。脚本执行完成之后，HTML解析器回复解析过程，继续解析后续的内容，直至生成最终的DOM。

## html页面中引入javaScript文件

```js
let div1 = document.getElementsByTagName('div')[0]
div1.innerText = 'time.geekbang'
```
<html>
  <body>
    <div>1</div>
    <script type="text/javascript" src='foo.js'></script>
    <div>test</div>
  </body>
</html>
```

其整个执行流程还是一样的，执行到JAVAScript标签时，暂停整个DOM的解析，执行javascript代码，不过这里执行javascript时，需要现在在这段代码。这里需要重点关注下载环境，因为javascript文件的下载过程会阻塞DOM解析，而通常下载又是非常耗时的，会受到网络环境、javascript文件大小等因素的影响。

优化机制：

谷歌浏览器做了很多优化，其中一个主要的优化就是预解析操作。当渲染引擎收到字节流之后，会开启一个预解析线程，用来分析HTML文件中包含的JavaScript、CSS等相关文件，解析到相关文件之后，会开启一个预解析线程，用来分析HTML文件中包含的javascprit、css等相关文件、解析到相关文件之后，预解析线程会提前下载这些文件。

再回到 DOM 解析上，我们知道引入 JavaScript 线程会阻塞 DOM，不过也有一些相关的策略来规避，比如使用 CDN 来加速 JavaScript 文件的加载，压缩 JavaScript 文件的体积。

另外，如果 JavaScript 文件中没有操作 DOM 相关代码，就可以将该 JavaScript 脚本设置为异步加载，通过 async 或 defer 来标记代码，使用方式如下所示：

```
<script defer type="text/javascript" src='foo.js'></script>
```

* async：脚本并行加载，加载完成之后立即执行，执行时机不确定，仍有可能阻塞HTML解析，执行时机在load事件派发之前。
* defer：脚本并行加载，等待HTML解析完成之后，按照加载顺序执行脚本，执行时机DOMContentLoaded事件派发之前。

## html页面中有css样式

```css
div {color:blue}
```
<html>
<head>
    <style src='theme.css'></style>
</head>
<body>
  <div>1</div>
  <script>
      let div1 = document.getElementsByTagName('div')[0]
      div1.innerText = 'time.geekbang' // 需要 DOM
      div1.style.color = 'red' // 需要 CSSOM
  </script>
  <div>test</div>
</body>
</html>
```

而 JavaScript 引擎在解析 JavaScript 之前，是不知道 JavaScript 是否操纵了 CSSOM的，所以渲染引擎在遇到 JavaScript 脚本时，不管该脚本是否操纵了 CSSOM，都会执行CSS 文件下载，解析操作，再执行 JavaScript 脚本。所以说 JavaScript 脚本是依赖样式表的，这又多了一个阻塞过程。

总结：通过上面三点的分析，我们知道了 JavaScript 会阻塞 DOM 生成，而样式文件又会阻塞js的执行。
