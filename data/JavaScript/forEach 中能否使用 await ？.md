---
level: 3
---

# forEach 中能否使用 await ？

## 题目要点

在JavaScript中，forEach 方法用于对数组中的每个元素执行一次提供的函数。然而，forEach 方法本身并不支持异步操作，也就是说，它不能在内部使用 await 关键字。await 只能在异步函数（使用 async 声明的函数）中使用。

如果你需要在循环中执行异步操作并等待每个操作完成，你应该使用 for...of 循环或 Promise.all 结合 map 方法。

#### 使用 for...of 循环

```js
  for (const item of array) {
    await someAsyncFunction(item); // 等待异步函数完成
  }
}
```

如果你想要并行执行所有的异步操作，可以使用 map 方法来创建一个Promise数组，然后使用 Promise.all 等待它们全部完成。

```js
  const promises = array.map(item => someAsyncFunction(item)); // 创建Promise数组
  await Promise.all(promises); // 等待所有Promise完成
}
```

## 参考答案

```javascript
  let arr = [3, 2, 1];
  arr.forEach(async (item) => {
    const res = await fetch(item);
    console.log(res);
  });
  console.log("end");
}

function fetch(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(x);
    }, 500 * x);
  });
}

test();
```

```javascript
1
2
3
```

其实原因很简单，那就是 forEach 只支持同步代码。

我们可以参考下 Polyfill 版本的 forEach，简化以后类似就是这样的伪代码

```javascript
	callback(item, index)   //也就是我们传入的回调函数
}
```

## 怎么解决

一般来说解决的办法有2种：

* for...of

因为 for...of 内部处理的机制和 forEach 不同，forEach 是直接调用回调函数，for...of 是通过迭代器的方式去遍历。

```javascript
  let arr = [3, 2, 1];
  for (const item of arr) {
    const res = await fetch(item);
    console.log(res);
  }
  console.log("end");
}
```

```javascript
  let arr = [3, 2, 1];
  for (var i = 0; i < arr.length; i++) {
    const res = await fetch(arr[i]);
    console.log(res);
  }
  console.log("end");
}

function fetch(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(x);
    }, 500 * x);
  });
}

test();
```
