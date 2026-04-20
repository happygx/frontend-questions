---
level: 3
---

# 实现一个请求函数：fetchWithRetry，要求会最多自动重试 3 次，任意一次成功就直接返回

## 参考答案

下面是一个简单的示例实现，并未包含对异常情况的处理、超时设置等较复杂的功能：

```javascript
  return new Promise((resolve, reject) => {
    const doFetch = async (attempt) => {
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          resolve(response);
        } else {
          throw new Error('Request failed');
        }
      } catch (error) {
        if (attempt < maxRetry) {
          console.log(`Attempt ${attempt + 1} failed. Retrying...`);
          doFetch(attempt + 1);
        } else {
          reject(new Error('Max retries exceeded'));
        }
      }
    };

    doFetch(0);
  });
}
```
