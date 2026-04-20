---
level: 2
---

# 在 shouldComponentUpdate 或 componentWillUpdate 中使用 setState 会发生什么？

## 题目要点

在 `shouldComponentUpdate` 或 `componentWillUpdate` 中使用 `setState` 会导致一些潜在的问题：

### `shouldComponentUpdate` 中使用 `setState`

- **问题**：`shouldComponentUpdate` 用于决定组件是否应该更新。如果在这个方法中调用 `setState`，会导致组件重新渲染，从而触发 `shouldComponentUpdate` 再次被调用。这样会导致无限循环，因为每次调用 `setState` 都会触发重新渲染和 `shouldComponentUpdate` 调用。

### `componentWillUpdate` 中使用 `setState`

- **问题**：`componentWillUpdate` 是在组件更新之前调用的。如果在这个生命周期方法中调用 `setState`，会导致组件在更新阶段再次调用 `componentWillUpdate`。这会导致额外的渲染和不必要的更新，可能会引发性能问题或意外的行为。

### 总结

- **`shouldComponentUpdate`**：在这个方法中调用 `setState` 会导致无限更新循环。
- **`componentWillUpdate`**：在这个方法中调用 `setState` 会触发额外的渲染，可能影响性能。

通常，应避免在这些生命周期方法中调用 `setState`，并将状态更新逻辑放在 `componentDidUpdate` 中，以确保更新在组件完成渲染后进行。

## 参考答案

当调用 setState 的时候，实际上会将新的 state 合并到状态更新队列中，并对 partialState 以及 _pendingStateQueue 更新队列进行合并操作。最终通过 enqueueUpdate 执行 state 更新。

如果在 shouldComponentUpdate 或 componentWillUpdate 中使用 setState，会使得 state 队列（_pendingStateQueue）不为 null，从而调用 updateComponent 方法，updateComponent 中会继续调用 shouldComponentUpdate 和 componentWillUpdate，因此造成死循环。
