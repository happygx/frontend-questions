---
level: 1
---

# js中如何判断一个值是否是数组类型？

## 参考答案

## instanceof

```js
arr instanceof Array; // true
```

```js
Array.isArray(arr) // true

const obj = {}
Array.isArray(obj) // false
```

使用Object的原型方法isPrototypeOf，判断两个对象的原型是否一样, isPrototypeOf() 方法用于测试一个对象是否存在于另一个对象的原型链上。

```js
Object.prototype.isPrototypeOf(arr, Array.prototype); // true
```

Object.getPrototypeOf() 方法返回指定对象的原型（内部[[Prototype]]属性的值）。

```js
Object.getPrototypeOf(arr) === Array.prototype // true
```

借用Object原型的call或者apply方法，调用toString()是否为[object Array]

```js
Object.prototype.toString.call(arr) === '[object Array]' // true

const obj = {}
Object.prototype.toString.call(obj) // "[object Object]"
```
