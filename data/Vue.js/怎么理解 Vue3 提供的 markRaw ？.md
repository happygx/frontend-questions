---
level: 3
---

# 怎么理解 Vue3 提供的 markRaw ？

## 题目要点

`markRaw` 是 Vue 3 提供的一个重要工具，允许开发者在需要的情况下绕过响应式系统，以提升性能并减少不必要的开销。它适用于那些不需要被 Vue 观察的对象，帮助开发者更灵活地管理应用中的响应式数据。

## 参考答案

在 Vue 3 中，`markRaw` 是一个用于标记对象的 API，主要用于优化性能和防止 Vue 的响应式系统对某些对象的处理。以下是对 `markRaw` 的详细理解：

### **1. 功能**

- **标记为非响应式**：`markRaw` 可以将一个对象标记为非响应式对象。使用该 API 后，Vue 不会将这个对象转换为响应式对象，任何对其属性的修改都不会触发 Vue 的响应式系统。

### **2. 用法场景**

- **性能优化**：在某些情况下，某些对象（如大型库的实例、第三方插件等）不需要响应式特性，因为它们的属性变化不需要 Vue 进行监测。这时可以使用 `markRaw` 来优化性能。
- **避免不必要的代理**：使用 `markRaw` 可以避免 Vue 对某些对象的代理开销，尤其是当这些对象不会被 Vue 观察或更新时。

### **3. 例子**

```javascript

// 一个非响应式的对象
const nonReactiveObj = markRaw({ someProperty: 'value' });

// 使用这个对象
console.log(nonReactiveObj.someProperty); // 'value'

// 修改属性不会触发 Vue 的响应式系统
nonReactiveObj.someProperty = 'new value';
```

- `markRaw` 通常与 Vue 的响应式 API（如 `reactive`、`ref`）结合使用，用于明确哪些对象需要被监测，哪些对象不需要。
