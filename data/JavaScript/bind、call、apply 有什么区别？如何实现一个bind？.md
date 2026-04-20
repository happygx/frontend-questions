---
level: 1
---

# bind、call、apply 有什么区别？如何实现一个bind?

## 题目要点

`bind`、`call` 和 `apply` 是 JavaScript 中 `Function` 对象的方法，用于改变函数的 `this` 绑定，并传递参数。它们之间有一些关键区别：

### 区别

1. **`bind`**：
   - **用途**：创建一个新函数，永久绑定 `this` 和给定的初始参数。
   - **返回值**：返回一个新的函数。
   - **调用方式**：函数不会立即执行，而是返回一个绑定了 `this` 和参数的新函数，直到该新函数被调用。

   **示例：**

   ```javascript
   function greet(greeting, name) {
     console.log(`${greeting}, ${name}`);
   }

   const greetHello = greet.bind(null, 'Hello');
   greetHello('Alice'); // 输出: "Hello, Alice"
   ```

2. **`call`**：
   - **用途**：调用函数并立即指定 `this` 和传递的参数。
   - **返回值**：函数的返回值。
   - **调用方式**：立即执行函数。

   **示例：**

   ```javascript
   function greet(greeting, name) {
     console.log(`${greeting}, ${name}`);
   }

   greet.call(null, 'Hi', 'Bob'); // 输出: "Hi, Bob"
   ```

3. **`apply`**：
   - **用途**：调用函数并立即指定 `this`，参数通过数组传递。
   - **返回值**：函数的返回值。
   - **调用方式**：立即执行函数。

   **示例：**

   ```javascript
   function greet(greeting, name) {
     console.log(`${greeting}, ${name}`);
   }

   greet.apply(null, ['Hey', 'Charlie']); // 输出: "Hey, Charlie"
   ```

## 参考答案

## 一、作用

`call `、`apply `、`bind `作用是改变函数执行时的上下文，简而言之就是改变函数运行时的`this`指向

那么什么情况下需要改变`this`的指向呢？下面举个例子

```js
var obj={
    name:"martin",
    say:function () {
        console.log(this.name);
    }
};
obj.say(); //martin，this指向obj对象
setTimeout(obj.say,0); //lucy，this指向window对象
```

但是我们把`say`放在`setTimeout`方法中，在定时器中是作为回调函数来执行的，因此回到主栈执行时是在全局执行上下文的环境中执行的，这时候`this`指向`window`，所以输出`luck`

> PS: 此处需要注意，如果外层改成 `const name="lucy";`，那么`setTimeout(obj.say,0);`的输出会是 undefined，因为 var 声明的变量会挂载在 window 上，而 let 和 const 声明的变量不会挂载到 window 上。

我们实际需要的是`this`指向`obj`对象，这时候就需要该改变`this`指向了

```js
```

下面再来看看`apply`、`call`、`bind`的使用

### apply

`apply`接受两个参数，第一个参数是`this`的指向，第二个参数是函数接受的参数，以数组的形式传入

改变`this`指向后原函数会立即执行，且此方法只是临时改变`this`指向一次

```js
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

fn.apply(obj,[1,2]); // this会变成传入的obj，传入的参数必须是一个数组；
fn(1,2) // this指向window
```

```js
fn.apply(undefined,[1,2]); // this指向window
```

`call`方法的第一个参数也是`this`的指向，后面传入的是一个参数列表

跟`apply`一样，改变`this`指向后原函数会立即执行，且此方法只是临时改变`this`指向一次

```js
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

fn.call(obj,1,2); // this会变成传入的obj，传入的参数不是数组；
fn(1,2) // this指向window
```

```js
fn.call(undefined,1,2); // this指向window
```

bind方法和call很相似，第一参数也是`this`的指向，后面传入的也是一个参数列表(但是这个参数列表可以分多次传入)

改变`this`指向后不会立即执行，而是返回一个永久改变`this`指向的函数

```js
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

const bindFn = fn.bind(obj); // this 也会变成传入的obj ，bind不是立即执行需要执行一次
bindFn(1,2) // this指向obj
fn(1,2) // this指向window
```

从上面可以看到，`apply`、`call`、`bind`三者的区别在于：

- 三者都可以改变函数的`this`对象指向
- 三者第一个参数都是`this`要指向的对象，如果如果没有这个参数或参数为`undefined`或`null`，则默认指向全局`window`
- 三者都可以传参，但是`apply`是数组，而`call`是参数列表，且`apply`和`call`是一次性传入参数，而`bind`可以分为多次传入
- `bind `是返回绑定this之后的函数，`apply `、`call` 则是立即执行 



## 三、实现

实现`bind`的步骤，我们可以分解成为三部分：

- 修改`this`指向
- 动态传递参数

```js
fn.bind(obj,1,2)()

// 方式二：在bind中传递函数参数，也在返回函数中传递参数
fn.bind(obj,1)(2)
```

整体实现代码如下：

```js
    // 判断调用对象是否为函数
    if (typeof this !== "function") {
        throw new TypeError("Error");
    }

    // 获取参数
    const args = [...arguments].slice(1),
          fn = this;

    return function Fn() {

        // 根据调用方式，传入不同绑定值
        return fn.apply(this instanceof Fn ? new fn(...arguments) : context, args.concat(...arguments)); 
    }
}
```
