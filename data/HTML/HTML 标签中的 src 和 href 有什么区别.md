---
level: 0.5
---

# HTML 标签中的 src 和 href 有什么区别

## 题目要点

`src` 和 `href` 都用于指定资源的 URL，但应用场景不同。`src` 用于嵌入和加载外部资源，而 `href` 用于定义超链接和引用资源。了解这两者的区别有助于正确使用 HTML 属性以实现所需的功能。

## 参考答案

`src` 和 `href` 是 HTML 中用于不同目的的属性，各自有其特定的使用场景和功能：

### `src` 属性

- **用途**：用于指定外部资源的 URL，通常用在 `<img>`、`<script>`、`<iframe>`、`<audio>` 和 `<video>` 等标签中。
- **功能**：告诉浏览器从哪个 URL 加载资源。加载的资源会嵌入到当前页面中或执行。例如：
  - `<img src="image.jpg" alt="Description">`：加载并显示图像。
  - `<script src="script.js"></script>`：加载并执行 JavaScript 文件。
  - `<iframe src="https://example.com"></iframe>`：嵌入外部网页。

### `href` 属性

- **用途**：用于定义超链接的目标 URL，通常用在 `<a>`（锚点）和 `<link>`（链接） 标签中。
- **功能**：指定链接或引用的资源地址。用于页面间的导航、资源引入等。例如：
  - `<a href="https://example.com">Visit Example</a>`：创建一个指向外部网站的超链接。
  - `<link rel="stylesheet" href="styles.css">`：引入外部 CSS 样式表。

### 区别

1. **应用场景**：
   - **`src`**：用于嵌入或加载外部资源（如图像、脚本、音频等）。
   - **`href`**：用于定义超链接和引用外部资源（如导航链接、样式表等）。

2. **资源加载方式**：
   - **`src`**：浏览器会立即请求并加载指定的资源，这会影响页面的呈现或功能。
   - **`href`**：主要用于超链接或资源引用，浏览器会在用户点击链接时进行导航或加载资源。

3. **标签支持**：
   - **`src`**：用于 `<img>`、`<script>`、`<iframe>`、`<audio>`、`<video>` 等标签。
   - **`href`**：用于 `<a>` 和 `<link>` 标签。

### 示例

**`src` 示例**：
```html
<script src="main.js"></script>
<iframe src="https://example.com"></iframe>
```
```html
<link rel="stylesheet" href="styles.css">
```
