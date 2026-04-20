---
level: 1
---

# 请对以下数组，根据 `born` 的值降序排列

## 参考答案

`Array.prototype.sort()` 方法用原地算法对数组的元素进行排序，并返回数组。在很多排序场景下推荐使用。

语法： 

> arr.sort([compareFunction])

这道题在实现上也比较简单，我们直接看实现方法：

```js
  return a.born < b.born ? 1: -1 
}

singers.sort(compare);

// 也可以进行简写
singers.sort((a,b) => b.born - a.born)

```
