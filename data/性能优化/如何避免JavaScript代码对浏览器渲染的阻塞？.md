---
level: 3
---

# 如何避免JavaScript代码对浏览器渲染的阻塞？

## 题目要点

1. **优化加载顺序**：`defer` / `async` / 脚本底部，减少 HTML 解析阻塞；
2. **拆分长任务**：将大任务分块执行或异步调度，避免阻塞渲染；
3. **按需加载 JS**：减少首屏加载体积，延迟非关键脚本；
4. **使用 Web Worker**：处理耗时任务，不占用主线程；
5. **减少回流重绘**：避免频繁读写 layout、批量操作 DOM。

## 参考答案

JavaScript 是单线程执行的，如果不加控制，会 **阻塞浏览器解析 HTML 和渲染页面**，导致首屏渲染延迟。避免阻塞的策略主要有以下几类：


## 一、调整 `<script>` 加载方式

1. **`defer`**

* 解析 HTML 时不会阻塞，脚本在 DOM 构建完成后按顺序执行。
* 适合有依赖关系、需要操作 DOM 的脚本。

```html
```

* 脚本异步加载，加载完成立即执行，可能会打乱执行顺序。
* 适合无依赖关系、独立的脚本（如统计、广告）。

```html
```

* HTML 解析完成后才执行 JS，减少首屏阻塞。

---

## 二、减少同步、长时间运行的 JS

1. **避免长任务**

* 单次执行时间过长的 JS 会阻塞渲染。
* 可以将大任务拆分成小块，用 `setTimeout` 或 `requestIdleCallback` 异步执行。

```js
  let i = 0;
  function chunk() {
    const end = Math.min(i + 1000, arr.length);
    for (; i < end; i++) {
      // 处理逻辑
    }
    if (i < arr.length) {
      setTimeout(chunk, 0);
    }
  }
  chunk();
}
```

* 避免在循环中频繁读写 layout 属性（如 `offsetWidth`、`scrollTop`），这会触发同步回流。
* 通过 **缓存 DOM 信息** 或 **批量修改样式** 避免回流。

---

## 三、按需加载资源

1. **动态按需加载 JS**

* 仅加载当前页面需要的模块，减少阻塞。
* 可以使用 **Code Splitting** 或动态 `import()`。

```js
  const module = await import('./heavyModule.js');
  module.doSomething();
});
```

* 将统计、广告等第三方脚本延迟加载，保证首屏渲染。

---

## 四、利用 Web Worker 执行耗时任务

* Web Worker 在**独立线程**执行 JS，主线程不会被阻塞。
* 适合 CPU 密集型计算，如数据处理、图片处理等。

```js
worker.postMessage(largeData);
worker.onmessage = (e) => console.log('处理结果:', e.data);
```
