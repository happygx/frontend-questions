---
level: 2.5
---

# React中，useRef、ref、forwardsRef 的区别是什么?

## 题目要点

- **`useRef`**：在函数组件中创建和管理引用，适用于访问 DOM 元素或保存任意数据。
- **`ref`**：用于类组件和通过 `forwardRef` 的函数组件来访问 DOM 节点或组件实例。
- **`forwardRef`**：允许函数组件接收和转发 `ref`，使得 `ref` 能够传递到子组件的 DOM 元素。

## 参考答案

`useRef`、`ref` 和 `forwardRef` 都涉及到引用（refs）的使用，但它们的用途和行为有所不同。下面是它们的主要区别：

### **1. `useRef`**

- **用途**：在函数组件中创建和管理引用。`useRef` 返回一个可变的 `ref` 对象，该对象的 `.current` 属性可以用来访问 DOM 节点或保存任意值。
- **使用方式**：
  ```javascript
  import { useRef, useEffect } from 'react';

  function MyComponent() {
    const inputRef = useRef(null);

    useEffect(() => {
      inputRef.current.focus(); // 访问和操作 DOM 元素
    }, []);

    return <input ref={inputRef} />;
  }
  ```

- **特点**：
  - `useRef` 创建的引用对象在组件的整个生命周期内保持不变。
  - 可以用来保存任意数据，除了 DOM 节点。

### **2. `ref`**

- **用途**：在类组件中使用，或者通过 `React.forwardRef` 在函数组件中使用，来访问 DOM 节点或组件实例。
- **使用方式**：
  ```javascript
  class MyClassComponent extends React.Component {
    constructor(props) {
      super(props);
      this.inputRef = React.createRef();
    }

    componentDidMount() {
      this.inputRef.current.focus(); // 访问和操作 DOM 元素
    }

    render() {
      return <input ref={this.inputRef} />;
    }
  }
  ```

  ```javascript
  function MyFunctionComponent(props, ref) {
    return <input ref={ref} />;
  }
  const ForwardedComponent = React.forwardRef(MyFunctionComponent);
  ```

- **特点**：
  - `ref` 用于访问类组件的实例或函数组件的 DOM 元素。
  - 在函数组件中使用 `ref` 需要配合 `React.forwardRef` 使用。

### **3. `forwardRef`**

- **用途**：允许函数组件接收 `ref` 并将其转发到子组件的 DOM 元素或其他组件。
- **使用方式**：
  ```javascript
  import React, { forwardRef } from 'react';

  const MyComponent = forwardRef((props, ref) => (
    <input ref={ref} {...props} />
  ));

  function App() {
    const inputRef = useRef(null);

    useEffect(() => {
      inputRef.current.focus(); // 访问和操作 DOM 元素
    }, []);

    return <MyComponent ref={inputRef} />;
  }
  ```

- **特点**：
  - `forwardRef` 高阶组件允许函数组件接收 `ref`，并将 `ref` 转发到子组件的 DOM 元素或其他组件上。
  - 适用于需要将 `ref` 传递给深层组件的情况。
