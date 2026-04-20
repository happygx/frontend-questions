---
level: 3.5
---

# 为什么 useState 返回的是数组而不是对象？

## 题目要点

`useState` 返回一个数组而不是对象，主要是为了简化状态管理和更新过程，使得状态的获取和更新更为直观和一致。这个设计决定让 React 的函数式组件更加简洁、易于维护，并减少了潜在的复杂性。

## 参考答案

useState 的用法：

```js
```

要回答这个问题得弄明白 ES6 的解构赋值(destructring assignment)语法 , 来看 2 个简单的示例：

* 数组的解构赋值：

```js

const [red, yellow, green] = foo;
console.log(red); // "one"
console.log(yellow); // "two"
console.log(green); // "three"
```

```js
    id: 42,
    is_verified: true
};

const { id, is_verified } = user;

console.log(id); // 42
console.log(is_verified); // true 
```

如果 `useState` 返回数组，那么你可以顺便对数组中的变量命名，代码看起来也比较干净。而如果是对象的话返回的值必须和 `useState` 内部实现返回的对象同名，这样你只能在 `function component` 中使用一次，想要多次使用 `useState` 必须得重命名返回值。

```js
const { state, setState } = useState(false)
// 第二次使用
const { state: counter, setState: setCounter} = useState(0)
```

* 返回值强顺序，灵活性比较低。array[0] 为值，array[1] 为改变值的方法。
* 返回的值基本都得使用，对于有些返回值不想使用的话代码看起来有些怪，比如只想用 setState, 就得这么写：`const [, setState] = useState(false)`。
* 返回的参数不能太多，否则处理上面 2 个场景会很麻烦。

如果在自定义的Hook中遇到了以上几个问题，不妨试试返回 object。

简单总结一下，在自定义 hook 的时候可以遵循一个简单原则：当参数大于 2 个的时候返回值的类型返回 `object`， 否则返回数组。
