---
level: 3
---

# 谈谈 Vue 事件机制，并手写$on、$off、$emit、$once

## 题目要点

Vue 的事件机制是实现组件间通信的重要方式，它通过`$on`、`$off`、`$emit`和`$once`等方法允许组件之间进行事件的订阅、取消订阅、触发和一次性订阅。这些方法的工作原理可以通过手写它们的实现来更深入地理解。

#### Vue 事件机制的工作原理

1. **`$on(event, callback)`**：当监听器`$on`被调用时，它将回调函数`callback`存储在一个事件监听列表中。这个列表通常保存在一个对象中，例如`this.events`。
2. **`$off(event, callback)`**：当取消监听器`$off`被调用时，它会从事件监听列表中移除之前通过`$on`存储的回调函数。如果`callback`参数没有提供，则移除所有与`event`相关的事件监听器。
3. **`$emit(event, ...args)`**：当事件发射器`$emit`被调用时，它会遍历事件监听列表，并调用所有存储在该列表中的回调函数。它将这些回调函数作为参数传递，以便它们可以访问事件数据。
4. **`$once(event, callback)`**：当一次性监听器`$once`被调用时，它与`$on`类似，但是它会返回一个函数。当这个返回的函数被调用时，它会触发事件，并执行回调函数。之后，它将自动从事件监听列表中移除该回调函数，确保它只被调用一次。

手写实现参考详细答案

## 参考答案

Vue 的事件机制允许组件之间进行通信，通过 `$on`、`$off`、`$emit` 和 `$once` 等方法进行事件的订阅、取消订阅、触发和一次性订阅。我们可以通过手写这些方法来理解其工作原理。

### Vue 事件机制

1. **`$on(event, callback)`**：监听特定事件。
2. **`$off(event, callback)`**：停止监听特定事件。
3. **`$emit(event, ...args)`**：触发特定事件。
4. **`$once(event, callback)`**：只监听一次特定事件。

### 手写实现

下面是手写这些方法的简单实现：

```javascript
  constructor() {
    this.events = {};
  }

  // 监听事件
  $on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  // 停止监听事件
  $off(event, callback) {
    if (!this.events[event]) return;

    if (!callback) {
      // 如果没有传递 callback，移除所有事件监听
      this.events[event] = [];
    } else {
      // 移除特定的事件监听
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }

  // 触发事件
  $emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback.apply(this, args));
    }
  }

  // 只监听一次事件
  $once(event, callback) {
    const wrapper = (...args) => {
      callback.apply(this, args);
      this.$off(event, wrapper);
    };
    this.$on(event, wrapper);
  }
}

// 示例
const eventBus = new EventEmitter();

// 监听事件
eventBus.$on('test', (msg) => console.log('test event:', msg));

// 触发事件
eventBus.$emit('test', 'Hello, World!');

// 监听一次事件
eventBus.$once('once', (msg) => console.log('once event:', msg));

// 触发一次性事件
eventBus.$emit('once', 'This should appear once');
eventBus.$emit('once', 'This should not appear');

// 停止监听事件
eventBus.$off('test');

// 触发事件（已经移除监听）
eventBus.$emit('test', 'This should not appear');
```

1. **`$on`**：将事件和回调函数添加到 `events` 对象中。
2. **`$off`**：如果没有传递回调函数，则移除所有监听。如果传递了回调函数，则只移除特定的回调。
3. **`$emit`**：触发事件，调用所有注册的回调函数并传递参数。
4. **`$once`**：使用一个包装函数 (`wrapper`) 包装原始回调函数，确保回调只执行一次，然后移除事件监听。
