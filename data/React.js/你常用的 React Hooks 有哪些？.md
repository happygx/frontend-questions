---
level: 1
---

# 你常用的 React Hooks 有哪些？

## 参考答案

React 提供了一系列的 Hooks，用于在函数组件中添加和管理状态、副作用等功能。

以下是一些常用的 React Hooks：

1. `useState`：用于在函数组件中添加状态管理。

2. `useEffect`：用于处理副作用操作（如数据获取、订阅、事件监听等）。

3. `useContext`：用于在组件树中获取和使用共享的上下文。

4. `useReducer`：用于管理复杂状态逻辑的替代方案，类似于 Redux 的 reducer。

5. `useCallback`：用于缓存回调函数，以便在依赖未变化时避免重复创建新的函数实例。

6. `useMemo`：用于缓存计算结果，以便在依赖未变化时避免重复计算。

7. `useRef`：用于在函数组件之间保存可变的值，并且不会引发重新渲染。

8. `useLayoutEffect`：与 `useEffect` 类似，但在浏览器完成绘制之前同步执行。

9. `useImperativeHandle`：用于自定义暴露给父组件的实例值或方法。

10. `useDebugValue`：用于在开发者工具中显示自定义的钩子相关标签。
