---
level: 2
---

# 使用ts实现一个判断入参是否是数组类型的方法？

## 参考答案

unknown 用于变量类型不确定，但肯定可以确定的情形下，比如下面这个示例中，入参总归会有个值，根据这个值的类型进行不同的处理，这里使用 unknown 替代 any 则会更加类型安全。

```ts
  if (Array.isArray(x)) {
    return true;
  }
  return false;
}
```
