---
level: 2
---

# Javascript中如何实现函数缓存？函数缓存有哪些应用场景？

## 参考答案

## 一、是什么

函数缓存，就是将函数运算过的结果进行缓存

本质上就是用空间（缓存存储）换时间（计算过程）

常用于缓存数据计算结果和缓存对象

```js
const calc = memoize(add); // 函数缓存
calc(10,20);// 30
calc(10,20);// 30 缓存
```



## 二、如何实现

实现函数缓存主要依靠闭包、柯里化、高阶函数，这里再简单复习下：

### 闭包

闭包可以理解成，函数 + 函数体内可访问的变量总和

```js
    var a = 1;
    function add() {
        const b = 2
        let sum = b + a
        console.log(sum); // 3
    }
    add()
})()
```



### 柯里化

把接受多个参数的函数转换成接受一个单一参数的函数

```js
var add = function (x,y) {
    return x+y;
}
add(3,4) //7

// 函数柯里化
var add2 = function (x) {
    //**返回函数**
    return function (y) {
        return x+y;
    }
}
add2(3)(4) //7
```



### 高阶函数

通过接收其他函数作为参数或返回其他函数的函数

```js
  var a = 2;

  function bar() {
    console.log(a);
  }
  return bar;
}
var baz = foo();
baz();//2
```



下面再看看如何实现函数缓存，实现原理也很简单，把参数和对应的结果数据存在一个对象中，调用时判断参数对应的数据是否存在，存在就返回对应的结果数据，否则就返回计算结果

如下所示

```js
  let cache = Object.create(null)
  content = content || this
  return (...key) => {
    if (!cache[key]) {
      cache[key] = func.apply(content, key)
    }
    return cache[key]
  }
}
```

```js
const num1 = calc(100,200)
const num2 = calc(100,200) // 缓存得到的结果
```

- 在当前函数作用域定义了一个空对象，用于缓存运行结果
- 运用柯里化返回一个函数，返回的函数由于闭包特性，可以访问到`cache`
- 然后判断输入参数是不是在`cache`的中。如果已经存在，直接返回`cache`的内容，如果没有存在，使用函数`func`对输入参数求值，然后把结果存储在`cache`中



## 三、应用场景

虽然使用缓存效率是非常高的，但并不是所有场景都适用，因此千万不要极端的将所有函数都添加缓存

以下几种情况下，适合使用缓存：

- 对于昂贵的函数调用，执行复杂计算的函数
- 对于具有有限且高度重复输入范围的函数
- 对于具有重复输入值的递归函数
- 对于纯函数，即每次使用特定输入调用时返回相同输出的函数
