---
level: 1
---

# 在 DOM 中，如何判定 a 元素是否是 b 元素的子元素？

## 题目要点

- 推荐使用 `b.contains(a)`，语义清晰，兼容性好。
- `compareDocumentPosition` 更细粒度，适合需要精确判断各种节点关系的场景。

## 参考答案

在 DOM 中，可以使用 `Node.contains()` 或 `Node.compareDocumentPosition()` 方法判断元素之间的包含关系。

---

### 方法一：`contains`

```js
```

```js
const b = document.querySelector('#parent');
console.log(b.contains(a)); // true 表示 a 是 b 的子元素或后代
```

### 方法二：`compareDocumentPosition`

```js
```
