---
level: 3
---

# webpack 分包的方式有哪些？

## 题目要点

Webpack 提供了多种代码分割的方式，包括入口点分割、动态导入、提取公共代码、异步组件、动态导入和懒加载、提取第三方库等。这些技术可以帮助优化应用程序的加载性能和效率，使用户体验更加流畅。

## 参考答案

在 Webpack 中，分包（或代码分割）是一种优化技术，用于将应用程序的代码拆分成多个较小的包，从而提高加载性能和效率。

Webpack 提供了多种方式来实现代码分割：

### **1. 入口点分割（Entry Points Split）**

**定义**：通过配置多个入口点，将应用程序分成多个独立的包。每个入口点可以生成一个单独的 bundle。

**示例**：
```javascript
  entry: {
    app: './src/app.js',
    admin: './src/admin.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

### **2. 动态导入（Dynamic Imports）**

**定义**：使用 `import()` 函数动态加载模块。Webpack 会将动态导入的模块分割成单独的 chunks，在需要时异步加载。

**示例**：
```javascript
function loadComponent() {
  import('./components/MyComponent')
    .then(module => {
      const MyComponent = module.default;
      // 使用 MyComponent
    })
    .catch(err => {
      console.error('Failed to load component', err);
    });
}
```

**定义**：提取多个入口点之间的公共模块到一个单独的 bundle 中。Webpack 4 及以上版本使用了 `optimization.splitChunks` 取代 `CommonsChunkPlugin`。

**示例**（Webpack 4+）：
```javascript
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
```

### **4. 异步组件（Code-Splitting with React.lazy）**

**定义**：在 React 中使用 `React.lazy` 和 `Suspense` 实现组件的异步加载。

**示例**：
```javascript

const MyComponent = lazy(() => import('./MyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MyComponent />
      </Suspense>
    </div>
  );
}
```

### **5. 动态导入和懒加载**

**定义**：使用动态导入实现懒加载，将大文件或不常用的代码按需加载，减少初始加载时间。

**示例**：
```javascript
  return import('some-library')
    .then(library => {
      // 使用加载的库
    });
};
```

**定义**：使用 `MiniCssExtractPlugin` 提取 CSS 样式到单独的文件。对于较大的项目，常常将样式单独分割出来有助于缓存和优化。

**示例**：
```javascript

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
};
```

Webpack 插件可以进一步帮助你优化代码分割。例如：

- **BundleAnalyzerPlugin**：可视化显示打包后的 bundle 文件，以便分析和优化代码分割。
- **CompressionWebpackPlugin**：对生成的 bundle 进行压缩以减少文件体积。

**示例**：
```javascript

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};
```
