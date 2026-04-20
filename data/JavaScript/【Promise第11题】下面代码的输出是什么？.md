---
level: 3
---

# 【Promise第11题】下面代码的输出是什么？

## 参考答案

## 过程分析

* 从上至下，先执行第一个new Promise中的函数，碰到setTimeout将它加入下一个宏任务列表
* 跳出new Promise，碰到promise1.then这个微任务，但其状态还是为pending，这里理解为先不执行
* promise2是一个新的状态为pending的Promise
* 执行同步代码console.log('promise1')，且打印出的promise1的状态为pending
* 执行同步代码console.log('promise2')，且打印出的promise2的状态为pending
* 碰到第二个定时器，将其放入下一个宏任务列表
* 第一轮宏任务执行结束，并且没有微任务需要执行，因此执行第二轮宏任务
* 先执行第一个定时器里的内容，将promise1的状态改为resolved且保存结果并将之前的promise1.then推入微任务队列
* 该定时器中没有其它的同步代码可执行，因此执行本轮的微任务队列，也就是promise1.then，它抛出了一个错误，且将promise2的状态设置为了rejected
* 第一个定时器执行完毕，开始执行第二个定时器中的内容
* 打印出'promise1'，且此时promise1的状态为resolved
* 打印出'promise2'，且此时promise2的状态为rejected

## 结果

```
'promise2' Promise{<pending>}
test5.html:102 Uncaught (in promise) Error: error!!! at test.html:102
'promise1' Promise{<resolved>: "success"}
'promise2' Promise{<rejected>: Error: error!!!}
```
