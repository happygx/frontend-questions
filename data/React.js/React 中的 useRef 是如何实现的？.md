---
level: 3.5
---

# React 中的 useRef 是如何实现的？

## 题目要点

* `useRef` 返回一个 `{ current }` 对象，这个对象在组件生命周期内地址不变；
* React 会在 Fiber 节点上挂载 Hook 链表，`useRef` 的值通过 `memoizedState` 保留；
* 修改 `current` 不会引起组件更新，因为没有触发调度流程；
* 既可用于获取 DOM，也适用于存放任意可变值，常用于记录中间状态或缓存值；
* 核心价值在于“持久 + 不引发更新”。

## 参考答案

`useRef` 是 React 提供的一个 Hook，用于创建一个**可变的引用对象**，这个对象在组件整个生命周期内保持**稳定不变的引用地址**。理解 `useRef` 的实现，可以从其运行原理、React 内部的 Hook 数据结构、以及调用时机三个角度来展开。

### 一、表面行为理解

调用：

```tsx
```

```ts
```

* `myRef.current` 可以读写；
* 修改 `current` 不会引起组件重新渲染；
* 函数组件每次执行时返回的 `myRef` 是同一个对象（引用地址不变）；
* 可用于访问 DOM，也可作为任意可变容器（如缓存、标志位等）。

### 二、React 内部实现原理

React 在执行函数组件时，会记录当前的 **Fiber 节点** 以及该组件下每个 Hook 的数据。

在 `useRef` 中，其内部调用类似于：

```ts
  const hook = mountWorkInProgressHook(); // 挂载阶段：创建 hook 节点
  const ref = { current: initialValue };
  hook.memoizedState = ref;
  return ref;
}
```

```ts
  const hook = updateWorkInProgressHook(); // 更新阶段：复用上次的 hook 节点
  return hook.memoizedState; // 返回上次存下来的 ref 对象
}
```

因此 `useRef` 实际上就是在当前 Fiber 节点的 Hook 链表中存储了一个对象，整个组件生命周期中都能访问这个对象，并且不会因为组件重新执行而被替换引用。

### 三、为什么 useRef 不会引发重新渲染？

因为：

* `useRef` 返回的是一个普通对象（非 Proxy、非响应式）；
* React 不会监听 `ref.current` 的变动，也不会将它作为更新触发源；
* 修改 `current` 时只是改变了对象的属性值，并不会触发状态系统或视图更新。

这与 `useState` 的行为不同，后者内部是通过 `dispatchSetState` 来触发调度。

因此 `useRef` 更适合作为“组件外的静态存储空间”，如：

* 存储定时器 ID、上一次的值；
* 持久化某个 mutable 值；
* 持有一个 DOM 元素的引用。


### 四、结合 DOM 使用时发生了什么？

```tsx

useEffect(() => {
  inputRef.current.focus();
}, []);
```

* React 的 `ref` 属性在内部会将 DOM 节点挂载到 `.current`；
* 对于 `useRef` 返回的对象，它天然就具有 `current` 字段，正好作为容器使用。

这个绑定行为是 React 内部的 `attachRef` 逻辑完成的，不是 `useRef` 本身做的。
