---
level: 2.5
---

# 浏览器是否支持 CommonJs 规范？

## 题目要点

- **浏览器不原生支持 CommonJS**：浏览器不直接支持 CommonJS 规范。
- **使用打包工具**：通过 Webpack、Browserify 等工具将 CommonJS 模块转换为浏览器支持的格式。
- **ESM 规范**：现代浏览器原生支持 ES6 模块（`import` 和 `export`），并推荐使用该标准进行模块化开发。

## 参考答案

浏览器本身不直接支持 CommonJS 规范。CommonJS 主要是为服务器端（如 Node.js）设计的模块规范，通常用于服务器环境中处理模块的加载和管理。

### **CommonJS 规范概述**

- **模块导出**：使用 `module.exports` 和 `exports` 导出模块。
- **模块加载**：使用 `require()` 函数导入模块。

例如，CommonJS 模块的代码如下：

**math.js**:
```javascript
module.exports = {
  add: function(a, b) {
    return a + b;
  }
};
```
```javascript
const math = require('./math');
console.log(math.add(1, 2));
```

- **浏览器不支持 CommonJS**：浏览器的 JavaScript 环境不原生支持 CommonJS 模块系统。浏览器的模块系统是基于 ES6 的模块化标准（ESM），即 `import` 和 `export` 语法。

### **如何在浏览器中使用 CommonJS**

为了在浏览器中使用 CommonJS 模块，通常需要使用打包工具来处理模块系统的转换：

1. **使用打包工具**：工具如 Webpack、Browserify 或 Parcel 可以将 CommonJS 模块打包成浏览器可以理解的格式。它们会将 CommonJS 模块和依赖打包成一个或多个 JavaScript 文件，并在浏览器中执行。

   **使用 Webpack 打包**：
   - Webpack 会解析 CommonJS 模块，并将其打包成一个浏览器可用的文件。Webpack 会使用自己的模块系统和加载器，将 CommonJS 模块转换成浏览器支持的格式。

2. **使用模块加载器**：一些库（如 Browserify）可以将 CommonJS 模块转换成浏览器可以理解的格式。它们可以将 CommonJS 模块打包成一个包含所有依赖的 JavaScript 文件。

### **示例**

使用 Webpack 将 CommonJS 模块打包成浏览器支持的格式：

1. **项目结构**：
   ```
   project/
   ├── src/
   │   ├── math.js
   │   └── app.js
   └── webpack.config.js
   ```

2. **`math.js`** (CommonJS 模块)：
   ```javascript
   module.exports = {
     add: function(a, b) {
       return a + b;
     }
   };
   ```

3. **`app.js`** (CommonJS 模块)：
   ```javascript
   const math = require('./math');
   console.log(math.add(1, 2));
   ```

4. **`webpack.config.js`** (Webpack 配置)：
   ```javascript
   const path = require('path');

   module.exports = {
     entry: './src/app.js',
     output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname, 'dist')
     },
     mode: 'development'
   };
   ```

5. **构建项目**：
   ```bash
   npx webpack
   ```

6. **生成的 `bundle.js` 文件可以在浏览器中使用**。
