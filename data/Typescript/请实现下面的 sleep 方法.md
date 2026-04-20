---
level: 3
---

# 请实现下面的 sleep 方法

## 题目要点

**作答思路：**

创建一个`Promise`，并在指定的毫秒数后将其解决（即变为完成状态）。

1. **创建Promise**：使用`new Promise`创建一个新的`Promise`实例。
2. **设置超时**：使用`setTimeout`设置一个定时器，指定在多少毫秒后执行回调函数。
3. **解决Promise**：在定时器到期时，调用`resolve`函数，并传入一个值（在这个例子中，传入`undefined`）。
4. **处理拒绝**：虽然在这个例子中没有使用`reject`函数，但你可以添加错误处理逻辑，例如当定时器设置有误时拒绝`Promise`。
5. **返回Promise**：最后，返回这个`Promise`实例。

## 参考答案

```ts
 * @file 返回一个 Promise，并在 ms 毫秒后 Promise 变为完成状态
 */

export function sleep(ms: number): Promise<undefined> {
  // 参考答案
  return new Promise(
    (
      resolve: (value: undefined) => void,
      reject: (value: undefined) => void
    ) => {
      setTimeout(() => {
        resolve(undefined);
      }, ms);
    }
  );
}

async function main() {
  console.log("a");
  await sleep(1000);
  console.log("b");
  await sleep(1000);
  console.log("c");
}
main();

export default {};

```
