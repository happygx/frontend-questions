---
level: 1.5
---

# template 标签为什么不可以使用 v-show？

## 题目要点

- **`<template>`** 是一个 **占位符标签**，它本身不会被渲染成 DOM 元素，所以无法使用 `v-show`。
- 如果要控制条件渲染或显示/隐藏，应该将 `v-show` 或 `v-if` 应用到实际的 DOM 元素（如 `<div>`、`<span>` 等）上，而不是 `<template>` 本身。

## 参考答案

`<template>` 标签在 Vue 中是一个 **占位符元素**，它本身在渲染时不会生成任何实际的 DOM 元素，只是为了包裹一些结构或逻辑，帮助开发者更好地组织模板内容。因此，`<template>` 标签没有实际的渲染结果，它的存在只在编译和渲染过程中起到作用。

### 为什么 `v-show` 不能直接用于 `<template>`？

1. **`v-show` 是基于 `display` 样式控制元素的显示和隐藏的**：
   - 当使用 `v-show` 时，Vue 会动态控制绑定元素的 `display` 样式。如果元素被隐藏，`display: none` 会被应用到该元素，反之则会恢复为正常的显示状态。
   - 然而，`<template>` 本身并不会渲染任何真实的 DOM 元素。它的作用仅限于包裹其他元素，并不生成实际的 HTML 元素。因此，`v-show` 并不适用于 `<template>` 标签。

2. **`<template>` 没有实际的 DOM 元素**：
   - `v-show` 操作的是 DOM 元素的样式，而 `<template>` 本身并不渲染为一个真实的 DOM 元素，因此 `v-show` 无法对 `<template>` 标签本身进行样式控制。

### 示例：
如果你在 Vue 中使用 `v-show` 绑定到 `<template>` 上，会得到一个警告，并且不会起作用：

```vue
  <div>内容</div>
</template>
```

### 正确的使用方式：
如果你想根据条件控制 `<template>` 中的内容的显示与隐藏，可以将 `v-show` 或 `v-if` 应用到 `<template>` 内部的实际渲染元素上：

```vue
  <div v-show="isVisible">
    内容
  </div>
</template>
```

```vue
  <div v-if="isVisible">
    内容
  </div>
</template>
```
