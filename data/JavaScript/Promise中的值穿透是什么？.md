---
level: 3.5
---

# Promise中的值穿透是什么？

## 参考答案

解释：.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。

当then中传入的不是函数，则这个then返回的promise的data，将会保存上一个的promise.data。这就是发生值穿透的原因。而且每一个无效的then所返回的promise的状态都为resolved。

```javascript
      .then(2) // 注意这里
      .then(Promise.resolve(3))
      .then(console.log)
```
