---
level: 3
---

# js对象中，可枚举性（enumerable）是什么？

## 参考答案

可枚举性（enumerable）用来控制所描述的属性，是否将被包括在for...in循环之中（除非属性名是一个Symbol）。具体来说，如果一个属性的enumerable为false，下面三个操作不会取到该属性。

* for..in循环
* Object.keys方法
* JSON.stringify方法

```javascript

o.c = 3;
Object.defineProperty(o, "d", {
  value: 4,
  enumerable: false,
});

o.d;
// 4

for (var key in o) console.log(o[key]);
// 1
// 2
// 3

Object.keys(o); // ["a", "b", "c"]

JSON.stringify(o); // => "{a:1,b:2,c:3}"
```

至于for...in循环和Object.keys方法的区别，在于前者包括对象继承自原型对象的属性，而后者只包括对象本身的属性。如果需要获取对象自身的所有属性，不管enumerable的值，可以使用Object.getOwnPropertyNames方法。

可枚举属性是指那些内部 “可枚举” 标志设置为 true 的属性。对于通过直接的赋值和属性初始化的属性，该标识值默认为即为 true。但是对于通过 Object.defineProperty 等定义的属性，该标识值默认为 false。
