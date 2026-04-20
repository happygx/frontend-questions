---
level: 2.5
---

# forEach中return有效果吗？如何中断forEach循环？

## 参考答案

在forEach中用return不会返回，函数会继续执行。

## 中断方法

* 使用try监视代码块，在需要中断的地方抛出异常。
* 官方推荐方法（替换方法）：用every和some替代forEach函数。
	* every在碰到return false的时候，中止循环。
    * some在碰到return true的时候，中止循环。
