---
level: 2
---

# Promise then 第二个参数和catch的区别是什么？

## 题目要点

Promise 的 `then` 方法和 `catch` 方法都是用来处理 Promise 在变为 `rejected` 状态时的错误情况。以下是它们之间的区别和使用方式：

1. **then 方法的第二个参数**：
   - 当 Promise 被拒绝（rejected）时，`then` 方法的第二个参数，即错误处理函数，会被调用。
   - 这个错误处理函数接收一个参数，即 Promise 被拒绝时返回的错误信息。
   - 需要在每次调用 `then` 方法时提供第二个参数，以便处理可能出现的错误。

2. **catch 方法**：
   - `catch` 方法用于捕获 Promise 被拒绝时的错误，与 `then` 方法的第二个参数功能相同。
   - `catch` 方法可以链式调用，不需要在每次调用 `then` 方法时都传递错误处理函数。

## 参考答案

Promise 的 then 方法和 catch 方法都是用于处理 Promise 的 rejected 状态的情况。它们的区别在于：

1. then 方法的第二个参数

如果 Promise 的状态变为 rejected，then 方法的第二个参数会被调用。该参数是一个函数，可以接收一个参数，即 Promise 返回的错误信息。

例如：

```js
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Something went wrong'));
    }, 1000);
  });
}

asyncFunction()
  .then(
    result => console.log(result), 
    error => console.error(error)
  );
```

2. catch 方法

catch 方法相当于 then 方法的第二个参数，也是用于处理 Promise 的 rejected 状态的情况。不同之处在于，catch 方法可以链式调用，而不需要在每次调用 then 方法时都传递第二个参数。

例如：

```js
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Something went wrong'));
    }, 1000);
  });
}

asyncFunction()
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

因此，then 方法的第二个参数和 catch 方法都是用于处理 Promise 的 rejected 状态的情况，但前者需要在每次调用 then 方法时都传递第二个参数，而后者则可以链式调用。
