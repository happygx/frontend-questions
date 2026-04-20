---
level: 3
---

# 在Vue中，为什么推荐使用ref而非直接操作DOM？

## 题目要点

在 Vue 中推荐使用 `ref` 而非直接操作 DOM，是为了 **保持响应式编程思想、提高代码可维护性、避免全局污染、增强组件化支持，以及兼容 SSR 和未来扩展**。
直接操作 DOM 只能作为「最后手段」，通常用于操作第三方库或必须访问底层 DOM 的场景。

## 参考答案

### 1. **保持响应式编程思想**

* Vue 的核心理念是 **数据驱动视图**。
* 如果你频繁通过 `document.querySelector`、`getElementById` 等方式直接操作 DOM，就等于绕过了 Vue 的响应式系统，破坏了「数据变化 → 视图自动更新」的逻辑。
* `ref` 是 Vue 提供的 **在响应式体系内获取 DOM 或组件实例的方式**，不会违背 Vue 的设计哲学。


### 2. **保证可维护性和可读性**

* 使用 `ref` 获取 DOM 元素或子组件时，逻辑清晰，绑定关系一目了然：

```vue
  <input ref="inputEl" />
</template>

<script setup>
import { ref, onMounted } from 'vue'

const inputEl = ref(null)

onMounted(() => {
  inputEl.value.focus()
})
</script>
```

  * 不直观，不知道选中的是不是自己想要的节点。
  * 如果 DOM 结构变化，选择器很容易失效。


### 3. **避免全局作用域污染**

* 原生 DOM 操作往往是「全局查询」的，比如 `document.querySelector`。
* 当页面很大时，可能会选中不该选的 DOM，造成隐蔽的 bug。
* `ref` 是 **组件作用域内的绑定**，不会误伤其它组件。


### 4. **更好地支持组件和生命周期**

* `ref` 不仅能绑定 DOM，还能绑定 **组件实例**：

```vue

onMounted(() => {
  console.log(child.value.someMethod())
})
```
* 而且 `ref` 在 Vue 的生命周期中是有保证的（例如在 `onMounted` 之后才能访问），不会出现 DOM 还没挂载就被访问的情况。


### 5. **利于服务端渲染（SSR）和未来扩展**

* Vue 在 SSR 或虚拟 DOM 渲染时，不依赖真实 DOM，而是依赖 `ref` 提供的抽象。
* 直接操作 DOM 会导致 **不可移植**，在非浏览器环境下不可用，而 `ref` 更加通用。
