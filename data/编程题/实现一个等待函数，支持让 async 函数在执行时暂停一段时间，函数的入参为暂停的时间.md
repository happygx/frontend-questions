---
level: 2
---

# 实现一个等待函数，支持让 async 函数在执行时暂停一段时间，函数的入参为暂停的时间


## 参考答案

在使用 `async/await` 时，可以用 await 关键字等待一个 Promise 对象的结果，然后执行一些操作。在等待过程中，函数会暂停执行，直到 Promise 对象的状态发生改变。

下面是一个示例代码，其中定义了一个名为 wait 的等待函数，它可以让 async 函数在执行时暂停一段时间：

```js
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('start');
  await wait(2000); // 等待2秒钟
  console.log('end');
}

run();
```
