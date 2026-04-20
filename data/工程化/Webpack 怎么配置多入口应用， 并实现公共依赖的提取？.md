---
level: 2
---

# Webpack 怎么配置多入口应用， 并实现公共依赖的提取？

## 参考答案

可以通过以下步骤实现：

### **1. 配置多入口**

在 Webpack 配置中，可以定义多个入口点，每个入口对应一个输出文件。

```javascript

module.exports = {
  entry: {
    app1: './src/app1/index.js',
    app2: './src/app2/index.js',
  },
  output: {
    filename: '[name].bundle.js', // 使用入口名称生成文件名
    path: path.resolve(__dirname, 'dist'),
  },
};
```

使用 `SplitChunksPlugin` 来提取公共依赖，确保不同入口点共享的模块只打包一次，减少重复代码。

```javascript
  // ...其他配置
  optimization: {
    splitChunks: {
      chunks: 'all', // 从所有块中提取公共模块
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/, // 只提取来自 node_modules 的模块
          name: 'vendor', // 公共依赖的名称
          chunks: 'all',
        },
      },
    },
  },
};
```

通过以上配置，Webpack 将生成多个入口文件以及一个包含公共依赖的文件。例如：

- `app1.bundle.js`
- `app2.bundle.js`
- `vendor.bundle.js`（公共依赖）

### **4. HTML 文件引入**

可以使用 `HtmlWebpackPlugin` 来生成 HTML 文件，自动引入打包生成的 JavaScript 文件。

```javascript

module.exports = {
  // ...其他配置
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app1/index.html',
      filename: 'app1.html',
      chunks: ['vendor', 'app1'], // 引入公共依赖和 app1
    }),
    new HtmlWebpackPlugin({
      template: './src/app2/index.html',
      filename: 'app2.html',
      chunks: ['vendor', 'app2'], // 引入公共依赖和 app2
    }),
  ],
};
```

通过上述配置，Webpack 能够有效管理多入口应用，提取公共依赖，确保代码的复用性和加载效率。每个入口点都可以独立打包，并且公共依赖仅打包一次，优化了整体性能。
