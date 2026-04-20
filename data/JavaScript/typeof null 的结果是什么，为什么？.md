---
level: 0.5
---

# typeof null 的结果是什么，为什么？

## 题目要点

`typeof null` 返回 `"object"` 是由于 JavaScript 语言早期设计的一个历史遗留问题。这一行为尽管不符合直觉，但它已成为语言的一部分，保持这种行为有助于确保旧代码的兼容性。

## 参考答案

`typeof null` 的结果是 `"object"`。这是一个 JavaScript 的古老错误，源于语言的早期实现。

### 原因

- **历史原因**：
  - 在 JavaScript 的早期版本中，`null` 的内部表示被实现为一个空对象指针（即所有位都为0）。在 `typeof` 操作符的实现中，空对象的类型被标记为 `"object"`，因此 `typeof null` 也返回 `"object"`。

- **语言规范**：
  - 这个行为是 ECMAScript 规范的一部分，尽管这是一个已知的错误，但为了兼容性和避免破坏旧代码，JavaScript 继续保持这个行为。

### 示例

```javascript
```
