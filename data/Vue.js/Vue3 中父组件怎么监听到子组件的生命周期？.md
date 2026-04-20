---
level: 3
---

# Vue3 中父组件怎么监听到子组件的生命周期？

## 题目要点

父组件监听子组件生命周期通常有三种方式：

1. **子组件 emit 生命周期事件（推荐）**

   * 最符合组件通信设计
2. **Vue3 vnode 生命周期事件 `@vue:mounted`**

   * 无侵入监听
3. **ref + defineExpose**

   * 父组件主动查询子组件状态

核心原则：

> 生命周期属于组件内部行为，应由子组件主动暴露，而不是父组件强行探测。

## 参考答案

在 **Vue3** 中，父组件**不能直接“监听”子组件生命周期钩子**（不像 DOM 事件那样天然可监听），但可以通过几种设计模式间接感知或控制子组件生命周期阶段。

本质上，这是一个 **组件通信 + 生命周期暴露策略** 的问题。

## 一、子组件主动通知（emit 事件）

### 思想

生命周期属于子组件内部行为，因此应由 **子组件在生命周期中主动向父组件发送事件**。

### 子组件

```vue
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['mounted', 'unmounted'])

onMounted(() => {
  emit('mounted')
})

onUnmounted(() => {
  emit('unmounted')
})
</script>
```

### 父组件

```vue
  @mounted="handleChildMounted"
  @unmounted="handleChildUnmounted"
/>
```
function handleChildMounted() {
  console.log('子组件已挂载')
}
```

### 优点

* 符合 Vue 单向数据流
* 解耦
* 可维护性强
* 最符合组件设计哲学

这是 **生产环境标准方案**。

---

## 二、通过 `ref` + `expose` 访问子组件状态

如果父组件需要在某些时机判断子组件是否已经初始化，可以让子组件暴露状态。

---

### 子组件

```vue
import { ref, onMounted } from 'vue'

const ready = ref(false)

onMounted(() => {
  ready.value = true
})

defineExpose({
  ready
})
</script>
```

### 父组件

```vue
```
const childRef = ref(null)

watchEffect(() => {
  if (childRef.value?.ready) {
    console.log('子组件 mounted 完成')
  }
})
```

### 适用场景

* 父组件需要调用子组件方法
* 类似 imperative 控制（例如播放器、图表实例）

---

## 三、利用组件 VNode 生命周期（底层方式）

Vue 内部其实支持 vnode hook：

```vue
  @vue:mounted="onMounted"
  @vue:unmounted="onUnmounted"
/>
```

### 示例

```vue
```

### 注意

这是 **Vue3 提供的 vnode 生命周期监听**，很多人不知道。

可监听：

| 事件               | 含义      |
| ---------------- | ------- |
| `@vue:mounted`   | 子组件挂载完成 |
| `@vue:updated`   | 子组件更新   |
| `@vue:unmounted` | 子组件卸载   |

---

### 优点

* 无需改子组件代码
* 父组件直接监听

### 缺点

* 偏底层 API
* 可读性较弱
* 不适合复杂业务通信

---

## 四、Provide / Inject（跨层级监听）

当组件层级很深时：

子组件生命周期中修改 provide 的状态：

```js
  injectedStore.childReady = true
})
```

适用于：

* 表单系统
* 编辑器
* 插件架构

---

## 五、不推荐方案（了解即可）

### 1️⃣ 直接访问内部实例

```js
```

* 依赖内部实现
* 非稳定 API
* 升级可能失效
