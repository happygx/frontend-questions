---
level: 3
---

# Boolean 和 boolean 有什么区别？

## 题目要点

- Boolean 是 JavaScript 中的内置构造函数，用于布尔值的类型转换或创建布尔对象。
- boolean 是 TypeScript 的基本类型

## 参考答案

在 TypeScript 中，`Boolean` 和 `boolean` 都与布尔类型（true 或 false）相关，但它们有本质的区别：

### 1. **`boolean`（小写）**
`boolean` 是 TypeScript 中的 **原始类型**，它表示一种简单的布尔值类型。它只能是两个值之一：`true` 或 `false`。

- `boolean` 类型用于变量、参数、返回值等处，表示值本身是布尔值。

#### 示例：
```typescript
let isAvailable: boolean = false;
```

### 2. **`Boolean`（大写）**
`Boolean` 是 JavaScript 的 **内置对象类型**，它是一个构造函数，类似于其他对象类型（例如 `String`、`Number`）。当你使用 `Boolean` 时，实际上是在引用一个对象类型，它可以通过 `new Boolean()` 来实例化一个布尔对象。

#### 示例：
```typescript
let isAvailableObject: Boolean = new Boolean(false);
```
- `new Boolean(true)` 会返回一个布尔对象，而不是原始的布尔值。

### **区别总结：**
1. **`boolean`**：表示原始布尔类型，可以是 `true` 或 `false`，用于变量、函数返回值等。它是一个 **基本数据类型**。
   
2. **`Boolean`**：表示布尔对象类型，实际上是 `Boolean` 构造函数的实例。它是一个 **对象类型**，通过 `new Boolean()` 创建，通常不推荐这样做，因为它的行为可能导致一些不必要的复杂性。布尔对象在比较时会转换为 `true`，即使它的值是 `false`。

#### 例子：
```typescript
const isFalse: Boolean = new Boolean(false);

console.log(isTrue == false);  // false
console.log(isFalse == false); // true
console.log(isFalse === false); // false
```
- 在第二个 `console.log` 中，`isFalse` 是布尔对象，即使它的值是 `false`，但是因为布尔对象本身会被转换为 `true`，因此与 `false` 比较时是 `true`。
- 在第三个 `console.log` 中，由于严格比较 `===`，布尔对象 `isFalse` 和原始的 `false` 不相等。
