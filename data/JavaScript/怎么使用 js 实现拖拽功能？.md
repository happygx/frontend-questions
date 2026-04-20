---
level: 1.5
---

# 怎么使用 js 实现拖拽功能？


## 题目要点

拖拽的核心原理是通过按下、移动、释放三个阶段的指针事件，基于坐标差值计算元素位移，并通过 transform 更新视觉位置。高频移动需要结合 requestAnimationFrame 进行性能优化，复杂场景涉及边界控制、碰撞检测和状态同步。其本质是连续输入驱动的实时渲染过程，而非浏览器提供的特殊机制。

## 参考答案

拖拽的本质不是“元素跟着鼠标动”，而是：**通过指针事件驱动位置计算，在连续渲染中不断更新元素的位移**。它是一个典型的“输入 → 计算 → 渲染”循环。

可以从事件流、坐标体系、性能控制三个层面理解。

---

## 一、事件模型：拖拽的基本生命周期

无论是鼠标还是触控，拖拽都遵循三段式流程：

1. 按下（mousedown / pointerdown）
2. 移动（mousemove / pointermove）
3. 释放（mouseup / pointerup）

核心逻辑是：

* 在按下时记录起始坐标
* 在移动时计算偏移量
* 在释放时清理监听

一个最简化的实现思路：

```js
let startY = 0;

element.addEventListener("mousedown", (e) => {
  startX = e.clientX;
  startY = e.clientY;

  function onMove(e) {
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  }

  function onUp() {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
  }

  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUp);
});
```

* move 事件必须绑定在 document 上，避免鼠标移出元素后丢失事件
* 位移是通过差值计算，而不是直接赋值坐标

---

## 二、坐标体系的选择

拖拽涉及多个坐标系：

* clientX / clientY（视口坐标）
* pageX / pageY（包含滚动）
* screenX / screenY（屏幕坐标）
* offsetLeft / offsetTop（相对定位父级）

一般拖拽使用 client 坐标即可。

如果页面存在滚动，需要结合 scrollTop 计算。

---

## 三、为什么通常使用 transform 而不是 left/top

直接修改 left/top 会触发：

* layout（回流）
* paint（重绘）

而 transform 属于：

* 只触发 composite（合成层）

性能更优，尤其在高频 move 事件中。

因此现代拖拽库基本都使用：

```js
```

---

## 四、性能优化：高频事件处理

mousemove / pointermove 触发频率极高。

如果每次都直接更新 DOM，会导致主线程阻塞。

优化方式包括：

1. 使用 requestAnimationFrame 节流

```js

function onMove(e) {
  if (!ticking) {
    requestAnimationFrame(() => {
      updatePosition(e);
      ticking = false;
    });
    ticking = true;
  }
}
```

`pointerdown / pointermove / pointerup` 可以避免分别监听 mouse 和 touch。

---

## 五、HTML5 Drag and Drop API

浏览器原生提供了一套拖拽 API：

* dragstart
* dragover
* drop
* dataTransfer

但这套 API 主要用于：

* 文件拖入
* 浏览器内部元素拖拽

缺点：

* 自定义能力弱
* 在移动端支持不好
* 交互可控性有限

因此现代前端工程中，大多数复杂拖拽场景（例如可排序列表、画布编辑器）都采用“自定义拖拽实现”。

---

## 六、复杂拖拽的扩展问题

真实项目中拖拽通常还涉及：

### 1. 边界限制

限制元素只能在容器内移动，需要计算：

* 容器宽高
* 元素宽高
* 最大可移动范围

### 2. 吸附与碰撞检测

例如拖拽排序，需要判断当前位置与其他元素的重叠区域。

通常通过：

* getBoundingClientRect
* 计算中线
* 决定插入位置

### 3. 拖拽与虚拟 DOM 的协调

在 React / Vue 中：

* 频繁 setState 会导致重渲染
* 一般拖拽过程用 ref 直接操作 DOM
* 释放时再同步状态

否则性能会明显下降。

---

## 七、从底层理解拖拽

拖拽本质是：

* 监听连续输入事件
* 通过坐标差计算位移
* 更新视觉表现
* 在释放时完成状态确认

它不是一个特殊能力，而是“连续事件驱动动画”的一种形式。

本质上属于交互式动画的一种实现方式。
