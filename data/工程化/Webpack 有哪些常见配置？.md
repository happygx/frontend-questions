---
level: 2
---

# Webpack 有哪些常见配置？

## 参考答案

Webpack 的配置文件（通常为 `webpack.config.js`）中包含多种常见配置项，以下是一些主要的配置选项：

### **1. Entry**

- **入口**：定义应用的入口点，可以是单个文件或多个文件。
  ```javascript
  entry: './src/index.js',
  ```

### **2. Output**

- **输出**：配置打包后文件的输出位置和文件名。
  ```javascript
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  ```

### **3. Loaders**

- **文件处理**：使用 loaders 处理非 JavaScript 文件（如 CSS、图片、字体等）。
  ```javascript
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  ```

### **4. Plugins**

- **插件**：用于扩展 Webpack 的功能，执行各种任务（如压缩、优化等）。
  ```javascript
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  ```

### **5. Mode**

- **模式**：指定构建模式（`development` 或 `production`），影响默认的优化设置。
  ```javascript
  mode: 'development', // or 'production'
  ```

### **6. DevServer**

- **开发服务器**：配置 Webpack Dev Server，用于本地开发时的实时刷新和热模块替换。
  ```javascript
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  ```

### **7. Resolve**

- **模块解析**：配置模块解析的选项，包括别名和文件扩展名。
  ```javascript
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  ```

### **8. Optimization**

- **优化设置**：配置打包优化选项，如代码分割和压缩。
  ```javascript
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
  },
  ```

### **9. Devtool**

- **源映射**：配置调试源映射，帮助开发者调试代码。
  ```javascript
  devtool: 'source-map',
  ```

### **10. Performance**

- **性能提示**：配置性能提示，帮助识别打包后的文件大小。
  ```javascript
  performance: {
    hints: 'warning',
    maxAssetSize: 100000, // 100kb
  },
  ```
