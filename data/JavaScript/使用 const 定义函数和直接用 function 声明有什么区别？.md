---
level: 2
---

# 使用 const 定义函数和直接用 function 声明有什么区别？

## 题目要点

| 特性                       | `const` 定义函数                | `function` 声明                |
|----------------------------|---------------------------------|--------------------------------|
| 提升 (Hoisting)            | 不提升                         | 提升                          |
| 作用域                     | 块级作用域                     | 当前作用域                     |
| 是否支持箭头函数            | 支持                           | 不支持                        |
| `this` 绑定                | 静态绑定（若为箭头函数）         | 动态绑定                      |
| 是否可以重新赋值            | 不可以                         | 无重新赋值概念                 |

* 用const声明函数时，你可以避免函数被重新赋值，代码的可维护性会更高，特别是当你不希望函数被意外重写时，const更加安全。
* 用function声明函数时，你可以享受函数提升的好处，使代码看起来更灵活，适合在任何位置调用函数。

## 参考答案

### **1. 定义方式**
#### `const` 定义函数
- 是通过**函数表达式**来定义的。
- 函数本身是一个**变量**，且绑定在 `const` 定义的变量上，不能重新赋值。
- 示例：
  ```javascript
  const myFunction = function() {
      console.log("Hello!");
  };

  // 或使用箭头函数
  const myArrowFunction = () => {
      console.log("Hello from arrow function!");
  };
  ```

#### `function` 声明函数
- 是通过**函数声明**来定义的。
- 函数会在**定义时就绑定到作用域**，并且有函数名。
- 示例：
  ```javascript
  function myFunction() {
      console.log("Hello!");
  }
  ```

---

### **2. 提升行为 (Hoisting)**

#### `function` 声明
- **函数声明会被提升**到作用域的顶部。这意味着你可以在声明之前调用该函数。
- 示例：
  ```javascript
  myFunction(); // 输出: "Hello!"

  function myFunction() {
      console.log("Hello!");
  }
  ```

#### `const` 定义函数
- **函数表达式不会被提升**，变量 `const` 会被提升但不会初始化。这意味着在定义之前调用会抛出 `ReferenceError`。
- 示例：
  ```javascript
  myFunction(); // 抛出 ReferenceError: Cannot access 'myFunction' before initialization

  const myFunction = function() {
      console.log("Hello!");
  };
  ```

---

### **3. 作用域绑定**

#### `function` 声明
- 函数声明会绑定到当前的作用域，并且在全局作用域下，它会绑定到 `window` 对象（非严格模式）。

#### `const` 定义函数
- 函数表达式绑定在块级作用域中，而不是全局作用域。
- 示例：
  ```javascript
  {
      const myFunction = function() {
          console.log("Inside block!");
      };
      myFunction(); // 可以正常调用
  }
  myFunction(); // 抛出 ReferenceError: myFunction is not defined
  ```

---

### **4. 是否可以重新赋值**

#### `const` 定义函数
- 使用 `const` 定义的函数是一个不可重新赋值的常量。
- 示例：
  ```javascript
  const myFunction = function() {
      console.log("Hello!");
  };
  myFunction = () => console.log("New function!"); // 抛出 TypeError: Assignment to constant variable.
  ```

#### `function` 声明
- 函数声明本身没有重新赋值的概念，函数名是固定的。

---

### **5. 箭头函数支持**
- `const` 可以结合箭头函数定义，创建更简洁的函数表达方式。
- 示例：
  ```javascript
  const myArrowFunction = () => console.log("Hello, Arrow!");
  ```

- 而 `function` 声明是传统函数的定义形式，不支持箭头函数。

---

### **6. this 绑定的行为**

#### `function` 声明
- `function` 声明使用的是传统的 `this` 绑定规则，`this` 的值取决于函数的调用方式（动态绑定）。
- 示例：
  ```javascript
  function myFunction() {
      console.log(this);
  }
  myFunction(); // 在全局环境中调用，this 指向全局对象（严格模式下是 undefined）。
  ```

#### `const` 和箭头函数
- 如果使用 `const` 定义箭头函数，则 `this` 是静态绑定到定义该函数的作用域。
- 示例：
  ```javascript
  const myArrowFunction = () => {
      console.log(this);
  };
  myArrowFunction(); // this 指向定义时的环境
  ```
