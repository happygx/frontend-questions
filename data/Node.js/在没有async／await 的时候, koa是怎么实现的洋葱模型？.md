---
level: 2
---

# 在没有async/await 的时候, koa是怎么实现的洋葱模型？

## 题目要点

- **生成器函数**：Koa 使用生成器函数来实现洋葱模型，通过 `yield` 暂停和恢复中间件的执行。
- **洋葱模型**：请求进入每个中间件时，执行链条的顺序；响应返回时，中间件按相反顺序执行。
- **中间件链**：中间件通过链式调用连接起来，形成执行和处理的层次结构。

## 参考答案

在没有 `async/await` 的情况下，Koa 通过生成器函数（generator functions）实现了洋葱模型（onion model）的中间件机制。生成器函数是 ES6 引入的一种新的函数类型，它允许函数在执行过程中暂停和恢复。Koa 利用生成器函数的 `yield` 关键字来控制中间件的执行顺序，实现了洋葱模型的调用和处理机制。

### **洋葱模型的概念**

洋葱模型表示中间件的执行顺序类似洋葱的层次结构。中间件按顺序执行（进入洋葱），在每个中间件执行完后，再回到之前的中间件（离开洋葱），这种模式确保了请求处理和响应的过程。

### **Koa 的实现**

在 Koa 中，洋葱模型的实现依赖于生成器函数和 `yield`。以下是如何通过生成器函数实现洋葱模型的示例：

#### **1. 创建中间件**

每个中间件是一个生成器函数，使用 `yield` 来暂停执行，等待下一个中间件完成后再继续执行。

```javascript
const app = new Koa();

// 中间件 1
function middleware1(next) {
  return function* () {
    console.log('Enter Middleware 1');
    yield next(); // 暂停执行，等待下一个中间件
    console.log('Exit Middleware 1');
  }
}

// 中间件 2
function middleware2(next) {
  return function* () {
    console.log('Enter Middleware 2');
    yield next(); // 暂停执行，等待下一个中间件
    console.log('Exit Middleware 2');
  }
}

// 中间件 3
function middleware3(next) {
  return function* () {
    console.log('Enter Middleware 3');
    yield next(); // 暂停执行，等待下一个中间件
    console.log('Exit Middleware 3');
  }
}

// 应用中间件
app.use(middleware1(middleware2(middleware3(() => {
  console.log('Final handler');
}))));

app.listen(3000);
```

1. **请求进入**：从最外层的中间件开始执行。
2. **执行中间件**：依次进入每个中间件，直到最内部的中间件完成。
3. **响应返回**：从最内部的中间件开始回退，依次执行 `yield` 后面的代码，最终返回到最外层中间件。

#### **3. 实现细节**

- **生成器函数**：中间件函数返回一个生成器函数，该生成器函数接受一个 `next` 函数作为参数，`next` 表示下一个中间件。
- **`yield` 操作**：`yield next()` 暂停中间件的执行，等待下一个中间件完成后再继续执行当前中间件的剩余部分。
- **中间件链**：中间件按照链式调用的方式连接起来，每个中间件的 `next` 都是下一个中间件的生成器函数。
