---
level: 2.5
---

# 说说 package.json 中 dependencies、devDependencies、peerDependencies 有哪些不同，分别适合什么场景

## 题目要点

1. `dependencies`：运行时必须依赖。
2. `devDependencies`：仅开发、构建阶段使用。
3. `peerDependencies`：由宿主项目提供的共享依赖，用于库开发。
4. 在应用中重点区分运行与构建环境，在组件库中重点区分内部依赖与外部宿主框架。

## 参考答案

本质在于**依赖在不同运行阶段的作用范围和安装策略不同**。

理解它们的差异，关键是要区分：

* 当前包是一个「应用」还是一个「库」
* 依赖是否在**运行时（runtime）** 或 **开发/构建时（build-time）** 被使用

---

### 一、dependencies —— 运行时依赖

`dependencies` 是**项目在运行时所需的依赖**。
当项目被打包部署或发布为 npm 包后，这部分依赖仍然是必须的。

常见场景：

* 在 Vue / React 项目中，`vue`、`react`、`axios`、`vue-router` 这类会直接被打包进入生产代码的库。
* 在 Node.js 服务中，`express`、`koa`、`mysql` 等在代码运行时会被直接 `require/import`。

这部分依赖在执行 `npm install` 或 `pnpm install` 时会自动安装，且在生产环境下部署时依然存在。

---

### 二、devDependencies —— 开发时依赖

`devDependencies` 是**仅在开发和构建阶段使用**的依赖。
这类依赖不会出现在最终的生产代码中，也不会在项目打包后的运行环境中被使用。

典型场景包括：

* 构建工具类依赖：`vite`、`webpack`、`rollup`、`esbuild`
* 编译/转译依赖：`typescript`、`babel`、`sass`
* 测试工具：`jest`、`vitest`
* 代码检查工具：`eslint`、`prettier`

比如：
当项目部署时，构建完成后这些依赖已不再需要，因此它们仅作为开发阶段依赖存在。

---

### 三、peerDependencies —— 共享运行环境依赖

`peerDependencies` 用于**声明当前库所依赖的外部包，但不直接安装，而是由使用方（宿主项目）来提供**。

这种机制通常出现在组件库或插件开发中。
例如，一个基于 Vue 3 封装的组件库需要使用 Vue，但希望宿主项目能自行决定 Vue 的版本。
此时组件库可以这样声明：

```json
  "peerDependencies": {
    "vue": "^3.3.0"
  }
}
```

典型使用场景：

* 插件依赖主框架：Vue 插件依赖 Vue、React Hook 库依赖 React
* UI 组件库避免重复打包宿主框架
* 第三方库扩展主框架功能（如 `eslint-plugin-*`、`vite-plugin-*`）

---

### 四、区别总结

| 类型                   | 由谁安装      | 在生产环境是否需要 | 典型用途         |
| -------------------- | --------- | --------- | ------------ |
| **dependencies**     | 当前项目      | 是         | 运行时依赖        |
| **devDependencies**  | 当前项目      | 否         | 开发、构建、测试依赖   |
| **peerDependencies** | 使用者（宿主项目） | 取决于宿主项目   | 声明对外部依赖的兼容关系 |

---

### 五、实际使用建议

* **前端应用项目**：
  大多数依赖放在 `dependencies`，构建工具、测试工具放在 `devDependencies`。

* **组件库或 npm 包项目**：
  运行时真正打包进去的依赖放在 `dependencies`，
  构建工具放在 `devDependencies`，
  外部宿主框架（如 Vue、React）声明在 `peerDependencies`。

例如，一个基于 Element Plus 封装的业务组件库：

```json
  "dependencies": {
    "lodash-es": "^4.17.21"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "typescript": "^5.3.0"
  },
  "peerDependencies": {
    "element-plus": "^2.5.0",
    "vue": "^3.3.0"
  }
}
```
