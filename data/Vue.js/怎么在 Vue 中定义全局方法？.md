---
level: 3
---

# 怎么在 Vue 中定义全局方法？


## 题目要点

在 Vue.js 中定义全局方法，可以通过多种方式实现：

1. **在 Vue 2 中通过 Vue.prototype 定义全局方法**：直接在 Vue 的原型对象上添加方法，使得所有 Vue 实例都能访问这个方法。
2. **在 Vue 3 中通过 `app.config.globalProperties` 定义全局方法**：Vue 3 提供了一个新的全局 API，允许在应用实例上定义全局属性或方法。
3. **使用混入（Mixin）**：创建一个混入对象并将其全局注册，可以在所有组件中使用这个混入对象定义的方法。
4. **创建插件**：创建一个 Vue 插件来封装全局方法，并在 `main.js` 中安装插件。

这些方法可以用于创建和共享代码片段、添加自定义指令、提供全局的数据和功能等。

## 参考答案

在 Vue.js 中定义全局方法，可以通过多种方式实现，包括直接在 Vue 的原型对象上添加方法、使用 Vue 3 的全局 API (`app.config.globalProperties`)、以及通过混入 (mixin) 等方法。

以下是几种常见的方法：

### 方法一：在 Vue 2 中通过 Vue.prototype 定义全局方法

```javascript
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// 定义全局方法
Vue.prototype.$myGlobalMethod = function () {
  console.log('这是一个全局方法');
};

new Vue({
  render: h => h(App),
}).$mount('#app');
```

```javascript
  <div>
    <button @click="useGlobalMethod">调用全局方法</button>
  </div>
</template>

<script>
export default {
  methods: {
    useGlobalMethod() {
      this.$myGlobalMethod();
    }
  }
}
</script>
```

```javascript
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// 定义全局方法
app.config.globalProperties.$myGlobalMethod = function () {
  console.log('这是一个全局方法');
};

app.mount('#app');
```

```vue
  <div>
    <button @click="useGlobalMethod">调用全局方法</button>
  </div>
</template>

<script>
export default {
  methods: {
    useGlobalMethod() {
      this.$myGlobalMethod();
    }
  }
}
</script>
```

你可以创建一个混入对象并将其全局注册，从而在所有组件中使用这个混入对象定义的方法。

```javascript
export const globalMixin = {
  methods: {
    $myGlobalMethod() {
      console.log('这是一个全局方法');
    }
  }
};
```
// main.js
import Vue from 'vue';
import App from './App.vue';
import { globalMixin } from './globalMixin';

Vue.config.productionTip = false;

// 全局混入
Vue.mixin(globalMixin);

new Vue({
  render: h => h(App),
}).$mount('#app');
```

```vue
  <div>
    <button @click="useGlobalMethod">调用全局方法</button>
  </div>
</template>

<script>
export default {
  methods: {
    useGlobalMethod() {
      this.$myGlobalMethod();
    }
  }
}
</script>
```

你可以创建一个 Vue 插件来封装全局方法，并在 `main.js` 中安装插件。

```javascript
export default {
  install(Vue) {
    Vue.prototype.$myGlobalMethod = function () {
      console.log('这是一个全局方法');
    }
  }
};
```
// main.js
import Vue from 'vue';
import App from './App.vue';
import myPlugin from './myPlugin';

Vue.config.productionTip = false;

// 安装插件
Vue.use(myPlugin);

new Vue({
  render: h => h(App),
}).$mount('#app');
```

```vue
  <div>
    <button @click="useGlobalMethod">调用全局方法</button>
  </div>
</template>

<script>
export default {
  methods: {
    useGlobalMethod() {
      this.$myGlobalMethod();
    }
  }
}
</script>
```
