---
level: 3
---

# try...catch 可以捕获到异步代码中的错误吗？

## 题目要点

### 思路和要点

1. **理解 try...catch 的局限性**：
   - `try...catch` 只能捕获同步代码块中的错误，对于异步代码中的错误无法捕获。

2. **示例分析**：
   - 分析给出的示例代码：

     ```javascript
     try {
       setTimeout(() => {
         throw new Error('err')
       }, 200);
     } catch (err) {
       console.log(err);
     }
     ```

   - 由于 `setTimeout` 是异步函数，其回调会在指定延时后被放入事件队列，当执行栈清空后才执行，因此 `try...catch` 无法捕获异步回调中的错误。

3. **处理异步代码中的错误**：
   - **使用 Promise**：
     - 在使用 Promise 时，可以通过 `.catch` 方法捕获错误。
     - 示例：

       ```javascript
       new Promise((resolve, reject) => {
         setTimeout(() => {
           reject(new Error('err'));
         }, 200);
       }).catch(err => {
         console.error(err);
       });
       ```

   - **使用 async/await**：
     - 使用 `async/await` 可以使异步代码看起来像同步代码，并结合 `try...catch` 捕获错误。
     - 示例：

       ```javascript
       async function asyncFunction() {
         try {
           await new Promise((resolve, reject) => {
             setTimeout(() => {
               reject(new Error('err'));
             }, 200);
           });
         } catch (err) {
           console.error(err);
         }
       }

       asyncFunction();
       ```

   - **使用事件监听器**：
     - 通过事件监听器捕获异步操作中的错误。
     - 示例：

       ```javascript
       window.addEventListener('error', (event) => {
         console.error(event.error);
       });

       setTimeout(() => {
         throw new Error('err');
       }, 200);
       ```

## 参考答案

不能。

以下面代码为例：

```js
  setTimeout(() => {
    throw new Error('err')
  }, 200);
} catch (err) {
  console.log(err);
}
```

对于异步代码，需要结合 Promise 、async/await 或者事件监听器等机制来处理错误。
