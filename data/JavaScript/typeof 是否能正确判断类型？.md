---
level: 2
---

# typeof 是否能正确判断类型？

## 题目要点

`typeof` 是 JavaScript 中用于返回一个值的数据类型的一元操作符。它对于基本数据类型的判断通常是准确的，但在某些情况下可能不会返回你期望的结果。

### 基本数据类型的判断

```javascript
typeof 42;         // "number"
typeof "Hello";     // "string"
typeof true;       // "boolean"
typeof null;       // "object" —— 这是一个常见的陷阱
typeof Symbol();   // "symbol"
```

```js
typeof [];            // "object" —— 数组是对象的一种类型
typeof new Date();    // "object" —— Date 对象是对象的一种类型
typeof function() {}; // "function" —— 函数在 JavaScript 中被归类为对象
```

- null 的问题：typeof null 返回 "object"，因为 null 被视为一个空的对象引用。
- 函数问题：尽管函数是对象，typeof 会返回 "function"。
不能区分对象类型：typeof 无法区分数组、日期对象、自定义对象等，因为它们都被归类为 "object"。
- 不同上下文的对象：来自 iframe 或服务端动态加载的脚本创建的对象可能无法被 typeof 正确判断。
- 未定义的变量：对未声明的变量使用 typeof 会导致 ReferenceError。

### 总结

typeof 可以正确判断基本数据类型，但在处理复杂对象时可能有限制。如果需要更细致的类型检查，可以使用 instanceof 操作符或 Object.prototype.toString.call() 方法。

```js
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true

// 使用 Object.prototype.toString.call 检查对象的具体类型
console.log(Object.prototype.toString.call(new Date())); // "[object Date]"
console.log(Object.prototype.toString.call(function(){})); // "[object Function]"
```

## 参考答案

对于原始类型来说，除了 null 都可以调用typeof显示正确的类型。

```js
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'

```



```js
typeof {} // 'object'
typeof console.log // 'function'

```



```js
const p1 = new Person()
p1 instanceof Person // true
var str1 = 'hello world'
str1 instanceof String // false
var str2 = new String('hello world')
str2 instanceof String // true

```
