---
level: 3
---

# 如何让Promise.all在抛出异常后依然有效

## 题目要点

在处理多个并发请求时，`Promise.all()` 方法可以同时等待所有传入的 `Promise` 对象完成。当所有 `Promise` 都已经完成或者第一个失败的 `Promise` 被拒绝时，它会返回一个完成状态的 `Promise`，并返回一个包含所有成功结果的数组。

然而，如果 `Promise.all()` 中的任何一个 `Promise` 被拒绝，那么整个 `Promise.all()` 操作会立即被拒绝，并且不会返回任何成功的结果。这意味着如果其中一个 `Promise` 失败，其他成功的 `Promise` 的结果也会被丢弃。

为了在 `Promise.all()` 中抛出异常后依然能够获取其他成功的 `Promise` 的结果，我们可以采取以下两种方案：

#### 方案一：使用 `map` 方法处理每个 `Promise`

在 `Promise.all()` 队列中，我们使用 `map` 方法对每个 `Promise` 进行处理。如果任何一个 `Promise` 失败，我们返回一个特定的值，以确保整个 `Promise.all()` 能够正常执行并走到 `.then()` 中。

#### 方案二：使用 `Promise.allSettled` 替代 `Promise.all()`

另一个解决方案是使用 `Promise.allSettled()` 方法。这个方法会返回一个新的 `Promise`，它在所有给定的 `Promise` 已经被解析或被拒绝后解析。每个对象都描述了每个 `Promise` 的结果。

## 参考答案

在处理多个并发请求时，我们一般会用`Promise.all()`方法。

该方法指当所有在可迭代参数中的 `promises` 已完成，或者第一个传递的 promise（指 reject）失败时，返回 promise。

但是当其中任何一个被拒绝的话。`Promise.all([..])`就会立即被拒绝，并丢弃来自其他所有promis的全部结果。

也就是说，`promise.all` 中任何一个 `promise` 出现错误的时候都会执行reject，导致其它正常返回的数据也无法使用。

如何让Promise.all在抛出异常后依然有效呢？

# 方案一

在promise.all队列中，使用map每一个过滤每一个promise任务，其中任意一个报错后，return一个返回值，确保promise能正常执行走到.then中。

```js
	resolve('p1');
});
var p2 = new Promise((resolve, reject) => {
	resolve('p2');
});
var p3 = new Promise((resolve, reject) => {
	reject('p3');
});
Promise.all([p1, p2, p3].map(p => p.catch(e => '出错后返回的值' )))
  .then(values => {
    console.log(values);
  }).catch(err => {
    console.log(err);
  })
```

使用 `Promise.allSettled` 替代 `Promise.all()`。

> `Promise.allSettled()`方法返回一个promise，该promise在所有给定的promise已被解析或被拒绝后解析，并且每个对象都描述每个promise的结果。
