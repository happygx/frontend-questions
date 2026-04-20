---
level: 1.5
---

# <!DOCTYPE html> 标签有什么用？

## 题目要点

`<!DOCTYPE html>` 是 HTML5 文档的标准声明，用于告知浏览器当前页面遵循 HTML5 标准。它帮助浏览器以标准模式渲染网页，确保一致的用户体验和网页表现。

## 参考答案

`<!DOCTYPE html>` 是 HTML 文档的文档类型声明（DOCTYPE），用于告知浏览器该文档使用的 HTML 版本和标准。它的主要作用如下：

### 作用

1. **指定文档类型**：
   - `<!DOCTYPE html>` 声明告知浏览器该文档遵循 HTML5 标准。这有助于浏览器正确解析和渲染网页内容。

2. **触发标准模式**：
   - 在浏览器中，`<!DOCTYPE html>` 会触发标准模式（Standards Mode），使浏览器以最严格的方式按照 HTML5 标准来渲染页面。没有 DOCTYPE 或者不正确的 DOCTYPE 可能会导致浏览器进入混杂模式（Quirks Mode），这种模式下的渲染可能不符合标准规范。

3. **确保一致的渲染**： 
   - 通过声明 DOCTYPE，可以减少不同浏览器之间的渲染差异。标准模式确保所有浏览器以一致的方式呈现 HTML 内容。

### 示例

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
```

- **HTML4 和 XHTML**：
  - 对于 HTML4 和 XHTML，DOCTYPE 声明较为复杂，需要指定具体的 DTD（Document Type Definition）。例如，HTML4 的 DOCTYPE 是这样的：`<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`。
  - HTML5 简化了 DOCTYPE 声明为 `<!DOCTYPE html>`，使其更简洁且易于使用。
