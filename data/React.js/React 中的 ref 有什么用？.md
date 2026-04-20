---
level: 2
---

# React 中的 ref 有什么用？

## 题目要点

在 React 中，`ref` 用于：

1. **访问 DOM 元素**：直接访问和操作 DOM 元素。

   ```javascript
   const inputRef = useRef(null);
   useEffect(() => {
     inputRef.current.focus(); // 直接操作 DOM 元素
   }, []);
   ```

2. **保存组件实例**：在类组件中获取组件实例，访问实例方法或属性。

3. **集成第三方库**：将 React 组件与非 React 库或插件集成，控制非 React 组件。

4. **实现自定义行为**：例如，管理动画或捕获焦点等操作。

## 参考答案

使用 refs 获取。组件被调用时会新建一个该组件的实例。refs 会指向这个实例，可以是一个回调函数，回调函数会在组件被挂载后立即执行。

如果把 refs 放到原生 DOM 组件的 input 中，我们就可以通过 refs 得到 DOM 节点；如果把 refs 放到 React 组件中，那么我们获得的就是组件的实例，因此就可以调用实例的方法（如果想访问该组件的真实 DOM，那么可以用 React.findDOMNode 来找到 DOM 节点，但是不推崇此方法）。

refs 无法用于无状态组件，无状态组件挂载时只是方法调用，没有新建实例。在 v16 之后，可以使用 useRef。
