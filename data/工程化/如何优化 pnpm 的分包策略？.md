---
level: 3
---

# 如何优化 pnpm 的分包策略？

## 题目要点

优化 pnpm 分包的核心在于：**目录结构清晰化、依赖版本单一化、引用协议标准化、以及构建指令精细化。**

## 参考答案

在现代大型 Monorepo（单体多仓库）架构中，`pnpm` 凭借其**内容寻址存储（Content-addressable storage）**和**硬链接（Hard Links）**技术，已经成为了包管理的首选。

优化 pnpm 的分包策略，本质上是平衡 **“构建速度”**、**“依赖体积”** 和 **“团队协作成本”**。

以下是深度优化的四个核心策略：

### 1. 完善 Workspace 配置：精确定义边界

分包的第一步是合理规划 `pnpm-workspace.yaml`。

* **按职能分包**：不要把所有代码都塞进 `packages/`。建议采用垂直化目录结构：
* `apps/`：具体业务应用（Vue/React 项目）。
* `packages/shared/`：纯工具函数、通用 UI 组件。
* `packages/config/`：通用的 ESLint、Tailwind、Tsconfig 配置包。


* **排除无关路径**：通过通配符过滤，避免 pnpm 在扫描工作区时包含 `node_modules` 或构建产物。

### 2. 利用 `pnpm.overrides` 强制版本对齐

在分包项目中，不同子包可能依赖了同一插件的不同版本（例如 `lodash@4.1.0` 和 `lodash@4.1.7`）。这会导致 `pnpm` 存储多个副本，甚至引起类型冲突。

* **策略**：在根目录的 `package.json` 中使用 `overrides`（或 `resolutions`）字段，强制全量工作区使用统一的依赖版本。
* **收益**：减小 `p-lock` 文件体积，确保所有子包在相同的环境下运行。

### 3. 使用 `workspace:` 协议与发布解耦

在子包互相引用时，务必使用 `workspace:` 协议。

* **语法**：`"common-ui": "workspace:*"`。
* **优化逻辑**：
* **本地联动**：开发时，pnpm 会直接通过软链接（Symlinks）指向本地源码，修改即生效，无需手动编译。
* **打包替换**：在执行 `pnpm publish` 或构建时，pnpm 会自动将 `workspace:*` 替换为具体的版本号。



### 4. 优化递归执行与过滤（Filtering）

当项目达到几十个子包时，运行 `pnpm install` 或 `pnpm build` 会变得缓慢。

* **增量构建**：利用 `--filter` 命令。
* `pnpm build --filter "...@apps/web"`：仅构建 web 应用及其所有本地依赖包。
* `pnpm build --filter "shared-utils^..."`：仅构建依赖了该工具包的上游应用。


* **并行度控制**：在 CI/CD 中，通过 `--parallel` 开启最大并行任务，或者通过 `-C` 在特定子包目录下运行命令。

### 5. 缓存与存储优化

* **共享存储（Shared Store）**：确保所有项目公用一个 `~/.pnpm-store`。这样即使你有 10 个项目都用了 React，磁盘上也只会占一份空间。
* **`hoist-pattern` 配置**：如果你遇到了“幻影依赖”问题（某个包没声明却能用），可以在 `.npmrc` 中设置 `shamefully-hoist=true`，但这会破坏 pnpm 的严格安全性，**非必要不建议使用**。

---

### 配合 Turborepo 增强分包性能

如果你的分包策略已经很完善，但构建依然慢，建议在 pnpm 之上引入 **Turborepo**。

* **任务编排**：它能识别 pnpm 工作区中的依赖图谱。
* **远程缓存**：如果 A 同事编译过了某个子包，B 同事拉取代码后可以直接命中缓存，实现“秒级构建”。
