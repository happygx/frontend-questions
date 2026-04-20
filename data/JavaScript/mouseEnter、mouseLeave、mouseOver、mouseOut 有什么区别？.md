---
level: 1
---

# mouseEnter、mouseLeave、mouseOver、mouseOut 有什么区别？

## 题目要点

- `mouseEnter` 和 `mouseLeave` 事件更精确，仅在目标元素上触发，并且不会冒泡。
- `mouseOver` 和 `mouseOut` 事件则会冒泡，并且会在鼠标进入或离开目标元素及其子元素时触发。

## 参考答案

`mouseEnter`、`mouseLeave`、`mouseOver` 和 `mouseOut` 都是与鼠标事件相关的 DOM 事件，常用于处理鼠标与页面元素的交互。它们之间有细微的区别，尤其是在事件的触发时机和作用范围上。下面详细介绍它们的区别。

### 1. **`mouseEnter`** 和 **`mouseLeave`**

这两个事件主要用于处理鼠标进入和离开元素时的情况，具有以下特点：

- **`mouseEnter`**：当鼠标指针进入某个元素时触发，**不会**冒泡（即不会传播到父元素）。只有当鼠标真正进入目标元素时，事件才会触发。
  
  - 事件触发的范围：仅限于当前目标元素。
  - **不冒泡**：这意味着它不会触发父元素的 `mouseenter` 事件。

- **`mouseLeave`**：当鼠标指针离开某个元素时触发，**不会**冒泡（即不会传播到父元素）。只有当鼠标真正离开目标元素时，事件才会触发。

  - 事件触发的范围：仅限于当前目标元素。
  - **不冒泡**：与 `mouseenter` 类似，它不会传播到父元素。

**总结：**
- `mouseEnter` 和 `mouseLeave` 是只对当前元素本身进行监听的事件，且不冒泡。
- 适用于需要精确控制某个元素的鼠标进入和离开时的场景。

**示例：**

```javascript

element.addEventListener('mouseenter', () => {
  console.log('Mouse entered the element');
});

element.addEventListener('mouseleave', () => {
  console.log('Mouse left the element');
});
```

这两个事件与 `mouseEnter` 和 `mouseLeave` 的不同之处在于它们是会冒泡的，并且它们还会在鼠标进入或离开元素的 **子元素** 时触发。

- **`mouseOver`**：当鼠标指针进入某个元素或其 **子元素** 时触发。与 `mouseEnter` 不同，`mouseOver` 会冒泡。
  
  - 事件触发的范围：不仅在目标元素上触发，还会在鼠标进入该元素的任何子元素时触发。
  - **会冒泡**：这意味着父元素上也可以监听 `mouseOver` 事件，并在鼠标进入子元素时触发。

- **`mouseOut`**：当鼠标指针离开某个元素或其 **子元素** 时触发。与 `mouseLeave` 不同，`mouseOut` 会冒泡。
  
  - 事件触发的范围：不仅在目标元素上触发，还会在鼠标离开该元素的任何子元素时触发。
  - **会冒泡**：与 `mouseOver` 类似，父元素上也会监听到 `mouseOut` 事件。

**总结：**
- `mouseOver` 和 `mouseOut` 会在鼠标进入或离开元素及其子元素时触发，且会冒泡。
- 适用于需要捕获鼠标在元素及其子元素之间的进入和离开事件。

**示例：**

```javascript

element.addEventListener('mouseover', () => {
  console.log('Mouse entered the element or one of its child elements');
});

element.addEventListener('mouseout', () => {
  console.log('Mouse left the element or one of its child elements');
});
```

| 事件        | 描述                                                                 | 是否冒泡 | 触发范围                                                                 |
|-------------|----------------------------------------------------------------------|----------|--------------------------------------------------------------------------|
| `mouseEnter` | 鼠标进入元素时触发，只对目标元素有效                                   | 否       | 仅对目标元素本身有效                                                     |
| `mouseLeave` | 鼠标离开元素时触发，只对目标元素有效                                   | 否       | 仅对目标元素本身有效                                                     |
| `mouseOver`  | 鼠标进入元素或子元素时触发，适用于目标元素及其子元素                 | 是       | 目标元素及其所有子元素                                                   |
| `mouseOut`   | 鼠标离开元素或子元素时触发，适用于目标元素及其子元素                 | 是       | 目标元素及其所有子元素                                                   |

### 4. **选择哪个事件？**

- **精确控制**：如果只想监听鼠标进入和离开某个元素本身（不包括子元素），使用 `mouseEnter` 和 `mouseLeave`。
- **包括子元素**：如果需要监听鼠标进入或离开目标元素及其子元素，使用 `mouseOver` 和 `mouseOut`。
- **性能考虑**：`mouseEnter` 和 `mouseLeave` 比 `mouseOver` 和 `mouseOut` 性能好一些，因为后者会对子元素的变化进行监听，可能会触发更多次事件。
