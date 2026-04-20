---
level: 3
---

# 对于一个使用 Webpack 的项目，如果需要直接通过 script 标签引入第三方的资源，应该怎么处理？

## 题目要点

在 Webpack 项目中，若需要通过 `script` 标签引入第三方资源，有以下几种常见方式：
1. 使用 `html-webpack-plugin` 插件来自动将外部资源插入到 HTML 文件中。
2. 使用 `externals` 配置将第三方库从打包中排除，并通过外部 `script` 标签加载。
3. 使用 `ProvidePlugin` 插件将外部库自动作为全局变量注入到每个模块中。
4. 手动在 HTML 模板中插入 `<script>` 标签。

## 参考答案

在使用 Webpack 的项目中，若需要通过 `script` 标签直接引入第三方资源（比如外部的 CDN 库或脚本），可以通过以下几种方式来处理：

### 1. **使用 `html-webpack-plugin` 插件**
`html-webpack-plugin` 插件是 Webpack 中常用的插件之一，可以帮助自动化地将 `script` 标签引入到生成的 HTML 文件中。如果你需要引入第三方的外部资源，可以通过该插件在 `head` 或 `body` 中插入 `<script>` 标签。

#### 步骤：

1. **安装 `html-webpack-plugin` 插件**
   首先确保你已经安装了 `html-webpack-plugin` 插件。
   ```bash
   npm install html-webpack-plugin --save-dev
   ```

2. **配置 `html-webpack-plugin`**
   在 `webpack.config.js` 中，配置 `html-webpack-plugin` 插件来引入第三方脚本。

   ```javascript
   const HtmlWebpackPlugin = require('html-webpack-plugin');

   module.exports = {
     entry: './src/index.js', // 你的入口文件
     output: {
       filename: 'bundle.js',
       path: __dirname + '/dist'
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: 'src/index.html',  // 你的模板文件
         scriptLoading: 'defer', // 这里配置脚本加载方式，'defer' 表示异步加载脚本
         inject: 'body', // 控制脚本注入的位置，可以是 'head' 或 'body'
         // 添加外部资源的 <script> 标签
         external: {
           scripts: [
             'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js', // 通过 CDN 引入外部库
             'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'
           ]
         }
       })
     ]
   };
   ```

3. **通过 `html-webpack-plugin` 插件动态插入外部 `<script>` 标签**
   `html-webpack-plugin` 会自动将模板文件中的外部资源（比如 `https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js`）转换成实际的 `<script>` 标签，并插入到生成的 `index.html` 文件中。

   这时，外部脚本就会在页面中直接加载。

### 2. **通过 `externals` 配置**
如果你希望避免将外部资源打包到 Webpack 构建的输出文件中，而是希望直接通过 `<script>` 标签加载这些资源，可以使用 `externals` 配置。

`externals` 允许你指定哪些模块不应该被打包，而是通过 `script` 标签或外部引用来加载。这样可以有效减小打包后的文件体积，特别是对于像 jQuery、React、Vue 这样的常见第三方库，通常会从 CDN 加载。

#### 示例：

```javascript
  entry: './src/index.js', // 你的入口文件
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  externals: {
    'vue': 'Vue',   // 将 vue 设置为外部资源，表示通过 <script> 标签引入
    'axios': 'axios' // 将 axios 设置为外部资源，表示通过 <script> 标签引入
  }
};
```
- `vue` 和 `axios` 会被排除在 Webpack 打包之外。
- 在生成的 HTML 文件中，Vue 和 Axios 库需要通过 `<script>` 标签从 CDN 引入，例如：
  ```html
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  ```

### 3. **通过 `webpack` 的 `ProvidePlugin` 插件**
如果你希望将第三方库（例如 jQuery、Vue、Axios）作为全局变量直接注入到每个模块中，避免每次都要通过 `import` 来加载，可以使用 `ProvidePlugin` 插件。

#### 示例：

```javascript

module.exports = {
  entry: './src/index.js', // 你的入口文件
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  plugins: [
    new webpack.ProvidePlugin({
      'Vue': 'vue',  // 自动提供 Vue，避免每个文件都需要 import Vue
      'axios': 'axios'  // 自动提供 axios，避免每个文件都需要 import axios
    })
  ]
};
```
如果你不想使用 Webpack 的自动化工具，而是希望自己控制外部脚本的引入，可以手动在 HTML 模板中加入 `<script>` 标签。

例如，在 `index.html` 文件中直接添加：
```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Webpack Example</title>
  <!-- 手动添加外部 CDN 引入 -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
  <div id="app"></div>
  <script src="bundle.js"></script>
</body>
</html>
```
