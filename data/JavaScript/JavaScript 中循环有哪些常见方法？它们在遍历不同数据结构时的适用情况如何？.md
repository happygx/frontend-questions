---
level: 1
---

# JavaScript 中循环有哪些常见方法？它们在遍历不同数据结构时的适用情况如何？

## 题目要点

| 方法                          | 适用数据结构                | 是否可提前退出    | 是否返回新值 | 特点            |
| --------------------------- | --------------------- | ---------- | ------ | ------------- |
| `for` / `while`             | 数组、类数组、任意             | ✅          | ❌      | 灵活、可控，效率高     |
| `for...in`                  | 对象（属性遍历）              | ✅          | ❌      | 包含原型链属性，数组不推荐 |
| `for...of`                  | 可迭代对象（数组、Set、Map、字符串） | ✅          | ❌      | 直接拿值，简洁       |
| `forEach`                   | 数组、Set、Map            | ❌          | ❌      | 不能中断，简洁       |
| `map` / `filter` / `reduce` | 数组                    | ❌          | ✅      | 函数式编程，链式调用    |
| `some` / `every`            | 数组                    | ✅（条件满足即退出） | ✅（布尔值） | 条件判断方便        |

要点：
* **操作对象属性** → 用 `for...in`。
* **操作可迭代对象** → 用 `for...of`。
* **数组处理** → 优先用数组方法（`map`、`filter`、`reduce`）。
* **需要最大灵活性** → 用 `for` 或 `while`。

## 参考答案

在 JavaScript 中，循环方式非常多，不同的数据结构和场景适合使用不同的循环。常见方法主要可以分为 **传统循环**、**for-in / for-of**、**数组专用遍历方法** 三类。

---

## 1. 传统循环

### `for` 循环

```js
  console.log(arr[i]);
}
```
* **特点**：灵活，可以随时 `break`、`continue`，可控制起始、步长。

### `while` 循环

```js
while (i < arr.length) {
  console.log(arr[i]);
  i++;
}
```
* **特点**：写法简洁，可能出现死循环风险。

### `do...while`

```js
do {
  console.log(arr[i]);
  i++;
} while (i < arr.length);
```

---

## 2. `for...in` 和 `for...of`

### `for...in`

```js
for (let key in obj) {
  console.log(key, obj[key]);
}
```
* **注意**：不推荐用于数组（顺序不可控，还会遍历自定义属性）。

### `for...of`

```js
for (let value of arr) {
  console.log(value);
}
```
* **特点**：直接拿到值，比 `for...in` 更适合数组。
* **局限**：不能直接遍历普通对象（对象默认不可迭代）。

---

## 3. 数组专用方法

### `forEach`

```js
```
* **特点**：简洁、可读性好。
* **局限**：不能 `break` 或 `return` 提前退出（只能用 `throw` hack）。

### `map`

```js
```
* **特点**：返回新数组，不改变原数组。

### `filter`

```js
```

### `reduce`

```js
```

### `some` / `every`

```js
arr.every(v => v > 0);  // 是否所有元素都大于0
```

### `find` / `findIndex`

```js
arr.findIndex(v => v > 10); // 返回下标
```

## 4. 特殊结构

### `forEach` + `Map` / `Set`

```js
set.forEach(v => console.log(v));

const map = new Map([["a", 1], ["b", 2]]);
map.forEach((value, key) => console.log(key, value));
```

```js
  console.log(key, value);
}
```
