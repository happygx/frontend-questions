---
level: 3
---

# 【Promise第16题】下面代码的输出是什么？

## 参考答案

## 解析

因为reject(1)，此时走的是catch，且第二个then中的res得到的就是catch中的返回值。

## 结果
```
3
```
