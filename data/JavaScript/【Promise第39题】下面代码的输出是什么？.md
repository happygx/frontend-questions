---
level: 4
---

# 【Promise第39题】下面代码的输出是什么？

## 参考答案

## 解析

需要注意的点：

* async函数中await的`new Promise`要是没有返回值的话则不执行后面的内容
* .then函数中的参数期待的是函数，如果不是函数的话会发生透传
* 注意定时器的延迟时间

## 结果

```
'async1'
'promise1'
'script end'
1
'timer2'
'timer1'

```
