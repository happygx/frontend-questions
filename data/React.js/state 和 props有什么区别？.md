---
level: 1
---

# state 和 props有什么区别？

## 题目要点

### 1. **定义和用途**

#### 1.1 `state` 的定义和用途

- **定义**：`state` 是组件内部的状态对象，由组件本身管理和维护。它存储组件当前的数据和动态信息，随着用户交互或其他事件发生变化。
- **用途**：用于控制组件的可变数据，决定组件的外观和行为。`state` 的变化会触发组件的重新渲染，从而更新 UI。

#### 1.2 `props` 的定义和用途

- **定义**：`props`（属性）是组件的输入参数，由父组件传递给子组件。它是只读的，组件无法修改其 `props`。
- **用途**：用于传递数据和回调函数，使得组件之间可以通信和共享信息。`props` 是组件之间传递数据的唯一途径。

### 2. **可变性**

#### 2.1 `state` 的可变性

- **可变性**：`state` 是可变的，组件可以通过调用 `setState` 或使用 React 的 `useState` 钩子来更新 `state` 的值。这会触发组件的重新渲染。
- **例子**：

     ```javascript
     const [count, setCount] = useState(0);

     const increment = () => {
       setCount(count + 1);
     };
     ```

#### 2.2 `props` 的可变性

- **不可变性**：`props` 是不可变的，组件不能直接修改 `props` 的值。如果父组件传递的 `props` 发生变化，子组件会重新渲染，但子组件不能主动修改 `props`。
- **例子**：

     ```javascript
     function ChildComponent({ title }) {
       return <h1>{title}</h1>;
     }

     function ParentComponent() {
       return <ChildComponent title="Hello World!" />;
     }
     ```

### 3. **生命周期和作用域**

#### 3.1 `state` 的生命周期和作用域

- **生命周期**：`state` 的生命周期与组件的生命周期一致。它在组件挂载时被初始化，在组件卸载时被销毁。
- **作用域**：`state` 仅限于组件内部使用，不会被其他组件直接访问或修改。

#### 3.2 `props` 的生命周期和作用域

- **生命周期**：`props` 的生命周期取决于父组件的传递时机。当父组件重新渲染时，子组件可能会收到新的 `props`。
- **作用域**：`props` 可以在组件之间传递，是组件之间通信的机制，但组件不能改变接收到的 `props`。

### 4. **使用场景**

#### 4.1 何时使用 `state`

- **场景**：当需要在组件内存储和管理动态数据时使用 `state`，如用户输入、表单数据、按钮点击后的状态等。

#### 4.2 何时使用 `props`

- **场景**：当需要从父组件向子组件传递数据或函数时使用 `props`，如配置组件、传递回调函数、共享状态等。

### 5. **示例代码**

```javascript
  const [count, setCount] = useState(0); // 使用 state 管理组件内部状态

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

function ParentComponent() {
  return (
    <div>
      <ChildComponent title="This is a prop" />
    </div>
  );
}

function ChildComponent({ title }) {
  return <h1>{title}</h1>; // 使用 props 传递数据
}
```

## 参考答案

## 一、state

一个组件的显示形态可以由数据状态和外部参数所决定，而数据状态就是`state`，一般在 `constructor` 中初始化 

当需要修改里面的值的状态需要通过调用`setState`来改变，从而达到更新组件内部数据的作用，并且重新调用组件`render`方法，如下面的例子：

```jsx
    constructor() {
        super();
        this.state = {
            count: 0,
        };
    }

    updateCount() {
        this.setState((prevState, props) => {
            return { count: prevState.count + 1 }
        });
    }

    render() {
        return (<button
                    onClick={() => this.updateCount()}
                    >
                Clicked {this.state.count} times
            </button>);
    }
}
```

```js
  name:'JS每日一题'
},()=>console.log('setState finished'))
```

`React`的核心思想就是组件化思想，页面会被切分成一些独立的、可复用的组件

组件从概念上看就是一个函数，可以接受一个参数作为输入值，这个参数就是`props`，所以可以把`props`理解为从外部传入组件内部的数据

`react`具有单向数据流的特性，所以他的主要作用是从父组件向子组件中传递数据

`props`除了可以传字符串，数字，还可以传递对象，数组甚至是回调函数，如下：

```jsx
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}

const element = <Welcome name="Sara" onNameChanged={this.handleName} />;
```

在子组件中，`props`在内部不可变的，如果想要改变它看，只能通过外部组件传入新的`props`来重新渲染子组件，否则子组件的`props`和展示形式不会改变



## 三、区别

相同点：

- 两者都是 JavaScript 对象
- 两者都是用于保存信息
- props 和 state 都能触发渲染更新

区别：

- props 是外部传递给组件的，而 state 是在组件内被组件自己管理的，一般在 constructor 中初始化
- props 在组件内部是不可修改的，但 state 在组件内部可以进行修改
- state 是多变的、可以修改
