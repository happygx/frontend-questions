---
level: 2
---

# 如何使用 WeakMap 封装私有属性？

## 题目要点

* `WeakMap` 可将私有属性绑定到类实例，外部无法访问，天然封装；
* 利用弱引用，能自动随实例被销毁而释放内存；
* 是一种兼容性好、安全性高的私有数据封装方式；
* 在需要封装对象状态又不引入内存风险时非常实用。

## 参考答案

使用 `WeakMap` 封装私有属性是一种经典的“闭包 + 弱引用”技巧。它的核心目的是为每个对象实例存储一份外部不可访问的私有数据，同时不引发内存泄漏。这种方式比传统的前缀 `_`、或者 `Symbol` 命名更安全，并且不需要使用 ES2022 的 `#私有字段` 语法，在旧环境中依然适用。

### 一、基本原理

* 创建一个 `WeakMap` 实例 `privateData`；
* 每个类实例作为 `WeakMap` 的键，对应一个私有数据对象；
* 外部无法直接访问 `privateData`，因为它在模块作用域内，无法被引用；
* 当对象实例被销毁时，对应的私有数据也会被自动释放。

### 二、示例代码：封装私有属性

```js

class Person {
  constructor(name, age) {
    // 初始化私有数据
    privateData.set(this, { name, age });
  }

  getName() {
    return privateData.get(this).name;
  }

  setName(newName) {
    privateData.get(this).name = newName;
  }

  getAge() {
    return privateData.get(this).age;
  }
}
```

```js
console.log(p.getName()); // Alice
p.setName('Bob');
console.log(p.getName()); // Bob

console.log(p.name); // undefined，外部无法访问
```

1. **私有性强**
   外部无法通过任何方式访问 `privateData`，除非获得对它本身的引用。

2. **不污染实例属性**
   `this` 上没有暴露任何私有字段。

3. **内存安全**
   使用 `WeakMap` 的弱引用特性，当类实例没有外部引用时，相关私有数据会自动被 GC 回收。


### 四、应用场景

* 实现类中的私有状态或缓存；
* 在框架或 SDK 中构建对外不可暴露的状态；
* 实现封装性更强的库组件（如 DOM 组件内部状态管理）；
* 给第三方对象动态挂载私有数据，不影响其原型结构。


### 五、局限与注意事项

* 不能在类的静态方法中直接访问 `privateData`，因为没有 `this` 实例；
* 访问和修改私有属性需要显式使用 `get()` / `set()`，不如 `#私有字段` 语法直观；
* 仅适合类级别的封装，不适合导出后希望每个模块共享的私有数据（这反而可以用 `Map`）。
