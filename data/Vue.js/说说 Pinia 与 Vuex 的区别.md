---
level: 3.5
---

# 说说 Pinia 与 Vuex 的区别

## 题目要点

| 对比点            | Pinia                               | Vuex                              |
|-------------------|-------------------------------------|-----------------------------------|
| **易用性**       | 轻量简单，贴合 Vue3 API             | 配置严格，学习成本较高            |
| **类型支持**     | 内置类型推导，TypeScript 友好        | 类型支持需手动实现                |
| **性能**         | 基于 Vue3 响应式系统，性能更优       | Vue2 响应式性能稍逊              |
| **模块化**       | 扁平化设计，模块更灵活               | 嵌套模块，适合大型项目             |

在 Vue3 中，**Pinia 是官方推荐的状态管理库**，相比 Vuex 更轻量、现代，适合新项目开发；而 Vuex 在一些老旧的 Vue2 项目中仍有广泛使用。

## 参考答案

Pinia 和 Vuex 是 Vue 生态中两种状态管理工具，它们的功能类似，但在设计理念、用法和性能上存在一些区别。Pinia 是 Vuex 的替代者，并在 Vue3 生态中逐渐成为推荐的状态管理工具。

以下是它们的对比分析：

---

### **1. 基本对比**
| 特性                | Pinia                         | Vuex                          |
|---------------------|-------------------------------|-------------------------------|
| **作者**           | Vue 核心团队成员尤雨溪         | Vue 核心团队                 |
| **版本支持**       | Vue 3（也支持 Vue 2）         | Vue 2 和 Vue 3               |
| **模块化设计**     | 扁平结构，模块化更灵活         | 嵌套模块，需显式声明         |
| **学习成本**       | 简单，语法贴近 Vue 3 Composition API | 较复杂，语法严格             |
| **状态持久化**     | 不支持直接内置功能（需插件）     | 无内置支持                   |
| **开发体验**       | 支持 TypeScript 的类型推导优化  | 支持但需要手动配置           |

---

### **2. 核心区别**

#### **2.1 状态的定义方式**
- **Pinia**：
  - 使用函数形式的 `defineStore` 定义 Store。
  - 状态是基于 `reactive` 的，天然响应式，支持直接解构使用。
  ```javascript
  import { defineStore } from 'pinia';

  const useStore = defineStore('main', {
    state: () => ({
      count: 0,
    }),
    actions: {
      increment() {
        this.count++;
      },
    },
  });
  ```
  解构使用：
  ```javascript
  const { count, increment } = useStore();
  ```

- **Vuex**：
  - 需要严格按模块化、`state`, `mutations`, `actions` 分离定义。
  - 必须通过 `store.commit` 或 `store.dispatch` 修改状态。
  ```javascript
  const store = new Vuex.Store({
    state: {
      count: 0,
    },
    mutations: {
      increment(state) {
        state.count++;
      },
    },
    actions: {
      increment({ commit }) {
        commit('increment');
      },
    },
  });
  ```

---

#### **2.2 模块化**
- **Pinia**：  
  没有嵌套模块的概念，推荐按功能模块划分 Store，每个 Store 都是独立的。模块之间通过 Store 引用即可，逻辑清晰。

- **Vuex**：  
  通过嵌套的 `modules` 管理状态，每个模块有自己的 `state`、`mutations`、`actions`，适合大型项目，但可能出现层级过深的问题。

---

#### **2.3 使用 TypeScript**
- **Pinia**：  
  天然支持 TypeScript，通过 `defineStore` 自动推导类型，开发者无需额外配置，类型友好。
  ```typescript
  const useStore = defineStore('main', {
    state: () => ({
      count: 0,
    }),
  });

  const store = useStore();
  store.count; // TypeScript 自动推断为 number
  ```

- **Vuex**：  
  TypeScript 支持较弱，需要手动定义类型，且需要大量模板代码来维护类型定义。
  ```typescript
  interface State {
    count: number;
  }

  const store = new Vuex.Store<State>({
    state: {
      count: 0,
    },
  });

  store.state.count; // 需手动指定类型
  ```

---

#### **2.4 状态修改方式**
- **Pinia**：  
  支持直接修改状态，无需通过 `mutations`。逻辑更简单，易于维护。
  ```javascript
  const store = useStore();
  store.count++; // 直接修改状态
  ```

- **Vuex**：  
  必须通过 `mutations` 修改状态，不能直接改变 `state`，使得代码较为冗长。
  ```javascript
  store.commit('increment'); // 必须通过 mutations
  ```

---

#### **2.5 开发体验**
- **Pinia**：  
  - API 设计对 Vue3 Composition API 友好。
  - 更少的模板代码，逻辑更简洁。
  - 支持更好的开发者工具（devtools）。

- **Vuex**：  
  - 使用 Vue2 Options API 更友好。
  - 需要模板代码配置（如 `state`、`mutations`）。

---

### **3. 性能对比**
- **Pinia**：  
  - 基于 Vue3 的响应式系统（`reactive` + `ref`），性能更优。
  - 更轻量，设计现代化。
  
- **Vuex**：  
  - 基于 Vue2 的响应式系统（`Object.defineProperty`），性能稍逊。
