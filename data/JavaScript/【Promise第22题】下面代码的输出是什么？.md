---
level: 2
---

# 【Promise第22题】下面代码的输出是什么？

## 参考答案

## 解析

由于Promise调用的是resolve()，因此.then()执行的应该是success()函数，可是success()函数抛出的是一个错误，它会被后面的catch()给捕获到，而不是被fail1函数捕获。

## 结果

```
    at success
```
