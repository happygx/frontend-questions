---
level: 3.5
---

# Vue3 中，动态绑定v-bind:class="{ active: isActive }"会被编译成什么样的JS代码？

## 题目要点

`v-bind:class="{ active: isActive }"` 在 Vue 3 中会被编译为 render 函数中的普通 props 表达式，核心形式是 `class: normalizeClass({ active: _ctx.isActive })`；模板变量通过 `_ctx` 访问；对象结构不会在编译期被拍平，而是交由运行时统一归一化为字符串；这种设计保证了 class 多种写法的统一处理，并与响应式系统自然衔接。

## 参考答案

以 **Vue 3（编译器 + 运行时分离架构）** 为背景，`v-bind:class="{ active: isActive }"` 在编译阶段并不会以“指令”的形式存在到运行时，而是被**直接编译成普通的 JavaScript 表达式 + 运行时辅助函数调用**。

下面从**模板 → render 函数 → 运行时执行**三个层次把这件事讲清楚。

---

## 一、模板层的输入

模板代码：

```vue
```

```vue
```

## 二、编译阶段：模板如何被转换

### 1. AST 阶段的识别

编译器在解析模板 AST 时会识别出：

* `class` 是一个 **动态绑定**
* 表达式是一个 **对象字面量**
* key 是静态字符串 `"active"`
* value 是作用域变量 `isActive`

这一步不会生成字符串拼接，而是保留**表达式语义**。

---

### 2. 转换为 render 函数中的 props 表达式

在 Vue 3 中，模板最终会被编译为类似下面的 render 函数（示意）：

```js

export function render(_ctx, _cache) {
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass({ active: _ctx.isActive })
    },
    null
  );
}
```

---

## 三、关键点拆解

### 1. `isActive` 如何访问

```js
```

* 模板中的变量会被提升为 render 函数的上下文 `_ctx`
* 编译阶段并不关心它是 `ref`、`reactive` 还是普通值
* 取值逻辑完全交给运行时响应式系统

---

### 2. 为什么要调用 `normalizeClass`

```js
```

* 字符串：`"a b"`
* 数组：`["a", condition && "b"]`
* 对象：`{ a: true, b: false }`
* 以上形式的任意嵌套组合

`normalizeClass` 的职责是：

> **把任意合法的 class 表达式，规范化为最终可直接写入 DOM 的字符串**

例如：

```js
```

```text
```

### 3. 为什么 class 不会直接写成字符串拼接

一个直觉实现可能是：

```js
```

* 会破坏数组 / 对象 / 混合写法的统一处理
* 会导致多 class 合并逻辑分散在编译阶段
* 不利于运行时复用和优化

因此 Vue 选择：

> **编译期保留结构，运行时统一归一化**

---

## 四、运行时执行时发生了什么

当组件 render effect 执行时：

1. 访问 `_ctx.isActive`
2. 触发响应式 `get`，建立依赖
3. `normalizeClass` 返回字符串
4. Virtual DOM 中的 `class` 属性发生变化
5. Diff 阶段只更新该元素的 `className`

当 `isActive` 变化时：

* render effect 重新执行
* class 重新计算
* DOM class 被最小化更新

---

## 五、Vue 2 与 Vue 3 的差异补充（加分点）

在 Vue 2 中，生成的是类似：

```js
  class: { active: isActive }
})
```

Vue 3 把这一步拆得更明确：

* 编译期更“纯”
* 运行时通过 `normalizeClass` 明确边界
* 更利于 tree-shaking 和静态分析
