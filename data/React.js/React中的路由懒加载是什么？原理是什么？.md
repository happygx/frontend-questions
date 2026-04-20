---
level: 3.5
---

# React中的路由懒加载是什么？原理是什么？

## 题目要点

在 React 中，路由懒加载是指在用户访问特定路由时才加载相应的组件，而不是在应用初始化时一次性加载所有路由组件。这样可以显著提高初始加载速度，并优化用户体验。路由懒加载通常与 React 的懒加载和代码分割功能结合使用。

### 路由懒加载的原理

1. **代码分割**：
   - **定义**：代码分割是一种将应用代码拆分成更小的块的技术，这些代码块可以按需加载。React 支持通过动态导入（`import()`）来实现代码分割。
   - **实现**：使用 Webpack 等打包工具，结合 `React.lazy` 和 `Suspense`，将路由组件拆分成单独的代码块，只在需要时加载。

2. **动态导入**：
   - **定义**：动态导入是指使用 `import()` 函数异步加载模块。它返回一个 Promise，组件会在 Promise resolve 后被加载。
   - **实现**：`React.lazy` 用于包装动态导入的组件，返回一个可以懒加载的组件。

3. **懒加载组件**：
   - **定义**：`React.lazy` 是 React 提供的一个函数，用于定义懒加载的组件。与 `Suspense` 组件配合使用，可以在组件加载过程中显示一个 fallback UI。

4. **路由配置**：
   - **定义**：结合 React Router，懒加载组件可以在路由配置中使用。通过将路由组件设置为懒加载组件，确保只有在用户访问特定路由时才加载相关组件。

### 实现路由懒加载的步骤

1. **安装依赖**：
   - 确保你已经安装了 `react-router-dom` 和 React（如果尚未安装）：

     ```bash
     npm install react-router-dom
     ```

2. **定义懒加载组件**：
   - 使用 `React.lazy` 和动态导入来定义懒加载的组件。
   - **示例**：

     ```javascript
     import React, { Suspense } from 'react';
     import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

     // 使用 React.lazy 定义懒加载组件
     const Home = React.lazy(() => import('./Home'));
     const About = React.lazy(() => import('./About'));
     const Contact = React.lazy(() => import('./Contact'));

     function App() {
       return (
         <Router>
           <Suspense fallback={<div>Loading...</div>}>
             <Switch>
               <Route path="/" exact component={Home} />
               <Route path="/about" component={About} />
               <Route path="/contact" component={Contact} />
             </Switch>
           </Suspense>
         </Router>
       );
     }

     export default App;
     ```

3. **使用 `Suspense` 组件**：
   - **定义**：`Suspense` 用于包裹懒加载组件，并定义一个 fallback UI，当懒加载组件还未加载完成时显示该 UI。
   - **实现**：在路由配置中，使用 `Suspense` 组件来处理懒加载状态。
   - **示例**（在上述代码中已包含）：

     ```javascript
     <Suspense fallback={<div>Loading...</div>}>
       <Switch>
         <Route path="/" exact component={Home} />
         <Route path="/about" component={About} />
         <Route path="/contact" component={Contact} />
       </Switch>
     </Suspense>
     ```

### 关键点

1. **动态导入（`import()`）**：用于异步加载模块，返回一个 Promise。
2. **`React.lazy`**：用于定义懒加载组件，接受动态导入的模块。
3. **`Suspense`**：用于包裹懒加载组件，定义一个 fallback UI，处理加载过程中的显示。

### 总结

- **路由懒加载**：在用户访问特定路由时才加载相应组件，优化初始加载速度。
- **实现原理**：结合代码分割、动态导入、`React.lazy` 和 `Suspense` 来实现。
- **步骤**：定义懒加载组件，使用 `Suspense` 处理加载状态，将懒加载组件用于路由配置。

通过这些步骤和原理，可以有效地实现 React 中的路由懒加载，提高应用的性能和用户体验。

## 参考答案

## React.lazy 是什么

随着前端应用体积的扩大，资源加载的优化是我们必须要面对的问题，动态代码加载就是其中的一个方案。

webpack 提供了符合 ECMAScript 提案 的 import() 语法 ，让我们来实现动态地加载模块（注：require.ensure 与 import() 均为 webpack 提供的代码动态加载方案，在 webpack 2.x 中，require.ensure 已被 import 取代）。

在 React 16.6 版本中，新增了 React.lazy 函数，它能让你像渲染常规组件一样处理动态引入的组件，配合 webpack 的 Code Splitting ，只有当组件被加载，对应的资源才会导入 ，从而达到懒加载的效果。

## 使用 React.lazy

在实际的使用中，首先是引入组件方式的变化：

```
import OtherComponent from './OtherComponent';
// 使用 React.lazy
const OtherComponent = React.lazy(() => import('./OtherComponent'))
```

React.lazy 方法返回的是一个 lazy 组件的对象，类型是 react.lazy，并且 lazy 组件具有 _status 属性，与 Promise 类似它具有 Pending、Resolved、Rejected 三个状态，分别代表组件的加载中、已加载、和加载失败三中状态。

需要注意的一点是，React.lazy 需要配合 Suspense 组件一起使用，在 Suspense 组件中渲染 React.lazy 异步加载的组件。如果单独使用 React.lazy，React 会给出错误提示。

## 实现原理

### Webpack 动态加载

上面使用了 import() 语法，webpack 检测到这种语法会自动代码分割。使用这种动态导入语法代替以前的静态引入，可以让组件在渲染的时候，再去加载组件对应的资源，这个异步加载流程的实现机制是怎么样呢？

webpack 是通过创建 script 标签来实现动态加载的，找出依赖对应的 chunk 信息，然后生成 script 标签来动态加载 chunk，每个 chunk 都有对应的状态：未加载 、 加载中、已加载 。

### Suspense 组件

Suspense 内部主要通过捕获组件的状态去判断如何加载，上面我们提到 React.lazy 创建的动态加载组件具有 Pending、Resolved、Rejected 三种状态，当这个组件的状态为 Pending 时显示的是 Suspense 中 fallback 的内容，只有状态变为 resolve 后才显示组件。

### Error Boundaries 处理资源加载失败场景

如果遇到网络问题或是组件内部错误，页面的动态资源可能会加载失败，为了优雅降级，可以使用 Error Boundaries 来解决这个问题。

Error Boundaries 是一种组件，如果你在组件中定义了 static getDerivedStateFromError() 或 componentDidCatch() 生命周期函数，它就会成为一个 Error Boundaries 的组件。

它的用法也非常的简单，可以直接当作一个组件去使用，如下：

```javascript
  <MyWidget />
</ErrorBoundary>
```

React.lazy() 和 React.Suspense 的提出为现代 React 应用的性能优化和工程化提供了便捷之路。 React.lazy 可以让我们像渲染常规组件一样处理动态引入的组件，结合 Suspense 可以更优雅地展现组件懒加载的过渡动画以及处理加载异常的场景。
