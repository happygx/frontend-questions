---
level: 1.5
---

# ES6中函数新增了哪些扩展?

## 参考答案

## 一、参数

`ES6`允许为函数的参数设置默认值

```js
  console.log(x, y);
}

console.log('Hello') // Hello World
console.log('Hello', 'China') // Hello China
console.log('Hello', '') // Hello
```

```js
    let x = 1; // error
    const x = 2; // error
}
```

```js
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined
```

```js
  console.log(x, y);
}

foo() // undefined 5
```

```javascript
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined]
f(, 1) // 报错
f(undefined, 1) // [1, 1]
```

### 函数的length属性

`length`将返回没有指定默认值的参数个数

```js
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
```

```js
```

```js
(function (a, b = 1, c) {}).length // 1
```

返回该函数的函数名

```js

// ES5
f.name // ""

// ES6
f.name // "f"
```

```js
bar.name // "baz"
```

```javascript
```

```javascript
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "
```

一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域

等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的

下面例子中，`y=x`会形成一个单独作用域，`x`没有被定义，所以指向全局变量`x`

```js

function f(y = x) { 
  // 等同于 let y = x  
  let x = 2; 
  console.log(y);
}

f() // 1
```

只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错

```js
function doSomething(a, b = a) {
  'use strict';
  // code
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};

const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};
```

使用“箭头”（`=>`）定义函数

```js

// 等同于
var f = function (v) {
  return v;
};
```

```js
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
```

```js
```

```js
```

- 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象
- 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误
- 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替
- 不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数
