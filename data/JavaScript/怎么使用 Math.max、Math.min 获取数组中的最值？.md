---
level: 1
---

# 怎么使用 Math.max、Math.min 获取数组中的最值？

## 参考答案

`Math.min()`和`Math.max()`用法比较类似：

> console.log(Math.min(1, 5, 2, 7, 3)); // 输出：1

但它们不接受数组作为参数。

如果想使用数组作为参数，有以下两个方法：

* apply

```js
console.log(Math.min.apply(null, arr)); // 输出：1
```

```js

const maxVal = Math.max(...arr); // 获取数组中的最大值
```
