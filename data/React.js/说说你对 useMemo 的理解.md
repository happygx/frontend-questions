---
level: 1
---

# 说说你对 useMemo 的理解

## 题目要点

`useMemo` 是 React Hooks 中的一个非常有用的 Hook,它可以帮助我们进行性能优化。

`useMemo` 的作用是:

1. **缓存计算结果**
   - `useMemo` 允许我们缓存一个需要计算的值,只有当它的依赖项发生变化时,才会重新计算并返回新的值。这可以避免不必要的重复计算,提高性能。

2. **避免不必要的re-render**
   - 通过缓存计算结果,`useMemo` 可以避免子组件不必要的re-render,提高整体应用的性能。

`useMemo` 的基本使用方式如下:

```javascript
```
  1. 一个函数,返回需要缓存的值。这个函数会在依赖项发生变化时才会被调用。
  2. 一个依赖项数组,用于指定哪些值的变化会触发重新计算。

`useMemo` 的常见使用场景包括:

1. **记忆化昂贵的计算**
   - 如果一个函数的计算比较昂贵,可以使用 `useMemo` 缓存计算结果,避免重复计算。

2. **避免不必要的re-render**
   - 如果一个组件的渲染依赖一个复杂的对象或数组,使用 `useMemo` 缓存该值,可以避免不必要的re-render。

3. **性能优化**
   - 在处理大量数据,或复杂计算的场景下,使用 `useMemo` 进行性能优化非常有帮助。

需要注意的是,过度使用 `useMemo` 也可能会带来问题,比如增加复杂度和潜在的内存泄漏。因此在使用 `useMemo` 时,需要权衡利弊,只在确实需要提高性能的场景下使用。

 `useMemo` 是一个非常有用的 Hook,可以帮助我们缓存计算结果,避免不必要的re-render,提高应用的整体性能。合理地使用 `useMemo` 是 React 开发中的一项重要技能。

## 参考答案

# Memo
在class的时代，我们一般是通过pureComponent来对数据进行一次浅比较，引入Hook特性后，我们可以使用Memo进行性能提升。

在此之前，我们来做一个实验
```js
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [n, setN] = useState(0);
  const [m, setM] = useState(10);
  console.log("执行最外层盒子了");
  return (
    <>
      <div>
        最外层盒子
        <Child1 value={n} />
        <Child2 value={m} />
        <button
          onClick={() => {
            setN(n + 1);
          }}
        >
          n+1
        </button>
        <button
          onClick={() => {
            setM(m + 1);
          }}
        >
          m+1
        </button>
      </div>
    </>
  );
}
function Child1(props) {
  console.log("执行子组件1了");
  return <div>子组件1上的n：{props.value}</div>;
}
function Child2(props) {
  console.log("执行子组件2了");
  return <div>子组件2上的m：{props.value}</div>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

```!
执行最外层盒子了 
执行子组件1了 
执行子组件2了 
```

![](https://static.ecool.fun//article/0b7a9878-a44f-48eb-b9da-b647d4d56570.jpeg)

# 使用Memo优化
当我点击n+1按钮时，此时state里面的n必然+1，也会重新引发render渲染，并把新的n更新到视图中。
![](https://static.ecool.fun//article/8b79158a-ca60-4675-9939-c10d391cc5f0.jpeg)
我们再看控制台
```!
执行最外层盒子了 
执行子组件1了 
执行子组件2了 
+ 执行最外层盒子了 
+ 执行子组件1了 
+ 执行子组件2了 //为什么组件2也渲染了，里面的m没有变化 
```

如何优化？我们可以使用`memo`把子组件改成以下代码
```js
  console.log("执行子组件1了");
  return <div>子组件1上的n：{props.value}</div>;
});

const Child2 = React.memo((props) => {
  console.log("执行子组件2了");
  return <div>子组件2上的m：{props.value}</div>;
});
```
```!
执行最外层盒子了 
执行子组件1了 
执行子组件2了 
+ 执行最外层盒子了 
+ 执行子组件1了 
```

这样的话react就会只执行对应state变化的组件，而没有变化的组件，则复用上一次的函数，也许memo也有memory的意思，代表记忆上一次的函数，不重新执行（我瞎猜的- -！！）

# 出现bug
上面的代码虽然已经优化好了性能，但是会有一个bug

上面的代码是由父组件控制`<button>`的，如果我把控制state的函数传递给子组件，会怎样呢？
```html
```
```!
执行最外层盒子了 
执行子组件1了 
执行子组件2了 
+ 执行最外层盒子了 
+ 执行子组件1了 
+ 执行子组件2了 
```

为什么会这样？因为App重新执行了，它会修改addM函数的地址（函数是复杂数据类型），而addM又作为props传递给子组件2，那么就会引发子组件2函数的重新执行。

# useMemo
这时候就要用useMemo解决问题。

`useMemo(()=>{},[])`

useMemo接收两个参数，分别是函数和一个数组（实际上是依赖），函数里return 函数,数组内存放依赖。
```js
    return () => {
      setM({ m: m.m + 1 });
    };
  }, [m]); //表示监控m变化
```

# useCallback
上面的代码很奇怪有没有
```js
    return () => {
      setM({ m: m.m + 1 });
    };
  }, [m])
```
```javascript
    setM({ m: m.m + 1 });
  }, [m]);
```

# 最终代码

```js
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [n, setN] = useState(0);
  const [m, setM] = useState({ m: 1 });
  console.log("执行最外层盒子了");
  const addN = useMemo(() => {
    return () => {
      setN(n + 1);
    };
  }, [n]);
  const addM = useCallback(() => {
    setM({ m: m.m + 1 });
  }, [m]);
  return (
    <>
      <div>
        最外层盒子
        <Child1 value={n} click={addN} />
        <Child2 value={m} click={addM} />
        <button onClick={addN}>n+1</button>
        <button onClick={addM}>m+1</button>
      </div>
    </>
  );
}
const Child1 = React.memo((props) => {
  console.log("执行子组件1了");
  return <div>子组件1上的n：{props.value}</div>;
});

const Child2 = React.memo((props) => {
  console.log("执行子组件2了");
  return <div>子组件2上的m：{props.value.m}</div>;
});

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```
* 使用`memo`可以帮助我们优化性能，让`react`没必要执行不必要的函数
* 由于复杂数据类型的地址可能发生改变，于是传递给子组件的`props`也会发生变化，这样还是会执行不必要的函数，所以就用到了`useMemo`这个api
* `useCallback`是`useMemo`的语法糖
