---
level: 3.5
---

# 实现函数parallelRequests(urls, maxConcurrent)

## 参考答案

## 实现代码

```javascript
  return new Promise((resolve, reject) => {
    const results = new Array(urls.length); // 保证结果顺序
    let nextIndex = 0;                      // 下一个要发起请求的索引
    let activeCount = 0;                    // 当前并发中的请求数
    let finishedCount = 0;                  // 已完成的请求数

    function runNext() {
      // 所有请求完成
      if (finishedCount === urls.length) {
        resolve(results);
        return;
      }

      // 启动新请求（补位）
      while (activeCount < maxConcurrent && nextIndex < urls.length) {
        const current = nextIndex;
        const url = urls[nextIndex];
        nextIndex++;
        activeCount++;

        // 这里假设请求方式是 fetch，可替换为任意返回 Promise 的请求函数
        Promise.resolve(fetch(url))
          .then(res => res)
          .catch(err => err) // 失败也记录结果，不中断整体流程
          .then(result => {
            results[current] = result;
          })
          .finally(() => {
            activeCount--;
            finishedCount++;
            runNext(); // 请求完成后立即补位
          });
      }
    }

    runNext();
  });
}
```

## 设计思路说明

### 1. 并发控制的核心

* 使用 `activeCount` 记录**当前正在执行的请求数量**
* 通过 `while (activeCount < maxConcurrent)` 启动新请求
* 请求完成后在 `finally` 中 **立即补位**

这是一个典型的**请求池（request pool）/并发调度器**模型。

---

### 2. 如何保证结果顺序

* 结果数组 `results` 预先按 `urls.length` 创建
* 每个请求在启动时保存自己的索引 `current`
* 无论请求完成顺序如何，始终写入 `results[current]`

这样可以做到：

> **执行顺序无序，结果顺序有序**

---

### 3. 为什么用 `finally`

```js
  activeCount--;
  finishedCount++;
  runNext();
});
```
* 满足题目要求：

  > 请求完成（无论成功/失败）后立即补位新请求
* 避免因异常导致并发池“卡死”

---

### 4. 返回整体 Promise 的时机

```js
  resolve(results);
}
```
* 不因单个请求失败 reject（更符合“批量请求”的实际业务需求）
* 如果你希望“只要有一个失败就 reject”，可以在 `catch` 中直接 `reject(err)`

---

## 时间与空间复杂度

* **时间复杂度**：O(n)（调度本身）
* **空间复杂度**：O(n)（结果数组）
