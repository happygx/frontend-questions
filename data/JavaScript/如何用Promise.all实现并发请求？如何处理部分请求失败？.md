---
level: 2
---

# 如何用Promise.all实现并发请求？如何处理部分请求失败？

## 题目要点

* **只要全部成功才继续 → 用 `Promise.all`**
* **要拿到每个请求的完整结果（成功 + 失败） → 用 `Promise.allSettled`**
* **需要容错或兜底值 → 在每个 Promise 上加 catch**

## 参考答案

## 1. 用 `Promise.all` 实现并发请求

`Promise.all` 的特性是：**等待所有 Promise 全部成功，才会进入 `.then`；如果有一个失败，会立刻进入 `.catch`**。

例子：

```js
  return fetch(url).then(res => res.json());
}

Promise.all([
  fetchData('/api/user'),
  fetchData('/api/order'),
  fetchData('/api/message'),
]).then(([user, order, message]) => {
  console.log('全部成功:', user, order, message);
}).catch(error => {
  console.error('有请求失败:', error);
});
```

---

## 2. 如何处理 **部分请求失败**

### 方案 A: `Promise.allSettled`（推荐）

* 它不会短路，所有 Promise 都会执行完。
* 返回结果包含 `status: "fulfilled"` 或 `"rejected"`。

```js
  fetchData('/api/user'),
  fetchData('/api/order'),
  fetchData('/api/message'),
]).then(results => {
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      console.log('成功:', result.value);
    } else {
      console.error('失败:', result.reason);
    }
  });
});
```

---

### 方案 B: 手动封装 catch，让 `Promise.all` 不被短路

给每个请求加上 `.catch`，保证它不会抛错，而是返回一个标记：

```js
  return promise
    .then(res => ({ status: 'fulfilled', value: res }))
    .catch(err => ({ status: 'rejected', reason: err }));
}

Promise.all([
  safeFetch(fetchData('/api/user')),
  safeFetch(fetchData('/api/order')),
  safeFetch(fetchData('/api/message')),
]).then(results => {
  console.log(results);
});
```

---

### 方案 C: 按需兜底（部分失败时用默认值）

比如请求失败时，给个默认数据继续用：

```js
  fetchData('/api/user').catch(() => ({ name: '游客' })),
  fetchData('/api/order').catch(() => []),
  fetchData('/api/message').catch(() => []),
]).then(([user, order, message]) => {
  console.log('即使失败也有默认值:', user, order, message);
});
```
