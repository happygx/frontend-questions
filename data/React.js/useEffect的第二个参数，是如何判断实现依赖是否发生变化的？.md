---
level: 1
---

# useEffect的第二个参数，是如何判断实现依赖是否发生变化的？

## 题目要点

`useEffect` 的依赖变化判断机制是：

> React 在每次 render 后，使用 `Object.is` 对依赖数组进行逐项浅比较，只要任一依赖的引用或值发生变化，就重新执行 effect。

## 参考答案

`useEffect` 的第二个参数（**依赖数组 dependency array**）本质上是 React 用来做 **变更检测（change detection）** 的机制，用于决定：

> 当前 render 完成后，这个 effect 是否需要重新执行。

核心问题是：**React 如何判断依赖“发生变化”？**

---

# 一、结论先行

React 对依赖数组执行的是：

## **逐项浅比较（shallow comparison）**

并且比较算法使用：

```
```

---

# 二、源码层面的判断逻辑（简化版）

React 在 commit 阶段会保存上一次的依赖：

```js
function areHookInputsEqual(nextDeps, prevDeps) {
  if (prevDeps === null) return false;

  for (let i = 0; i < prevDeps.length; i++) {
    if (!Object.is(prevDeps[i], nextDeps[i])) {
      return false;
    }
  }
  return true;
}
```

| 条件                 | effect 是否重新执行 |
| ------------------ | ------------- |
| 任一依赖 Object.is 不相等 | 重新执行          |
| 全部相等               | 跳过执行          |

---

# 三、为什么使用 `Object.is` 而不是 `===`

`Object.is` 与 `===` 基本一致，但修复了两个 JS 边界问题：

| 比较            | `===` | `Object.is` |
| ------------- | ----- | ----------- |
| `NaN === NaN` | false | true        |
| `+0 === -0`   | true  | false       |

因此 React 能更精确判断数值变化。

---

# 四、重要：这是“引用比较”，不是值比较

这是很多问题的根源。

React **不会深度比较对象内容**。

---

## 示例 1：对象依赖（常见坑）

```js
  console.log("run");
}, [{ a: 1 }]);
```

```js
```

```
```

* 新对象 = 新内存地址
* Object.is 返回 false

---

## 示例 2：数组同理

```js
```

---

## 示例 3：函数依赖

```js
```

```
```

```
```

# 五、React 的依赖判断流程（完整链路）

一次组件更新时：

```
   ↓
计算新的 deps 数组
   ↓
与上一次 deps 做 Object.is 逐项比较
   ↓
是否标记 effect 为 Dirty
   ↓
commit 阶段执行 effect
```

> 比较发生在 render 之后、effect 执行之前。

---

# 六、三种依赖写法的行为差异

---

## 1️⃣ 不写依赖

```js
```

```
```

## 2️⃣ 空数组

```js
```

```
```

* 没有依赖永远不会变化

---

## 3️⃣ 指定依赖

```js
```

```
```

---

# 七、高级理解：为什么 React 不做深比较？

如果 deep compare：

### 性能灾难

```js
```

```
```

React 的设计原则是：

> 依赖稳定性由开发者保证，而不是框架自动推断。

---

# 八、工程级最佳实践

## 1️⃣ 稳定引用

```js
```

## 2️⃣ 稳定函数

```js
```

## 3️⃣ 拆分依赖（非常重要）

不要：

```js
```

```js
```
