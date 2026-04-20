---
level: 3
---

# 【Promise第18题】下面代码的输出是什么？

## 参考答案

## 解析

返回任意一个非 promise 的值都会被包裹成 promise 对象，因此这里的`return new Error('error!!!')`也被包裹成了`return Promise.resolve(new Error('error!!!'))`。

## 结果
```
```

```js
// or
throw new Error('error!!!')
```
