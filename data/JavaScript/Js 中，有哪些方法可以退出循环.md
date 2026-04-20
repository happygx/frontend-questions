---
level: 3
---

# Js 中，有哪些方法可以退出循环

## 题目要点

- **`break`**：立即退出循环体。
- **`return`**：退出循环并返回函数的结果（适用于函数内）。
- **`throw`**：抛出异常，退出循环并转到异常处理部分（适用于错误处理）。

## 参考答案

一般使用以下几种方法退出循环：

### **1. `break`**

- **作用**：立即终止当前循环，跳出循环体并继续执行循环后的代码。
- **用法**：通常在循环内的条件判断中使用。
- **示例**：
  ```javascript
  for (let i = 0; i < 10; i++) {
    if (i === 5) {
      break; // 退出循环
    }
    console.log(i); // 输出 0, 1, 2, 3, 4
  }
  ```

### **2. `return`**

- **作用**：用于函数中，立即退出循环并返回函数的调用者。它不仅会退出循环，还会结束整个函数的执行。
- **用法**：适用于需要在函数中退出循环并返回值的情况。
- **示例**：
  ```javascript
  function findFirstNegative(nums) {
    for (let num of nums) {
      if (num < 0) {
        return num; // 退出循环并返回负数
      }
    }
    return null; // 如果没有负数，返回 null
  }

  console.log(findFirstNegative([1, 2, 3, -4, 5])); // 输出 -4
  ```

### **3. `throw`**

- **作用**：抛出一个异常，终止当前循环及其包含的函数，并跳转到异常处理代码块（`catch`）。
- **用法**：适用于需要通过异常机制退出循环并处理错误的情况。
- **示例**：
  ```javascript
  function processNumbers(numbers) {
    for (let num of numbers) {
      if (num < 0) {
        throw new Error('Negative number found'); // 退出循环并抛出错误
      }
      console.log(num);
    }
  }

  try {
    processNumbers([1, 2, 3, -4, 5]);
  } catch (e) {
    console.error(e.message); // 输出 'Negative number found'
  }
  ```
