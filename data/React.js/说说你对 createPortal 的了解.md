---
level: 2
---

# 说说你对 createPortal 的了解

## 题目要点

- **功能**：允许将 React 组件渲染到 DOM 的不同位置，支持顶层显示和避免层级影响。
- **应用场景**：模态框、下拉菜单、工具提示等需要独立显示的组件。
- **优点**：维持 React 组件的生命周期，避免样式干扰，灵活地控制渲染位置。

`createPortal` 提供了一种强大的方式来控制组件的渲染位置和层级，使得 UI 设计更加灵活和模块化。

## 参考答案

`ReactDOM.createPortal` 是 React 的一个 API，用于将子节点渲染到 DOM 的不同部分，而不是当前组件的父级节点中。这对于需要在 DOM 的不同层级中插入内容（如模态框、工具提示、下拉菜单等）非常有用，因为它允许我们将子元素渲染到指定的 DOM 节点中，保持其逻辑上的位置和结构。

### **`createPortal` 的用法**

```jsx
```
- **`container`**：要将 `child` 渲染到的 DOM 节点。

### **特点和使用场景**

1. **DOM 层级结构**：
   - 通过 `createPortal`，你可以将子元素插入到 DOM 的任意位置，这对于需要在页面不同层级中展示内容的情况很有帮助。例如，模态框通常需要渲染在页面的顶层。

2. **维持 React 组件的生命周期和状态**：
   - 使用 `createPortal` 渲染的元素仍然保持在 React 组件树中，因此它们会遵循 React 的生命周期方法，状态和上下文不会受到影响。

3. **避免 CSS 影响**：
   - 在某些情况下，使用 `createPortal` 可以避免子组件的 CSS 被父组件的样式干扰，因为渲染到的 DOM 节点通常是在 `body` 或其他顶层容器中。

### **示例**

```jsx
import ReactDOM from 'react-dom';

class Modal extends React.Component {
  render() {
    return ReactDOM.createPortal(
      <div className="modal">
        <h1>I'm a modal!</h1>
        <button onClick={this.props.onClose}>Close</button>
      </div>,
      document.body  // Modal 将被渲染到 body 元素中
    );
  }
}

export default Modal;
```

- `createPortal` 创建的组件会挂载到指定的 DOM 节点 `container` 中，但它仍然在 React 的组件树中。这意味着 React 可以处理它的生命周期和更新，而不是直接操作 DOM。
