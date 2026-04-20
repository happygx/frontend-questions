---
level: 2.5
---

# JavaScript 中如何取消请求

## 题目要点

### 取消XMLHttpRequest请求

XMLHttpRequest的取消可以通过调用`abort()`方法来实现。这个方法会立即停止当前的请求，并释放相关资源。例如：

```javascript
xhr.open('GET', '<http://127.0.0.1:3000/api/get>', true);
xhr.send();
setTimeout(() => {
  xhr.abort();
}, 1000);
```

### 取消Fetch请求

Fetch API使用`AbortController`来取消请求。`AbortController`的`signal`属性可以作为参数传递给fetch请求，以便在需要时取消请求。例如：

```javascript
void (async function () {
  try {
    const response = await fetch('<http://127.0.0.1:3000/api/get>', {
      signal: controller.signal,
    });
    const data = await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Fetch request has been aborted.');
    } else {
      throw error;
    }
  }
})();
setTimeout(() => {
  controller.abort();
}, 1000);
```

### 取消axios请求

axios同样支持`AbortController`来取消请求。取消axios请求的代码示例如下：

```javascript
const API_URL = '<http://127.0.0.1:3000/api/get>';
void (async function () {
  try {
    const response = await axios.get(API_URL, {
      signal: controller.signal,
    });
    const { data } = response;
  } catch (error) {
    if (error.isAxiosError && error.message === 'Canceled') {
      console.log('axios request has been canceled.');
    } else {
      throw error;
    }
  }
})();
setTimeout(() => {
  controller.abort();
}, 1000);
```

## 参考答案

JavaScript 实现异步请求就靠浏览器提供的两个 API —— **XMLHttpRequest 和 Fetch**。我们平常用的较多的是 Promise 请求库 axios，它基于 XMLHttpRequest。

本篇带来 XMLHttpRequest、Fetch 和 axios 分别是怎样“取消请求”的。

### 取消 XMLHttpRequest 请求

当请求已经发送了，可以使用 **XMLHttpRequest.abort()** 方法取消发送，代码示例如下：

```js
xhr.open('GET', '<http://127.0.0.1:3000/api/get>', true);
xhr.send();
setTimeout(() => {
	 xhr.abort();
}, 1000);
```

不如在 Chrome DevTools Network 中，看看正常请求和取消请求的对比图：

![image.png](https://static.ecool.fun//article/86b6d8c6-1afb-465f-b084-bf4716fab7b2.png)

### 取消 Fetch 请求

取消 Fetch 请求，需要用到 [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) API。我们可以构造一个 controller 实例：**`const controller = new AbortController()` ,** controller 它有一个只读属性 [AbortController.signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)，可以作为参数传入到 fetch 中，用于将控制器与获取请求相关联；

代码示例如下：

```js
void (async function () {
    const response = await fetch('<http://127.0.0.1:3000/api/get>', {
        signal: controller.signal,
    });
    const data = await response.json();
})();

setTimeout(() => {
    controller.abort();
}, 1000);
```

![image.png](https://static.ecool.fun//article/3d2f4cfa-dd06-4e83-973a-a2c5c6fbfc7f.png)

我们其实可以在 controller.abort() 传入“取消请求的原因”参数，然后进行 try...catch 捕获

![image.png](https://static.ecool.fun//article/db951d09-396d-44e9-bd3c-5c1857dd0b28.png)

### 取消 axios 请求

axios 同样支持 [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

```js
const API_URL = '<http://127.0.0.1:3000/api/get>';
void (async function () {
    const response = await axios.get(API_URL, {
        signal: controller.signal,
    });
    const { data } = response;
})();
setTimeout(() => {
    controller.abort();
}, 1000);
```

![image.png](https://static.ecool.fun//article/fd990541-a05b-4d70-b802-130a83e47617.png)

错误捕获：

![image.png](https://static.ecool.fun//article/a917101b-364e-43a9-a80f-fe0030ebec20.png)

注意：axios 之前用于取消请求的 CancelToken 方法已经被弃用，更多请见文档 [axios-http.com/docs/cancel…](https://axios-http.com/docs/cancellation)；
