---
level: 3
---

# vue 中 Scoped Styles 是如何实现样式隔离的？说说具体的原理

## 题目要点

Vue 中的 **Scoped Styles** 通过在组件样式中自动生成唯一的类名，并将其应用到 DOM 元素上，从而实现了样式隔离。这种方式确保了组件样式不会相互干扰，避免了全局样式污染的问题。通过这种机制，Vue 使得每个组件的样式和逻辑更加独立，有利于提高代码的可维护性和可复用性。

## 参考答案

在 Vue 中，**Scoped Styles**（作用域样式）是通过在组件的 `<style>` 标签中添加 `scoped` 属性来实现的，它的核心思想是确保该组件的样式只影响当前组件的 DOM，而不影响全局样式或其他组件的样式。

### 原理

1. **生成唯一的类名**：
   Vue 会通过编译器自动为组件的每个元素生成一个唯一的类名。这个类名通常会在组件的 `<style scoped>` 标签中定义的 CSS 规则上附加一个特定的作用域标识符（hash 值）。这些唯一的类名确保样式只作用于当前组件，而不会与其他组件的样式发生冲突。

2. **CSS 样式的自动作用域绑定**：
   在编译过程中，Vue 会遍历 `<style scoped>` 标签中的所有 CSS 选择器，并通过增加一个动态生成的属性（如 `data-v-xxxxxx`）来确保这些样式只应用于当前组件。这个属性会被自动加到所有 HTML 元素的 `class` 属性上，从而达到样式隔离的目的。

3. **如何生成唯一的作用域标识符**：
   Vue 会在编译时根据当前组件的 ID 或文件名生成一个唯一的哈希值（例如 `data-v-123abc`），这个哈希值会被附加到样式选择器和元素的 `class` 属性中。

   例如，如果我们有如下的 Vue 组件：

   ```vue
   <template>
     <div class="button">
       Click me
     </div>
   </template>

   <style scoped>
     .button {
       background-color: blue;
     }
   </style>
   ```

   编译后的 DOM 可能会变成这样：

   ```html
   <div class="button" data-v-123abc>
     Click me
   </div>
   ```

   Vue 会在 `<style scoped>` 中的 `.button` 选择器前自动加上哈希值 `data-v-123abc`，并将其加到生成的 HTML 元素上，从而确保样式只应用于该组件内的 `.button` 类，而不会影响其他组件。

   编译后的 CSS 会变成这样：

   ```css
   .button[data-v-123abc] {
     background-color: blue;
   }
   ```

4. **作用域样式的限制性**：
   - **仅限当前组件**：`scoped` 样式只会影响当前组件的 DOM。它不会影响父组件或子组件的样式。
   - **全局样式**：如果你想使用全局样式（例如，定义一个字体大小、通用布局等），你可以通过在 `<style>` 标签中不加 `scoped` 或者使用 `>>>`（深度选择器）来让某些样式穿透到子组件。

### 使用示例

```vue
  <div class="my-component">
    <p class="message">Hello, Vue!</p>
  </div>
</template>

<style scoped>
.my-component {
  background-color: lightblue;
}

.message {
  color: white;
}
</style>
```

```html
  <p class="message" data-v-abc123>Hello, Vue!</p>
</div>
```
.my-component[data-v-abc123] {
  background-color: lightblue;
}

.message[data-v-abc123] {
  color: white;
}
```
- 通过这种方式，Vue 的 Scoped Styles 有效地避免了样式污染。

### 样式穿透

如果需要修改子组件的样式，可以使用深度选择器 `>>>` 或 `/deep/`，来让某些样式穿透到子组件中。比如：

```css
.my-component >>> .child {
  color: red;
}
```

1. **避免全局污染**：Scoped 样式使得组件的样式与其他组件完全隔离，避免了全局样式污染问题。
2. **增强可维护性**：每个组件的样式都与组件逻辑紧密结合，便于维护和重构。
3. **自动生成唯一类名**：无需手动管理命名空间，Vue 会自动处理。
4. **提高可读性**：每个组件都有自己独立的样式，清晰可见，易于理解和调试。

### 缺点

1. **性能开销**：生成唯一类名和样式时，会增加一些计算开销，尤其是当有大量组件时。
2. **深度选择器限制**：某些场景下需要穿透子组件的样式，可能会增加复杂度和维护成本。
