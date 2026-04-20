---
level: 2
---

# 如何实现一个可以监听任何事件的React Hooks？

## 题目要点

* 核心是 **用 useEffect 管理绑定和解绑、用 useRef 保存最新回调**；
* 可以监听任意事件类型和事件源，保持 Hook 高复用性；
* 保证清理机制，防止内存泄漏。

## 参考答案

在 React 中，如果想实现一个可以 **监听任意 DOM 或全局事件的 Hook**，核心思路是：

1. 利用 `useEffect` 做生命周期管理，确保事件绑定和解绑正确；
2. 使用 `useRef` 保存回调函数，避免每次渲染都重新绑定；
3. 支持可配置的事件源（`window`、`document`、任意 DOM 元素）。


## 一、核心 Hook 实现

```js

/**
 * useEventListener - 通用事件监听 Hook
 * @param {string} eventName - 事件名
 * @param {function} handler - 事件回调
 * @param {EventTarget} element - 监听目标，默认 window
 */
function useEventListener(eventName, handler, element = window) {
  // 保存 handler 的最新引用，避免每次 render 重新绑定
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // 确保 element 可用
    const targetElement = element && 'addEventListener' in element ? element : window;
    if (!targetElement) return;

    // 定义事件回调，保证调用最新 handler
    const eventListener = (event) => savedHandler.current(event);

    targetElement.addEventListener(eventName, eventListener);

    // 清理函数
    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

export default useEventListener;
```

## 二、使用示例

### 1. 监听窗口大小变化

```js
import { useState } from 'react';

function WindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEventListener('resize', () => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  });

  return <div>窗口大小: {size.width} x {size.height}</div>;
}
```

```js
  useEventListener('keydown', (e) => {
    console.log('按下的键:', e.key);
  });

  return <div>按下任意键查看控制台日志</div>;
}
```

## 三、设计要点

1. **避免重复绑定**：

   * `useRef` 保存 handler，`useEffect` 只在事件类型或目标改变时绑定/解绑；

2. **清理事件**：

   * `useEffect` 返回清理函数，保证组件卸载时不会造成内存泄漏；

3. **支持灵活事件源**：

   * 默认绑定到 `window`，也可以传入任意 `EventTarget` 或 DOM 元素。

4. **可复用性高**：

   * 这个 Hook 可用于监听任意事件，如鼠标、滚动、键盘、拖拽、自定义事件等。
