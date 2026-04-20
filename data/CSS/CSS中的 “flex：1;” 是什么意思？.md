---
level: 1
---

# CSS中的 “flex:1;” 是什么意思？

## 题目要点

在CSS中，flex: 1; 是一个简写属性，用于设置一个元素为Flexbox子项时的布局行为。具体来说，它包括以下几个部分：

- flex-grow：定义了当父容器有多余空间时，子项如何增长。flex-grow: 1 表示子项将尽可能多地占据可用空间。
- flex-shrink：定义了当父容器空间不足时，子项如何缩小。默认值是 1，表示子项可以等比例缩小以适应容器空间。
- flex-basis：定义了在分配多余空间之前，子项的默认大小。flex-basis: 1 通常意味着子项的初始大小是相对于父容器的1%（如果父容器设置了flex-basis）。

flex: 1; 通常用于确保Flexbox子项能够充满其父容器，同时在空间不足时能够适当缩小，保持布局的灵活性。

## 参考答案

flex 是 flex-grow, flex-shrink 和 flex-basis的简写。

除了auto (1 1 auto) 和 none (0 0 auto)这两个快捷值外，还有以下设置方式：

* 当 flex 取值为一个非负数字，则该数字为 flex-grow 值，flex-shrink 取 1，flex-basis 取 0%，如下是等同的：

```css
.item {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}
```

```css
.item {
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: 0%;
}
```

```css
.item-1 {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}

.item-2 {flex: 24px;}
.item-2 {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 24px;
}
```

```css
.item {
    flex-grow: 2;
    flex-shrink: 3;
    flex-basis: 0%;
}
```

```
.item {
    flex-grow: 11;
    flex-shrink: 1;
    flex-basis: 32px;
}
```
