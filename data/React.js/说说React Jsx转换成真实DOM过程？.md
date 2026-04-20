---
level: 2
---

# 说说React Jsx转换成真实DOM过程？

## 题目要点

### 1. **JSX 概述**

#### 1.1 JSX 定义

- **定义**：JSX 是一种 JavaScript 的语法扩展，看起来像 XML 或 HTML。它使得定义 React 组件的 UI 更加直观和简洁。
- **转换**：JSX 需要通过编译工具（如 Babel）转换为 JavaScript，才能在浏览器中执行。

### 2. **JSX 转换为 JavaScript**

#### 2.1 编译过程

- **Babel**：Babel 是常用的 JavaScript 编译器，它会将 JSX 代码转换为 JavaScript 代码。通常，JSX 被转换为 `React.createElement` 函数调用。
- **示例**：

     ```jsx
     // JSX
     const element = <h1>Hello, world!</h1>;

     // 编译后的 JavaScript
     const element = React.createElement('h1', null, 'Hello, world!');
     ```

### 3. **React 的虚拟 DOM（Virtual DOM）**

#### 3.1 虚拟 DOM 定义

- **定义**：虚拟 DOM 是 React 使用的一个轻量级的 JavaScript 对象，它是实际 DOM 的一种抽象表示。它允许 React 高效地更新和渲染 UI。
- **创建虚拟 DOM**：`React.createElement` 函数返回一个虚拟 DOM 对象，其中包含了组件的结构和内容。

#### 3.2 虚拟 DOM 的作用

- **提高性能**：虚拟 DOM 通过将真实 DOM 的操作最小化，减少了直接操作 DOM 的性能开销。
- **高效更新**：React 通过虚拟 DOM 来计算实际 DOM 的最小变更，并只更新那些发生变化的部分。

### 4. **虚拟 DOM 到真实 DOM 的转换**

#### 4.1 渲染过程

- **创建虚拟 DOM 树**：当 React 组件首次渲染时，`React.createElement` 生成的虚拟 DOM 树会被创建。
- **Diff 算法**：React 使用虚拟 DOM 的 Diff 算法来比较新旧虚拟 DOM 树的差异。它会找到最小的差异并计算出需要更新的部分。
- **更新真实 DOM**：React 将这些差异应用到真实 DOM 中，实现最小化更新。

#### 4.2 渲染过程的详细步骤

   1. **组件渲染**：
      - 当组件的状态或属性发生变化时，React 会重新调用组件的 render 方法，生成新的虚拟 DOM。
   2. **虚拟 DOM 比较**：
      - React 使用 Diff 算法比较新旧虚拟 DOM 树。Diff 算法通过逐层比较虚拟 DOM 节点，找到变化的部分。
   3. **计算差异**：
      - React 计算出新旧虚拟 DOM 树之间的差异，生成一个更新补丁。
   4. **更新真实 DOM**：
      - React 将生成的更新补丁应用到真实 DOM 中，只更新那些发生变化的部分，从而实现高效的 UI 更新。

### 5. **React 组件生命周期中的渲染过程**

#### 5.1 生命周期钩子

- **mounting**：组件初次挂载到 DOM 中时，`componentDidMount` 钩子会被调用。
- **updating**：组件在接收到新的属性或状态时，`componentDidUpdate` 钩子会被调用。
- **unmounting**：组件从 DOM 中卸载时，`componentWillUnmount` 钩子会被调用。

### 6. **总结**

- **JSX 转换**：JSX 通过编译工具（如 Babel）转换为 JavaScript 代码，通常是 `React.createElement` 函数调用。
- **虚拟 DOM**：虚拟 DOM 是 React 的核心特性之一，它通过高效的差异比较和最小化的更新策略提高性能。
- **渲染过程**：React 通过虚拟 DOM 计算和应用差异，确保 UI 更新的高效性和准确性。

## 参考答案

## 一、是什么

`react`通过将组件编写的`JSX`映射到屏幕，以及组件中的状态发生了变化之后 `React`会将这些「变化」更新到屏幕上

在前面文章了解中，`JSX`通过`babel`最终转化成`React.createElement`这种形式，例如：

```jsx
  <img src="avatar.png" className="profile" />
  <Hello />
</div>
```

```jsx
  "div",
  null,
  React.createElement("img", {
    src: "avatar.png",
    className: "profile"
  }),
  React.createElement(Hello, null)
);
```

- 当首字母为小写时，其被认定为原生 `DOM` 标签，`createElement` 的第一个变量被编译为字符串

- 当首字母为大写时，其被认定为自定义组件，createElement 的第一个变量被编译为对象

最终都会通过`RenderDOM.render(...)`方法进行挂载，如下：

```jsx
```

在`react`中，节点大致可以分成四个类别：

- 原生标签节点
- 文本节点
- 函数组件
- 类组件

如下所示：

```jsx
  static defaultProps = {
    color: "pink"
  };
  render() {
    return (
      <div className="border">
        <h3>ClassComponent</h3>
        <p className={this.props.color}>{this.props.name}</p >
      </div>
    );
  }
}

function FunctionComponent(props) {
  return (
    <div className="border">
      FunctionComponent
      <p>{props.name}</p >
    </div>
  );
}

const jsx = (
  <div className="border">
    <p>xx</p >
    < a href=" ">xxx</ a>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="类组件" color="red" />
  </div>
);
```

`React.createElement`其被调用时会传⼊标签类型`type`，标签属性`props`及若干子元素`children`，作用是生成一个虚拟`Dom`对象，如下所示：

```js
    if (config) {
        delete config.__self;
        delete config.__source;
    }
    // ! 源码中做了详细处理，⽐如过滤掉key、ref等
    const props = {
        ...config,
        children: children.map(child =>
   typeof child === "object" ? child : createTextNode(child)
  )
    };
    return {
        type,
        props
    };
}
function createTextNode(text) {
    return {
        type: TEXT,
        props: {
            children: [],
            nodeValue: text
        }
    };
}
export default {
    createElement
};
```

- 如果是原生标签节点， type 是字符串，如div、span
- 如果是文本节点， type就没有，这里是 TEXT
- 如果是函数组件，type 是函数名
- 如果是类组件，type 是类名

虚拟`DOM`会通过`ReactDOM.render`进行渲染成真实`DOM`，使用方法如下：

```jsx
```

如果提供了可选的回调函数`callback`，该回调将在组件被渲染或更新之后被执行

`render`大致实现方法如下：

```js
    console.log("vnode", vnode); // 虚拟DOM对象
    // vnode _> node
    const node = createNode(vnode, container);
    container.appendChild(node);
}

// 创建真实DOM节点
function createNode(vnode, parentNode) {
    let node = null;
    const {type, props} = vnode;
    if (type === TEXT) {
        node = document.createTextNode("");
    } else if (typeof type === "string") {
        node = document.createElement(type);
    } else if (typeof type === "function") {
        node = type.isReactComponent
            ? updateClassComponent(vnode, parentNode)
        : updateFunctionComponent(vnode, parentNode);
    } else {
        node = document.createDocumentFragment();
    }
    reconcileChildren(props.children, node);
    updateNode(node, props);
    return node;
}

// 遍历下子vnode，然后把子vnode->真实DOM节点，再插入父node中
function reconcileChildren(children, node) {
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (Array.isArray(child)) {
            for (let j = 0; j < child.length; j++) {
                render(child[j], node);
            }
        } else {
            render(child, node);
        }
    }
}
function updateNode(node, nextVal) {
    Object.keys(nextVal)
        .filter(k => k !== "children")
        .forEach(k => {
        if (k.slice(0, 2) === "on") {
            let eventName = k.slice(2).toLocaleLowerCase();
            node.addEventListener(eventName, nextVal[k]);
        } else {
            node[k] = nextVal[k];
        }
    });
}

// 返回真实dom节点
// 执行函数
function updateFunctionComponent(vnode, parentNode) {
    const {type, props} = vnode;
    let vvnode = type(props);
    const node = createNode(vvnode, parentNode);
    return node;
}

// 返回真实dom节点
// 先实例化，再执行render函数
function updateClassComponent(vnode, parentNode) {
    const {type, props} = vnode;
    let cmp = new type(props);
    const vvnode = cmp.render();
    const node = createNode(vvnode, parentNode);
    return node;
}
export default {
    render
};
```

在`react`源码中，虚拟`Dom`转化成真实`Dom`整体流程如下图所示：

 ![](https://static.ecool.fun//article/9331978c-279d-4074-bc08-053046a4faff.png)

其渲染流程如下所示：

- 使用React.createElement或JSX编写React组件，实际上所有的 JSX 代码最后都会转换成React.createElement(...) ，Babel帮助我们完成了这个转换的过程。
- createElement函数对key和ref等特殊的props进行处理，并获取defaultProps对默认props进行赋值，并且对传入的孩子节点进行处理，最终构造成一个虚拟DOM对象
- ReactDOM.render将生成好的虚拟DOM渲染到指定容器上，其中采用了批处理、事务等机制并且对特定浏览器进行了性能优化，最终转换为真实DOM
