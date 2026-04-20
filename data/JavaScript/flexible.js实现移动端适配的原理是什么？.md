---
level: 3
---

# flexible.js实现移动端适配的原理是什么？

## 题目要点

`flexible.js` 是一个用于移动端适配的 JavaScript 库，它能够根据不同的屏幕尺寸动态地设置页面的根字体大小，从而实现响应式布局。其核心原理是利用了视口单位 `vw`（视口宽度）和 `vh`（视口高度）来定义布局。

`flexible.js` 的原理可以概括为以下几个步骤：

1. **设置视口宽度单位**：
   `flexible.js` 会首先将页面的根元素（通常是 `<html>`）的字体大小设置为 `100vw`，即视口宽度的100%。这样做的好处是，无论屏幕大小如何变化，根元素的大小总是与视口宽度成正比，从而保证了布局的响应性。
2. **计算根元素的实际字体大小**：
   `flexible.js` 会根据屏幕的宽度计算出根元素的实际字体大小。这个计算过程通常是基于设计稿的宽度（比如750px）和屏幕宽度之间的比例来进行的。例如，如果设计稿的宽度是750px，屏幕宽度是375px，那么根元素的字体大小就是 `750px / 375px = 2`。
3. **动态设置根元素字体大小**：
   `flexible.js` 会将计算出的根元素字体大小设置为实际的像素值，例如 `100px`。这样，整个页面的布局就会根据屏幕的宽度进行缩放，以适应不同的屏幕尺寸。
4. **确保页面元素的适配**：
   为了确保页面中的其他元素也能够适配不同屏幕尺寸，`flexible.js` 通常还会提供一个适配的函数，允许开发者为页面上的其他元素指定适配的像素值。这个函数会根据根元素的字体大小和设计稿的宽度来计算出相应的像素值。

## 参考答案

> flexible.js 官方已不再维护，目前推行 vw 适配方案，本答案只是为了分析它的原理。

flexible.js存在的目的，是为了让网页在各终端上的展示效果就像缩放设计稿图片一样，在不同屏幕上等比缩放，每一个元素与整体比例保持不变，真实还原设计稿。

# 基本原理

设页面宽度为P（单位px）

设计稿宽度为750px

设html基准值为X（单位px）

----

首先将页面分为100份，份的单位为F

设1F的像素值为A（单位px/F）

那么：

P = 100F * A

A = P/100F

当P为750时，A=7.5px/F，即一份为7.5px

有没有感觉这个A有点熟悉，没错它就是X，上面份的单位F其实就是rem。

（html font-size的基准值单位虽然写为px，但其实是px/F，这点你知道就可以了）

现在懂了吧。

rem的原理就是份，我们根据设计稿得到元素的份，写到代码中的也是份，现在只要动态改变html的基准值，就能够在不同屏幕下适配，从而还原设计稿尺寸了。

所以flexible.js的原理主要是：

window.onresize = function() {
	html.size = P/100 + 'px'
}

当然针对高清屏，它还会设置“viewport scale”，以缩放页面，解决类似高清屏下无法实现1px边框等问题。

需要注意的是，基准值其实是个动态值，只是在写代码时，我们是按照设计稿宽度计算的基准值写的rem，即以设计稿为标准进行屏幕适配的（将设计稿用代码还原成UI界面），但在实际运行时，页面宽度是动态的，所以基准值也是动态的哦。


# 源码解析

flexible.js 的源码并不多，总共不到 50 行：

```js
(function flexible (window, document) {
  var docEl = document.documentElement // 返回文档的root元素
  var dpr = window.devicePixelRatio || 1 
  // 获取设备的dpr，即当前设置下物理像素与虚拟像素的比值

  // 调整body标签的fontSize，fontSize = (12 * dpr) + 'px'
  // 设置默认字体大小，默认的字体大小继承自body
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  // 设置root元素的fontSize = 其clientWidth / 10 + ‘px’
  function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // 当页面展示或重新设置大小的时候，触发重新
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // 检测0.5px的支持，支持则root元素的class中有hairlines
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
```
