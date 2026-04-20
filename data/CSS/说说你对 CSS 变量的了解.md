---
level: 2
---

# 说说你对 CSS 变量的了解

## 参考答案

CSS 变量（也叫自定义属性）是 CSS 中的一项重要特性，允许开发者在样式表中定义可以重复使用的值，并可以在不同的地方引用这些值。CSS 变量使得样式的管理和维护更加灵活，尤其在处理复杂的设计系统和动态主题时非常有用。

### 1. **定义 CSS 变量**
   CSS 变量使用 `--` 前缀来定义，并且可以在任意选择器中定义。它们可以在任何作用域中声明，作用域决定了变量的可访问范围。

   ```css
   :root {
       --primary-color: #3498db; /* 定义全局变量 */
   }
   ```

   - `:root` 选择器表示文档的根元素（通常是 `<html>`），定义在 `:root` 中的变量是全局变量，可以在整个文档中使用。
   - 可以在其他元素或类中定义局部变量，但这些变量的作用域仅限于其定义的上下文。

### 2. **使用 CSS 变量**
   使用 CSS 变量时，通过 `var()` 函数来引用变量的值。例如：

   ```css
   body {
       background-color: var(--primary-color); /* 使用 CSS 变量 */
   }
   ```

   - `var(--primary-color)` 用来获取 `--primary-color` 变量的值，并将其应用于 `background-color` 属性。

### 3. **作用域**
   - **全局作用域**：如果在 `:root` 中定义变量，它可以在整个文档中访问。
   - **局部作用域**：如果在某个元素或类中定义变量，它仅在该元素及其子元素中有效。

   ```css
   :root {
       --global-color: red; /* 全局变量 */
   }

   .container {
       --container-color: green; /* 局部变量，仅在.container及其子元素有效 */
   }

   .header {
       color: var(--global-color); /* 使用全局变量 */
   }

   .footer {
       color: var(--container-color); /* 使用局部变量 */
   }
   ```

### 4. **默认值**
   CSS 变量可以为 `var()` 函数提供一个默认值，当变量未定义或值为空时，使用默认值。默认值在 `var()` 的第二个参数中指定。

   ```css
   .content {
       color: var(--text-color, black); /* 如果 --text-color 未定义，则使用 black */
   }
   ```

### 5. **动态修改 CSS 变量**
   CSS 变量具有动态性，可以通过 JavaScript 来修改它们的值。修改变量时，浏览器会立即重新渲染受影响的元素，使得它们能够响应变化。

   ```javascript
   document.documentElement.style.setProperty('--primary-color', '#e74c3c');
   ```

   - 这段代码修改了 `:root` 中定义的 `--primary-color` 变量，使其值变为 `#e74c3c`，并立即应用到文档中的所有引用此变量的地方。

### 6. **继承和覆盖**
   CSS 变量支持继承，这意味着子元素可以继承父元素定义的变量的值。变量可以被覆盖，并且具有局部作用域。

   ```css
   :root {
       --main-color: blue;
   }

   .child {
       --main-color: red; /* 重写父元素的 --main-color 变量 */
       color: var(--main-color); /* 子元素的文字颜色为 red */
   }
   ```

   在这个例子中，`.child` 类中的 `--main-color` 会覆盖 `:root` 中的全局变量。

### 7. **支持的浏览器**
   CSS 变量被大多数现代浏览器支持，包括 Chrome、Firefox、Safari 和 Edge。但在老版本的浏览器（如 IE）中并不支持，因此在使用时需要考虑兼容性问题。
