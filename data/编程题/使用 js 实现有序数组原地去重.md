---
level: 3
---

# 使用 js 实现有序数组原地去重

## 参考答案

原地去重有序数组，也就是在不创建新数组的情况下修改原始数组。

可以使用双指针的方法，以下是一个示例的实现：

```javascript
  if (nums.length === 0) {
    return 0;
  }
  
  let slow = 0;
  
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  
  return slow + 1;
}

// 示例用法
const nums = [1, 1, 2, 2, 2, 3, 4, 4, 5];
const length = removeDuplicates(nums);

console.log("去重后的数组：", nums.slice(0, length));
console.log("数组长度：", length);
```

我们从数组的第二个元素（即下标为1的元素）开始遍历，将其与慢指针指向的元素进行比较。如果它们不相等，说明遇到了一个新的不重复元素，将慢指针后移一位，并将新的元素放入该位置。如果它们相等，则跳过该元素，继续向后遍历。

最后，返回慢指针的位置加1，即为去重后的数组长度。可以通过 `nums.slice(0, length)` 来获取去重后的数组。
