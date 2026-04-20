---
level: 2
---

# webpack 中的 Loader ，链式调用顺序会影响编译结果吗？

## 题目要点

Webpack Loader 是一个按流水线执行的源码转换系统，Loader 的链式顺序直接决定源码被处理的阶段；配置顺序为从左到右，但执行顺序为从右到左，每个 Loader 都处理前一个 Loader 的输出，因此顺序错误会导致语义阶段错乱甚至编译失败；通常应遵循“靠近源码的 Loader 放右侧，靠近运行时的 Loader 放左侧”的原则，同时 Loader 还存在 pitch 与 normal 两阶段执行机制，使顺序对最终编译结果具有决定性影响。

## 参考答案

会，而且这是 Webpack Loader 机制中**非常关键且经常被误解的一点**：

> **Loader 的链式调用顺序不仅会影响编译结果，而且很多语法是否能正确工作，完全取决于 Loader 的执行顺序。**

理解这个问题的关键在于：**Loader 本质是一个“源码转换流水线（transform pipeline）”。**

---

## 一、Loader 本质：源码的逐步转换

在 Webpack 中 hookup 的 Loader，并不是同时运行的，它们会对模块源码进行**一层一层的转换**：

```text
```

* 接收上一个 Loader 的输出
* 返回新的源码字符串（或 AST 转换结果）
* 交给下一个 Loader

因此：

> Loader 顺序决定了“谁先处理源码”，自然会影响最终产物。

---

## 二、关键规则：执行顺序与书写顺序相反

Webpack Loader 的执行规则是：

```text
执行顺序：从右到左
```

```js
```

```text
→ css-loader
→ style-loader
```

* 最右侧 Loader 最先接触原始资源
* 每个 Loader 向左传递转换结果

可以把它理解为函数组合：

```js
```

## 三、为什么顺序会直接影响编译结果

因为不同 Loader 处理的是**不同语义阶段的代码**。

### 典型例子：CSS 处理链

```js
```

* `css-loader`：解析 CSS → 转成 JS module
* `style-loader`：把 CSS 注入 DOM

正确流程：

```text
```

```js
```

```text
```

* style-loader 收到的是原始 CSS
* 它期望的是 JS 模块
* 编译或运行直接异常

---

### 再看 Babel + TypeScript

```js
```

```text
```

1. TypeScript 先转 JS
2. Babel 再做语法降级 / polyfill

如果反过来：

```text
```

---

## 四、Loader 阶段不仅只有一个（高级理解）

Webpack Loader 实际存在多个执行阶段：

```text
normal 阶段：从右 → 左
```

```text
pitch(loader2)
pitch(loader3)

normal(loader3)
normal(loader2)
normal(loader1)
```

* 提前终止后续 Loader
* 改写执行流程
* 返回自定义模块内容

这也是 `style-loader` 等 Loader 能实现高级能力的原因。

---

## 五、为什么 Webpack 采用“反向执行”

本质是为了符合编译直觉：

* 最靠近资源的 Loader 先处理原始文件
* 后续 Loader 处理已经转换后的结果

类似编译器 pipeline：

```text
```

## 六、工程实践中的顺序原则

经验上可以总结为一个规律：

> **越接近“源码形态”的 Loader 越靠右，越接近“运行时”的 Loader 越靠左**

例如：

```text
模块解析类      → 中间
运行时注入类    → 左侧
```
