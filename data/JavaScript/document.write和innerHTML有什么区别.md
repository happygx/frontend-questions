---
level: 0.5
---

# document.write和innerHTML有什么区别

## 题目要点

- **使用时机**：`document.write` 通常用于服务器端脚本，在 HTML 页面完全加载之前向文档写入内容。`innerHTML` 用于在网页加载后动态地修改元素的内容。
- **内容替换**：`document.write` 会替换整个文档的内容，而 `innerHTML` 只会影响指定的元素及其子元素。
- **执行时机**：`document.write` 是同步的，会阻塞页面渲染；`innerHTML` 是异步的，不会阻塞页面渲染。

在实际应用中，建议使用 `innerHTML` 而不是 `document.write`，因为它更安全、更可控，并且不会影响页面的加载性能。

## 参考答案

* document.write是直接写入到页面的内容流，如果在写之前没有调用document.open, 浏览器会自动调用open。每次写完关闭之后重新调用该函数，会导致页面被重写。
* innerHTML则是DOM页面元素的一个属性，代表该元素的html内容。你可以精确到某一个具体的元素来进行更改。如果想修改document的内容，则需要修改document.documentElement.innerElement。
* innerHTML将内容写入某个DOM节点，不会导致页面全部重绘
* innerHTML很多情况下都优于document.write，其原因在于其允许更精确的控制要刷新页面的那一个部分。
