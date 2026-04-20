---
level: 3
---

#  Promise中，resolve后面的语句是否还会执行？

## 题目要点

会被执行。如果不需要执行，可以在 resolve 语句前加上 return。

## 参考答案

在 JavaScript 中，当调用 `Promise.resolve(value)` 后，Promise 会立即变成已解决状态（fulfilled），`value` 会作为结果传递。但`resolve` 后面的语句会继续执行，因为 `resolve` 只是将 Promise 的状态更改为已解决，它不会中断或停止代码的执行。

以下是一个例子：

```javascript
  console.log("Promise started");
  resolve("Resolved value");
  console.log("After resolve");
}).then(value => {
  console.log(value);
});
```

```
After resolve
Resolved value
```
