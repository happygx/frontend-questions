---
level: 3
---

# Vue3中v-model的改进是什么？如何用defineModel简化代码？

## 题目要点

* **Vue 3 改进点**：

  1. 支持多 `v-model`（`v-model:propName`）
  2. 不再固定 `value`，绑定任意 prop
  3. 基于 Proxy 的响应式系统

* **defineModel 优势**：

  * 减少重复代码（无需手动定义 props/emits）
  * 直接操作变量即可触发双向绑定
  * 与 `<script setup>` 组合式 API 自然结合

## 参考答案

在 Vue 3 中，`v-model` 做了显著改进，相比 Vue 2，更加灵活和可配置，同时减少了模板中重复代码。

## 1. Vue 3 中 v-model 的改进

### 1.1 支持 **多 v-model**

* Vue 2 组件只能通过单个 `v-model` 绑定 `value` + `input`。
* Vue 3 支持给组件定义多个 `v-model`，可以绑定不同的属性和事件。

```vue
  v-model:title="pageTitle" 
  v-model:count="itemCount" 
/>
```

```vue
const emit = defineEmits(['update:title', 'update:count'])

function updateTitle(newTitle) {
  emit('update:title', newTitle)
}
```

* Vue 3 不再固定 `value` 属性，`v-model:propName` 可以绑定任意 prop，并生成 `update:propName` 事件。
* 语法更直观，避免只能用 `value` 的局限。

---

## 2. v-model 的原理变化

* Vue 3 不再依赖 `Object.defineProperty`，而是用 **Proxy** 实现响应式。
* `v-model` 的双向绑定原理依然是：

  1. **数据 → 视图**：绑定 prop
  2. **视图 → 数据**：通过触发 `update:propName` 事件，父组件更新数据

```vue
<MyInput v-model="msg" />

<!-- 子组件 -->
<script setup>
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
function onInput(e) {
  emit('update:modelValue', e.target.value)
}
</script>
```

## 3. 使用 `defineModel` 简化代码

`defineModel` 是 Vue 3.3+ 提供的 **组合式 API**，用于在 `<script setup>` 中声明 `v-model` 绑定属性和事件，减少手动编写 `defineProps` + `defineEmits` 的模板。

### 示例

#### 传统方式

```vue
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

function onInput(e) {
  emit('update:modelValue', e.target.value)
}
</script>
```

```vue
const modelValue = defineModel() // 自动生成 props + emits

function onInput(e) {
  modelValue.value = e.target.value // 自动触发 update:modelValue
}
</script>
```

1. 自动生成 `props` + `emits`，简化模板和代码
2. 可直接使用 `ref` 风格修改值，内部会触发 `update:modelValue`
3. 支持默认值、类型声明和验证
