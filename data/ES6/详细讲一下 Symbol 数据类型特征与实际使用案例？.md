---
level: 3
---

# 详细讲一下 Symbol 数据类型特征与实际使用案例？

## 题目要点

`Symbol` 提供了一种创建唯一标识符的方法，解决了对象属性名冲突的问题，并可用于定义特定的对象行为。它具有唯一性、不可变性和隐私性，在现代 JavaScript 编程中，用于增强对象和类的功能，定义和处理内置对象的特殊行为，以及在应用中创建更健壮的代码。

## 参考答案

`Symbol` 是 ES6 引入的一种基本数据类型，它用于创建唯一且不可变的值。它主要用于解决对象属性的命名冲突问题。以下是 `Symbol` 的主要特征和实际使用案例：

### **1. 特征**

**1.1 唯一性**

每个 `Symbol` 值都是唯一的，即使它们具有相同的描述。两个不同的 `Symbol` 对象即使描述相同，也不会相等。

```javascript
const sym2 = Symbol('description');

console.log(sym1 === sym2); // false
```

`Symbol` 的值是不可变的，一旦创建，就不能改变。

**1.3 隐私性**

`Symbol` 属性不容易与其他属性冲突，因为每个 `Symbol` 都是唯一的。它们不会被 `for...in` 循环、`Object.keys()` 或 `JSON.stringify()` 处理，但可以通过 `Object.getOwnPropertySymbols()` 获取。

### **2. 创建 Symbol**

使用 `Symbol()` 函数创建 Symbol：

```javascript
console.log(sym); // Symbol(description)
```

**3.1 用作对象属性的唯一标识符**

`Symbol` 可以用作对象的属性键，避免属性名冲突。

```javascript

const obj = {
  [mySymbol]: 'value'
};

console.log(obj[mySymbol]); // 'value'
```

使用 `Symbol` 可以定义对象的“私有”属性，这些属性不会被意外覆盖或枚举到。

```javascript

class MyClass {
  constructor(value) {
    this[privateProp] = value;
  }

  getPrivate() {
    return this[privateProp];
  }
}

const instance = new MyClass('secret');
console.log(instance.getPrivate()); // 'secret'
console.log(instance[privateProp]); // 'secret' (if you have the Symbol reference)
```

JavaScript 内置对象（如 `Object`, `Array`, `String` 等）有一些 Symbol 属性，用于定义特定行为或协议。

- **`Symbol.iterator`**：定义对象的默认迭代器，用于 `for...of` 循环。

```javascript
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
};

for (const value of iterable) {
  console.log(value); // 1, 2, 3
}
```

```javascript
  [Symbol.toStringTag]: 'MyObject'
};

console.log(Object.prototype.toString.call(obj)); // [object MyObject]
```

```javascript
  static [Symbol.hasInstance](instance) {
    return instance instanceof Array;
  }
}

console.log([] instanceof MyClass); // true
console.log({} instanceof MyClass); // false
```

```javascript
  [Symbol.toPrimitive](hint) {
    if (hint === 'string') return 'string representation';
    if (hint === 'number') return 42;
    return 'default representation';
  }
};

console.log(String(obj)); // 'string representation'
console.log(Number(obj)); // 42
console.log(+obj + 1); // 43
```

**4.1 扩展对象的行为**

`Symbol` 还可以与其他 ES6 特性组合使用，例如 Proxy 和 Reflect API 来扩展对象行为。

**示例代码**：

```javascript
  get(target, prop, receiver) {
    if (prop === Symbol.toStringTag) {
      return 'CustomObject';
    }
    return Reflect.get(target, prop, receiver);
  }
};

const proxy = new Proxy({}, handler);
console.log(Object.prototype.toString.call(proxy)); // [object CustomObject]
```
