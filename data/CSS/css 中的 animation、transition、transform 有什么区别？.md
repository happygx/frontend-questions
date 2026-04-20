---
level: 1
---

# css 中的 animation、transition、transform 有什么区别？

## 题目要点

1. **`animation`**
   - 定义复杂的动画效果。
   - 包含多个动画步骤，控制动画的持续时间、延迟、次数。

2. **`transition`**
   - 元素状态变化时平滑过渡属性值。
   - 适合简单的状态变化动画，如 hover 效果。

3. **`transform`**
   - 改变元素的几何属性，如旋转、缩放、移动。
   - 通常与 `transition` 或 `animation` 结合使用，产生动画效果。

#### 考察重点

- **理解**：`animation`、`transition` 和 `transform` 的基本功能和区别。
- **选择**：根据实际需求选择合适的动画实现方式。
- **应用**：将这些技术应用到实际项目中，提升用户体验。

## 参考答案

在 CSS 中，`animation`、`transition` 和 `transform` 是用来创建动画效果的关键属性，它们各自具有不同的作用和特点。

1. **animation**：
   - `animation` 属性允许创建一个在指定时间内播放的动画效果，可以包括多个关键帧。
   - 通过指定关键帧动画的名称、持续时间、动画方式（timing function）、延迟时间、播放次数等来控制动画的效果。
   - `animation` 属性可以实现更复杂的动画效果，例如循环动画、无限次播放等。

2. **transition**：
   - `transition` 属性用于指定在元素状态改变时，要以何种方式过渡到新状态。
   - 通过指定过渡的属性、持续时间、动画方式（timing function）、延迟时间等来控制过渡效果。
   - `transition` 属性适用于元素从一种状态平滑过渡到另一种状态，例如颜色、大小、位置等属性的变化。

3. **transform**：
   - `transform` 属性用于对元素进行变形，例如平移、旋转、缩放、倾斜等。
   - 通过 `transform` 属性，可以改变元素的变形属性来创建动画效果。
   - `transform` 属性通常与 `transition` 或 `animation` 结合使用，使得变形动画更加平滑。

总结：

* `animation` 属性用于创建复杂的动画序列
* `transition` 属性用于在状态变化时平滑过渡
*  `transform` 属性用于对元素进行变形

这三种属性通常结合使用，以实现丰富的动画效果。
