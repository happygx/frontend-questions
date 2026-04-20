---
level: 3.5
---

# CSS中的1像素问题是什么？有哪些解决方案？

## 题目要点

- **1 像素问题** 是由于高分辨率屏幕上的像素密度不同，导致 1 像素边框或线条的渲染问题。
- **解决方案** 包括使用 `border`、`box-shadow`、`transform`、`background`、CSS 变量、媒体查询，以及 SVG 或 Canvas 绘制。

## 参考答案

## 1px 边框问题的由来

苹果 iPhone4 首次提出了 Retina Display（视网膜屏幕）的概念，在 iPhone4 使用的视网膜屏幕中，把 2x2 个像素当 1 个物理像素使用，即使用 2x2 个像素显示原来 1 个物理像素显示的内容，从而让 UI 显示更精致清晰，这 2x2 个像素叫做逻辑像素。

像这种像素比（像素比（即dpr）＝ 物理像素 / 逻辑像素）为 2 的视网膜屏幕也被称为二倍屏，目前市面上还有像素比更高的三倍屏、四倍屏。

而 CSS 中 1px 指的是物理像素，因此，设置为 1px 的边框在 dpr = 2 的视网膜屏幕中实际占用了 2 个逻辑像素的宽度，这就导致了界面边框变粗的视觉体验。

## 使用 transform 解决

通过设置元素的 box-sizing 为 border-box，然后构建伪元素，再使用 CSS3 的 transform 缩放，这是目前市面上最受推崇的解决方法。这种方法可以满足所有的场景，而且修改灵活，唯一的缺陷是，对于已使用伪元素的元素要多嵌套一个无用元素。具体的实现如下：

```css
  position: relative;
  box-sizing: border-box;
}

.one-pixel-border::before {
  display: block;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200%;
  height: 200%;
  border: 1px solid red;
  transform: translate(-50%, -50%) scale(0.5, 0.5);
}
```

还可以结合媒体查询（@media）解决不同 dpr 值屏幕的边框问题，如下：

```css
  ...
}

@media screen and (-webkit-min-device-pixel-ratio: 3), (min-resolution: 3dppx) {
  ...
}
```
