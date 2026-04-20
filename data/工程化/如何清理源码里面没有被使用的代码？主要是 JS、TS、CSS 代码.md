---
level: 3
---

# 如何清理源码里面没有被使用的代码？主要是 JS、TS、CSS 代码

## 题目要点

- **JS/TS 清理**：通过 Webpack 的 Tree Shaking、ESLint 或 TSLint、Unused Files Webpack Plugin 等工具，能有效清理未使用的 JS 和 TS 代码。
- **CSS 清理**：使用 PurgeCSS、TailwindCSS 内置的 purge 功能，或者 cssnano 来清理无用的 CSS 代码。
- **定期代码审查**：定期检查项目中的未使用代码，确保项目保持干净和高效。

## 参考答案

清理未使用的代码（又称为**代码剔除**、**死代码移除**）是前端开发中的一项常见任务，能够有效减小项目体积，提升性能。对于 JS/TS 和 CSS 代码，清理的方式有所不同。下面我将介绍一些常见的方法和工具来清理源码中的未使用代码。

### 1. **JavaScript/TypeScript 未使用代码清理**

#### **工具：Webpack + Tree Shaking**
- **Tree Shaking** 是 Webpack 的一种优化技术，主要通过移除未使用的 ES6 模块代码来减小最终打包文件的体积。Tree Shaking 能够有效剔除未使用的 JavaScript/TypeScript 函数和变量。
  
##### **配置 Webpack Tree Shaking**
1. 确保使用 **ES6 模块**（`import/export`），因为 Tree Shaking 只会对 ES6 模块起作用。
2. 启用 **`mode: production`** 来启用 Webpack 内置的优化和 Tree Shaking 功能。
3. **配置 `sideEffects`**，以告知 Webpack 哪些文件没有副作用，以便更好地进行树摇。

```json
{
  "sideEffects": [
    "*.css",
    "*.scss", 
    "src/some-module.js"
  ]
}
```
ESLint 或 TSLint 能帮助你检测和清理一些潜在的未使用代码。
- **`no-unused-vars`** 规则可以检测未使用的变量。
- **`no-unused-imports`** 可以检查未使用的导入。

##### **ESLint 配置示例：**
```json
  "rules": {
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
}
```

#### **工具：Unused Files Webpack Plugin**
`unused-files-webpack-plugin` 可以帮助检测项目中未使用的文件和模块。

安装插件：
```bash
```
```js

module.exports = {
  plugins: [
    new UnusedFilesWebpackPlugin({
      patterns: ['src/**/*.js', 'src/**/*.ts'],
      failOnUnused: false, // 如果检测到未使用的文件则失败
    }),
  ],
};
```

#### **工具：PurgeCSS**
PurgeCSS 是一款常用的工具，用来清理未使用的 CSS 代码。它可以在项目构建时根据实际使用情况删除多余的 CSS。

**配置 PurgeCSS：**
1. 安装 PurgeCSS：

```bash
```

```js

const purge = new Purgecss({
  content: ['./src/**/*.html', './src/**/*.js'], // 扫描 HTML 和 JS 文件
  css: ['./src/styles.css'], // 需要清理的 CSS 文件
})

const result = purge.purge()
```
你也可以在 Webpack 中使用 `PurgeCSS` 插件来自动清理未使用的 CSS。

安装插件：
```bash
```
```js
const glob = require('glob');
const path = require('path');

module.exports = {
  plugins: [
    new PurgecssWebpackPlugin({
      paths: glob.sync(path.join(__dirname, 'src/**/*.js')),
    }),
  ],
};
```
如果你使用的是 **TailwindCSS**，它内置了 PurgeCSS 功能，能够自动清理未使用的 CSS 类。只需要在 `tailwind.config.js` 中配置 `purge` 选项即可。

```js
  purge: ['./src/**/*.html', './src/**/*.js'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```
`cssnano` 是一个用于压缩 CSS 的工具，它也能帮助剔除一些无用的 CSS。

```bash
```
- **定期检查和清理未使用代码**：可以结合团队的开发流程，定期进行代码审查，确保不再使用的代码和模块及时移除。
- **使用现代的框架和构建工具**：例如 React, Vue, Angular 等现代框架，通常都有类似的工具和机制来清理未使用的代码。
- **使用模块化思想**：始终保持代码的模块化，避免直接引入整个库或者大模块，而是引入真正需要的部分，这有助于减少不必要的代码加载。
