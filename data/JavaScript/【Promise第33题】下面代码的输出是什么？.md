---
level: 2.5
---

# 【Promise第33题】下面代码的输出是什么？

## 参考答案

## 解析

这道题也不难，不过有一点需要注意的，在async1中的`new Promise` resovle的值，和`async1().then()`里的值是没有关系的，很多小伙伴可能看到`resovle('promise resolve')`就会误以为是`async1().then()`中的返回值。

## 结果

```
'async1 start'
'promise1'
'promise2'
'async1 success'
'async1 end'
'timer'
```
