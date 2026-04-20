---
level: 2.5
---

# 原生 js 如何进行监听路由的变化？

## 题目要点

1. **hash 路由**：使用 `hashchange` 事件即可监听。
2. **history 路由**：使用 `popstate` 事件，并重写 `pushState` 和 `replaceState` 方法触发自定义事件。

## 参考答案

在原生 JavaScript 中，可以通过监听 `hashchange` 事件和 `popstate` 事件来监听路由变化。以下是常见的方法：

### 1. 监听 `hashchange` 事件
`hashchange` 事件适用于基于哈希的路由（即 `#` 形式的路由，如 `example.com/#/home`）。

```javascript
    console.log('Hash changed to:', location.hash);
});
```
- **优点**：简单、兼容性好。
- **缺点**：只能监听 `#` 部分的变化，不适用于 `history` API 模式的路由。

### 2. 监听 `popstate` 事件
`popstate` 事件适用于 `history` API（例如 `pushState`、`replaceState`）实现的前端路由。

```javascript
    console.log('Location changed to:', location.pathname);
    console.log('State data:', event.state);
});
```
- **优点**：适用于 `history` API，能更好地支持现代路由方案。
- **缺点**：不包括直接调用 `pushState` 和 `replaceState` 的情况，需要手动触发。

### 3. 重写 `pushState` 和 `replaceState` 以触发自定义事件
`pushState` 和 `replaceState` 本身不会触发 `popstate`，可以重写它们并手动触发事件。

```javascript
history.pushState = function (...args) {
    originalPushState.apply(this, args);
    window.dispatchEvent(new Event('pushstate'));
};

const originalReplaceState = history.replaceState;
history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    window.dispatchEvent(new Event('replacestate'));
};

// 监听自定义的 pushstate 和 replacestate 事件
window.addEventListener('pushstate', () => {
    console.log('URL changed (pushState):', location.pathname);
});
window.addEventListener('replacestate', () => {
    console.log('URL changed (replaceState):', location.pathname);
});
```
