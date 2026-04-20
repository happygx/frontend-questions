---
level: 3
---

# Vue 是如何实现 MVVM 的？

## 题目要点

- **Model**：数据层通过响应式系统来实现，确保数据变化能够通知视图。
- **View**：视图层通过模板语法和指令来自动更新展示的数据。
- **ViewModel**：Vue 实例作为 ViewModel，处理数据和视图之间的交互，管理数据、计算属性和侦听属性。

## 参考答案

Vue.js 实现 MVVM（Model-View-ViewModel）模式的方式可以通过以下几个核心部分来理解：

### **1. MVVM 架构概述**

- **Model**：数据层，代表应用的状态。
- **View**：视图层，用户界面部分，展示数据。
- **ViewModel**：中介层，负责处理视图与模型之间的绑定和交互。

### **2. Vue 的实现机制**

**Vue.js** 通过以下技术和机制实现了 MVVM 架构：

#### **1. 数据绑定（Data Binding）**

- **响应式系统**：Vue 的响应式系统通过 `Object.defineProperty`（Vue 2.x）或者 `Proxy`（Vue 3.x）实现。它使得数据模型（Model）与视图（View）保持同步，当数据变化时，视图会自动更新。

  - **Vue 2.x**：使用 `Object.defineProperty` 对数据进行 getter 和 setter 的定义，以便在数据变化时能够通知视图更新。
  - **Vue 3.x**：使用 `Proxy` 实现更高效的响应式系统，支持更细粒度的依赖追踪和性能优化。

  ```javascript
  // Vue 2.x
  Object.defineProperty(data, 'key', {
    get() { /* 返回属性值 */ },
    set(value) { /* 设置属性值并通知视图更新 */ }
  });

  // Vue 3.x
  const reactiveData = new Proxy(data, {
    get(target, key) { /* 处理获取操作 */ },
    set(target, key, value) { /* 处理设置操作并通知视图更新 */ }
  });
  ```

#### **2. 双向数据绑定（Two-Way Data Binding）**

- **`v-model` 指令**：Vue 提供了 `v-model` 指令来实现双向数据绑定。它在表单控件和组件之间自动同步数据。

  ```html
  <!-- Vue 2.x -->
  <input v-model="message" />

  <!-- Vue 3.x -->
  <input v-model="message" />
  ```

#### **3. 数据与视图的绑定**

- **模板语法**：Vue 使用声明式模板语法（例如 `{{ message }}`）来绑定数据到视图中。这些模板会被编译成渲染函数，这些函数在每次数据变化时被调用以更新视图。

  ```html
  <p>{{ message }}</p>
  ```

- **计算属性（Computed Properties）**：计算属性可以基于依赖的响应式数据自动计算和缓存结果，并且在依赖的数据变化时自动更新。

  ```javascript
  computed: {
    reversedMessage() {
      return this.message.split('').reverse().join('');
    }
  }
  ```

- **侦听属性（Watchers）**：侦听属性可以监视数据变化并执行特定的操作，例如异步操作或复杂计算。

  ```javascript
  watch: {
    message(newVal, oldVal) {
      console.log(`Message changed from ${oldVal} to ${newVal}`);
    }
  }
  ```

#### **4. 视图模型（ViewModel）**

- **Vue 实例**：Vue 实例（通过 `new Vue()`）是 MVVM 中的 ViewModel，它将数据（Model）和视图（View）结合在一起。Vue 实例管理数据、计算属性、侦听属性以及视图的更新逻辑。

  ```javascript
  new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    },
    computed: {
      reversedMessage() {
        return this.message.split('').reverse().join('');
      }
    }
  });
  ```

#### **5. 更新机制**

- **虚拟 DOM 和 diff 算法**：Vue 使用虚拟 DOM 和 diff 算法来高效地更新视图。虚拟 DOM 表示了当前视图的快照，而 diff 算法比较新旧虚拟 DOM 以找出差异，并将这些差异应用到真实 DOM 上。

  ```javascript
  // 渲染函数示例
  function render() {
    return _c('div', null, [ _c('p', null, [ _v(this.message) ]) ]);
  }
  ```
