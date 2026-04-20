---
level: 1.5
---

# onpopstate 可以监听到 pushstate 的事件吗？

## 题目要点

- `popstate` 事件只在用户通过浏览器的前进和后退按钮进行导航时触发。
- `pushState` 和 `replaceState` 不会触发 `popstate` 事件。
- 如果需要在调用 `pushState` 或 `replaceState` 后执行操作，必须手动调用相关的处理函数。

## 参考答案

`onpopstate` 事件无法直接监听到 `pushState` 或 `replaceState` 方法的调用。这是因为 `pushState` 和 `replaceState` 方法本身不会触发 `popstate` 事件，它们只是修改浏览器的历史记录和 URL。

### **`popstate` 事件的触发条件**

`popstate` 事件只会在以下情况下触发：

- 用户通过浏览器的前进或后退按钮进行导航。
- 用户点击浏览器的历史记录（例如，通过前进、后退按钮或键盘快捷键）。

### **`pushState` 和 `replaceState` 的作用**

- **`pushState`**：将一个新的状态推入历史记录栈，并更新 URL。这不会触发 `popstate` 事件。

  ```javascript
  history.pushState({ page: 1 }, 'Title 1', '/page1');
  ```

- **`replaceState`**：修改当前历史记录项，并更新 URL。这也不会触发 `popstate` 事件。

  ```javascript
  history.replaceState({ page: 2 }, 'Title 2', '/page2');
  ```

### **手动触发更新**

如果你需要在调用 `pushState` 或 `replaceState` 时执行某些操作，可以在这些方法的调用后手动执行回调函数：

```javascript
  console.log('State changed:', history.state);
  // 更新页面内容或执行其他操作
}

function navigateTo(url, state = null) {
  history.pushState(state, '', url);
  handleStateChange();
}

function replaceState(url, state = null) {
  history.replaceState(state, '', url);
  handleStateChange();
}

// 使用示例
navigateTo('/page1', { page: 1 });
replaceState('/page2', { page: 2 });
```
