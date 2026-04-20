---
level: 1
---

# 怎么遍历 ES6 中的 Set 对象？

## 题目要点

- `Set` 可以通过 `forEach()`、`for...of`、`values()`、`keys()` 和 `entries()` 等方法进行遍历。
- 其中，`for...of` 和 `forEach()` 是最常用的遍历方式。

## 参考答案

`Set` 是一个集合类型，它类似于数组，但具有以下特点：
- 每个元素都是唯一的。
- 元素的顺序是根据插入的顺序来保持的。

要遍历 `Set` 对象，可以使用以下几种方法：

### 1. **使用 `forEach()` 方法**
`Set` 具有 `forEach()` 方法，它接受一个回调函数，在每次迭代时会传入当前的值、值本身和 `Set` 本身。

```javascript

mySet.forEach(value => {
  console.log(value);  // 输出：1, 2, 3, 4
});
```
`Set` 是可迭代的，因此可以直接使用 `for...of` 循环遍历其元素。

```javascript

for (let value of mySet) {
  console.log(value);  // 输出：1, 2, 3, 4
}
```
`Set` 对象有一个 `values()` 方法，它返回一个新的 `Set` 对象的迭代器。实际上，`values()` 和 `keys()` 返回的迭代器是相同的，因为 `Set` 中的元素没有键（键和值都是元素本身）。

```javascript

for (let value of mySet.values()) {
  console.log(value);  // 输出：1, 2, 3, 4
}
```
`Set` 的 `keys()` 方法与 `values()` 方法相同，它返回一个包含 `Set` 元素的迭代器。

```javascript

for (let value of mySet.keys()) {
  console.log(value);  // 输出：1, 2, 3, 4
}
```
`entries()` 方法返回一个包含 `Set` 元素的 `[value, value]` 键值对的迭代器，尽管在 `Set` 中没有键，但返回的数组形式仍然是 `[value, value]`。

```javascript

for (let [key, value] of mySet.entries()) {
  console.log(value);  // 输出：1, 2, 3, 4
}
```
