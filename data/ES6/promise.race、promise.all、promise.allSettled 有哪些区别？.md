---
level: 2
---

# promise.race、promise.all、promise.allSettled 有哪些区别？

## 题目要点

- **`Promise.all`**：等待所有 `Promise` 对象都成功，或第一个失败的 `Promise`。
- **`Promise.race`**：返回第一个解决或拒绝的 `Promise` 的结果。
- **`Promise.allSettled`**：等待所有 `Promise` 对象都完成，无论成功还是失败，返回每个 `Promise` 的状态和结果。

## 参考答案

`Promise.race`、`Promise.all` 和 `Promise.allSettled` 都是处理多个 `Promise` 对象的静态方法，它们的主要区别在于处理 `Promise` 的方式和返回结果。下面是这三者的详细比较：

### **1. `Promise.all`**

- **功能**：接受一个 `Promise` 对象的可迭代对象（通常是数组），并返回一个新的 `Promise` 对象。这个新的 `Promise` 对象在所有输入的 `Promise` 对象都成功时成功，并返回一个包含所有成功 `Promise` 结果的数组。如果其中任何一个 `Promise` 失败，则立即失败，并返回第一个失败的 `Promise` 的拒绝理由。
  
- **返回值**：一个 `Promise` 对象。成功时，返回一个数组，其中包含每个输入 `Promise` 对象的结果；失败时，返回第一个失败的 `Promise` 的拒绝原因。

- **使用示例**：
  ```javascript
  Promise.all([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
  ]).then(results => {
    console.log(results); // [1, 2, 3]
  }).catch(error => {
    console.error(error);
  });
  ```

### **2. `Promise.race`**

- **功能**：接受一个 `Promise` 对象的可迭代对象（通常是数组），并返回一个新的 `Promise` 对象。这个新的 `Promise` 对象将会在第一个输入的 `Promise` 对象解决或拒绝时解决或拒绝，而不管其他 `Promise` 对象的状态。

- **返回值**：一个 `Promise` 对象。它的状态由第一个解决或拒绝的 `Promise` 决定。

- **使用示例**：
  ```javascript
  Promise.race([
    new Promise((resolve) => setTimeout(resolve, 500, 'first')),
    new Promise((resolve) => setTimeout(resolve, 100, 'second'))
  ]).then(result => {
    console.log(result); // 'second' (因为它首先解决)
  });
  ```

### **3. `Promise.allSettled`**

- **功能**：接受一个 `Promise` 对象的可迭代对象（通常是数组），并返回一个新的 `Promise` 对象。这个新的 `Promise` 对象在所有输入的 `Promise` 对象都完成时解决（无论成功还是失败），并返回一个数组，其中每个元素是一个对象，描述了对应 `Promise` 对象的结果或拒绝原因。

- **返回值**：一个 `Promise` 对象。成功时，返回一个包含每个输入 `Promise` 对象的结果的数组，每个结果对象有两个属性：`status`（"fulfilled" 或 "rejected"）和 `value`（如果成功）或 `reason`（如果失败）。

- **使用示例**：
  ```javascript
  Promise.allSettled([
    Promise.resolve(1),
    Promise.reject(new Error('Failed')),
    Promise.resolve(3)
  ]).then(results => {
    console.log(results);
    /*
    [
      { status: 'fulfilled', value: 1 },
      { status: 'rejected', reason: Error('Failed') },
      { status: 'fulfilled', value: 3 }
    ]
    */
  });
  ```
