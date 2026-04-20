---
level: 2
---

# `setup`函数中同步修改响应式数据，会触发子组件的`onBeforeUpdate`吗？为什么？

## 题目要点

`setup` 执行时组件尚未完成首次渲染，所有同步的响应式修改都会被合并进初始 render，而不是触发一次更新；`onBeforeUpdate` 只会在组件已经 mounted 且即将进行一次更新渲染时触发；因此，在 `setup` 中同步修改响应式数据，不会触发子组件的 `onBeforeUpdate`，因为更新阶段尚未开始。

## 参考答案

**结论先行：不会。**
在 `setup` 函数中**同步修改响应式数据，不会触发子组件的 `onBeforeUpdate`**。原因在于：**此时组件尚未完成首次渲染，更新还没有进入“更新阶段”**。

下面从 Vue 3 的真实执行链路解释这个结论。

---

## 一、先明确 `onBeforeUpdate` 的触发前提

`onBeforeUpdate` 的语义是：

> **组件已经完成过一次挂载（mount），因为响应式状态变更，即将触发一次“更新渲染”之前**

因此，它有一个隐含前提：

* 组件 **已经 mounted**
* 当前这次 render 属于 **update，而不是 initial render**

如果组件还没完成首次渲染，就不存在“更新”，也就不存在 `beforeUpdate`。

---

## 二、`setup` 所处的生命周期位置

Vue 3 中，组件初始化的大致流程是：

```text
→ setup()
→ render effect 创建
→ 首次 render
→ patch
→ mounted
```

> **`setup` 执行时，组件还没有开始渲染，更不可能已经 mounted**

此时：

* render effect 还没真正执行
* 子组件实例甚至可能尚未创建
* 更新调度系统（scheduler）还未介入

---

## 三、为什么同步修改不会触发更新

来看一个典型场景：

```js
  const count = ref(0)
  count.value++
  return { count }
}
```

1. `setup` 中创建响应式数据
2. 同步修改 `count.value`
3. **此修改发生在首次 render 之前**
4. render effect 第一次执行时，直接读取的是**最终值**

也就是说：

> **这次修改被“吸收”进了首次渲染，而不是一次更新**

从 Vue 的角度看：

* 没有“旧 VNode”
* 没有 diff
* 没有 update 阶段
* 自然也不会触发 `onBeforeUpdate`

---

## 四、对子组件的影响

子组件的 `onBeforeUpdate` 触发条件更严格：

* 父组件已经 mounted
* 父组件更新导致子组件进入 update 流程
* 子组件的 props 或依赖发生变化

而在 `setup` 阶段：

* 父组件尚未 mounted
* 子组件通常尚未完成创建
* 不存在一次“父 → 子”的更新传播

因此：

> **`setup` 中的同步修改，不可能触发子组件的 `onBeforeUpdate`**

---

## 五、对比：什么情况下会触发 `onBeforeUpdate`

```js
  const count = ref(0)

  onMounted(() => {
    count.value++
  })

  return { count }
}
```

1. 首次 render 完成
2. 组件 mounted
3. `count` 在 mounted 后被修改
4. 触发更新调度
5. 父组件 `onBeforeUpdate`
6. 子组件 `onBeforeUpdate`
7. render → diff → patch

这才是一个完整的 **update 生命周期**。

---

## 六、工程化视角的总结

Vue 对生命周期的区分本质是：

* **initial render**：状态准备阶段
* **update render**：响应式变更驱动阶段

`setup` 属于前者，而 `onBeforeUpdate` 属于后者，两者不会交叉。
