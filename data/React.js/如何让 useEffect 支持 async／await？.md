---
level: 4
---

# 如何让 useEffect 支持 async/await？

## 题目要点

React 的 `useEffect` Hook 不支持直接使用 `async/await`。这是因为 `useEffect` 的回调函数必须返回一个清理函数(可选),而 `async` 函数会隐式地返回一个 Promise。

但是,您可以通过以下几种方式在 `useEffect` 中使用 `async/await`:

1. **在 useEffect 内部定义 async 函数**:

```javascript
  async function fetchData() {
    const data = await fetchSomeData();
    // 使用 data 进行其他操作
  }
  fetchData();

  // 返回清理函数
  return () => {
    // 清理逻辑
  };
}, []);
```

2. **使用 useCallback 与 useEffect 组合**:

```javascript
  const data = await fetchSomeData();
  // 使用 data 进行其他操作
}, []);

useEffect(() => {
  memoizedFetchData();

  // 返回清理函数
  return () => {
    // 清理逻辑
  };
}, [memoizedFetchData]);
```

3. **使用 Promise 链**:

```javascript
  let isSubscribed = true;

  fetchSomeData()
    .then((data) => {
      if (isSubscribed) {
        // 使用 data 进行其他操作
      }
    })
    .catch((error) => {
      if (isSubscribed) {
        // 处理错误
      }
    });

  return () => {
    isSubscribed = false;
    // 清理逻辑
  };
}, []);
```

虽然 `useEffect` 本身不支持 `async/await`，但是您可以通过上述几种方式来在 `useEffect` 中使用异步操作。选择哪种方式取决于具体的需求和个人编码风格。

## 参考答案

大家在使用 `useEffect` 的时候，假如回调函数中使用 `async...await...` 的时候，会报错如下。

![](https://static.ecool.fun//article/80b204af-8c56-4a16-9f8e-9dcb668df746.jpeg)


看报错，我们知道 `effect function` 应该返回一个销毁函数（`return`返回的 `cleanup` 函数），如果 `useEffect` 第一个参数传入 `async`，返回值则变成了 `Promise`，会导致 `react` 在调用销毁函数的时候报错**。

## React 为什么要这么做？
`useEffect` 作为 `Hooks` 中一个很重要的 `Hooks`，可以让你在函数组件中执行副作用操作。

它能够完成之前 `Class Component` 中的生命周期的职责。它返回的函数的执行时机如下：

- 首次渲染不会进行清理，会在下一次渲染，清除上一次的副作用。
- 卸载阶段也会执行清除操作。

不管是哪个，我们都不希望这个返回值是异步的，这样我们无法预知代码的执行情况，很容易出现难以定位的 Bug。

所以 React 就直接限制了不能 useEffect 回调函数中不能支持 async...await...

## useEffect 怎么支持 async...await...

竟然 useEffect 的回调函数不能使用 `async...await`，那我直接在它内部使用。

做法一：创建一个异步函数（`async...await` 的方式），然后执行该函数。

```js
  const asyncFun = async () => {
    setPass(await mockCheck());
  };
  asyncFun();
}, []);
```

```js
  (async () => {
    setPass(await mockCheck());
  })();
}, []);
```

既然知道了怎么解决，我们完全可以将其封装成一个 hook，让使用更加的优雅。我们来看下 ahooks 的 `useAsyncEffect`，它支持所有的异步写法，包括 `generator function`。

思路跟上面一样，入参跟 useEffect 一样，一个回调函数（不过这个回调函数支持异步），另外一个依赖项 deps。**内部还是 useEffect，将异步的逻辑放入到它的回调函数里面。**

```js
  effect: () => AsyncGenerator<void, void, void> | Promise<void>,
  // 依赖项
  deps?: DependencyList,
) {
  // 判断是 AsyncGenerator
  function isAsyncGenerator(
    val: AsyncGenerator<void, void, void> | Promise<void>,
  ): val is AsyncGenerator<void, void, void> {
    // Symbol.asyncIterator: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator
    // Symbol.asyncIterator 符号指定了一个对象的默认异步迭代器。如果一个对象设置了这个属性，它就是异步可迭代对象，可用于for await...of循环。
    return isFunction(val[Symbol.asyncIterator]);
  }
  useEffect(() => {
    const e = effect();
    // 这个标识可以通过 yield 语句可以增加一些检查点
    // 如果发现当前 effect 已经被清理，会停止继续往下执行。
    let cancelled = false;
    // 执行函数
    async function execute() {
      // 如果是 Generator 异步函数，则通过 next() 的方式全部执行
      if (isAsyncGenerator(e)) {
        while (true) {
          const result = await e.next();
          // Generate function 全部执行完成
          // 或者当前的 effect 已经被清理
          if (result.done || cancelled) {
            break;
          }
        }
      } else {
        await e;
      }
    }
    execute();
    return () => {
      // 当前 effect 已经被清理
      cancelled = true;
    };
  }, deps);
}
```
它的作用是**中断执行**。
> 通过 `yield` 语句可以增加一些检查点，如果发现当前 `effect` 已经被清理，会停止继续往下执行。

试想一下，有一个场景，用户频繁的操作，可能现在这一轮操作 a 执行还没完成，就已经开始开始下一轮操作 b。这个时候，操作 a 的逻辑已经失去了作用了，那么我们就可以停止往后执行，直接进入下一轮操作 b 的逻辑执行。这个 `cancelled` 就是用来取消当前正在执行的一个标识符。

## 还可以支持 useEffect 的清除机制么？
可以看到上面的 `useAsyncEffect`，内部的 `useEffect` 返回函数只返回了如下：

```js
  // 当前 effect 已经被清理
  cancelled = true;
};
```

你可能会觉得，我们将 `effect`(`useAsyncEffect` 的回调函数)的结果，放入到 `useAsyncEffect` 中不就可以了？

实现最终类似如下：

```js
  return useEffect(() => {
    const cleanupPromise = effect()
    return () => { cleanupPromise.then(cleanup => cleanup && cleanup()) }
  }, dependencies)
}
```

![](https://static.ecool.fun//article/64a79134-5af9-4a55-9a84-4376a94d5149.jpeg)


他认为这种**延迟清除机制**是不对的，应该是一种**取消机制**。否则，在钩子已经被取消之后，回调函数仍然有机会对外部状态产生影响。他的实现和例子我也贴一下，跟 `useAsyncEffect` 其实思路是一样的，如下：

实现：
```
  return useEffect(() => {
    let canceled = false;
    effect(() => canceled);
    return () => { canceled = true; }
  }, dependencies)
}
```
```js
  const result = await doSomeAsyncStuff(stuffId);
  if (!isCanceled()) {
    // TODO: Still OK to do some effect, useEffect hasn't been canceled yet.
  }
}, [stuffId]);
```


## 总结与思考
由于 `useEffect` 是在函数式组件中承担执行副作用操作的职责，它的返回值的执行操作应该是可以预期的，而不能是一个异步函数，所以不支持回调函数 `async...await` 的写法。

我们可以将 `async...await` 的逻辑封装在 `useEffect` 回调函数的内部，这就是 ahooks `useAsyncEffect` 的实现思路，而且它的范围更加广，它支持的是所有的异步函数，包括 `generator function`。
