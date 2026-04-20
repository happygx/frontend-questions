---
level: 4
---

# React有哪些性能优化的方法？

## 题目要点

React 性能优化要点：

### 1. **避免不必要的重新渲染**

- **`React.memo`**：优化函数组件，避免不必要的渲染。
- **`PureComponent`**：继承自 `React.PureComponent`，自动实现浅比较。
- **`shouldComponentUpdate`**：控制类组件是否重新渲染。

### 2. **优化组件更新**

- **使用 `key` 属性**：提高列表渲染效率。
- **避免新对象/函数**：使用 `useCallback` 和 `useMemo` 避免每次渲染时创建新对象和函数。

### 3. **懒加载和代码分割**

- **`React.lazy` 和 `Suspense`**：按需加载组件，减少初始加载时间。

### 4. **优化 Context 使用**

- **避免深层嵌套**：将 Context 分割成更小的独立部分，减少不必要的渲染。

### 5. **优化图片和媒体**

- **现代格式**：使用 WebP 或 AVIF 减少图片大小。
- **懒加载**：使用 `loading="lazy"` 属性进行图片懒加载。

### 6. **服务端渲染（SSR）和静态生成（SSG）**

- **SSR**：在服务器端生成 HTML，提高首屏渲染速度和 SEO（使用 Next.js 等框架）。
- **SSG**：在构建时生成静态页面，适用于内容不频繁变动的页面。

### 7. **减少依赖**

- **清理不必要的依赖**：减少包体积，优化应用性能。
- **避免大型库**：在高层引入大型库，利用代码分割和 Tree Shaking。

### 8. **利用浏览器缓存**

- **缓存策略**：使用 Service Worker 或 HTTP 缓存头部来缓存静态资源，提升加载速度。

### 9. **事件处理优化**

- **事件代理**：将事件处理程序添加到父级元素，减少事件处理程序数量。
- **避免频繁绑定**：使用 `useCallback` 优化事件处理函数。

### 10. **优化布局和绘制**

- **`requestAnimationFrame`**：优化动画性能，避免阻塞主线程。
- **减少 DOM 操作**：减少直接对 DOM 的频繁操作，利用 React 的虚拟 DOM。

### 11. **使用性能优化库**

- **`reselect`**：优化 Redux 选择器，避免重复计算。
- **`React Query` 或 `SWR`**：管理和缓存数据请求，减少不必要的重新渲染。

这些优化策略能帮助提升 React 应用的整体性能和用户体验。

## 参考答案

React 渲染性能优化的三个方向，其实也适用于其他软件开发领域，这三个方向分别是:

* 减少计算的量。 -> 对应到 React 中就是减少渲染的节点 或者 降低组件渲染的复杂度
* 利用缓存。-> 对应到 React 中就是如何避免重新渲染，利用函数式编程的 memo 方式来避免组件重新渲染
* 精确重新计算的范围。 对应到 React 中就是绑定组件和状态关系, 精确判断更新的'时机'和'范围'. 只重新渲染'脏'的组件，或者说降低渲染范围

## 减少渲染的节点/降低渲染计算量(复杂度)

首先从计算的量上下功夫，减少节点渲染的数量或者降低渲染的计算量可以显著的提高组件渲染性能。

### 不要在渲染函数都进行不必要的计算

比如不要在渲染函数(render)中进行数组排序、数据转换、订阅事件、创建事件处理器等等. 渲染函数中不应该放置太多副作用

### 减少不必要的嵌套

有些团队是重度的 styled-components 用户，其实大部分情况下我们都不需要这个玩意，比如纯静态的样式规则，以及需要重度性能优化的场景。除了性能问题，另外一个困扰我们的是它带来的节点嵌套地狱(如上图)。

所以我们需要理性地选择一些工具，比如使用原生的 CSS，减少 React 运行时的负担.

一般不必要的节点嵌套都是滥用高阶组件/RenderProps 导致的。所以还是那句话‘只有在必要时才使用 xxx’。 有很多种方式来代替高阶组件/RenderProps，例如优先使用 props、React Hooks

### 虚拟列表

虚拟列表是常见的‘长列表'和'复杂组件树'优化方式，它优化的本质就是减少渲染的节点。

虚拟列表只渲染当前视口可见元素。

虚拟列表常用于以下组件场景:

* 无限滚动列表，grid, 表格，下拉列表，spreadsheets
* 无限切换的日历或轮播图
* 大数据量或无限嵌套的树
* 聊天窗，数据流(feed), 时间轴
* 等等

### 惰性渲染

惰性渲染的初衷本质上和虚表一样，也就是说我们只在必要时才去渲染对应的节点。

举个典型的例子，我们常用 Tab 组件，我们没有必要一开始就将所有 Tab 的 panel 都渲染出来，而是等到该 Tab 被激活时才去惰性渲染。

还有很多场景会用到惰性渲染，例如树形选择器，模态弹窗，下拉列表，折叠组件等等。

### 选择合适的样式方案

在样式运行时性能方面大概可以总结为：CSS > 大部分CSS-in-js > inline style

## 避免重新渲染

减少不必要的重新渲染也是 React 组件性能优化的重要方向. 为了避免不必要的组件重新渲染需要在做到两点:

* 保证组件纯粹性。即控制组件的副作用，如果组件有副作用则无法安全地缓存渲染结果
* 通过shouldComponentUpdate生命周期函数来比对 state 和 props, 确定是否要重新渲染。对于函数组件可以使用React.memo包装

另外这些措施也可以帮助你更容易地优化组件重新渲染:

### 简化 props

如果一个组件的 props 太复杂一般意味着这个组件已经违背了‘单一职责’，首先应该尝试对组件进行拆解. ② 另外复杂的 props 也会变得难以维护, 比如会影响shallowCompare效率, 还会让组件的变动变得难以预测和调试.

简化的 props 更容易理解, 且可以提高组件缓存的命中率

### 不变的事件处理器

避免使用箭头函数形式的事件处理器, 例如:

```javascript
```

更好的方式是使用实例方法:

```javascript
  render() {
    <ComplexComponent onClick={this.handleClick} otherProps={values} />;
  }
  handleClick = () => {
    /*...*/
  };
}
```

```javascript
  /*...*/
}, []);

return <ComplexComponent onClick={handleClick} otherProps={values} />;
```

```javascript
  /*...*/
  // 🤭
}, [foo, bar, baz, bazz, bazzzz]);
```

```javascript
  const ref = useRef < T > props;
  // 每次渲染更新props
  useEffect(() => {
    ref.current = props;
  });
}

function MyComp(props) {
  const propsRef = useRefProps(props);

  // 现在handleClick是始终不变的
  const handleClick = useCallback(() => {
    const { foo, bar, baz, bazz, bazzzz } = propsRef.current;
    // do something
  }, []);
}
```

```javascript
  {list.map(i => (
    <Item key={i.id} onClick={() => handleDelete(i.id)} value={i.value} />
  ))}
</List>
```

```javascript
const handleDelete = useCallback((id: string) => {
  /*删除操作*/
}, []);

return (
  <List>
    {list.map(i => (
      <Item key={i.id} id={i.id} onClick={handleDelete} value={i.value} />
    ))}
  </List>
);
```

```javascript
  const id = event.currentTarget.dataset.id;
  /*删除操作*/
}, []);

return (
  <ul>
    {list.map(i => (
      <li key={i.id} data-id={i.id} onClick={handleDelete} value={i.value} />
    ))}
  </ul>
);
```

不可变数据可以让状态变得可预测，也让 shouldComponentUpdate '浅比较'变得更可靠和高效。

相关的工具有Immutable.js、Immer、immutability-helper 以及 seamless-immutable。

### 简化 state

不是所有状态都应该放在组件的 state 中. 例如缓存数据。按照我的原则是：如果需要组件响应它的变动, 或者需要渲染到视图中的数据才应该放到 state 中。这样可以避免不必要的数据变动导致组件重新渲染.

### 使用 recompose 精细化比对

尽管 hooks 出来后，recompose 宣称不再更新了，但还是不影响我们使用 recompose 来控制shouldComponentUpdate方法, 比如它提供了以下方法来精细控制应该比较哪些 props:

```javascript
 pure()
 /* 自定义比较 */
 shouldUpdate(test: (props: Object, nextProps: Object) => boolean): HigherOrderComponent
 /* 只比较指定key */
 onlyUpdateForKeys( propKeys: Array<string>): HigherOrderComponent
```

## 精细化渲染


所谓精细化渲染指的是只有一个数据来源导致组件重新渲染, 比如说 A 只依赖于 a 数据，那么只有在 a 数据变动时才渲染 A, 其他状态变化不应该影响组件 A。

Vue 和 Mobx 宣称自己性能好的一部分原因是它们的'响应式系统', 它允许我们定义一些‘响应式数据’，当这些响应数据变动时，依赖这些响应式数据视图就会重新渲染。

### 响应式数据的精细化渲染

大部分情况下，响应式数据可以实现视图精细化的渲染, 但它还是不能避免开发者写出低效的程序. 本质上还是因为组件违背‘单一职责’.

举个例子，现在有一个 MyComponent 组件，依赖于 A、B、C 三个数据源，来构建一个 vdom 树。现在的问题是什么呢？现在只要 A、B、C 任意一个变动，那么 MyComponent 整个就会重新渲染。

更好的做法是让组件的职责更单一，精细化地依赖响应式数据，或者说对响应式数据进行‘隔离’. 如下图, A、B、C 都抽取各自的组件中了，现在 A 变动只会渲染 A 组件本身，而不会影响父组件和 B、C 组件。

对于 Vue 或者 Mobx 来说，一个组件的渲染函数就是一个依赖收集的上下文。上面 List 组件渲染函数内'访问'了所有的列表项数据，那么 Vue 或 Mobx 就会认为你这个组件依赖于所有的列表项，这样就导致，只要任意一个列表项的属性值变动就会重新渲染整个 List 组件。

解决办法也很简单，就是将数据隔离抽取到单一职责的组件中。对于 Vue 或 Mobx 来说，越细粒度的组件，可以收获更高的性能优化效果。

### 不要滥用 Context

其实 Context 的用法和响应式数据正好相反。笔者也看过不少滥用 Context API 的例子, 说到底还是没有处理好‘状态的作用域问题’.

首先要理解 Context API 的更新特点，它是可以穿透React.memo或者shouldComponentUpdate的比对的，也就是说，一旦 Context 的 Value 变动，所有依赖该 Context 的组件会全部 forceUpdate.

这个和 Mobx 和 Vue 的响应式系统不同，Context API 并不能细粒度地检测哪些组件依赖哪些状态，所以说上节提到的‘精细化渲染’组件模式，在 Context 这里就成为了‘反模式’.
