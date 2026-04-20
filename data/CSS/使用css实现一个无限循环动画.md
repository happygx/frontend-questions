---
level: 1
---

# 使用css实现一个无限循环动画

## 题目要点

要实现一个无限循环的动画效果，可以使用 CSS 的 `animation-iteration-count` 属性设置为 `infinite`。

#### 示例

```css
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.element {
  animation: spin 2s linear infinite;
}
```

- @keyframes: 定义动画的关键帧。
- from: 动画开始时的状态。
- to: 动画结束时的状态。
- animation 属性：
- spin: 关键帧名称。
- 2s: 动画持续时间。
- linear: 动画速度曲线。
- infinite: 动画播放次数，设置为无限循环。

#### 考察重点

- 理解：@keyframes 和 animation 属性的用法。
- 应用：能够根据需求创建无限循环的动画效果。

## 参考答案

想要实现CSS动画的无限循环，其实主要就是要使用`animation-iteration-count`这个属性，将其设置为`infinite`，动画就会一直循环播放。

例如：

```html
```
.anima {
  animation-name: likes; // 动画名称
  animation-direction: alternate; // 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。
  animation-timing-function: linear; // 动画执行方式，linear：匀速；ease：先慢再快后慢；ease-in：由慢速开始；ease-out：由慢速结束；ease-in-out：由慢速开始和结束；
  animation-delay: 0s; // 动画延迟时间
  animation-iteration-count: infinite; //  动画播放次数，infinite：一直播放
  animation-duration: 1s; // 动画完成时间
}

@keyframes likes {
  0%{
  	transform: scale(1);
  }
  25%{
  	transform: scale(0.9);
  }
  50%{
  	transform: scale(0.85);
  }
  75%{
  	transform: scale(0.9);
  }
  100%{
  	transform: scale(1);
  }
}
```
