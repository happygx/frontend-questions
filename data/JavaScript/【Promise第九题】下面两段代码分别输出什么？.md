---
level: 3
---

# 【Promise第九题】下面两段代码分别输出什么？

## 参考答案

代码一输出：
```
'timer1'
'timer2'
'timer3'
```
```
'timer1'
'promise'
'timer2'
```

一个是为定时器timer3，一个是为Promise.then

但是如果是定时器timer3的话，它会在timer2后执行，而Promise.then却是在timer2之前执行。

你可以这样理解，Promise.then是微任务，它会被加入到本轮中的微任务列表，而定时器timer3是宏任务，它会被加入到下一轮的宏任务中。
