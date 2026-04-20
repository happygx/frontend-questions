---
level: 2.5
---

# z-index属性在什么情况下会失效？

## 题目要点

`z-index` 属性用于控制元素的堆叠顺序，但有时会出现失效的情况。以下是一些常见的导致 `z-index` 失效的原因：

1. **没有设置 `position` 属性**：
   - `z-index` 仅对设置了 `position` 属性（`absolute`、`relative`、`fixed` 或 `sticky`）的元素有效。

2. **`z-index` 值不在范围内**：
   - `z-index` 可以取负值，但必须在 `position` 属性设置后才能生效。

3. **元素被隐藏**：
   - 如果元素的 `visibility` 属性设置为 `hidden`，或者 `display` 属性设置为 `none`，则 `z-index` 不会生效。

4. **`z-index` 值相同**：
   - 如果多个元素的 `z-index` 值相同，它们的堆叠顺序将按照它们在文档流中的顺序决定。

5. **`z-index` 值被覆盖**：
   - 如果父元素的 `z-index` 值较高，可能会覆盖子元素的 `z-index`。

6. **元素是 `position: static`**：
   - 静态定位的元素（`position: static`）不会创建新的层级，因此 `z-index` 不会生效。

7. **元素在不同的堆叠上下文**：
   - 堆叠上下文（Stacking Context）可以被创建，例如通过 `opacity`、`transform` 等属性，这会影响 `z-index` 的效果。

#### 考察重点

- 理解：z-index 的工作原理和限制。
- 应用：能够正确设置 z-index 以控制元素的堆叠顺序。

## 参考答案

通常 z-index 的使用是在有两个重叠的标签，在一定的情况下控制其中一个在另一个的上方或者下方出现。z-index值越大就越是在上层。z-index元素的position属性需要是relative，absolute或是fixed。

z-index属性在下列情况下会失效：

- 父元素position为relative时，子元素的z-index失效。解决：父元素position改为absolute或static；
- 元素没有设置position属性为非static属性。解决：设置该元素的position属性为relative，absolute或是fixed中的一种；
- 元素在设置z-index的同时还设置了float浮动。解决：float去除，改为`display：inline-block`；

20230116，有小伙伴补充：

* 在手机端 `iOS 13` 系统中，`-webkit-overflow-scrolling:touch` 也会使 `z-index` 失效，将 `touch` 换成 `unset`

具体原因可参考这篇文章： [为什么我的 z-index 又不生效了？](https://mp.weixin.qq.com/s?__biz=Mzk0NTI2NDgxNQ==&mid=2247485708&idx=1&sn=e0bbc4755dc078402697a075ff3c0d05&chksm=c31948ccf46ec1da01851d7c8e585e07e0bb5088996cf60bf1ef779b4a54d7c8584a17da4796#rd)
