---
level: 1.5
---

# 什么是JSX？

## 题目要点

- **JSX**：一种 JavaScript 语法扩展，让你在 JavaScript 代码中书写类似 HTML 的结构。
- **直观**：使组件结构的定义更加直观和易读。
- **表达式嵌入**：支持在 JSX 中嵌入 JavaScript 表达式。
- **编译**：JSX 需要被编译成标准 JavaScript，以便浏览器理解。

JSX 是 React 的核心特性之一，简化了组件的定义和 UI 的描述，使得开发和维护 React 应用变得更加高效。

## 参考答案

JSX即JavaScript XML。一种在React组件内部构建标签的类XML语法。JSX为react.js开发的一套语法糖，也是react.js的使用基础。React在不使用JSX的情况下一样可以工作，然而使用JSX可以提高组件的可读性，因此推荐使用JSX。

```react.js
class MyComponent extends React.Component {
  render() {
    let props = this.props;  
    return (
      <div className="my-component">
      <a href={props.url}>{props.name}</a>
      </div>
    );
  }
}
```

* 允许使用熟悉的语法来定义 HTML 元素树；
* 提供更加语义化且移动的标签；
* 程序结构更容易被直观化；
* 抽象了 React Element 的创建过程；
* 可以随时掌控 HTML 标签以及生成这些标签的代码；
* 是原生的 JavaScript。
