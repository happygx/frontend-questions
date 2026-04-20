---
level: 3.5
---

# vue3 的响应式库是独立出来的，如果单独使用是什么样的效果？

## 题目要点

使用 `@vue/reactivity` 库，您可以在 Vue 组件之外管理响应式状态，进行依赖追踪和副作用处理。它提供了 Vue 3 的核心响应式功能，可以用于构建库或工具，而无需使用完整的 Vue 框架。

## 参考答案

在 Vue 3 中，响应式系统被抽离到一个独立的库中，名为 `@vue/reactivity`。这个库可以单独使用来管理响应式状态，类似于 Vue 的响应式系统，但不依赖于 Vue 组件或 Vue 实例。

### **独立使用效果**

1. **创建响应式对象**：

   使用 `reactivity` 库可以创建响应式对象，类似于 Vue 的 `ref` 和 `reactive`。

   ```javascript
   import { reactive, effect } from '@vue/reactivity';

   const state = reactive({
     count: 0
   });

   effect(() => {
     console.log(`Count is: ${state.count}`);
   });

   state.count++;
   // 输出: Count is: 1
   ```

2. **使用 `ref`**：

   对于基本类型的数据，可以使用 `ref` 来创建响应式数据。

   ```javascript
   import { ref } from '@vue/reactivity';

   const count = ref(0);

   effect(() => {
     console.log(`Count is: ${count.value}`);
   });

   count.value++;
   // 输出: Count is: 1
   ```

3. **依赖追踪和计算属性**：

   使用 `effect` 可以创建响应式的副作用，类似于 Vue 组件中的计算属性。

   ```javascript
   import { reactive, effect, computed } from '@vue/reactivity';

   const state = reactive({
     count: 0
   });

   const doubled = computed(() => state.count * 2);

   effect(() => {
     console.log(`Doubled count is: ${doubled.value}`);
   });

   state.count++;
   // 输出: Doubled count is: 2
   ```
