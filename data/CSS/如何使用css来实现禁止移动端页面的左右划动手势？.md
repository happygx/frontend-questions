---
level: 1
---

# 如何使用css来实现禁止移动端页面的左右划动手势？

## 参考答案

CSS属性 `touch-action` 用于设置触摸屏用户如何操纵元素的区域(例如，浏览器内置的缩放功能)。

最简单方法是：

```css
 touch-action: none;
 touch-action: pan-y;
}
```

```css
 width: 100vw;
 overflow-x: hidden;
}
```
