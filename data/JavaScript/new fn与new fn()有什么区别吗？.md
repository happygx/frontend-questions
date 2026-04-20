---
level: 1
---

# new fn与new fn()有什么区别吗？

## 题目要点

1. **带括号的情况**：
   - `new Parent()`：这是最常见的用法。调用 `Parent` 构造函数并返回一个新的 `Parent` 实例。
   - `new Parent().num`：这首先调用 `Parent` 构造函数，返回一个 `Parent` 实例，然后访问这个实例的 `num` 属性。

2. **不带括号的情况**：
   - `new Parent`：这在大多数情况下是有效的，因为 JavaScript 的解析器会将 `new Parent` 视为 `new (Parent())`。也就是说，它首先调用 `Parent` 函数（不带参数），然后使用返回的结果作为构造函数来创建新实例。
   - `new Parent` 和 `new Parent()` 通常在行为上是一致的，但具体取决于构造函数的实现。

3. **错误用法**：
   - `new Parent.num`：这是一个错误用法。这里的问题是 `Parent.num` 首先被解析，如果 `Parent` 上没有 `num` 属性，就会返回 `undefined`。然后 `new` 操作符尝试使用 `undefined` 作为构造函数，这将导致错误。

4. **优先级问题**：
   - `new Parent().num` 和 `(new Parent()).num` 是等价的，都是先创建 `Parent` 实例，然后访问其 `num` 属性。
   - `new Parent.num` 实际上是 `new (Parent.num)`，因为 `Parent.num` 首先被解析，然后 `new` 操作符尝试使用这个结果作为构造函数。

## 参考答案

用 `new` 创建构造函数的实例时，通常情况下 `new` 的构造函数后面需要带括号（譬如：`new Parent()`）。

有些情况下`new`的构造函数后带括号和不带括号的情况一致，譬如：

```js
  this.num = 1;
}
console.log(new Parent());//输出Parent对象：{num:1}
console.log(new Parent);//输出Parent对象：{num:1}
```

```js
  this.num = 1;
}
console.log(new Parent().num);//1
console.log(new Parent.num);//报错
```

从报错信息来看，`new Parent.num`执行顺序是这样的：先执行`Parent.num`，此时返回结果为`undefined`；后执行`new`，因`new`后面必须跟构造函数，所以`new undefined`会报错。

`new Parent().num`相当于`(new Parent()).num`，所以结果返回1。

从结果来看，`new Parent.num`代码相当于`new (Parent.num)；`，`new Parent().num`相当于`(new Parent()).num`。由此看来 `new` 的构造函数后跟括号优先级会提升。
