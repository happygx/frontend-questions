---
level: 3
---

# 【Promise第28题】下面代码的输出是什么？

## 参考答案

## 解析

* 首先一进来是创建了两个函数的，我们先不看函数的创建位置，而是看它的调用位置
* 发现async1函数被调用了，然后去看看调用的内容
* 执行函数中的同步代码async1 start，之后碰到了await，它会阻塞async1后面代码的执行，因此会先去执行async2中的同步代码async2，然后跳出async1
* 跳出async1函数后，执行同步代码start
* 在一轮宏任务全部执行完之后，再来执行刚刚await后面的内容async1 end。

在这里，你可以理解为「紧跟着await后面的语句相当于放到了new Promise中，下一行及之后的语句相当于放在Promise.then中」。

## 结果
```
'async2'
'start'
'async1 end'
```
