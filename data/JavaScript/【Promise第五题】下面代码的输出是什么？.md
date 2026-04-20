---
level: 1
---

# 【Promise第五题】下面代码的输出是什么？

## 参考答案

## 分析

fn函数直接返回了一个new Promise的，而且fn函数的调用是在start之前，所以它里面的内容应该会先执行。

## 结果

```
'start'
'success'
```
