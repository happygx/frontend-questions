---
level: 3.5
---

# React 如何实现 vue 中 keep-alive 的功能？

## 参考答案

在 React 中实现类似于 Vue 中 `keep-alive` 的功能，可以使用组件状态和 React 的生命周期方法来控制组件的挂载和卸载。

以下是一种实现方式：

### **1. 使用状态管理组件**

创建一个 `KeepAlive` 组件，用于存储和管理被“缓存”的组件。

```jsx

// KeepAlive 组件
const KeepAlive = ({ children, name }) => {
  const [cache, setCache] = useState({});

  // 保存组件
  const saveCache = () => {
    setCache((prev) => ({
      ...prev,
      [name]: children,
    }));
  };

  // 恢复组件
  const getCachedComponent = () => {
    return cache[name] || children;
  };

  // 组件挂载时保存
  React.useEffect(() => {
    saveCache();
  }, [children]);

  return <>{getCachedComponent()}</>;
};

// 示例用法
const App = () => {
  const [activeComponent, setActiveComponent] = useState('ComponentA');

  return (
    <div>
      <button onClick={() => setActiveComponent('ComponentA')}>Component A</button>
      <button onClick={() => setActiveComponent('ComponentB')}>Component B</button>

      <KeepAlive name={activeComponent}>
        {activeComponent === 'ComponentA' ? <ComponentA /> : <ComponentB />}
      </KeepAlive>
    </div>
  );
};

const ComponentA = () => <div>Component A</div>;
const ComponentB = () => <div>Component B</div>;

export default App;
```

- **状态管理**：`KeepAlive` 组件使用一个状态 `cache` 来存储被缓存的组件。
- **保存和恢复**：在组件挂载时保存当前子组件到缓存中；每次渲染时，检查缓存并返回之前的组件，避免重新渲染。
- **使用示例**：通过按钮切换 `activeComponent` 的状态，展示不同的组件，同时保留它们的状态。
