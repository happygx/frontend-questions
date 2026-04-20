---
level: 3
---

# Redux中的connect有什么作用？

## 参考答案

connect负责连接React和Redux

## 获取state
connect 通过 context获取 Provider 中的 store，通过 store.getState() 获取整个store tree 上所有state

## 包装原组件

将state和action通过props的方式传入到原组件内部 `wrapWithConnect` 返回—个 `ReactComponent` 对象 Connect，Connect重新 render 外部传入的原组件 `WrappedComponent` ，并把 connect 中传入的 `mapStateToProps`，`mapDispatchToProps`与组件上原有的 props 合并后，通过属性的方式传给 `WrappedComponent`

## 监听store tree变化

connect缓存了`store tree`中state的状态，通过当前state状态 和变更前 state 状态进行比较，从而确定是否调用 `this.setState()`方法触发 Connect 及其子组件的重新渲染
