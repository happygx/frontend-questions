---
level: 2
---

# instanceof能否判断基本数据类型？

## 参考答案

能。比如下面这种方式:

```js
    static [Symbol.hasInstance](x) {
        return typeof x === 'number'
    }
}
console.log(111 instanceof PrimitiveNumber) // true

```
