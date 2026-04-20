---
level: 1.5
---

# vue3中怎么设置全局变量？

## 题目要点

在 Vue 3 中，全局方法或属性的挂载和访问方式与 Vue 2 有所不同。以下是两种在 Vue 3 中实现全局访问的方法：

1. **使用 `config.globalProperties`**：
   - Vue 3 引入了一个新的配置选项 `app.config.globalProperties`，允许你在应用实例上定义全局属性或方法。
  
2. **使用 `provide` 和 `inject`**：
   - Vue 3 提供了 `provide` 和 `inject` 功能，可以穿透多层组件，实现数据从父组件传递到子组件。
  
   - 如果需要变量是响应式的，需要在 `provide` 的时候使用 `ref` 或 `reactive` 包装变量。

## 参考答案

## 方法一 config.globalProperties

`vue2.x`挂载全局是使用 `Vue.prototype.$xxxx=xxx` 的形式来挂载，然后通过 `this.$xxx`来获取挂载到全局的变量或者方法。

这在 `Vue 3` 中，就等同于 `config.globalProperties`。这些 `property` 将被复制到应用中作为实例化组件的一部分。

```js
Vue.prototype.$http = () => {}

// 之后 (Vue 3.x)
const app = createApp({})
app.config.globalProperties.$http = () => {}
```

vue3新的 `provide/inject` 功能可以穿透多层组件，实现数据从父组件传递到子组件。

可以将全局变量放在根组件的 `provide` 中，这样所有的组件都能使用到这个变量。

如果需要变量是响应式的，就需要在 `provide` 的时候使用 `ref` 或者 `reactive` 包装变量。
