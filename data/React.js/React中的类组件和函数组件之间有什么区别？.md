---
level: 1
---

# React中的类组件和函数组件之间有什么区别？

## 题目要点

- **类组件**：使用 ES6 类定义，具有状态和生命周期方法，适用于需要管理复杂状态和副作用的场景。
- **函数组件**：使用函数定义，通过 Hooks 管理状态和副作用，语法简洁，推荐用于大多数组件。

在 React 生态中，函数组件与 Hooks 已成为主流的编写组件方式，因其简洁性和灵活性被广泛推荐和使用。

## 参考答案

## 类组件（Class components）

* 无论是使用函数或是类来声明一个组件，它决不能修改它自己的 props。
	* 所有 React 组件都必须是纯函数，并禁止修改其自身 props。
* React是单项数据流，父组件改变了属性，那么子组件视图会更新。
	* 属性 props是外界传递过来的，状态 state是组件本身的，状态可以在组件中任意修改
	* 组件的属性和状态改变都会更新视图。
    
```react.js
class Welcome extends React.Component {
  render() {
    return (
      <h1>Welcome { this.props.name }</h1>
    );
  }
}
ReactDOM.render(<Welcome name='react' />, document.getElementById('root'));
```

函数组件接收一个单一的 props 对象并返回了一个React元素

```react.js
function Welcome (props) {
  return <h1>Welcome {props.name}</h1>
}
ReactDOM.render(<Welcome name='react' />, document.getElementById('root'));
```

* 语法上

两者最明显的不同就是在语法上，函数组件是一个纯函数，它接收一个props对象返回一个react元素。而类组件需要去继承React.Component并且创建render函数返回react元素，这将会要更多的代码，虽然它们实现的效果相同。

* 状态管理

因为函数组件是一个纯函数，你不能在组件中使用setState()，这也是为什么把函数组件称作为无状态组件。

如果你需要在你的组件中使用state，你可以选择创建一个类组件或者将state提升到你的父组件中，然后通过props对象传递到子组件。

* 生命周期钩子

你不能在函数组件中使用生命周期钩子，原因和不能使用state一样，所有的生命周期钩子都来自于继承的React.Component中。

因此，如果你想使用生命周期钩子，那么需要使用类组件。

**注意**：在react16.8版本中添加了hooks，使得我们可以在函数组件中使用useState钩子去管理state，使用useEffect钩子去使用生命周期函数。因此，2、3两点就不是它们的区别点。从这个改版中我们可以看出作者更加看重函数组件，而且react团队曾提及到在react之后的版本将会对函数组件的性能方面进行提升。

* 调用方式

如果SayHi是一个函数，React需要调用它：

```react.js
// 你的代码 
function SayHi() { 
    return <p>Hello, React</p> 
} 
// React内部 
const result = SayHi(props) // » <p>Hello, React</p>
```

```react.js
// 你的代码 
class SayHi extends React.Component { 
    render() { 
        return <p>Hello, React</p> 
    } 
} 
// React内部 
const instance = new SayHi(props) // » SayHi {} 
const result = instance.render() // » <p>Hello, React</p>
```
