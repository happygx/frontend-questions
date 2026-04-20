---
level: 1
---

# 实现下面的 reverseWord 方法

## 题目要点

**作答思路：**

反转句子中的单词顺序，并处理句子中的空格问题。

1. **正则表达式匹配**：使用正则表达式`/\S+/g`来匹配句子中的所有单词。`\S`匹配任何非空白字符，`+`表示匹配一个或多个这样的字符，`g`表示全局匹配，即匹配所有这样的字符串。
2. **数组反序**：将匹配到的单词数组`str.match(/\S+/g)`通过`.reverse()`方法进行反序。
3. **空格处理**：将反序后的单词数组通过`.join(" ")`方法连接成一个字符串，其中每个单词之间用一个空格分隔。这样处理后，句子中的多个空格会被合并成一个空格。

## 参考答案

```ts
 * @file 反转句子
 * 
 * 同时满足以下条件：1、去除首尾空格，2、单词间隔中多个空格变成一个；
 * 注意console示例运行结果
 */

function reverseWord(str: string):string {
    // 参考答案
    return (<string[]>str.match(/\S+/g)).reverse().join(" ");
}

console.log(reverseWord('the sky is blue')); // blue is sky the
// 去除首尾空格
console.log(reverseWord("  hello world  ")); // world hello
// 单词间隔中多个空格变成一个
console.log(reverseWord("a good   example")); // example good a

export default {}
```
