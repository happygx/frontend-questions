---
level: 2
---

# 实现 isObjectEmpty 方法，判断一个对象是否为空

## 题目要点

- 自身属性非空 → 返回 `false`  
- 原型链上存在非 `Object.prototype` 的自定义成员 → 返回 `false`  
- 否则为“空对象” → 返回 `true`

## 参考答案

为了实现 `isObjectEmpty`，我们需要同时判断：

1. 对象自身是否有可枚举属性（通过 `Object.keys()`）  
2. 原型链上是否有**非原生**、**自定义的属性或方法**

示例代码：

```js
  if (typeof obj !== 'object' || obj === null) return false;

  // 检查自身属性
  if (Object.keys(obj).length > 0) return false;

  // 检查原型链上的自定义属性（跳过 Object.prototype 的原生方法）
  let proto = Object.getPrototypeOf(obj);
  while (proto && proto !== Object.prototype) {
    if (Object.getOwnPropertyNames(proto).some(key => key !== 'constructor')) {
      return false;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return true;
}
```
