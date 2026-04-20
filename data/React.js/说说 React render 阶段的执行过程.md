---
level: 4
---

# 说说 React render 阶段的执行过程

## 题目要点

React 的 render 阶段是基于 Fiber 架构的可中断计算过程，其核心目标是根据最新状态构建 workInProgress Fiber 树并完成节点 diff；执行流程由 beginWork 向下遍历生成子 Fiber，再由 completeWork 向上回溯收集 effect 标记；该阶段只进行虚拟树计算，不执行 DOM 操作或副作用，从而支持时间切片、优先级调度以及并发渲染能力，最终为 commit 阶段提供精确的更新描述。

## 参考答案

React 的 render 阶段本质上是 **一次可中断、可恢复的虚拟树计算过程**，目标不是直接更新 DOM，而是**计算出下一次 UI 应该长什么样，并生成变更描述**。真正的 DOM 操作发生在后续的 commit 阶段。

理解 render 阶段，需要从 Fiber 架构、调度机制以及 diff 过程三个层面来看。

---

## 一、整体定位：render 阶段在 React 更新流程中的位置

一次 React 更新大致分为两个阶段：

```text
   ↓
Render Phase（可中断，纯计算）
   ↓
Commit Phase（不可中断，真实 DOM 更新）
```

> 根据新的 state / props，计算新的 Fiber 树，并找出需要变更的节点。

它不会：

* 操作 DOM
* 执行 layout
* 触发副作用（effect 在 commit 执行）

---

## 二、更新触发后的入口

当发生以下行为时：

* `setState`
* `dispatch`
* 父组件重新 render
* context 更新

React 会：

1. 创建一个 Update 对象
2. 放入对应 Fiber 的 updateQueue
3. 调度调和流程（scheduleUpdateOnFiber）

随后进入 render 工作循环。

---

## 三、Fiber：render 阶段的核心数据结构

React 不再直接递归组件树，而是构建 **Fiber Tree**。

每个 Fiber 可以理解为：

```text
```

* 组件类型
* props / state
* hooks 状态
* 子节点、兄弟节点、父节点
* effect 标记（Placement / Update / Deletion）

React 同时维护两棵树：

```text
workInProgress tree（正在计算的新树）
```

---

## 四、render 阶段的执行循环（核心）

render 阶段由一个循环驱动：

```text
```

### 每个 Fiber 的执行流程：

```text
```

### 1. beginWork（向下阶段）

职责：

* 执行函数组件
* 读取 hooks
* 计算 JSX
* 生成子 Fiber

例如函数组件：

```js
  const [count] = useState(0);
  return <Child count={count} />;
}
```

* 调用组件函数
* 执行 hooks
* 得到 React Element
* 与旧 children 做 diff

---

### 2. Diff / Reconciliation（子节点协调）

React 会比较：

```text
VS
新 React elements
```

* 复用节点（Update）
* 新增节点（Placement）
* 删除节点（Deletion）

这里采用：

> 同层比较 + key 优化

避免跨层复杂度爆炸。

---

### 3. completeWork（向上阶段）

当子节点处理完成后，进入回溯阶段：

* 创建 DOM（但不挂载）
* 收集 effect 标记
* 构建 effect list

此阶段逐层向父节点返回。

---

## 五、为什么 render 阶段可以被中断

Fiber 的核心优势在于：

```text
```

* 判断当前是否需要让出主线程
* 如果时间片耗尽 → 暂停 render
* 浏览器空闲后继续

这就是 Concurrent Rendering 的基础。

因此 render 阶段具有：

* 可中断
* 可恢复
* 可丢弃（高优先级更新可打断低优先级）

---

## 六、render 阶段不会执行的事情

这是面试高频误区：

render 阶段 **不会执行副作用**：

* `useEffect`
* DOM 操作
* ref 回调
* layout 读取

原因是 render 可能被重复执行或丢弃。

React 必须保证 render 是：

```text
```

## 七、render 阶段的产物

render 完成后得到：

1. 一棵新的 workInProgress Fiber Tree
2. effect list（需要执行的变更）

随后进入 commit 阶段：

```text
mutation（DOM 更新）
layout effects
passive effects
```

## 八、一次完整 render 的时间线（总结视角）

```text
  ↓
创建 update
  ↓
调度 scheduler
  ↓
构建 workInProgress Fiber
  ↓
beginWork（执行组件）
  ↓
diff children
  ↓
completeWork（收集 effect）
  ↓
生成 effect list
  ↓
进入 commit 阶段
```
