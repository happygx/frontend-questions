---
level: 1
---

# 假设你正在开发一个 Vue 项目，需要在组件加载完成后执行一个数据初始化操作，并在组件销毁前清理一些资源（如定时器或事件监听）。你会使用哪些生命周期钩子来实现这些功能，并简述每个钩子的作用。

## 题目要点

* **`onMounted`**：组件挂载到真实 DOM 后触发，用于异步请求、DOM 操作及第三方库初始化。
* **`onBeforeUnmount`**：组件销毁前触发，用于移除定时器、注销全局事件监听及断开长连接。
* **内存管理**：在销毁阶段手动清理外部资源是预防前端内存溢出（Memory Leak）的行业标准实践。
* **执行顺序**：确保“谁开启，谁关闭”的逻辑闭环，维护组件的纯净性。

## 参考答案

以下将基于 **Vue 3 组合式 API (Composition API)** 这一现代主流范式进行说明。

### 1. 数据初始化：使用 `onMounted`

为了在组件加载完成后执行数据初始化（如发起 API 请求、访问 DOM 节点），会选择 **`onMounted`** 钩子。

* **作用**：该钩子在组件完成初始渲染并创建了真实的 DOM 节点后触发。此时，模板中的所有元素已挂载到页面上，是进行异步数据抓取、初始化第三方插件（如 ECharts）的最佳时机。
* **为何不在 `setup` 或 `created` 中做？**：虽然在 `setup` 阶段可以发起网络请求，但如果初始化逻辑涉及到对 DOM 的操作（例如获取元素的宽高），则必须等到 `onMounted` 阶段，否则会因为 DOM 尚未生成而报错。

### 2. 资源清理：使用 `onBeforeUnmount`

为了在组件销毁前清理资源（如 `setInterval` 定时器、`window` 全局事件监听、WebSocket 连接），会选择 **`onBeforeUnmount`** 钩子。

* **作用**：该钩子在组件卸载（Unmount）发生之前触发。此时组件实例依然完全可用，所有的响应式数据、计算属性和方法都处于可访问状态。
* **工程价值**：这是防止内存泄漏的最后一道防线。如果在组件内开启了定时器而不在销毁前 `clearInterval`，该定时器会在后台持续运行，占用内存并可能导致逻辑冲突。

---

### 3. 代码实现示例

在 Composition API 风格下，通常会将逻辑封装在一起，提高代码的可维护性：

```javascript

export default {
  setup() {
    const timer = ref(null);

    onMounted(() => {
      // 1. 执行数据初始化
      fetchData(); 
      // 2. 开启资源
      timer.value = setInterval(() => {
        console.log('执行轮询任务');
      }, 1000);
      window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount(() => {
      // 3. 清理资源，避免内存泄漏
      clearInterval(timer.value);
      window.removeEventListener('resize', handleResize);
      console.log('资源已释放');
    });

    return { /* ... */ };
  }
};

```

如果是维护旧项目，对应的钩子分别是：

* **`mounted`**：对应 Vue 3 的 `onMounted`。
* **`beforeDestroy`**：对应 Vue 3 的 `onBeforeUnmount`。
