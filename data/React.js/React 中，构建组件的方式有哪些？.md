---
level: 3
---

# React 中，构建组件的方式有哪些？

## 题目要点

在 React 中，组件可以通过函数组件、类组件、高阶组件、组合组件、Render Props 和自定义 Hook 等多种方式构建。选择合适的组件构建方式，可以提高代码的可读性、复用性和维护性。函数组件与 Hooks 是现代 React 推荐的主要开发方式。

## 参考答案

在 React 中，构建组件的方式主要有以下几种：

### **1. 函数组件 (Function Components)**

函数组件是最常用的组件形式，使用 JavaScript 函数来定义。自 React Hooks 引入以来，函数组件得到了广泛使用。

```jsx

const MyComponent = () => {
  return <div>Hello, Function Component!</div>;
};

export default MyComponent;
```

类组件是通过 ES6 的类语法定义的，适合需要使用生命周期方法的场景。虽然现在推荐使用函数组件和 Hooks，但类组件依然在一些老旧代码中存在。

```jsx

class MyClassComponent extends Component {
  render() {
    return <div>Hello, Class Component!</div>;
  }
}

export default MyClassComponent;
```

高阶组件是接受一个组件作为参数并返回一个新的组件的函数。这种模式用于代码复用和逻辑封装。

```jsx

const withExtraInfo = (WrappedComponent) => {
  return (props) => {
    return (
      <div>
        <WrappedComponent {...props} />
        <p>Additional Info</p>
      </div>
    );
  };
};

export default withExtraInfo;
```

通过组合多个小组件来构建复杂组件。使用组合的方式可以提高组件的复用性和可维护性。

```jsx
  <div>
    <ChildComponentA />
    <ChildComponentB />
  </div>
);
```

通过将一个函数作为 props 传递给组件，允许调用该函数来控制组件的渲染。这种模式用于实现复杂的逻辑和状态共享。

```jsx
  const data = { /* some data */ };
  return render(data);
};

// 使用
<DataProvider render={(data) => <MyComponent data={data} />} />
```

虽然不直接构建组件，但自定义 Hook 是一种封装逻辑和状态的方式，可以在函数组件中复用。

```jsx

const useFetchData = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [url]);

  return data;
};
```
