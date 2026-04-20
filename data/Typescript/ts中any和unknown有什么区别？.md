---
level: 2
---

# ts中any和unknown有什么区别？

## 题目要点

**作答思路：**

在TypeScript中，`any`和`unknown`都是用来表示可以被赋值给任意类型的类型。它们的主要区别在于：

1. **`any`**：
   - 允许你将任何类型赋值给`any`类型的变量。
   - 在编译时，不会对`any`类型进行类型检查。
   - 可以通过类型断言将`any`类型指定为一个更具体的类型。
2. **`unknown`**：
   - 允许你将任何类型赋值给`unknown`类型的变量。
   - 在编译时，会进行类型检查。
   - 不能通过类型断言将`unknown`类型指定为一个更具体的类型，需要使用类型保护（Type Guard）来验证类型。

**考察要点**：

1. **类型定义**：理解`any`和`unknown`类型的定义和用法。
2. **编译时检查**：理解在编译时，`any`和`unknown`类型的类型检查差异。
3. **类型断言和保护**：理解如何使用类型断言和类型保护来处理`any`和`unknown`类型的变量。

## 参考答案

unknown 和 any 的主要区别是 unknown 类型会更加严格：在对 unknown 类型的值执行大多数操作之前，我们必须进行某种形式的检查。而在对 any 类型的值执行操作之前，我们不必进行任何检查。

举例说明：

```ts
console.log(foo.msg); // 符合TS的语法
let a_value1: unknown = foo;   // OK
let a_value2: any = foo;      // OK
let a_value3: string = foo;   // OK

let bar: unknown = 222; // OK 
console.log(bar.msg); // Error
let k_value1: unknown = bar;   // OK
let K_value2: any = bar;      // OK
let K_value3: string = bar;   // Error
```

## 总结

any 和 unknown 都是顶级类型，但是 unknown 更加严格，不像 any 那样不做类型检查，反而 unknown 因为未知性质，不允许访问属性，不允许赋值给其他有明确类型的变量。
