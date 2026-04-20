---
level: 2.5
---

# forwardRef 作用是什么？

## 题目要点

`forwardRef` 是在 React 中处理组件间 `ref` 传递的强大工具，它使得父组件可以直接操作子组件的 DOM 节点或方法，从而提升了组件的灵活性和可重用性。

## 参考答案

`forwardRef` 是 React 的一个高阶组件（HOC），用于将父组件的 `ref` 转发到子组件的 DOM 节点或组件实例中。它使得父组件能够直接访问子组件的 DOM 元素或方法。这在一些情况下非常有用，比如需要在父组件中操作子组件的 DOM 元素或调用子组件的方法时。

### **使用场景**

1. **访问子组件的 DOM 节点：** 当需要对子组件的 DOM 元素进行操作（例如，获取焦点、调整大小等），而这个子组件是由其他组件包裹的情况下。

2. **组合高阶组件和 `ref`：** 在使用高阶组件（HOC）时，`ref` 不会自动转发到被包裹的组件中。使用 `forwardRef` 可以将 `ref` 转发到正确的组件或 DOM 元素。

### **基本用法**

```javascript

// 子组件
const Input = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return <input ref={inputRef} {...props} />;
});

// 父组件
function ParentComponent() {
  const inputRef = useRef(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // 调用子组件的 focus 方法
    }
  };

  return (
    <div>
      <Input ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

export default ParentComponent;
```

- **`forwardRef`**：是一个 React 函数，用于包装组件并转发 `ref`。
- **`useImperativeHandle`**：用来自定义暴露给父组件的 `ref` 实例。可以将特定的函数或属性暴露给父组件。
