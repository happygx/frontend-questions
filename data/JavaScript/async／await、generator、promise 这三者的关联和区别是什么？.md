---
level: 3
---

# async/await、generator、promise 这三者的关联和区别是什么?

## 题目要点

### 异步编程的发展历程

- **回调函数**：最初的异步处理方式，但容易造成回调地狱，代码难以维护。
- **Promise**：ES6 引入，提供了一种链式调用的方式，解决了回调地狱问题。
- **Generator**：ES6 引入，通过 `yield` 可以暂停和继续函数执行，但需要手动控制流程。
- **Async/Await**：ES7 引入，建立在 Promise 和 Generator 之上，提供了更简洁的语法。

### 关联

- **Async/Await**：
  - 基于 Promise 和 Generator。
  - `async` 函数返回一个 Promise 对象。
  - `await` 可以暂停函数执行，直到 Promise 解决。
- **Promise**：
  - 异步编程模型，有三种状态：pending、fulfilled、rejected。
  - 通过 `then()` 和 `catch()` 处理成功和失败的情况。
  - `race()` 和 `all()` 方法用于处理多个 Promise。
- **Generator**：
  - 提供了一种可以暂停和恢复执行的函数。
  - `yield` 用于暂停，`next()` 用于恢复执行。
  - 可与 Promise 结合实现异步流程控制。

### 区别

- **Async/Await**：
  - 语法更接近同步代码，提高了代码的可读性。
  - 只能在 `async` 函数内部使用 `await`。
  - 在某些环境（如高版本 Node.js）中，可以在顶层代码中使用。
- **Promise**：
  - 提供了一种清晰的异步处理流程。
  - 链式调用，但需要使用 `then()` 和 `catch()`。
  - 有方法处理多个异步操作。
- **Generator**：
  - 需要手动控制执行流程，使用 `next()`。
  - 更灵活，但语法和使用上相对复杂。

## 参考答案

`promise`与`async/await` 函数都是用来解决`JavaScript`中的异步问题，从最开始的回调函数处理异步，到`Promise`处理异步，到`Generator`处理异步，再到`Async/await`处理异步，每一次的技术更新都使得`JavaScript`处理异步的方式更加优雅。

从目前来看，`Async/await`被认为是异步处理的终极解决方案，让JS的异步处理越来越像同步任务。


## 关联

- async/await：是建立在Generator函数的语法糖，可以更方便地实现异步编程。async 函数返回一个 Promise 对象，await 表达式会阻塞代码执行，直到 Promise 对象状态变为 resolved。

- Promise：是一种异步编程模型，可以将回调函数嵌套的代码转换为链式调用。Promise 由 pending、fulfilled 和 rejected 三种状态，分别代表进行中、已完成和已失败。

- Generator：是一种迭代器，可以通过 yield 表达式暂停代码执行，并通过 next() 方法恢复执行。Generator 可以配合 Promise 实现异步流程控制。

## 区别

- async/await：是 ES7 引入的新特性，可以让异步编程看起来像同步编程，更加易读易写。async/await 只能用于函数内部，不能用于顶层代码（例如全局作用域）。（PS：高版本的Node中，可以在顶层使用 await）

- Promise：是 ES6 引入的新特性，使用 then() 方法和 catch() 方法注册回调函数，实现异步编程。Promise 可以使用 race() 方法和 all() 方法处理多个异步操作。

- Generator：是 ES6 引入的新特性，可以通过 yield 表达式暂停和恢复代码执行，实现异步流程控制。Generator 需要手动执行 next() 方法，才能继续执行下一步操作。
