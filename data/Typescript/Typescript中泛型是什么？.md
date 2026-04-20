---
level: 2.5
---

# Typescript中泛型是什么？

## 题目要点

**作答思路：**

在TypeScript中，泛型（Generics）是一种编程技术，允许你创建可重用的组件，这些组件可以处理多种数据类型。泛型允许你在不指定具体类型的情况下定义函数、类或接口，从而提高代码的复用性和可维护性。

**考察要点**：

1. **泛型概念**：理解泛型的基本概念和用途。
2. **使用方式**：了解如何在TypeScript中使用泛型。

## 参考答案

## 一、是什么

泛型程序设计（generic programming）是程序设计语言的一种风格或范式

泛型允许我们在强类型程序设计语言中编写代码时使用一些以后才指定的类型，在实例化时作为参数指明这些类型
在`typescript`中，定义函数，接口或者类的时候，不预先定义好具体的类型，而在使用的时候在指定类型的一种特性

假设我们用一个函数，它可接受一个 `number` 参数并返回一个` number` 参数，如下写法：

```ts
    return para
}
```

```ts
    return para
}
```

虽然可以使用 `any`类型去替代，但这也并不是很好的方案，因为我们的目的是接收什么类型的参数返回什么类型的参数，即在运行时传入参数我们才能确定类型

这种情况就可以使用泛型，如下所示：

```ts
    return para
}
```



## 二、使用方式

泛型通过`<>`的形式进行表述，可以声明：

- 函数

- 接口
- 类



### 函数声明

声明函数的形式如下：

```ts
    return para
}
```

```ts
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```

声明接口的形式如下：

```ts
    (para: T): T
}
```

```ts
```

### 类声明

使用泛型声明类的时候，既可以作用于类本身，也可以作用与类的成员函数

下面简单实现一个元素同类型的栈结构，如下所示：

```ts
    private arr: T[] = []

    public push(item: T) {
        this.arr.push(item)
    }

    public pop() {
        this.arr.pop()
    }
}
```

```ts
```

 ![](https://static.ecool.fun//article/fab37f80-c8f9-48a9-ba72-2aa8c3af6b00.png)





除了上述的形式，泛型更高级的使用如下：

例如要设计一个函数，这个函数接受两个参数，一个参数为对象，另一个参数为对象上的属性，我们通过这两个参数返回这个属性的值

这时候就设计到泛型的索引类型和约束类型共同实现

### 索引类型、约束类型

索引类型 `keyof T` 把传入的对象的属性类型取出生成一个联合类型，这里的泛型 U 被约束在这个联合类型中，如下所示：

```ts
  return obj[key] // ok
}
```

使用如下图所示：

 ![](https://static.ecool.fun//article/19ea7bdd-176b-4db7-9bdb-72d1318c6fea.png)





### 多类型约束

例如如下需要实现两个接口的类型约束：

```ts
  doSomething(): number
}

interface SecondInterface {
  doSomethingElse(): string
}

```

```ts

}
```

```ts
  private genericProperty: T

  constructor(genericProperty: T) {
    this.genericProperty = genericProperty
  }
  useT() {
    this.genericProperty.doSomething()
    this.genericProperty.doSomethingElse()
  }
}
```



## 三、应用场景

通过上面初步的了解，后述在编写 `typescript` 的时候，定义函数，接口或者类的时候，不预先定义好具体的类型，而在使用的时候在指定类型的一种特性的时候，这种情况下就可以使用泛型

灵活的使用泛型定义类型，是掌握`typescript` 必经之路
