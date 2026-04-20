---
level: 3
---

# 你知道哪些css模块化的方案？

## 题目要点

- **BEM (Block Element Modifier)**：一种CSS命名方法，通过块（Block）、元素（Element）和修饰符（Modifier）来组织CSS类名，以提高代码的可读性和可维护性。
- **SMACSS (Scalable and Modular Architecture for CSS)**：一种CSS组织方法，将样式分为五个类别：Base（基础样式）、Layout（布局样式）、Module（模块样式）、State（状态样式）和Theme（主题样式）。
- **OOCSS (Object-Oriented CSS)**：面向对象的CSS方法，通过创建可重用的样式对象来减少重复代码。
- **SUIT CSS**：遵循SMACSS原则，但更注重组件的独立性和可组合性。
- **CSS Modules**：一种将CSS类名局部化的方法，通常与构建工具（如Webpack）结合使用，以避免全局污染。
- **Styled-components**：一个用于React的CSS-in-JS库，允许你在JavaScript中写样式，并自动将类名局部化。
- **Styled-jsx**：Next.js框架中的CSS模块化方案，允许在JSX文件中写CSS，并自动局部化。
- **Tailwind CSS**：一个实用工具优先的CSS框架，通过预定义的类来构建设计，易于组合和重用。
- **Bulma**：一个基于Flexbox的CSS框架，提供了一套可组合的模块来构建响应式布局。
- **Foundation**：一个响应式前端框架，提供了一套预定义的组件和样式。
- **PostCSS**：一个CSS后处理器，可以与各种插件一起使用来实现CSS的模块化、优化和转译。

## 参考答案

目前主流的 css 模块化分为 css modules 和 css in js 两种方案。

## css modules

> CSS Modules 指的是我们像 import js 一样去引入我们的 css 代码，代码中的每一个类名都是引入对象的一个属性, 编译时会将 css 类名 加上唯一 hash。

css module 需要 webpack 配置 css-loader 或者 scss-loader , module 为 true

```
    loader: 'css-loader',
    options: {
        modules: true, // 开启模块化
        localIdentName: '[path][name]-[local]-[hash:base64:5]'
    }
}
```

介绍下 localIdentName 自定义生成的类名格式，可选参数有：

* [path]表示样式表相对于项目根目录所在的路径(默认不拼接)
* [name] 表示样式表文件名称
* [local] 表示样式表的类名定义名称
* [hash:length] 表示 32 位的 hash 值

注意：只有类名选择器和 ID 选择器才会被模块化控制，类似 `body`、`h2`、`span` 这些标签选择器不会被模块化控制。

### css module 作用域

* 作用域默认为 local 即只在当前模块生效
* global：被 `:global` 包裹起来的类名，不会被模块化

```css
:global(.global-color) {
  color: blue;
  :global(.common-width) {
    width: 200px;
  }
}
```

* 和外部样式混用

```js

// 使用classNames
const wrapperClassNames = classNames({
  'common-show': visible,
  'common-hide': !visible,
  [styles1['view-wrapper']]: true
});
<div className={wrapperClassNames}></div>;

// 使用模板字符串
<div className={`${styles1.content} ${styles1.color} common-show`}>
  我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容
</div>;
```

```
<div className={styles1['am-button-custom-wrapper']}>
  <Button type={'primary'} onClick={() => toggle()}>
     {visible ? '隐藏' : '显示'}
  </Button>
</div>

//  覆盖第三方UI库的 样式
.am-button-custom-wrapper {
  :global {
    .am-button-primary {
      color: red;
    }
  }
}
```

CSS-in-JS是一种技术（technique），而不是一个具体的库实现（library）。

简单来说CSS-in-JS就是将应用的CSS样式写在JavaScript文件里面，而不是独立为一些.css，.scss或者less之类的文件，这样你就可以在CSS中使用一些属于JS的诸如模块声明，变量定义，函数调用和条件判断等语言特性来提供灵活的可扩展的样式定义。

值得一提的是，虽然CSS-in-JS不是一种很新的技术，它当初的出现是因为一些component-based的Web框架（例如React，Vue和Angular）的逐渐流行，使得开发者也想将组件的CSS样式也一块封装到组件中去以解决原生CSS写法的一系列问题。

还有就是CSS-in-JS在React社区的热度是最高的，这是因为React本身不会管用户怎么去为组件定义样式的问题，而Vue和Angular都有属于框架自己的一套定义样式的方案。

实现了CSS-in-JS的库有很多，虽然每个库解决的问题都差不多，可是它们的实现方法和语法却大相径庭。

从实现方法上区分大体分为两种：唯一CSS选择器和内联样式（Unique Selector VS Inline Styles）。

接下来我们来分别看一下对应于这两种实现方式的两个比较有代表性的实现：styled-components和radium。

### Styled-components

通过styled-components，你可以使用ES6的标签模板字符串语法（Tagged Templates）为需要styled的Component定义一系列CSS属性，当该组件的JS代码被解析执行的时候，styled-components会动态生成一个CSS选择器，并把对应的CSS样式通过style标签的形式插入到head标签里面。

动态生成的CSS选择器会有一小段哈希值来保证全局唯一性来避免样式发生冲突。

```jsx
  width: '100%';
  height: 300;
  background-color: ${(props) => props.color};
`;

// 封装第三方组件库
const AntdButtonWrapper = styled(Button)`
  color: 'red';
`;

// 通过属性动态定义样式
const MyButton = styled.button`
  background: ${(props) => (props.primary ? 'palevioletred' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

// 样式复用
const TomatoButton = styled(MyButton)`
  color: tomato;
  border-color: tomato;
`;

// 创建关键帧
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
  `;

// 创建动画组件
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;
```

### Radium

Radium和styled-components的最大区别是它生成的是标签内联样式（inline styles）。

由于标签内联样式在处理诸如media query以及:hover，:focus，:active等和浏览器状态相关的样式的时候非常不方便，所以radium为这些样式封装了一些标准的接口以及抽象。

```jsx

const Button = () => (
    <button
        style={styles.base}>
        {this.props.children}
    </button>;
)

var styles = {
  red: {
    backgroundColor: 'red'
  }
};

Button = Radium(Button);
```

* 自带局部样式作用域的效果，无需额外的操作
* 内联样式的权重（specificity）是最高的，可以避免权重冲突的烦恼 
* 由于样式直接写在HTML中，十分方便开发者调试
