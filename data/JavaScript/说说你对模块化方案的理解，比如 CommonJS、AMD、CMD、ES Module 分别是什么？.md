---
level: 4
---

# 说说你对模块化方案的理解，比如 CommonJS、AMD、CMD、ES Module 分别是什么？

## 题目要点

时间轴上，JavaScript 模块系统经历了几个阶段的发展：CommonJS、AMD、CMD 和 ES Module。

以下是每个阶段的简要总结：

#### CommonJS

- **用途**：主要用于服务器端 JavaScript（Node.js），也被 webpack 等工具用于浏览器端的模块打包。
- **特点**：同步或运行时加载，磁盘读取速度快。
- **语法**：
  - 导出：通过 `module.exports` 或 `exports` 暴露模块。
  - 引用：使用 `require('x')`。

#### AMD (Asynchronous Module Definition)

- **用途**：虽然不常用，但它是 CommonJS 在浏览器端的实现。
- **特点**：异步加载，依赖前置。
- **语法**：
  - 导出：通过 `define` 定义模块，并可以指定依赖的其他模块。
  - 引用：使用 `require(['a'], function (a){ a.foo() });`。

#### CMD (Common Module Definition)

- **用途**：根据 CommonJS 和 AMD 实现，优化了加载方式。
- **特点**：异步加载，按需加载/依赖就近。
- **语法**：
  - 导出：通过 `define` 定义模块，并在用到的地方引用依赖。
  - 引用：使用 `var x = require('a'); a.foo();`。

#### ES Module

- **用途**：目前浏览器端的默认标准。
- **特点**：静态编译，编译时就能确定依赖关系，以及输入和输出的变量。
- **语法**：
  - 导出：通过 `export` 或 `export default` 输出模块。
  - 引用：使用 `import`。

#### 注意

- `export default` 在同一个文件中只能存在一个。
- 一个模块中可以同时使用 `export default` 和 `export`。

这些模块系统各有特点，适用于不同的场景。ES Module 作为现代浏览器端的标准，提供了一种更简洁、更易于管理的模块系统。

## 参考答案

`时间轴：CommonJS --> AMD --> CMD --> ES Module`

### CommonJS

* 常用于：`服务器端`，`node`，`webpack`
* 特点：`同步/运行时加载`，`磁盘读取速度快`
* 语法：  

```js
module.exports = {  
  attr1,  
  attr2  
}  
exports.attr = xx  
```
不可以`exports = xxx`，这样写会无效，因为更改了exports的地址，而 `exports` 是 `module.exports` 的引用指向的是同一个内存，模块最后导出的是 `module.exports`  

```js
const xx = require('xx') // 整体重命名  
const { attr } = require('xx') // 解构某一个导出
```

* 常用于：不常用，`CommonJs的浏览器端实现`
* 特点：  
   * `异步加载`：因为面向浏览器端，为了不影响渲染肯定是异步加载  
   * `依赖前置`：所有的依赖必须写在最初的依赖数组中，速度快，但是会浪费资源，预先加载了所有依赖不管你是否用到
* 语法：  

```js
// 如果该模块还依赖其他模块，则将模块的路径填入第一个参数的数组中  
define(['x'], function(x){  
  function foo(){  
      return x.fn() + 1  
  }  
  return {  
      foo: foo  
  };  
});  
// 2. 引用  
require(['a'], function (a){  
  a.foo()  
});
```

* 常用于：不常用，`根据CommonJs和AMD实现，优化了加载方式`
* 特点：  
   * `异步加载`  
   * `按需加载/依赖就近`：用到了再引用依赖，方便了开发，缺点是速度和性能较差
* 语法：  

```js
// 如果该模块还依赖其他模块，在用到的地方引用即可  
define(function(){  
  function foo(){  
      var x = require('x')  
      return x.fn() + 1  
  }  
  return {  
      foo: foo  
  };  
});  
// 2. 引用  
var x = require('a');  
a.foo();
```

* 常用于：`目前浏览器端的默认标准`
* 特点：`静态编译：` 在编译的时候就能确定依赖关系，以及输入和输出的变量
* 语法：  

```js
// 写法1: 边声明，边导出  
export var m = 1;  
export function m() {};  
export class M {};  

// 写法2：导出一个接口 export {}，形似导出对象但不是, 本质上是引用集合，最常用的导出方法  

export {  
  attr1,  
  attr2  
}  

// 写法3：默认导出  

export default fn  

// 2. 引用  
import { x } from 'test.js' // 导出模块中对应的值，必须知道值在模块中导出时的名字  
import { x as myx } from 'test.js' // 改名字  
import x from 'test.js' // 默认导出的引用方式  
```

 1. `export default`在同一个文件中只可存在一个（一个模块只能有一个默认输出）  
 2. 一个模块中可以同时使用export default 和 export  
 
 ```js
 // 模块 test.js
 var info = {  
   name: 'name',  
   age: 18  
 }  
 export default info  
 export var name= '海洋饼干'  
 export var age = 18  
 
 // 引用  
 import person, {name, age as myAge} from 'test.js'  
 console.log(person); // { name: 'name', age: 18 }  
 console.log(name+ '=' + myAge); // 海洋饼干=18
 ```
