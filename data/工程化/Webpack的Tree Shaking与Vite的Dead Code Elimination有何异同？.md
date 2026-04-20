---
level: 3.5
---

# Webpack的Tree Shaking与Vite的Dead Code Elimination有何异同？

## 题目要点

* **Tree Shaking** 是从外部看：这个模块提供的“果实”没人要，那就摇下来。
* **DCE** 是从内部看：这行代码执行了也没意义（或者跑不到），那就擦掉。

Vite (Rollup) 的优势在于其预设的 Tree Shaking 算法更符合现代 JS 特性，生成的产物通常更干净；而 Webpack 则提供了更丰富的插件和配置来精细控制这个过程。

## 参考答案

在现代前端构建工具中，**Tree Shaking**（摇树优化）和 **Dead Code Elimination**（DCE，死代码消除）虽然最终目标都是为了减小产物体积，但它们的实现路径和侧重点有所不同。

简单来说：**Tree Shaking 是基于模块关系的“导出过滤”，而 DCE 是基于代码执行逻辑的“无效擦除”。**

---

### 1. Webpack 的 Tree Shaking

Webpack 的 Tree Shaking 深度依赖于 **ES 模块（ESM）** 的静态结构。

* **核心原理**：Webpack 在构建过程中，会通过静态分析识别出哪些模块导出了但没有被 `import`。它会在生成的 bundle 中标记这些未使用的导出，最后由压缩工具（如 Terser 或 ESBuild）进行删除。
* **关键依赖**：
* **静态分析**：必须使用 `import/export`，不能使用 CommonJS 的 `require`（因为 require 是动态的）。
* **Side Effects（副作用）**：这是 Webpack 的痛点。如果一个模块仅仅被引入但未被使用，但它修改了全局变量，Webpack 默认不敢删。开发者需要在 `package.json` 中配置 `"sideEffects": false` 来告知 Webpack 放心摇树。



---

### 2. Vite 的优化策略（Rollup 驱动）

Vite 在生产环境构建时使用的是 **Rollup**。Rollup 的 Tree Shaking 被公认为比 Webpack 更为激进和精准。

* **更细粒度的分析**：Rollup 不仅关注模块间的导出关系，还会分析代码内部的**属性访问**。如果一个对象被导出，但它的某个属性从未被访问过，Rollup 往往能更智能地将其剥离。
* **Vite 的 DCE**：在开发阶段，Vite 几乎不做 Tree Shaking（为了极致的 HMR 速度）。在生产阶段，Vite 结合了 Rollup 的 Tree Shaking 和 ESBuild 的压缩能力。
* **Dead Code Elimination (DCE) 的内涵**：DCE 的范畴更广。例如，代码中有一段 `if (false) { ... }`，这不属于模块导出问题，而是逻辑死路。Vite/Rollup 能够识别并直接删除这些永远不会执行的语句。

---

### 3. 两者的异同对比

| 特性 | Webpack (Tree Shaking) | Vite/Rollup (DCE + Tree Shaking) |
| --- | --- | --- |
| **底层依据** | 主要依赖 ESM 的静态导入导出关系。 | 基于更深层的 AST（抽象语法树）分析。 |
| **副作用处理** | 较为保守，高度依赖 `sideEffects` 配置。 | 默认分析更精准，能更好地识别纯函数调用。 |
| **压缩阶段配合** | 标记未使用代码，由 Terser 执行最终删除。 | 在打包过程中就尽量减少无用代码进入 bundle。 |
| **处理广度** | 侧重于“模块级别”的剔除。 | 既有模块剔除，也有强力的代码块逻辑消除。 |

---

### 4. 为什么 DCE 有时会“失效”？

无论是 Webpack 还是 Vite，最怕的就是**副作用（Side Effects）**。

* **场景**：如果你在代码中写了 `const a = window.someInjectedFunc()`，构建工具无法确定删除 `a` 是否会破坏程序的全局环境，因此即使 `a` 没被使用，它也会被保留。
* **解决方案**：使用 `/*#__PURE__*/` 注释。这会显式告诉构建工具：这个函数调用是没有副作用的，如果结果没被用到，请直接删掉它。
