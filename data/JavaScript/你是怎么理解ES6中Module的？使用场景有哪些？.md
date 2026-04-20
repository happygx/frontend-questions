---
level: 3
---

# 你是怎么理解ES6中Module的？使用场景有哪些？

## 题目要点

### 延伸知识

面试中，ES module知识通常会和传统的 CommonJS 规范一起考察，特别是他们之间的差异。**最重要的差异**：ES Module是静态分析，CommonJS是运行时；ES导出的是 *引用*，CommonJS导出的是值拷贝。

关于导出引用和导出值拷贝，可以看这两个示例。

**ES Module**

```javascript
export let count = 0;

export const increment = () => {
    count++;
    console.log(`Module A count incremented to ${count}`);
};

export const getCount = () => count;

// moduleB.mjs
import { increment, getCount, count } from './moduleA.mjs';

console.log('Module B before increment:', getCount(), count);
increment();
console.log('Module B after increment:', getCount(), count);
```
# node ./moduleB.mjs
Module B before increment: 0 0
Module A count incremented to 1
Module B after increment: 1 1
```

```javascript
let count = 0;

exports.increment = () => {
    count++;
    console.log(`Module A count incremented to ${count}`);
};

exports.getCount = () => count;
exports.count = count;

// moduleB.js
const { increment, getCount, count } = require('./moduleA.js');

console.log('Module B before increment:', getCount(), count);
increment();
console.log('Module B after increment:', getCount(), count);
```
# node ./moduleB.js
Module B before increment: 0 0
Module A count incremented to 1
Module B after increment: 1 0
```

- 在nodejs里，es module的JS文件后缀是 `.mjs`，普通的JS文件是 `.js`
- 导出的 `count`变量，在 es module下可以正确读取到更新后的值，但是commonjs下还是初始值

下面列出其他一些差异，也是要熟练掌握的：

1. **语法差异**:
   - **ES Module**: 使用 `import` 和 `export` 关键字进行模块导入和导出。
   - **CommonJS**: 使用 `require()` 函数导入模块，`module.exports` 或 `exports` 导出模块。

2. **加载时机**:
   - **ES Module**: 在静态分析阶段进行加载，可以在代码运行之前静态分析模块的依赖关系。
   - **CommonJS**: 在运行时加载模块，模块的导入和导出是动态的。

3. **异步加载**:
   - **ES Module**: 支持异步加载模块，可以使用 `import()` 函数动态加载模块。
   - **CommonJS**: 模块加载是同步的，不支持异步加载模块的语法。

4. **作用域**:
   - **ES Module**: 模块中的变量在模块级别上是私有的，不会污染全局作用域。
   - **CommonJS**: 模块中的变量是在模块作用域内，但可以通过 `module.exports` 或 `exports` 将变量暴露给其他模块。

5. **动态性**:
   - **ES Module**: 静态分析使得编译器可以进行优化，提前加载模块。
   - **CommonJS**: 运行时加载使得模块加载成本较高，不能进行像 ES Module 那样的静态优化。

6. **环境兼容性**:
   - **ES Module**: 主要用于现代浏览器和 Node.js 版本 12 以上的环境，需要通过 Babel 等工具进行转换以支持旧版浏览器或 Node.js。
   - **CommonJS**: 是 Node.js 的默认模块系统，广泛应用于 Node.js 的后端开发，不需要额外的转换工具。

7. **循环依赖处理**:
   - **ES Module**: 支持静态分析，可以检测和处理循环依赖。
   - **CommonJS**: 在运行时加载模块，循环依赖的处理需要开发者注意避免。

8. **默认导出**:
   - **ES Module**: 支持导出单个默认值，使用 `export default`。
   - **CommonJS**: 没有直接的默认导出语法，通常通过 `module.exports` 或 `exports` 导出单个值。

## 参考答案

## 一、介绍

模块，（Module），是能够单独命名并独立地完成一定功能的程序语句的**集合（即程序代码和数据结构的集合体）**。

两个基本的特征：外部特征和内部特征

- 外部特征是指模块跟外部环境联系的接口（即其他模块或程序调用该模块的方式，包括有输入输出参数、引用的全局变量）和模块的功能

- 内部特征是指模块的内部环境具有的特点（即该模块的局部数据和程序代码）

### 为什么需要模块化

- 代码抽象
- 代码封装
- 代码复用
- 依赖管理

如果没有模块化，我们代码会怎样？

- 变量和方法不容易维护，容易污染全局作用域
- 加载资源的方式通过script标签从上到下。
- 依赖的环境主观逻辑偏重，代码较多就会比较复杂。
- 大型项目资源难以维护，特别是多人合作的情况下，资源的引入会让人奔溃

因此，需要一种将` JavaScript `程序模块化的机制，如

- CommonJs (典型代表：node.js早期)
- AMD (典型代表：require.js)
- CMD (典型代表：sea.js)


### AMD

`Asynchronous ModuleDefinition`（AMD），异步模块定义，采用异步方式加载模块。所有依赖模块的语句，都定义在一个回调函数中，等到模块加载完成之后，这个回调函数才会运行

代表库为`require.js`

```js
// 首先用config()指定各模块路径和引用名
require.config({
  baseUrl: "js/lib",
  paths: {
    "jquery": "jquery.min",  //实际路径为js/lib/jquery.min.js
    "underscore": "underscore.min",
  }
});
// 执行基本操作
require(["jquery","underscore"],function($,_){
  // some code here
});
```

`CommonJS` 是一套 `Javascript` 模块规范，用于服务端

```js
module.exports={ foo , bar}

// b.js
const { foo,bar } = require('./a.js')
```

- 所有代码都运行在模块作用域，不会污染全局作用域
- 模块是同步加载的，即只有加载完成，才能执行后面的操作
- 模块在首次执行后就会缓存，再次加载只返回缓存结果，如果想要再次执行，可清除缓存
- `require`返回的值是被输出的值的拷贝，模块内部的变化也不会影响这个值


既然存在了`AMD`以及`CommonJs`机制，`ES6`的`Module`又有什么不一样？

ES6 在语言标准的层面上，实现了`Module`，即模块功能，完全可以取代 `CommonJS `和 `AMD `规范，成为浏览器和服务器通用的模块解决方案

`CommonJS` 和` AMD` 模块，都只能在运行时确定这些东西。比如，`CommonJS `模块就是对象，输入时必须查找对象属性

```javascript
let { stat, exists, readfile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

```js
import { stat, exists, readFile } from 'fs';
```

由于编译加载，使得静态分析成为可能。包括现在流行的`typeScript`也是依靠静态分析实现功能



## 二、使用

`ES6`模块内部自动采用了严格模式，这里就不展开严格模式的限制，毕竟这是`ES5`之前就已经规定好

模块功能主要由两个命令构成：

- `export`：用于规定模块的对外接口
- `import`：用于输入其他模块提供的功能



### export

一个模块就是一个独立的文件，该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出该变量

```javascript
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

或 
// 建议使用下面写法，这样能瞬间确定输出了哪些变量
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };
```

```js
  return x * y;
};
```

```js
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过`import`命令加载这个模块

```javascript
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

```javascript
```

```js
export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}

// main.js
import * as circle from './circle';
console.log(circle)   // {area:area,circumference:circumference}
```

```js

a.foo = 'hello'; // 合法操作
a = {}; // Syntax Error : 'a' is read-only;
```

`import`后面我们常接着`from`关键字，`from`指定模块文件的位置，可以是相对路径，也可以是绝对路径

```js
```

```javascript
```

```javascript

import { foo } from 'my_module';
```

```js
import 'lodash';
```

如果不需要知道变量名或函数就完成加载，就要用到`export default`命令，为模块指定默认输出

```js
export default function () {
    console.log('foo');
}
```

```js
import customName from './export-default';
customName(); // 'foo'
```

允许您仅在需要时动态加载模块，而不必预先加载所有模块，这存在明显的性能优势

这个新功能允许您将`import()`作为函数调用，将其作为参数传递给模块的路径。 它返回一个 `promise`，它用一个模块对象来实现，让你可以访问该对象的导出

```js
  .then((module) => {
    // Do something with the module.
  });
```

如果在一个模块之中，先输入后输出同一个模块，`import`语句可以与`export`语句写在一起

```javascript

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```



## 三、使用场景

如今，`ES6`模块化已经深入我们日常项目开发中，像`vue`、`react`项目搭建项目，组件化开发处处可见，其也是依赖模块化实现

`vue`组件

```js
  <div class="App">
      组件化开发 ---- 模块化
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
```

```js
  return (
    <div className="App">
		组件化开发 ---- 模块化
    </div>
  );
}

export default App;
```
