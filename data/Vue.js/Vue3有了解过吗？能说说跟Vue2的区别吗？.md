---
level: 2
---

# Vue3有了解过吗？能说说跟Vue2的区别吗？

## 题目要点

- Proxy 重构响应式系统解决 Vue 2 的响应式限制
- Composition API 提供更好的逻辑组织和复用
- 编译器优化带来显著的运行时性能提升
- 更友好的 TypeScript 集成体验
- 设计上更注重可维护性和扩展性

## 参考答案

Vue 3 是对 Vue 2 的架构级升级，其核心改进体现在以下几个方面：

### 响应式系统重构
1. **实现机制**  
Vue 2 使用 Object.defineProperty 实现响应式，存在无法检测属性新增/删除的限制。Vue 3 改用 Proxy 代理，实现了真正的全属性响应追踪，同时提升了性能表现。

2. **依赖追踪优化**  
引入 effect scope 概念，支持更细粒度的依赖收集。与 Vue 2 的 Watcher 实例相比，Vue 3 的响应式系统内存占用降低约50%。

### 组合式 API
1. **逻辑复用革新**  
Options API 的碎片化问题通过 setup() 和 Composition API 解决。相关逻辑可以聚合到独立 composable 函数中，实现比 mixins 更灵活且无冲突的复用方式。

2. **TypeScript 支持**  
基于函数式的 API 设计使类型推导更为自然，相比 Vue 2 的 Options API 获得了完整的类型支持。

### 性能优化

 **编译时改进**  

- 模板编译生成更高效的渲染函数（Block Tree 优化）
- 静态节点提升（Hoist Static）减少运行时开销
- Patch Flag 标记实现靶向更新

**体积减少**  

通过 Tree-shaking 支持，最小化打包体积从 Vue 2 的 ~20KB 降至 ~10KB。

### 其他重要差异
1. **生命周期调整**  
beforeDestroy 更名为 beforeUnmount，destroyed 改为 unmounted，与语义更匹配。

2. **Fragment/Teleport 支持**  
新增多根节点组件和跨 DOM 渲染能力，解决 Vue 2 的模板限制。

3. **自定义渲染器**  
提供 createRenderer API 实现非 DOM 环境的渲染能力，扩展性显著增强。
