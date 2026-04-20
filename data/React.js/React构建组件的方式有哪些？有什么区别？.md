---
level: 1
---

# React构建组件的方式有哪些？有什么区别？

## 题目要点

### 1. **组件的基本类型**

#### 1.1 函数组件（Function Components）

- **定义**：函数组件是最简单的组件类型，通过一个函数定义。函数组件可以接受 `props` 作为参数，并返回 JSX 以描述 UI。
- **特点**：
  - **无状态**：函数组件通常用于定义无状态组件，或者使用 Hooks 添加状态和副作用。
  - **简洁**：代码较为简洁，不需要处理 `this` 关键字。
- **示例**：

     ```javascript
     function Greeting({ name }) {
       return <h1>Hello, {name}!</h1>;
     }
     ```

#### 1.2 类组件（Class Components）

- **定义**：类组件是通过 ES6 类来定义的组件。它需要继承自 `React.Component` 并实现 `render` 方法，返回 JSX 以描述 UI。
- **特点**：
  - **有状态**：类组件可以使用 `state` 和生命周期方法来管理状态和处理副作用。
  - **完整功能**：类组件可以实现复杂的逻辑，但代码相对较冗长。
- **示例**：

     ```javascript
     class Greeting extends React.Component {
       render() {
         const { name } = this.props;
         return <h1>Hello, {name}!</h1>;
       }
     }
     ```

### 2. **React Hooks（钩子）**

#### 2.1 使用 Hooks 的函数组件

- **定义**：Hooks 是 React 16.8 引入的功能，它允许在函数组件中使用状态和其他 React 特性。
- **特点**：
  - **状态管理**：使用 `useState` 钩子来管理组件的状态。
  - **副作用处理**：使用 `useEffect` 钩子处理副作用（如数据获取、订阅等）。
  - **更简洁**：函数组件结合 Hooks 提供了更简洁的语法和更强大的功能。
- **示例**：

     ```javascript
     import React, { useState, useEffect } from 'react';

     function Greeting({ name }) {
       const [message, setMessage] = useState('');

       useEffect(() => {
         setMessage(`Hello, ${name}!`);
       }, [name]);

       return <h1>{message}</h1>;
     }
     ```

### 3. **区别与选择**

#### 3.1 函数组件与类组件的区别

- **代码简洁度**：函数组件更简洁，适合定义简单的 UI 组件。类组件较为冗长，适合需要复杂逻辑的场景。
- **性能**：函数组件在 React 16.8 之后性能优化有所改进，与类组件的性能差异很小。函数组件配合 Hooks 能处理大部分业务场景。
- **功能**：类组件可以使用生命周期方法，但函数组件通过 Hooks 也能实现类似的功能，如 `useEffect` 代替 `componentDidMount` 和 `componentDidUpdate`。

#### 3.2 React Hooks 的优势

- **复用逻辑**：Hooks 提供了更好的逻辑复用机制（如自定义 Hooks），避免了类组件中 mixins 的问题。
- **简洁性**：函数组件配合 Hooks 可以更简洁地编写组件，避免了类组件中的 `this` 绑定问题。
- **优化**：React Hooks API 使得处理副作用和状态变得更清晰和可控。

#### 3.3 选择合适的方式

- **简单组件**：对于简单的无状态组件，推荐使用函数组件。
- **复杂逻辑**：对于需要处理复杂逻辑、状态和生命周期的组件，可以使用类组件或者函数组件配合 Hooks。
- **团队和项目惯例**：根据团队的技术栈和项目要求来选择合适的组件构建方式。如果项目已经使用 Hooks，推荐优先使用函数组件。

通过这些要点，可以清楚地展示不同类型的组件构建方式及其区别，帮助理解在不同场景下选择合适的组件构建方式。

## 参考答案

## 一、是什么

组件就是把图形、非图形的各种逻辑均抽象为一个统一的概念（组件）来实现开发的模式

在`React`中，一个类、一个函数都可以视为一个组件

组件所存在的优势：

- 降低整个系统的耦合度，在保持接口不变的情况下，我们可以替换不同的组件快速完成需求，例如输入框，可以替换为日历、时间、范围等组件作具体的实现
- 调试方便，由于整个系统是通过组件组合起来的，在出现问题的时候，可以用排除法直接移除组件，或者根据报错的组件快速定位问题，之所以能够快速定位，是因为每个组件之间低耦合，职责单一，所以逻辑会比分析整个系统要简单
- 提高可维护性，由于每个组件的职责单一，并且组件在系统中是被复用的，所以对代码进行优化可获得系统的整体升级



## 二、如何构建

在`React`目前来讲，组件的创建主要分成了三种方式：

- 函数式创建
- 通过 React.createClass 方法创建
- 继承 React.Component 创建



### 函数式创建

在`React Hooks`出来之前，函数式组件可以视为无状态组件，只负责根据传入的`props`来展示视图，不涉及对`state`状态的操作

大多数组件可以写为无状态组件，通过简单组合构建其他组件

在`React`中，通过函数简单创建组件的示例如下：

```jsx
  return <div>Hello {props.name}</div>
}
```

`React.createClass`是react刚开始推荐的创建组件的方式，目前这种创建方式已经不怎么用了

像上述通过函数式创建的组件的方式，最终会通过`babel`转化成`React.createClass`这种形式，转化成如下：

```jsx
  return React.createElement(
    "div",
    null,
    "Hello ",
    props.name
  );
}
```



### 继承 React.Component 创建

同样在`react hooks`出来之前，有状态的组件只能通过继承`React.Component`这种形式进行创建

有状态的组件也就是组件内部存在维护的数据，在类创建的方式中通过`this.state`进行访问

当调用`this.setState`修改组件的状态时，组价会再次会调用`render()`方法进行重新渲染

通过继承`React.Component`创建一个时钟示例如下：

```jsx
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        Seconds: {this.state.seconds}
      </div>
    );
  }
}
```

由于`React.createClass `创建的方式过于冗杂，并不建议使用

而像函数式创建和类组件创建的区别主要在于需要创建的组件是否需要为有状态组件：

- 对于一些无状态的组件创建，建议使用函数式创建的方式

- 由于`react hooks`的出现，函数式组件创建的组件通过使用`hooks`方法也能使之成为有状态组件，再加上目前推崇函数式编程，所以这里建议都使用函数式的方式来创建组件

在考虑组件的选择原则上，能用无状态组件则用无状态组件
