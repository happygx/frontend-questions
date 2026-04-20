---
level: 1
---

# JS 的严格模式有什么作用？

## 题目要点

**JavaScript 的严格模式** 提供了一种更严格的执行环境，它可以帮助开发者：
- 捕获潜在的错误（如使用未声明的变量、删除不可删除的属性等）。
- 提高代码的安全性和性能。
- 强制遵循更严格的规范，从而使代码更加可靠和易于维护。

通过启用严格模式，开发者能够提前发现许多常见的 JavaScript 错误，使得代码更符合现代 JavaScript 的规范，减少潜在的漏洞。

## 参考答案

**JavaScript 严格模式（Strict Mode）** 是一种以更严格的规则来解析和执行 JavaScript 代码的模式。启用严格模式后，JavaScript 引擎会对代码中的一些不安全、不规范或不推荐使用的做法进行限制，从而提高代码的可靠性、可维护性和安全性。

### **启用严格模式**
严格模式可以通过两种方式启用：

1. **全局严格模式**：直接在脚本的最顶部启用。
   ```javascript
   'use strict';  // 在文件顶部启用严格模式
   ```

2. **函数严格模式**：在函数内部启用严格模式。
   ```javascript
   function myFunction() {
     'use strict';  // 在函数内部启用严格模式
     // 函数体
   }
   ```

### **严格模式的主要特点与用途**

1. **防止意外创建全局变量**
   - 在严格模式下，声明未使用 `var`, `let`, `const` 的变量会抛出错误。避免由于拼写错误或未声明的变量导致全局变量被创建。
   ```javascript
   'use strict';
   x = 10;  // 报错：x is not defined
   ```

2. **禁止删除变量、函数和函数参数**
   - 在严格模式下，不能删除变量、函数或函数的参数，删除操作会抛出错误。
   ```javascript
   'use strict';
   var x = 5;
   delete x;  // 报错：Cannot delete variable 'x'
   ```

3. **禁止使用 `with` 语句**
   - `with` 语句会导致作用域链的动态变化，增加代码理解的难度，容易产生意料之外的错误。严格模式下禁止使用 `with`。
   ```javascript
   'use strict';
   with (Math) {  // 报错：Strict mode code may not include a with statement
     x = cos(2);
   }
   ```

4. **更严格的 `this` 绑定**
   - 在非严格模式下，`this` 在全局上下文中会指向 `window`（浏览器中）或 `global`（Node.js 中）。在严格模式下，`this` 会被设置为 `undefined`，如果没有显式绑定 `this`，就不会隐式地指向全局对象。
   ```javascript
   'use strict';
   console.log(this);  // undefined
   ```

5. **禁用重复的参数名**
   - 在严格模式下，函数参数不能有重复的参数名。这样可以避免在函数内部对同一参数的混淆。
   ```javascript
   'use strict';
   function foo(a, a) {  // 报错：Duplicate parameter name not allowed in this context
     return a;
   }
   ```

6. **写保护的对象属性**
   - 严格模式下，试图修改一个 `readonly` 或 `getter` 只读属性时会抛出错误。
   ```javascript
   'use strict';
   const obj = Object.freeze({x: 10});
   obj.x = 20;  // 报错：Cannot assign to read only property 'x'
   ```

7. **`eval` 不会污染作用域**
   - 在严格模式下，`eval` 不会引入新的变量或函数，避免了 `eval` 的安全隐患。
   ```javascript
   'use strict';
   eval('var x = 2');
   console.log(x);  // 报错：x is not defined
   ```

8. **禁止使用 `arguments.callee` 和 `arguments.caller`**
   - 严格模式下，`arguments.callee`（指向当前正在执行的函数）和 `arguments.caller`（指向调用当前函数的函数）被禁用，减少了与函数调用栈的耦合，避免潜在的安全问题。
   ```javascript
   'use strict';
   function foo() {
     console.log(arguments.callee);  // 报错：arguments.callee is not allowed in strict mode
   }
   ```

9. **改进的错误处理**
   - 严格模式下，许多常见的 JavaScript 错误会抛出异常。例如，给只读属性赋值、对函数参数重新赋值等操作都会导致错误。
   ```javascript
   'use strict';
   function foo(a) {
     a = 10;  // 报错：Cannot assign to a function parameter
   }
   ```

10. **改进的垃圾回收**
    - 在严格模式下，垃圾回收会变得更有效，因为它禁止了某些不必要的语言特性（如 `with`），这会使得变量作用域的分析更加清晰，从而更容易进行垃圾回收。

### **严格模式的优点**

1. **减少错误**：
   严格模式能够捕获一些常见的错误，比如意外创建全局变量、禁止使用 `with` 等，从而避免了很多潜在的错误。
   
2. **提高性能**：
   由于严格模式消除了某些不安全的特性，JavaScript 引擎可以对严格模式下的代码进行更高效的优化。

3. **增强代码安全性**：
   禁止一些不安全的操作（如删除变量、修改只读属性等），有助于提高代码的安全性。

4. **代码更易于维护**：
   严格模式有助于减少代码中的不规范写法，使得代码风格更加统一、清晰，便于团队开发和维护。

5. **减少了全局作用域污染**：
   严格模式下，全局作用域污染问题被大大减少。未声明的变量会报错，避免了隐式的全局变量创建。
