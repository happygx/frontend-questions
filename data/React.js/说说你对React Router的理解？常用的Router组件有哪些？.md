---
level: 2
---

# 说说你对React Router的理解？常用的Router组件有哪些？

## 题目要点

可以从以下几个要点展开：

### 1. **React Router 的理解**

- **定义与功能**：React Router 是 React 应用中最常用的路由管理库，主要用于管理单页应用（SPA）的页面导航。它允许开发者通过配置路由，定义不同路径对应的组件，使得应用在 URL 变化时能够渲染不同的内容，而无需刷新整个页面。
- **核心思想**：React Router 的核心思想是通过路径和组件的映射关系，实现页面的组件化管理，使得应用程序能够根据 URL 变化，动态加载和渲染对应的 React 组件。
- **无刷新导航**：React Router 利用了浏览器的 `history` API 或 `hash` 来实现前端路由，这样在导航时不会触发页面刷新，提高了用户体验。
- **嵌套路由**：React Router 支持嵌套路由，可以在父路由中定义子路由，从而实现复杂页面结构的路由管理。
- **动态路由**：支持路径参数和查询参数，可以在路径中定义动态部分，从而根据不同的参数渲染相应的组件。

### 2. **常用的 Router 组件**

#### 2.1 BrowserRouter

- **功能**：基于 HTML5 的 `history` API，适用于现代浏览器，URL 显示为干净的路径。
- **使用场景**：适合需要干净 URL 的应用，通常用于生产环境中。

#### 2.2 HashRouter

- **功能**：基于 URL 的 `hash` 部分，路径中包含 `#` 符号。
- **使用场景**：适合不希望配置服务器端路由或需要兼容旧浏览器的场景。

#### 2.3 MemoryRouter

- **功能**：将路由状态保存在内存中，与浏览器的 URL 无关。
- **使用场景**：用于需要完全自定义路由行为的场景，如测试环境或 React Native 应用。

#### 2.4 Route

- **功能**：定义路径与组件的映射关系。当 URL 匹配指定路径时，渲染对应的组件。
- **使用场景**：是 React Router 中最基础的组件，用于创建和管理应用中的路由。

#### 2.5 Switch (在 React Router v6 中被替换为 Routes)

- **功能**：用于包裹多个 `Route` 组件，确保在路径匹配时仅渲染第一个匹配的路由。
- **使用场景**：在路径可能匹配多个 `Route` 时，用于确保只渲染一个组件。

#### 2.6 Link

- **功能**：用于创建导航链接，替代传统的 `<a>` 标签，避免页面刷新。
- **使用场景**：在应用内创建导航链接时使用。

#### 2.7 NavLink

- **功能**：类似于 `Link`，但可以为当前选中的路由链接添加样式或类名。
- **使用场景**：适用于需要区分当前选中的导航链接的场景，比如导航菜单。

#### 2.8 Redirect (在 React Router v6 中被替换为 Navigate)

- **功能**：用于实现路由的重定向，当匹配到指定路径时，自动导航到另一个路径。
- **使用场景**：需要在某些条件下重定向用户时使用。

### 3. **React Router 的版本演变**

- **版本更新**：React Router 的 API 在不断演变，特别是在 React Router v6 中，组件的用法和命名都有一些变化，如 `Switch` 变为 `Routes`，`Redirect` 变为 `Navigate`。
- **学习与适应**：理解和适应不同版本的变化是使用 React Router 时的一个重要部分。

## 参考答案

## 一、是什么

`react-router`等前端路由的原理大致相同，可以实现无刷新的条件下切换显示不同的页面

路由的本质就是页面的`URL`发生改变时，页面的显示结果可以根据`URL`的变化而变化，但是页面不会刷新

因此，可以通过前端路由可以实现单页(SPA)应用

`react-router`主要分成了几个不同的包：

- react-router: 实现了路由的核心功能
- react-router-dom： 基于 react-router，加入了在浏览器运行环境下的一些功能
- react-router-native：基于 react-router，加入了 react-native 运行环境下的一些功能

- react-router-config: 用于配置静态路由的工具库





## 二、有哪些

这里主要讲述的是`react-router-dom`的常用`API`，主要是提供了一些组件：

- BrowserRouter、HashRouter
- Route
- Link、NavLink
- switch
- redirect



### BrowserRouter、HashRouter

`Router`中包含了对路径改变的监听，并且会将相应的路径传递给子组件

`BrowserRouter`是`history`模式，`HashRouter`模式

使用两者作为最顶层组件包裹其他组件

```jsx

export default function App() {
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li>
              < a href=" ">Home</ a>
            </li>
            <li>
              < a href="/about">About</ a>
            </li>
            <li>
              < a href="/contact">Contact</ a>
            </li>
          </ul>
        </nav>
      </main>
    </Router>
  );
}
```

`Route`用于路径的匹配，然后进行组件的渲染，对应的属性如下：

- path 属性：用于设置匹配到的路径
- component 属性：设置匹配到路径后，渲染的组件
- render 属性：设置匹配到路径后，渲染的内容
- exact 属性：开启精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件

```jsx

export default function App() {
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li>
              < a href="/">Home</ a>
            </li>
            <li>
              < a href="/about">About</ a>
            </li>
            <li>
              < a href="/contact">Contact</ a>
            </li>
          </ul>
        </nav>
        <Route path="/" render={() => <h1>Welcome!</h1>} />
      </main>
    </Router>
  );
}
```

通常路径的跳转是使用`Link`组件，最终会被渲染成`a`元素，其中属性`to`代替`a`标题的`href`属性

`NavLink`是在`Link`基础之上增加了一些样式属性，例如组件被选中时，发生样式变化，则可以设置`NavLink`的一下属性：

- activeStyle：活跃时（匹配时）的样式
- activeClassName：活跃时添加的class

如下：

```js
<NavLink to="/about" activeStyle={{color: "red"}}>关于</NavLink>
<NavLink to="/profile" activeStyle={{color: "red"}}>我的</NavLink>
```

通过`Route`作为顶层组件包裹其他组件后,页面组件就可以接收到一些路由相关的东西，比如`props.history`

```jsx
  <Fragment>
    <h1>Contact</h1>
    <button onClick={() => history.push("/")}>Go to home</button>
    <FakeText />
  </Fragment>
);
```



### redirect

用于路由的重定向，当这个组件出现时，就会执行跳转到对应的`to`路径中，如下例子：

```js
  match: {
    params: { name },
  },
}) => (
  // props.match.params.name
  <Fragment>
    {name !== "tom" ? <Redirect to="/" /> : null}
    <h1>About {name}</h1>
    <FakeText />
  </Fragment>
)
```





### switch

`swich`组件的作用适用于当匹配到第一个组件的时候，后面的组件就不应该继续匹配

如下例子：

```jsx
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/profile" component={Profile} />
  <Route path="/:userid" component={User} />
  <Route component={NoMatch} />
</Switch>
```


除了一些路由相关的组件之外，`react-router`还提供一些`hooks`，如下：

- useHistory
- useParams
- useLocation



### useHistory

`useHistory`可以让组件内部直接访问`history`，无须通过`props`获取

```js

const Contact = () => {
  const history = useHistory();
  return (
    <Fragment>
      <h1>Contact</h1>
      <button onClick={() => history.push("/")}>Go to home</button>
    </Fragment>
  );
};
```



```jsx
  const { name } = useParams();
  return (
    // props.match.params.name
    <Fragment>
      {name !== "John Doe" ? <Redirect to="/" /> : null}
      <h1>About {name}</h1>
      <Route component={Contact} />
    </Fragment>
  );
};
```

`useLocation` 会返回当前 `URL `的 `location `对象

```jsx

const Contact = () => {
  const { pathname } = useLocation();

  return (
    <Fragment>
      <h1>Contact</h1>
      <p>Current URL: {pathname}</p >
    </Fragment>
  );
};
```

这些路由传递参数主要分成了三种形式：

- 动态路由的方式
- search传递参数
- to传入对象



### 动态路由

动态路由的概念指的是路由中的路径并不会固定

例如将`path`在`Route`匹配时写成`/detail/:id`，那么 `/detail/abc`、`/detail/123`都可以匹配到该`Route`

```jsx

<Switch>
    ... 其他Route
    <Route path="/detail/:id" component={Detail}/>
    <Route component={NoMatch} />
</Switch>
```

```jsx
```

在跳转的路径中添加了一些query参数；

```jsx

<Switch>
  <Route path="/detail2" component={Detail2}/>
</Switch>
```

```js
```

传递方式如下：

```jsx
    pathname: "/detail2", 
    query: {name: "kobe", age: 30},
    state: {height: 1.98, address: "洛杉矶"},
    search: "?apikey=123"
  }}>
  详情2
</NavLink>
```

```js
```
