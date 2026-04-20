---
level: 2
---

# 列举几个常见的 Hook?

## 题目要点

1. **`useState`**：管理组件状态。
2. **`useEffect`**：处理副作用（例如数据获取、订阅）。
3. **`useContext`**：访问上下文数据。
4. **`useReducer`**：管理复杂状态逻辑。
5. **`useMemo`**：优化性能，缓存计算结果。
6. **`useCallback`**：缓存函数，防止不必要的重新创建。

## 参考答案

在 React 中，Hooks 是一组可以让函数组件拥有状态和副作用的 API。

以下是一些常见的 Hook 及其用途：

### 1. **`useState`**

- **用途**：在函数组件中添加状态。
- **示例**：
  ```javascript
  import React, { useState } from 'react';

  function Counter() {
    const [count, setCount] = useState(0);

    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    );
  }
  ```

### 2. **`useEffect`**

- **用途**：在函数组件中处理副作用，如数据获取、订阅和手动 DOM 操作。
- **示例**：
  ```javascript
  import React, { useEffect, useState } from 'react';

  function Example() {
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch('https://api.example.com/data')
        .then(response => response.json())
        .then(data => setData(data));
    }, []); // 空数组表示只在组件挂载时执行一次

    return <div>{data ? `Data: ${data}` : 'Loading...'}</div>;
  }
  ```

### 3. **`useContext`**

- **用途**：在组件中访问 React 的 Context。
- **示例**：
  ```javascript
  import React, { useContext, createContext } from 'react';

  const MyContext = createContext('defaultValue');

  function Display() {
    const value = useContext(MyContext);
    return <div>{value}</div>;
  }

  function App() {
    return (
      <MyContext.Provider value="Hello, World!">
        <Display />
      </MyContext.Provider>
    );
  }
  ```

### 4. **`useReducer`**

- **用途**：管理复杂状态逻辑，类似于 Redux 的 reducer。
- **示例**：
  ```javascript
  import React, { useReducer } from 'react';

  const initialState = { count: 0 };

  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 };
      case 'decrement':
        return { count: state.count - 1 };
      default:
        throw new Error();
    }
  }

  function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
      <div>
        <p>Count: {state.count}</p>
        <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
      </div>
    );
  }
  ```

### 5. **`useMemo`**

- **用途**：优化性能，通过记忆化计算结果，避免不必要的重新计算。
- **示例**：
  ```javascript
  import React, { useMemo, useState } from 'react';

  function ExpensiveComponent({ compute }) {
    const result = useMemo(() => compute(), [compute]);
    return <div>Result: {result}</div>;
  }

  function App() {
    const [count, setCount] = useState(0);

    const compute = () => {
      // 模拟一个计算过程
      return count * 2;
    };

    return (
      <div>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <ExpensiveComponent compute={compute} />
      </div>
    );
  }
  ```

### 6. **`useCallback`**

- **用途**：记忆化回调函数，避免在依赖项变化时重新创建函数。
- **示例**：
  ```javascript
  import React, { useCallback, useState } from 'react';

  function Button({ onClick }) {
    console.log('Button rendered');
    return <button onClick={onClick}>Click me</button>;
  }

  function App() {
    const [count, setCount] = useState(0);

    const handleClick = useCallback(() => {
      alert('Button clicked!');
    }, []); // 依赖项为空数组表示回调函数不会变化

    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <Button onClick={handleClick} />
      </div>
    );
  }
  ```

### 7. **`useRef`**

- **用途**：在函数组件中创建可变的引用，通常用于访问 DOM 元素或保存任何可变数据。
- **示例**：
  ```javascript
  import React, { useRef } from 'react';

  function FocusInput() {
    const inputRef = useRef(null);

    const handleClick = () => {
      inputRef.current.focus();
    };

    return (
      <div>
        <input ref={inputRef} type="text" />
        <button onClick={handleClick}>Focus the input</button>
      </div>
    );
  }
  ```

这些 Hooks 提供了处理状态、副作用、上下文、性能优化等常见需求的功能，使得函数组件变得更加灵活和强大。
