---
level: 2
---

# 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？

## 题目要点

- `const` 和 `let` 声明的变量在全局作用域中是块级作用域的，不会直接成为 `window` 对象的属性。
- 可以在声明它们的作用域内直接访问这些变量，但不能通过 `window` 对象来访问。
- 使用 `globalThis` 可以访问全局对象，但 `const` 和 `let` 变量不会显示在其中。

## 参考答案

在 JavaScript 中，`const` 和 `let` 声明的变量不直接添加到全局 `window` 对象上，这与 `var` 声明的变量不同。下面是对 `const` 和 `let` 的详细解释，以及如何访问这些变量的说明：

### **`const` 和 `let` 的声明和作用域**

1. **作用域**：
   - `const` 和 `let` 的作用域是块级作用域（block scope），意味着它们的作用范围是被它们声明的代码块（例如函数、循环或条件语句）内。

2. **全局作用域**：
   - 当 `const` 或 `let` 在全局作用域中声明时，它们不会成为 `window` 对象的属性。这与 `var` 不同，`var` 声明的变量会自动成为全局 `window` 对象的属性。

### **如何访问全局作用域中的 `const` 和 `let` 变量**

虽然 `const` 和 `let` 变量不直接在 `window` 对象上，但它们仍然存在于全局作用域中。访问这些变量的方法有：

1. **在同一作用域内直接访问**：
   - 在全局作用域中，可以直接访问这些变量：
     ```javascript
     let globalLet = 'Hello, world!';
     const globalConst = 42;

     console.log(globalLet);   // 输出: 'Hello, world!'
     console.log(globalConst); // 输出: 42
     ```

2. **使用 `globalThis`**：
   - 在现代 JavaScript 环境中，可以使用 `globalThis` 来访问全局对象。在浏览器环境中，`globalThis` 指向 `window` 对象；在 Node.js 环境中，`globalThis` 指向 `global` 对象。对于 `const` 和 `let` 变量，它们不会出现在 `globalThis` 上。

3. **`eval`（不推荐使用）**：
   - 在特定情况下，可以使用 `eval` 来访问全局作用域中的变量：
     ```javascript
     let globalLet = 'Hello, world!';
     const globalConst = 42;

     console.log(eval('globalLet'));   // 输出: 'Hello, world!'
     console.log(eval('globalConst')); // 输出: 42
     ```
   - 注意：`eval` 存在安全性和性能问题，一般不推荐使用。

### **为什么 `const` 和 `let` 不在 `window` 上？**

- **设计考虑**：
  - `const` 和 `let` 的设计目标是提供更严格的作用域控制和避免全局变量污染。为了减少意外的全局变量污染，它们不自动添加到 `window` 对象上。

- **全局对象的隔离**：
  - 通过不将 `const` 和 `let` 声明的变量添加到 `window` 对象，JavaScript 语言保证了全局作用域的变量不会被无意中修改。这有助于避免由于全局变量污染造成的潜在冲突和错误。
