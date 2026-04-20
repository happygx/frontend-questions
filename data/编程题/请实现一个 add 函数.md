---
level: 1
---

# 请实现一个 add 函数

## 参考答案

```js
  function innerAdd(...innerArgs) {
    args.push(...innerArgs);
    return innerAdd;
  }

  innerAdd.getValue = function() {
    return args.reduce((acc, curr) => acc + curr, 0);
  };

  return innerAdd;
}


// console.log(add(1)(2).getValue()); // 输出: 3
```
