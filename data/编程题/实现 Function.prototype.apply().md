---
level: 2.5
---

# 实现 Function.prototype.apply()

## 参考答案

```js
   context = (context === undefined || context === null) ? globalThis : Object(context);
  if (typeof this !== 'function') {
    throw new TypeError('Type Error');
  }
  const fn = Symbol('fn');
  context[fn] = this;

  const res = context[fn](...args);
  delete context[fn];
  return res;
}

```
