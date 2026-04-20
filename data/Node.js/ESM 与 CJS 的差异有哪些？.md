---
level: 2
---

# ESM 与 CJS 的差异有哪些？

## 题目要点

- **ESM** 是现代 JavaScript 的模块系统，具有静态分析、异步加载等优势，适用于现代前端和 Node.js 环境。
- **CJS** 是 Node.js 的传统模块系统，支持动态加载和同步加载，适用于老旧的 Node.js 项目。

## 参考答案

ECMAScript Modules（ESM）和 CommonJS（CJS）是 JavaScript 中两种主要的模块系统，它们各有特点和差异。

### **1. 语法**

- **ESM**（ECMAScript Modules）：
  - **导入**：使用 `import` 语法
    ```javascript
    import { foo } from './module.js';
    import * as bar from './module.js';
    import defaultExport from './module.js';
    ```
  - **导出**：使用 `export` 语法
    ```javascript
    export const foo = 42;
    export function bar() { ... }
    export default function() { ... }
    ```

- **CJS**（CommonJS）：
  - **导入**：使用 `require` 语法
    ```javascript
    const foo = require('./module.js').foo;
    const bar = require('./module.js');
    ```
  - **导出**：使用 `module.exports` 和 `exports`
    ```javascript
    module.exports = {
      foo: 42,
      bar: function() { ... }
    };
    // 或者
    exports.foo = 42;
    exports.bar = function() { ... };
    ```

### **2. 模块加载方式**

- **ESM**：
  - **静态**：模块加载在编译时确定，可以进行静态分析，支持树摇优化（tree-shaking）。
  - **异步**：支持异步加载（动态导入），可以使用 `import()` 来按需加载模块。
  
- **CJS**：
  - **动态**：模块加载在运行时进行，`require` 可以在任何地方调用，包括条件语句中。
  - **同步**：`require` 是同步的，所有模块在程序开始时加载。

### **3. 文件扩展名**

- **ESM**：
  - 通常使用 `.js` 文件扩展名，默认情况下会使用 `ESM` 语法，但也可以使用 `.mjs` 扩展名明确标识为 ESM 模块。
  
- **CJS**：
  - 通常使用 `.js` 文件扩展名，模块系统默认为 `CJS`。使用 `.cjs` 扩展名可以明确标识为 CJS 模块。

### **4. 模块解析**

- **ESM**：
  - **相对路径**：需要提供完整的路径（包括文件扩展名），例如 `import { foo } from './module.js';`
  - **绝对路径**：支持 URL 作为模块标识符。
  
- **CJS**：
  - **相对路径**：可以省略文件扩展名，例如 `const foo = require('./module');`，Node.js 会尝试自动解析 `.js`、`.json`、`.node` 等扩展名。

### **5. 模块缓存**

- **ESM**：
  - 模块加载结果会被缓存，后续的导入会从缓存中读取。
  
- **CJS**：
  - 模块首次 `require` 时加载，后续的 `require` 会使用缓存的结果。

### **6. 默认导出**

- **ESM**：
  - 支持默认导出，可以导出一个默认值和多个命名值。
  
- **CJS**：
  - `module.exports` 可以导出一个对象或函数，不能直接导出多个命名值。

### **7. `this` 绑定**

- **ESM**：
  - 在模块代码中，`this` 是 `undefined`。模块代码不在函数上下文中运行，而是在模块上下文中运行。
  
- **CJS**：
  - 在模块代码中，`this` 指向 `module.exports`，即模块的导出对象。

### **示例对比**

**ESM 示例：**

```javascript
export const foo = 42;
export default function() { ... }

// main.js
import { foo } from './module.js';
import defaultExport from './module.js';
```

```javascript
const foo = 42;
module.exports = function() { ... };
module.exports.foo = foo;

// main.js
const module = require('./module.js');
const foo = module.foo;
const defaultExport = module;
```
