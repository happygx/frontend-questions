---
level: 1
---

# 请实现下面的 myAll 方法

## 题目要点

**作答思路**：

实现`myAll`方法的基本思路是遍历传入的异步操作数组，并对每个操作进行异步等待，然后将所有操作的结果收集到一个对象中。

实现思路：

1. **定义函数**：创建一个函数`myAll`，它接受一个异步操作数组作为参数。
2. **创建结果对象**：创建一个空的对象，用于存储每个异步操作的结果。
3. **遍历操作数组**：使用数组的`forEach`方法遍历每个异步操作。
4. **等待每个操作完成**：对每个异步操作使用`await`关键字来等待其完成。
5. **存储结果**：将每个操作的结果存储在结果对象中。
6. **返回结果对象**：遍历完成后，返回包含所有结果的对象。

## 参考答案

```ts
 * @file 实现 PromiseAll 方法
 */

import { sleep } from "./8.sleep";

async function myAll<T extends unknown[] | []>(
  values: T
): Promise<{ [P in keyof T]: Awaited<T[P]> }> {
  // 补全此处代码，使用 Promise.all 以外的语法完成
  // throw new Error('功能待实现');
  var arr = [];
  for (var i = 0; i < values.length; i++) {
    arr.push(await values[i]);
  }
  return arr as { [P in keyof T]: Awaited<T[P]> };
}

// 一秒钟后返回结果 value
async function request(value: string) {
  await sleep(1000);
  return value;
}
async function main() {
  console.log("start");
  const res = await myAll([request("a"), request("b"), request("c")]);
  console.log(res); // 预期输出 start 一秒后输出 ['a', 'b', 'c']
}
main();

export default {};

```
