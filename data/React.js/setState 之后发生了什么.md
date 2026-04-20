---
level: 3
---

# setState 之后发生了什么


## 题目要点

当调用 `setState` 时，React 会经历以下几个步骤：

### 1. **更新队列**

- **状态更新**：`setState` 将更新请求放入更新队列中。此时，React 会合并新的状态与当前状态，创建一个新的状态对象。

### 2. **重新渲染**

- **标记更新**：React 将标记需要重新渲染的组件。组件的 `render` 方法会在下一次重新渲染周期中被调用，以便生成新的虚拟 DOM。

### 3. **虚拟 DOM 比较（Diffing）**

- **生成虚拟 DOM**：组件的 `render` 方法生成新的虚拟 DOM 树。
- **比较虚拟 DOM**：React 使用 diff 算法比较新的虚拟 DOM 树和旧的虚拟 DOM 树，找出差异。

### 4. **更新实际 DOM**

- **计算差异**：根据 diff 算法计算出最小的差异（补丁）。
- **批量更新**：将这些差异批量应用到实际 DOM 上，以优化性能并减少重绘次数。

### 5. **生命周期方法**

- **触发生命周期方法**：
  - **类组件**：`componentDidUpdate` 方法在组件更新后被调用，可以在这个方法中执行副作用。
  - **函数组件**：`useEffect` 钩子中的副作用会在组件更新后执行。

### 6. **回调函数**

- **执行回调**：如果 `setState` 调用时传递了回调函数（第二个参数），它将在组件更新并重新渲染完成后执行。

### 总结

1. **更新队列**：将状态更新请求放入队列。
2. **重新渲染**：标记组件需要重新渲染，生成新的虚拟 DOM。
3. **虚拟 DOM 比较**：计算新旧虚拟 DOM 之间的差异。
4. **更新实际 DOM**：应用差异，更新实际 DOM。
5. **生命周期方法**：触发相关生命周期方法或副作用。
6. **回调函数**：执行传递给 `setState` 的回调函数。

这个过程确保了 React 能够高效地更新 UI，同时保持组件状态的一致性。

## 参考答案

**简单版本**： React 利用状态队列机制实现了 setState 的“异步”更新，避免频繁的重复更新 state。

首先将新的 state 合并到状态更新队列中，然后根据更新队列和 shouldComponentUpdate 的状态来判断是否需要更新组件。

**复杂版本**：

* enqueueSetState 将 state 放入队列中，并调用 enqueueUpdate 处理要更新的 Component
* 如果组件当前正处于 update 事务中，则先将 Component 存入 dirtyComponent 中。否则调用batchedUpdates 处理。
* batchedUpdates 发起一次 transaction.perform() 事务
* 开始执行事务初始化，运行，结束三个阶段
	* 初始化：事务初始化阶段没有注册方法，故无方法要执行
	* 运行：执行 setSate 时传入的 callback 方法
	* 结束：更新 isBatchingUpdates 为 false，并执行 FLUSH_BATCHED_UPDATES 这个 wrapper 中的close方法，FLUSH_BATCHED_UPDATES在close阶段，会循环遍历所有的 dirtyComponents，调用updateComponent 刷新组件，并执行它的 pendingCallbacks, 也就是 setState 中设置的 callback。
