---
level: 3.5
---

# 如何使对象 iterable 化， 使其可以支持 for...of 迭代

## 题目要点

通过在对象中实现 `Symbol.iterator` 方法，可以使对象变得可迭代，从而支持 `for...of` 循环。`Symbol.iterator` 方法返回一个迭代器对象，该对象需要实现 `next` 方法，返回 `{ value, done }` 结构。生成器函数是简化迭代器实现的一种便利方式。

## 参考答案

要使对象支持 `for...of` 迭代，你需要使该对象具有符合迭代协议的迭代器。实现这一点的方法是为对象定义一个名为 `Symbol.iterator` 的方法。这个方法应该返回一个迭代器对象，迭代器对象必须有一个 `next` 方法，该方法返回一个对象，其中包含 `value` 和 `done` 属性。

以下是实现过程的步骤和示例代码：

### **1. 实现 `Symbol.iterator` 方法**

**1.1 定义迭代器对象**

迭代器对象需要实现 `next` 方法，`next` 方法返回一个对象，包含两个属性：

- `value`：当前的值。
- `done`：一个布尔值，指示迭代是否完成。

**1.2 在对象中实现 `Symbol.iterator`**

将 `Symbol.iterator` 方法定义在对象上，这样对象就变成了可迭代的。

### **示例代码**

**示例 1: 基本对象**

```javascript
  items: ['a', 'b', 'c'],
  [Symbol.iterator]() {
    let index = 0;
    const items = this.items;
    return {
      next() {
        if (index < items.length) {
          return { value: items[index++], done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// 使用 for...of 进行迭代
for (const item of myObject) {
  console.log(item); // 'a', 'b', 'c'
}
```

```javascript
  return {
    start: 1,
    end: 5,
    [Symbol.iterator]() {
      let current = this.start;
      const end = this.end;
      return {
        next() {
          if (current <= end) {
            return { value: current++, done: false };
          } else {
            return { done: true };
          }
        }
      };
    }
  };
}

const iterableObject = createIterableObject();

// 使用 for...of 进行迭代
for (const num of iterableObject) {
  console.log(num); // 1, 2, 3, 4, 5
}
```

- **生成器**：生成器函数（`function*`）可以更方便地创建可迭代对象，它自动实现了 `Symbol.iterator` 方法，并简化了迭代器的代码。

**示例 3: 使用生成器**

```javascript
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const iterableObject = range(1, 5);

// 使用 for...of 进行迭代
for (const num of iterableObject) {
  console.log(num); // 1, 2, 3, 4, 5
}
```
