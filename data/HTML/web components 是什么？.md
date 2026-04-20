---
level: 2
---

# web components 是什么？

## 参考答案

Web Components 是一组 Web 平台 API，允许开发者创建封装性强、可重用的组件，这些组件可以在任何 Web 应用程序中使用。

Web Components 主要包括以下四个核心技术：

### **1. 自定义元素（Custom Elements）**
允许开发者定义新的 HTML 元素及其行为。这些自定义元素可以像内置元素一样被使用，并且支持生命周期回调函数。

### **2. 模板（Templates）**
`<template>` 元素用于定义可以重复使用的 HTML 结构。模板中的内容在被使用时才会被实例化和插入到 DOM 中，从而提高性能和重用性。

### **3. Shadow DOM**
允许将组件的内部结构和样式封装在一个独立的 DOM 子树中，这样可以避免样式和脚本的冲突。Shadow DOM 使组件可以有自己的封闭样式和结构。

### **4. HTML Imports（已废弃）**
HTML Imports 曾用于引入和使用 HTML 文档的片段，但该技术已被废弃，现代 Web 组件技术通常通过模块化 JavaScript 或 ES6 模块来替代。

### **Web Components 的优势**

- **封装性**：通过 Shadow DOM 隔离组件的样式和结构，避免全局样式和脚本的干扰。
- **重用性**：自定义元素可以被多次重用，促进代码的模块化和组织。
- **标准化**：作为 Web 标准的一部分，Web Components 与各种 JavaScript 框架和库兼容，能够在不同的环境中使用。

### **使用示例**

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Web Components Example</title>
    <script>
        class MyElement extends HTMLElement {
            constructor() {
                super();
                const shadow = this.attachShadow({ mode: 'open' });
                shadow.innerHTML = `<style>p { color: red; }</style><p>Hello, Web Components!</p>`;
            }
        }
        customElements.define('my-element', MyElement);
    </script>
</head>
<body>
    <my-element></my-element>
</body>
</html>
```
