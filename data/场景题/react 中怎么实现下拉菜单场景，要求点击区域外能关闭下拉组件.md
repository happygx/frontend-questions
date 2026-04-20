---
level: 3.5
---

# react 中怎么实现下拉菜单场景，要求点击区域外能关闭下拉组件

## 参考答案

涉及以下几个步骤：

1. **创建下拉菜单组件**
2. **监听点击事件**
3. **判断点击事件是否在下拉菜单外部**

### **步骤说明**

#### **1. 创建下拉菜单组件**

```jsx

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 监听点击事件
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <button onClick={toggleDropdown}>
        Toggle Dropdown
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <p>Menu Item 1</p>
          <p>Menu Item 2</p>
          <p>Menu Item 3</p>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
```

- 在 `useEffect` 钩子中，添加一个全局的 `mousedown` 事件监听器，用于检测点击是否发生在下拉菜单外部。
- `handleClickOutside` 函数会检查点击事件的目标是否在下拉菜单外部，如果是则关闭下拉菜单。

#### **3. 判断点击事件是否在下拉菜单外部**

- 使用 `useRef` 钩子获取下拉菜单组件的引用（`dropdownRef`）。
- `handleClickOutside` 函数中使用 `dropdownRef.current.contains(event.target)` 来判断点击的目标是否在下拉菜单的 DOM 结构内。

### **注意事项**

- 确保 `ref` 正确设置在包含下拉菜单的最外层容器上。
- 在组件卸载时移除事件监听器，以避免内存泄漏。
- 在大型应用中，可以考虑使用更复杂的事件处理库或工具来处理全局点击事件。

通过上述步骤，你可以实现点击区域外关闭下拉菜单的功能。
