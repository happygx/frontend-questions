---
level: 2
---

# React Hooks当中的useEffect是如何区分生命周期钩子的


## 题目要点

`useEffect` 是 React Hooks 中用于处理副作用的钩子，它可以用来模拟类组件中的生命周期方法。通过配置 `useEffect` 的依赖项，你可以在函数组件中实现类似于以下生命周期钩子的功能：

### 1. **`componentDidMount`**

- **用法**：当组件挂载（首次渲染）时执行一次的副作用。
- **实现方式**：

  ```javascript
  useEffect(() => {
    // 执行副作用（类似 componentDidMount）
    console.log('Component did mount');

    // 可选：返回一个清理函数（用于组件卸载时执行）
    return () => {
      console.log('Component will unmount');
    };
  }, []); // 依赖数组为空，表示只在挂载时执行
  ```

### 2. **`componentDidUpdate`**

- **用法**：当组件更新时执行副作用。可以通过依赖数组来指定哪些状态或 props 更改时触发副作用。
- **实现方式**：

  ```javascript
  useEffect(() => {
    // 执行副作用（类似 componentDidUpdate）
    console.log('Component did update');

    // 可选：返回一个清理函数（用于更新前执行）
    return () => {
      console.log('Cleanup before next update');
    };
  }, [dependencies]); // 依赖数组包含会导致副作用的变量
  ```

### 3. **`componentWillUnmount`**

- **用法**：当组件卸载时执行副作用清理。
- **实现方式**：

  ```javascript
  useEffect(() => {
    // 执行副作用（类似 componentDidMount）
    console.log('Component mounted');

    // 返回一个清理函数（类似 componentWillUnmount）
    return () => {
      console.log('Component will unmount');
    };
  }, []); // 依赖数组为空，表示只在挂载和卸载时执行
  ```

### 4. **组合副作用**

- **用法**：你可以将多个副作用合并到一个 `useEffect` 中，但通常将不同的副作用分开处理，以保持代码的清晰。
- **实现方式**：

  ```javascript
  useEffect(() => {
    // 第一个副作用
    console.log('Effect 1');

    return () => {
      // 清理第一个副作用
      console.log('Cleanup 1');
    };
  }, [dependency1]); // 依赖数组包含 dependency1

  useEffect(() => {
    // 第二个副作用
    console.log('Effect 2');

    return () => {
      // 清理第二个副作用
      console.log('Cleanup 2');
    };
  }, [dependency2]); // 依赖数组包含 dependency2
  ```

### 5. **注意事项**

- **依赖数组**：`useEffect` 的依赖数组决定了副作用的执行时机。如果依赖数组为空，副作用只会在组件挂载和卸载时执行。如果包含依赖项，副作用会在这些依赖项发生变化时执行。
- **清理函数**：在副作用中返回一个清理函数，可以用来清除定时器、取消订阅等。清理函数会在组件卸载或副作用更新之前执行。

### 总结

- **`componentDidMount`**：通过空依赖数组实现。
- **`componentDidUpdate`**：通过包含依赖项的依赖数组实现。
- **`componentWillUnmount`**：通过返回清理函数实现。

## 参考答案

useEffect可以看成是 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 三者的结合。

useEffect(callback, [source])接收两个参数，调用方式如下：

```react.js
useEffect(() => {
   console.log('mounted');
   
   return () => {
       console.log('willUnmount');
   }
 }, [source]);
```

* [source]参数不传时，则每次都会优先调用上次保存的函数中返回的那个函数，然后再调用外部那个函数；
* [source]参数传[]时，则外部的函数只会在初始化时调用一次，返回的那个函数也只会最终在组件卸载时调用一次；
* [source]参数有值时，则只会监听到数组中的值发生变化后才优先调用返回的那个函数，再调用外部的函数。
