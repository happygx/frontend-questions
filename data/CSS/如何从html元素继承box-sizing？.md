---
level: 1
---

# 如何从html元素继承box-sizing？

## 参考答案

在大多数情况下我们在设置元素的 border 和 padding 并不希望改变元素的 width,height值，这个时候我们就可以为该元素设置 `box-sizing:border-box;`。

如果不希望每次都重写一遍，而是希望他是继承而来的，那么我们可以使用如下代码：

```css
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```
