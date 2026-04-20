---
level: 4
---

# 虚拟 dom 原理是什么，手写一个简单的虚拟 dom 实现

## 题目要点

- **虚拟 DOM** 提供了一个轻量级的 DOM 表示，在内存中进行操作，提高了性能。
- **比较和更新**：通过虚拟 DOM 树的比较和差异更新来优化真实 DOM 的操作。
- **手写实现**：需要使用 JavaScript 实现虚拟 DOM、差异计算和更新。实际生产环境中的虚拟 DOM 实现要复杂得多，通常会使用更高级的技术和优化策略。

## 参考答案

**虚拟 DOM（Virtual DOM）** 是一种通过用 JavaScript 对象来模拟真实 DOM 的机制。它可以提高网页的性能和响应速度，减少直接对 DOM 的操作，从而优化 UI 渲染。

### **虚拟 DOM 的原理**

1. **创建虚拟 DOM**：
   - 使用 JavaScript 对象来表示 DOM 元素。虚拟 DOM 结构类似于真实 DOM，但它是轻量级的，可以在内存中快速操作。

2. **比较差异（Diffing）**：
   - 当组件状态或属性发生变化时，生成一个新的虚拟 DOM 树。
   - 通过对比新旧虚拟 DOM 树，找到差异（diff）。

3. **更新真实 DOM**：
   - 将差异应用到真实 DOM 上，进行最小化的更新，以提高性能。

### **手写一个简单的虚拟 DOM 实现**

以下是一个简化版的虚拟 DOM 实现示例：

```javascript
function createElement(tag, props, ...children) {
    return {
        tag,
        props: props || {},
        children: children.flat().map(child =>
            typeof child === 'object' ? child : createTextNode(child)
        )
    };
}

// 创建虚拟 DOM 文本节点
function createTextNode(text) {
    return { tag: 'TEXT', props: { nodeValue: text } };
}

// 渲染虚拟 DOM 节点到真实 DOM
function render(vnode, container) {
    if (vnode.tag === 'TEXT') {
        const textNode = document.createTextNode(vnode.props.nodeValue);
        container.appendChild(textNode);
        return;
    }

    const element = document.createElement(vnode.tag);
    Object.keys(vnode.props).forEach(prop => {
        element[prop] = vnode.props[prop];
    });

    vnode.children.forEach(child => render(child, element));

    container.appendChild(element);
}

// 比较两个虚拟 DOM 树，更新差异
function diff(oldVNode, newVNode) {
    if (!oldVNode) {
        return newVNode;
    }
    if (!newVNode) {
        return null;
    }
    if (oldVNode.tag !== newVNode.tag) {
        return newVNode;
    }
    if (oldVNode.tag === 'TEXT') {
        if (oldVNode.props.nodeValue !== newVNode.props.nodeValue) {
            return newVNode;
        }
        return null;
    }

    const patch = {};
    const propChanges = Object.keys(newVNode.props).reduce((acc, prop) => {
        if (oldVNode.props[prop] !== newVNode.props[prop]) {
            acc[prop] = newVNode.props[prop];
        }
        return acc;
    }, {});

    if (Object.keys(propChanges).length > 0) {
        patch.props = propChanges;
    }

    const childPatches = [];
    const maxLength = Math.max(oldVNode.children.length, newVNode.children.length);
    for (let i = 0; i < maxLength; i++) {
        const childPatch = diff(oldVNode.children[i], newVNode.children[i]);
        if (childPatch) {
            childPatches[i] = childPatch;
        }
    }

    if (childPatches.length > 0) {
        patch.children = childPatches;
    }

    return Object.keys(patch).length > 0 ? patch : null;
}

// 应用虚拟 DOM 差异到真实 DOM
function patch(node, patch) {
    if (patch === null) {
        return;
    }

    if (patch.props) {
        Object.keys(patch.props).forEach(prop => {
            node[prop] = patch.props[prop];
        });
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

// 使用示例
const oldVNode = createElement('div', { id: 'container' },
    createElement('h1', null, 'Hello, World!'),
    createElement('p', null, 'This is a virtual DOM example.')
);

const newVNode = createElement('div', { id: 'container' },
    createElement('h1', null, 'Hello, Virtual DOM!'),
    createElement('p', null, 'Updated example.')
);

const container = document.getElementById('app');
render(oldVNode, container);

setTimeout(() => {
    const patch = diff(oldVNode, newVNode);
    patch(container, patch);
}, 2000);
```

1. **`createElement`**：创建虚拟 DOM 节点。
2. **`createTextNode`**：创建虚拟文本节点。
3. **`render`**：将虚拟 DOM 渲染到真实 DOM。
4. **`diff`**：对比虚拟 DOM 树，找出差异。
5. **`patch`**：将差异应用到真实 DOM 上。
