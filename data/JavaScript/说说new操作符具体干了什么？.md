---
level: 2
---

# 说说new操作符具体干了什么？

## 题目要点

执行了以下几步操作：

1. **创建一个空对象**：首先，`new`操作符会创建一个空的简单JavaScript对象（即`{}`）。

2. **设置原型**：然后，这个新创建的对象的内部`[[Prototype]]`（也就是`__proto__`，但在现代JavaScript中更推荐使用`Object.getPrototypeOf()`来获取）会被赋值为构造函数的`prototype`属性。这一步使得新创建的对象能够继承构造函数原型链上的属性和方法。

3. **调用构造函数**：接下来，构造函数会被调用，且新创建的对象会被作为`this`的上下文（即构造函数内部的`this`指向这个新对象）。同时，如果构造函数返回一个对象，那么这个返回的对象会被用作`new`表达式的结果；如果构造函数没有返回对象（即返回`undefined`或`null`），则`new`表达式的结果就是步骤1中创建的那个对象。

4. **返回对象**：最后，如果构造函数没有显式返回一个对象，则返回步骤1中创建并被步骤2和步骤3处理过的对象。

## 参考答案

## 一、是什么

在`JavaScript`中，`new`操作符用于创建一个给定构造函数的实例对象

例子

```js
    this.name = name;
    this.age = age;
}
Person.prototype.sayName = function () {
    console.log(this.name)
}
const person1 = new Person('Tom', 20)
console.log(person1)  // Person {name: "Tom", age: 20}
person1.sayName() // 'Tom'
```

- `new` 通过构造函数 `Person` 创建出来的实例可以访问到构造函数中的属性
- `new` 通过构造函数 `Person` 创建出来的实例可以访问到构造函数原型链中的属性（即实例与构造函数通过原型链连接了起来）

现在在构建函数中显式加上返回值，并且这个返回值是一个原始类型

```js
  this.name = name
  return 1
}
const t = new Test('xxx')
console.log(t.name) // 'xxx'
```

下面在构造函数中返回一个对象

```js
  this.name = name
  console.log(this) // Test { name: 'xxx' }
  return { age: 26 }
}
const t = new Test('xxx')
console.log(t) // { age: 26 }
console.log(t.name) // 'undefined'
```



## 二、流程

从上面介绍中，我们可以看到`new`关键字主要做了以下的工作：

- 创建一个新的对象`obj`
- 将对象与构建函数通过原型链连接起来
- 将构建函数中的`this`绑定到新建的对象`obj`上

- 根据构建函数返回类型作判断，如果是原始值则被忽略，如果是返回对象，需要正常处理

举个例子：

```js
    this.name = name;
    this.age = age;
}
const person1 = new Person('Tom', 20)
console.log(person1)  // Person {name: "Tom", age: 20}
person1.sayName() // 'Tom'
```

 ![](https://static.ecool.fun//article/7004e072-f843-4db5-9501-a2311d81885a.png)



## 三、手写new操作符

现在我们已经清楚地掌握了`new`的执行过程

那么我们就动手来实现一下`new`

```js
    // 1.创建一个新对象
    const obj = {}
    // 2.新对象原型指向构造函数原型对象
    obj.__proto__ = Func.prototype
    // 3.将构建函数的this指向新对象
    let result = Func.apply(obj, args)
    // 4.根据返回值判断
    return result instanceof Object ? result : obj
}
```

```js
    const obj = {}
    obj.__proto__ = func.prototype
    let result = func.apply(obj, args)
    return result instanceof Object ? result : obj
}
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.say = function () {
    console.log(this.name)
}

let p = mynew(Person, "huihui", 123)
console.log(p) // Person {name: "huihui", age: 123}
p.say() // huihui
```
