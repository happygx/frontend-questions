---
level: 1
---

# 解释下如下代码的意图：Array.prototype.slice.apply(arguments)

## 参考答案

arguments 为类数组对象，并不是真正的数组。

slice可以实现数组的浅拷贝。

由于 arguments不是真正的数组，所以没有slice方法，通过apply可以调用数组对象的slice方法，从而将arguments 类数组转换为数组。
