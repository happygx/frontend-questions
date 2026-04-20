---
level: 3
---

# 什么是BFC？

## 题目要点

**BFC（Block Formatting Context）** 是 CSS 中一个重要的布局概念，它描述了一个块级元素的内部布局和外部布局之间的关系。BFC 主要用于处理元素的布局、浮动、边距合并等问题。

### BFC 的作用

1. **阻止外边距折叠**：
   - **外边距折叠**：当两个块级元素垂直相邻时，它们的外边距会合并，形成一个更大的外边距。
   - **BFC**：在 BFC 内部的元素的外边距不会影响到外部 BFC 的元素，避免了外边距折叠的问题。

2. **包含浮动元素**：
   - **浮动元素**：通常会从其包含块中溢出。
   - **BFC**：具有 BFC 的元素可以包含其内部的浮动元素，确保其高度包括浮动元素的高度。

3. **控制元素的布局**：
   - **BFC**：在 BFC 内部，元素的布局（如浮动、定位）会受到影响和控制，避免与外部元素发生冲突。

4. **防止元素重叠**：
   - **BFC**：能够隔离不同的 BFC 区域，避免元素之间的重叠或干扰。

### 如何触发 BFC

BFC 会在以下情况中被触发：

1. **块级格式化上下文的创建**：
   - 元素的 `display` 属性值为 `block` 或 `inline-block`。
   - 元素的 `position` 属性值为 `absolute` 或 `fixed`。
   - 元素的 `float` 属性值为 `left` 或 `right`。
   - 元素的 `overflow` 属性值为 `hidden`、`scroll` 或 `auto`。

2. **其他常见触发情况**：
   - 使用 `overflow` 属性，设置为 `hidden`、`scroll`、`auto`。
   - 使用 `display: flow-root`。
   - 使用 Flexbox 或 Grid 布局的容器也会创建 BFC。

### 示例

**1. 防止外边距折叠**：

```html
  <div style="margin: 20px; background: lightblue;">Inner</div>
</div>
```

```html
  <div style="float: left; width: 100px; height: 100px; background: lightblue;"></div>
</div>
```

- **BFC（Block Formatting Context）** 是一种 CSS 布局概念，用于控制块级元素的布局和外部元素的影响。
- **主要作用** 包括防止外边距折叠、包含浮动元素、控制布局和防止重叠。
- **触发 BFC** 的常见方法包括设置 `overflow` 属性、`display` 属性、`float` 属性和特定的布局模式。

## 参考答案

BFC：block formatting context，块级格式化上下文。

BFC是Web页面的可视CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

定位方案：

* 内部的Box会在垂直方向上一个接一个放置。
* Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠。
* 每个元素的margin box 的左边，与包含块border box的左边相接触。
* BFC的区域不会与float box重叠。
* BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。
* 计算BFC的高度时，浮动元素也会参与计算。

满足下列条件之一就可触发BFC:

* 根元素，即html
* float的值不为none（默认）
* overflow的值不为visible（默认）
* display的值为table-cell, table-caption, inline-block, flex, 或者 inline-flex 中的其中一个
* position的值为absolute或fixed
