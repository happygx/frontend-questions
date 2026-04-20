---
level: 2
---

# CSS3 中 transition 和 animation 的属性分别有哪些？

## 题目要点

#### `transition` 属性

- **`transition-property`**: 指定哪些 CSS 属性需要过渡效果。
- **`transition-duration`**: 过渡效果持续的时间。
- **`transition-timing-function`**: 过渡效果的速度曲线。
- **`transition-delay`**: 过渡效果开始前的延迟时间。

#### `animation` 属性

- **`animation-name`**: 指定关键帧名称，定义动画效果。
- **`animation-duration`**: 动画持续的时间。
- **`animation-timing-function`**: 动画的速度曲线。
- **`animation-delay`**: 动画开始前的延迟时间。
- **`animation-iteration-count`**: 动画播放的次数。
- **`animation-direction`**: 动画播放的方向（正向、反向、交替）。
- **`animation-fill-mode`**: 动画在开始和结束时的样式。

#### 考察重点

- 理解：transition 和 animation 属性及其作用。
- 应用：根据需求选择合适的属性，实现平滑的过渡效果和复杂的动画效果。

## 参考答案

在 CSS3 中，`transition` 和 `animation` 是两种用于实现动画效果的属性。它们分别用于不同的动画需求和实现方式。

### Transition 属性：

`transition` 属性用于定义元素在状态改变时从一个样式转换到另一个样式的过渡效果。它包含以下几个属性：

- `transition-property`：指定过渡效果应用的 CSS 属性名称，多个属性可以用逗号分隔。
- `transition-duration`：指定过渡效果的持续时间，单位可以是秒(s)或毫秒(ms)。
- `transition-timing-function`：指定过渡效果的时间曲线，也就是过渡的速度变化函数。
- `transition-delay`：指定过渡效果开始之前的延迟时间，单位可以是秒(s)或毫秒(ms)。

示例：
```css
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  transition: width 1s ease-in-out;
}

.box:hover {
  width: 200px;
}
```

### Animation 属性：

`animation` 属性用于定义复杂的动画效果，可以自定义关键帧（keyframes）来实现更复杂的动画效果。它包含以下几个属性：

- `animation-name`：指定定义动画的关键帧名称。
- `animation-duration`：指定动画的持续时间，单位可以是秒(s)或毫秒(ms)。
- `animation-timing-function`：指定动画的时间曲线，也就是动画的速度变化函数。
- `animation-delay`：指定动画开始之前的延迟时间，单位可以是秒(s)或毫秒(ms)。
- `animation-iteration-count`：指定动画的重复次数，可以使用一个整数值或 `infinite`（表示无限循环）。
- `animation-direction`：指定动画的播放方向，可以是 `normal`（默认），`reverse`（反向播放），`alternate`（正向再反向循环），或 `alternate-reverse`（反向再正向循环）。
- `animation-fill-mode`：指定动画在非运行时的样式，可以是 `none`（默认），`forwards`（保持最后一帧的样式），`backwards`（应用第一帧的样式），或 `both`（同时应用第一帧和最后一帧的样式）。
- `animation-play-state`：指定动画的播放状态，可以是 `running`（默认，动画正在播放）或 `paused`（动画暂停）。

示例：
```css
@keyframes slide-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

.box {
  width: 100px;
  height: 100px;
  background-color: red;
  animation: slide-in 1s ease-in-out infinite alternate;
}
```
