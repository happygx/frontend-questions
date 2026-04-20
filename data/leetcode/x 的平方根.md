---
level: 1
---

# x 的平方根 

## 参考答案

## 二分法

* 整数x的平方根一定小于或等于x
* 除0之外的所有整数的平方根都大于或等于1
* 整数x的平方根一定是在1到x的范围内，取这个范围内的中间数字mid，并判断mid的平方是否小于或等于x，如果mid的平方小于x
* 那么接着判断(mid+1)的平方是否大于x，如果(mid+1)的平方大于x，那么mid就是x的平方根
* 如果mid的平方小于x并且(mid+1)的平方小于x，那么x的平方根比mid大，接下来搜索从mid+1到x的范围
* 如果mid的平方大于x，则x的平方根小于mid，接下来搜索1到mid-1的范围
* 然后在相应的范围内重复这个过程，总是取出位于范围中间的mid


```js
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  // 整数x的平方根一定是在1到x的范围内
  let left = 1,
    right = x;
  while (left <= right) {
    // 中间值  下面这样写是防止溢出
    let mid = left + ((right - left) >> 1);
    // 判断mid的平方是否小于或等于x，如果mid的平方小于x
    if (mid <= x / mid) {
      // 判断(mid+1)的平方是否大于x，如果(mid+1)的平方大于x，那么mid就是x的平方根
      if (mid + 1 > x / (mid + 1)) {
        return mid;
      }
      // 如果mid的平方小于x并且(mid+1)的平方小于x，那么x的平方根比mid大，接下来搜索从mid+1到x的范围
      left = mid + 1;
    } else {
      // 如果mid的平方大于x，则x的平方根小于mid，接下来搜索1到mid-1的范围
      right = mid - 1;
    }
  }
  // 如果输入参数是0，left等于1而right等于0，就直接返回0
  return 0;
};
```
