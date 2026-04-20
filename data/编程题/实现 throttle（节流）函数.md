---
level: 1
---

# 实现 throttle（节流）函数

## 参考答案

高频时间触发,但n秒内只会执行一次,所以节流会稀释函数的执行频率。
```js
  let flag = true;
  return function() {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, time);
  }
}

```
