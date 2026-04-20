---
level: 1.5
---

# html 元素节点上， 有多个 class 名称，这几个class 名称对应的样式渲染优先级是如何的？

## 题目要点

多个 `class` 名称的样式渲染优先级由 CSS 选择器的特指度、样式表的定义顺序、内联样式和 `!important` 声明共同决定。在特指度相同的情况下，后定义的样式会覆盖前定义的样式。

## 参考答案

在 HTML 元素上，多个 `class` 名称的样式渲染优先级（或称为特指度）是由 CSS 的特指度计算规则决定的。具体来说，CSS 选择器的优先级是由以下几个部分组成的：

### 特指度计算规则

1. **ID 选择器**（如 `#header`）：特指度最高。
2. **类选择器**（如 `.menu`）、属性选择器（如 `[type="text"]`）和伪类选择器（如 `:hover`）：特指度次之。
3. **元素选择器**（如 `div`）和伪元素选择器（如 `::before`）：特指度最低。
4. **通配符选择器**（如 `*`）、组合器（如 `>`、`+`）和伪类（如 `:not()`）的特指度通常较低。

### 计算多个 `class` 的优先级

当一个元素上有多个 `class` 名称时，每个 `class` 名称的样式规则都会应用到该元素。若多个 `class` 选择器定义了相同的 CSS 属性，浏览器会按照以下规则决定哪个样式优先应用：

1. **特指度**：在多个 `class` 选择器的情况下，优先应用特指度更高的规则。例如，`.class1` 和 `.class2` 的特指度相同，那么后定义的样式会覆盖先定义的样式。

2. **样式表的顺序**：如果多个样式规则的特指度相同，那么后定义的规则会覆盖先定义的规则。例如，如果 CSS 文件中 `.menu { color: red; }` 在 `.header { color: blue; }` 之后，那么 `.menu` 的样式会被应用。

3. **内联样式**：内联样式（即 `style` 属性中的样式）具有比外部样式表更高的特指度。如果元素上有内联样式，它们会覆盖 `class` 中定义的样式。

4. **`!important` 声明**：如果 CSS 属性使用了 `!important`，它将具有最高的优先级，覆盖所有其他没有 `!important` 的规则。

### 示例

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Class Priority Example</title>
    <style>
        .class1 {
            color: red;
        }
        .class2 {
            color: blue;
        }
        .class1.class2 {
            color: green;
        }
    </style>
</head>
<body>
    <div class="class1 class2">This text will be green.</div>
</body>
</html>
```
