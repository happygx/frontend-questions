---
level: 3.5
---

# Service Worker 是如何缓存 http 请求资源的？

## 题目要点

Service Worker 通过拦截 HTTP 请求，并使用缓存 API 存储和管理缓存资源，使得应用能够离线访问，提高了应用的性能和可靠性。核心过程包括注册 Service Worker、在 `install` 事件中预缓存资源、在 `fetch` 事件中拦截请求并从缓存或网络返回资源，以及在 `activate` 事件中进行缓存清理。

## 参考答案

Service Worker 的缓存机制是通过缓存 API 实现的，它允许开发者拦截和缓存 HTTP 请求，以提高离线体验和加速页面加载。以下是 Service Worker 缓存 HTTP 请求资源的基本流程和原理：

### **1. 注册 Service Worker**

首先，Service Worker 需要在浏览器中注册。通常在主线程（如 JavaScript 入口文件）中进行注册：

```javascript
  navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}
```

在 Service Worker 脚本中，首先会触发 `install` 事件。在这个事件中，可以预缓存一些资源，以便在 Service Worker 激活后立即可用：

```javascript
  event.waitUntil(
    caches.open('my-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/styles/main.css',
        '/scripts/main.js',
        '/images/logo.png'
      ]);
    })
  );
});
```

`activate` 事件在 Service Worker 安装完成后触发。可以在这个事件中进行缓存清理，删除旧的缓存：

```javascript
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          // 这里可以指定要删除的缓存
          return cacheName !== 'my-cache-v1';
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
```

`fetch` 事件允许 Service Worker 拦截所有的网络请求。可以根据需要从缓存中返回资源，或将请求转发到网络：

```javascript
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // 如果缓存中有匹配的资源，直接返回
      if (cachedResponse) {
        return cachedResponse;
      }

      // 否则，发起网络请求
      return fetch(event.request).then(response => {
        // 克隆响应对象，因为响应只能被消费一次
        const responseClone = response.clone();

        // 将网络请求的结果缓存
        caches.open('my-cache-v1').then(cache => {
          cache.put(event.request, responseClone);
        });

        return response;
      });
    }).catch(() => {
      // 网络和缓存都失败的情况
      return new Response('Oops, something went wrong.');
    })
  );
});
```

- **缓存清理**：定期删除过期或不再需要的缓存，保持缓存的健康状态。
- **缓存策略**：可以实现不同的缓存策略，如缓存优先、网络优先、缓存和网络同时等。
