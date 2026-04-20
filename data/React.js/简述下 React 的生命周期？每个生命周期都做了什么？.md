---
level: 2
---

# 简述下 React 的生命周期？每个生命周期都做了什么？

## 题目要点

React 的生命周期方法是类组件中的特性，用于在组件的不同阶段执行特定的代码。

在 React 16.3 之前，生命周期方法主要分为三个阶段：挂载（Mounting）、更新（Updating）和卸载（Unmounting）。

React 16.3 引入了新的生命周期方法，并且在 React 16.8 中引入了 Hooks，使得函数组件也能处理类似的逻辑。

以下是类组件生命周期方法的详细描述：

### 1. **挂载（Mounting）**

组件被创建并插入到 DOM 中的过程。

- **`constructor(props)`**
  - **作用**：构造函数，用于初始化组件状态和绑定事件处理函数。
  - **调用时机**：组件创建时调用，第一次渲染之前。

- **`static getDerivedStateFromProps(nextProps, prevState)`**
  - **作用**：在每次渲染之前调用，允许组件根据 props 更新状态。
  - **调用时机**：挂载和更新时都会调用。

- **`render()`**
  - **作用**：渲染组件的 UI。必须实现的核心方法。
  - **调用时机**：组件的第一次渲染和每次更新时调用。

- **`componentDidMount()`**
  - **作用**：组件挂载完成后调用。通常用于进行数据获取、订阅或设置 DOM 操作。
  - **调用时机**：组件第一次渲染完成后调用。

### 2. **更新（Updating）**

组件由于 props 或 state 的变化而重新渲染的过程。

- **`static getDerivedStateFromProps(nextProps, prevState)`**
  - **作用**：如前所述，也会在更新时调用，以便根据新的 props 更新状态。

- **`shouldComponentUpdate(nextProps, nextState)`**
  - **作用**：用于控制组件是否应该更新。返回 `false` 可以阻止组件更新。
  - **调用时机**：在组件的 props 或 state 变化时调用，决定是否重新渲染组件。

- **`render()`**
  - **作用**：渲染组件的 UI，如前所述。

- **`getSnapshotBeforeUpdate(prevProps, prevState)`**
  - **作用**：在实际 DOM 更新之前调用，可以获取 DOM 的状态，以便在 `componentDidUpdate` 中使用。
  - **调用时机**：组件更新时，在 `render` 之后，实际 DOM 更新之前。

- **`componentDidUpdate(prevProps, prevState, snapshot)`**
  - **作用**：组件更新完成后调用。可以用于处理更新后的 DOM 或发送网络请求等。
  - **调用时机**：组件更新完成后调用。

### 3. **卸载（Unmounting）**

组件从 DOM 中移除的过程。

- **`componentWillUnmount()`**
  - **作用**：组件卸载前调用。用于清理资源，如取消订阅、清除定时器等。
  - **调用时机**：组件被从 DOM 中移除之前调用。

### 4. **错误处理（Error Handling）**

处理组件树中 JavaScript 错误的生命周期方法。

- **`componentDidCatch(error, info)`**
  - **作用**：捕获子组件树中的错误，记录错误信息或显示备用 UI。
  - **调用时机**：组件树中发生错误时调用。

### 5. **总结**

- **挂载**：`constructor`、`getDerivedStateFromProps`、`render`、`componentDidMount`
- **更新**：`getDerivedStateFromProps`、`shouldComponentUpdate`、`render`、`getSnapshotBeforeUpdate`、`componentDidUpdate`
- **卸载**：`componentWillUnmount`
- **错误处理**：`componentDidCatch`

### 6. **函数组件中的生命周期**

在函数组件中，使用 Hooks 实现类似的功能：

- **`useState`**：管理组件状态。
- **`useEffect`**：处理副作用，可以模拟 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount`。
- **`useMemo`** 和 **`useCallback`**：用于性能优化，类似于 `shouldComponentUpdate`。
- **`useRef`**：管理可变的引用，类似于 `componentDidMount` 和 `componentDidUpdate` 中的 DOM 操作。

使用这些 Hooks，可以在函数组件中实现和类组件类似的生命周期管理逻辑。

## 参考答案

![生命周期示意图](https://static.ecool.fun//article/0cdd2ef9-dfc0-49b1-b5ff-e1bfa069c438.png)

## 挂载

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

* constructor()
* static getDerivedStateFromProps()
* render()
* componentDidMount()

## 更新

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

* static getDerivedStateFromProps()
* shouldComponentUpdate()
* render()
* getSnapshotBeforeUpdate()
* componentDidUpdate()

## 卸载

当组件从 DOM 中移除时会调用如下方法：

* componentWillUnmount()

## 错误处理

渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

* static getDerivedStateFromError()
* componentDidCatch()


## 具体介绍

### render()

render() 方法是 class 组件中唯一必须实现的方法。

当 render 被调用时，它会检查 this.props 和 this.state 的变化并返回以下类型之一：

* React 元素。通常通过 JSX 创建。例如，<div /> 会被 React 渲染为 DOM 节点，<MyComponent /> 会被 React 渲染为自定义组件，无论是 <div /> 还是 <MyComponent /> 均为 React 元素。
* 数组或 fragments。 使得 render 方法可以返回多个元素。欲了解更多详细信息，请参阅 fragments 文档。
* Portals。可以渲染子节点到不同的 DOM 子树中。欲了解更多详细信息，请参阅有关 portals 的文档
* 字符串或数值类型。它们在 DOM 中会被渲染为文本节点
* 布尔类型或 null。什么都不渲染。（主要用于支持返回 test && <Child /> 的模式，其中 test 为布尔类型。）

render() 函数应该为纯函数，这意味着在不修改组件 state 的情况下，每次调用时都返回相同的结果，并且它不会直接与浏览器交互。

如需与浏览器进行交互，请在 componentDidMount() 或其他生命周期方法中执行你的操作。保持 render() 为纯函数，可以使组件更容易思考。

### constructor()

如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。

在 React 组件挂载之前，会调用它的构造函数。在为 React.Component 子类实现构造函数时，应在其他语句之前前调用 super(props)。否则，this.props 在构造函数中可能会出现未定义的 bug。

通常，在 React 中，构造函数仅用于以下两种情况：

通过给 this.state 赋值对象来初始化内部 state。

* 为事件处理函数绑定实例
* 在 constructor() 函数中不要调用 setState() 方法。如果你的组件需要使用内部 state，请直接在构造函数中为 this.state 赋值初始 state。

只能在构造函数中直接为 this.state 赋值。如需在其他方法中赋值，你应使用 this.setState() 替代。

要避免在构造函数中引入任何副作用或订阅。如遇到此场景，请将对应的操作放置在 componentDidMount 中。

### componentDidMount()

componentDidMount() 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。

这个方法是比较适合添加订阅的地方。如果添加了订阅，请不要忘记在 componentWillUnmount() 里取消订阅

你可以在 componentDidMount() 里直接调用 setState()。它将触发额外渲染，但此渲染会发生在浏览器更新屏幕之前。如此保证了即使在 render() 两次调用的情况下，用户也不会看到中间状态。请谨慎使用该模式，因为它会导致性能问题。通常，你应该在 constructor() 中初始化 state。如果你的渲染依赖于 DOM 节点的大小或位置，比如实现 modals 和 tooltips 等情况下，你可以使用此方式处理。

### componentDidUpdate()

componentDidUpdate() 会在更新后会被立即调用。首次渲染不会执行此方法。

当组件更新后，可以在此处对 DOM 进行操作。如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求。（例如，当 props 未发生变化时，则不会执行网络请求）。

```react.js
componentDidUpdate(prevProps) {
  // 典型用法（不要忘记比较 props）：
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

如果组件实现了 getSnapshotBeforeUpdate() 生命周期（不常用），则它的返回值将作为 componentDidUpdate() 的第三个参数 “snapshot” 参数传递。否则此参数将为 undefined。

### componentWillUnmount()

componentWillUnmount() 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等。

componentWillUnmount() 中不应调用 setState()，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。

### shouldComponentUpdate()

根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染。大部分情况下，你应该遵循默认行为。

当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。返回值默认为 true。首次渲染或使用 forceUpdate() 时不会调用该方法。

此方法仅作为性能优化的方式而存在。不要企图依靠此方法来“阻止”渲染，因为这可能会产生 bug。你应该考虑使用内置的 PureComponent 组件，而不是手动编写 shouldComponentUpdate()。PureComponent 会对 props 和 state 进行浅层比较，并减少了跳过必要更新的可能性。

如果你一定要手动编写此函数，可以将 this.props 与 nextProps 以及 this.state 与nextState 进行比较，并返回 false 以告知 React 可以跳过更新。请注意，返回 false 并不会阻止子组件在 state 更改时重新渲染。

我们不建议在 shouldComponentUpdate() 中进行深层比较或使用 JSON.stringify()。这样非常影响效率，且会损害性能。

目前，如果 shouldComponentUpdate() 返回 false，则不会调用 UNSAFE_componentWillUpdate()，render() 和 componentDidUpdate()。后续版本，React 可能会将 shouldComponentUpdate 视为提示而不是严格的指令，并且，当返回 false 时，仍可能导致组件重新渲染。

### static getDerivedStateFromProps()

getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。

此方法适用于罕见的用例，即 state 的值在任何时候都取决于 props。例如，实现 <Transition> 组件可能很方便，该组件会比较当前组件与下一组件，以决定针对哪些组件进行转场动画。

派生状态会导致代码冗余，并使组件难以维护。 确保你已熟悉这些简单的替代方案：

* 如果你需要执行副作用（例如，数据提取或动画）以响应 props 中的更改，请改用 componentDidUpdate。
* 如果只想在 prop 更改时重新计算某些数据，请使用 memoization helper 代替。
* 如果你想在 prop 更改时“重置”某些 state，请考虑使组件完全受控或使用 key 使组件完全不受控代替。

此方法无权访问组件实例。如果你需要，可以通过提取组件 props 的纯函数及 class 之外的状态，在getDerivedStateFromProps()和其他 class 方法之间重用代码。

请注意，不管原因是什么，都会在每次渲染前触发此方法。这与 UNSAFE_componentWillReceiveProps 形成对比，后者仅在父组件重新渲染时触发，而不是在内部调用 setState 时。

### getSnapshotBeforeUpdate()

getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期方法的任何返回值将作为参数传递给 componentDidUpdate()。

此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等。

应返回 snapshot 的值（或 null）。

### Error boundaries

Error boundaries 是 React 组件，它会在其子组件树中的任何位置捕获 JavaScript 错误，并记录这些错误，展示降级 UI 而不是崩溃的组件树。Error boundaries 组件会捕获在渲染期间，在生命周期方法以及其整个树的构造函数中发生的错误。

如果 class 组件定义了生命周期方法 static getDerivedStateFromError() 或 componentDidCatch() 中的任何一个（或两者），它就成为了 Error boundaries。通过生命周期更新 state 可让组件捕获树中未处理的 JavaScript 错误并展示降级 UI。

仅使用 Error boundaries 组件来从意外异常中恢复的情况；不要将它们用于流程控制。

### static getDerivedStateFromError()

此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state。

### componentDidCatch()

此生命周期在后代组件抛出错误后被调用。 它接收两个参数：

* error —— 抛出的错误。
* info —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息。

componentDidCatch() 会在“提交”阶段被调用，因此允许执行副作用。 它应该用于记录错误之类的情况。

React 的开发和生产构建版本在 componentDidCatch() 的方式上有轻微差别。

在开发模式下，错误会冒泡至 window，这意味着任何 window.onerror 或 window.addEventListener('error', callback) 会中断这些已经被 componentDidCatch() 捕获的错误。

相反，在生产模式下，错误不会冒泡，这意味着任何根错误处理器只会接受那些没有显式地被 componentDidCatch() 捕获的错误。
