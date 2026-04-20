---
level: 1.5
---

# 为什么有时候⽤translate来改变位置⽽不是使用position进行定位？

## 题目要点

使用 translate() 来改变元素位置相比于使用 position 属性有以下几个优势:

**性能更好:**

- translate() 是合成属性,通常由浏览器的合成线程来处理,不会触发重排(reflow)和重绘(repaint)。
- position 定位会触发重排和重绘,对性能的影响较大。

**不会影响布局:**

- translate() 只改变元素的视觉位置,不会影响其他元素的布局。
- position 定位会改变元素在文档流中的位置,会影响其他元素的布局。

**动画效果更流畅:**

- translate() 的动画效果更流畅,因为合成线程处理更高效。
- position 定位的动画可能会出现卡顿或跳跃的情况。

因此,在不需要改变元素在文档流中的位置,只需要改变视觉位置时,使用 translate() 通常是更好的选择。它可以提高性能,不影响布局,并且产生更流畅的动画效果。

**考察重点**

- 理解：transform 和 position 属性的区别。
- 应用：根据布局需求和性能考虑，选择合适的方法改变元素位置。

## 参考答案

translate 是 transform 属性的⼀个值。

改变transform或opacity不会触发浏览器重新布局（reflow）或重绘（repaint），只会触发复合（compositions）。

⽽改变绝对定位会触发重新布局，进⽽触发重绘和复合。

transform使浏览器为元素创建⼀个 GPU 图层，但改变绝对定位会使⽤到 CPU。 

因此translate()更⾼效，可以缩短平滑动画的绘制时间。 

⽽translate改变位置时，元素依然会占据其原始空间，绝对定位就不会发⽣这种情况。

具体的原理可查看 [【前端基础系列】CSS篇-带你搞懂“硬件加速”](https://mp.weixin.qq.com/s?__biz=Mzk0NTI2NDgxNQ==&mid=2247484939&idx=1&sn=229467c549cec5e3980671f488a4d89e&chksm=c31947cbf46ecedd13f930b44e9bc2a25ce706a8d30fce56c54584598015640338a6e075b8ff#rd)
