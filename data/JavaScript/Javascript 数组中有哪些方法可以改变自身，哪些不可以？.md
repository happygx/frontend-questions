---
level: 1
---

# Javascript 数组中有哪些方法可以改变自身，哪些不可以？

## 题目要点

- **改变自身的方法**：直接对原数组进行修改，如 `push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `sort()`, `reverse()`, `fill()`.
- **不改变自身的方法**：返回新数组或结果，不修改原数组，如 `concat()`, `slice()`, `map()`, `filter()`, `reduce()`, `find()`, `some()`, `every()`, `includes()`, `join()`.

## 参考答案

在 JavaScript 中，数组方法可以分为改变原数组的方法和不改变原数组的方法。下面是对这些方法的详细分类：

### **改变自身的方法**

这些方法会直接修改数组本身：

1. **`push()`**: 向数组末尾添加一个或多个元素。
   ```javascript
   let arr = [1, 2, 3];
   arr.push(4); // arr 是 [1, 2, 3, 4]
   ```

2. **`pop()`**: 从数组末尾删除一个元素，并返回该元素。
   ```javascript
   let arr = [1, 2, 3];
   arr.pop(); // arr 是 [1, 2]
   ```

3. **`shift()`**: 从数组开头删除一个元素，并返回该元素。
   ```javascript
   let arr = [1, 2, 3];
   arr.shift(); // arr 是 [2, 3]
   ```

4. **`unshift()`**: 向数组开头添加一个或多个元素。
   ```javascript
   let arr = [1, 2, 3];
   arr.unshift(0); // arr 是 [0, 1, 2, 3]
   ```

5. **`splice()`**: 从数组中添加或删除元素。
   ```javascript
   let arr = [1, 2, 3];
   arr.splice(1, 1, 4, 5); // arr 是 [1, 4, 5, 3]
   ```

6. **`sort()`**: 对数组进行排序，默认按字符编码排序。
   ```javascript
   let arr = [3, 1, 2];
   arr.sort(); // arr 是 [1, 2, 3]
   ```

7. **`reverse()`**: 反转数组的顺序。
   ```javascript
   let arr = [1, 2, 3];
   arr.reverse(); // arr 是 [3, 2, 1]
   ```

8. **`fill()`**: 用指定的值填充数组的指定部分。
   ```javascript
   let arr = [1, 2, 3];
   arr.fill(0, 1, 3); // arr 是 [1, 0, 0]
   ```

### **不改变自身的方法**

这些方法不会修改原数组，而是返回一个新数组或结果：

1. **`concat()`**: 合并两个或多个数组，返回一个新数组。
   ```javascript
   let arr1 = [1, 2];
   let arr2 = [3, 4];
   let result = arr1.concat(arr2); // result 是 [1, 2, 3, 4]
   ```

2. **`slice()`**: 提取数组的一部分，并返回一个新数组。
   ```javascript
   let arr = [1, 2, 3];
   let result = arr.slice(1, 2); // result 是 [2]
   ```

3. **`map()`**: 创建一个新数组，其结果是调用一个提供的函数对每个数组元素执行操作后的结果。
   ```javascript
   let arr = [1, 2, 3];
   let result = arr.map(x => x * 2); // result 是 [2, 4, 6]
   ```

4. **`filter()`**: 创建一个新数组，其中包含所有通过测试的数组元素。
   ```javascript
   let arr = [1, 2, 3];
   let result = arr.filter(x => x > 1); // result 是 [2, 3]
   ```

5. **`reduce()`**: 对数组中的每个元素执行一个提供的函数，返回单个值。
   ```javascript
   let arr = [1, 2, 3];
   let result = arr.reduce((sum, x) => sum + x, 0); // result 是 6
   ```

6. **`find()`**: 返回数组中满足提供测试函数的第一个元素。
   ```javascript
   let arr = [1, 2, 3];
   let result = arr.find(x => x > 1); // result 是 2
   ```

7. **`some()`**: 检查数组中是否至少有一个元素满足提供的测试函数。
   ```javascript
   let arr = [1, 2, 3];
   let result = arr.some(x => x > 2); // result 是 true
   ```

8. **`every()`**: 检查数组中的所有元素是否都满足提供的测试函数。
   ```javascript
   let arr = [1, 2, 3];
   let result = arr.every(x => x > 0); // result 是 true
   ```

9. **`includes()`**: 检查数组中是否包含指定的值。
   ```javascript
   let arr = [1, 2, 3];
   let result = arr.includes(2); // result 是 true
   ```

10. **`join()`**: 将数组中的所有元素连接成一个字符串。
    ```javascript
    let arr = [1, 2, 3];
    let result = arr.join('-'); // result 是 '1-2-3'
    ```
