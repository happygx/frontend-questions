---
level: 3
---

# 请使用 css 实现卡片翻转的动画

## 题目要点

- 使用 `perspective` 实现 3D 效果  
- `card-inner` 设置 `transform-style: preserve-3d` 和 `transition`  
- 正反两面通过 `backface-visibility: hidden` 隐藏背面  
- 背面需要额外 `rotateY(180deg)` 对齐

## 参考答案

可以使用 **3D 变换（transform: rotateY）** + **过渡动画（transition）**实现。

下面的例子，可以通过 hover 实现控制水平翻转：

```html
  <div class="card-inner">
    <div class="card-front">Front</div>
    <div class="card-back">Back</div>
  </div>
</div>
```
.card {
  width: 200px;
  height: 300px;
  perspective: 1000px; /* 创建 3D 视角 */
}

.card-inner {
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  position: relative;
}

/* 触发翻转效果 */
.card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.card-front {
  background: #fff;
  color: #000;
}

.card-back {
  background: #333;
  color: #fff;
  transform: rotateY(180deg);
}
```
