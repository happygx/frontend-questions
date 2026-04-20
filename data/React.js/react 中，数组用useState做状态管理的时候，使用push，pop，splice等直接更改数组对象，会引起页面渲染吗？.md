---
level: 2
---

# react 中，数组用useState做状态管理的时候，使用push，pop，splice等直接更改数组对象，会引起页面渲染吗？

## 题目要点

- **直接修改原始数组**：如 `push`、`pop`、`splice` 等，不会触发 React 的渲染更新。
- **使用不可变数据模式**：通过创建新的数组来更新状态，确保 React 能够检测到状态变化并触发渲染。

## 参考答案

在 React 中，直接使用 `push`、`pop`、`splice` 等方法修改数组不会触发页面重新渲染。React 的状态更新机制依赖于状态的不可变性（immutability），即通过创建新的状态对象来更新状态。直接修改原始状态对象（如数组）不会创建新的对象引用，因此 React 不会检测到状态的变化，也不会触发重新渲染。

### 为什么直接修改数组不触发渲染

React 使用 `Object.is`（或其变体）来检查状态是否发生了变化。直接对数组进行 `push`、`pop`、`splice` 等操作，修改了原始数组的内容，但数组的引用（内存地址）没有改变。React 仅通过引用变化来判断状态是否更新，因此直接修改原始数组不会触发更新。

### 正确的做法

为了触发渲染，应该遵循不可变数据模式，即通过创建新数组来更新状态。以下是使用 `useState` 管理数组状态的推荐方法：

#### 示例：使用 `concat`、`slice`、`map` 等方法

```javascript

function MyComponent() {
    const [items, setItems] = useState([1, 2, 3]);

    // 添加新项
    const addItem = (item) => {
        setItems(prevItems => [...prevItems, item]);
    };

    // 移除最后一项
    const removeLastItem = () => {
        setItems(prevItems => prevItems.slice(0, -1));
    };

    // 更新特定项
    const updateItem = (index, newItem) => {
        setItems(prevItems => prevItems.map((item, i) => i === index ? newItem : item));
    };

    return (
        <div>
            <button onClick={() => addItem(4)}>Add Item</button>
            <button onClick={removeLastItem}>Remove Last Item</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default MyComponent;
```

1. **添加新项**：
   - 使用展开运算符 `[...prevItems, item]` 创建一个新数组，并将新项添加到末尾。

2. **移除最后一项**：
   - 使用 `slice(0, -1)` 创建一个新数组，去除最后一项。

3. **更新特定项**：
   - 使用 `map` 方法创建一个新数组，并根据条件更新特定项。
