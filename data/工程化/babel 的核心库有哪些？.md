---
level: 3
---

# babel 的核心库有哪些？

## 题目要点

常用的核心库包括：

- **@babel/core**：核心库，提供转换的基本功能。
- **@babel/preset-env**：根据目标环境智能选择插件，进行现代 JavaScript 的转换。
- **@babel/preset-react**：处理 React JSX 语法。
- **插件系列**：包括箭头函数、类、模块等的转换插件。

## 参考答案

Babel 是一个广泛使用的 JavaScript 编译器，通常用于将最新版本的 JavaScript 代码转换为兼容性更强的代码。

Babel 的核心库主要包括以下几个：

### 1. **@babel/core**
这是 Babel 的核心库，是整个编译过程的中心。它提供了 Babel 转换的主功能，负责将源代码进行解析、转换和生成。你通常会在项目中通过 `@babel/core` 来调用 Babel 的 API。

- **主要功能**：
  - 解析（Parsing）：将 JavaScript 代码解析成抽象语法树（AST）。
  - 转换（Transformation）：根据配置对 AST 进行处理（如转换箭头函数、类、模块等）。
  - 生成（Generation）：将转换后的 AST 转换回 JavaScript 代码。

- **常见用法**：
  ```bash
  npm install --save-dev @babel/core
  ```

### 2. **@babel/preset-env**
`@babel/preset-env` 是一个智能预设（preset），它可以根据目标环境来决定需要哪些 Babel 插件，以便将现代 JavaScript 语法转换成兼容性更好的代码。它常用于配置 Babel，指定浏览器的兼容性范围，自动为你选择合适的转换和 polyfill。

- **主要功能**：
  - 根据浏览器支持情况自动决定要应用哪些转换。
  - 支持插件的自动配置。
  
- **常见用法**：
  ```bash
  npm install --save-dev @babel/preset-env
  ```

  在 `.babelrc` 或 `babel.config.js` 文件中配置：
  ```json
  {
    "presets": [
      ["@babel/preset-env", {
        "targets": "> 0.25%, not dead" // 目标浏览器支持
      }]
    ]
  }
  ```

### 3. **@babel/preset-react**
`@babel/preset-react` 是用于 React 项目的一个预设，它允许 Babel 将 JSX 代码转换为 JavaScript，支持 React 特性，如 JSX、自动化的 `React.createElement` 调用等。

- **主要功能**：
  - 将 JSX 转换为 JavaScript。
  - 启用 React 特定的转换，例如 Class 属性名的支持等。

- **常见用法**：
  ```bash
  npm install --save-dev @babel/preset-react
  ```

  在 `.babelrc` 或 `babel.config.js` 文件中配置：
  ```json
  {
    "presets": ["@babel/preset-react"]
  }
  ```

### 4. **@babel/plugin-transform-arrow-functions**
这个插件专门用来将箭头函数转换为常规的函数表达式。如果目标环境不支持箭头函数（例如旧版本的浏览器），你可以使用该插件进行转换。

- **主要功能**：
  - 将箭头函数语法（`=>`）转换为普通函数表达式。
  
- **常见用法**：
  ```bash
  npm install --save-dev @babel/plugin-transform-arrow-functions
  ```

  在 `.babelrc` 或 `babel.config.js` 文件中配置：
  ```json
  {
    "plugins": ["@babel/plugin-transform-arrow-functions"]
  }
  ```

### 5. **@babel/plugin-transform-classes**
`@babel/plugin-transform-classes` 用于将 ES6+ 的类转换为兼容旧版 JavaScript 的构造函数形式。

- **主要功能**：
  - 将 ES6 的类（`class`）语法转换为基于原型的构造函数。
  
- **常见用法**：
  ```bash
  npm install --save-dev @babel/plugin-transform-classes
  ```

  在 `.babelrc` 或 `babel.config.js` 文件中配置：
  ```json
  {
    "plugins": ["@babel/plugin-transform-classes"]
  }
  ```

### 6. **@babel/plugin-transform-modules-commonjs**
该插件将 ES6 模块（`import` / `export`）转换为 CommonJS 模块。它常用于在 Node.js 环境下，尤其是旧版本的 Node.js，不支持 ES6 模块时。

- **主要功能**：
  - 将 `import` / `export` 转换为 CommonJS 模块语法（`require` / `module.exports`）。
  
- **常见用法**：
  ```bash
  npm install --save-dev @babel/plugin-transform-modules-commonjs
  ```

  在 `.babelrc` 或 `babel.config.js` 文件中配置：
  ```json
  {
    "plugins": ["@babel/plugin-transform-modules-commonjs"]
  }
  ```

### 7. **@babel/cli**
`@babel/cli` 提供了一个命令行工具，允许你在终端中直接运行 Babel 来转译文件。它适用于那些需要手动运行 Babel 的场景，或者需要在脚本中调用 Babel 的项目。

- **主要功能**：
  - 提供命令行接口来运行 Babel 转译。
  
- **常见用法**：
  ```bash
  npm install --save-dev @babel/cli
  ```

  使用命令行运行 Babel：
  ```bash
  npx babel src --out-dir dist
  ```

### 8. **@babel/polyfill / core-js / regenerator-runtime**
在一些较旧的浏览器中，某些 JavaScript 特性（如 Promise、async/await、Object.assign 等）可能不被支持。通过引入 `core-js` 和 `regenerator-runtime`，可以在环境中补充这些特性，使得应用在较老的浏览器上也能正常运行。

- **主要功能**：
  - 提供 polyfill，支持 JavaScript 新特性的兼容性。
  
- **常见用法**：
  ```bash
  npm install --save core-js regenerator-runtime
  ```

### 9. **@babel/plugin-proposal-class-properties**
这个插件使得 Babel 支持类属性的语法（`class properties`）。这是一个 ECMAScript 提案，使得可以在类内部直接定义成员变量，而不需要在构造函数中声明。

- **主要功能**：
  - 将类属性（如 `static` 或实例属性）转换为 ES5 可执行的代码。
  
- **常见用法**：
  ```bash
  npm install --save-dev @babel/plugin-proposal-class-properties
  ```

  在 `.babelrc` 或 `babel.config.js` 文件中配置：
  ```json
  {
    "plugins": ["@babel/plugin-proposal-class-properties"]
  }
  ```
