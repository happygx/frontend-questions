---
level: 3
---

# web 应用中如何对静态资源加载失败的场景做降级处理？

## 题目要点

对静态资源加载失败进行降级处理可以通过备用资源、动态加载、服务工作者和功能降级等策略来实现。选择合适的方法可以提升应用的稳定性和用户体验，确保即使在资源加载失败时，用户也能获得良好的体验。

## 参考答案

在 Web 应用中，对静态资源加载失败的场景进行降级处理是确保应用稳定性和用户体验的关键。以下是一些常见的策略和方法：

### 1. **使用备用资源**

- **图片**：
  - 在 `<img>` 标签中使用 `onerror` 事件处理程序，当图片加载失败时，替换为备用图片。
  ```html
  <img src="main-image.jpg" alt="Image" onerror="this.src='fallback-image.jpg';">
  ```

- **CSS**：
  - 对于 CSS 文件，可以在 `<link>` 标签中设置备用 CSS 文件，但这种方式不如 JavaScript 的处理直接。通常建议使用 JavaScript 进行处理。
  ```html
  <link rel="stylesheet" href="main.css" onerror="this.href='fallback.css';">
  ```

### 2. **JavaScript 动态加载**

- **动态脚本加载**：
  - 使用 JavaScript 动态加载资源并处理加载失败情况。例如，可以使用 `fetch` 或 `XMLHttpRequest` 加载 JavaScript 文件或其他资源，并在失败时加载备用资源。
  ```javascript
  function loadScript(url, fallbackUrl) {
      const script = document.createElement('script');
      script.src = url;
      script.onerror = () => {
          script.src = fallbackUrl;
          document.head.appendChild(script);
      };
      document.head.appendChild(script);
  }

  loadScript('main-script.js', 'fallback-script.js');
  ```

- **动态样式表加载**：
  - 类似地，可以动态加载样式表并处理加载失败。
  ```javascript
  function loadStylesheet(url, fallbackUrl) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.onerror = () => {
          link.href = fallbackUrl;
      };
      document.head.appendChild(link);
  }

  loadStylesheet('main-styles.css', 'fallback-styles.css');
  ```

### 3. **利用Service Workers**

- **缓存和离线处理**：
  - 使用 Service Workers 来缓存静态资源，并提供离线访问或备用资源。在资源加载失败时，服务工作者可以提供缓存中的版本或备用资源。
  ```javascript
  // Example service worker script
  self.addEventListener('install', (event) => {
      event.waitUntil(
          caches.open('my-cache').then((cache) => {
              return cache.addAll([
                  '/main.css',
                  '/fallback.css',
                  '/main.js',
                  '/fallback.js'
              ]);
          })
      );
  });

  self.addEventListener('fetch', (event) => {
      event.respondWith(
          caches.match(event.request).then((response) => {
              return response || fetch(event.request).catch(() => {
                  return caches.match('/fallback.css'); // Or fallback.js
              });
          })
      );
  });
  ```

### 4. **Graceful Degradation**

- **功能降级**：
  - 设计时考虑功能降级，确保核心功能在静态资源加载失败时仍然可用。例如，提供基本功能和备用界面，即使某些样式或脚本没有加载成功。

### 5. **用户提示**

- 在静态资源加载失败时，向用户显示提示信息或错误页面，以告知他们发生了问题并提供解决方案或备用操作。
