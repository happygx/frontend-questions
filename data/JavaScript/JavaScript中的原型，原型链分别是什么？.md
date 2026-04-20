---
level: 2.5
---

# JavaScript中的原型，原型链分别是什么? 

## 题目要点

## 原型（Prototype）

在JavaScript中，每个对象都有一个原型对象，这个原型对象包含了一组属性和方法。对象可以通过这个原型对象继承属性和方法。

### 特点

- 原型对象本身也是一个普通的对象。
- 可以通过`Object.getPrototypeOf()`获取对象的原型。
- 原型上添加的属性和方法可以被子对象继承。

## 原型链（Prototype Chain）

原型链是一种机制，用于在查找对象属性时，从对象自身的属性开始，沿着原型的链式结构向上查找，直到找到属性或到达链的末端（通常是一个`null`的原型）。

### 特点

- 原型链是由一系列原型对象组成的，每个对象都可能有自己的原型。
- 属性查找遵循链式结构，从下到上直到找到匹配的属性或到达链的末端。
- 原型链允许对象共享属性和方法，提高了内存效率。

## 原型链的查找过程

1. **对象属性查找**：首先在对象自身属性中查找。
2. **原型属性查找**：如果当前对象没有找到，沿着原型链向上查找。
3. **链式结构**：继续在原型的原型上查找，直到链的末端。

## 原型链的末端

- 原型链的末端通常是`Object.prototype`，其原型为`null`。

## 原型链的作用

- **属性继承**：允许对象继承原型链上属性和方法。
- **方法共享**：多个对象可以共享原型上定义的方法，避免重复定义。

## 参考答案

## 一、原型

`JavaScript` 常被描述为一种基于原型的语言——每个对象拥有一个原型对象

当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾

准确地说，这些属性和方法定义在Object的构造器函数（constructor functions）之上的`prototype`属性上，而非实例对象本身

下面举个例子：

函数可以有属性。 每个函数都有一个特殊的属性叫作原型`prototype` 

```js
console.log( doSomething.prototype );
```

```js
    constructor: ƒ doSomething(),
    __proto__: {
        constructor: ƒ Object(),
        hasOwnProperty: ƒ hasOwnProperty(),
        isPrototypeOf: ƒ isPrototypeOf(),
        propertyIsEnumerable: ƒ propertyIsEnumerable(),
        toLocaleString: ƒ toLocaleString(),
        toString: ƒ toString(),
        valueOf: ƒ valueOf()
    }
}
```

可以看到，原型对象有一个自有属性`constructor`，这个属性指向该函数，如下图关系展示

 ![](https://static.ecool.fun//article/2deaaac4-9732-4c1c-a3dd-8506adf9d0fe.png)





## 二、原型链

原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法

在对象实例和它的构造器之间建立一个链接（它是`__proto__`属性，是从构造函数的`prototype`属性派生的），之后通过上溯原型链，在构造器中找到这些属性和方法

下面举个例子：

```js
    this.name = name;
    this.age = 18;
    this.sayName = function() {
        console.log(this.name);
    }
}
// 第二步 创建实例
var person = new Person('person')
```

 ![](https://static.ecool.fun//article/9db8820a-8e19-4755-8edf-fc09231ff6ef.png)

下面分析一下：

- 构造函数`Person`存在原型对象`Person.prototype`
- 构造函数生成实例对象`person`，`person`的`__proto__`指向构造函数`Person`原型对象
- `Person.prototype.__proto__` 指向内置对象，因为 `Person.prototype` 是个对象，默认是由 `Object `函数作为类创建的，而 `Object.prototype` 为内置对象

- `Person.__proto__` 指向内置匿名函数 `anonymous`，因为 Person 是个函数对象，默认由 Function 作为类创建

- `Function.prototype` 和 `Function.__proto__ `同时指向内置匿名函数 `anonymous`，这样原型链的终点就是 `null`



## 三、总结

下面首先要看几个概念：

`__proto__`作为不同对象之间的桥梁，用来指向创建它的构造函数的原型对象的

 ![](https://static.ecool.fun//article/0c2d0d47-2b06-43ed-92e4-129425b6af0c.png)

每个对象的`__proto__`都是指向它的构造函数的原型对象`prototype`的

```js
```

```js
```

```js
```

```js
```

```js
```

- 一切对象都是继承自`Object`对象，`Object` 对象直接继承根源对象` null`

- 一切的函数对象（包括 `Object` 对象），都是继承自 `Function` 对象

- `Object` 对象直接继承自 `Function` 对象

- `Function`对象的`__proto__`会指向自己的原型对象，最终还是继承自`Object`对象
