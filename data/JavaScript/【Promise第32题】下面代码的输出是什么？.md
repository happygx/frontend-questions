---
level: 2.5
---

# 【Promise第32题】下面代码的输出是什么？

## 参考答案

## 解析

在async1中await后面的Promise是没有返回值的，也就是它的状态始终是pending状态，因此相当于一直在await，await，await却始终没有响应...

所以在await之后的内容是不会执行的，也包括async1后面的 .then。

## 结果

```
'async1 start'
'promise1'
'script end'
```
