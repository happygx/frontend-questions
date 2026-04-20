---
level: 2
---

# postMessage 是如何解决跨域问题的？

## 题目要点

`postMessage` 通过允许跨源通信，解决了传统的同源策略限制跨域问题的问题。它提供了一种安全、灵活的方式来在不同源的窗口之间交换数据。确保在使用 `postMessage` 时正确验证消息的来源和内容，可以有效地防止潜在的安全问题。

## 参考答案

`postMessage` 是一种在不同源（域）之间进行安全通信的机制，可以解决跨域问题。以下是 `postMessage` 解决跨域问题的原理及其使用方式：

### **1. 原理**

**`postMessage` 方法** 允许跨源通信，即使这些源在不同的域名、协议或端口下。这是通过以下方式实现的：

- **安全性**：`postMessage` 允许页面向另一个窗口（如 iframe、弹出窗口或另一个 tab）发送消息，而不管它们是否同源。消息的传递过程中，接收方可以验证消息的来源和内容，从而确保通信的安全。
- **目标窗口**：通过 `postMessage` 发送的消息可以指定目标窗口，通过其 `origin`（源）进行安全检查。接收方在接收消息时，可以检查 `origin` 属性来验证消息的来源。

### **2. 使用 `postMessage` 的步骤**

**1. 发送消息**

使用 `postMessage` 方法可以向目标窗口发送消息。消息可以是任何数据类型，如字符串、对象等。

**示例代码**：

```javascript
const targetWindow = document.getElementById('myFrame').contentWindow;
const message = { type: 'greeting', text: 'Hello from parent' };

// 发送消息，指定目标窗口的 origin
targetWindow.postMessage(message, 'https://example.com');
```

在接收消息的窗口中，需要设置事件监听器来接收和处理消息。`message` 事件对象包含了消息的内容、来源和其他信息。

**示例代码**：

```javascript
window.addEventListener('message', (event) => {
  // 检查消息的来源
  if (event.origin !== 'https://example.com') {
    return; // 忽略来自不可信源的消息
  }

  // 处理接收到的消息
  console.log('Message received:', event.data);
});
```

- **检查 `origin`**：接收消息时，始终检查 `event.origin` 以确保消息来自可信源。
- **验证消息内容**：在处理消息时，验证消息的内容和结构，防止恶意数据造成问题。
- **限制目标窗口**：发送消息时，尽量指定精确的目标源，而不是使用 `*`，以提高安全性。
