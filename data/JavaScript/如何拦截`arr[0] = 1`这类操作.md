---
level: 2.5
---

# 如何拦截`arr[0] = 1`这类操作

## 题目要点

**`arr[0] = 1` 本质是对象属性赋值，ES5 的 `defineProperty` 无法完整拦截动态下标，而 ES6 的 `Proxy` 可以通过 `set` trap 精确感知，因此成为现代响应式系统和状态管理的基础能力。**

## 参考答案

要拦截 `arr[0] = 1` 这类**通过下标直接修改数组元素的操作**，本质上需要拦截的是：

> **对象属性的 `set` 行为**

在 JavaScript 中，这类操作是否可拦截，取决于使用的是 **ES5 的 `Object.defineProperty`** 体系，还是 **ES6 的 `Proxy`** 体系。

---

## 一、结论先行

* **无法通过 `Object.defineProperty` 完整拦截 `arr[0] = 1`**
* **可以通过 `Proxy` 精确拦截 `arr[0] = 1`**

这也是 Vue2 与 Vue3 在数组响应式能力上的本质差异之一。

---

## 二、为什么 `defineProperty` 做不到

### 1. 数组下标是“动态属性”

```js
```

```js
```

* 只能拦截**已存在的属性**
* 无法感知**新增属性**
* 无法批量监听所有未知 key

即使提前对 `0、1、2...` 做劫持：

* 无法预知数组未来长度
* `length` 的变化也无法可靠追踪

因此只能通过 **hack 原型方法**（push、splice 等）做“部分覆盖”。

---

### 2. Vue2 的实际策略（背景理解）

Vue2 对数组的处理是：

* 劫持 `push / pop / splice / shift / unshift / sort / reverse`
* 不支持 `arr[index] = value`
* 不支持 `arr.length = n`

这是能力边界，而不是遗漏。

---

## 三、Proxy 如何拦截 `arr[0] = 1`

### 1. 核心原理

`Proxy` 能拦截的是：

> **对象层面的“任意属性访问与修改”**

数组在 JS 中本质上是对象，因此：

```js
```

---

### 2. 示例实现

```js
  set(target, key, value, receiver) {
    console.log('set:', key, value);
    return Reflect.set(target, key, value, receiver);
  }
});

arr[0] = 1;       // set: "0" 1
arr.length = 10; // set: "length" 10
```

* 下标赋值
* length 变更
* 动态新增元素

---

## 四、为什么 Proxy 是“完整解法”

对比能力边界：

| 能力        | defineProperty | Proxy |
| --------- | -------------- | ----- |
| 下标赋值      | 不可行            | 可行    |
| 新增属性      | 不可感知           | 可感知   |
| 删除属性      | 不可感知           | 可感知   |
| length 修改 | 不稳定            | 可拦截   |
| 全量代理      | 需要逐个定义         | 一次代理  |

这也是 Vue3 全面转向 Proxy 的根本原因。

---

## 五、工程层面的注意点

### 1. 不要直接修改原数组引用

一旦做了 Proxy：

```js
const observed = new Proxy(raw, ...);
```

---

### 2. 避免在 set 中直接操作 target

推荐使用：

```js
```

```js
```
