---
level: 1
---

# 实现下面的 firstSingleChar 方法

## 题目要点

**作答思路**：

实现思路是遍历字符串中的每个字符，并检查该字符是否只出现一次。

1. **字符串分割**：首先，使用`split("")`方法将输入的字符串`str`分割成一个字符数组。
2. **过滤条件**：定义一个过滤函数，它接受三个参数：当前字符`item`、当前字符的索引`index`和字符数组`arr`。
3. **移除当前字符**：在过滤函数内部，使用`splice`方法从字符数组中移除当前字符及其索引。
4. **检查字符唯一性**：在过滤函数内部，使用`includes`方法检查移除当前字符后，字符数组中是否仍然包含该字符。如果不包含，则说明该字符只出现了一次。
5. **返回结果**：在`filter`函数的外部，使用`[0]`索引来获取第一个满足过滤条件的字符。如果没有任何字符满足条件，则返回`undefined`。

## 参考答案

```ts
 * @file 找出字符串中第一个只出现一次的字符
 */

function firstSingleChar(str: string) {
  // 参考答案
  return str.split("").filter((item: string, index: number, arr: string[]) => {
    arr.splice(index, 1);
    return !arr.includes(item);
  })[0];
}

// a 和 b 都出现了两次，只有 c 出现了一次，返回 c
console.log(firstSingleChar("abcba")); // c
// b c d 都出现了一次，返回第一个
console.log(firstSingleChar("aabcdee")); // b
// a 和 b 都出现了多次，没有只出现一次的元素，返回 undefined
console.log(firstSingleChar("aaaabbbb")); // undefined
console.log(firstSingleChar("dabvb"));

export default {};
```
