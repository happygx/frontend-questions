---
level: 3
---

# 说说 TypeScript 中，有哪些内置的类型方法和工具类型

## 题目要点

TypeScript 内置的类型方法和工具类型非常丰富，主要用于：
1. **映射类型**（如 `Partial`、`Readonly`）：操作属性的可选性、只读性等。
2. **条件类型**（如 `Exclude`、`Extract`）：从联合类型中筛选或剔除类型。
3. **函数工具类型**（如 `Parameters`、`ReturnType`）：获取函数的参数和返回值类型。
4. **字符串类型工具**（如 `Uppercase`、`Capitalize`）：对字符串类型进行变换。

## 参考答案

## **1. 核心工具类型**
TypeScript 自带的一些通用工具类型，用于在类型系统中执行变换操作：

### **1.1. 映射类型**
- **`Partial<T>`**  
  将类型 `T` 的所有属性变为可选属性。  
  ```typescript
  type User = { name: string; age: number };
  type PartialUser = Partial<User>; // { name?: string; age?: number }
  ```

- **`Required<T>`**  
  将类型 `T` 的所有属性变为必需属性。  
  ```typescript
  type User = { name?: string; age?: number };
  type RequiredUser = Required<User>; // { name: string; age: number }
  ```

- **`Readonly<T>`**  
  将类型 `T` 的所有属性变为只读属性。  
  ```typescript
  type User = { name: string; age: number };
  type ReadonlyUser = Readonly<User>; // { readonly name: string; readonly age: number }
  ```

- **`Record<K, T>`**  
  构造一个对象类型，其键是类型 `K` 的属性，值是类型 `T`。  
  ```typescript
  type Role = "admin" | "user";
  type Permissions = Record<Role, boolean>; // { admin: boolean; user: boolean }
  ```

- **`Pick<T, K>`**  
  从类型 `T` 中选择指定的属性 `K`，构造新的类型。  
  ```typescript
  type User = { name: string; age: number; address: string };
  type UserName = Pick<User, "name">; // { name: string }
  ```

- **`Omit<T, K>`**  
  从类型 `T` 中剔除指定的属性 `K`，构造新的类型。  
  ```typescript
  type User = { name: string; age: number; address: string };
  type UserWithoutAddress = Omit<User, "address">; // { name: string; age: number }
  ```

---

### **1.2. 条件类型**
- **`Exclude<T, U>`**  
  从类型 `T` 中剔除可以赋值给 `U` 的类型。  
  ```typescript
  type T = "a" | "b" | "c";
  type Excluded = Exclude<T, "a">; // "b" | "c"
  ```

- **`Extract<T, U>`**  
  从类型 `T` 中提取可以赋值给 `U` 的类型。  
  ```typescript
  type T = "a" | "b" | "c";
  type Extracted = Extract<T, "a" | "b">; // "a" | "b"
  ```

- **`NonNullable<T>`**  
  移除类型 `T` 中的 `null` 和 `undefined`。  
  ```typescript
  type T = string | null | undefined;
  type NonNullableT = NonNullable<T>; // string
  ```

- **`ReturnType<T>`**  
  获取函数 `T` 的返回值类型。  
  ```typescript
  type Fn = () => number;
  type Result = ReturnType<Fn>; // number
  ```

- **`InstanceType<T>`**  
  获取构造函数类型 `T` 的实例类型。  
  ```typescript
  class User {
      name = "John";
  }
  type UserInstance = InstanceType<typeof User>; // User
  ```

---

### **1.3. 工具类型**
- **`Parameters<T>`**  
  获取函数 `T` 的参数类型的元组。  
  ```typescript
  type Fn = (name: string, age: number) => void;
  type Params = Parameters<Fn>; // [string, number]
  ```

- **`ConstructorParameters<T>`**  
  获取构造函数类型 `T` 的参数类型的元组。  
  ```typescript
  type Constructor = new (name: string, age: number) => {};
  type Params = ConstructorParameters<Constructor>; // [string, number]
  ```

- **`ThisParameterType<T>`**  
  提取函数类型 `T` 的 `this` 参数类型。  
  ```typescript
  function fn(this: { x: number }, y: number) {}
  type This = ThisParameterType<typeof fn>; // { x: number }
  ```

- **`OmitThisParameter<T>`**  
  从函数类型 `T` 中移除 `this` 参数。  
  ```typescript
  function fn(this: { x: number }, y: number) {}
  type Fn = OmitThisParameter<typeof fn>; // (y: number) => void
  ```

---

## **2. 内置的类型工具**

### **2.1. 基本类型辅助工具**
- **`Awaited<T>`**  
  获取 `Promise` 的解析值类型。  
  ```typescript
  type T = Promise<number>;
  type Resolved = Awaited<T>; // number
  ```

- **`Uppercase<S>` / `Lowercase<S>`**  
  转换字符串类型为大写或小写。  
  ```typescript
  type Upper = Uppercase<"hello">; // "HELLO"
  type Lower = Lowercase<"WORLD">; // "world"
  ```

- **`Capitalize<S>` / `Uncapitalize<S>`**  
  将字符串类型的首字母变为大写或小写。  
  ```typescript
  type Cap = Capitalize<"hello">; // "Hello"
  type Uncap = Uncapitalize<"World">; // "world"
  ```
