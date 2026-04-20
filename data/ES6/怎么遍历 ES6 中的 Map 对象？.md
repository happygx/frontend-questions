---
level: 0.5
---

# 怎么遍历 ES6 中的 Map 对象？

## 题目要点

- **`forEach()`**：适用于在遍历时执行某些操作，接收 `value`、`key` 和 `Map` 本身作为参数。
- **`for...of`**：适用于更加灵活的遍历，支持 `Map` 的 `entries()`、`keys()` 和 `values()` 方法。
- **`keys()`**、**`values()`**、**`entries()`**：分别用于遍历键、值或键值对。

## 参考答案

在 ES6 中，`Map` 是一种新的集合类型，它存储键值对（key-value pairs），与对象不同的是，`Map` 的键可以是任何类型（不仅仅是字符串），并且键值对的顺序是有序的。

要遍历 `Map` 对象，可以使用以下几种方法：

### 1. **使用 `forEach()` 方法**
`Map` 具有 `forEach()` 方法，它接受一个回调函数，回调函数会接收三个参数：`value`（值），`key`（键），以及 `Map` 本身。

```javascript
  ['a', 1],
  ['b', 2],
  ['c', 3]
]);

myMap.forEach((value, key) => {
  console.log(key, value);  // 输出：a 1, b 2, c 3
});
```
`Map` 是可迭代的，可以直接使用 `for...of` 循环进行遍历。默认情况下，`Map` 会按 `[key, value]` 的形式返回每个元素。

```javascript
  ['a', 1],
  ['b', 2],
  ['c', 3]
]);

for (let [key, value] of myMap) {
  console.log(key, value);  // 输出：a 1, b 2, c 3
}
```
`keys()` 方法返回一个包含所有键的迭代器，可以用 `for...of` 循环遍历这些键。

```javascript
  ['a', 1],
  ['b', 2],
  ['c', 3]
]);

for (let key of myMap.keys()) {
  console.log(key);  // 输出：a, b, c
}
```
`values()` 方法返回一个包含所有值的迭代器，可以用 `for...of` 循环遍历这些值。

```javascript
  ['a', 1],
  ['b', 2],
  ['c', 3]
]);

for (let value of myMap.values()) {
  console.log(value);  // 输出：1, 2, 3
}
```
`entries()` 方法返回一个包含 `[key, value]` 键值对的迭代器，可以用 `for...of` 循环遍历这些键值对。

```javascript
  ['a', 1],
  ['b', 2],
  ['c', 3]
]);

for (let [key, value] of myMap.entries()) {
  console.log(key, value);  // 输出：a 1, b 2, c 3
}
```
