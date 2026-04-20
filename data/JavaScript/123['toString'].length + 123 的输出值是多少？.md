---
level: 2
---

# 123['toString'].length + 123 的输出值是多少？

## 参考答案

## function的length

```js

function fn2 (name = '林三心') {}

function fn3 (name, age = 22) {}

function fn4 (name, age = 22, gender) {}

function fn5(name = '林三心', age, gender) { }

console.log(fn1.length) // 1
console.log(fn2.length) // 0
console.log(fn3.length) // 1
console.log(fn4.length) // 1
console.log(fn5.length) // 0
```

在函数的形参中，还有剩余参数这个东西，那如果具有剩余参数，会是怎么算呢？

```

console.log(fn1.length) // 1
```

所以，123['toString'].length + 123 = ?的答案是124

## 总结

length 是函数对象的一个属性值，指该函数有多少个必须要传入的参数，即形参的个数。形参的数量不包括剩余参数个数，仅包括第一个具有默认值之前的参数个数
