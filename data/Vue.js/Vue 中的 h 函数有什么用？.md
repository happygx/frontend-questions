---
level: 2
---

# Vue 中的 h 函数有什么用？

## 题目要点

- `h` 函数是 Vue 中创建虚拟 DOM 的核心工具，灵活性高，支持动态组件、嵌套结构和属性传递。
- 它使得开发者可以在没有模板的情况下，以编程的方式构建组件，适用于复杂的渲染逻辑。
- 在性能上，通过虚拟 DOM 的机制，提升了应用的响应速度和渲染效率。

## 参考答案

### **1. `h` 函数概述**

在 Vue 中，`h` 函数是一个用于创建虚拟 DOM 节点的工厂函数。它的全称是 `createElement`，在 Vue 3 中，它通常被直接引用为 `h`。

### **2. 基本用法**

`h` 函数的基本语法如下：

```javascript
```
- **props**: 可选的属性对象，包含要传递给组件或元素的属性。
- **children**: 可选的子节点，可以是字符串、虚拟 DOM 节点数组或嵌套的 `h` 函数调用。

### **3. 创建虚拟 DOM 示例**

下面是一个简单的使用 `h` 函数创建虚拟 DOM 的示例：

```javascript

export default defineComponent({
  name: 'MyComponent',
  render() {
    return h('div', { class: 'my-class' }, [
      h('h1', 'Hello World'),
      h('p', 'This is a paragraph.'),
    ]);
  },
});
```

### **4. 动态组件示例**

使用 `h` 函数可以方便地创建动态组件。例如：

```javascript

const MyButton = { template: '<button>Button</button>' };
const MyLink = { template: '<a href="#">Link</a>' };

export default defineComponent({
  name: 'DynamicComponent',
  setup() {
    const isButton = ref(true);
    
    return { isButton };
  },
  render() {
    const component = this.isButton ? MyButton : MyLink;
    return h(component);
  },
});
```

### **5. 与 JSX 结合**

在 Vue 3 中，可以使用 JSX 来书写组件，`h` 函数在这里起到关键作用。示例如下：

```javascript
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyComponent',
  render() {
    return (
      <div class="my-class">
        <h1>Hello World</h1>
        <p>This is a paragraph.</p>
      </div>
    );
  },
});
```

### **6. 性能优化**

`h` 函数通过创建虚拟 DOM，Vue 可以在数据变化时比较新旧虚拟 DOM，计算出最小的 DOM 更新，优化性能。这种方式避免了频繁的实际 DOM 操作，从而提升了应用的性能。
