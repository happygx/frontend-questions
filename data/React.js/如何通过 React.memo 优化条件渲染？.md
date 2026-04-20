---
level: 2
---

# 如何通过 React.memo 优化条件渲染？

## 题目要点

- **`React.memo`** 通过 **props 比较** 来决定是否跳过组件渲染，从而优化性能。
- 适用于组件的 **props** 在某些情况下不会变化的场景。
- 如果组件接收的 **props** 比较复杂，可以提供一个 **自定义比较函数** 来优化判断。

## 参考答案

使用 `React.memo` 优化条件渲染，主要是通过减少不必要的渲染来提高组件的性能。

`React.memo` 是一个高阶组件，在组件的 **props** 没有变化时跳过渲染，从而避免不必要的 DOM 更新。

### **1. React.memo 的基本原理**
`React.memo` 是对函数组件的优化。当组件的 **props** 没有变化时，它会跳过该组件的渲染。通常情况下，React 会重新渲染组件，即使 **props** 没有改变，但通过 `React.memo`，我们可以控制这种行为。

### **2. 条件渲染的优化**
在 React 中，条件渲染通常是根据某些条件来判断是否显示某个组件，比如通过 `&&` 或 `if` 来控制组件的显示与隐藏：

```jsx
  return (
    <div>
      {shouldRender && <ExpensiveComponent />}
    </div>
  );
}
```

假设 `ExpensiveComponent` 是一个渲染非常消耗性能的组件，在条件渲染的场景下，我们可以通过 `React.memo` 来避免 `ExpensiveComponent` 的重复渲染，尤其是当 `shouldRender` 没有变化时。

#### **步骤 1：优化条件渲染**
我们可以对 `ExpensiveComponent` 使用 `React.memo` 来缓存它的渲染结果，只有当它的 **props** 发生变化时才重新渲染：

```jsx
  console.log('ExpensiveComponent rendered');
  return <div>{data}</div>;
});
```
然后，在父组件中做条件渲染时，`ExpensiveComponent` 会根据 **props** 是否变化来决定是否重新渲染：

```jsx
  return (
    <div>
      {shouldRender && <ExpensiveComponent data={data} />}
    </div>
  );
}
```
如果默认的浅比较不满足要求（即某些复杂的对象或深层嵌套的对象），我们可以传递一个自定义比较函数来决定是否更新组件：

```jsx
  function ExpensiveComponent({ data }) {
    console.log('ExpensiveComponent rendered');
    return <div>{data}</div>;
  },
  (prevProps, nextProps) => {
    // 自定义比较函数：只有当 data 发生变化时才重新渲染
    return prevProps.data === nextProps.data;
  }
);
```
- **避免不必要的重新渲染**：当父组件重新渲染，但子组件的 props 没有变化时，可以使用 `React.memo` 防止子组件的重新渲染。
- **条件渲染的场景**：当有复杂的组件或组件树需要根据某个条件渲染时，使用 `React.memo` 可以避免不必要的渲染。
