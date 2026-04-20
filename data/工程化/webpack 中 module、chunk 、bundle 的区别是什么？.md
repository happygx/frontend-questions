---
level: 3.5
---

# webpack 中 module、chunk 、bundle 的区别是什么？

## 参考答案

在 Webpack 中，`module`、`chunk` 和 `bundle` 是处理构建过程中的不同概念：

### **1. Module（模块）**

- **定义**：模块是代码的基本单位。在 Webpack 中，几乎所有的内容都被视为模块，包括 JavaScript 文件、CSS 文件、图片等。
- **作用**：模块是 Webpack 构建的基础，Webpack 会根据配置将模块解析、转换和打包。模块可以是 ES6 模块、CommonJS 模块等。

### **2. Chunk（代码块）**

- **定义**：Chunk 是 Webpack 将多个模块打包后生成的代码块。它可以看作是一个或多个模块的集合。
- **作用**：Chunk 是打包优化的关键，Webpack 会根据配置（如代码分割）将模块分配到不同的 Chunk 中。Chunk 有助于实现懒加载、按需加载等功能，提高页面加载性能。

### **3. Bundle（捆绑包）**

- **定义**：Bundle 是 Webpack 输出的最终文件，它是由一个或多个 Chunk 合并生成的。
- **作用**：Bundle 是 Webpack 输出到磁盘上的实际文件，可以被浏览器加载和执行。一个项目中可以生成多个 Bundle，例如主应用的 Bundle 和按需加载的 Bundle。

### **关系总结**

- **Module** 是 Webpack 中的基本构建块，每个模块会被处理并转化。
- **Chunk** 是 Webpack 将多个模块组合后的代码块，便于分割和优化。
- **Bundle** 是最终输出的文件，它可以包含一个或多个 Chunk，最终交付给浏览器。

### **简单示例**

假设有以下配置和文件：

- **`index.js`**：一个 JavaScript 模块。
- **`app.js`**：另一个 JavaScript 模块。
- **`styles.css`**：一个 CSS 模块。

Webpack 可能会生成：

- **`main.js`**：一个 Bundle，其中包含多个 Chunk（如 `app.chunk.js` 和 `vendor.chunk.js`）。
- **`vendor.chunk.js`**：一个 Chunk，包含第三方库。
- **`app.chunk.js`**：一个 Chunk，包含应用代码的模块。

最终，**`main.js`** 作为主 Bundle，可能会引入不同的 Chunk 文件，并通过 `script` 标签加载到 HTML 中。
