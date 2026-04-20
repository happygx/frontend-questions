---
level: 3
---

# 说说你对JS的模块化方案的了解

## 题目要点

JavaScript的模块化方案主要包括：

1. **CommonJS**：主要用于Node.js，通过`require`和`module.exports`实现同步加载模块。

2. **AMD（RequireJS）**：浏览器端异步加载模块，使用`define`定义模块，`require`加载依赖。

3. **ES6 Modules**：ECMAScript 2015标准引入，支持`import`和`export`语法，支持静态和动态加载。

4. **UMD**：兼容CommonJS、AMD和全局变量的模块定义方式。

5. **模块打包工具**：如Webpack、Rollup等，支持多种模块化标准，提供代码分割、懒加载等优化。

## 参考答案

## 前言

JavaScript 语言诞生至今，模块规范化之路曲曲折折。社区先后出现了各种解决方案，包括 AMD、CMD、CommonJS 等，而后 ECMA 组织在 JavaScript 语言标准层面，增加了模块功能（因为该功能是在 ES2015 版本引入的，所以在下文中将之称为 ES6 module）。   
今天我们就来聊聊，为什么会出现这些不同的模块规范，它们在所处的历史节点解决了哪些问题？

## 何谓模块化？

或根据功能、或根据数据、或根据业务，将一个大程序拆分成互相依赖的小文件，再用简单的方式拼装起来。

## 全局变量

### 演示项目

为了更好的理解各个模块规范，先增加一个简单的项目用于演示。

```
├─ js              # js文件夹
│  ├─ main.js      # 入口
│  ├─ config.js    # 项目配置
│  └─ utils.js     # 工具
└─  index.html     # 页面html
```

在刀耕火种的前端原始社会，JS 文件之间的通信基本完全依靠`window`对象（借助 HTML、CSS 或后端等情况除外）。

```js
var api = 'https://github.com/ronffy';
var config = {
  api: api,
}

// utils.js
var utils = {
  request() {
    console.log(window.config.api);
  }
}

// main.js
window.utils.request();
```
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>小贼先生：【深度全面】JS模块规范进化论</title>
</head>
<body>

  <!-- 所有 script 标签必须保证顺序正确，否则会依赖报错 -->
  <script src="./js/config.js"></script>
  <script src="./js/utils.js"></script>
  <script src="./js/main.js"></script>
</body>
</html>
```

浏览器环境下，在全局作用域声明的变量都是全局变量。全局变量存在命名冲突、占用内存无法被回收、代码可读性低等诸多问题。

这时，IIFE（匿名立即执行函数）出现了：

```js
  ...
}());
```

```js
  var api = 'https://github.com/ronffy';
  var config = {
    api: api,
  };
  root.config = config;
}(window));
```

### 命名空间

依靠`window`对象承载数据的方式是“不可靠”的，如`window.config.api`，如果`window.config`不存在，则`window.config.api`就会报错，所以为了避免这样的错误，代码里会大量的充斥`var api = window.config && window.config.api;`这样的代码。

这时，`namespace`登场了，简约版本的`namespace`函数的实现（只为演示，不要用于生产）：

```js
  return tpl.split('.').reduce((pre, curr, i) => {
    return (pre[curr] = i === tpl.split('.').length - 1
      ? (value || pre[curr])
      : (pre[curr] || {}))
  }, window);
}
```

```js
```

```js
 
var d = namespace('app.a.c.d'); // d 的值为 undefined 

```

## AMD/CMD

随着前端业务增重，代码越来越复杂，靠全局变量通信的方式开始捉襟见肘，前端急需一种更清晰、更简单的处理代码依赖的方式，将 JS 模块化的实现及规范陆续出现，其中被应用较广的模块规范有 AMD 和 CMD。

面对一种模块化方案，我们首先要了解的是：1\. 如何导出接口；2\. 如何导入接口。

### AMD

> 异步模块定义规范（AMD）制定了定义模块的规则，这样模块和模块的依赖可以被异步加载。这和浏览器的异步加载模块的环境刚好适应（浏览器同步加载模块会导致性能、可用性、调试和跨域访问等问题）。

本规范只定义了一个函数`define`，它是全局变量。

```js
 * @param {string} id 模块名称
 * @param {string[]} dependencies 模块所依赖模块的数组
 * @param {function} factory 模块初始化要执行的函数或对象
 * @return {any} 模块导出的接口
 */
function define(id?, dependencies?, factory): any
```

AMD 是一种异步模块规范，RequireJS 是 AMD 规范的实现。

接下来，我们用 RequireJS 重构上面的项目。

在原项目 js 文件夹下增加 require.js 文件：

```
├─ js                # js文件夹
│  ├─ ...
│  └─ require.js     # RequireJS 的 JS 库
└─  ...
```
// config.js
define(function() {
  var api = 'https://github.com/ronffy';
  var config = {
    api: api,
  };
  return config;
});

// utils.js
define(['./config'], function(config) {
  var utils = {
    request() {
      console.log(config.api);
    }
  };
  return utils;
});

// main.js
require(['./utils'], function(utils) {
  utils.request();
});
```
<!-- index.html  -->
<!-- ...省略其他 -->
<body>

  <script data-main="./js/main" src="./js/require.js"></script>
</body>
</html>
```

特别说明： 

先有 RequireJS，后有 AMD 规范，随着 RequireJS 的推广和普及，AMD 规范才被创建出来。

### CMD和AMD

* CMD 和 AMD 一样，都是 JS 的模块化规范，也主要应用于浏览器端。  
* AMD 是 RequireJS 在的推广和普及过程中被创造出来。  
* CMD 是 SeaJS 在的推广和普及过程中被创造出来。

二者的的主要区别是 CMD 推崇依赖就近，AMD 推崇依赖前置：

```js
// 依赖必须一开始就写好
define(['./utils'], function(utils) {
  utils.request();
});

// CMD
define(function(require) {
  // 依赖可以就近书写
  var utils = require('./utils');
  utils.request();
});
```

考虑到目前主流项目中对 AMD 和 CMD 的使用越来越少，大家对 AMD 和 CMD 有大致的认识就好，此处不再过多赘述。

随着 ES6 模块规范的出现，AMD/CMD 终将成为过去，但毋庸置疑的是，AMD/CMD 的出现，是前端模块化进程中重要的一步。

## CommonJS

前面说了， AMD、CMD 主要用于浏览器端，随着 node 诞生，服务器端的模块规范 CommonJS 被创建出来。

还是以上面介绍到的 `config.js、utils.js、main.js` 为例，看看 CommonJS 的写法:

```js
var api = 'https://github.com/ronffy';
var config = {
  api: api,
};
module.exports = config;

// utils.js
var config = require('./config');
var utils = {
  request() {
    console.log(config.api);
  }
};
module.exports = utils;

// main.js
var utils = require('./utils');
utils.request();
console.log(global.api)
```

在 main.js 中打印`global.api`，打印结果是`undefined`。node 用`global`管理全局变量，与浏览器的`window`类似。与浏览器不同的是，浏览器中顶层作用域是全局作用域，在顶层作用域中声明的变量都是全局变量，而 node 中顶层作用域不是全局作用域，所以在顶层作用域中声明的变量非全局变量。

### module.exports和exports

我们在看 node 代码时，应该会发现，关于接口导出，有的地方使用`module.exports`，而有的地方使用`exports`，这两个有什么区别呢?

CommonJS 规范仅定义了`exports`，但`exports`存在一些问题（下面会说到），所以`module.exports`被创造了出来，它被称为 CommonJS2 。   

每一个文件都是一个模块，每个模块都有一个`module`对象，这个`module`对象的`exports`属性用来导出接口，外部模块导入当前模块时，使用的也是`module`对象，这些都是 node 基于 CommonJS2 规范做的处理。

```js
var s = 'i am ronffy'
module.exports = s;
console.log(module);
```

```
  exports: 'i am ronffy',
  id: '.',                                // 模块id
  filename: '/Users/apple/Desktop/a.js',  // 文件路径名称
  loaded: false,                          // 模块是否加载完成
  parent: null,                           // 父级模块
  children: [],                           // 子级模块
  paths: [ /* ... */ ],                   // 执行 node a.js 后 node 搜索模块的路径
}
```

```js
var a = require('./a.js'); // a --> i am ronffy
```

```js
var s = 'i am ronffy'
exports = s;
```

```js
var a = require('./a.js'); // a --> {}
```

```js
  exports: {}
}
var exports = module.exports;
console.log(module.exports === exports); // true

var s = 'i am ronffy'
exports = s; // module.exports 不受影响
console.log(module.exports === exports); // false
```

所以，`exports`要这样使用：

```js
exports.s = 'i am ronffy';

// b.js
var a = require('./a.js');
console.log(a.s); // i am ronffy
```

### CommonJS与AMD

CommonJS 和 AMD 都是运行时加载，换言之：都是在运行时确定模块之间的依赖关系。 

二者有何不同点：

1. CommonJS 是服务器端模块规范，AMD 是浏览器端模块规范。
2. CommonJS 加载模块是同步的，即执行`var a = require('./a.js');`时，在 a.js 文件加载完成后，才执行后面的代码。AMD 加载模块是异步的，所有依赖加载完成后以回调函数的形式执行代码。
3. \[如下代码\]`fs`和`chalk`都是模块，不同的是，`fs`是 node 内置模块，`chalk`是一个 npm 包。这两种情况在 CommonJS 中才有，AMD 不支持。

```js
var chalk = require('chalk');
```

> Universal Module Definition.

存在这么多模块规范，如果产出一个模块给其他人用，希望支持全局变量的形式，也符合 AMD 规范，还能符合 CommonJS 规范，能这么全能吗？   
是的，可以如此全能，UMD 闪亮登场。

UMD 是一种通用模块定义规范，代码大概这样(假如我们的模块名称是 myLibName):

```js
  if (typeof exports === 'object' && typeof module === 'object') {
    // CommonJS2
    module.exports = factory()
    // define.amd 用来判断项目是否应用 require.js。
    // 更多 define.amd 介绍，请[查看文档](https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property-)
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory)
  } else if (typeof exports === 'object') {
    // CommonJS
    exports.myLibName = factory()
  } else {
    // 全局变量
    root.myLibName = factory()
  }
}(window, function () {
  // 模块初始化要执行的代码
});
```

## ES6 module

AMD 、 CMD 等都是在原有JS语法的基础上二次封装的一些方法来解决模块化的方案，ES6 module（在很多地方被简写为 ESM）是语言层面的规范，ES6 module 旨在为浏览器和服务器提供通用的模块解决方案。长远来看，未来无论是基于 JS 的 WEB 端，还是基于 node 的服务器端或桌面应用，模块规范都会统一使用 ES6 module。

### 兼容性

目前，无论是浏览器端还是 node ，都没有完全原生支持 ES6 module，如果使用 ES6 module ，可借助 [babel](https://link.segmentfault.com/?enc=OURkG%2BIY5AFtYQSvk2oXpA%3D%3D.lln5vToJ82eedPfkBshKMEyE0fom4DKUYQxzvphPFmo%3D) 等编译器。本文只讨论 ES6 module 语法，故不对 babel 或 typescript 等可编译 ES6 的方式展开讨论。

### 导出接口

CommonJS 中顶层作用域不是全局作用域，同样的，ES6 module 中，一个文件就是一个模块，文件的顶层作用域也不是全局作用域。导出接口使用`export`关键字，导入接口使用`import`关键字。

`export`导出接口有以下方式：

#### 方式1

```js
export const api = `${prefix}/ronffy`;
```

```js
const api = `${prefix}/ronffy`;
export {
  prefix,
  api,
}
```

#### 方式3（默认导出）

```js
export default function foo() {}

// 等同于：
function foo() {}
export {
  foo as default
}
```

#### 方式4（先导入再导出简写）

```js

// 等同于：
import { api } from './config.js';
export {
  api
}
```

### 导入模块接口

ES6 module 使用`import`导入模块接口。

导出接口的模块代码1：

```js
const prefix = 'https://github.com';
const api = `${prefix}/ronffy`;
export {
  prefix,
  api,
}
```

#### 方式1

```js

// or
// 配合`import`使用的`as`关键字用来为导入的接口重命名。
import { api as myApi } from './config.js';
```

```js
const api = config.api;
```

#### 方式3（默认导出的导入）

```js
export const conut = 0;
export default function myFoo() {}

// index.js
// 默认导入的接口此处刻意命名为cusFoo，旨在说明该命名可完全自定义。
import cusFoo, { count } from './foo.js';

// 等同于：
import { default as cusFoo, count } from './foo.js';
```

#### 方式4（整体加载）

import './config.js';

这样会加载整个 config.js 模块，但未导入该模块的任何接口。

#### 方式5（动态加载模块）

上面介绍了 ES6 module 各种导入接口的方式，但有一种场景未被涵盖：动态加载模块。比如用户点击某个按钮后才弹出弹窗，弹窗里功能涉及的模块的代码量比较重，所以这些相关模块如果在页面初始化时就加载，实在浪费资源，`import()`可以解决这个问题，从语言层面实现模块代码的按需加载。

ES6 module 在处理以上几种导入模块接口的方式时都是编译时处理，所以`import`和`export`命令只能用在模块的顶层，以下方式都会报错：

```js
if (/* ... */) {
  import { api } from './config.js'; 
}

// 报错
function foo() {
  import { api } from './config.js'; 
}

// 报错
const modulePath = './utils' + '/api.js';
import modulePath;
```

```js
  import('./config.js')
    .then(({ api }) => {

    });
}

const modulePath = './utils' + '/api.js';
import(modulePath);

```
该功能的提议目前处于 TC39 流程的第4阶段。更多说明，请查看[TC39/proposal-dynamic-import](https://link.segmentfault.com/?enc=u61kJdRaczxbmqQREX%2FCUw%3D%3D.j9rCDxYgxXMW%2FmIMJvWZqURrkN38%2FXqha2fZM6a3RRy61j%2BPqOJa7i5wATeqRqGR)。

### CommonJS 和 ES6 module

CommonJS 和 AMD 是运行时加载，在运行时确定模块的依赖关系。  

ES6 module 是在编译时（`import()`是运行时加载）处理模块依赖关系，。

#### CommonJS

CommonJS 在导入模块时，会加载该模块，所谓“CommonJS 是运行时加载”，正因代码在运行完成后生成`module.exports`的缘故。当然，CommonJS 对模块做了缓存处理，某个模块即使被多次多处导入，也只加载一次。

```js
let num = 0;
function getNum() {
  return num;
}
function setNum(n) {
  num = n;
}
console.log('o init');
module.exports = {
  num,
  getNum,
  setNum,
}

// a.js
const o = require('./o.js');
o.setNum(1);

// b.js
const o = require('./o.js');
// 注意：此处只是演示，项目里不要这样修改模块
o.num = 2;

// main.js
const o = require('./o.js');

require('./a.js');
console.log('a o.num:', o.num);

require('./b.js');
console.log('b o.num:', o.num);
console.log('b o.getNum:', o.getNum());
```

```
_模块即使被其他多个模块导入，也只会加载一次，并且在代码运行完成后将接口赋值到`module.exports`属性上。_
2. `a o.num: 0`  
_模块在加载完成后，模块内部的变量变化不会反应到模块的`module.exports`。_
3. `b o.num: 2`  
_对导入模块的直接修改会反应到该模块的`module.exports`。_
4. `b o.getNum: 1`  
_模块在加载完成后即形成一个闭包。_
```

```js
let num = 0;
function getNum() {
  return num;
}
function setNum(n) {
  num = n;
}
console.log('o init');
export {
  num,
  getNum,
  setNum,
}

// main.js
import { num, getNum, setNum } from './o.js';

console.log('o.num:', num);
setNum(1);

console.log('o.num:', num);
console.log('o.getNum:', getNum());
```

```js
require("@babel/register")({
  presets: ["@babel/preset-env"]
});

module.exports = require('./main.js')
```

命令行执行`node index.js`，打印结果如下：

```
_模块即使被其他多个模块导入，也只会加载一次。_
2. `o.num: 0`
3. `o.num: 1`  
_编译时确定模块依赖的 ES6 module，通过`import`导入的接口只是值的引用，所以`num`才会有两次不同打印结果。_
4. `o.getNum: 1`
```

ES6 module 是编译时加载（或叫做“静态加载”），利用这一点，可以对代码做很多之前无法完成的优化：

1. 在开发阶段就可以做导入和导出模块相关的代码检查。
2. 结合 Webpack、Babel 等工具可以在打包阶段移除上下文中未引用的代码（dead-code），这种技术被称作“tree shaking”，可以极大的减小代码体积、缩短程序运行时间、提升程序性能。
