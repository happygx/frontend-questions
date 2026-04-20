---
level: 1
---

# 说说 const 和 readonly 的区别

## 题目要点

- **`const`**：
  - 用于声明常量，确保变量在初始化后不能被重新赋值。
  - 适用于基本数据类型和对象的引用。
  - 对象的属性是可以修改的，但整个对象不能重新赋值。

- **`readonly`**：
  - 用于定义只读属性，确保对象的属性在初始化后不能被修改。
  - 适用于类、接口、数组和元组等。
  - 对象的属性或数组的元素在创建后不可修改。

## 参考答案

`const` 和 `readonly` 是 TypeScript 中用于处理不可变数据的关键字，但它们用于不同的场景和具有不同的功能。

以下是它们的主要区别：

### **1. `const`**

- **作用范围**：`const` 是 JavaScript 的一个关键字，用于声明常量。它确保声明的变量在初始化后不能被重新赋值。
- **适用对象**：`const` 用于变量声明，适用于基本数据类型和对象（如数组和对象字面量）。注意，`const` 声明的对象的属性是可以修改的，但不能重新赋值整个对象。

  ```javascript
  // 基本数据类型
  const x = 10;
  x = 20; // 编译错误

  // 对象
  const obj = { name: "John" };
  obj.name = "Doe"; // 合法，修改对象属性
  obj = { name: "Jane" }; // 编译错误，不能重新赋值
  ```

- **作用**：`const` 确保变量引用的地址（或基本类型的值）在初始化后不会改变，但对象的内容仍然可以被修改。

### **2. `readonly`**

- **作用范围**：`readonly` 是 TypeScript 特有的关键字，用于指定类的属性或接口的属性为只读。这意味着这些属性在对象创建后不能被修改。

- **适用对象**：`readonly` 主要用于类和接口，应用于类的属性、接口的属性和数组类型。

  ```typescript
  // 在类中使用
  class Person {
    readonly name: string;

    constructor(name: string) {
      this.name = name;
    }
  }

  const person = new Person("John");
  person.name = "Doe"; // 编译错误，属性为只读

  // 在接口中使用
  interface ReadOnlyPerson {
    readonly name: string;
  }

  const person: ReadOnlyPerson = { name: "John" };
  person.name = "Doe"; // 编译错误，属性为只读

  // 在数组中使用
  const numbers: readonly number[] = [1, 2, 3];
  numbers[0] = 4; // 编译错误，数组为只读
  ```

- **作用**：`readonly` 确保属性在对象创建后不可修改，适用于对象的属性、数组和元组。
