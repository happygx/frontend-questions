---
level: 3
---

# 手写实现 Promise.allSettled

## 参考答案

手写实现 `Promise.allSettled` 方法，涉及创建一个新的 `Promise` 对象，该对象在所有输入的 `Promise` 对象都完成（无论成功还是失败）时解决，并返回每个 `Promise` 对象的状态和结果。

### **实现步骤**

1. **接收输入**：接受一个 `Promise` 对象的可迭代对象（通常是数组）。
2. **初始化**：创建一个新的 `Promise` 对象，用于最终的结果。
3. **处理每个 `Promise`**：遍历输入的 `Promise` 对象，处理每个 `Promise` 的状态（成功或失败）。
4. **收集结果**：将每个 `Promise` 对象的状态和结果收集到一个数组中。
5. **完成处理**：在所有 `Promise` 对象都完成后，返回结果数组。

### **实现代码**

```javascript
  return new Promise((resolve) => {
    // 结果数组
    const results = [];
    let completedCount = 0;

    // 遍历每个 Promise
    promises.forEach((promise, index) => {
      // 确保 promise 是一个 Promise 对象
      Promise.resolve(promise).then(
        (value) => {
          results[index] = { status: 'fulfilled', value };
        },
        (reason) => {
          results[index] = { status: 'rejected', reason };
        }
      ).finally(() => {
        // 记录已完成的 Promise 数量
        completedCount++;
        // 如果所有 Promise 都完成了
        if (completedCount === promises.length) {
          resolve(results);
        }
      });
    });
  });
}

// 示例用法
const p1 = Promise.resolve(1);
const p2 = Promise.reject(new Error('Failed'));
const p3 = new Promise((resolve) => setTimeout(resolve, 100, 3));

promiseAllSettled([p1, p2, p3]).then(results => {
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

1. **接收和处理**：
   - 使用 `Promise.resolve(promise)` 确保每个输入都是 `Promise` 对象，方便处理非 `Promise` 对象。
   - 在每个 `Promise` 成功时，将 `{ status: 'fulfilled', value }` 记录到结果数组中。
   - 在每个 `Promise` 失败时，将 `{ status: 'rejected', reason }` 记录到结果数组中。

2. **最终处理**：
   - 使用 `finally()` 方法确保无论 `Promise` 成功还是失败，最终都能够执行并检查是否所有 `Promise` 对象都完成。
   - 当所有 `Promise` 对象都完成时，调用 `resolve(results)` 传递结果数组。

这种实现方法确保了处理所有 `Promise` 对象，无论它们的结果如何，并在所有 `Promise` 完成后提供最终结果。
