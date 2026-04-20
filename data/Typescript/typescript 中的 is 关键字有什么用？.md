---
level: 3
---

# typescript 中的 is 关键字有什么用？

## 题目要点

**作答思路：**

在TypeScript中，`is`关键字通常与类型保护（Type Guards）一起使用，用于确定一个值是否属于某种类型。它允许你安全地检查一个变量是否属于某种类型，而不是假设它是该类型。

**考察要点**：

1. **类型保护**：理解类型保护的作用和用途。
2. **is关键字用法**：了解如何使用`is`关键字进行类型保护。

## 参考答案

TypeScript 中的 `is` 关键字用于类型保护，可以在运行时判断一个对象是否属于某个类型，并根据不同的类型执行不同的逻辑。

具体来说，`is` 关键字通常和 `instanceof` 运算符一起使用，用于判断一个对象是否是某个类的实例。例如：

```typescript
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

function isDog(animal: Animal): animal is Dog {
    return (animal as Dog).breed !== undefined;
}

let a1 = new Animal("Tom");
let d1 = new Dog("Tony", "Poodle");

console.log(isDog(a1));  // false
console.log(isDog(d1));  // true
```

在 `isDog` 函数中，我们通过判断传入的 `animal` 参数是否含有 `breed` 属性，来判断它是否是 `Dog` 类型的实例。如果是，则返回 `true`；否则返回 `false`。

最后，我们可以通过调用 `isDog` 函数来判断一个对象是否是 `Dog` 类型的实例，并根据不同的类型执行相应的逻辑。
