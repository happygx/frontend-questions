---
level: 3
---

# 你了解 ts 工具类型 Exclude 与 Omit 的使用吗？及它们两个的区别？

## 题目要点

- **`Exclude`** 用于联合类型，移除指定的类型元素。
- **`Omit`** 用于对象类型，移除指定的属性。

## 参考答案

`Exclude` 和 `Omit` 都是 TypeScript 中的 **工具类型**（Utility Types），它们的作用是处理和转换类型的集合，在实际开发中高效地操作类型。

### 1. **`Exclude` 类型**
`Exclude` 是 TypeScript 提供的一个工具类型，它的作用是从联合类型中排除指定的类型。

#### 语法：
```typescript
```
- `U` 是要排除的类型。

`Exclude<T, U>` 的作用是构建一个新的类型，它是从 `T` 中排除掉所有在 `U` 中的类型。

#### 示例：
```typescript
type B = string | boolean;

type Result = Exclude<A, B>; // Result 类型为: number
```

### 2. **`Omit` 类型**
`Omit` 是 TypeScript 中的另一个工具类型，它用于从一个类型中排除指定的键（属性）。

#### 语法：
```typescript
```
- `K` 是要排除的属性键。

`Omit<T, K>` 会构建一个新的类型，它是从 `T` 中排除掉了 `K` 中的所有属性。

#### 示例：
```typescript
  name: string;
  age: number;
  address: string;
}

type OmittedPerson = Omit<Person, 'address'>;
// OmittedPerson 类型为: { name: string; age: number; }
```

### `Exclude` 和 `Omit` 的区别
- **`Exclude`**：用于处理联合类型，排除某些类型（通常是值类型）以产生一个新的联合类型。它关注的是类型的**值**，而不是对象的**属性**。
  
- **`Omit`**：用于处理对象类型，从对象中排除掉指定的属性，生成一个新的对象类型。它关注的是类型的**属性**，而非值。

#### 例子对比：
- **`Exclude`**：从联合类型中移除指定的值类型。
  
  ```typescript
  type A = string | number | boolean;
  type B = string | boolean;

  type Result = Exclude<A, B>; // Result 是 number
  ```

- **`Omit`**：从对象类型中移除指定的属性。
  
  ```typescript
  interface Person {
    name: string;
    age: number;
    address: string;
  }

  type OmittedPerson = Omit<Person, 'address'>; // OmittedPerson 是 { name: string; age: number }
  ```
