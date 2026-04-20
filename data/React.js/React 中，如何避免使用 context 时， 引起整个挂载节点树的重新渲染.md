---
level: 3
---

# React 中，如何避免使用 context 时， 引起整个挂载节点树的重新渲染

## 题目要点

1. **分离 Context**：减少依赖的组件范围。
2. **使用 React.memo**：避免无关组件重渲染。
3. **使用选择器**：只订阅需要的 `context` 部分值。
4. **嵌套 Provider**：限制影响范围。
5. **直接传递 Props**：绕过 `context` 带来的渲染问题。

## 参考答案

在 React 中，使用 `context` 的一个常见问题是，当 `context` 的值发生变化时，整个依赖该 `context` 的组件树会重新渲染。

为了避免这种性能开销，可以采用以下优化策略：

### **1. 将 Context 分离到更小的粒度**
将 `context` 拆分成多个独立的 `context`，每个 `context` 只管理独立的数据，而不是将所有状态集中在一个 `context` 中。

**示例：**
```jsx
const ThemeContext = React.createContext();

// 分离用户数据和主题数据到不同的 context
function App() {
  return (
    <UserContext.Provider value={{ name: 'John' }}>
      <ThemeContext.Provider value="dark">
        <SomeComponent />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}
```

---

### **2. 使用 `React.memo` 优化子组件**
如果某些组件只需要 `context` 的一部分值，但渲染逻辑中不直接依赖它们，可以通过 `React.memo` 阻止不必要的渲染。

**示例：**
```jsx

function UserName() {
  const { name } = React.useContext(UserContext);
  console.log('UserName renders'); // 检查是否重新渲染
  return <div>User: {name}</div>;
}

const MemoizedUserName = React.memo(UserName);

function App() {
  const [user, setUser] = React.useState({ name: 'John' });

  return (
    <UserContext.Provider value={user}>
      <MemoizedUserName />
      <button onClick={() => setUser({ name: 'Doe' })}>Change Name</button>
    </UserContext.Provider>
  );
}
```

### **3. 使用 `context` 的选择器**
借助外部库（如 `react-context-selector`）实现细粒度选择器，只订阅 `context` 的部分值，而不是整个 `context` 对象。

**示例：**
```jsx

const UserContext = createContext();

function UserName() {
  const name = useContextSelector(UserContext, user => user.name);
  console.log('UserName renders'); // 检查是否重新渲染
  return <div>User: {name}</div>;
}

function App() {
  const [user, setUser] = React.useState({ name: 'John', age: 30 });

  return (
    <UserContext.Provider value={user}>
      <UserName />
      <button onClick={() => setUser({ name: 'Doe', age: 30 })}>
        Change Name
      </button>
    </UserContext.Provider>
  );
}
```

---

### **4. 使用嵌套 `Provider`**
对于大型项目，可以将 `context` 的范围限制到尽可能小的组件子树。

**示例：**
```jsx

function UserName() {
  const { name } = React.useContext(UserContext);
  return <div>User: {name}</div>;
}

function App() {
  const [user, setUser] = React.useState({ name: 'John' });

  return (
    <>
      <UserContext.Provider value={user}>
        <UserName />
      </UserContext.Provider>
      {/* 其他子树不受 UserContext 的影响 */}
    </>
  );
}
```

### **5. 通过子组件的 props 传递 context 的值**
当 `context` 只需要被特定子组件使用时，可以直接将其值作为 `props` 传递，而不是通过 `useContext`。

**示例：**
```jsx
  console.log('UserName renders'); // 检查是否重新渲染
  return <div>User: {name}</div>;
}

function App() {
  const [user, setUser] = React.useState({ name: 'John' });

  return (
    <>
      <UserName name={user.name} />
      <button onClick={() => setUser({ name: 'Doe' })}>Change Name</button>
    </>
  );
}
```
