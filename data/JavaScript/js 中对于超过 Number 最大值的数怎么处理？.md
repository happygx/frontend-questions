---
level: 1.5
---

# js 中对于超过 Number 最大值的数怎么处理？

## 题目要点

- **`Infinity`**：表示超过最大值的数。
- **`BigInt`**：用于处理超大整数值。
- **字符串表示法**：用于表示和操作极大数值。
- **大数库**：提供更强大和精确的数值计算能力。

## 参考答案

在 JavaScript 中，`Number` 类型的最大值为 `Number.MAX_VALUE`。当计算结果超过这个最大值时，会出现以下情况：

### **1. 使用 `Infinity`**

- **描述**：当计算结果超出 `Number.MAX_VALUE`，JavaScript 会返回 `Infinity`。
- **示例**：
  ```javascript
  const largeNumber = Number.MAX_VALUE * 2; // 结果是 Infinity
  console.log(largeNumber); // Infinity
  ```

### **2. 使用 `BigInt`**

- **描述**：`BigInt` 是一种新的原生数据类型，可以表示任意精度的整数。适用于处理超出 `Number` 最大值的数值。
- **使用方法**：
  ```javascript
  const bigNumber = BigInt("123456789012345678901234567890");
  console.log(bigNumber); // 123456789012345678901234567890n
  ```

- **与 `Number` 的区别**：
  - `BigInt` 可以表示比 `Number` 更大的整数值，但不支持小数。
  - `BigInt` 与 `Number` 类型在操作和比较时需注意不同，`BigInt` 与 `Number` 不能直接进行算术运算。

### **3. 使用字符串表示法**

- **描述**：当处理极大的数值时，可以使用字符串来表示和操作这些数值，避免直接计算。
- **示例**：
  ```javascript
  const bigNumberStr = "123456789012345678901234567890";
  // 使用自定义函数或库来进行大数运算
  ```

### **4. 使用专门的大数库**

- **描述**：有一些 JavaScript 库专门用于处理大数运算，比如 `bignumber.js`、`decimal.js`。
- **示例**：
  ```javascript
  const BigNumber = require('bignumber.js');
  const largeNumber = new BigNumber('123456789012345678901234567890');
  console.log(largeNumber.toString()); // 123456789012345678901234567890
  ```
