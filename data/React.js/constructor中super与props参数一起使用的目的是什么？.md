---
level: 1
---

# constructor中super与props参数一起使用的目的是什么？

## 题目要点

- **`super(props)`**：确保在构造函数中正确初始化 `this.props`。
- **初始化 `state` 和绑定事件处理程序**：可以在构造函数中使用 `this.props` 来初始化组件状态和绑定事件处理程序。
- **必须调用**：如果在构造函数中使用 `this.props`，需要调用 `super(props)`。

通过正确使用 `super(props)`，可以确保 React 组件在构造函数中能够正常工作，并访问到 `props`。

## 参考答案

在调用方法之前，子类构造函数无法使用this引用super()。

在ES6中，在子类的constructor中必须先调用super才能引用this。

在constructor中可以使用this.props

* 使用props：

```react.js
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);  // Prints { name: 'sudheer',age: 30 }
    }
}
```

```react.js
class MyComponent extends React.Component {
    constructor(props) {
        super();
        console.log(this.props); // Prints undefined
        // But Props parameter is still available
        console.log(props); // Prints { name: 'sudheer',age: 30 }
    }

    render() {
        // No difference outside constructor
        console.log(this.props) // Prints { name: 'sudheer',age: 30 }
    }
}
```
