---
level: 2
---

# extends 条件类型怎么定义？

## 题目要点

- **条件类型**：允许在类型系统中进行条件判断，基于类型的条件选择不同的类型。
- **语法**：`T extends U ? X : Y`，用于根据 `T` 是否扩展 `U` 选择 `X` 或 `Y`。
- **应用场景**：用于创建复杂的类型转换和类型推断逻辑。

## 参考答案

在 TypeScript 中，**条件类型**（Conditional Types）是一种根据类型条件选择不同类型的机制。`extends` 关键字在条件类型中用于表示一个类型是否满足特定条件。条件类型的基本语法如下：

```typescript
```
- **`U`**：用于比较的类型。
- **`X`**：如果 `T` 满足 `U` 的条件，则结果类型。
- **`Y`**：如果 `T` 不满足 `U` 的条件，则结果类型。

### **定义条件类型**

**示例 1：基本的条件类型**

```typescript
type FalseType = false extends true ? 'Yes' : 'No'; // 'No'
```
- `true` 确实可以 `extends` `true`，所以 `TrueType` 的结果是 `'Yes'`。
- `false` 不可以 `extends` `true`，所以 `FalseType` 的结果是 `'No'`。

**示例 2：基于泛型的条件类型**

```typescript

type Result1 = IsString<string>;  // 'Yes'
type Result2 = IsString<number>;  // 'No'
```
- 当 `T` 是 `string` 时，结果是 `'Yes'`。
- 当 `T` 不是 `string` 时，结果是 `'No'`。

**示例 3：复杂的条件类型**

可以结合多个条件进行复杂的判断。

```typescript

type Test1 = IsStringOrNumber<string>;   // 'String or Number'
type Test2 = IsStringOrNumber<number>;   // 'String or Number'
type Test3 = IsStringOrNumber<boolean>;  // 'Other'
```
- `IsStringOrNumber` 判断 `T` 是否是 `string` 或 `number`，结果是 `'String or Number'`。
- 否则，结果是 `'Other'`。

**示例 4：条件类型与联合类型**

```typescript

type NumberArray = ElementType<number[]>;  // number
type StringType = ElementType<string>;      // string
```
- `ElementType` 用于提取数组类型中的元素类型。
- `number[]` 的元素类型是 `number`。
- `string` 不是数组类型，因此 `ElementType<string>` 结果是 `string`。

### **条件类型的高级用法**

**条件类型的分布式条件类型**：
- 当条件类型与联合类型一起使用时，条件类型会分布到联合的每个成员上。

```typescript

type Result = Distribute<'a' | 'b'>;  // 'a' | 'b'
```

**递归条件类型**：
- 条件类型也可以用于递归类型的处理，例如构建深度递归类型。

```typescript
  ? U extends any[] 
    ? Flatten<U>
    : U
  : T;

type Result1 = Flatten<number[]>;          // number
type Result2 = Flatten<number[][][]>;     // number
```
