---
level: 2
---

# 为什么 react 组件中， 都需要声明 `import React from 'react';`

## 题目要点

- **React 16 及以下**：在使用 JSX 时必须导入 `React`，因为 JSX 语法最终会被转换为 `React.createElement()` 调用。
- **React 17 及以上**：如果启用了新的 JSX 转换方式（默认启用），则不再需要显式导入 `React`，Babel 会自动处理。

尽管在 React 17 之后你可以省略 `import React from 'react';`，但很多项目仍然保持兼容性，尤其是较老的项目，可能仍然需要保留这个导入语句。

## 参考答案

与 React 的早期设计和 JSX 语法的处理密切相关，具体来说，主要是以下原因：

### 1. **JSX 需要 React**
在 React 的早期版本中，JSX（JavaScript XML）是通过 JavaScript 语法扩展来实现的。JSX 代码本质上是一个类似 XML 的语法糖，它会被 Babel 转换为 `React.createElement()` 调用。

例如，下面的 JSX 代码：
```jsx
```
```javascript
```

### 2. **React 需要作为一个全局对象**
`React.createElement()` 是创建 React 元素的基础函数。为了能够正确生成虚拟 DOM 和管理组件，React 库提供了必要的 API。因此，导入 `React` 是为了能够调用这些方法。

### 3. **Babel 的转换（之前的工作原理）**
在 JSX 编译阶段，Babel 会将 JSX 转换为 `React.createElement()` 函数调用。因此，React 在 JSX 文件中成为了必需的导入项。如果没有导入 React，Babel 在转换过程中将无法找到 `React.createElement`，从而导致错误。

### **随着 React 17 的更新：**
自 React 17 版本开始，**JSX 转换**的工作有所变化。React 17 引入了新的 JSX 转换方式，允许开发者不再显式地导入 `React`。这是通过新的 JSX 编译器来实现的，不再需要将 JSX 转换为 `React.createElement` 调用。

在 React 17 及以后的版本中，Babel 会自动处理 `React` 的引入，具体来说：

- **不再需要显式地导入 React**：如果你使用了 React 17 或更高版本，并且配置了正确的 Babel 插件（如 `@babel/preset-react`），JSX 的编译器会自动将 `React` 导入到每个文件中，从而不再需要手动编写 `import React from 'react';`。

### 4. **向后兼容**
虽然 React 17 之后不再强制要求显式导入 `React`，但由于许多项目仍然使用较旧的 React 版本，或者代码库中有其他工具、库的兼容性问题，开发者可能仍然看到许多项目中保留 `import React from 'react';`。此外，如果你使用 TypeScript，或者一些特殊的工具链配置，可能仍然需要手动导入。
