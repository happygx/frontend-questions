---
level: 2
---

# 如何拦截 web 应用的请求

## 参考答案

在前端拦截和处理 Web 应用的所有请求，可以使用以下方法：


1. **使用 Fetch 或 XMLHttpRequest**：在前端代码中使用 Fetch API 或 XMLHttpRequest 对象发送请求。通过拦截 Fetch 或 XMLHttpRequest 对象的 open 和 send 方法，可以在请求发出前进行拦截和修改。这样可以捕获请求的相关信息，并进行相应的处理。

示例代码（使用 Fetch API）：

```javascript
window.fetch = function (url, options) {
  // 在请求发出前进行拦截和处理
  console.log('拦截到请求:', url);
  
  // 可以修改请求的相关信息
  // options.headers['Authorization'] = 'Bearer token';
  
  return originalFetch.apply(this, arguments);
};
```

示例代码：

```javascript
  // 在请求发出前进行拦截和处理
  console.log('拦截到请求:', event.request.url);
  
  // 可以修改请求的相关信息
  // event.request.headers.set('Authorization', 'Bearer token');
  
  event.respondWith(fetch(event.request));
});
```


3. **如果是使用是三方请求库， 比如 aixos** ， 可以直接使用三方库提供的能力

是的，使用 axios 也可以拦截请求。axios 提供了拦截器（interceptors）的功能，可以在请求发出前进行拦截和处理。

示例代码：

```javascript

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求发出前进行拦截和处理
  console.log('拦截到请求:', config.url);
  
  // 可以修改请求的相关信息
  // config.headers['Authorization'] = 'Bearer token';
  
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 发送请求
axios.get('/api/data')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
```

使用 axios 拦截请求只能在客户端进行，对服务器端的请求无法拦截。同样需要谨慎处理敏感信息，并确保安全性。
