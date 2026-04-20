---
level: 3
---

# 小程序如何实现rpx到px的转换？如何适配不同屏幕密度的设备（如Retina屏）？

## 题目要点

* **rpx → px**：根据屏幕宽度按比例转换
* **跨屏适配**：rpx 自动适配宽度，但涉及绘制或图片时需考虑 `devicePixelRatio`
* **优势**：使用 rpx 可以让布局在各种屏幕上保持一致，开发成本低

## 参考答案

在小程序开发中，为了实现 **界面自适应**，官方提供了 `rpx` 单位，而最终在渲染时需要转换为实际像素（`px`），同时需要兼顾不同屏幕密度的设备（如 Retina 屏）。

## 1. rpx 的概念

* `rpx`（responsive pixel）是微信小程序特有的单位。
* **设计初衷**：统一不同屏幕宽度的布局，使页面在各种设备上都能按比例显示。
* **转换规则**：

  * 以 **iPhone 6/7/8 宽度 750rpx** 作为设计稿参考宽度
  * 小程序会根据设备屏幕宽度自动计算比例

示例：

* 设备屏幕宽度：375px
* 1rpx = 375 / 750 = 0.5px

---

## 2. rpx → px 转换公式

```js
```

```js
const screenWidth = systemInfo.screenWidth  // 单位 px

function rpxToPx(rpx) {
  return rpx * screenWidth / 750
}
```
* 结合 `wx.createSelectorQuery()` 获取元素实际宽度，实现动态布局

---

## 3. 适配高密度屏（Retina、2K、4K 屏）

* **Retina 屏** 的特征是物理像素比（`devicePixelRatio`）大于 1

* 微信小程序渲染引擎会自动处理 **设备像素比**，所以在大部分情况下：

  * 使用 rpx → px 转换后，页面显示正常
  * 不必手动乘 `devicePixelRatio`

* 如果涉及 **Canvas 绘制或图片显示**：

  * 需要手动乘上 `devicePixelRatio`，保证在高分屏上清晰

```js
const canvasWidth = rpxToPx(300) * dpr
const canvasHeight = rpxToPx(200) * dpr
```

---

## 4. 实践建议

1. **布局元素**：

   * 使用 `rpx` 单位，自动适配不同屏幕宽度
   * 避免直接使用 px

2. **图片和 Canvas**：

   * 对图片可用多分辨率资源（@2x、@3x）
   * 对 Canvas 绘制手动乘 `devicePixelRatio`

3. **字体适配**：

   * 小程序的 `rpx` 也可以用在 `font-size`，保证文字大小随屏幕缩放
