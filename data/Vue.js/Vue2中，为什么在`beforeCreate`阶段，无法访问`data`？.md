---
level: 1
---

# Vue2中，为什么在`beforeCreate`阶段，无法访问`data`？

## 题目要点

Vue 2 的 `beforeCreate` 执行时，组件实例尚未完成状态初始化；`data()` 尚未执行，响应式系统也未建立，数据属性尚未代理到实例上；这是由 Vue 2 的初始化顺序和 `Object.defineProperty` 响应式实现决定的设计结果，而非生命周期设计失误；`beforeCreate` 被刻意保留为一个“无状态”的早期钩子，主要用于插件注入和底层扩展。

## 参考答案

在 Vue 2 中，`beforeCreate` 阶段**无法访问 `data`**，并不是设计疏忽，而是由 **Vue 2 实例初始化顺序与响应式实现方式共同决定的必然结果**。

---

## 一、结论先行

> **`beforeCreate` 执行时，`data` 尚未初始化，也尚未被代理到实例上，因此既不存在响应式数据，也不存在 `this.xxx` 的访问入口。**

---

## 二、Vue 2 实例初始化的真实顺序

Vue 2 创建组件实例时，核心初始化流程可以简化为：

```text
initEvents
initRender
→ beforeCreate
initInjections
initState（data / props / computed / methods）
→ created
```

> **`beforeCreate` 在 `initState` 之前执行**

而 `data`、`props`、`computed` 等，全部是在 `initState` 阶段完成的。

---

## 三、`data` 在 Vue 2 中是如何“变得可访问”的

### 1. data 本身只是一个 option

在 `beforeCreate` 时：

* `this.$options.data` 可能存在
* 但 `data()` **尚未执行**
* `data` 对象尚未生成

---

### 2. 响应式与代理发生在 `initState`

在 `initState` 内部，Vue 2 会做三件关键事情：

1. **执行 `data()`，得到原始数据对象**
2. 通过 `Object.defineProperty` 将数据变成响应式
3. 将每个 data key 代理到实例上：

```js
  get() { return vm._data.count },
  set(val) { vm._data.count = val }
})
```

* `this._data` 不存在
* `this.count` 也不存在

---

## 四、为什么 Vue 2 不提前初始化 data

这是一个**设计取舍**，而不是技术限制。

### 1. injections / props 优先级问题

在 Vue 2 中：

* `inject` 依赖 `provide`
* `data` 可以依赖 `props`
* `props` 又可能依赖注入结果

因此 Vue 必须保证：

> **依赖链路已准备好，再执行 data()**

而 `beforeCreate` 被刻意放在这些初始化之前，用来做**最原始的实例配置**。

---

### 2. 保留一个“无状态”的生命周期钩子

`beforeCreate` 的定位是：

* 无响应式
* 无数据
* 无依赖
* 仅用于插件或底层逻辑注入

这为插件系统提供了稳定的切入点。

---

## 五、为什么在 `created` 就可以访问 data

因为在 `created` 之前：

* `initState` 已完成
* `data` 已响应式化
* 所有 data key 已代理到实例

因此在 `created` 中：

```js
```

## 六、对比 Vue 3（加分理解）

Vue 3 中：

* 不再依赖 `this`
* 使用 `setup` 明确划分初始化边界
* 响应式数据在 `setup` 内显式创建

本质上是把 Vue 2 中**隐式的初始化顺序问题，转为显式 API 设计**。
