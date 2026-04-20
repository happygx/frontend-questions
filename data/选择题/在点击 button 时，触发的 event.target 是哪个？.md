---
level: 1
---

# 在点击 button 时，触发的 event.target 是哪个？

## 参考答案

event.target 是触发事件的对象 (某个DOM元素) 的引用。

当事件处理程序在事件的冒泡或捕获阶段被调用时，它与event.currentTarget不同。
