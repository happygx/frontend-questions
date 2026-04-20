---
level: 1
---

# display:none与visibility:hidden 有什么区别？

## 参考答案

## 表现上

* display:none是彻底消失，不在文档流中占位，浏览器也不会解析该元素；
* visibility:hidden是视觉上消失了，可以理解为透明度为0的效果，在文档流中占位，浏览器会解析该元素；

## 性能上

* 使用visibility:hidden比display:none性能上要好，display:none切换显示时，页面产生回流（当页面中的一部分元素需要改变规模尺寸、布局、显示隐藏等，页面重新构建，此时就是回流。所有页面第一次加载时需要产生一次回流），而visibility切换是否显示时则不会引起回流。
