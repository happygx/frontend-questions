---
level: 2
---

# WebWorker、SharedWorker 和 ServiceWorker 有哪些区别？

## 题目要点

- **WebWorker**：用于在后台线程执行 JavaScript 代码，适用于计算密集型任务。生命周期与页面关联。
- **SharedWorker**：允许多个页面或 iframe 共享一个 Worker 实例，适用于跨页面共享数据。生命周期与浏览器会话关联。
- **ServiceWorker**：用于拦截网络请求、缓存资源、实现离线功能等，适用于增强 Web 应用的离线体验和推送功能。生命周期与页面无关。

## 参考答案

`WebWorker`、`SharedWorker` 和 `ServiceWorker` 都是 Web API 提供的用于在后台线程执行 JavaScript 代码的机制，但它们有不同的用途和特性。下面是它们的主要区别：

### **1. WebWorker**

- **作用**：用于在后台线程中执行 JavaScript 代码，避免阻塞主线程（UI线程）。
- **生命周期**：与页面的生命周期关联，当页面关闭时，WebWorker 也会终止。
- **通信**：通过 `postMessage` 和 `onmessage` 进行通信，只能与创建它的页面进行通信，不能与其他页面或 Worker 进行直接通信。
- **共享数据**：不能直接与其他 WebWorkers 或页面共享数据。
- **应用场景**：适用于需要在后台执行计算密集型任务的场景，如数据处理、图像处理等。

**示例**：
```javascript
const worker = new Worker('worker.js');
worker.postMessage('Hello, worker!');
worker.onmessage = (event) => console.log(event.data);

// worker.js
self.onmessage = (event) => {
  self.postMessage(`Received: ${event.data}`);
};
```

- **作用**：允许多个浏览器上下文（如不同的页面或 iframe）共享一个 Worker 实例。
- **生命周期**：与浏览器会话关联，不会随页面关闭而销毁，只要有一个页面或 iframe 仍在使用 SharedWorker，它就会保持活跃。
- **通信**：通过 `postMessage` 和 `onmessage` 进行通信，但可以在不同的页面或 iframe 之间进行通信。
- **共享数据**：可以在多个页面或 iframe 之间共享数据。
- **应用场景**：适用于需要在多个页面或 iframe 之间共享数据或状态的场景，如实时应用、共享缓存等。

**示例**：
```javascript
const worker = new SharedWorker('shared-worker.js');
worker.port.postMessage('Hello from page 1!');
worker.port.onmessage = (event) => console.log(event.data);

// main2.js
const worker = new SharedWorker('shared-worker.js');
worker.port.postMessage('Hello from page 2!');
worker.port.onmessage = (event) => console.log(event.data);

// shared-worker.js
self.onconnect = (event) => {
  const port = event.ports[0];
  port.onmessage = (event) => {
    port.postMessage(`Received: ${event.data}`);
  };
};
```

- **作用**：主要用于拦截和处理网络请求，缓存资源，实现离线功能和推送通知等功能。
- **生命周期**：与页面的生命周期无关，可以在后台长时间运行，不会随页面的关闭而结束。可以在浏览器关闭时继续运行，用于处理推送通知等。
- **通信**：通过 `postMessage` 和 `onmessage` 与页面进行通信，但不能直接访问 DOM。
- **共享数据**：通过缓存机制（Cache API）和 IndexedDB 进行数据存储和共享。
- **应用场景**：适用于实现离线支持、缓存优化、后台同步、推送通知等功能。

**示例**：
```javascript
self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/styles/main.css',
        '/script/main.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```
