---
level: 1
---

# 如果空数组调用reduce会发生什么？

## 参考答案

当空数组调用`reduce()`方法时，如果没有提供初始值参数，则会抛出一个`TypeError`错误。这是因为在空数组上调用`reduce()`方法时，无法得到初始累积值。

例如：

```javascript
const result = emptyArray.reduce((accumulator, currentValue) => accumulator + currentValue);
// TypeError: Reduce of empty array with no initial value
```

以下是对空数组使用`reduce()`并提供初始值的示例：

```javascript
const initialValue = 0;
const result = emptyArray.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);

console.log(result); // 输出: 0
```
