---
level: 2
---

# a == 1 && a == 2 && a == 3 可能为 true 吗？

## 参考答案

## 第一种方案

把 `a` 定义为一个对象，通过重写toString方法。根据规则，== 左边为对象类型，右边为Number，在比较时会调用 `a` 的toString方法，所以每次调用时都将返回值加1。

```js
    value: 1,
    toString: function () {
        return a.value++
    }
}
console.log(a == 1 && a == 2 && a == 3) // true
```

用相同的方法重写valueOf方法。
