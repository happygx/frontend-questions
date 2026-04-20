---
level: 3
---

# async function 返回的 Promise 状态何时变为 resolved？

## 题目要点

1. **`async` 函数本身不一定是异步执行的**

   * 只有 `await` 才会让出执行权

2. `return await` ≠ `return`

   * `return await` 会等待 Promise settle
   * `return` 直接包装 Promise（但结果通常一致）
3. resolved ≠ 同步

   * resolved 的回调一定是异步（微任务）

## 参考答案

`async function` **返回的 Promise 会在函数体内的执行流程“正常结束”时变为 `resolved`**。

更精确地说，可以从以下几种情况来理解。

---

## 一、基本结论（核心规则）

> **当 `async` 函数执行到 `return`，或函数体执行完且未抛出异常时，返回的 Promise 会被 `resolved`。**

同时遵循两个映射规则：

* `return value` → `Promise.resolve(value)`
* `throw error` → `Promise.reject(error)`

---

## 二、几种常见场景拆解

### 1. 显式 `return`（最常见）

```js
  return 42;
}

foo().then(res => console.log(res)); // 42
```

```js
  return Promise.resolve(42);
}
```

---

### 2. 没有 `return`（隐式返回 `undefined`）

```js

foo().then(res => console.log(res)); // undefined
```

```js
```

---

### 3. `return await xxx`

```js
  return await Promise.resolve(10);
}
```

* `await` 会“暂停”函数执行，等待 Promise settle
* **只有在 `await` 的 Promise fulfilled 后，函数才会继续执行并 `return`**

因此：

> Promise **在 `await` 的 Promise fulfilled 之后** 才会 resolved

等价逻辑：

```js
```

### 4. 函数内部抛出异常

```js
  throw new Error("err");
}

foo().catch(err => console.log(err.message));
```

* Promise **不会 resolved**
* 而是 **立即变为 rejected**

---

### 5. `await` 的 Promise 被 reject

```js
  await Promise.reject("fail");
  return 1;
}
```

* `await` 等到 Promise reject
* 抛出异常
* 函数中断执行

结果：

```js
```

---

## 三、时间点总结（一句话版）

> `async function` 返回的 Promise **在函数执行完毕且没有抛出异常时 resolved**，
> 如果函数中包含 `await`，则要等 **所有被 `await` 的 Promise fulfilled 后** 才会 resolved。

---

## 四、事件循环视角（进阶理解）

```js
  return 1;
}

console.log("start");
foo().then(console.log);
console.log("end");
```

```
end
1
```

* `async` 函数是 **同步开始执行**
* `resolved` 的回调（`.then`）**一定进入微任务队列**
* 即使是 `return 1`，也不会同步触发 `.then`
