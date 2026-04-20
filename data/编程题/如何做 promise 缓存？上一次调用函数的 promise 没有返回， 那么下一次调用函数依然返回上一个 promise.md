---
level: 3
---

# 如何做 promise 缓存？上一次调用函数的 promise 没有返回， 那么下一次调用函数依然返回上一个 promise

## 参考答案

为了实现 Promise 缓存，即在函数被调用时，如果之前已经有相同的 Promise 正在执行，则返回之前的 Promise，而不是创建一个新的，可以使用一个缓存机制来存储 Promise 对象。这种做法可以避免对相同请求的重复发起，从而提高性能。

以下是一个简单的示例来实现 Promise 缓存：

```javascript
const promiseCache = new Map();

function fetchData(url) {
  // 如果缓存中已经有这个 URL 的 Promise，则直接返回
  if (promiseCache.has(url)) {
    return promiseCache.get(url);
  }

  // 创建新的 Promise 并缓存
  const promise = new Promise((resolve, reject) => {
    // 模拟一个网络请求
    setTimeout(() => {
      console.log(`Fetching data from ${url}`);
      resolve(`Data from ${url}`);
    }, 1000);
  });

  // 缓存 Promise 对象
  promiseCache.set(url, promise);

  // 返回缓存的 Promise 对象
  return promise;
}

// 使用示例
fetchData('https://api.example.com/data1')
  .then(data => console.log(data))
  .catch(error => console.error(error));

fetchData('https://api.example.com/data1')
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

1. **创建缓存**: 使用一个 `Map` 对象来存储 URL 和其对应的 Promise。`Map` 用于将 URL 映射到正在进行的 Promise 对象。

2. **检查缓存**: 在每次调用 `fetchData` 函数时，首先检查缓存中是否已经存在对应 URL 的 Promise。如果存在，直接返回缓存的 Promise。

3. **创建新的 Promise**: 如果缓存中没有对应 URL 的 Promise，则创建一个新的 Promise，模拟网络请求，并将其存入缓存中。

4. **返回缓存的 Promise**: 返回缓存的 Promise 对象，这样后续对相同 URL 的请求将复用已有的 Promise。

### **注意事项**

- **缓存失效**: 如果需要处理缓存失效的问题，可以设置超时机制或在某些条件下清除缓存。
  
- **多并发请求**: 上述示例代码适用于单线程环境，在实际应用中要考虑并发情况，确保缓存机制线程安全（如使用锁机制）。

- **Promise 状态**: 如果 Promise 已经被缓存，即使它的状态是 `pending`，返回的也是同一个 Promise 对象。这样即使多次调用相同 URL 的 `fetchData`，也不会创建新的请求。

### **改进**

可以对缓存机制进行更详细的设计，如使用对象来处理不同的请求参数，添加缓存过期机制，或对请求参数进行更复杂的缓存策略。
