---
level: 3
---

# React.PureComponent 和 React.Component 有什么区别？


## 题目要点

- **`React.Component`**：基类组件，提供默认的渲染逻辑，适用于需要完全控制渲染行为的组件。
- **`React.PureComponent`**：在 `props` 或 `state` 没有发生变化时阻止组件重新渲染，使用浅比较进行优化，适用于性能优化需求较高的场景。

`React.PureComponent` 可以提高性能，但也需要注意它的浅比较特性，对于复杂数据结构或需要深层比较的情况，可能需要使用 `React.Component` 并手动实现 `shouldComponentUpdate`。

## 参考答案

PureComponent 和 Component的区别是：Component需要手动实现 shouldComponentUpdate，而 PureComponent 通过浅对比默认实现了 shouldComponentUpdate 方法。

浅比较(shallowEqual)，即react源码中的一个函数，然后根据下面的方法进行是不是PureComponent的判断，帮我们做了本来应该我们在 shouldComponentUpdate 中做的事情

```js
  shouldUpdate = !shallowEqual(prevProps, nextProps) || ! shallowEqual(inst.state, nextState);
}
```

总结: PureComponent 不仅会影响本身，而且会影响子组件，所以 PureComponent 最佳情况是展示组件
