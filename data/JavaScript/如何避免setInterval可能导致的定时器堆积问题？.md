---
level: 1
---

# 如何避免setInterval可能导致的定时器堆积问题？

## 题目要点

1. **根本问题**：`setInterval` 固定周期触发，任务未完成时仍会排队，可能造成堆积。
2. **推荐做法**：

   * 优先使用递归 `setTimeout`，保证任务顺序执行；
   * 或在 `setInterval` 中加标志位判断，避免重叠。
3. **额外优化**：对动画类或 UI 更新类任务，用 `requestAnimationFrame` 代替固定定时器，提高渲染效率。

## 参考答案

`setInterval` 在 JavaScript 中按照固定时间间隔重复执行回调，但由于 JS 单线程机制，如果回调执行时间超过间隔，就会导致 **定时器堆积**（多个回调排队等待执行），产生性能问题或逻辑异常。

下面介绍几种避免方法：

---

## 一、使用递归 `setTimeout` 替代 `setInterval`

原理：**在回调执行完后再启动下一次定时器**，保证不会重叠。

```js
  // 执行异步或耗时操作
  console.log('任务执行');
  
  // 完成后再递归调用
  setTimeout(doTask, 1000); // 1000ms 后再次执行
}

setTimeout(doTask, 1000);
```

* 每次间隔从上一次任务结束时开始计算，更安全；
* 可根据实际执行时间动态调整间隔。

---

## 二、在 `setInterval` 回调中加入执行状态判断

原理：**用一个标志位判断任务是否正在执行**，避免重叠。

```js

const interval = setInterval(() => {
  if (isRunning) return; // 上一次还没完成，跳过

  isRunning = true;
  doAsyncTask().finally(() => {
    isRunning = false;
  });
}, 1000);
```

* 任务仍然按照固定间隔触发，但不会堆积回调；
* 对耗时异步任务尤为重要。

---

## 三、使用 `requestAnimationFrame`（针对动画或 UI 刷新）

* 对于与渲染相关的循环任务，推荐 `requestAnimationFrame` 替代 `setInterval`，保证任务与浏览器渲染同步，避免不必要的重复调用。

```js
  // 更新动画逻辑
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```
