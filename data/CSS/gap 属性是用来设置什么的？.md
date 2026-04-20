---
level: 0.5
---

# gap 属性是用来设置什么的？

## 题目要点

`gap` 是用于设置 `grid` 和 `flex` 布局中元素之间的间距属性，简化了元素间距的管理。

## 参考答案

`gap` 属性用于设置在网格布局（`grid`）或弹性布局（`flex`）中，子元素（项目）之间的间距。它可以同时设置行间距和列间距，或者分别通过 `row-gap` 和 `column-gap` 单独设置。

- 适用于：`grid` 和 `flex` 布局
- 示例：
  ```css
  .container {
    display: flex;
    gap: 10px;
  }
  ```
