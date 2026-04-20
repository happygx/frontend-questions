---
level: 3
---

# `requestAnimationFrame` 与 `requestIdleCallback` 在渲染优化中的执行时机差异？谁优先触发？

## 题目要点

`requestAnimationFrame` 在浏览器即将进行下一帧渲染之前执行，用于动画与视觉更新，优先级高于渲染阶段后的任务。`requestIdleCallback` 只会在当前帧所有渲染任务完成且仍有剩余时间时触发，属于低优先级空闲调度机制。因此在同一帧中，rAF 必然先于 rIC 执行。rAF 用于保证帧同步，rIC 用于利用空闲时间执行非关键任务。

## 参考答案

这个问题本质是理解 **浏览器一帧的调度模型**。
不搞清楚一帧里发生了什么，很容易回答成“谁快谁慢”这种表层结论。

核心结论先给出：

> 在有下一帧渲染需求的情况下，`requestAnimationFrame` 一定优先于 `requestIdleCallback` 执行。
> `requestIdleCallback` 只会在当前帧还有“空闲时间”时才会触发。

下面从浏览器帧模型拆解。

---

# 一、浏览器一帧的基本流程

以 60fps 为例，一帧约 16.6ms。

一次完整渲染循环大致是：

1. 执行宏任务（例如 setTimeout）
2. 清空微任务队列
3. 触发 requestAnimationFrame 回调
4. 进行样式计算（Style）
5. 布局计算（Layout）
6. 绘制（Paint）
7. 合成（Composite）
8. 如果还有时间 → 执行 requestIdleCallback

需要明确一点：

* rAF 是“下一帧渲染前”的回调
* rIC 是“当前帧剩余时间”的回调

---

# 二、requestAnimationFrame 的执行时机

`requestAnimationFrame` 的设计目标是：

> 在浏览器即将进行下一次重绘之前执行回调。

特点：

* 每帧最多执行一次
* 与刷新率同步
* 在样式计算之前触发
* 如果标签页不可见，会暂停

执行时机可以理解为：

> 在下一帧开始渲染流程之前

示例：

```js
requestAnimationFrame(() => {
  // 适合更新动画状态
})
```

---

# 三、requestIdleCallback 的执行时机

`requestIdleCallback` 的设计目标是：

> 利用主线程空闲时间执行低优先级任务。

它有两个触发条件：

1. 当前帧执行完所有渲染任务后仍有剩余时间
2. 或者超时（timeout）触发

示例：

```js
requestIdleCallback((deadline) => {
  while (deadline.timeRemaining() > 0) {
    // 做低优先级任务
  }
});
```

* 不保证每帧都会执行
* 如果帧很忙，可能一直被延迟
* 优先级低于渲染任务

---

# 四、两者在同一帧中的相对顺序

假设：

```js
requestAnimationFrame(() => console.log('rAF'));
requestIdleCallback(() => console.log('rIC'));
```

```
rIC
```

* rAF 是渲染前任务
* rIC 是渲染后空闲任务

只要这一帧需要渲染，rAF 必然优先。

---

# 五、极端情况分析

## 情况一：主线程持续繁忙

如果 JavaScript 长时间占用主线程：

* rAF 会延迟到下一帧
* rIC 可能根本不执行

rIC 不保证执行时间。

---

## 情况二：页面不可见

* rAF 会暂停
* rIC 仍可能执行（取决于浏览器策略）

---

## 情况三：高帧率显示器

在 120Hz 下：

* 每帧时间更短（约 8ms）
* rIC 更难获得空闲时间

---

# 六、在渲染优化中的使用场景

## requestAnimationFrame 适合：

* 动画
* DOM 变更
* 视觉相关更新
* 滚动同步

因为它保证在渲染前执行。

---

## requestIdleCallback 适合：

* 预加载
* 数据预计算
* 日志上报
* 非关键计算

因为它只在空闲时间运行。

---

# 七、优先级总结

在浏览器调度优先级中：

微任务 > rAF > 渲染 > rIC

可以抽象为：

高优先级（影响视觉） → rAF
低优先级（非关键逻辑） → rIC

---

# 八、本质差异

可以从“目标函数”角度理解：

* rAF 优化的是“帧同步”
* rIC 优化的是“主线程利用率”

两者并不是竞争关系，而是不同调度通道。
