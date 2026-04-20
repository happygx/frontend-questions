---
level: 1.5
---

# 说说你对 npx 的了解？

## 题目要点

`npx` 是一个强大的工具，它简化了 Node.js 包的使用，尤其是在临时执行和版本控制方面，使得运行和管理 Node.js 工具更加方便和灵活。

## 参考答案

`npx` 是 npm 包管理器的一个附加工具，从 npm 5.2.0 版本开始引入。它主要用于简化执行 Node.js 包和模块的过程，特别是那些作为命令行工具使用的包。

### **`npx` 的主要功能和特点**

1. **运行本地或全局包**：
   - 可以直接执行 `node_modules/.bin` 中的可执行文件，无需全局安装。例如，运行 `npx eslint .` 会使用本地项目中安装的 `eslint`。

2. **临时使用包**：
   - 不需要全局安装一个命令行工具，可以直接运行。例如，`npx create-react-app my-app` 会临时下载并运行 `create-react-app`，然后删除它。

3. **指定版本**：
   - 可以指定要运行的包的版本。比如，`npx lodash@4.17.21` 会运行指定版本的 `lodash`。

4. **自动下载**：
   - 如果指定的命令或包未安装，`npx` 会自动从 npm 注册表下载并执行，而不需要手动安装。

5. **简化命令执行**：
   - 对于在项目中需要使用的命令行工具，`npx` 可以避免全局安装，使项目依赖更干净、更易于管理。

### **使用场景**

- **运行开发工具**：
  - 比如，`npx eslint .` 用于在项目中运行 ESLint，而不需要全局安装 ESLint。

- **创建新项目**：
  - 使用 `npx create-react-app my-app` 来创建一个新的 React 项目，无需全局安装 `create-react-app`。

- **执行一次性命令**：
  - 例如，运行一个 npm 包的脚本一次，`npx cowsay "Hello World"` 会执行 `cowsay` 命令并打印输出。

### **示例**

1. **运行本地包**：
   ```bash
   npx webpack --config webpack.config.js
   ```

2. **临时运行包**：
   ```bash
   npx cowsay "Hello!"
   ```

3. **运行特定版本**：
   ```bash
   npx create-react-app@4.0.0 my-app
   ```
