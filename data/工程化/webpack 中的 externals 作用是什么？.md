---
level: 1
---

# webpack 中的 externals 作用是什么？

## 题目要点

`externals` 在 Webpack 中的作用是将特定的模块标记为外部依赖，避免将它们打包到最终的 bundle 中。这样可以减少打包文件的体积，提高加载性能，并在特定环境下实现更好的兼容性。通过配置 `externals`，你可以确保常用的第三方库或插件在运行时由外部提供。

## 参考答案

在 Webpack 中，`externals` 是一个配置选项，用于指定哪些模块不应该被打包到最终的 bundle 中。这个选项的主要作用是避免将某些依赖项包括在打包文件中，而是将这些依赖项作为外部资源进行加载。以下是 `externals` 的详细作用和使用场景：

### **1. 避免重复打包**

如果你的项目依赖某些库，而这些库在运行时会从 CDN 或其他外部来源加载（比如 jQuery、React），你可以使用 `externals` 来避免将这些库重复打包到你的 bundle 中。这样可以减少 bundle 的体积，避免冗余的代码。

### **2. 提高加载性能**

通过将常用的第三方库（如 React、Lodash）标记为外部依赖，用户可以从 CDN 上加载这些库，通常 CDN 会提供更好的性能和缓存策略，从而提高页面的加载速度。

### **3. 兼容环境**

在一些特定环境下（如在某些特殊的构建配置中），你可能希望某些库或模块在运行时由外部提供，而不是被打包到应用中。使用 `externals` 可以方便地将这些库标记为外部依赖。

### **如何使用 `externals`**

在 `webpack.config.js` 中配置 `externals` 选项。例如，如果你希望将 `react` 和 `react-dom` 标记为外部依赖，可以这样配置：

```javascript
  // ...
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
};
```

- `react: 'React'` 表示在打包过程中，`import React from 'react'` 会被处理为使用全局变量 `React`，而不是打包到 bundle 中。
- `react-dom: 'ReactDOM'` 表示在打包过程中，`import ReactDOM from 'react-dom'` 会被处理为使用全局变量 `ReactDOM`，而不是打包到 bundle 中。

### **使用场景示例**

- **使用 CDN 提供库**：当你通过 CDN 加载库时，可以将这些库设置为外部依赖。例如，通过 CDN 加载的 `jQuery`：

  ```javascript
  externals: {
    jquery: 'jQuery'
  }
  ```

  这样在打包时，`import $ from 'jquery'` 会被替换为使用全局变量 `jQuery`。

- **多页面应用**：在多页面应用中，多个页面可能共享一些库，使用 `externals` 可以避免在每个页面的 bundle 中都包含这些共享库。

- **第三方插件**：当你的应用依赖某些大型的第三方插件，且这些插件在运行时会由其他地方提供时，可以使用 `externals` 将其排除在打包之外。
