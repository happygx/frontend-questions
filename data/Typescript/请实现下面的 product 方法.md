---
level: 1
---

# 请实现下面的 product 方法

## 参考答案

```ts
 * @file 计算数组笛卡尔积
 */

// 示例
console.log(product([1, 2], [3, 4])); // [[1, 3], [1, 4], [2, 3], [2, 4]]

function product(xList: number[], yList: number[]): [number, number][] {
  // 参考答案
  return xList.reduce((v, t) => {
    return v.concat(yList.map((item) => [t, item]));
  }, [] as [number, number][]);
}

export default {};
```
