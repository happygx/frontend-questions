---
level: 2
---

# 说说你对Redux的理解？其工作原理？

## 题目要点

### 1. **对 Redux 的理解**

#### 1.1 Redux 的定义

- **定义**：Redux 是一个用于 JavaScript 应用的状态管理库，最常用于 React 应用。它通过一个全局的状态树（state tree）来管理应用的状态，使得状态的管理更加可预测和可控。
- **设计思想**：Redux 的设计基于 Flux 架构模式，其核心思想是单向数据流，通过集中式的状态管理，使应用状态变化更容易追踪和调试。

#### 1.2 Redux 的核心概念

- **Store**：Redux 应用的唯一数据源，存储全局的状态。它通过 `createStore` 方法创建，并通过 `getState` 方法获取当前状态。
- **Action**：描述应用中发生的事件或操作的普通 JavaScript 对象，通常包含一个 `type` 属性和一些可选的 `payload` 数据。Action 是状态改变的唯一途径。
- **Reducer**：是一个纯函数，接收当前的 `state` 和 `action`，根据 `action` 的类型返回新的状态。Reducer 不能修改传入的 `state`，而是返回一个新的 `state` 对象。
- **Dispatch**：用于发送 `action` 给 Redux store，以触发状态的变化。通过调用 `store.dispatch(action)` 来进行状态更新。
- **Middleware**：在 `dispatch` 和 `reducer` 之间的可选扩展，用于处理异步操作、日志记录、错误处理等。

#### 1.3 Redux 的优点

- **可预测性**：通过严格规定状态如何变化，使得状态变化更加可预测和可追踪。
- **调试工具**：Redux 的时间旅行调试工具（Redux DevTools）使得开发者可以轻松地查看状态的演变过程。
- **可扩展性**：Redux 通过中间件扩展功能，适用于各种复杂场景，如异步操作和日志管理。

### 2. **Redux 的工作原理**

#### 2.1 单一数据源

- **核心理念**：Redux 通过一个唯一的全局 `store` 来存储应用的状态，这个 `store` 是整个应用的唯一数据源。应用中的所有组件都依赖于这个 `store` 来获取和更新状态。

#### 2.2 Action 发起与 Dispatch

- **Action 的作用**：用户在应用中触发某个操作时，会产生一个 `action`，它是一个描述状态变化的普通对象。
- **Dispatch 的作用**：`dispatch` 方法将 `action` 发送给 Redux store，告诉 store 状态即将发生变化。

#### 2.3 Reducer 处理 Action

- **Reducer 的作用**：`store` 收到 `action` 后，会调用对应的 `reducer`。`reducer` 是一个纯函数，它根据当前的 `state` 和 `action` 返回一个新的 `state` 对象。
- **状态不可变性**：Reducer 不能直接修改当前状态，而是返回一个全新的状态对象，从而保证状态的不可变性和数据流的纯净性。

#### 2.4 Store 更新与订阅

- **状态更新**：Reducer 返回的新状态会替换 store 中的当前状态。然后 Redux 会通知所有订阅了 store 的视图层（如 React 组件）进行重新渲染。
- **视图层的订阅**：视图层通过订阅 store 来监听状态变化，当状态发生变化时，视图会根据新的状态进行更新。

### 3. **Redux 的数据流**

Redux 的数据流是单向的，遵循以下过程：

1. **组件发起 action**：用户在界面上的操作（如点击按钮）会触发一个 action。
2. **dispatch action**：这个 action 会通过 `dispatch` 方法发送给 store。
3. **reducer 处理 action**：store 调用 reducer，传入当前的 state 和 action，reducer 根据 action 的类型返回新的 state。
4. **store 更新 state**：store 接收新的 state 并存储。
5. **订阅者更新视图**：订阅了 store 的组件会接收到新的 state，并重新渲染界面。

### 4. **Redux 的典型代码示例**

```javascript
export const increment = () => ({
  type: 'INCREMENT',
});

export const decrement = () => ({
  type: 'DECREMENT',
});

// reducer.js
const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

export default counterReducer;

// store.js
import { createStore } from 'redux';
import counterReducer from './reducer';

const store = createStore(counterReducer);

export default store;
```

## 参考答案

## 一、是什么

`React`是用于构建用户界面的，帮助我们解决渲染`DOM`的过程

而在整个应用中会存在很多个组件，每个组件的`state`是由自身进行管理，包括组件定义自身的`state`、组件之间的通信通过`props`传递、使用`Context`实现数据共享

如果让每个组件都存储自身相关的状态，理论上来讲不会影响应用的运行，但在开发及后续维护阶段，我们将花费大量精力去查询状态的变化过程

这种情况下，如果将所有的状态进行集中管理，当需要更新状态的时候，仅需要对这个管理集中处理，而不用去关心状态是如何分发到每一个组件内部的

`redux`就是一个实现上述集中管理的容器，遵循三大基本原则：

- 单一数据源
- state 是只读的
- 使用纯函数来执行修改

注意的是，`redux`并不是只应用在`react`中，还与其他界面库一起使用，如`Vue`


## 二、工作原理

`redux `要求我们把数据都放在 `store `公共存储空间

一个组件改变了 `store` 里的数据内容，其他组件就能感知到 `store `的变化，再来取数据，从而间接的实现了这些数据传递的功能

工作流程图如下所示：

 ![](https://static.ecool.fun//article/b78d9d31-20aa-4692-8d09-9bb2960bfd1d.png)

根据流程图，可以想象，`React Components` 是借书的用户， `Action Creactor` 是借书时说的话(借什么书)， `Store` 是图书馆管理员，`Reducer` 是记录本(借什么书，还什么书，在哪儿，需要查一下)， `state` 是书籍信息

整个流程就是借书的用户需要先存在，然后需要借书，需要一句话来描述借什么书，图书馆管理员听到后需要查一下记录本，了解图书的位置，最后图书馆管理员会把这本书给到这个借书人

转换为代码是，`React Components` 需要获取一些数据, 然后它就告知 `Store` 需要获取数据，这就是就是 `Action Creactor` , `Store` 接收到之后去 `Reducer` 查一下， `Reducer` 会告诉 `Store` 应该给这个组件什么数据



## 三、如何使用

创建一个`store`的公共数据区域

```js
const store = createStore() // 创建数据的公共存储区域（管理员）
```

```js
const initialState = {
  counter: 0
}

const reducer = (state = initialState, action) => {
}
```

```js
```

```js
```

```js
  type: "INCREMENT"
})

store.dispath({
  type: "DECREMENT"
})

store.dispatch({
  type: "ADD_NUMBER",
  number: 5
})
```

```js
  switch (action.type) {
    case "INCREMENT":
      return {...state, counter: state.counter + 1};
    case "DECREMENT":
      return {...state, counter: state.counter - 1};
    case "ADD_NUMBER":
      return {...state, counter: state.counter + action.number}
    default: 
      return state;
  }
}
```

这样派发`action`之后，既可以通过`store.subscribe`监听`store`的变化，如下：

```js
  console.log(store.getState());
})
```

完整代码如下：

```js

const initialState = {
  counter: 0
}

// 创建reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {...state, counter: state.counter + 1};
    case "DECREMENT":
      return {...state, counter: state.counter - 1};
    case "ADD_NUMBER":
      return {...state, counter: state.counter + action.number}
    default: 
      return state;
  }
}

// 根据reducer创建store
const store = redux.createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
})

// 修改store中的state
store.dispatch({
  type: "INCREMENT"
})
// console.log(store.getState());

store.dispatch({
  type: "DECREMENT"
})
// console.log(store.getState());

store.dispatch({
  type: "ADD_NUMBER",
  number: 5
})
// console.log(store.getState());
```

- createStore可以帮助创建 store
- store.dispatch 帮助派发 action , action 会传递给 store
- store.getState 这个方法可以帮助获取 store 里边所有的数据内容
- store.subscrible 方法订阅 store 的改变，只要 store 发生改变， store.subscrible 这个函数接收的这个回调函数就会被执行
