---
level: 2
---

# React 的循环渲染中，为什么不推荐使用 index 作为元素的 key？

## 题目要点

- 使用 `index` 作为 `key` 会引发 **性能问题** 和 **UI 或状态混乱**，不适用于动态列表。
- 推荐使用能唯一标识列表项的数据（如 `id`），在无法提供唯一标识的情况下，需谨慎使用 `index` 作为 `key`。

## 参考答案

在 React 中，`key` 是用于标识每个列表项的唯一标识符，以便在渲染过程中有效跟踪每个元素的变化。

虽然可以使用 `index` 作为 `key`，但并不推荐这样做，原因如下：

### **1. 会导致不必要的重新渲染**
当使用 `index` 作为 `key` 时，如果列表项的顺序发生变化（如增删或移动），React 无法正确识别哪个项是真正变化的。它可能会重用错误的 DOM 节点，导致性能问题或错误的 UI 展现。

**示例：**
```jsx
// 使用 index 作为 key
{items.map((item, index) => (
  <div key={index}>{item}</div>
))}

// 假设删除了第一个项
const newItems = ['B', 'C'];
```

---

### **2. 导致状态错乱**
如果列表项中有状态（如输入框的值），当列表顺序变化时，状态可能被错误地绑定到其他项上，造成用户体验问题。

**示例：**
```jsx
  const [items, setItems] = React.useState(['A', 'B', 'C']);
  
  const handleRemove = () => setItems(['B', 'C']);
  
  return (
    <>
      {items.map((item, index) => (
        <input key={index} defaultValue={item} />
      ))}
      <button onClick={handleRemove}>Remove First</button>
    </>
  );
}
```

---

### **3. 不满足唯一性要求**
React 要求每个 `key` 在同一级别的列表中必须是唯一的。如果使用 `index` 作为 `key`，当列表项的内容本身需要独立标识时，`index` 无法提供准确的唯一性。

---

### **推荐的做法**
1. **使用唯一标识符**：如果列表项有唯一的 `id`，优先使用 `id` 作为 `key`。
   ```jsx
   const items = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
   {items.map(item => (
     <div key={item.id}>{item.name}</div>
   ))}
   ```

2. **动态生成唯一标识符**：如果列表项没有唯一 `id`，可以使用库（如 `uuid`）生成唯一的 `key`。

3. **仅在静态列表中使用 `index`**：如果列表内容不会动态增删或重排，可以安全使用 `index`。
