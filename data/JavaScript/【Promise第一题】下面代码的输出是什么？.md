---
level: 1
---

# 【Promise第一题】下面代码的输出是什么？

## 参考答案

## 过程分析：

* 从上至下，先遇到new Promise，执行该构造函数中的代码promise1
* 然后执行同步代码1，此时promise1没有被resolve或者reject，因此状态还是pending

## 结果

```
'1' Promise{<pending>}
```
