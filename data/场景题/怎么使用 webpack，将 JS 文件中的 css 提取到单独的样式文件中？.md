---
level: 2
---

# 怎么使用 webpack，将 JS 文件中的 css 提取到单独的样式文件中？

## 题目要点

通过配置 Webpack 和使用 `MiniCssExtractPlugin`，可以方便地将 JS 文件中的 CSS 提取到单独的文件中。

## 参考答案

在前端项目中使用 Webpack 提取 JS 文件中的 CSS，可以通过以下步骤实现：

### **1. 安装必要的依赖**

首先，需要安装以下依赖：

```bash
```

在 Webpack 配置文件 `webpack.config.js` 中，配置 `MiniCssExtractPlugin` 来提取 CSS。

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 匹配 CSS 文件
        use: [
          MiniCssExtractPlugin.loader, // 提取 CSS
          'css-loader', // 处理 CSS
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css', // 输出的 CSS 文件名
    }),
  ],
};
```

在你的 JS 文件中，引入 CSS 文件：

```javascript

console.log('Hello, World!');
```

使用以下命令构建项目：

```bash
```

构建完成后，生成的 `dist` 文件夹中会包含 `bundle.js` 和 `styles.css`，CSS 被成功提取到单独的文件中。
