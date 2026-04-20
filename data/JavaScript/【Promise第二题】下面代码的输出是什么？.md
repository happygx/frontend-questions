---
level: 1.5
---

# 【Promise第二题】下面代码的输出是什么？

## 参考答案

## 过程分析

* 从上至下，先遇到`new Promise`，执行其中的同步代码1
* 再遇到`resolve('success')`， 将promise的状态改为了resolved并且将值保存下来
* 继续执行同步代码2
* 跳出promise，往下执行，碰到`promise.then`这个微任务，将其加入微任务队列
* 执行同步代码4
* 本轮宏任务全部执行完毕，检查微任务队列，发现`promise.then`这个微任务且状态为resolved，执行它。

## 结果

```
```
