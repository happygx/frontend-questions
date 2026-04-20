---
level: 3
---

# async/await 原理， 手写 async 函数？

## 题目要点

- **`async/await`** 是 JavaScript 中处理异步操作的语法糖，使异步代码看起来更像同步代码。
- **`async` 函数** 总是返回一个 Promise，**`await`** 关键字用于等待 Promise 解析。
- **手写 `async` 函数** 需要模拟 Promise 的处理，并包装原函数以确保其返回 Promise 并处理错误。

## 参考答案

## async/await 的本质

async/await 是 ECMAScript 2017（ES8）中引入的一个语言特性，用于处理异步编程。async/await 实际上是对 Promise 的封装，通过让开发者以同步的方式编写异步代码，使得代码更加易读和易于维护。

async/await 是一种更加高级的异步编程方式，它使用了 Promise 作为底层实现，可以更好地处理异步编程中的错误和异常，避免了回调地狱和代码可读性差的问题。

## 手写 async/await 实现

async/await 的实现可以通过封装 Promise 和 Generator 函数来实现，下面是一个简单的手写实现示例：
```js
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function* generator() {
  console.log("start");
  yield delay(1000);
  console.log("after 1 second");
  yield delay(2000);
  console.log("after 2 more seconds");
}

function async(generatorFunc) {
  const iterator = generatorFunc();

  function handle(iteratorResult) {
    if (iteratorResult.done) {
      return Promise.resolve(iteratorResult.value);
    }

    return Promise.resolve(iteratorResult.value).then((res) => {
      return handle(iterator.next(res));
    });
  }

  return handle(iterator.next());
}

async(function () {
  return generator();
}).then(() => {
  console.log("all done");
});
```
