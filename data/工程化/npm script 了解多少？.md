---
level: 2
---

# npm script 了解多少？

## 题目要点

`npm scripts` 提供了一种灵活、强大且简单的方法来管理和自动化开发任务。通过合理使用 `npm scripts`，可以显著提高开发效率，简化工作流。

## 参考答案

`npm script` 是 Node.js 的包管理工具 npm 提供的功能，用于在 `package.json` 文件中定义自定义的命令和脚本。它使得在项目中执行常见的开发任务变得更加简便和一致。下面是对 `npm script` 的详细理解：

### **1. 基本概念**

- **定义**：`npm scripts` 是在 `package.json` 文件的 `scripts` 字段中定义的一组命令。你可以在这里定义任何你想要的命令，并通过 `npm run <script>` 执行它们。

  ```json
  {
    "scripts": {
      "start": "node server.js",
      "test": "jest",
      "build": "webpack --config webpack.config.js"
    }
  }
  ```

### **2. 常见的 npm 脚本**

- **启动脚本** (`start`): 这是一个特殊的脚本，可以通过 `npm start` 直接运行。通常用来启动应用程序或开发服务器。

  ```json
  "scripts": {
    "start": "node app.js"
  }
  ```

- **测试脚本** (`test`): 另一个特殊的脚本，`npm test` 会默认执行这个脚本。通常用来运行测试用例。

  ```json
  "scripts": {
    "test": "mocha"
  }
  ```

- **构建脚本** (`build`): 用来构建项目，比如打包前端代码、编译 TypeScript 等。

  ```json
  "scripts": {
    "build": "webpack"
  }
  ```

### **3. 执行顺序和生命周期**

- **执行**：通过 `npm run <script>` 命令执行指定的脚本。如果脚本中有空格或特殊字符，通常需要用引号括起来。

  ```bash
  npm run build
  ```

- **预设和后置脚本**：`npm` 支持一些特殊的脚本名称，这些脚本在特定的生命周期事件中自动执行。例如：

  - `pre<name>`：在 `<name>` 脚本运行之前执行。
  - `post<name>`：在 `<name>` 脚本运行之后执行。

  ```json
  "scripts": {
    "prebuild": "echo 'Preparing to build...'",
    "build": "webpack",
    "postbuild": "echo 'Build completed!'"
  }
  ```

  执行 `npm run build` 时，`prebuild` 脚本会先执行，然后执行 `build`，最后执行 `postbuild`。

### **4. 脚本中使用的命令和工具**

- **可以使用任意命令**：脚本中可以使用任何可执行的命令，比如 `node`、`npm`、`webpack`、`babel` 等。

  ```json
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write 'src/**/*.{js,jsx}'"
  }
  ```

- **跨平台支持**：为了在不同操作系统（Windows、Linux、macOS）上兼容，有时需要用到跨平台的工具如 `cross-env` 来设置环境变量。

  ```json
  "scripts": {
    "start": "cross-env NODE_ENV=development node server.js"
  }
  ```

### **5. 脚本的参数传递**

- **传递参数**：可以将参数传递给脚本，通过 `--` 符号分隔。例如：

  ```bash
  npm run build -- --env=production
  ```

  在 `package.json` 中，`build` 脚本可以通过 `process.argv` 获取到这些参数。

### **6. 环境变量**

- **设置环境变量**：可以在脚本中设置环境变量来影响脚本的行为。

  ```json
  "scripts": {
    "start": "NODE_ENV=production node app.js"
  }
  ```

  在 Windows 上，环境变量的设置方式略有不同，需要使用 `cross-env` 或类似工具。

### **7. 脚本的复用**

- **复用命令**：可以将复杂的命令拆分成多个脚本，或者将常用的命令提取到脚本中，避免在多个地方重复编写命令。

  ```json
  "scripts": {
    "lint": "eslint src",
    "format": "prettier --write src",
    "fix": "npm run lint && npm run format"
  }
  ```
