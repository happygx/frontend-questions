---
level: 3
---

# 【Promise第12题】下面代码的输出是什么？

## 参考答案

和之前的题目比较类似，不做详细分析

```
'promise1' Promise{<pending>}
'promise2' Promise{<pending>}
'timer1'
test5.html:102 Uncaught (in promise) Error: error!!! at test.html:102
'timer2'
'promise1' Promise{<resolved>: "success"}
'promise2' Promise{<rejected>: Error: error!!!}

```
