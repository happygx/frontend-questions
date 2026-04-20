---
level: 3.5
---

# React 中，怎么给 children 添加额外的属性？

## 题目要点

- **React.cloneElement**：用于在渲染过程中动态地为 `children` 添加属性。
- **Context API**：用于全局传递数据或配置，适合多个嵌套组件。
- **通过 Props 传递**：显式地将额外的属性作为 prop 传递给子组件。

## 参考答案

在 React 中，`children` 是一个特殊的 prop，用于传递子组件或元素。虽然直接给 `children` 添加属性是不可能的，但可以使用一些方法来为子组件传递额外的属性。

### **方法一：使用 React.cloneElement**

`React.cloneElement` 是 React 提供的一个 API，用于克隆一个元素并添加额外的属性。这种方法适用于在渲染过程中动态地为 `children` 添加属性。

**示例**：

```javascript

function ParentComponent({ children }) {
  // 为每个子元素添加额外的属性
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { extraProp: 'value' })
  );

  return <div>{childrenWithProps}</div>;
}

function ChildComponent(props) {
  return <div>{props.extraProp}</div>;
}

// 使用示例
export default function App() {
  return (
    <ParentComponent>
      <ChildComponent />
      <ChildComponent />
    </ParentComponent>
  );
}
```
- `React.Children.map` 遍历 `children` 并应用 `React.cloneElement`。
- `React.cloneElement` 克隆每个子元素，并添加 `extraProp` 属性。

### **方法二：使用 Context API**

另一种方法是使用 React 的 Context API 传递额外的属性。这种方法适用于全局传递数据或配置，尤其是当有多个嵌套组件时。

**示例**：

```javascript

// 创建一个 Context
const ExtraPropsContext = createContext({ extraProp: 'default' });

function ParentComponent({ children }) {
  const extraProps = { extraProp: 'value' };

  return (
    <ExtraPropsContext.Provider value={extraProps}>
      {children}
    </ExtraPropsContext.Provider>
  );
}

function ChildComponent() {
  const { extraProp } = useContext(ExtraPropsContext);

  return <div>{extraProp}</div>;
}

// 使用示例
export default function App() {
  return (
    <ParentComponent>
      <ChildComponent />
      <ChildComponent />
    </ParentComponent>
  );
}
```
- 使用 `createContext` 和 `Provider` 传递额外的属性。
- 使用 `useContext` 在子组件中获取这些属性。

### **方法三：通过 Props 传递**

直接将额外的属性作为普通的 prop 传递给子组件，这种方法适用于显式传递和少量的属性。

**示例**：

```javascript

function ParentComponent({ children }) {
  const extraProp = 'value';

  return (
    <div>
      {React.Children.map(children, child =>
        React.isValidElement(child) ? React.cloneElement(child, { extraProp }) : child
      )}
    </div>
  );
}

function ChildComponent(props) {
  return <div>{props.extraProp}</div>;
}

// 使用示例
export default function App() {
  return (
    <ParentComponent>
      <ChildComponent />
      <ChildComponent />
    </ParentComponent>
  );
}
```
- 在父组件中为子组件添加额外的 prop。
