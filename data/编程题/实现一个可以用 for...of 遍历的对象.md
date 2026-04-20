---
level: 2.5
---

# 实现一个可以用 for...of 遍历的对象

## 参考答案

要实现一个可以使用 `for...of` 遍历的对象，你需要使该对象符合 JavaScript 的迭代协议。这意味着对象必须有一个 `[Symbol.iterator]` 方法，该方法返回一个迭代器。迭代器需要实现 `next` 方法，该方法返回一个对象，包含两个属性：`value`（当前值）和 `done`（布尔值，表示是否遍历结束）。

下面是一个简单的示例，展示了如何实现一个可以使用 `for...of` 遍历的对象：

### **实现示例**

```javascript
class IterableObject {
  constructor(elements) {
    this.elements = elements;
  }

  // 实现 [Symbol.iterator] 方法，返回一个迭代器
  [Symbol.iterator]() {
    let index = 0;
    const elements = this.elements;

    // 返回一个迭代器
    return {
      next() {
        if (index < elements.length) {
          // 返回一个对象，包含 value 和 done 属性
          return { value: elements[index++], done: false };
        } else {
          // 遍历结束
          return { value: undefined, done: true };
        }
      }
    };
  }
}

// 使用示例
const obj = new IterableObject([1, 2, 3, 4, 5]);

for (const value of obj) {
  console.log(value); // 输出 1, 2, 3, 4, 5
}
```

1. **`IterableObject` 类**：
   - 这个类包含一个构造函数，用于初始化要迭代的元素。
   - 实现了 `Symbol.iterator` 方法，该方法返回一个迭代器对象。

2. **`Symbol.iterator` 方法**：
   - 返回一个对象，该对象具有 `next` 方法。
   - `next` 方法用于逐个返回元素。每次调用 `next` 返回一个包含 `value` 和 `done` 属性的对象。
   - `done` 为 `true` 时表示迭代完成，`value` 为 `undefined`。

3. **`for...of` 循环**：
   - 使用 `for...of` 遍历 `IterableObject` 实例时，实际上调用了 `Symbol.iterator` 方法，获取迭代器并逐个获取值直到 `done` 为 `true`。

通过实现这些方法，你可以让对象与 JavaScript 的迭代协议兼容，从而可以使用 `for...of` 遍历该对象的元素。
