---
level: 1
---

# CSS 中的文档流是什么？


## 题目要点

文档流是浏览器布局和呈现页面内容的基础。通过理解和控制文档流中的不同布局模式和 CSS 属性，可以实现各种复杂的页面布局和设计。

## 参考答案

CSS 中的文档流（Document Flow），也称为标准流，是指浏览器如何按照 HTML 元素的结构和 CSS 样式规则来布局和呈现网页内容的过程。文档流决定了元素在页面上的位置和排列方式。文档流的主要特点和组成部分包括：

### **1. 主要布局模式**

- **正常流（Normal Flow）**：元素按照在 HTML 中的顺序逐个显示。块级元素（如 `<div>`, `<p>`）在页面上垂直堆叠，行内元素（如 `<span>`, `<a>`）在页面上水平排列。
- **浮动（Float）**：当元素应用 `float` 属性后，它会从正常流中脱离，允许其他文本和行内元素围绕它排列。
- **定位（Positioning）**：使用 `position` 属性（如 `absolute`, `relative`, `fixed`, `sticky`）时，元素会脱离正常流，根据其定位规则进行放置。
- **弹性盒布局（Flexbox）**：通过 `display: flex`，元素成为弹性容器及其子元素成为弹性项，允许灵活地布局和对齐。
- **网格布局（Grid）**：通过 `display: grid`，元素成为网格容器及其子元素成为网格项，提供了二维布局的能力。

### **2. 文档流中的元素类型**

- **块级元素（Block-level Elements）**：通常会从新行开始，占据父元素的整个宽度，如 `<div>`, `<h1>`, `<p>`。
- **行内元素（Inline Elements）**：在同一行内显示，仅占据其内容的宽度，如 `<span>`, `<a>`, `<img>`。
- **块级行内元素（Block-level Inline Elements）**：既有块级元素的特性又能在行内显示，如 `<button>`, `<input>`。

### **3. 影响文档流的 CSS 属性**

- **`display`**：决定元素的显示类型（如 `block`, `inline`, `flex`, `grid`）。
- **`position`**：决定元素的定位方式（如 `static`, `relative`, `absolute`, `fixed`, `sticky`）。
- **`float`**：使元素脱离正常流并允许文本环绕。
- **`clear`**：用于控制浮动元素的清除，以避免元素重叠。

### **4. 文档流的影响**

- **布局**：文档流决定了元素的默认布局方式。块级元素会垂直堆叠，行内元素会水平排列。
- **重叠和排列**：使用浮动和定位可以改变元素的排列顺序和位置，但这些元素不会占据正常文档流的位置。
- **响应式设计**：通过调整文档流中的元素（如使用 Flexbox 或 Grid），可以实现响应式布局，适应不同的屏幕尺寸。

### **5. 示例**

```html
<html>
<head>
  <style>
    .container {
      border: 1px solid black;
      padding: 10px;
    }
    .block {
      display: block;
      background-color: lightblue;
      margin-bottom: 10px;
    }
    .inline {
      display: inline;
      background-color: lightcoral;
    }
    .float {
      float: left;
      width: 100px;
      height: 100px;
      background-color: lightgreen;
      margin-right: 10px;
    }
    .absolute {
      position: absolute;
      top: 20px;
      left: 20px;
      width: 100px;
      height: 100px;
      background-color: lightyellow;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="block">Block Element</div>
    <div class="inline">Inline Element</div>
    <div class="float">Floating Element</div>
    <div class="absolute">Absolute Positioning</div>
  </div>
</body>
</html>
```
- `.block` 元素按正常流的块级布局显示。
- `.inline` 元素在同一行内显示。
- `.float` 元素浮动到左侧，其他内容围绕它。
- `.absolute` 元素绝对定位，脱离了正常流。
