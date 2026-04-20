---
level: 2
---

# 怎么在 koa 中，进行中间件的异常处理？

## 题目要点

- **`try...catch`**：在单个中间件中捕获异常。
- **`app.onerror`**：全局处理未捕获的异常。
- **第三方中间件**：使用专门的库来简化错误处理。
- **中间件顺序**：确保异常处理在其他中间件之后执行。

## 参考答案

在 Koa 中，中间件的异常处理是一个重要的部分，可以通过以下几种方式来实现：

### **1. 使用 `try...catch` 捕获异常**

- **概述**：在 Koa 的中间件中，可以使用 `try...catch` 块来捕获和处理异步操作中的异常。这样可以确保即使中间件出现错误，服务器不会崩溃。
- **实现**：
  ```javascript
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = {
        message: err.message
      };
      // 可选：记录错误
      console.error(err);
    }
  });
  ```

### **2. 使用 `onerror` 事件处理**

- **概述**：Koa 的 `app.onerror` 事件可以用来处理未捕获的异常。这种方式适合全局处理所有未被捕获的错误。
- **实现**：
  ```javascript
  const Koa = require('koa');
  const app = new Koa();

  app.onerror = (err, ctx) => {
    ctx.status = err.status || 500;
    ctx.body = {
      message: err.message
    };
    // 可选：记录错误
    console.error(err);
  };

  app.use(async (ctx, next) => {
    throw new Error('Something went wrong!');
  });

  app.listen(3000);
  ```

### **3. 使用第三方中间件**

- **概述**：使用第三方中间件可以简化错误处理，例如 `koa-err`。
- **实现**：
  ```javascript
  const Koa = require('koa');
  const err = require('koa-err');
  const app = new Koa();

  app.use(err({
    // 这里可以配置错误处理选项
  }));

  app.use(async (ctx, next) => {
    throw new Error('Something went wrong!');
  });

  app.listen(3000);
  ```

### **4. 异常处理中间件的顺序**

- **概述**：确保异常处理的中间件放在其他中间件的最后，这样它可以捕获之前中间件中发生的所有异常。
- **实现**：
  ```javascript
  const Koa = require('koa');
  const app = new Koa();

  app.use(async (ctx, next) => {
    // 这里是正常的中间件逻辑
    await next();
  });

  // 异常处理中间件应在所有其他中间件之后
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = {
        message: err.message
      };
      console.error(err);
    }
  });

  app.listen(3000);
  ```
