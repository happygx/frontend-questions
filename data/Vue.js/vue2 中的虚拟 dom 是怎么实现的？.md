---
level: 2
---

# vue2 中的虚拟 dom 是怎么实现的？

## 题目要点

- **虚拟 DOM**：Vue 2 使用 VNode 对象来表示虚拟 DOM 节点，优化了真实 DOM 操作。
- **diff 算法**：高效比较新旧虚拟 DOM 树，找到并应用差异。
- **渲染与更新**：首次渲染时创建真实 DOM，后续更新时根据 diff 算法更新真实 DOM。

## 参考答案

Vue 2 中的虚拟 DOM 实现机制基于以下几个核心概念和技术：

### **1. 虚拟 DOM 节点**

- **VNode（虚拟节点）**：Vue 2.x 中的虚拟 DOM 使用 VNode 对象来表示 DOM 元素。每个 VNode 对象包含标签名、属性、子节点等信息。

### **2. 创建虚拟 DOM**

- **`_c`（createElement）函数**：Vue 的编译器在编译模板时，会将模板转换成渲染函数，这些渲染函数调用 `_c` 函数来创建 VNode 对象。
  
- **`_v`（createTextVNode）函数**：用于创建文本节点的 VNode 对象。

- **示例代码**：
  ```javascript
  // 示例渲染函数生成的 VNode
  function render() {
    return _c('div', { id: 'app' },
      [_c('h1', null, ['Hello, Vue!']),
       _c('p', null, ['This is a virtual DOM example.'])]
    );
  }
  ```

### **3. 更新虚拟 DOM**

- **diff 算法**：Vue 使用一种高效的 diff 算法来比较新旧虚拟 DOM 树的差异。这个算法基于以下几个原则：

  - **同层比较**：仅比较同一层的节点，而不是递归地比较所有层级。
  - **同类比较**：对相同类型的节点进行比较，避免不必要的节点创建和销毁。
  - **key 属性**：通过 `key` 属性来标识节点，帮助高效地重用和移动节点，特别是在列表渲染时。

### **4. 渲染和更新**

- **渲染**：首次渲染时，Vue 会根据 VNode 创建真实的 DOM 节点，并插入到文档中。

- **更新**：当数据变化时，Vue 会重新生成一个新的 VNode 树，并使用 diff 算法与旧的 VNode 树进行比较。找到的差异会被转化为操作真实 DOM 的指令，然后应用到真实 DOM 上。

### **5. 关键代码**

- **创建 VNode**：
  ```javascript
  function createElement(tag, data, children) {
    return { tag, data, children };
  }
  ```

- **虚拟 DOM diff**：
  ```javascript
  function diff(oldVNode, newVNode) {
    if (!oldVNode) return newVNode;
    if (!newVNode) return null;
    if (oldVNode.tag !== newVNode.tag) return newVNode;
    if (oldVNode.tag === 'TEXT') {
      if (oldVNode.text !== newVNode.text) return newVNode;
      return null;
    }
    const patch = {};
    const propChanges = {};
    for (let key in newVNode.data) {
      if (oldVNode.data[key] !== newVNode.data[key]) {
        propChanges[key] = newVNode.data[key];
      }
    }
    if (Object.keys(propChanges).length > 0) {
      patch.props = propChanges;
    }
    const children = [];
    for (let i = 0; i < Math.max(oldVNode.children.length, newVNode.children.length); i++) {
      const childPatch = diff(oldVNode.children[i], newVNode.children[i]);
      if (childPatch) children[i] = childPatch;
    }
    if (children.length > 0) {
      patch.children = children;
    }
    return Object.keys(patch).length > 0 ? patch : null;
  }
  ```

- **更新真实 DOM**：
  ```javascript
  function patch(node, patch) {
    if (patch === null) return;
    if (patch.props) {
      for (let key in patch.props) {
        node[key] = patch.props[key];
      }
    }
    if (patch.children) {
      patch.children.forEach((childPatch, index) => {
        const childNode = node.childNodes[index];
        if (childNode) {
          patch(childNode, childPatch);
        }
      });
    }
  }
  ```
