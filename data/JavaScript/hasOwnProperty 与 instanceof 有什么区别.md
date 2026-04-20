---
level: 1.5
---

# hasOwnProperty 与 instanceof 有什么区别

## 题目要点

- **`hasOwnProperty`**：
  - **用途**：检查对象是否具有特定的自有属性。
  - **返回值**：`true` 或 `false`，表示属性是否存在于对象自身（非原型链上）。
  - **用法**：检查属性存在性。

- **`instanceof`**：
  - **用途**：检查对象是否是特定构造函数或类的实例。
  - **返回值**：`true` 或 `false`，表示对象是否在构造函数的原型链上。
  - **用法**：确定对象的类型或构造函数。

这两者都在不同的场景下使用：`hasOwnProperty` 用于检查对象属性的存在性，而 `instanceof` 用于检测对象的实例类型。

## 参考答案

`hasOwnProperty` 和 `instanceof` 是 JavaScript 中两个用于处理对象的不同方法，它们用于不同的目的。以下是它们的主要区别和使用场景：

### 1. **`hasOwnProperty`**

- **定义**：`hasOwnProperty` 是所有 JavaScript 对象继承自 `Object` 的一个方法，用于检查对象自身是否具有特定的属性（即，该属性是否是对象本身的属性，而不是继承自原型链上的属性）。

- **用法**：
  ```javascript
  const obj = {
      name: 'John'
  };

  console.log(obj.hasOwnProperty('name')); // 输出: true
  console.log(obj.hasOwnProperty('toString')); // 输出: false
  ```

- **特点**：
  - **检查自身属性**：只检查对象自身的属性，不检查原型链上的属性。
  - **参数**：接受一个字符串作为参数，表示要检查的属性名。
  - **返回值**：返回布尔值 `true` 或 `false`。
  - **通用性**：可以用于所有继承自 `Object` 的对象，包括自定义对象和内置对象。

- **注意**：`hasOwnProperty` 可以被对象的原型链上的属性覆盖，因此在实际使用中，可能需要使用 `Object.prototype.hasOwnProperty.call` 来确保不受覆盖影响：
  ```javascript
  Object.prototype.hasOwnProperty.call(obj, 'name');
  ```

### 2. **`instanceof`**

- **定义**：`instanceof` 是一个操作符，用于检查对象是否是某个构造函数的实例，或者说对象是否通过指定的构造函数创建。

- **用法**：
  ```javascript
  class Person {
      constructor(name) {
          this.name = name;
      }
  }

  const john = new Person('John');

  console.log(john instanceof Person); // 输出: true
  console.log(john instanceof Object); // 输出: true
  console.log(john instanceof Array); // 输出: false
  ```

- **特点**：
  - **检查原型链**：检查对象是否在构造函数的原型链上。如果对象是通过指定构造函数创建的实例，则返回 `true`。
  - **参数**：`instanceof` 右侧是一个构造函数（或类），左侧是要检查的对象。
  - **返回值**：返回布尔值 `true` 或 `false`。
  - **用途**：用于确定对象的类型或构造函数。

- **注意**：
  - `instanceof` 可以用于检测对象的原型链中是否包含指定构造函数的 `prototype` 对象。
  - `instanceof` 可以与类和构造函数一起使用，但不能直接用于检测对象是否包含特定属性。
