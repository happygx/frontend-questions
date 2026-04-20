---
level: 3
---

# Promise.all 和 Promise.allSettled 有什么区别？

## 题目要点

### Promise.all

- **作用**：当所有给定的Promise都被解决时，`Promise.all` 返回一个包含所有解决值的数组。如果任何一个Promise被拒绝，则返回的Promise将被拒绝，并传递给拒绝原因。
- **示例**：

  ```javascript
  Promise.all([promise1, promise2, promise3]).then(values => {
    // values 是解决值数组
  }).catch(reason => {
    // reason 是第一个被拒绝的Promise的原因
  });
  ```

### Promise.allSettled

- **作用**：当所有给定的Promise都被解决或拒绝时，`Promise.allSettled` 返回一个包含每个Promise结果的数组。每个结果都是一个对象，其中包含 `status`（解决或拒绝的状态）和 `value`（如果解决，则是解决值；如果拒绝，则是拒绝原因）。
- **示例**：

  ```javascript
  Promise.allSettled([promise1, promise2, promise3]).then(results => {
    // results 是一个包含每个Promise结果的对象数组
  }).catch(reason => {
    // 不会被调用，因为所有Promise都已经被解决或拒绝
  });
  ```

### 区别

1. **结果类型**：`Promise.all` 返回一个数组，其中包含所有Promise的解决值。`Promise.allSettled` 返回一个数组，其中包含每个Promise的结果对象。
2. **处理拒绝**：`Promise.all` 会在任何Promise被拒绝时立即拒绝，而`Promise.allSettled` 会等待所有Promise都解决或拒绝后才返回结果。
3. **适用场景**：`Promise.all` 适用于你关心所有Promise是否解决的情况。`Promise.allSettled` 适用于你只关心所有Promise是否都解决或拒绝，而不关心解决值或拒绝原因的情况。

## 参考答案

一句话概括`Promise.allSettled`和`Promise.all`的最大不同：`Promise.allSettled`永远不会被**reject**。

## Promise.all的痛点

当需要处理多个Promise并行时，大多数情况下Promise.all用起来是非常顺手的，比如下面这样

```js

const promises = [
  delay(100).then(() => 1),
  delay(200).then(() => 2),
  ]

Promise.all(promises).then(values=>console.log(values))
// 最终输出： [1, 2]
```

```js
  delay(100).then(() => 1),
  delay(200).then(() => 2),
  Promise.reject(3)
  ]

Promise.all(promises).then(values=>console.log(values))
// 最终输出： Uncaught (in promise) 3

Promise.all(promises)
.then(values=>console.log(values))
.catch(err=>console.log(err))
// 加入catch语句后，最终输出：3
```

要么全部成功，要么全部重来，这是Promise.all本身的强硬逻辑，也是痛点的来源，不能说它错，但这的确给Promise.allSettled留下了立足的空间。

## Promise.allSettled

假如使用Promise.allSettled来处理这段逻辑会怎样呢?

```js
  delay(100).then(() => 1),
  delay(200).then(() => 2),
  Promise.reject(3)
  ]

Promise.allSettled(promises).then(values=>console.log(values))
// 最终输出： 
//    [
//      {status: "fulfilled", value: 1},
//      {status: "fulfilled", value: 2},
//      {status: "rejected", value: 3},
//    ]
```

因此，当用Promise.allSettled时，我们只需专注在then语句里，当有promise被异常打断时，我们依然能妥善处理那些已经成功了的promise，不必全部重来。
