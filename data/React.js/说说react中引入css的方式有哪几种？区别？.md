---
level: 1.5
---

# 说说react中引入css的方式有哪几种？区别？

## 题目要点

### 1. **传统的 CSS 引入**

#### 1.1 全局 CSS 文件

- **定义**：在应用的入口文件（如 `index.js` 或 `App.js`）中引入全局 CSS 文件。
- **用法**：

     ```javascript
     import './styles.css';
     ```

- **特点**：
  - **全局作用**：所有样式在整个应用中都是全局的，可能导致样式冲突。
  - **简单**：适用于简单应用或不需要模块化的场景。

#### 1.2 在组件内直接引入 CSS

- **定义**：在每个组件的文件中引入 CSS 文件，使组件具有独立的样式。
- **用法**：

     ```javascript
     import './Component.css';

     function MyComponent() {
       return <div className="my-component">Hello</div>;
     }
     ```

- **特点**：
  - **局部作用**：每个组件可以有自己的 CSS 文件，避免了全局样式冲突的问题。
  - **样式管理**：在组件文件夹内管理样式，使得样式与组件紧密关联。

### 2. **CSS Modules**

#### 2.1 定义

- **定义**：CSS Modules 是一种 CSS 模块化的解决方案，通过自动生成唯一的类名来避免样式冲突。
- **用法**：

     ```javascript
     import styles from './Component.module.css';

     function MyComponent() {
       return <div className={styles.myComponent}>Hello</div>;
     }
     ```

- **特点**：
  - **局部作用**：CSS Modules 的样式是局部的，只作用于当前组件，避免了全局样式冲突。
  - **类名自动生成**：类名在编译时会被自动生成唯一标识，避免命名冲突。

### 3. **Styled Components**

#### 3.1 定义

- **定义**：`Styled Components` 是一个流行的 CSS-in-JS 库，它允许在 JavaScript 文件中直接编写 CSS。
- **用法**：

     ```javascript
     import styled from 'styled-components';

     const Button = styled.button`
       background: blue;
       color: white;
       padding: 10px;
     `;

     function MyComponent() {
       return <Button>Click me</Button>;
     }
     ```

- **特点**：
  - **组件化**：样式与组件逻辑紧密结合，样式定义在 JavaScript 文件中。
  - **动态样式**：支持动态样式，使用 props 可以动态更改样式。
  - **自动处理前缀**：自动处理浏览器前缀，确保样式兼容性。

### 4. **Emotion**

#### 4.1 定义

- **定义**：`Emotion` 是另一个流行的 CSS-in-JS 库，与 `Styled Components` 类似，但提供了更多的功能和灵活性。
- **用法**：

     ```javascript
     /** @jsxImportSource @emotion/react */
     import { css } from '@emotion/react';

     const buttonStyle = css`
       background: blue;
       color: white;
       padding: 10px;
     `;

     function MyComponent() {
       return <button css={buttonStyle}>Click me</button>;
     }
     ```

- **特点**：
  - **灵活性**：提供了类似的功能，如动态样式和自动处理浏览器前缀。
  - **轻量**：相较于 `Styled Components`，可能在某些场景下更轻量。

### 5. **Tailwind CSS**

#### 5.1 定义

- **定义**：`Tailwind CSS` 是一个实用的 CSS 框架，通过原子化的 CSS 类来快速构建样式。
- **用法**：

     ```javascript
     function MyComponent() {
       return <div className="bg-blue-500 text-white p-4">Hello</div>;
     }
     ```

- **特点**：
  - **原子化**：提供大量的原子化 CSS 类，方便快速构建样式。
  - **高可配置性**：可以自定义配置文件，生成符合需求的样式类。
  - **开发效率**：提高开发效率，但可能增加 HTML 文件的类名复杂度。

### 6. **CSS-in-JS**

#### 6.1 定义

- **定义**：CSS-in-JS 是一种将 CSS 直接嵌入到 JavaScript 文件中的方法，可以使用 JavaScript 的功能来动态控制样式。
- **用法**：通过库（如 `Styled Components` 和 `Emotion`）或手动实现。
- **特点**：
  - **动态样式**：可以根据组件的状态或 props 动态生成样式。
  - **样式管理**：样式与组件逻辑紧密结合，便于维护和管理。

### 7. **区别总结**

- **全局 CSS**：简单，但可能导致样式冲突和难以维护。
- **CSS Modules**：样式局部化，避免样式冲突，更适合大型项目。
- **Styled Components 和 Emotion**：CSS-in-JS 方案，支持动态样式和组件化，适合需要高度自定义和动态样式的场景。
- **Tailwind CSS**：原子化 CSS 框架，适合需要快速构建 UI 的项目，但可能导致 HTML 类名复杂。

根据项目需求、团队偏好和具体场景选择合适的 CSS 引入方式，可以提高开发效率和代码可维护性。

## 参考答案

## 一、是什么

组件式开发选择合适的`css`解决方案尤为重要

通常会遵循以下规则：

- 可以编写局部css，不会随意污染其他组件内的原生；
- 可以编写动态的css，可以获取当前组件的一些状态，根据状态的变化生成不同的css样式；
- 支持所有的css特性：伪类、动画、媒体查询等；
- 编写起来简洁方便、最好符合一贯的css风格特点

在这一方面，`vue`使用`css`起来更为简洁：

- 通过 style 标签编写样式
- scoped 属性决定编写的样式是否局部有效
- lang 属性设置预处理器
- 内联样式风格的方式来根据最新状态设置和改变css

而在`react`中，引入`CSS`就不如`Vue`方便简洁，其引入`css`的方式有很多种，各有利弊


## 二、方式

常见的`CSS`引入方式有以下：

- 在组件内直接使用
- 组件中引入 .css 文件
- 组件中引入 .module.css 文件
- CSS in JS


### 在组件内直接使用

直接在组件中书写`css`样式，通过`style`属性直接引入，如下：

```js

const div1 = {
  width: "300px",
  margin: "30px auto",
  backgroundColor: "#44014C",  //驼峰法
  minHeight: "200px",
  boxSizing: "border-box"
};

class Test extends Component {
  constructor(props, context) {
    super(props);
  }
 
  render() {
    return (
     <div>
       <div style={div1}>123</div>
       <div style={{backgroundColor:"red"}}>
     </div>
    );
  }
}

export default Test;
```

这种方式优点：

- 内联样式, 样式之间不会有冲突
- 可以动态获取当前state中的状态

缺点：

- 写法上都需要使用驼峰标识

- 某些样式没有提示

- 大量的样式, 代码混乱

- 某些样式无法编写(比如伪类/伪元素)

 

### 组件中引入css文件

将`css`单独写在一个`css`文件中，然后在组件中直接引入

`App.css`文件：

```css
  color: red;
  font-size: 20px;
}

.desc {
  color: green;
  text-decoration: underline;
}
```

```js

import Home from './Home';

import './App.css';

export default class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <h2 className="title">我是App的标题</h2>
        <p className="desc">我是App中的一段文字描述</p >
        <Home/>
      </div>
    )
  }
}
```



### 组件中引入 .module.css 文件

将`css`文件作为一个模块引入，这个模块中的所有`css`，只作用于当前组件。不会影响当前组件的后代组件

这种方式是`webpack`特工的方案，只需要配置`webpack`配置文件中`modules:true`即可

```jsx

import Home from './Home';

import './App.module.css';

export default class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <h2 className="title">我是App的标题</h2>
        <p className="desc">我是App中的一段文字描述</p >
        <Home/>
      </div>
    )
  }
}
```

- 引用的类名，不能使用连接符(.xxx-xx)，在 JavaScript 中是不识别的
- 所有的 className 都必须使用 {style.className} 的形式来编写
- 不方便动态来修改某些样式，依然需要使用内联样式的方式；



### CSS in JS

CSS-in-JS， 是指一种模式，其中` CSS `由 `JavaScript `生成而不是在外部文件中定义

此功能并不是 React 的一部分，而是由第三方库提供，例如：

- styled-components
- emotion
- glamorous



下面主要看看`styled-components`的基本使用

本质是通过函数的调用，最终创建出一个组件：

- 这个组件会被自动添加上一个不重复的class
- styled-components会给该class添加相关的样式

基本使用如下：

创建一个`style.js`文件用于存放样式组件：

```js
  height: 50px;
  border: 1px solid red;
  color: yellow;
`;

export const SelfButton = styled.div`
  height: 150px;
  width: 150px;
  color: ${props => props.color};
  background-image: url(${props => props.src});
  background-size: 150px 150px;
`;
```

```jsx

import { SelfLink, SelfButton } from "./style";

class Test extends Component {
  constructor(props, context) {
    super(props);
  }  
 
  render() {
    return (
     <div>
       <SelfLink title="People's Republic of China">app.js</SelfLink>
       <SelfButton color="palevioletred" style={{ color: "pink" }} src={fist}>
          SelfButton
        </SelfButton>
     </div>
    );
  }
}

export default Test;
```

通过上面四种样式的引入，可以看到：

- 在组件内直接使用`css`该方式编写方便，容易能够根据状态修改样式属性，但是大量的演示编写容易导致代码混乱
- 组件中引入 .css 文件符合我们日常的编写习惯，但是作用域是全局的，样式之间会层叠
- 引入.module.css 文件能够解决局部作用域问题，但是不方便动态修改样式，需要使用内联的方式进行样式的编写

- 通过css in js 这种方法，可以满足大部分场景的应用，可以类似于预处理器一样样式嵌套、定义、修改状态等

至于使用`react`用哪种方案引入`css`，并没有一个绝对的答案，可以根据各自情况选择合适的方案
