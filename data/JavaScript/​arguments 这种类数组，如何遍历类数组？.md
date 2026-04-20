---
level: 1
---

# ​arguments 这种类数组，如何遍历类数组？

## 题目要点

在 JavaScript 中，`arguments` 对象是一个类数组对象，它提供了访问函数参数的索引和长度。虽然它不是真正的数组，但可以通过一些方法来遍历它。

以下是几种遍历 `arguments` 对象的方法：

1. **使用 for 循环**：

   ```javascript
   function example() {
     for (var i = 0; i < arguments.length; i++) {
       console.log(arguments[i]);
     }
   }
   example(1, 2, 3);
   ```

2. **使用 forEach 方法**：
   首先将 `arguments` 对象转换为数组，然后使用 `forEach` 方法遍历。

   ```javascript
   function example() {
     Array.prototype.forEach.call(arguments, function(value, index) {
       console.log(value);
     });
   }
   example(1, 2, 3);
   ```

3. **使用 for...of 循环**：
   `for...of` 循环可以直接遍历类数组对象。

   ```javascript
   function example() {
     for (let value of arguments) {
       console.log(value);
     }
   }
   example(1, 2, 3);
   ```

4. **使用 Object.keys()**：
   使用 `Object.keys()` 方法获取 `arguments` 对象的键（索引），然后遍历这些键。

   ```javascript
   function example() {
     Object.keys(arguments).forEach(function(key) {
       console.log(arguments[key]);
     });
   }
   example(1, 2, 3);
   ```

5. **使用 Array.from()**：
   将 `arguments` 对象转换为真正的数组，然后使用数组的方法进行遍历。

   ```javascript
   function example() {
     Array.from(arguments).forEach(function(value) {
       console.log(value);
     });
   }
   example(1, 2, 3);
   ```

## 参考答案

## 类数组对象

所谓的类数组对象:

>拥有一个 length 属性和若干索引属性的对象

举个例子：

```js

var arrayLike = {
    0: 'name',
    1: 'age',
    2: 'sex',
    length: 3
}
```

那让我们从读写、获取长度、遍历三个方面看看这两个对象。

## 读写

```js
console.log(arrayLike[0]); // name

array[0] = 'new name';
arrayLike[0] = 'new name';
```

```js
console.log(arrayLike.length); // 3
```

```js
   ……
}
for(var i = 0, len = arrayLike.length; i < len; i++) {
    ……
}
```

那类数组对象可以使用数组的方法吗？比如：

```js
```

所以终归还是类数组呐……

## 调用数组方法

如果类数组就是任性的想用数组的方法怎么办呢？

既然无法直接调用，我们可以用 Function.call 间接调用：

```js

Array.prototype.join.call(arrayLike, '&'); // name&age&sex

Array.prototype.slice.call(arrayLike, 0); // ["name", "age", "sex"] 
// slice可以做到类数组转数组

Array.prototype.map.call(arrayLike, function(item){
    return item.toUpperCase();
}); 
// ["NAME", "AGE", "SEX"]
```

在上面的例子中已经提到了一种类数组转数组的方法，再补充三个：

```js
// 1. slice
Array.prototype.slice.call(arrayLike); // ["name", "age", "sex"] 
// 2. splice
Array.prototype.splice.call(arrayLike, 0); // ["name", "age", "sex"] 
// 3. ES6 Array.from
Array.from(arrayLike); // ["name", "age", "sex"] 
// 4. apply
Array.prototype.concat.apply([], arrayLike)
```

要说到类数组对象，Arguments 对象就是一个类数组对象。在客户端 JavaScript 中，一些 DOM 方法(document.getElementsByTagName()等)也返回类数组对象。

## Arguments对象

接下来重点讲讲 Arguments 对象。

Arguments 对象只定义在函数体中，包括了函数的参数和其他属性。在函数体中，arguments 指代该函数的 Arguments 对象。

举个例子：

```js
    console.log(arguments);
}

foo('name', 'age', 'sex')
```

![arguments](https://static.ecool.fun//article/13abe176-2fb7-4838-aa09-6260cfe5dcb9.png)

我们可以看到除了类数组的索引属性和length属性之外，还有一个callee属性，接下来我们一个一个介绍。

## length属性

Arguments对象的length属性，表示实参的长度，举个例子：

```js
    console.log("实参的长度为：" + arguments.length)
}

console.log("形参的长度为：" + foo.length)

foo(1)

// 形参的长度为：3
// 实参的长度为：1
```

Arguments 对象的 callee 属性，通过它可以调用函数自身。

讲个闭包经典面试题使用 callee 的解决方法：

```js

for (var i = 0; i < 3; i++) {
    (data[i] = function () {
       console.log(arguments.callee.i) 
    }).i = i;
}

data[0]();
data[1]();
data[2]();

// 0
// 1
// 2
```

## arguments 和对应参数的绑定

```js

    console.log(name, arguments[0]); // name name

    // 改变形参
    name = 'new name';

    console.log(name, arguments[0]); // new name new name

    // 改变arguments
    arguments[1] = 'new age';

    console.log(age, arguments[1]); // new age new age

    // 测试未传入的是否会绑定
    console.log(sex); // undefined

    sex = 'new sex';

    console.log(sex, arguments[2]); // new sex undefined

    arguments[3] = 'new hobbit';

    console.log(hobbit, arguments[3]); // undefined new hobbit

}

foo('name', 'age')
```

除此之外，以上是在非严格模式下，如果是在严格模式下，实参和 arguments 是不会共享的。

## 传递参数

将参数从一个函数传递到另一个函数

```js
function foo() {
    bar.apply(this, arguments);
}
function bar(a, b, c) {
   console.log(a, b, c);
}

foo(1, 2, 3)
```

使用ES6的 ... 运算符，我们可以轻松转成数组。

```js
    console.log(arguments); // [1, 2, 3]
}

func(1, 2, 3);
```

arguments的应用其实很多，在下个系列，也就是 JavaScript 专题系列中，我们会在 jQuery 的 extend 实现、函数柯里化、递归等场景看见 arguments 的身影。这篇文章就不具体展开了。

如果要总结这些场景的话，暂时能想到的包括：

1. 参数不定长
2. 函数柯里化
3. 递归调用
4. 函数重载
...
