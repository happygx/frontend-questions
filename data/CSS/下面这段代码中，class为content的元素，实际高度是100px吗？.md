---
level: 3
---

# 下面这段代码中，class为content的元素，实际高度是100px吗？

## 参考答案

答案： 不是

首先，content元素的 height 设置为 “100%”，在父级的高度为固定值时，直接继承该高度，也就是600px。

但父级设置了 display:flex ，在高度固定的前提下，子元素的高度会按比例进行缩放，所以content元素最后的高度应该是 600 * (600/(200+600+200)) = 360px

在线demo可访问查看： https://codesandbox.io/s/strange-curran-3kci7i?file=/index.html

> 本题目答案由“前端面试题宝典”整理，PC端可访问 https://fe.ecool.fun/
