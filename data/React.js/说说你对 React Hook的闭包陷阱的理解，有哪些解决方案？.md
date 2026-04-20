---
level: 4
---

# 说说你对 React Hook的闭包陷阱的理解，有哪些解决方案？

## 题目要点

React Hook 的闭包陷阱是一个常见的问题,它发生在使用 Hook 时,特别是在处理事件处理函数或异步操作时。

闭包陷阱的本质是,在 Hook 内部定义的函数会捕获 Hook 函数执行时的状态,而不是最新的状态。这可能会导致一些意想不到的行为,比如事件处理函数无法访问最新的状态,或者异步操作使用了过期的数据。

造成这个问题的原因是,React Hook 的设计使得组件函数在每次渲染时都会重新定义内部的函数,而这些函数会关闭当时的状态。

解决这个问题的主要方案有以下几种:

1. **使用 useCallback Hook**:
   - `useCallback` 可以缓存函数引用,确保函数在依赖项不变的情况下保持不变。
   - 这样可以确保事件处理函数访问的是最新的状态。

2. **使用 useRef 保存引用**:
   - 可以使用 `useRef` Hook 保存状态的引用,并在需要访问最新状态时使用 `ref.current`。
   - 这样可以确保即使在事件处理函数或异步操作中,也能访问到最新的状态。

3. **使用 dependency array 进行优化**:
   - 在使用 `useEffect`、`useCallback` 等 Hook 时,仔细检查依赖项数组,确保它包含了所有需要的依赖项。
   - 这样可以确保 Hook 内部的函数能访问到最新的状态。

4. **使用 React 18 的 `useTransition` Hook**:
   - React 18 引入了 `useTransition` Hook,可以帮助开发者更好地控制状态更新的优先级。
   - 这样可以避免一些异步操作使用过期状态的问题。

5. **使用 ESLint 插件检查**:
   - 可以使用 ESLint 插件,如 `exhaustive-deps`,自动检查 Hook 依赖项的完整性。
   - 这可以帮助开发者及早发现闭包陷阱问题。

## 参考答案

本文从 一个hooks中 “奇怪”（其实符合逻辑） 的 “闭包陷阱” 的场景切入，试图讲清楚其背后的因果。同时，在许多 react hooks 奇技淫巧的文章里，也能看到 `useRef` 的身影，那么为什么使用 `useRef` 又能摆脱 这个 “闭包陷阱” ？ 搞清楚这些问题，将能较大的提升对 react hooks 的理解。

react hooks 一出现便受到了许多开发人员的追捧,或许在使用react hooks 的时候遇到 “闭包陷阱” 是每个开发人员在开发的时候都遇到过的事情，有的两眼懵逼、有的则稳如老狗瞬间就定义到了问题出现在何处。

(以下react示范demo，均为react 16.8.3 版本)

你一定遭遇过以下这个场景：
```js
    const [count, setCount] = useState(1);
    useEffect(()=>{
        setInterval(()=>{
            console.log(count)
        }, 1000)
    }, [])
}
```

## 1、一个熟悉的闭包场景

首先从一个各位jser都很熟悉的场景入手。
```js
    setTimeout(()=>{
        console.log(i)
    }, 0)
}
```
```js
   (function(i){
         setTimeout(()=>{
            console.log(i)
        }, 0)
   })(i)
}
```

其实，`useEffect` 的哪个场景的原因，跟这个，简直是一样的，**`useEffect` 闭包陷阱场景的出现，是 react 组件更新流程以及 `useEffect` 的实现的自然而然结果**。

## 2 浅谈hooks原理，理解useEffect 的 “闭包陷阱” 出现原因。

首先，可能都听过react的 Fiber 架构，其实可以认为一个 Fiber节点就对应的是一个组件。对于 `classComponent` 而言，有 `state` 是一件很正常的事情，Fiber对象上有一个 `memoizedState` 用于存放组件的 `state`。ok，现在看 hooks 所针对的 `FunctionComponnet`。 无论开发者怎么折腾，一个对象都只能有一个 `state` 属性或者 `memoizedState`  属性，可是，谁知道可爱的开发者们会在 `FunctionComponent` 里写上多少个 `useState`，`useEffect` 等等 ? 所以，react用了链表这种数据结构来存储 `FunctionComponent` 里面的 hooks。比如：

```js
    const [count, setCount] = useState(1)
    const [name, setName] = useState('chechengyi')
    useEffect(()=>{
        
    }, [])
    const text = useMemo(()=>{
        return 'ddd'
    }, [])
}
```

```ts
  memoizedState: any,
  baseState: any,
  baseUpdate: Update<any, any> | null,
  queue: UpdateQueue<any, any> | null,
  next: Hook | null,
};
```
![](https://static.ecool.fun//article/7ca47e0d-4dad-4b07-86a4-5c399aec8b77.jpeg)

这个对象的`memoizedState`属性就是用来存储组件上一次更新后的 `state`,`next`毫无疑问是指向下一个hook对象。在组件更新的过程中，hooks函数执行的顺序是不变的，就可以根据这个链表拿到当前hooks对应的`Hook`对象，函数式组件就是这样拥有了state的能力。当前，具体的实现肯定比这三言两语复杂很多。

所以，知道为什么不能将hooks写到if else语句中了把？因为这样可能会导致顺序错乱，导致当前hooks拿到的不是自己对应的Hook对象。

`useEffect` 接收了两个参数，一个回调函数和一个数组。数组里面就是 `useEffect` 的依赖，当为 [] 的时候，回调函数只会在组件第一次渲染的时候执行一次。如果有依赖其他项，react 会判断其依赖是否改变，如果改变了就会执行回调函数。说回最初的场景：
```js
    const [count, setCount] = useState(1);
    useEffect(()=>{
        setInterval(()=>{
            console.log(count)
        }, 1000)
    }, [])
    function click(){ setCount(2) }
}
```

接着想象如果 `click` 函数被触发了，调用 `setCount(2)` 肯定会触发react的更新，更新到当前组件的时候也是执行 `App()`，之前说的链表已经形成了哈，此时 `useState` 将 `Hook` 对象 上保存的状态置为2， 那么此时 `count` 也为2了。然后在执行 `useEffect` 由于依赖数组是一个空的数组，所以此时回调并不会被执行。

ok，这次更新的过程中根本就没有涉及到这个定时器，这个定时器还在坚持的，默默的，每隔1s打印一次 `count`。 注意这里打印的 `count` ，是组件第一次渲染的时候 `App()` 时的 `count`， `count`的值为1，**因为在定时器的回调函数里面被引用了，形成了闭包一直被保存**。


## 2 难道真的要在依赖数组里写上的值，才能拿到新鲜的值？
仿佛都习惯性都去认为，只有在依赖数组里写上我们所需要的值，才能在更新的过程中拿到最新鲜的值。那么看一下这个场景：
```jsx
  return <Demo1 />
}

function Demo1(){
  const [num1, setNum1] = useState(1)
  const [num2, setNum2] = useState(10)

  const text = useMemo(()=>{
    return `num1: ${num1} | num2:${num2}`
  }, [num2])

  function handClick(){
    setNum1(2)
    setNum2(20)
  }

  return (
    <div>
      {text}
      <div><button onClick={handClick}>click!</button></div>
    </div>
  )
}
```

如果你装了 `react` 的 eslint 插件，这里也许会提示你错误，因为在text中你使用了 num1 却没有在依赖数组中添加它。 但是执行这段代码会发现，是可以正常拿到num1最新鲜的值的。

如果理解了之前第一点说的“闭包陷阱”问题，肯定也能理解这个问题。

为什么呢，再说一遍，这个依赖数组存在的意义，是react为了判定，在**本次更新**中，是否需要执行其中的回调函数，这里依赖了的num2，而num2改变了。回调函数自然会执行， 这时形成的闭包引用的就是最新的num1和num2，所以，自然能够拿到新鲜的值。问题的关键，在于回调函数执行的时机，闭包就像是一个照相机，把回调函数执行的那个时机的那些值保存了下来。之前说的定时器的回调函数我想就像是一个从1000年前穿越到现代的人，虽然来到了现代，但是身上的血液、头发都是1000年前的。

## 3 为什么使用useRef能够每次拿到新鲜的值？
大白话说：因为初始化的 `useRef` 执行之后，返回的都是同一个对象。写到这里宝宝又不禁回忆起刚学js那会儿，捧着红宝书啃时候的场景了：

```js
var B = A
B.name = 'baobao'
console.log(A.name) // baobao
```

也就是说，在组件每一次渲染的过程中。 比如 `ref = useRef()` 所返回的都是同一个对象，每次组件更新所生成的`ref`指向的都是同一片内存空间， 那么当然能够每次都拿到最新鲜的值了。犬夜叉看过把？一口古井连接了现代世界与500年前的战国时代，这个同一个对象也将这些个被保存于不同闭包时机的变量了联系了起来。

使用一个例子或许好理解一点：
```js
let isC = false
let isInit = true; // 模拟组件第一次加载
let ref = {
	current: null
}

function useEffect(cb){
// 这里用来模拟 useEffect 依赖为 [] 的时候只执行一次。
if (isC) return
isC = true
cb()
}

function useRef(value){
// 组件是第一次加载的话设置值 否则直接返回对象
	if ( isInit ) {
		ref.current = value
		isInit = false
	}
	return ref
}

function App(){
	let ref_ = useRef(1)
	ref_.current++
	useEffect(()=>{
		setInterval(()=>{
			console.log(ref.current) // 3
		}, 2000)
	})
}

// 连续执行两次 第一次组件加载 第二次组件更新
App()
App()
```

```jsx
  // return <Demo1 />
  return <Demo2 />
}

function Demo2(){
  const [obj, setObj] = useState({name: 'chechengyi'})

  useEffect(()=>{
    setInterval(()=>{
      console.log(obj)
    }, 2000)
  }, [])
  
  function handClick(){
    setObj((prevState)=> {
      var nowObj = Object.assign(prevState, {
        name: 'baobao',
        age: 24
      })
      console.log(nowObj == prevState)
      return nowObj
    })
  }
  return (
    <div>
      <div>
        <span>name: {obj.name} | age: {obj.age}</span>
        <div><button onClick={handClick}>click!</button></div>
      </div>
    </div>
  )
}
```

执行这段代码发现，确实点击button后，定时器打印的值也变成了：
```js
    name: 'baobao',
    age: 24 
}
```
