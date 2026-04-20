---
level: 1
---

# 说说你对自定义hook的理解

## 题目要点

自定义 Hook 是 React 16.8 引入 Hooks 之后非常强大的特性之一。它允许开发者将可重用的逻辑抽象为可复用的函数,增强了 React 组件的可复用性和可维护性。

自定义 Hook 的基本思路是:

1. **抽象可重用的逻辑**:
   - 开发者可以将一些复杂的逻辑,比如状态管理、副作用处理等,抽象为可重用的自定义 Hook。

2. **遵循 Hook 规则**:
   - 自定义 Hook 必须遵循 React Hooks 的使用规则,比如必须以 `use` 开头,不能在条件语句中使用 Hooks 等。

3. **利用 Hooks 组合**:
   - 自定义 Hook 可以组合使用其他内置 Hooks,比如 `useState`、`useEffect`、`useCallback` 等,形成更复杂的逻辑。

4. **返回复用的值**:
   - 自定义 Hook 通常会返回一些可复用的状态、函数或其他值,供组件使用。

自定义 Hook 的优点包括:

1. **提高代码复用性**:
   - 将可重用的逻辑抽象为自定义 Hook,可以在多个组件中复用该逻辑。

2. **增强代码可读性和可维护性**:
   - 自定义 Hook 可以使组件代码更加简洁和语义化,提高可读性。同时也便于后期的维护和迭代。

3. **更好的逻辑复用**:
   - 相比于 Higher-Order Components (HOC) 和 Render Props 模式,自定义 Hook 提供了更加灵活和直观的逻辑复用方式。

4. **更好的类型推导**:
   - 自定义 Hook 可以更好地利用 TypeScript 的类型推导能力,提高类型安全性。

自定义 Hook 的常见使用场景包括:

- **状态管理**: 封装复杂的状态逻辑,如表单状态、路由状态等。
- **副作用处理**: 封装复杂的副作用逻辑,如数据fetching、订阅/取消订阅等。
- **性能优化**: 封装记忆化函数、debounce/throttle 等性能优化逻辑。
- **跨组件逻辑共享**: 将跨组件的通用逻辑抽象为自定义 Hook。

自定义 Hook 是 React Hooks 体系中非常强大的特性,可以极大地提高代码的复用性、可维护性和可测试性。合理地设计和使用自定义 Hook 是React开发中的一项重要技能。

## 参考答案

# 自定义Hook
通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。

可以理解成Hook就是用来放一些重复代码的函数。

下面我将做手动实现一个列表渲染、删除的组件，然后把它做成自定义Hook。

## 示例

定义数据列表
```js
  { id: 1, name: "qiu" },
  { id: 2, name: "yan" },
  { id: 2, name: "xi" }
];
```
```js
  const [state, setState] = useState(initialState);
  const deleteLi = (index) => {
    setState((state) => {
      const newState = JSON.parse(JSON.stringify(state));//深拷贝数据
      newState.splice(index, 1);
      return newState;
    });
  };
  return (
    <>
      <ul>
        {state
          ? state.map((v, index) => {
              return (
                <li key={index}>
                  {index + "、"}
                  {v.name}
                  <button
                    onClick={() => {
                      deleteLi(index);
                    }}
                  >
                    X
                  </button>
                </li>
              );
            })
          : \"加载中\"}
      </ul>
    </>
  );
}
```
![](https://static.ecool.fun//article/ca13d1e7-2b9e-45d5-a785-2c979d22750f.jpeg)

## 封装成Hook
```js
  const [state, setState] = useState(initialState);
  const deleteLi = (index) => {
    setState((state) => {
      const newState = JSON.parse(JSON.stringify(state));
      newState.splice(index, 1);
      return newState;
    });
  };
  return { state, setState, deleteLi };//返回查、改、删
};
```

## 使用自定义Hook

一般可以将自定义Hook给单独放在一个文件中，如果要使用，就引过来

```js
```
```js
  const { state, deleteLi } = useList();//这里接收return出来的查、删API
  return (
 	... //这里跟最开始的App组件里是一样的，为了页面整洁，就不贴代码了
  );
}
```

所谓的自定义Hook，实际上就是把很多重复的逻辑都放在一个函数里面，通过闭包的方式给`return`出来，这是非常高级的方式，程序员崇尚代码简洁，如果说以后业务开发时需要大量的重复代码，我们就可以将它封装成自定义Hook。
