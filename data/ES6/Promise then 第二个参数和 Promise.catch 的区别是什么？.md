---
level: 2
---

# Promise then 第二个参数和 Promise.catch 的区别是什么?

## 题目要点

- **功能**：`then` 的第二个参数和 `catch` 都用于处理拒绝的情况，但 `catch` 更专注于处理错误，通常用在链式调用中来捕获和处理所有错误。
- **链式调用**：`catch` 更常用在链式调用中，能够捕获前面 `then` 链中的任何错误，而 `then` 的第二个参数只能处理 `then` 本身的错误。
- **可读性**：`catch` 提高了代码的可读性，使得错误处理逻辑更加集中，特别是在处理多个链式操作时。

## 参考答案

`Promise.then` 的第二个参数和 `Promise.catch` 都用于处理 Promise 的拒绝（rejected）情况，但它们的使用方式和作用有所不同。以下是它们的区别：

### **1. `Promise.then` 的第二个参数**

- **作用**：用于处理 Promise 被拒绝（rejected）时的情况。
- **用法**：
  ```javascript
  promise.then(onFulfilled, onRejected);
  ```
  - `onFulfilled`：可选的回调函数，Promise 被解决（fulfilled）时调用。
  - `onRejected`：可选的回调函数，Promise 被拒绝（rejected）时调用。

- **示例**：
  ```javascript
  new Promise((resolve, reject) => reject('Error'))
    .then(
      value => console.log('Fulfilled:', value),
      error => console.log('Rejected:', error) // 处理拒绝的情况
    );
  ```

- **特点**：`then` 方法接收两个参数，第一个是成功回调，第二个是失败回调。只有当 `then` 的第一个参数不为 `undefined` 时，第二个参数才会被触发。

### **2. `Promise.catch`**

- **作用**：专门用于处理 Promise 被拒绝（rejected）时的情况。
- **用法**：
  ```javascript
  promise.catch(onRejected);
  ```
  - `onRejected`：回调函数，当 Promise 被拒绝时调用。

- **示例**：
  ```javascript
  new Promise((resolve, reject) => reject('Error'))
    .catch(error => console.log('Caught Error:', error)); // 处理拒绝的情况
  ```

- **特点**：`catch` 方法是 `then` 方法的语法糖，专门用于处理拒绝的情况。它可以与 `then` 链式调用配合使用，使得代码更加清晰和符合逻辑。
