---
level: 1.5
---

# JS 创建对象的方式有哪些？

## 题目要点

- **对象字面量**：创建简单对象，语法简洁。
- **构造函数**：用于创建多个类似的对象，使用 `new` 关键字。
- **`Object.create`**：用于创建继承自指定原型的新对象。
- **类（Class）**：提供了现代的对象创建和继承语法，具有更好的可读性和组织结构。
- **`Object` 构造函数**：用于创建对象，但不常用。
- **工厂函数**：返回新对象，封装创建逻辑，避免使用 `new`。

选择创建对象的方法通常取决于你的具体需求，包括对象的复杂性、继承关系和可读性要求。

## 参考答案

以下是创建对象的主要方法：

### 1. **对象字面量（Object Literal）**

- **定义**：直接使用花括号 `{}` 来创建对象。
- **示例**：
  ```javascript
  const person = {
      name: 'John',
      age: 30,
      greet() {
          console.log('Hello!');
      }
  };
  ```

- **特点**：
  - 语法简洁。
  - 适合创建简单对象或用于字面量初始化。

### 2. **构造函数（Constructor Function）**

- **定义**：使用函数作为构造函数来创建对象，通过 `new` 关键字实例化对象。
- **示例**：
  ```javascript
  function Person(name, age) {
      this.name = name;
      this.age = age;
      this.greet = function() {
          console.log('Hello!');
      };
  }

  const john = new Person('John', 30);
  ```

- **特点**：
  - 适用于创建具有相同结构和行为的多个对象。
  - 使用 `new` 关键字实例化。

### 3. **`Object.create` 方法**

- **定义**：使用 `Object.create` 方法创建新对象，并指定其原型对象。
- **示例**：
  ```javascript
  const personPrototype = {
      greet() {
          console.log('Hello!');
      }
  };

  const john = Object.create(personPrototype);
  john.name = 'John';
  john.age = 30;
  ```

- **特点**：
  - 新创建的对象继承指定的原型对象。
  - 可用于创建对象继承层次结构。

### 4. **类（Class）**

- **定义**：使用 ES6 引入的 `class` 语法来定义对象的构造函数和方法。
- **示例**：
  ```javascript
  class Person {
      constructor(name, age) {
          this.name = name;
          this.age = age;
      }

      greet() {
          console.log('Hello!');
      }
  }

  const john = new Person('John', 30);
  ```

- **特点**：
  - 提供了更清晰和现代的语法来定义对象。
  - 类的语法是构造函数的语法糖，实际底层仍然使用原型链。

### 5. **`Object` 构造函数**

- **定义**：使用 `Object` 构造函数来创建一个空对象或从现有对象创建新对象。
- **示例**：
  ```javascript
  const person = new Object();
  person.name = 'John';
  person.age = 30;
  person.greet = function() {
      console.log('Hello!');
  };
  ```

- **特点**：
  - 与对象字面量相比，语法稍显冗长。
  - `Object` 构造函数通常不用于创建对象，更多是用于处理对象的属性。

### 6. **工厂函数（Factory Function）**

- **定义**：使用普通函数返回一个新对象，工厂函数可以有多个返回值并提供封装。
- **示例**：
  ```javascript
  function createPerson(name, age) {
      return {
          name: name,
          age: age,
          greet() {
              console.log('Hello!');
          }
      };
  }

  const john = createPerson('John', 30);
  ```

- **特点**：
  - 提供了与构造函数类似的功能，但不需要使用 `new` 关键字。
  - 可以返回不同结构的对象。
