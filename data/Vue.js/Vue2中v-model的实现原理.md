---
level: 2
---

# Vue2中v-model的实现原理

## 题目要点

1. **本质**：`v-model` = 数据绑定 + 事件监听（语法糖）
2. **核心机制**：

   * `Object.defineProperty` 劫持数据，实现响应式
   * 指令编译器绑定 `value/checked` 和事件
   * Watcher/Dep 通知视图更新
3. **在组件上**：约定 `value` + `input` 事件即可实现双向绑定

## 参考答案

在 Vue 2 中，`v-model` 的本质是 **语法糖**，它本质上是对 **`value`（或 `checked`）属性绑定 + `input` 事件监听** 的封装。理解它的实现原理，需要从 **指令编译机制** 和 **双向绑定逻辑** 入手。

---

## 1. `v-model` 的核心原理

假设在模板中写：

```vue
```

```vue
  :value="msg"
  @input="msg = $event.target.value"
/>
```

1. **`:value="msg"`**

   * 将 Vue 实例中的 `msg` 属性绑定到 input 的 value 上。
   * 当 `msg` 发生变化时，视图自动更新（单向绑定）。

2. **`@input="msg = $event.target.value"`**

   * 监听用户输入事件，将 input 的值同步回 Vue 实例的数据。
   * 完成从视图到数据的更新，实现双向绑定。

---

## 2. 内部实现机制

### 2.1 数据劫持（双向绑定）

* Vue 2 利用 **`Object.defineProperty`** 对 `data` 中的属性进行 getter/setter 劫持。
* 当数据发生变化时，会触发 **Watcher** 更新视图。
* 当用户输入触发 `input` 事件时，通过事件回调修改数据，setter 被触发，视图更新。

### 2.2 指令编译

* Vue 编译模板时，会检测到 `v-model` 指令：

  * 对 **文本输入框 (`input[type=text]`)**，绑定 `value` + `input`
  * 对 **复选框 (`input[type=checkbox]`)**，绑定 `checked` + `change`
  * 对 **单选框 (`input[type=radio]`)**，绑定 `checked` + `change`
  * 对 **`<select>`**，绑定 `value` + `change`
* 这些规则都是在 Vue 的 **`v-model` 指令编译器**里实现的。

### 2.3 Watcher 和 Dep

* 每个绑定的数据属性都有一个 **依赖收集器（Dep）**
* 当数据被访问时，收集依赖（Watcher）
* 当数据被修改时，Dep 通知所有 Watcher 更新视图

---

## 3. 自定义组件上的 v-model

在 Vue 2 中，`v-model` 也可以用于组件。原理是：

```vue
```

```vue
  :value="msg"
  @input="msg = $event"
/>
```

  * 接收 `value` 属性
  * 在内部触发 `this.$emit('input', newValue)`
* Vue 通过这个约定，实现组件上的双向绑定。
