---
level: 1.5
---

# Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？

## 题目要点

- **Promise 构造函数**：同步执行。在构造函数中传入的 `executor` 函数立即执行。
- **`then` 方法**：异步执行。`then` 方法的回调函数会在当前执行栈完成后，进入微任务队列执行。

这种设计确保了 `Promise` 的状态变更能够被正确地处理，并且 `then` 中的回调不会干扰到当前的同步执行流程。

## 参考答案

### **Promise 构造函数的执行**

**同步执行**：
- `Promise` 的构造函数（即 `new Promise(executor)`）是同步执行的。
- 当你创建一个新的 `Promise` 实例时，传递给构造函数的 `executor` 函数会立即同步执行。
- 在 `executor` 函数中调用 `resolve` 或 `reject` 也是同步的，直到 `executor` 函数执行完毕，`Promise` 的状态才会改变。

**示例**：
```javascript

const promise = new Promise((resolve, reject) => {
  console.log('Inside promise executor');
  resolve('Resolved value');
});

console.log('After promise creation');

promise.then(value => {
  console.log('Inside then');
  console.log(value);
});

console.log('End');
```
```
Inside promise executor
After promise creation
End
Inside then
Resolved value
```

**异步执行**：
- `then` 方法的回调函数（`onFulfilled` 和 `onRejected`）是异步执行的。它们会在当前执行栈清空后被执行，即微任务队列（Microtask Queue）中。
- 当 `Promise` 的状态变为 `fulfilled` 或 `rejected` 时，`then` 方法中注册的回调函数会被加入微任务队列，在当前脚本执行完后，事件循环会处理这些微任务。

**示例**：
```javascript

const promise = new Promise((resolve, reject) => {
  console.log('Inside promise executor');
  resolve('Resolved value');
});

console.log('After promise creation');

promise.then(value => {
  console.log('Inside then');
  console.log(value);
});

console.log('End');
```
```
Inside promise executor
After promise creation
End
Inside then
Resolved value
```
