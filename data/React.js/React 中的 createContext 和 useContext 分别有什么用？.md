---
level: 3
---

# React 中的 createContext 和 useContext 分别有什么用？

## 题目要点

- `createContext`：
  - 用于创建一个新的上下文对象。
  - 需要在组件树中使用 `Provider` 来提供上下文的值，并使用 `Consumer` 或 `useContext` 来访问这些值。

- `useContext`：
  - 用于在函数组件中直接获取上下文的值。
  - 简化了消费上下文的过程，不需要显式地使用 `Consumer` 组件，适用于函数组件中。

`createContext` 和 `useContext` 通常配合使用，`createContext` 用于创建上下文，而 `useContext` 用于在函数组件中消费这个上下文的值。

## 参考答案

在 React 中，`createContext` 和 `useContext` 是处理上下文的两个相关 API，但它们的功能和用途有所不同：

### **1. `createContext`**

- **作用**：用于创建一个新的上下文对象。
- **用法**：调用 `createContext` 会返回一个上下文对象，这个对象包含 `Provider` 和 `Consumer` 组件。`Provider` 用于提供上下文的值，而 `Consumer` 用于消费上下文的值。
- **示例**：
  ```jsx
  // 创建上下文对象
  const MyContext = createContext(defaultValue);

  // 提供上下文的值
  <MyContext.Provider value={someValue}>
    {/* 子组件 */}
  </MyContext.Provider>

  // 消费上下文的值
  <MyContext.Consumer>
    {value => /* 使用上下文的值 */}
  </MyContext.Consumer>
  ```

### **2. `useContext`**

- **作用**：用于在函数组件中访问上下文的值。
- **用法**：`useContext` 是一个 Hook，用于在函数组件中消费上下文的值，而不需要使用 `Consumer` 组件。
- **示例**：
  ```jsx
  import { useContext } from 'react';

  // 在函数组件中访问上下文
  const value = useContext(MyContext);
  ```
