---
level: 3
---

# babel 和 babel ployfill 有什么关系？

## 参考答案

* 先来理解下 babel 到底是做什么的？

简单来讲，babel解决语法层面的问题。用于将ES6+的高级语法转为ES5。

* babel polyfill 又是做什么的？

如果要解决API层面的问题，需要使用垫片。比如常见的有babel-polyfill、babel-runtime 和 babel-plugin-transform-runtime。
