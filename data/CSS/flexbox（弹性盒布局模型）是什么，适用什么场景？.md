---
level: 2
---

# flexbox（弹性盒布局模型）是什么，适用什么场景？

## 题目要点

Flexbox（弹性盒布局模型）是一种用于创建灵活且自适应的网页布局的 CSS 模块。它提供了一种在容器和其子元素之间建立灵活关系的方式，以实现多个元素的对齐、分布和调整大小。

## 适用场景

- 等高的多列布局：Flexbox 可以轻松创建等高的多列布局，使得每一列的高度相等，无论其内容的长度如何。
- 水平和垂直居中：Flexbox 提供了强大的对齐和居中功能，可以在容器中轻松实现水平和垂直居中元素。
- 自适应布局：Flexbox 具有弹性特性，可以根据可用空间自动调整项目的大小和位置，从而实现自适应的布局。
- 等间距的分布：通过使用 Flexbox 的 `justify-content` 和 `align-items` 属性，可以轻松地在容器中创建等间距的分布，使项目之间具有相等的间距。
- 响应式布局：Flexbox 是响应式设计的有力工具，可以通过简单的 CSS 更改来构建适应不同屏幕尺寸和设备类型的布局。

## 参考答案

Flexbox（弹性盒布局模型）是一种 CSS 布局模式，旨在简化和优化在容器内分配空间和对齐项目的过程。它使得在布局中处理复杂的对齐、空间分配和顺序问题变得更加简单和高效。

### Flexbox 主要概念

1. **容器和项目**：
   - **Flex 容器**：使用 `display: flex` 或 `display: inline-flex` 将一个元素指定为 flex 容器。
   - **Flex 项目**：容器内部的直接子元素，即 flex 容器的项目。

2. **主轴和交叉轴**：
   - **主轴**：定义了 flex 项目排列的方向（默认为水平轴）。可以通过 `flex-direction` 属性设置。
   - **交叉轴**：与主轴垂直的轴，控制项目的对齐方式。可以通过 `align-items` 和 `align-self` 属性设置。

3. **主要属性**：
   - **`display: flex`**：将元素设为 flex 容器。
   - **`flex-direction`**：定义主轴方向（`row`、`column`、`row-reverse`、`column-reverse`）。
   - **`flex-wrap`**：定义项目是否换行（`nowrap`、`wrap`、`wrap-reverse`）。
   - **`flex-flow`**：是 `flex-direction` 和 `flex-wrap` 的缩写形式。
   - **`justify-content`**：在主轴上对齐项目（`flex-start`、`flex-end`、`center`、`space-between`、`space-around`）。
   - **`align-items`**：在交叉轴上对齐项目（`flex-start`、`flex-end`、`center`、`baseline`、`stretch`）。
   - **`align-self`**：控制单个项目在交叉轴上的对齐方式，覆盖 `align-items` 设置。
   - **`align-content`**：在多行的交叉轴上对齐所有行（`flex-start`、`flex-end`、`center`、`space-between`、`space-around`、`stretch`）。

4. **项目属性**：
   - **`flex-grow`**：定义项目的放大比例。
   - **`flex-shrink`**：定义项目的缩小比例。
   - **`flex-basis`**：定义项目在主轴上的初始大小。
   - **`flex`**：`flex-grow`、`flex-shrink` 和 `flex-basis` 的简写属性。
   - **`align-self`**：覆盖 `align-items` 对单个项目的对齐方式。

### 适用场景

1. **水平或垂直对齐**：
   - Flexbox 使得水平和垂直对齐项目变得简单，无论是单行还是多行布局，都能很方便地进行对齐和分布。

2. **响应式布局**：
   - 通过使用 `flex-wrap` 和 `flex-grow` 等属性，能够实现响应式布局，让项目在容器大小变化时自动调整。

3. **动态空间分配**：
   - Flexbox 可以根据可用空间动态调整项目的大小和位置，适用于需要动态调整布局的场景。

4. **复杂的排列**：
   - 例如，创建多列布局、导航栏、卡片布局等，Flexbox 提供了强大的工具来处理这些复杂的排列问题。

### 示例

**水平居中对齐：**

```html
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center; /* 水平居中对齐 */
  }
  .item {
    margin: 10px;
  }
</style>
```

```html
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
</div>

<style>
  .container {
    display: flex;
    align-items: center; /* 垂直居中对齐 */
    height: 100vh; /* 高度设置为视口高度 */
  }
  .item {
    margin: 10px;
  }
</style>
```
