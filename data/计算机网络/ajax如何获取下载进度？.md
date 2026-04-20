---
level: 1.5
---

# ajax如何获取下载进度?

## 题目要点

通过 `XMLHttpRequest` 的 `progress` 事件，可以实时获取文件下载的进度。设置 `responseType` 为 `blob` 可以处理二进制数据，确保下载文件的正确处理。

## 参考答案

在使用 AJAX 进行文件下载时，可以通过 XMLHttpRequest 的 `progress` 事件来获取下载进度。以下是如何实现这一过程的详细步骤：

### **1. 使用 XMLHttpRequest 监控下载进度**

**1.1 创建 XMLHttpRequest 实例**

```javascript
```

设置请求的 URL 和方法（如 `GET`），并配置相关的事件监听器。

```javascript
xhr.responseType = 'blob'; // 如果下载的是二进制文件，可以设置为 'blob'
```

使用 `progress` 事件来获取下载进度。该事件会在文件下载过程中被触发。

```javascript
  if (event.lengthComputable) {
    const percentComplete = (event.loaded / event.total) * 100;
    console.log(`Download progress: ${percentComplete.toFixed(2)}%`);
  } else {
    // 下载进度不可计算
    console.log('Download progress: unknown');
  }
};
```

在请求完成后，处理下载的数据或执行其他操作。

```javascript
  if (xhr.status === 200) {
    // 处理成功的响应，例如保存文件
    const blob = xhr.response;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filename.ext'; // 设置下载文件名
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url); // 释放 URL 对象
  } else {
    console.error('Download failed');
  }
};
```

监听 `error` 和 `abort` 事件来处理可能的错误情况。

```javascript
  console.error('Download error');
};

xhr.onabort = function() {
  console.log('Download aborted');
};
```

```javascript
```

```javascript
xhr.open('GET', 'https://example.com/large-file', true);
xhr.responseType = 'blob';

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    const percentComplete = (event.loaded / event.total) * 100;
    console.log(`Download progress: ${percentComplete.toFixed(2)}%`);
  } else {
    console.log('Download progress: unknown');
  }
};

xhr.onload = function() {
  if (xhr.status === 200) {
    const blob = xhr.response;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filename.ext';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  } else {
    console.error('Download failed');
  }
};

xhr.onerror = function() {
  console.error('Download error');
};

xhr.onabort = function() {
  console.log('Download aborted');
};

xhr.send();
```
