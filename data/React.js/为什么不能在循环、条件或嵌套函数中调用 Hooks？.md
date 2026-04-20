---
level: 3
---

# 为什么不能在循环、条件或嵌套函数中调用 Hooks？

## 题目要点

React 通过“调用顺序”而不是标识符来管理 Hook 状态；循环、条件或嵌套函数会导致 Hook 调用次数或顺序发生变化，从而破坏 React 内部 Hook 链表的映射关系，引发状态错位与不可预测行为。因此 Hooks 必须在组件顶层以固定顺序执行，这是 Hooks 能够高性能、可恢复并支持并发渲染的前提。

## 参考答案

React 对 Hooks 的实现，本质上依赖 **调用顺序（call order）** 来完成状态与组件实例之间的绑定，而不是依赖变量名或函数标识。

在函数组件执行时，React 会把组件当作一个普通函数重新执行一遍。每一次 render，React 内部都会维护一个指针（可以理解为当前 Hook 游标），按照代码执行顺序依次读取或创建 Hook 状态。例如第一次遇到 `useState`，就取 Hook 链表中的第一个节点；第二次遇到 `useEffect`，就取第二个节点，以此类推。

换句话说，React 并不知道“这是哪个 useState”，它只知道“这是第几个 Hook”。

如果 Hook 出现在条件、循环或嵌套函数中，就会破坏这种稳定的调用顺序。

以条件语句为例：

```js
  useEffect(() => {});
}
```

* 状态错位（state mismatch）
* effect 与错误的 state 绑定
* 出现难以预测的 UI 行为

循环中调用 Hooks 的问题本质相同。循环次数一旦变化，Hook 调用数量就变化，React 内部的 Hook 链表无法正确对齐。

嵌套函数的问题则在于：Hooks 必须发生在组件 render 的同步执行路径中。嵌套函数可能不会在每次 render 被调用，或者调用次数不同，这同样会导致 Hook 注册顺序不稳定。

React 团队选择这种设计，并不是限制能力，而是为了获得三个关键收益：

第一，避免为每个 Hook 建立复杂的标识系统，使 Hook 实现保持极低运行时成本。
第二，让函数组件具备可预测的状态恢复能力，使 Fiber 在中断与恢复渲染时仍能正确关联状态。
第三，使 Hook 调用在并发渲染（Concurrent Rendering）下仍然可重放（replayable）。

因此官方提出了 **Rules of Hooks**：

* Hook 只能在 React 函数组件或自定义 Hook 的顶层调用
* Hook 调用顺序在每一次 render 中必须完全一致

ESLint 的 `react-hooks/rules-of-hooks` 本质上就是在静态分析阶段保证这一点。

需要注意的是，条件逻辑并不是不能写，而是应该放在 Hook 内部：

```js
  if (!visible) return;
  // side effect
}, [visible]);
```
