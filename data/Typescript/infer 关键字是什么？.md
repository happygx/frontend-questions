---
level: 3
---

# infer 关键字是什么？

## 题目要点

- **`infer` 关键字**：用于在条件类型中声明和推断类型变量。它能提取或操作复杂类型的内部结构。
- **使用场景**：适用于需要从类型中提取子类型或进行类型转换的情况，例如提取数组元素类型、函数返回类型或 `Promise` 的解析类型。

## 参考答案

在 TypeScript 中，**`infer`** 关键字用于在条件类型中推断类型。它允许你在条件类型中声明一个类型变量并推断它的类型，通常用来提取或推断复杂类型的内部结构。

### **使用 `infer` 关键字**

`infer` 关键字只能在条件类型中使用，并用于声明一个局部的类型变量，该变量的类型由条件类型的条件部分推断得出。它主要用于提取和操作类型的内部细节。

### **基本语法**

```typescript
```
- **`U`**：被推断的类型变量，可以在条件为 `true` 时使用。
- **`FallbackType`**：当条件为 `false` 时的备用类型。

### **示例**

**示例 1：推断数组的元素类型**

```typescript

type NumberArray = ElementType<number[]>;  // number
type StringArray = ElementType<string[]>;  // string
type NotArray = ElementType<number>;       // never
```
- `ElementType` 用于提取数组类型中的元素类型。
- 对于 `number[]` 类型，`ElementType<number[]>` 推断出元素类型是 `number`。
- 对于 `string[]` 类型，`ElementType<string[]>` 推断出元素类型是 `string`。
- 对于非数组类型，`ElementType<number>` 的结果是 `never`。

**示例 2：推断函数的返回类型**

```typescript

type Func = () => string;
type Result = ReturnType<Func>;  // string
```
- `ReturnType` 用于推断函数类型的返回值类型。
- 对于函数 `() => string`，`ReturnType<Func>` 推断出返回值类型是 `string`。

**示例 3：推断 Promise 的解析类型**

```typescript

type StringPromise = PromiseType<Promise<string>>;  // string
type NumberPromise = PromiseType<Promise<number>>;  // number
type NotPromise = PromiseType<number>;              // never
```
- `PromiseType` 用于提取 `Promise` 的解析类型。
- 对于 `Promise<string>`，`PromiseType<Promise<string>>` 推断出解析类型是 `string`。
- 对于非 `Promise` 类型，`PromiseType<number>` 的结果是 `never`。
