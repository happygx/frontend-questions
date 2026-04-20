---
level: 2
---

# common.js和es6中模块引入的区别？

## 题目要点

**作答思路：**

在Common.js和ES6模块系统中，模块引入的区别主要体现在以下几个方面：

1. **运行时与编译时**：
   - **Common.js**：在运行时加载模块，模块代码是在require时执行的。
   - **ES6模块**：在编译时加载模块，模块代码是在编译阶段静态分析确定的。
2. **模块依赖**：
   - **Common.js**：模块是一个对象，require时返回模块对象。
   - **ES6模块**：模块是静态的，通过`import`引入。
3. **模块导出**：
   - **Common.js**：使用`module.exports`或`exports`导出模块。
   - **ES6模块**：使用`export`导出模块。
4. **模块导入**：
   - **Common.js**：使用`require`导入模块。
   - **ES6模块**：使用`import`导入模块。
5. **模块作用域**：
   - **Common.js**：模块内部的变量是全局变量。
   - **ES6模块**：模块内部的变量是模块私有变量。

**考察要点：**

1. **运行时与编译时**：理解Common.js和ES6模块系统在运行时和编译时的区别。
2. **模块依赖和导出**：理解模块的依赖关系和如何导出模块。
3. **模块导入和作用域**：理解模块的导入方式以及模块内部变量的作用域。

## 参考答案

CommonJS 和 ES6 模块系统在语法和行为上有显著的区别：

### CommonJS

CommonJS 是一种模块系统，主要用于 Node.js 环境。它使用 `require` 函数来引入模块，并使用 `module.exports` 来导出模块。

#### 语法

- **导出模块：**

```javascript
const name = 'John';
module.exports = name;

// 或者导出一个对象
const person = { name: 'John', age: 30 };
module.exports = person;
```

```javascript
const name = require('./moduleA');
console.log(name); // 'John'

// 引入对象
const person = require('./moduleA');
console.log(person.name); // 'John'
console.log(person.age);  // 30
```

1. **动态引入：** `require` 可以在函数体内、条件语句中动态引入模块。
    ```javascript
    if (condition) {
        const moduleA = require('./moduleA');
    }
    ```

2. **同步加载：** `require` 是同步的，模块在执行 `require` 时会立即加载并返回结果。

3. **导出的是值的拷贝：** 但对于对象和数组等引用类型，修改引用类型的属性会在所有引用中反映出来。
    ```javascript
    const obj = require('./moduleA');
    obj.newProp = 'new';
    console.log(require('./moduleA').newProp); // 'new'
    ```

### ES6 模块

ES6 模块系统是 ECMAScript 标准的一部分，使用 `import` 和 `export` 语法来定义模块，广泛用于现代前端开发以及一些支持 ES6 的服务器环境。

#### 语法

- **导出模块：**

```javascript
export const name = 'John';

// 导出默认值
const person = { name: 'John', age: 30 };
export default person;
```

```javascript
import { name } from './moduleA';
console.log(name); // 'John'

// 引入默认导出
import person from './moduleA';
console.log(person.name); // 'John'
console.log(person.age);  // 30
```

1. **静态引入：** `import` 必须在文件的顶部声明，不能在函数体内或条件语句中使用（**注意，这里有个例外，动态import()是可以在函数或者条件语句中使用的，这也是我们通常code splitting所依赖的特性**）。这使得 ES6 模块可以在编译时确定依赖关系和优化。
    ```javascript
    // 错误的用法
    if (condition) {
        import { name } from './moduleA';
    }
    ```

2. **异步加载：** 浏览器中的 ES6 模块是异步加载的，这意味着它们不会阻塞页面的其他加载过程。

3. **导出的是值的引用：** 导出值的引用意味着当导出模块中的值发生变化时，所有引用该值的地方都会反映出这些变化。
    ```javascript
    // moduleA.js
    export let count = 1;
    setTimeout(() => { count += 1; }, 1000);

    // main.js
    import { count } from './moduleA';
    setTimeout(() => { console.log(count); }, 2000); // 2
    ```

### 兼容性和转换

- **CommonJS 和 ES6 模块的互操作性：** 在 Node.js 环境中，可以使用工具如 Babel 或 Webpack 将 ES6 模块转换为 CommonJS 模块，从而实现兼容性。
- **双向兼容：** 使用工具链（如 Babel、Webpack）可以同时支持 CommonJS 和 ES6 模块语法，并在构建过程中根据目标环境进行转换。

### 总结

- **语法区别：** CommonJS 使用 `require` 和 `module.exports`，而 ES6 模块使用 `import` 和 `export`。
- **加载方式：** CommonJS 是同步加载，ES6 模块是静态分析和异步加载。
- **使用场景：** CommonJS 主要用于 Node.js 环境，而 ES6 模块是 ECMAScript 标准的一部分，更适合现代前端开发。

选择使用哪种模块系统取决于项目需求和运行环境。对于现代前端开发，推荐使用 ES6 模块。对于 Node.js 项目，传统上使用 CommonJS，但也可以逐渐迁移到 ES6 模块。
