---
level: 1.5
---

# 说说你对 package.json 中配置项的了解

## 参考答案

`package.json` 是 Node.js 和前端项目中的核心配置文件，定义了项目的元数据、依赖、脚本等信息。

以下是一些常见的 `package.json` 配置项及其作用：

### **1. `name`**

- **定义**：项目名称。
- **作用**：用于标识项目，必须是唯一的。如果你发布到 npm，名称将成为包的标识符。

### **2. `version`**

- **定义**：项目的版本号。
- **作用**：表示项目的版本，通常遵循 [SemVer](https://semver.org/) 语义化版本规范（如 `1.0.0`）。

### **3. `description`**

- **定义**：项目的简短描述。
- **作用**：提供有关项目的简要说明。

### **4. `main`**

- **定义**：项目的入口文件。
- **作用**：指定 Node.js 模块的主文件，默认为 `index.js`。当使用 `require` 导入模块时，会加载该文件。

### **5. `scripts`**

- **定义**：定义可以通过 `npm run <script>` 命令运行的脚本。
- **作用**：用于自动化任务，如测试、构建和启动项目。常见的脚本包括 `start`、`test`、`build` 等。

  ```json
  "scripts": {
    "start": "node index.js",
    "test": "mocha test/",
    "build": "webpack --config webpack.config.js"
  }
  ```

### **6. `dependencies`**

- **定义**：项目运行时所需的依赖模块。
- **作用**：列出项目在生产环境中需要的 npm 包。安装项目时，这些依赖会被下载和安装。

  ```json
  "dependencies": {
    "express": "^4.17.1",
    "lodash": "^4.17.21"
  }
  ```

### **7. `devDependencies`**

- **定义**：项目开发时所需的依赖模块。
- **作用**：列出项目在开发和测试过程中需要的 npm 包，如编译器、测试框架等。

  ```json
  "devDependencies": {
    "webpack": "^5.38.1",
    "babel-loader": "^8.2.2"
  }
  ```

### **8. `peerDependencies`**

- **定义**：项目与其他包的兼容版本范围。
- **作用**：指定项目所兼容的其他包的版本范围，用于插件和库的兼容性。

  ```json
  "peerDependencies": {
    "react": "^17.0.2"
  }
  ```

### **9. `engines`**

- **定义**：指定项目需要的 Node.js 版本或其他运行环境。
- **作用**：确保项目在特定版本的 Node.js 上运行，避免不兼容问题。

  ```json
  "engines": {
    "node": ">=14.0.0"
  }
  ```

### **10. `license`**

- **定义**：项目的许可证类型。
- **作用**：指明项目的开源许可证类型，如 `MIT`、`Apache-2.0`、`GPL-3.0` 等。

### **11. `author`**

- **定义**：项目作者的名称和联系信息。
- **作用**：提供有关项目作者的信息。

### **12. `contributors`**

- **定义**：项目的贡献者列表。
- **作用**：列出为项目做出贡献的人员。

### **13. `repository`**

- **定义**：项目的代码仓库信息。
- **作用**：指定项目的 Git 仓库 URL，方便其他人访问源代码。

  ```json
  "repository": {
    "type": "git",
    "url": "https://github.com/username/repo.git"
  }
  ```

### **14. `keywords`**

- **定义**：项目相关的关键词。
- **作用**：用于描述项目的关键词，以便搜索引擎和 npm 上更容易找到。

  ```json
  "keywords": [
    "express",
    "node",
    "web"
  ]
  ```

### **15. `files`**

- **定义**：要包含在发布包中的文件列表。
- **作用**：限制发布到 npm 的文件，排除不需要的文件。

  ```json
  "files": [
    "lib/",
    "dist/"
  ]
  ```

### **16. `browserslist`**

- **定义**：指定支持的浏览器版本范围。
- **作用**：用于工具（如 Babel、Autoprefixer）来根据支持的浏览器生成兼容代码。

  ```json
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "IE 10"
  ]
  ```

这些配置项在 `package.json` 文件中定义了项目的基本信息、依赖、脚本等内容，有助于项目的开发、构建、发布和维护。
