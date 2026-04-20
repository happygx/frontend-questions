---
level: 1
---

# 说说你对 new.target 的理解


## 题目要点

`new.target` 属性是 JavaScript 中一个特殊的属性，它用于检测函数或构造函数是否是通过 `new` 运算符被调用的。这个属性在通过 `new` 运算符初始化的函数或构造方法中，会返回一个指向构造方法或函数的引用。如果函数不是通过 `new` 运算符被调用的，`new.target` 的值将是 `undefined`。

利用 `new.target`，我们可以编写代码来检查一个函数是否作为构造函数被 `new` 调用，从而确保函数的调用方式符合预期。

## 参考答案

`new.target` 属性是 JavaScript 中一个特殊的属性，它用于检测函数或构造函数是否是通过 `new` 运算符被调用的。这个属性在通过 `new` 运算符初始化的函数或构造方法中，会返回一个指向构造方法或函数的引用。如果函数不是通过 `new` 运算符被调用的，`new.target` 的值将是 `undefined`。
利用 `new.target`，我们可以编写代码来检查一个函数是否作为构造函数被 `new` 调用，从而确保函数的调用方式符合预期。例如，如果我们有一个函数，它应该总是作为构造函数被调用，那么我们可以在函数体内部使用 `new.target` 来抛出一个错误，如果它没有被以正确的方式调用。
```javascript
  if (!new.target) {
    throw new Error("Foo() must be called with new");
  }
  console.log("Foo instantiated with new");
}
// 如果直接调用函数，会抛出错误
try {
  Foo();
} catch (error) {
  console.log(error.message); // 输出: Foo() must be called with new
}
// 如果使用 new 运算符调用函数，则不会抛出错误
try {
  new Foo();
} catch (error) {
  console.log(error.message); // 不会抛出错误
}
```
