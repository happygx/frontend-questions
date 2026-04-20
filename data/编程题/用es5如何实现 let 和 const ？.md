---
level: 2
---

# 用es5如何实现 let 和 const ？

## 参考答案

###### 实现 let

`let` 大家应该用的非常熟悉了，定义一个仅作用于该代码块的变量。如果去 `babel` 上面在线转换一下，大家可以看到结果是 `var`。在 `es6` 出现以前我们一般使用无限接近闭包的形式或者立即执行函数的形式来定义不会被污染的变量。

我们这也可以做类似的操作。

```
	var a = 1;
    console.log(a)
})();

console.log(a)
```

###### 实现 const

那么 `const` 该怎么实现呢？

const 声明一个只读的常量。一旦声明，常量的值就不能改变。

有什么方法是可以限制一个值不能发生改变的呢？

是的,需要用到 `Object.defineProperty`。

其中有一个属性是这样的：

> writable：当前对象元素的值是否可修改。

由于 `ES5` 环境没有 `block` 的概念，所以是无法百分百实现 `const`，只能是挂载到某个对象下，要么是全局的 `window`，要么就是自定义一个 `object` 来当容器

```
  window.data = value // 把要定义的data挂载到window下，并赋值value
  Object.defineProperty(window, data, { // 利用Object.defineProperty的能力劫持当前对象，并修改其属性描述符
    enumerable: false,
    configurable: false,
    get: function () {
      return value
    },
    set: function (data) {
      if (data !== value) { // 当要对当前属性进行赋值时，则抛出错误！
        throw new TypeError('Assignment to constant variable.')
      } else {
        return value
      }
    }
  })
}
__const('a', 10)
console.log(a)
delete a
console.log(a)
for (let item in window) { // 因为const定义的属性在global下也是不存在的，所以用到了enumerable: false来模拟这一功能
  if (item === 'a') { // 因为不可枚举，所以不执行
    console.log(window[item])
  }
}
a = 20 // 报错

```

```
f.name = 'hello'; // 严格模式下是会报错的
f.name; // 打印出admin ,值没有被改变

```

那么一个新的问题来了，const 真的定义的一定是一个常量嘛？一定是不可变的嘛？我们看看代码的结果

```
a.name='admin';
a.name // admin;

```

对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。

但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。

因此，将一个对象声明为常量必须非常小心。

## 带来的新特性

let,const问世之前，js是没有块级作用域这种特性的，只有函数作用域，导致了很多稀奇古怪的bug。

这里就要理解两个的区别，函数作用域好理解，就是函数{}包裹的区域，其实这里使用var，let，const都一样，外部是不能调用函数内部的变量的。

但是块级就有区别了，最明显的就是if(){}。在函数内使用条件判断，花括号内使用let,const,那么条件外是访问不到条件内的变量的，代码就会更清晰一点。
