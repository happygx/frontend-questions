---
level: 1.5
---

# Vuex有几种属性，它们存在的意义分别是什么？

## 题目要点

Vuex 是一个 Vue.js 的状态管理工具，由以下五个核心概念组成：

1. **State**：存储应用程序所有状态的单一对象。
2. **Getter**：派生状态的计算属性，类似于 Vue 的 computed 属性。
3. **Mutation**：同步更改状态的唯一方法，通过提交 mutation 实现。
4. **Action**：提交 mutation 的异步操作，可以包含任意异步操作。
5. **Module**：将状态分割成模块，用于组织和管理复杂的应用状态。

## 参考答案

有五种，分别是 State、 Getter、Mutation 、Action、 Module。

## State

Vuex 使用单一状态树——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 (SSOT)”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

State属性是Vuex的单一状态树

## Getter

有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数

Getter类似于Vue的 computed 对象。是根据业务逻辑来处理State，使得生成业务所需的属性。

## Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。

Mutation是唯一用来更改Vuex中状态的方法。

## Action

Action 类似于 mutation，不同在于：

* Action 提交的是 mutation，而不是直接变更状态。
* Action 可以包含任意异步操作。

Action是用来解决异步操作而产生的，它提交的是Mutation。

## Module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

Module是将Vuex模块化的对象，目的是更好的维护。
