---
level: 2.5
---

# JS 中如何实现大对象深度对比

## 题目要点

- **递归方法**：适合对比一般对象，能够控制对比过程，但实现复杂度较高。
- **`JSON.stringify()`**：实现简单，但有一定局限性，不支持特殊值、顺序敏感。
- **第三方库**：推荐使用 Lodash 或 `fast-deep-equal`，性能高、功能全面，适合处理复杂对象。

## 参考答案

深度对比两个大对象意味着要递归地比较对象中的所有属性，包括嵌套的对象和数组。由于 JavaScript 的对象是引用类型，我们需要比较对象的每个属性的值，而不仅仅是引用。

有以下几种方法来实现深度对比：

### **1. 使用递归实现深度对比**
通过递归遍历对象的每一层，比较它们的值，如果遇到嵌套的对象或数组，则继续递归比较。

#### 示例代码：
```javascript
  // 如果两个对象引用相同，直接返回 true
  if (obj1 === obj2) return true;

  // 如果两个不是对象或其中一个是 null，返回 false
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  // 获取对象的所有属性名
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  // 如果对象的属性数不同，返回 false
  if (keys1.length !== keys2.length) return false;

  // 递归对比每个属性
  for (let key of keys1) {
    if (!keys2.includes(key)) {
      return false; // 如果 obj2 中没有这个属性，返回 false
    }
    if (!deepEqual(obj1[key], obj2[key])) {
      return false; // 如果属性的值不同，返回 false
    }
  }

  return true;
}

// 示例
const obj1 = { a: 1, b: { x: 10, y: 20 }, c: [1, 2, 3] };
const obj2 = { a: 1, b: { x: 10, y: 20 }, c: [1, 2, 3] };
const obj3 = { a: 1, b: { x: 10, y: 30 }, c: [1, 2, 3] };

console.log(deepEqual(obj1, obj2)); // true
console.log(deepEqual(obj1, obj3)); // false
```
- 首先判断 `obj1` 和 `obj2` 是否完全相等（包括引用类型的比较）。
- 如果有一个是基本类型（非对象），直接返回 `false`。
- 然后比较对象的属性数量，如果数量不等，直接返回 `false`。
- 最后，递归比较对象每一层的属性值，直到底层属性对比完成。

---

### **2. 使用 `JSON.stringify()` 方法实现深度对比**
这种方法将对象转为 JSON 字符串，再进行比较。简单高效，但有一定的局限性：
- **限制**：无法处理 `undefined`、`function`、`symbol` 等特殊值，且顺序不同的对象属性会导致不同的字符串。

#### 示例代码：
```javascript
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// 示例
const obj1 = { a: 1, b: { x: 10, y: 20 }, c: [1, 2, 3] };
const obj2 = { a: 1, b: { x: 10, y: 20 }, c: [1, 2, 3] };
const obj3 = { a: 1, b: { x: 10, y: 30 }, c: [1, 2, 3] };

console.log(deepEqualJSON(obj1, obj2)); // true
console.log(deepEqualJSON(obj1, obj3)); // false
```
- `JSON.stringify()` 将对象转换为 JSON 字符串，简单地进行字符串比较。
- **注意**：该方法对于循环引用、`undefined`、`function` 等值有一定局限，且对象的键值顺序会影响结果。

---

### **3. 使用第三方库**
有很多第三方库提供了更为高效且全面的深度比较功能。例如：
- **Lodash** 提供了 `_.isEqual()` 方法。
- **Fast-deep-equal** 是一个专门用于深度对比的小型库，性能较高。

#### 示例：使用 Lodash
```javascript
// npm install lodash

const _ = require('lodash');

const obj1 = { a: 1, b: { x: 10, y: 20 }, c: [1, 2, 3] };
const obj2 = { a: 1, b: { x: 10, y: 20 }, c: [1, 2, 3] };
const obj3 = { a: 1, b: { x: 10, y: 30 }, c: [1, 2, 3] };

console.log(_.isEqual(obj1, obj2)); // true
console.log(_.isEqual(obj1, obj3)); // false
```
```javascript
// npm install fast-deep-equal

const deepEqual = require('fast-deep-equal');

const obj1 = { a: 1, b: { x: 10, y: 20 }, c: [1, 2, 3] };
const obj2 = { a: 1, b: { x: 10, y: 20 }, c: [1, 2, 3] };
const obj3 = { a: 1, b: { x: 10, y: 30 }, c: [1, 2, 3] };

console.log(deepEqual(obj1, obj2)); // true
console.log(deepEqual(obj1, obj3)); // false
```
- 使用 Lodash 或 `fast-deep-equal` 可以避免手动实现深度对比，性能较好，且支持更多复杂场景（如日期、循环引用等）。
