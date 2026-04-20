---
level: 2.5
---

# package.json 里面 sideEffects 属性的作用是什么？

## 题目要点

- **优化打包**：通过准确配置 `sideEffects`，可以显著减少打包后的代码体积，提高加载性能。
- **灵活性**：提供了细粒度控制，以便开发者根据模块的副作用情况进行配置。

在配置 `sideEffects` 时，需要谨慎考虑模块的行为，以确保打包工具不会误删有用的代码。

## 参考答案

`package.json` 中的 `sideEffects` 属性主要用于优化 JavaScript 打包工具（如 Webpack）的 tree shaking 过程。`tree shaking` 是一种优化技术，它会移除未使用的代码，以减小打包后的文件体积。

### `sideEffects` 属性的作用

- **标记模块是否有副作用**：`sideEffects` 属性告诉打包工具，模块中的代码是否有副作用（side effects）。副作用指的是在模块被导入时，会影响全局状态或其他模块的情况，例如修改全局变量、运行脚本、导入 CSS 文件等。

- **优化代码打包**：
  - **`"sideEffects": false`**：表示该包中的所有模块都没有副作用，意味着如果某个模块没有被引用，打包工具可以安全地删除它。这种情况下，打包工具会更积极地进行 tree shaking，从而移除未使用的代码。
  - **`"sideEffects": true`**：表示该包中的所有模块都有副作用，打包工具不会移除未使用的模块。
  - **数组形式**：你可以使用一个数组来指定哪些文件有副作用。例如，`"sideEffects": ["*.css", "*.scss"]` 表示 `.css` 和 `.scss` 文件有副作用，打包工具在进行 tree shaking 时不会移除它们，而对于其他文件，打包工具会根据导入情况决定是否移除。

### 示例

```json
  "name": "my-package",
  "version": "1.0.0",
  "sideEffects": false
}
```

### 使用场景

- **无副作用的库**：例如纯函数库（如 lodash），它们没有副作用，适合使用 `sideEffects: false`。
- **有副作用的模块**：例如导入 CSS、Polyfill、或一些修改全局对象的代码，可以通过 `"sideEffects": ["*.css"]` 这样的配置指定副作用文件。
