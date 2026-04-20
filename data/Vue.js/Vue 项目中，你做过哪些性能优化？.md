---
level: 3.5
---

# Vue 项目中，你做过哪些性能优化？

## 题目要点

- **组件和模板优化**：减少不必要的重渲染，利用计算属性和异步组件。
- **性能分析工具**：使用 Vue Devtools 和浏览器开发者工具定位瓶颈。
- **数据和事件处理**：使用 Vuex 管理状态，优化事件处理。

## 参考答案

在 Vue 项目中，进行性能优化通常包括以下几个方面：

### 1. **组件优化**
   - **使用 `v-show` 替代 `v-if`**：`v-show` 仅切换 `display` 属性，而 `v-if` 会添加和删除 DOM 元素，适用于频繁切换的组件。
   - **组件懒加载**：利用 Vue 的异步组件加载功能 (`defineAsyncComponent`) 或 `webpack` 的代码分割（dynamic imports）来减少初始加载时间。

   ```javascript
   const AsyncComponent = defineAsyncComponent(() =>
     import('./components/AsyncComponent.vue')
   );
   ```

   ```html
   <router-view v-if="componentLoaded" />
   ```

   - **避免不必要的重渲染**：通过 `computed` 属性避免不必要的组件更新。

   ```javascript
   computed: {
     filteredItems() {
       return this.items.filter(item => item.active);
     }
   }
   ```

### 2. **性能分析**
   - **使用 Vue Devtools**：检查组件的渲染性能、事件监听和状态管理。
   - **浏览器开发者工具**：利用 Performance 面板分析应用的性能瓶颈。

### 3. **减少计算量**
   - **使用 `computed` 代替 `methods`**：`computed` 是基于依赖的缓存计算结果，而 `methods` 每次调用都会重新计算。

   ```javascript
   computed: {
     itemCount() {
       return this.items.length;
     }
   }
   ```

### 4. **优化事件处理**
   - **防止不必要的事件触发**：使用事件修饰符（如 `.stop`、`.prevent`）来优化事件处理。

   ```html
   <button @click.stop="handleClick">Click Me</button>
   ```

   - **节流和防抖**：对频繁触发的事件（如滚动、输入）使用节流或防抖技术。

   ```javascript
   methods: {
     handleScroll: _.throttle(function() {
       // handle scroll event
     }, 200)
   }
   ```

### 5. **合理使用 Vuex**
   - **避免直接修改状态**：使用 Vuex 的 mutation 和 action 管理状态变更，避免全局状态的不必要更新。

   ```javascript
   mutations: {
     setUser(state, user) {
       state.user = user;
     }
   }
   ```

### 6. **优化模板**
   - **使用 `v-for` 的 `key`**：为 `v-for` 循环的元素提供唯一的 `key`，提升渲染性能。

   ```html
   <div v-for="item in items" :key="item.id">{{ item.name }}</div>
   ```

   - **避免复杂的模板表达式**：将复杂的表达式移到计算属性中，避免每次渲染都重新计算。

### 7. **异步数据处理**
   - **按需加载数据**：只在需要时加载数据，避免不必要的 API 请求。

   ```javascript
   async mounted() {
     const data = await fetchData();
     this.data = data;
   }
   ```

### 8. **缓存和懒加载**
   - **图片和静态资源缓存**：利用浏览器缓存策略或 CDN 来加速静态资源的加载。
   - **懒加载**：对图片和组件使用懒加载技术。

   ```javascript
   <img v-lazy="image.url" />
   ```

### 9. **减少第三方库使用**
   - **精简依赖**：仅引入必要的第三方库，减少包体积，提升加载速度。
