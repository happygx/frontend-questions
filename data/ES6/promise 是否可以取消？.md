---
level: 3
---

# promise 是否可以取消？

## 题目要点

原生 Promise 本身不支持取消，但可以通过一些变通的方式实现类似功能，如使用标志位、自定义类、AbortController 或第三方库。

## 参考答案

JavaScript 中的原生 Promise 不直接支持取消操作。Promise 的设计理念是一次性且不可变的，创建后就不可取消。

实现 Promise 取消的常见方法有：

### **1. 使用标志位**

可以在 Promise 内部设置一个取消标志，手动检查这个标志来决定是否继续执行操作。

```javascript
  let cancelled = false;

  const promise = new Promise((resolve, reject) => {
    executor(
      (value) => {
        if (!cancelled) resolve(value);
      },
      (error) => {
        if (!cancelled) reject(error);
      }
    );
  });

  return {
    promise,
    cancel() {
      cancelled = true;
    }
  };
}
```

对于 Fetch API 或类似支持 AbortController 的操作，可以利用 AbortController 取消网络请求。

```javascript
const signal = controller.signal;

fetch('url', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Fetch error:', err);
    }
  });

// 取消请求
controller.abort();
```

通过自定义机制来处理 Promise 的取消逻辑，可以封装 Promise 和取消逻辑。

```javascript
  constructor(executor) {
    this._isCanceled = false;
    this._promise = new Promise((resolve, reject) => {
      executor(
        value => !this._isCanceled && resolve(value),
        error => !this._isCanceled && reject(error)
      );
    });
  }

  cancel() {
    this._isCanceled = true;
  }

  then(onFulfilled, onRejected) {
    return this._promise.then(onFulfilled, onRejected);
  }

  catch(onRejected) {
    return this._promise.catch(onRejected);
  }
}
```

有些第三方库（如 [Bluebird](http://bluebirdjs.com/) 和 [rxjs](https://rxjs.dev/)）提供了对 Promise 取消的支持或替代方案。
