---
level: 3
---

# 说说 Class 语法糖的底层实现

## 题目要点

class 是基于函数构造器和原型链的语法封装，实例方法本质挂载在 prototype 上，继承通过 Object.create 构建原型链，同时通过构造函数原型链继承静态方法。super 依赖内部 [[HomeObject]] 机制定位父类方法。class 并未引入新的对象模型，而是在原型继承基础上增加语义约束与语法增强。

## 参考答案

这个问题的关键在于理解：`class` 并不是一种新的面向对象机制，而是对 **原型继承（prototype-based inheritance）** 的语法封装。底层仍然是函数构造器 + 原型链。

如果把 `class` 当作 Java 那种基于类的模型去理解，就会产生误解。

---

先看一个简单例子：

```js
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(this.name);
  }

  static create(name) {
    return new Person(name);
  }
}
```

```js
  this.name = name;
}

Person.prototype.say = function () {
  console.log(this.name);
};

Person.create = function (name) {
  return new Person(name);
};
```

一、实例方法的实现

类中的方法：

```js
```

并且具有几个默认特性：

* 不可枚举（enumerable: false）
* 可写（writable: true）
* 可配置（configurable: true）

这和直接给 prototype 赋值略有区别，因为手动赋值默认是可枚举的。

---

二、constructor 的本质

`constructor` 本质仍然是一个函数。

但 `class` 定义的构造函数有两个特殊点：

1. 不能作为普通函数调用

   ```js
   Person(); // 报错
   ```

   必须通过 `new`。

2. 默认开启严格模式（strict mode）

这是和 ES5 构造函数的重要差异。

---

三、继承的底层实现

```js
  constructor(name, grade) {
    super(name);
    this.grade = grade;
  }
}
```

```js
  Person.call(this, name);
  this.grade = grade;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

// 继承静态方法
Object.setPrototypeOf(Student, Person);
```

1. 实例继承链：
   Student.prototype → Person.prototype

2. 构造函数继承链（静态方法继承）：
   Student → Person

很多人只记得 prototype 继承，忽略了构造函数本身的原型链。

---

四、super 的底层机制

`super` 并不是简单的 `Parent.prototype.method.call(this)`。

它依赖于一个内部机制：

[[HomeObject]]

当方法定义在 class 内部时，会隐式绑定一个 HomeObject，用于在运行时确定“当前方法属于哪个对象”，从而正确查找父类方法。

这也是为什么下面写法不能正确使用 super：

```js
  method() {}
};
```

---

五、class 的一些“语法层面增强”

虽然本质还是原型，但 class 增加了一些语义约束：

* 方法默认不可枚举
* 必须使用 new
* 自动严格模式
* 支持 static 方法
* 支持 getter / setter
* 支持私有字段（#field）

尤其是私有字段：

```js
  #x = 1;
}
```

---

六、为什么说它是“语法糖”

因为：

* 实例仍然是对象
* 继承仍然是原型链
* 方法仍然挂在 prototype 上
* 构造器本质仍然是函数

class 并没有引入新的对象模型，只是让语法更接近传统面向对象语言，同时补充了一些约束与语义增强。

---

七、工程理解层面

理解 class 的底层实现非常重要，因为很多问题本质都是原型链问题：

* 方法查找路径
* instanceof 判断机制
* 静态方法继承
* super 调用行为
* this 绑定

如果只停留在 class 表层语法，很难排查继承链相关问题。
