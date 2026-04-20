---
level: 1
---

# 请实现下面的 mergeArray 方法

## 参考答案

```ts
 * @file 合并两个有序数组
 */

function merge(arr: number[], arr2: number[]): number[] {
  // 参考答案
  return arr.concat(arr2).sort((a: number, b: number) => a - b);
}

// 参数数组从小到大排列
console.log(merge([1, 2, 3], [2, 5, 6])); // [ 1, 2, 2, 3, 5, 6 ]

export default {};
```
