---
level: 2.5
---

# use strict是什么，有什么用？

## 题目要点

`"use strict"` 启用严格模式，提供了更严格的代码执行环境，通过禁止一些不安全的行为、修复语言中的错误、提高代码性能等方式，帮助开发者编写更安全、可靠的代码。

## 参考答案

`"use strict"` 是 JavaScript 的严格模式声明，用于启用 ECMAScript 5 中引入的严格模式。严格模式提供了一种更严格的解析和执行 JavaScript 代码的方式，有助于提高代码的安全性和一致性。

### 主要功能和用途

1. **消除 JavaScript 中的一些不安全行为**：
   - 在严格模式下，某些不安全的行为被禁止。例如，不能使用未声明的变量，防止全局变量的无意创建。

2. **修复 JavaScript 的一些错误**：
   - 严格模式修复了语言中的一些设计缺陷，使得错误更容易被发现和调试。例如，`delete` 不能删除不可删除的属性。

3. **提高性能**：
   - 在某些 JavaScript 引擎中，启用严格模式可以提高代码执行的性能，因为引擎可以对代码进行更多优化。

4. **避免意外创建全局变量**：
   - 严格模式下，所有变量必须先声明才可以使用。如果未声明变量就使用，会导致错误，而不是隐式创建全局变量。

5. **禁止重复参数和对象属性**：
   - 在严格模式下，函数的参数不能有重复的名称，对象的属性名也不能重复，这有助于避免潜在的错误。

### 启用方式

- **全局启用**：
  在整个 JavaScript 文件的开头添加 `"use strict";`：
  ```javascript
  "use strict";
  // 全局范围内的代码
  ```

- **函数级别启用**：
  在函数内部添加 `"use strict";`，只对该函数内的代码有效：
  ```javascript
  function myFunction() {
      "use strict";
      // 函数范围内的代码
  }
  ```

### 示例

```javascript

// 错误：未声明的变量
x = 10; // ReferenceError: x is not defined

// 正确：必须先声明变量
let y = 20;

// 错误：不能删除不可删除的属性
delete Object.prototype; // TypeError: Cannot delete property 'prototype' of function Object() { [native code] }
```
