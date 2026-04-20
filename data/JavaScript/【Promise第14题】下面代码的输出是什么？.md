---
level: 2.5
---

# 【Promise第14题】下面代码的输出是什么？

## 参考答案

## 解析
catch不管被连接到哪里，都能捕获上层未捕捉过的错误。

至于then3也会被执行，那是因为catch()也会返回一个Promise，且由于这个Promise没有返回值，所以打印出来的是undefined。

## 结果
```
"then3: " undefined
```
