---
level: 4
---

# 【Promise第40题】下面代码的输出是什么？

## 参考答案

## 解析

* Promise的状态一旦改变就无法改变
* finally不管Promise的状态是`resolved`还是`rejected`都会执行，且它的回调函数是接收不到Promise的结果的，所以finally()中的res是一个迷惑项。
* 最后一个定时器打印出的p1其实是`.finally`的返回值，我们知道`.finally`的返回值如果在没有抛出错误的情况下默认会是上一个Promise的返回值，而这道题中`.finally`上一个Promise是`.then()`，但是这个`.then()`并没有返回值，所以p1打印出来的Promise的值会是`undefined`，如果你在定时器的下面加上一个`return 1`，则值就会变成1。

## 结果
```
'finally' undefined
'timer1'
Promise{<resolved>: undefined}

```
