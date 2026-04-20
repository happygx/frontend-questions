---
level: 2
---

# 说说React Router有几种模式，以及实现原理？

## 题目要点

可以从以下几个方面展开：

### 1. **React Router 的几种模式**

#### 1.1 BrowserRouter 模式

- **定义**：基于 HTML5 的 `history` API（包括 `pushState`、`replaceState` 和 `popstate` 事件）。
- **特点**：URL 干净（没有 `#` 符号），适合现代 Web 应用，支持浏览器的前进和后退功能。
- **实现原理**：通过 `history` API 操作浏览器的历史记录栈，在用户导航时，改变浏览器的 URL，但不会触发页面刷新；组件会监听 `popstate` 事件，根据当前的 URL 渲染相应的组件。

#### 1.2 HashRouter 模式

- **定义**：基于 URL 的 `hash` 部分（`#` 后面的部分），不依赖服务器的配置。
- **特点**：URL 带有 `#` 符号，不会导致浏览器向服务器发送请求，适用于不希望配置服务器的单页应用。
- **实现原理**：利用 `window.location.hash` 和 `hashchange` 事件，监听 URL 的 `hash` 变化，根据不同的 `hash` 渲染对应的组件，`hash` 部分的改变不会触发页面的刷新。

#### 1.3 MemoryRouter 模式

- **定义**：不与浏览器 URL 同步，所有的路由状态都保存在内存中。
- **特点**：不操作 URL，适用于需要自定义路由行为的场景，比如测试环境或 React Native 应用。
- **实现原理**：使用内部的 `history` 对象管理路由状态，并通过状态变化控制组件渲染，而不是通过 URL 的变化。

### 2. **实现原理的深入解析**

#### 2.1 URL 同步与组件渲染

- **核心思路**：React Router 的核心思想是根据当前的 URL 状态，匹配到对应的路由配置，然后渲染相应的组件。
- **组件的匹配机制**：通过 `Route` 组件和 `Switch` 组件实现路径的匹配，当 `path` 属性匹配当前 URL 时，渲染对应的子组件。

#### 2.2 `history` 模块的作用

- **定义**：React Router 使用了 `history` 模块管理路由的历史栈，它是一个可以独立于浏览器历史的对象。
- **功能**：`history` 对象暴露了 `push`、`replace` 等方法，允许程序在不刷新页面的情况下，更新 URL 和状态。

#### 2.3 动态路由与参数获取

- **实现方式**：通过路径中的参数（如 `/users/:id`），React Router 可以从 URL 中解析出动态参数，并传递给组件。
- **原理**：通过 `path-to-regexp` 等工具库，将 URL 模板解析为正则表达式，在 URL 变化时进行匹配和提取参数。

### 3. **模式选择的注意事项**

- **SEO 和服务器配置**：如果需要支持服务器端渲染或良好的 SEO，通常会选择 `BrowserRouter`，并配置服务器的路由重定向。
- **兼容性和配置成本**：如果不希望修改服务器配置或者希望兼容较旧的浏览器，可以选择 `HashRouter`。

通过讲解这些模式及其实现原理，可以展示对 React Router 的理解以及在实际项目中做出选择的能力。

## 参考答案

## 一、是什么

在单页应用中，一个`web`项目只有一个`html`页面，一旦页面加载完成之后，就不用因为用户的操作而进行页面的重新加载或者跳转，其特性如下：

- 改变 url 且不让浏览器向服务器发送请求

- 在不刷新页面的前提下动态改变浏览器地址栏中的URL地址

其中主要分成了两种模式：

- hash 模式：在url后面加上#，如http://127.0.0.1:5500/home/#/page1
- history 模式：允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录


## 二、使用

`React Router`对应的`hash`模式和`history`模式对应的组件为：

- HashRouter
- BrowserRouter


这两个组件的使用都十分的简单，作为最顶层组件包裹其他组件，如下所示

```jsx
// 2.import { HashRouter as Router } from "react-router-dom";

import React from 'react';
import {
  BrowserRouter as Router,
  // HashRouter as Router  
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Backend from './pages/Backend';
import Admin from './pages/Admin';


function App() {
  return (
    <Router>
        <Route path="/login" component={Login}/>
        <Route path="/backend" component={Backend}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/" component={Home}/>
    </Router>
  );
}

export default App;
```

路由描述了 `URL` 与 `UI `之间的映射关系，这种映射是单向的，即 URL 变化引起 UI 更新（无需刷新页面）

下面以`hash`模式为例子，改变`hash`值并不会导致浏览器向服务器发送请求，浏览器不发出请求，也就不会刷新页面

`hash` 值改变，触发全局 `window` 对象上的 `hashchange` 事件。所以 `hash` 模式路由就是利用 `hashchange` 事件监听 `URL` 的变化，从而进行 `DOM` 操作来模拟页面跳转

`react-router`也是基于这个特性实现路由的跳转

下面以`HashRouter`组件分析进行展开：


## HashRouter

`HashRouter`包裹了整应用，

通过`window.addEventListener('hashChange',callback)`监听`hash`值的变化，并传递给其嵌套的组件

然后通过`context`将`location`数据往后代组件传递，如下：

```jsx
import { Provider } from './context'
// 该组件下Api提供给子组件使用
class HashRouter extends Component {
  constructor() {
    super()
    this.state = {
      location: {
        pathname: window.location.hash.slice(1) || '/'
      }
    }
  }
  // url路径变化 改变location
  componentDidMount() {
    window.location.hash = window.location.hash || '/'
    window.addEventListener('hashchange', () => {
      this.setState({
        location: {
          ...this.state.location,
          pathname: window.location.hash.slice(1) || '/'
        }
      }, () => console.log(this.state.location))
    })
  }
  render() {
    let value = {
      location: this.state.location
    }
    return (
      <Provider value={value}>
        {
          this.props.children
        }
      </Provider>
    );
  }
}

export default HashRouter;

```

`Router`组件主要做的是通过`BrowserRouter`传过来的当前值，通过`props`传进来的`path`与`context`传进来的`pathname`进行匹配，然后决定是否执行渲染组件

```js
import { Consumer } from './context'
const { pathToRegexp } = require("path-to-regexp");
class Route extends Component {
  render() {
    return (
      <Consumer>
        {
          state => {
            console.log(state)
            let {path, component: Component} = this.props
            let pathname = state.location.pathname
            let reg = pathToRegexp(path, [], {end: false})
            // 判断当前path是否包含pathname
            if(pathname.match(reg)) {
              return <Component></Component>
            }
            return null
          }
        }
      </Consumer>
    );
  }
}
export default Route;

```
