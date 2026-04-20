---
level: 2
---

# 在react中怎么实现组件间的过渡动画？

## 题目要点

### 1. **使用 React Transition Group**

#### 1.1 介绍 React Transition Group

- **定义**：`React Transition Group` 是 React 官方提供的一个用于处理组件过渡动画的库。它允许你在组件进入、退出或变化时添加过渡动画效果。
- **安装**：你可以通过 npm 或 yarn 安装：

     ```bash
     npm install react-transition-group
     ```

- **核心组件**：
  - **CSSTransition**：为单个元素添加过渡动画。
  - **TransitionGroup**：管理一组带动画的组件，可以实现多个组件之间的过渡效果。

#### 1.2 使用 CSSTransition 实现过渡动画

- **基本用法**：通过 `CSSTransition` 包裹需要动画的组件，配置 `timeout` 和 `classNames` 等属性。`classNames` 属性定义了动画的 CSS 类前缀，而 `timeout` 则是动画的持续时间。
- **示例**：

     ```javascript
     import React, { useState } from 'react';
     import { CSSTransition } from 'react-transition-group';
     import './styles.css';

     function MyComponent() {
       const [inProp, setInProp] = useState(false);

       return (
         <div>
           <CSSTransition in={inProp} timeout={300} classNames="fade">
             <div className="my-component">Hello, world!</div>
           </CSSTransition>
           <button onClick={() => setInProp(!inProp)}>Toggle</button>
         </div>
       );
     }

     export default MyComponent;
     ```

     **CSS**：

     ```css
     .fade-enter {
       opacity: 0;
     }
     .fade-enter-active {
       opacity: 1;
       transition: opacity 300ms;
     }
     .fade-exit {
       opacity: 1;
     }
     .fade-exit-active {
       opacity: 0;
       transition: opacity 300ms;
     }
     ```

#### 1.3 使用 TransitionGroup 实现组件列表的过渡

- **基本用法**：当你有一组组件需要进行过渡动画时，可以使用 `TransitionGroup` 来管理这些组件。它与 `CSSTransition` 结合使用，支持组件的添加、移除动画。
- **示例**：

     ```javascript
     import React, { useState } from 'react';
     import { TransitionGroup, CSSTransition } from 'react-transition-group';
     import './styles.css';

     function MyComponent() {
       const [items, setItems] = useState([1, 2, 3]);

       const addItem = () => {
         setItems([...items, items.length + 1]);
       };

       const removeItem = (index) => {
         setItems(items.filter((_, i) => i !== index));
       };

       return (
         <div>
           <button onClick={addItem}>Add Item</button>
           <TransitionGroup>
             {items.map((item, index) => (
               <CSSTransition key={item} timeout={300} classNames="fade">
                 <div>
                   Item {item} <button onClick={() => removeItem(index)}>Remove</button>
                 </div>
               </CSSTransition>
             ))}
           </TransitionGroup>
         </div>
       );
     }

     export default MyComponent;
     ```

### 2. **使用 Framer Motion**

#### 2.1 介绍 Framer Motion

- **定义**：`Framer Motion` 是一个强大的动画库，允许你轻松地为 React 组件添加动画效果。它不仅支持简单的过渡动画，还支持复杂的物理效果和路径动画。
- **安装**：

     ```bash
     npm install framer-motion
     ```

#### 2.2 使用 Framer Motion 实现过渡动画

- **基本用法**：通过 `motion` 组件来替代普通的 HTML 元素，并使用 `initial`、`animate` 和 `exit` 属性定义进入、更新和退出时的动画效果。
- **示例**：

     ```javascript
     import React, { useState } from 'react';
     import { motion, AnimatePresence } from 'framer-motion';

     function MyComponent() {
       const [isVisible, setIsVisible] = useState(true);

       return (
         <div>
           <AnimatePresence>
             {isVisible && (
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.5 }}
               >
                 Hello, world!
               </motion.div>
             )}
           </AnimatePresence>
           <button onClick={() => setIsVisible(!isVisible)}>Toggle</button>
         </div>
       );
     }

     export default MyComponent;
     ```

### 3. **使用 CSS 过渡和动画**

- **定义**：你也可以直接使用 CSS 的 `transition` 或 `animation` 属性来实现过渡效果。通过控制组件的 class 切换，来触发相应的 CSS 动画。
- **示例**：

     ```javascript
     function MyComponent() {
       const [isVisible, setIsVisible] = useState(false);

       return (
         <div>
           <div className={`box ${isVisible ? 'visible' : ''}`}>Hello, world!</div>
           <button onClick={() => setIsVisible(!isVisible)}>Toggle</button>
         </div>
       );
     }
     ```

     **CSS**：

     ```css
     .box {
       opacity: 0;
       transition: opacity 0.5s ease-in-out;
     }
     .box.visible {
       opacity: 1;
     }
     ```

### 4. **总结与注意事项**

- 选择适合的动画库或方法：根据项目的需求和复杂度，可以选择 `React Transition Group`、`Framer Motion` 或纯 CSS 进行动画实现。
- 性能优化：尽量减少不必要的重绘和重排，使用 `requestAnimationFrame` 进行复杂动画优化。

## 参考答案

## 一、是什么

在日常开发中，页面切换时的转场动画是比较基础的一个场景

当一个组件在显示与消失过程中存在过渡动画，可以很好的增加用户的体验

在`react`中实现过渡动画效果会有很多种选择，如`react-transition-group`，`react-motion`，`Animated`，以及原生的`CSS`都能完成切换动画


## 二、如何实现

在`react`中，`react-transition-group`是一种很好的解决方案，其为元素添加`enter`，`enter-active`，`exit`，`exit-active`这一系列勾子

可以帮助我们方便的实现组件的入场和离场动画

其主要提供了三个主要的组件：

- CSSTransition：在前端开发中，结合 CSS 来完成过渡动画效果
- SwitchTransition：两个组件显示和隐藏切换时，使用该组件
- TransitionGroup：将多个动画组件包裹在其中，一般用于列表中元素的动画

### CSSTransition

其实现动画的原理在于，当`CSSTransition`的`in`属性置为`true`时，`CSSTransition`首先会给其子组件加上`xxx-enter`、`xxx-enter-active`的`class`执行动画

当动画执行结束后，会移除两个`class`，并且添加`-enter-done`的`class`

所以可以利用这一点，通过`css`的`transition`属性，让元素在两个状态之间平滑过渡，从而得到相应的动画效果

当`in`属性置为`false`时，`CSSTransition`会给子组件加上`xxx-exit`和`xxx-exit-active`的`class`，然后开始执行动画，当动画结束后，移除两个`class`，然后添加`-enter-done`的`class`

如下例子：

```jsx

  state = {show: true};

  onToggle = () => this.setState({show: !this.state.show});

  render() {
    const {show} = this.state;
    return (
      <div className={'container'}>
        <div className={'square-wrapper'}>
          <CSSTransition
            in={show}
            timeout={500}
            classNames={'fade'}
            unmountOnExit={true}
          >
            <div className={'square'} />
          </CSSTransition>
        </div>
        <Button onClick={this.onToggle}>toggle</Button>
      </div>
    );
  }
}
```

```css
  opacity: 0;
  transform: translateX(100%);
}

.fade-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 500ms;
}

.fade-exit {
  opacity: 1;
  transform: translateX(0);
}

.fade-exit-active {
  opacity: 0;
  transform: translateX(-100%);
  transition: all 500ms;
}
```

`SwitchTransition`可以完成两个组件之间切换的炫酷动画

比如有一个按钮需要在`on`和`off`之间切换，我们希望看到`on`先从左侧退出，`off`再从右侧进入

`SwitchTransition`中主要有一个属性`mode`，对应两个值：

- in-out：表示新组件先进入，旧组件再移除；
- out-in：表示就组件先移除，新组建再进入

`SwitchTransition`组件里面要有`CSSTransition`，不能直接包裹你想要切换的组件

里面的`CSSTransition`组件不再像以前那样接受`in`属性来判断元素是何种状态，取而代之的是`key`属性

下面给出一个按钮入场和出场的示例，如下：

```jsx

export default class SwitchAnimation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOn: true
    }
  }

  render() {
    const {isOn} = this.state;

    return (
      <SwitchTransition mode="out-in">
        <CSSTransition classNames="btn"
                       timeout={500}
                       key={isOn ? "on" : "off"}>
          {
          <button onClick={this.btnClick.bind(this)}>
            {isOn ? "on": "off"}
          </button>
        }
        </CSSTransition>
      </SwitchTransition>
    )
  }

  btnClick() {
    this.setState({isOn: !this.state.isOn})
  }
}
```

```css
  transform: translate(100%, 0);
  opacity: 0;
}

.btn-enter-active {
  transform: translate(0, 0);
  opacity: 1;
  transition: all 500ms;
}

.btn-exit {
  transform: translate(0, 0);
  opacity: 1;
}

.btn-exit-active {
  transform: translate(-100%, 0);
  opacity: 0;
  transition: all 500ms;
}
```

当有一组动画的时候，就可将这些`CSSTransition`放入到一个`TransitionGroup`中来完成动画

同样`CSSTransition`里面没有`in`属性，用到了`key`属性

`TransitionGroup`在感知`children`发生变化的时候，先保存移除的节点，当动画结束后才真正移除

其处理方式如下：

- 插入的节点，先渲染dom，然后再做动画

- 删除的节点，先做动画，然后再删除dom

如下：

```jsx
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default class GroupAnimation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      friends: []
    }
  }

  render() {
    return (
      <div>
        <TransitionGroup>
          {
            this.state.friends.map((item, index) => {
              return (
                <CSSTransition classNames="friend" timeout={300} key={index}>
                  <div>{item}</div>
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>
        <button onClick={e => this.addFriend()}>+friend</button>
      </div>
    )
  }

  addFriend() {
    this.setState({
      friends: [...this.state.friends, "coderwhy"]
    })
  }
}
```

```css
    transform: translate(100%, 0);
    opacity: 0;
}

.friend-enter-active {
    transform: translate(0, 0);
    opacity: 1;
    transition: all 500ms;
}

.friend-exit {
    transform: translate(0, 0);
    opacity: 1;
}

.friend-exit-active {
    transform: translate(-100%, 0);
    opacity: 0;
    transition: all 500ms;
}
```
