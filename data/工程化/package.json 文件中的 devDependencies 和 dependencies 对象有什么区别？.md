---
level: 2
---

#  package.json 文件中的 devDependencies 和 dependencies 对象有什么区别？

## 参考答案

前端项目的 `package.json` 文件中，`dependencies` 和 `devDependencies` 对象都用于指定项目所依赖的软件包，但它们在项目的开发和生产环境中的使用有所不同。

1. **dependencies**：
   - `dependencies` 是指定项目在生产环境中运行所需要的依赖项。
   - 这些依赖项通常包括运行时需要的库、框架、工具等。
   - 当你通过 `npm install` 或 `npm ci` 安装依赖时，默认会安装 `dependencies` 中的包。
   - 这些依赖项会被打包和部署到生产环境中，因此它们对于项目的运行是必需的。

2. **devDependencies**：
   - `devDependencies` 是指定在开发过程中所需要的依赖项。
   - 这些依赖项通常包括开发、测试、构建、部署等过程中所需的工具、库等。
   - 例如，测试框架、构建工具、代码检查工具等通常属于 `devDependencies`。
   - 当你在开发环境中使用 `npm install` 安装依赖时，只会安装 `dependencies` 中的包。要安装 `devDependencies` 中的包，你需要额外使用 `npm install --dev` 或 `npm install --only=dev` 等命令。
   - 这些依赖项不会被打包到生产环境中，因为它们只在开发过程中需要，对于实际部署和运行项目并不需要。

总的来说，`dependencies` 中的依赖项是项目运行所必需的，而 `devDependencies` 中的依赖项则是在开发过程中需要的辅助工具和库。
