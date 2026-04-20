---
level: 2
---

# process.nextTick, setTimeout 以及 setImmediate 三者的执行顺序？

## 题目要点

1. **`process.nextTick`**：在当前操作完成后、事件循环的下一轮开始前立即执行，优先级最高。
2. **`setTimeout`**：在指定的延迟时间后执行，但可能会延迟到下一轮事件循环。
3. **`setImmediate`**：在当前事件循环的 `poll` 阶段结束后执行，优先级低于 `process.nextTick` 但高于 `setTimeout`（对于 0 延迟的 `setTimeout`）。

## 参考答案

在 Node.js 中，`process.nextTick`、`setTimeout` 和 `setImmediate` 是三种用于在事件循环的不同阶段执行回调函数的方法。它们的执行顺序遵循特定的规则，这取决于事件循环的阶段。以下是这三者的执行顺序和细节：

### **1. `process.nextTick`**

- **描述**：`process.nextTick` 的回调函数会在当前操作完成后、事件循环的下一轮开始前立即执行。
- **执行时机**：在当前执行栈中的所有代码运行完后，`process.nextTick` 队列中的回调函数会被执行。它的优先级高于 `setTimeout` 和 `setImmediate`。

### **2. `setTimeout`**

- **描述**：`setTimeout` 用于设置一个定时器，在指定的延迟时间后执行回调函数。
- **执行时机**：`setTimeout` 的回调函数在指定的延迟时间后执行，具体的执行时间取决于事件循环的空闲状态和系统定时器的精度。即使延迟时间是 0，`setTimeout` 也不会立即执行，而是会等到当前操作结束并进入下一轮事件循环后执行。

### **3. `setImmediate`**

- **描述**：`setImmediate` 用于在当前事件循环的剩余部分执行回调函数。它在 I/O 事件之后执行回调。
- **执行时机**：`setImmediate` 的回调函数会在当前事件循环的所有 `poll` 阶段处理完成后执行。如果在事件循环的 `poll` 阶段没有其他 I/O 事件，它会尽快执行。

### **执行顺序示例**

```javascript

process.nextTick(() => {
  console.log('process.nextTick');
});

setTimeout(() => {
  console.log('setTimeout');
}, 0);

setImmediate(() => {
  console.log('setImmediate');
});

console.log('End');
```

1. **`Start`** - `console.log` 执行
2. **`End`** - `console.log` 执行
3. **`process.nextTick`** - `process.nextTick` 回调执行
4. **`setTimeout`** - `setTimeout` 回调执行
5. **`setImmediate`** - `setImmediate` 回调执行
