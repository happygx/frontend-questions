---
level: 3
---

# 实现一个 animate 方法，能够驱动元素从一个位置移动到另一个位置，要求支持动画的开始、暂停和取消功能。

## 题目要点

* **技术选型**：使用 `requestAnimationFrame` 保证动画与屏幕刷新率同步。
* **状态转换**：通过记录 `pausedTime` 和动态重置 `startTime` 实现暂停与恢复的平滑衔接。
* **渲染优化**：使用 `transform` 代替定位属性以减少重排开销。
* **健壮性**：在 `move` 或 `cancel` 时及时清理 `requestId`，防止内存泄漏和动画重叠。

## 参考答案

实现这类高性能动画的核心在于 **`requestAnimationFrame` (rAF)**。相比 `setTimeout`，rAF 能确保回调函数在浏览器每一次重绘之前执行，从而提供 60fps 左右的平滑体验。

以下是一个采用 ES6 类封装的 `Animate` 方案，它通过计算时间偏移量（Offset）来支持精准的暂停与恢复。

### 1. 代码实现

```javascript
    constructor(element) {
        this.el = element;
        this.requestId = null;
        this.startTime = null;
        this.pausedTime = 0; // 记录已消耗的动画时间
        this.duration = 1000;
        this.targetPos = { x: 0, y: 0 };
        this.startPos = { x: 0, y: 0 };
        this.isPaused = false;
    }

    move(x, y, duration = 1000) {
        this.cancel(); // 启动新动画前重置
        this.targetPos = { x, y };
        this.duration = duration;
        
        // 获取当前位置作为起始点
        const rect = this.el.getBoundingClientRect();
        this.startPos = { x: rect.left, y: rect.top };
        
        this.startTime = performance.now();
        this.isPaused = false;
        this.pausedTime = 0;
        
        this._run();
    }

    _run() {
        const step = (currentTime) => {
            if (this.isPaused) return;

            // 核心公式：进度 = (当前时间 - 开始时间 + 已跳过的时间) / 总时长
            const elapsed = currentTime - this.startTime + this.pausedTime;
            const progress = Math.min(elapsed / this.duration, 1);

            // 线性插值计算当前坐标
            const curX = this.startPos.x + (this.targetPos.x - this.startPos.x) * progress;
            const curY = this.startPos.y + (this.targetPos.y - this.startPos.y) * progress;

            this.el.style.transform = `translate(${curX}px, ${curY}px)`;

            if (progress < 1) {
                this.requestId = requestAnimationFrame(step);
            }
        };
        this.requestId = requestAnimationFrame(step);
    }

    pause() {
        if (this.isPaused || !this.requestId) return;
        this.isPaused = true;
        // 记录暂停时的进度时间
        this.pausedTime += performance.now() - this.startTime;
        cancelAnimationFrame(this.requestId);
    }

    resume() {
        if (!this.isPaused) return;
        this.isPaused = false;
        this.startTime = performance.now(); // 重设参考时间
        this._run();
    }

    cancel() {
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
            this.requestId = null;
        }
        this.isPaused = false;
        this.pausedTime = 0;
    }
}

```

* **状态保存与偏移量计算**：
暂停功能的难点在于重新启动时如何衔接。本方案引入了 `pausedTime`。当暂停时，计算出已经跑了多久；当恢复（Resume）时，重新获取当前时间戳作为 `startTime`，并叠加 `pausedTime`。这样能确保动画进度百分比的计算是连续的。
* **性能优化 (GPU 加速)**：
代码中通过修改 `style.transform` 而非 `left/top` 来移动元素。这可以避开浏览器的重排（Layout）阶段，直接进入复合（Composite）阶段，利用 GPU 渲染提高流畅度。
* **高精度时间戳**：
使用了 `performance.now()` 而非 `Date.now()`。前者提供微秒级精度，且不受系统时间漂移影响，是处理动画逻辑的标准做法。

### 3. 扩展建议

在工程实践中，线性移动（Linear）通常显得僵硬。可以通过引入 **Easing Functions**（缓动函数，如 Ease-in-out）来修改 `progress` 的计算方式：

从而使动画更符合物理直觉。
