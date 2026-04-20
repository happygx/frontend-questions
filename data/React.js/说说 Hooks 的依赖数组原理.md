---
level: 3
---

# 说说 Hooks 的依赖数组原理

## 题目要点

Hooks 的依赖数组本质是一次浅层引用比较机制。React 在 commit 阶段通过 Object.is 逐项比较新旧依赖数组，决定是否重新执行 effect，并在变化时先执行 cleanup。依赖数组不会监听变量变化，也不负责触发 render，只用于声明副作用与状态之间的关系。依赖缺失会导致闭包捕获旧值，依赖不稳定会导致 effect 频繁执行，因此依赖必须完整且保持引用稳定。

## 参考答案

这个问题的核心，不是“依赖数组怎么写”，而是：**React 是如何判断副作用是否需要重新执行的**。

依赖数组的存在，本质是为了让 React 在两次 render 之间进行一次“浅层比较（shallow compare）”，从而决定是否跳过本次 effect 的执行。

---

## 一、从 useEffect 的执行时机说起

```js
  // effect
}, [a, b]);
```

当进入 commit 阶段时，React 会：

1. 取出当前 Fiber 上一次保存的依赖数组
2. 与本次 render 生成的新依赖数组进行比较
3. 决定是否标记该 effect 需要执行

如果依赖变化，则：

* 先执行上一次的 cleanup
* 再执行新的 effect

如果依赖未变化，则跳过。

---

## 二、底层判断逻辑

React 内部判断依赖是否变化，核心逻辑类似：

```js
  if (prevDeps === null) return false;

  for (let i = 0; i < prevDeps.length; i++) {
    if (!Object.is(nextDeps[i], prevDeps[i])) {
      return false;
    }
  }
  return true;
}
```

### 1. 使用的是 Object.is

不是 `===`，而是 `Object.is`，因此：

* `NaN` 与 `NaN` 被认为相等
* `+0` 与 `-0` 被认为不相等

这是为了和 React 内部状态更新逻辑保持一致。

### 2. 只做浅比较

依赖数组中的每一项，只做引用层级的比较。

这意味着：

```js
```

---

## 三、为什么依赖数组必须写全

React 不会分析 effect 内部使用了哪些变量。

依赖数组完全由开发者声明。

如果 effect 内部使用了某个变量，但没有放入依赖数组，那么：

* 变量变化时 effect 不会重新执行
* effect 内部捕获的是旧闭包中的值
* 出现“闭包陷阱”（stale closure）

例如：

```js
  console.log(count);
}, []);
```

这不是 React 的 bug，而是依赖声明不完整。

ESLint 的 `react-hooks/exhaustive-deps` 插件，本质是在做静态分析，提醒依赖缺失。

---

## 四、空数组与不写依赖的区别

```js
```

而：

```js
```

这两种语义差异非常大。

---

## 五、依赖数组与性能的关系

依赖数组不是用来“优化性能”的工具，而是用来声明副作用与状态之间的关系。

如果依赖声明准确：

* effect 执行次数最少
* 逻辑正确

如果为了“减少执行”而故意删除依赖：

* 会产生逻辑错误
* 引入难以排查的状态不一致问题

真正的优化方式应该是：

* 使用 useMemo / useCallback 保持引用稳定
* 或者重构 effect 逻辑

---

## 六、从 Fiber 角度理解

每个 Hook 在 Fiber 上都会形成一个链表节点：

* memoizedState：存储上一次依赖
* next：指向下一个 Hook

在下一次 render 时：

* React 按调用顺序读取对应 Hook 节点
* 拿到上一次的依赖
* 进行对比

这也是为什么 Hook 调用顺序必须稳定。

依赖数组只是挂在这个 Hook 节点上的一段元数据。

---

## 七、一个常见误区

很多人认为依赖数组是“监听变量变化”。

实际上 React 并不会监听变量。

变量变化只是触发 render，render 之后 React 才会在 commit 阶段做依赖比较。

也就是说：

依赖数组不参与“触发更新”，只参与“是否执行副作用”。
