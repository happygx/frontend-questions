---
level: 3.5
---

# Webpack 中的运行时 chunk 是什么？在项目工程中， 如何打包和加载这个运行时 chunk ?

## 题目要点

- **运行时 Chunk** 是 Webpack 管理模块和依赖关系的代码。
- 通过 `optimization.runtimeChunk` 配置，可以将运行时代码提取到一个单独的文件中，优化缓存和加载性能。
- 可以通过手动或自动方式在 HTML 中加载运行时 Chunk，以确保 Webpack 正确加载和运行模块。

## 参考答案

在 Webpack 中，**运行时 Chunk**（Runtime Chunk）是负责管理 Webpack 打包后生成的模块交互的代码，它包含了 Webpack 的模块加载逻辑，例如模块引入、模块之间的依赖解析、异步加载逻辑等。在项目运行时，Webpack 需要这个运行时代码来确保应用程序能够正确加载、解析并执行各个模块。

### **运行时 Chunk 的作用**

- **模块管理**：它维护模块的依赖图，确保正确加载所需的模块。
- **异步加载**：处理按需加载（如 `import()`），通过 `JSONP` 等机制异步加载模块。
- **哈希映射**：在生产环境中，运行时 Chunk 会帮助 Webpack 跟踪模块和文件的哈希值，确保浏览器能够正确缓存和更新资源。

### **打包运行时 Chunk**

Webpack 提供了配置项来将运行时代码抽离成一个单独的文件（chunk），而不是与业务逻辑一起打包。这样做的好处是：

1. **缓存优化**：运行时代码较为稳定，不经常变化，抽离后可以更好地利用浏览器缓存。
2. **减少 bundle 大小**：将运行时代码与业务逻辑分开，减少业务 bundle 的体积。

### **如何打包运行时 Chunk**

你可以通过在 Webpack 配置中使用 `optimization.runtimeChunk` 来将运行时代码提取为单独的 Chunk。

#### **配置示例**

```javascript
  // 其他配置...
  optimization: {
    runtimeChunk: {
      name: 'runtime', // 自定义运行时 chunk 的名字
    },
  },
};
```

- **`optimization.runtimeChunk`**：设置为 `true` 或 `{ name: 'runtime' }` 可以将运行时代码抽离到一个单独的 Chunk 中。
  - 设置为 `true`：Webapck 会生成一个默认的 `runtime` 文件。
  - 设置为 `{ name: 'runtime' }`：你可以为这个运行时 Chunk 自定义名字。

#### **打包后的输出文件**

配置完成后，Webpack 会将运行时代码打包成一个单独的 `runtime.[hash].js` 文件，这个文件需要与业务代码一起在 HTML 页面中引入。

### **加载运行时 Chunk**

打包运行时 Chunk 后，需要确保在页面中正确引入：

1. **手动引入**：在 `index.html` 中引入生成的运行时文件。
   
   ```html
   <script src="/dist/runtime.js"></script>
   <script src="/dist/main.js"></script>
   ```

2. **自动引入**：通过 `HtmlWebpackPlugin` 自动注入到生成的 HTML 文件中。

   ```javascript
   const HtmlWebpackPlugin = require('html-webpack-plugin');

   module.exports = {
     // 其他配置...
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/index.html',
       }),
     ],
   };
   ```

`HtmlWebpackPlugin` 会自动将生成的所有 Chunk（包括运行时 Chunk）注入到生成的 HTML 文件中。
