---
level: 3
---

# Object.create 和 new 有什么区别？

## 题目要点

- **`Object.create`** 主要用于基于一个现有对象创建一个新对象，设置其原型，并可以指定新的属性。它不涉及构造函数的执行。
- **`new`** 用于创建构造函数的实例，执行构造函数的逻辑，并将新对象的原型链接到构造函数的 `prototype` 上。

## 参考答案

js中创建对象的方式一般有两种Object.create和new

```javascript
const o1 = Object.create(Base);
const o2 = new Base();
```

* 构造函数Foo的原型属性Foo.prototype指向了原型对象。
* 原型对象保存着实例共享的方法，有一个指针constructor指回构造函数。
* js中只有函数有 prototype 属性，所有的对象只有 __proto__ 隐式属性。

那这样到底有什么不一样呢？

## Object.create

先来看看 `Object.create` 的实现方式

```javascript
    var F = function () {};
    F.prototype = o;
    return new F();
};
```

## new

再看看 `const o2 = new Base()` 的时候，new做了什么。

```javascript
o1.[[Prototype]] = Base.prototype;
Base.call(o1);
```

## 区别

看似是一样的。我们对原来的代码进行改进一下。

```javascript
    this.a = 2
}
var o1 = new Base();
var o2 = Object.create(Base);
console.log(o1.a); // 2
console.log(o2.a); // undefined
```

再进行下改造：
```javascript
    this.a = 2
}
Base.prototype.a = 3;
var o1 = new Base();
var o2 = Object.create(Base);
console.log(o1.a); // 2
console.log(o2.a); // undefined
```

小结

|比较|new|Object.create|
|--|--|--|
|构造函数|保留原构造函数属性|丢失原构造函数属性|
|原型链|原构造函数prototype属性|原构造函数/（对象）本身|
|作用对象|function|function和object|
