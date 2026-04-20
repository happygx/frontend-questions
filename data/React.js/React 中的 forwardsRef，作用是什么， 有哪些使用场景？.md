---
level: 2
---

# React 中的 forwardsRef，作用是什么， 有哪些使用场景？

## 题目要点

`forwardRef` 是 React 中用来 **转发引用（ref）** 的一个功能。它使得父组件能够直接访问子组件中的 DOM 元素或方法。常见的使用场景包括：

- **访问子组件的 DOM 元素**：例如，在父组件中通过 `ref` 访问子组件的输入框并进行操作（如聚焦、获取值等）。
- **与第三方库兼容**：通过 `forwardRef` 将 `ref` 传递给第三方库的组件，确保父组件能够访问其 DOM 元素。
- **高阶组件中转发 `ref`**：在高阶组件中，通过 `forwardRef` 将 `ref` 转发到被包装组件的根元素，避免 `ref` 无效的问题。

使用 `forwardRef` 使得函数组件也能够支持 `ref`，并且能够灵活地控制组件的行为，尤其是在涉及到 DOM 操作或与其他库交互时。

## 参考答案

在 React 中，`forwardRef` 是一个高阶组件（HOC），用于**转发引用（ref）**到子组件的 DOM 元素或子组件内部的某个实例上。通常，React 的 `ref` 是用来直接访问 DOM 元素或组件实例的，但是在函数组件中，`ref` 是无法直接使用的，因为函数组件没有实例。

`forwardRef` 允许我们在函数组件中**传递** `ref`，将其绑定到组件内部的 DOM 元素或组件实例上，从而能够在父组件中访问这个子组件的 DOM 或实例方法。

### 1. **`forwardRef` 的作用**
`forwardRef` 使得我们能够将 `ref` 从父组件转发到子组件中，使得父组件能够访问子组件的内部 DOM 元素或方法。

### 2. **`forwardRef` 的语法**
`forwardRef` 接受一个函数组件，并返回一个新的组件，该组件会接收 `ref` 参数并将其转发到子组件。

```jsx

// 使用 forwardRef 创建一个转发 ref 的组件
const MyButton = forwardRef((props, ref) => {
  return <button ref={ref}>{props.children}</button>;
});

export default MyButton;
```

### 3. **使用场景**

#### 场景 1：访问子组件的 DOM 元素
父组件想要直接访问子组件的 DOM 元素或执行某些操作（例如聚焦某个输入框）。

```jsx
import { forwardRef } from 'react';

// 定义一个转发 ref 的函数组件
const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

function ParentComponent() {
  const inputRef = useRef();

  const handleFocus = () => {
    inputRef.current.focus();  // 访问子组件的 DOM 元素，执行聚焦操作
  };

  return (
    <div>
      <Input ref={inputRef} />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

export default ParentComponent;
```

#### 场景 2：将 `ref` 转发到第三方库的组件
在使用第三方库时，通常我们需要通过 `ref` 来获取其组件的 DOM 元素或实例方法。如果该库的组件是一个函数组件，而不是类组件，`ref` 默认是无法传递的。此时可以使用 `forwardRef` 来实现。

例如，第三方库中的一个组件：

```jsx
import React from 'react';

function ThirdPartyComponent() {
  return <div>Some third party component</div>;
}

export default ThirdPartyComponent;
```

```jsx
import React, { forwardRef } from 'react';
import ThirdPartyComponent from './ThirdPartyComponent';

const WrappedComponent = forwardRef((props, ref) => {
  return <ThirdPartyComponent ref={ref} {...props} />;
});

export default WrappedComponent;
```
在某些高阶组件中，我们需要将 `ref` 转发到被包装组件的根元素。这样父组件可以使用 `ref` 获取到子组件的 DOM 元素。

```jsx

function withExtraStyles(Component) {
  return forwardRef((props, ref) => {
    return <Component ref={ref} {...props} style={{ color: 'red' }} />;
  });
}

const Button = (props) => {
  return <button {...props}>Click me</button>;
};

const StyledButton = withExtraStyles(Button);

function Parent() {
  const buttonRef = React.useRef();

  const handleClick = () => {
    console.log(buttonRef.current); // 访问按钮的 DOM 元素
  };

  return (
    <div>
      <StyledButton ref={buttonRef} onClick={handleClick} />
    </div>
  );
}
```
