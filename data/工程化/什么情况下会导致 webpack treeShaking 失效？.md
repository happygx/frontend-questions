---
level: 3
---

# 什么情况下会导致 webpack treeShaking 失效？

## 题目要点

- 使用 ES6 模块语法 (`import`/`export`)
- 避免动态导入和动态属性访问
- 确保代码没有副作用或正确配置 `sideEffects`
- 确保 Webpack 配置正确，`mode` 设置为 `'production'`
- 选择支持 ES6 模块的外部库
- 注意 Webpack 插件和加载器的影响

## 参考答案

Webpack 的 tree-shaking 是一种优化技术，用于去除未使用的代码，从而减小最终打包文件的大小。尽管 tree-shaking 是一个强大的工具，但在一些情况下，它可能会失效。以下是导致 Webpack tree-shaking 失效的一些常见情况：

### **1. 未使用 ES6 模块语法**

- **问题**：Webpack 的 tree-shaking 依赖于 ES6 模块语法（`import` 和 `export`）来确定哪些代码是未使用的。如果你使用了 CommonJS 模块语法（`require` 和 `module.exports`），Webpack 将无法进行有效的 tree-shaking。
- **解决方案**：确保在你的代码中使用 ES6 模块语法。

### **2. 动态导入和动态属性访问**

- **问题**：动态导入（`import()`）和动态属性访问（例如 `require(variable)` 或 `import(variable)`）使得 Webpack 无法静态分析和确定哪些模块或代码是未使用的。
- **解决方案**：尽量避免在 tree-shaking 的上下文中使用动态导入或动态属性访问。如果必须使用，确保它们在编译时能够被正确解析。

### **3. 非纯函数的副作用**

- **问题**：如果模块或函数具有副作用（例如修改全局状态、改变外部变量），Webpack 可能无法安全地移除这些模块，因为它不能确定这些副作用是否被实际使用。
- **解决方案**：将副作用从纯函数中分离，并使用 `sideEffects` 配置项告诉 Webpack 哪些模块有副作用，哪些没有副作用。

### **4. Webpack 配置问题**

- **问题**：错误的 Webpack 配置可能会导致 tree-shaking 失效。例如，`mode` 配置项应该设置为 `'production'`，因为 Webpack 在开发模式下不会进行 tree-shaking。
- **解决方案**：确保 Webpack 的 `mode` 配置为 `'production'`，并检查 `optimization` 配置项以确保启用了相关的优化选项。

### **5. `package.json` 中的 `sideEffects` 配置**

- **问题**：如果 `package.json` 文件中的 `sideEffects` 配置不正确，Webpack 可能会保留那些实际上可以被移除的代码。
- **解决方案**：确保在 `package.json` 中正确配置 `sideEffects` 字段。例如，如果你的项目没有副作用的代码，可以将其设置为 `false`，否则需要显式列出哪些文件或模块有副作用。

### **6. 引用外部库**

- **问题**：引用外部库时，如果外部库没有正确使用 ES6 模块语法，Webpack 无法进行有效的 tree-shaking。
- **解决方案**：选择支持 ES6 模块语法的外部库，并尽量避免引用不支持 tree-shaking 的库。

### **7. Webpack 插件和加载器**

- **问题**：某些 Webpack 插件和加载器可能会影响 tree-shaking 过程。例如，某些插件可能会在构建过程中引入额外的代码或修改输出。
- **解决方案**：仔细检查使用的插件和加载器，确保它们不会干扰 tree-shaking 过程。使用官方推荐的插件和加载器，以确保与 Webpack 的兼容性。
