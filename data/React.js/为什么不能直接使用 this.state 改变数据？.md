---
level: 1
---

# 为什么不能直接使用 this.state 改变数据？

## 题目要点

在 React 中，不能直接使用 `this.state` 来改变组件的状态，是因为直接修改 `this.state` 会绕过 React 的状态管理机制，导致一些问题。

以下是具体原因：

### 1. **React 状态更新的原理**

- **状态不可变性**：React 通过 `this.setState()` 来更新状态，这种方式是设计上的要求，保证了状态管理的可预测性和一致性。
- **批量更新**：`this.setState()` 支持批量更新，React 会合并多个状态更新，优化性能，减少重新渲染的次数。如果直接修改 `this.state`，React 不会知道状态发生了变化，从而无法进行批量更新和性能优化。

### 2. **组件重新渲染**

- **触发更新**：`this.setState()` 会触发 React 重新渲染组件，从而更新用户界面。如果直接修改 `this.state`，React 不会检测到状态的变化，也就不会触发重新渲染，导致界面不更新。
- **通知机制**：`this.setState()` 会触发 React 的生命周期方法和更新过程，使组件与用户界面的变化保持同步。

### 3. **异步更新**

- **异步行为**：`this.setState()` 是异步的，这意味着 React 可能会批量处理多个状态更新以提高性能。直接修改 `this.state` 无法保证异步更新的正确性和顺序，可能导致不可预期的行为。

### 4. **维护一致性**

- **数据一致性**：通过 `this.setState()` 更新状态，React 会确保状态的变化被正确地记录和应用。直接修改 `this.state` 会绕过这种一致性检查，可能导致数据不一致和调试困难。

### **总结**

- **不可直接修改**：不能直接修改 `this.state`，应该使用 `this.setState()` 来更新状态。
- **状态管理**：`this.setState()` 确保了状态更新的可预测性、性能优化和一致性。
- **触发重新渲染**：`this.setState()` 能够触发组件重新渲染，保持界面与状态同步。

遵循 React 的状态管理机制，可以确保组件的状态和界面正确同步，并提高应用的稳定性和可维护性。

## 参考答案

react中不能直接修改state，因为并不会重新触发render。

以如下方式更新状态，组件不会重新渲染。

```react.js
//Wrong
This.state.message =”Hello world”;
```

```react.js
//Correct
This.setState({message: ‘Hello World’});
```
