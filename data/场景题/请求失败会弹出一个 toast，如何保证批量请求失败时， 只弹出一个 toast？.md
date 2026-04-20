---
level: 2
---

# 请求失败会弹出一个 toast，如何保证批量请求失败时， 只弹出一个 toast？

## 题目要点

在批量请求失败的场景下，可以通过以下方法确保只弹出一个 `toast`：
1. **防抖**：适用于短时间内多次触发相同事件的场景。
2. **标志位**：适用于需要明确控制 `toast` 显示频率的场景。
3. **统一错误处理**：适用于批量请求的场景，逻辑清晰。
4. **队列和单例模式**：适用于需要按顺序显示消息的场景。

## 参考答案

### 方法 1: **使用防抖（Debounce）**
防抖可以确保在一定时间内只触发一次 `toast`。如果多个请求在短时间内失败，防抖会将这些失败的请求合并，只弹出一个 `toast`。

```javascript

function showToast(message) {
    if (toastTimeout) clearTimeout(toastTimeout); // 清除之前的定时器
    toastTimeout = setTimeout(() => {
        // 实际显示 toast 的逻辑
        console.log(message);
        toastTimeout = null; // 重置定时器
    }, 300); // 设置防抖时间为 300ms
}

// 模拟批量请求失败
function handleFailedRequests() {
    showToast("请求失败，请稍后重试");
    showToast("请求失败，请稍后重试");
    showToast("请求失败，请稍后重试");
}

handleFailedRequests(); // 只会弹出一个 toast
```
防抖通过在短时间内合并多次触发，确保只执行一次 `toast` 显示逻辑。适用于短时间内多次触发相同事件的场景。

---

### 方法 2: **使用标志位（Flag）**
通过设置一个标志位，确保在第一次请求失败时弹出 `toast`，并在一定时间内忽略后续的失败请求。

```javascript

function showToast(message) {
    if (!isToastShown) {
        console.log(message); // 实际显示 toast 的逻辑
        isToastShown = true;

        // 重置标志位，例如 5 秒后允许再次弹出 toast
        setTimeout(() => {
            isToastShown = false;
        }, 5000); // 5 秒后重置
    }
}

// 模拟批量请求失败
function handleFailedRequests() {
    showToast("请求失败，请稍后重试");
    showToast("请求失败，请稍后重试");
    showToast("请求失败，请稍后重试");
}

handleFailedRequests(); // 只会弹出一个 toast
```
标志位方法通过控制 `toast` 的显示状态，确保在一定时间内只弹出一个 `toast`。适用于需要明确控制 `toast` 显示频率的场景。

---

### 方法 3: **批量请求的统一错误处理**
如果批量请求是通过 `Promise.all` 或类似的方式发起的，可以在统一的错误处理逻辑中弹出 `toast`。

```javascript
    console.log(message); // 实际显示 toast 的逻辑
}

async function handleBatchRequests() {
    const requests = [
        fetch('/api/request1').catch(() => {}),
        fetch('/api/request2').catch(() => {}),
        fetch('/api/request3').catch(() => {}),
    ];

    try {
        await Promise.all(requests);
    } catch (error) {
        // 统一处理错误
        showToast("部分请求失败，请稍后重试");
    }
}

handleBatchRequests(); // 只会弹出一个 toast
```
通过统一错误处理，可以在批量请求失败时只弹出一个 `toast`。适用于批量请求的场景，且逻辑清晰。

---

### 方法 4: **使用队列和单例模式**
将 `toast` 显示逻辑封装为一个单例，并使用队列管理多个失败请求的消息，确保每次只显示一个 `toast`。

```javascript
    constructor() {
        this.queue = [];
        this.isShowing = false;
    }

    showToast(message) {
        this.queue.push(message);
        if (!this.isShowing) {
            this.displayNextToast();
        }
    }

    displayNextToast() {
        if (this.queue.length > 0) {
            this.isShowing = true;
            const message = this.queue.shift();
            console.log(message); // 实际显示 toast 的逻辑

            // 模拟 toast 消失后的回调
            setTimeout(() => {
                this.isShowing = false;
                this.displayNextToast();
            }, 3000); // 假设 toast 显示 3 秒
        }
    }
}

const toastManager = new ToastManager();

// 模拟批量请求失败
function handleFailedRequests() {
    toastManager.showToast("请求失败，请稍后重试");
    toastManager.showToast("请求失败，请稍后重试");
    toastManager.showToast("请求失败，请稍后重试");
}

handleFailedRequests(); // 会依次弹出 toast，但不会同时弹出多个
```
通过队列和单例模式，可以确保 `toast` 依次显示，避免同时弹出多个 `toast`。适用于需要按顺序显示消息的场景。
