---
level: 3
---

# 谈谈对 window.requestAnimationFrame 的理解

## 题目要点

#### 答题思路

1. **定义与用途**：
   - 简要介绍 `window.requestAnimationFrame` 是一个告诉浏览器你希望执行动画并请求浏览器在下次重绘之前调用你指定的函数来更新动画的方法。
   - 是专门用于动画循环的函数，比传统的 `setTimeout` 或 `setInterval` 更能保证动画的平滑性和效率。

2. **工作原理**：
   - 说明 `requestAnimationFrame` 会将动画的回调函数放入浏览器的任务队列中，并在浏览器下一次重绘之前调用该函数。
   - 它的调用频率与浏览器的显示频率相匹配，通常能达到60fps（每秒60帧），从而保证了动画的流畅性。

3. **使用场景**：
   - 指出 `requestAnimationFrame` 适用于需要连续更新屏幕或执行复杂动画的场景。
   - 它特别适用于游戏开发、页面滚动效果、动态图表等需要高性能动画的应用。

4. **优点**：
   - 提及它比 `setTimeout` 或 `setInterval` 更高效，因为它只在浏览器需要重绘时才调用回调函数，减少了不必要的调用。
   - 它能更好地利用浏览器性能，因为它允许浏览器优化动画的绘制过程。

5. **注意事项**：
   - 提到如果动画在回调函数中被取消（如通过调用 `cancelAnimationFrame`），则不会再调用该回调函数。
   - 在动画结束时应该取消 `requestAnimationFrame`，以避免内存泄漏。

#### 考察要点

1. **基础知识掌握程度**：是否了解 `requestAnimationFrame` 的基本概念和工作原理。
2. **应用能力**：是否知道在哪些场景下使用 `requestAnimationFrame` 更合适。
3. **性能优化意识**：是否认识到 `requestAnimationFrame` 在性能优化方面的优势。
4. **细节处理**：是否了解如何正确取消 `requestAnimationFrame` 以避免潜在的问题。

## 参考答案

window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

与setTimeout相比，requestAnimationFrame最大的优势是由系统来决定回调函数的执行时机。具体一点讲，如果屏幕刷新率是60Hz,那么回调函数就每16.7ms被执行一次，如果刷新率是75Hz，那么这个时间间隔就变成了1000/75=13.3ms，换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。

这个API的调用很简单，如下所示：

```javascript
let start;

function step(timestamp) {
  if (start === undefined)
    start = timestamp;
  const elapsed = timestamp - start;

  //这里使用`Math.min()`确保元素刚好停在200px的位置。
  element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

  if (elapsed < 2000) { // 在两秒后停止动画
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```

* CPU节能：使用setTimeout实现的动画，当页面被隐藏或最小化时，setTimeout 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费CPU资源。而requestAnimationFrame则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统步伐走的requestAnimationFrame也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了CPU开销。
* 函数节流：在高频率事件(resize,scroll等)中，为了防止在一个刷新间隔内发生多次函数执行，使用requestAnimationFrame可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。一个刷新间隔内函数执行多次时没有意义的，因为显示器每16.7ms刷新一次，多次绘制并不会在屏幕上体现出来。
