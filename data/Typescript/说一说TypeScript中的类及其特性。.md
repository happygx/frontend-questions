---
level: 2.5
---

# 说一说TypeScript中的类及其特性。

## 题目要点

**作答思路：**

在TypeScript中，类（Class）是面向对象编程的基础，用于创建具有属性和方法的抽象实体。类具有以下特性：

1. **属性**：类可以定义私有、公共或受保护的属性，用于存储数据。
2. **方法**：类可以定义私有、公共或受保护的方法，用于执行操作。
3. **继承**：类可以继承另一个类，子类可以重写父类的方法。
4. **构造函数**：类有一个构造函数，用于初始化类的实例。
5. **静态属性**：类可以定义静态属性，这些属性属于类本身，而不是类的实例。
6. **静态方法**：类可以定义静态方法，这些方法也属于类本身，而不是类的实例。
7. **抽象类**：抽象类不能被实例化，主要用于定义继承关系。

**考察要点**：

1. **类的基本概念**：理解类在面向对象编程中的基本概念和用途。
2. **属性和方法**：了解如何在类中定义属性和方法。
3. **继承和抽象类**：理解类在继承和抽象类方面的特性。

## 参考答案

TypeScript 引入了类，以便它们可以利用诸如封装和抽象之类的面向对象技术的好处。

TypeScript 编译器将 TypeScript 中的类编译为普通的 JavaScript 函数，以跨平台和浏览器工作。

一个类包括以下内容：

* 构造器（Constructor）
* 属性（Properties）
* 方法（Methods）

```
    empID: number;
    empName: string;
 
    constructor(ID: number, name: string) {
        this.empName = name;
        this.empID = ID;
    }
 
    getSalary(): number {
        return 40000;
    }
}
```

* 继承（Inheritance）
* 封装（Encapsulation）
* 多态（Polymorphism）
* 抽象（Abstraction）
