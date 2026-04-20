---
level: 1.5
---

# js 对象可以使用 for...of 迭代吗？

## 题目要点

普通的 JavaScript 对象（`{}`）默认不支持 `for...of` 迭代。如果你需要使对象可迭代，你可以通过实现 `Symbol.iterator` 方法来创建自定义的迭代器。对于简单的对象键值对的迭代，可以使用 `Object.keys()`, `Object.values()`, 和 `Object.entries()` 方法。

## 参考答案

JavaScript **对象本身并不能直接使用 for...of 迭代**，因为它并不是一个可迭代对象（iterable）。

但是，如果我们想要遍历对象的属性，可以使用 for...in 循环，例如：
```js
  name: 'John',
  age: 30,
  city: 'New York'
};

for (let prop in obj) {
  console.log(prop + ': ' + obj[prop]);
}

// 这段代码可以输出：
name: John
age: 30
city: New York
```
```js
  name: 'John',
  age: 30,
  city: 'New York'
};

for (let prop in obj) {
  if (obj.hasOwnProperty(prop)) {
    console.log(prop + ': ' + obj[prop]);
  }
}
```
