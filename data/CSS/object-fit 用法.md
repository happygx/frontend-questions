---
level: 2
---

# object-fit 用法

## 题目要点

**object-fit** 属性用于控制图片或内嵌内容（如 <img>、<video>、<object>\`等）如何填充其容器。

**可用值**

-   fill: 默认值，内容会被拉伸以填充整个容器。
-   contain: 内容会被缩放以适应容器，保持宽高比，可能会有空白区域。
-   cover: 内容会被缩放以覆盖整个容器，保持宽高比，可能会被裁剪。
-   none: 内容保持原始尺寸，不进行缩放。
-   scale-down: 内容会被缩放，但不会超过其原始尺寸。

**考察重点**

-   **理解**：`object-fit` 属性的不同值及其效果。
-   **应用**：在实际项目中根据需求选择合适的 `object-fit` 值，确保内容的显示效果。

## 参考答案

# object-fit

**`object-fit`** [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 属性指定[可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)（例如：`[<img>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)` 或 `[<video>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)`）的内容应该如何适应到其使用高度和宽度确定的框。

  
你可以通过使用 `[object-position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-position)` 属性来切换被替换元素的内容对象在元素框内的对齐方式。

[语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit#%E8%AF%AD%E6%B3%95)

```
```

`contain`

被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。整个对象在填充盒子的同时保留其长宽比，因此如果宽高比与框的宽高比不匹配，该对象将被添加“[黑边](https://zh.wikipedia.org/wiki/%E9%BB%91%E9%82%8A)”。

`cover`

被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框。

`fill`

被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。

`none`

被替换的内容将保持其原有的尺寸。

`scale-down`

内容的尺寸与 `none` 或 `contain` 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。
