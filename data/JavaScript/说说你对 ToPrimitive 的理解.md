---
level: 1
---

# 说说你对 ToPrimitive 的理解

## 题目要点

`ToPrimitive` 是一个在 JavaScript 中用于将非原始值转换为原始值的内部操作。这个操作通常在以下情况下被隐式调用：

- 当一个对象需要被用作原始值时，比如在执行数学运算或字符串拼接时。
`ToPrimitive` 的转换过程如下：

1. **检查类型**：如果值已经是原始类型（字符串、数字或布尔值），则直接返回该值。
2. **对象转换**：
   - **valueOf() 方法**：首先尝试调用对象的 `valueOf()` 方法。如果 `valueOf()` 返回一个原始值，则直接使用这个值。
   - **toString() 方法**：如果 `valueOf()` 方法没有返回一个原始值，或者 `valueOf()` 方法不存在，那么接下来尝试调用 `toString()` 方法。如果 `toString()` 返回一个原始值，则使用这个值。
3. **异常抛出**：如果上述两个方法都没有返回一个原始值，则抛出 `TypeError` 异常。
此外，对象还可以定义一个特殊的 `Symbol.toPrimitive` 方法来自定义 `ToPrimitive` 转换的行为。这个方法接受一个字符串参数 `hint`，表示转换的期望类型，它可以是 `'number'`、`'string'` 或 `'default'`。

## 参考答案

ToPrimitive 是一个抽象操作，用于将一个值转换为原始值（primitive value），即字符串、数字或布尔值。

在 JavaScript 中，当需要将一个非原始值用作原始值时，会自动调用 `ToPrimitive` 操作。例如，在使用加法运算符时，如果其中一个操作数不是原始值，则会将其转换为原始值，这就是通过调用 `ToPrimitive` 来实现的。

ToPrimitive 操作的实现方式如下：

* 如果该值已经是原始类型，则直接返回该值。
* 如果该值是对象，则按照以下步骤进行转换：
	* 调用 valueOf() 方法并返回结果，如果结果是原始类型则直接返回该结果。
	* 调用 toString() 方法并返回结果，如果结果是原始类型则直接返回该结果。
* 如果都不是原始类型，则抛出 TypeError 异常。

示例：

```js
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
     }
   }
};

2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'
```
