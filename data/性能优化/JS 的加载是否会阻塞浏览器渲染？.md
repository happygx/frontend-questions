---
level: 3
---

# JS 的加载是否会阻塞浏览器渲染？

## 题目要点

- **同步 JavaScript**：会阻塞浏览器的渲染，直到脚本加载和执行完成。
- **异步加载 JavaScript (`async`)**：不会阻塞浏览器的渲染，脚本加载时与 HTML 解析并行，但会在加载完成后立即执行，可能会打乱脚本的执行顺序。
- **延迟加载 JavaScript (`defer`)**：不会阻塞浏览器的渲染，脚本会在 HTML 完全解析后执行，且按顺序执行。
- **内联脚本**：如果没有 `async` 或 `defer`，会阻塞渲染。

### 扩展：如何优化 JavaScript 加载以提高页面渲染速度？

1. **使用 `async` 和 `defer`**：尽量避免同步脚本，使用 `async` 或 `defer` 属性异步加载 JavaScript，减少阻塞。
2. **按需加载**：根据用户交互和需求按需加载 JavaScript 代码，避免一次性加载所有脚本。可以使用代码分割技术（如 Webpack 的 `splitChunks`）来实现。
3. **减少内联脚本**：尽量将脚本移到外部文件，使用 `async` 或 `defer` 来控制脚本加载时机。
4. **资源压缩和合并**：压缩 JavaScript 文件，减少文件的大小，合并多个脚本，减少网络请求的次数。

通过这些优化，能够减少 JavaScript 加载对浏览器渲染的阻塞，从而提升用户的页面加载体验。

## 参考答案

是的，JavaScript 的加载和执行有可能会阻塞浏览器的渲染，但这取决于如何加载和执行 JavaScript 代码。浏览器在处理页面时，需要解析 HTML、CSS 和 JavaScript 文件，同时渲染页面的内容。在加载 JavaScript 时，页面的渲染可能会被阻塞，尤其是在执行同步的 JavaScript 时。

下面我们分几种情况来分析 JavaScript 加载是否会阻塞浏览器渲染：

### 1. **同步 JavaScript (`<script>` 默认行为)**

默认情况下，当浏览器遇到一个 `<script>` 标签时，会停止 HTML 的解析，去加载并执行这个脚本文件，直到脚本执行完毕才会继续解析 HTML 和渲染页面。这种情况下，JavaScript 的加载和执行会阻塞页面的渲染过程，影响用户体验，尤其是在脚本较大或网络较慢时。

#### 示例：
```html
  <head>
    <script src="large-script.js"></script> <!-- 阻塞渲染 -->
  </head>
  <body>
    <h1>Welcome to My Page</h1>
  </body>
</html>
```

### 2. **异步加载 JavaScript (`<script async>`）**

如果将 `<script>` 标签的 `async` 属性添加到 JavaScript 脚本中，浏览器将并行加载 JavaScript 文件，并且一旦加载完成，立即执行该脚本。重要的是，**异步加载不会阻塞 HTML 的解析和渲染**，但由于 `async` 脚本是立即执行的，因此可能会打乱脚本的执行顺序。

#### 示例：
```html
  <head>
    <script src="large-script.js" async></script> <!-- 不阻塞渲染 -->
  </head>
  <body>
    <h1>Welcome to My Page</h1>
  </body>
</html>
```

### 3. **延迟加载 JavaScript (`<script defer>`）**

如果将 `<script>` 标签的 `defer` 属性添加到 JavaScript 脚本中，浏览器会在解析完 HTML 文档后，**延迟执行**这些脚本。这样，JavaScript 的加载不会阻塞 HTML 的解析和页面渲染，但脚本会在页面内容解析完毕后执行。因此，`defer` 适合需要在 DOM 构建完毕后执行的脚本。

#### 示例：
```html
  <head>
    <script src="large-script.js" defer></script> <!-- 不阻塞渲染 -->
  </head>
  <body>
    <h1>Welcome to My Page</h1>
  </body>
</html>
```

### 4. **内联脚本（Inline Scripts）**

对于内联脚本（直接在 HTML 中书写的 `<script>` 标签），如果没有使用 `async` 或 `defer`，它们会像外部同步脚本一样阻塞页面的渲染。内联脚本的执行会暂停 HTML 的解析和页面渲染，直到脚本执行完毕。

#### 示例：
```html
  <head>
    <script>
      console.log('Script running');
    </script> <!-- 阻塞渲染 -->
  </head>
  <body>
    <h1>Welcome to My Page</h1>
  </body>
</html>
```
