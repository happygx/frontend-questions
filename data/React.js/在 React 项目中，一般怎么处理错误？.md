---
level: 2
---

# 在 React 项目中，一般怎么处理错误？

## 题目要点

- **渲染、生命周期错误** → **使用 `ErrorBoundary`**  
- **事件处理错误** → **手动 `try...catch`**  
- **全局错误** → **监听 `window.onerror` 和 `unhandledrejection`**  
- **日志上报** → **结合 Sentry 进行监控**

## 参考答案

在 React 项目中，错误处理一般分为 **组件级错误** 和 **全局错误**，主要采用 **错误边界（Error Boundaries）**、**`try...catch`**、**全局监听** 以及 **日志上报** 等方式。

### 1. **错误边界（Error Boundaries）**（处理渲染、生命周期方法中的错误）  
```tsx
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error:', error, info);
  }

  render() {
    if (this.state.hasError) return <h1>出错了！</h1>;
    return this.props.children;
  }
}

// 使用：
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```
React 事件处理程序不会被 `ErrorBoundary` 捕获，需要手动用 `try...catch` 处理：
```tsx
  try {
    // 可能出错的代码
  } catch (error) {
    console.error('事件错误:', error);
  }
};
<button onClick={handleClick}>点击</button>
```
对于 **未捕获的 JavaScript 错误**，可以用 `window.onerror` 或 `unhandledrejection` 进行兜底：
```tsx
  console.error('全局错误:', { message, source, lineno, colno, error });
};

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promise 未捕获错误:', event.reason);
});
```
可以结合 **Sentry** 或其他监控系统，将错误上报：
```tsx
Sentry.init({ dsn: 'your-dsn-url' });

<Sentry.ErrorBoundary fallback={<h1>出错了</h1>}>
  <MyComponent />
</Sentry.ErrorBoundary>;
```
