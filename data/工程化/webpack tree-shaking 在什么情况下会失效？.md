---
level: 3.5
---

# webpack tree-shaking 在什么情况下会失效？

## 题目要点

tree-shaking 生效的要素：
- **使用 ES6 模块**：优先使用 `import` 和 `export` 语法。
- **避免动态导入**：静态导入更易于分析。
- **正确配置 `sideEffects`**：在 `package.json` 中标记有副作用的模块。
- **避免动态属性**：使用静态属性和方法。
- **配置 Webpack**：确保 `mode` 设置为 `production`。

## 参考答案

Webpack 的 Tree Shaking 是一种优化技术，旨在删除未使用的代码，以减小最终构建包的体积。但有些场景下，可能会导致 Tree Shaking 失效：

### **1. 使用 CommonJS 模块**

- **问题**：CommonJS 模块（如 `require()` 和 `module.exports`）的动态导入特性使得 Webpack 难以静态分析哪些代码是未使用的。
- **解决**：尽量使用 ES6 模块语法（`import` 和 `export`），它们可以被静态分析，从而更好地支持 Tree Shaking。

### **2. 动态导入**

- **问题**：使用动态导入（如 `import('module')`）时，Webpack 无法静态分析导入的模块，可能无法进行有效的 Tree Shaking。
- **解决**：尽量避免动态导入，或确保动态导入的模块在编译时能够被正确识别和处理。

### **3. 使用副作用的模块**

- **问题**：如果模块有副作用（例如执行全局操作），Webpack 可能会保留这些模块，即使它们的部分导出未被使用。
- **解决**：在 `package.json` 中的 `sideEffects` 字段明确标记副作用，告诉 Webpack 哪些模块有副作用，从而进行更精确的 Tree Shaking。

  ```json
  {
    "sideEffects": ["*.css"]
  }
  ```

### **4. 在 `package.json` 中未正确配置 `sideEffects`**

- **问题**：如果没有在 `package.json` 文件中配置 `sideEffects`，Webpack 默认假设所有模块都有副作用，可能导致未使用的模块未被剔除。
- **解决**：正确配置 `sideEffects` 字段以明确声明哪些文件或模块存在副作用，帮助 Webpack 更好地进行 Tree Shaking。

### **5. 使用动态属性**

- **问题**：动态属性或方法（如 `obj[prop]`）使得 Webpack 难以确定哪些代码是未使用的。
- **解决**：尽量避免动态属性访问，使用静态属性和方法，以便 Webpack 能够进行有效的静态分析。

### **6. 未正确配置 Webpack**

- **问题**：某些 Webpack 配置可能导致 Tree Shaking 失效，例如不正确的 `mode` 设置。
- **解决**：确保 `mode` 设置为 `production`，因为在 `development` 模式下，Tree Shaking 可能不会生效。
