---
level: 2
---

# Web Worker 是什么？

## 题目要点

### 题目解析

除了本题答案之外，还需要熟悉webworker本身使用上的一些限制，通常在面试中，都会涉及到，下面列举几个

### Web Worker 使用上的限制

1. **没有直接访问 DOM**：
    - Web Worker 无法直接操作 DOM 或访问 `window` 对象。它们是运行在后台线程中的，用于处理计算密集型任务或异步操作，不能直接对页面进行操作。

2. **不支持 `this` 上下文**：
    - Web Worker 中的 `this` 指向 `Worker` 对象本身，而不是全局上下文。这意味着在 Web Worker 内部不能使用传统的 `this` 机制来访问全局对象。

3. **限制的 API**：
    - Web Worker 只能访问有限的 Web API，例如 `XMLHttpRequest`、`fetch` 和 `WebSocket`。它们不能使用与 DOM 操作相关的 API，如 `document`、`window`、`localStorage` 等。

4. **不支持同步的 AJAX 请求**：
    - Web Worker 不支持同步的 `XMLHttpRequest` 请求。所有的网络请求都必须是异步的。

5. **传递的数据限制**：
    - Web Worker 和主线程之间的数据传递是通过消息传递机制完成的，数据需要被序列化和反序列化。不能直接传递函数或带有方法的对象，只能传递可序列化的数据（如基本数据类型、数组、对象）。

6. **不能使用 `alert`、`prompt` 和 `confirm`**：
    - Web Worker 中不能使用这些浏览器对话框方法，因为它们依赖于用户界面线程。

7. **不支持 `eval` 和 `document.write`**：
    - Web Worker 内部不能使用 `eval` 方法来执行字符串中的代码，也不能使用 `document.write` 方法。

8. **生命周期管理**：
    - Web Worker 的生命周期与主线程不同，必须显式地终止 Web Worker 使用 `terminate()` 方法。如果不再需要 Web Worker，需要手动管理它们的生命周期以释放资源。

9. **安全限制**：
    - Web Worker 在执行过程中受到严格的同源策略限制，不能访问跨域资源，除非使用适当的 CORS 设置。

这些限制是为了确保 Web Worker 的高效性和安全性，同时避免与主线程的直接交互，从而保持线程之间的隔离。

## 参考答案

Web Worker 是 HTML5 标准中提供的一项技术，它可以让 JavaScript 脚本在后台线程运行，从而避免阻塞 UI 线程。Web Worker 可以创建一个独立的线程来执行脚本，从而使得主线程可以专注于用户交互和响应。

Web Worker 的主要特点包括：

1. 独立线程：Web Worker 可以在独立的线程中运行 JavaScript 代码，从而避免了在主线程中运行耗时任务的风险。
2. 沙箱环境：Web Worker 运行的 JavaScript 代码在一个受限的沙箱环境中，不能访问与主线程共享的 DOM、全局变量等资源，从而保证了数据安全性和代码稳定性。
3. 事件通信：Web Worker 可以通过事件来与主线程进行通信，从而实现线程间的数据传递和同步操作。

使用 Web Worker 可以改善因大量 JS 计算导致的卡顿问题，增强页面的稳定性和用户体验。

Web Worker 不仅可以在浏览器中运行，还可以在 Node.js 中运行，在实际应用和开发中都有广泛的应用。
