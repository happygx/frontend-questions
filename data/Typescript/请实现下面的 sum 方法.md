---
level: 1
---

# 请实现下面的 sum 方法

## 题目要点

**作答思路：**

1. **定义异步加法函数**：首先，定义一个异步加法函数`asyncAdd`，该函数接受两个数字`a`和`b`，并返回它们的和。由于加法是异步的，需要使用`sleep`函数来模拟异步操作。

2. **使用循环累加**：对于数组`arr`中的每个数字，使用`asyncAdd`函数将当前累加的和`s`与下一个数字相加。由于加法是异步的，需要在循环中使用`await`关键字来等待每个加法操作的完成。

3. **返回最终结果**：循环结束后，`s`中存储的就是数组中所有数字的和。返回这个和作为`sum`函数的最终结果。

4. **使用Promise处理异步操作**：由于`sum`函数内部使用了`asyncAdd`函数，因此`sum`函数本身也返回一个`Promise`。这样，可以使用`then`方法来处理异步操作的结果。

## 参考答案

```ts
 * @file 假设加法是一个异步过程，如何计算多个数组之和？
 */
function sleep(ms: number) {
  return new Promise((r) => {
    setTimeout(() => {
      r(undefined);
    }, ms);
  });
}

async function asyncAdd(a: number, b: number) {
  await sleep(1000);
  return a + b;
}

async function sum(arr: number[]): Promise<number> {
  // 参考答案
  var s: number = arr[0];
  for (var i = 1; i < arr.length; i++) {
    s = await asyncAdd(s, arr[i]);
  }
  return s;
}

console.time("a");
sum([1, 2, 3, 4, 5, 6, 7, 8]).then((v) => {
  console.log(v); // 36
  console.timeEnd("a"); // a: <耗时>
});

export default {};

```
