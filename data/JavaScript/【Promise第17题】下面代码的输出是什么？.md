---
level: 3
---

# 【Promise第17题】下面代码的输出是什么？

## 参考答案

## 解析

如果执行足够快的话，也可能两个都是1001。

Promise 的 .then 或者 .catch 可以被调用多次，但这里 Promise 构造函数只执行一次。或者说 promise 内部状态一经改变，并且有了一个值，那么后续每次调用 .then 或者 .catch 都会直接拿到该值。

## 结果

```
'success' 1001
'success' 1002
```
