---
level: 3.5
---

# 请在不使用 setTimeout 的前提下，实现 setInterval

## 参考答案

可以通过递归调用函数来实现 `setInterval`，而不使用 `setTimeout`。

下面是一个简单的实现示例：

```javascript
  let start = Date.now();

  function loop() {
    const now = Date.now();
    const elapsed = now - start;

    if (elapsed >= interval) {
      callback(); // 执行回调函数
      start = Date.now(); // 重置开始时间
    }

    requestAnimationFrame(loop); // 请求下一帧
  }

  loop(); // 启动循环
}

// 使用示例
mySetInterval(() => {
  console.log('Hello, World!');
}, 1000);
```

- **递归调用**：`loop` 函数在每一帧调用自己，形成一个循环。
- **时间检查**：在每次调用时检查经过的时间，如果超过设定的间隔，就执行回调函数，并重置开始时间。
- **`requestAnimationFrame`**：使用 `requestAnimationFrame` 确保在浏览器的重绘周期内进行调用，这样可以更有效地利用浏览器资源。
