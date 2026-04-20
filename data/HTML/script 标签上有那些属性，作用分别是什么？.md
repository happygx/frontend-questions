---
level: 2
---

# script 标签上有那些属性，作用分别是什么？

## 题目要点

- **核心属性**：`src`、`type`、`defer`、`async` 是最常用的，控制脚本的加载、执行顺序和类型。
- **现代化支持**：`crossorigin`、`integrity`、`nomodule` 和 `referrerpolicy` 等属性则提供了现代浏览器的安全性和兼容性支持。
- **过时属性**：`language`、`event`、`for` 等属性已经过时，应该避免使用。

## 参考答案

`<script>` 标签是 HTML 中用于嵌入或引用 JavaScript 代码的标签。它有多个属性，可以控制脚本的加载和执行方式。以下是常见的 `<script>` 标签属性及其作用：

### 1. **src**
   - **作用**：指定外部 JavaScript 文件的 URL。
   - **用法**：当使用 `src` 属性时，`<script>` 标签内部的内容会被忽略。
   - **示例**：
     ```html
     <script src="path/to/your/script.js"></script>
     ```

### 2. **type**
   - **作用**：指定脚本的 MIME 类型，通常用于区分不同类型的脚本。
   - **默认值**：`text/javascript`，也可以是 `module` 用于引入 ES6 模块。
   - **示例**：
     ```html
     <script type="module" src="path/to/your/module.js"></script>
     ```

### 3. **defer**
   - **作用**：延迟脚本的执行，直到 HTML 文档完全解析完毕。适用于外部脚本文件。
   - **注意**：只有当 `script` 标签有 `src` 属性时，这个属性才有效。
   - **示例**：
     ```html
     <script src="path/to/your/script.js" defer></script>
     ```

### 4. **async**
   - **作用**：异步加载脚本文件，加载完后立即执行，不会阻塞 HTML 的解析。适用于外部脚本文件。
   - **注意**：`async` 和 `defer` 不能同时使用，如果都写了，`async` 会被忽略。
   - **示例**：
     ```html
     <script src="path/to/your/script.js" async></script>
     ```

### 5. **charset**
   - **作用**：指定外部脚本文件的字符编码，通常用于避免字符集问题。
   - **用法**：仅在 `src` 属性存在时使用。
   - **示例**：
     ```html
     <script src="path/to/your/script.js" charset="UTF-8"></script>
     ```

### 6. **crossorigin**
   - **作用**：控制跨域请求的设置，用于指定如何处理跨域脚本。
   - **值**：
     - `anonymous`：不发送用户凭据（如 Cookies 或 HTTP 认证）。
     - `use-credentials`：发送用户凭据。
   - **示例**：
     ```html
     <script src="https://example.com/script.js" crossorigin="anonymous"></script>
     ```

### 7. **integrity**
   - **作用**：用于验证外部脚本的完整性，通过对比哈希值确保脚本文件未被篡改。
   - **示例**：
     ```html
     <script src="https://example.com/script.js" integrity="sha384-OgVRvuATP..."></script>
     ```

### 8. **nomodule**
   - **作用**：指定在不支持 ES6 模块的浏览器中不执行此脚本。
   - **用法**：常与 `type="module"` 配合使用，提供对旧浏览器的兼容。
   - **示例**：
     ```html
     <script nomodule src="path/to/your/script.js"></script>
     ```

### 9. **referrerpolicy**
   - **作用**：控制加载外部脚本时的 `Referer` HTTP 头部的内容。
   - **值**：`no-referrer`, `origin`, `origin-when-cross-origin`, `unsafe-url` 等。
   - **示例**：
     ```html
     <script src="https://example.com/script.js" referrerpolicy="no-referrer"></script>
     ```

### 10. **language** (Deprecated)
   - **作用**：指定脚本语言，但已废弃，不再推荐使用。
   - **示例**：
     ```html
     <script language="JavaScript">/* script content */</script>
     ```

### 11. **event** (Deprecated)
   - **作用**：指定在何种事件下加载脚本，已废弃。
   - **示例**：
     ```html
     <script event="onload">/* script content */</script>
     ```

### 12. **for** (Deprecated)
   - **作用**：与 `event` 属性配合使用，指定触发事件的对象，已废弃。
   - **示例**：
     ```html
     <script for="window" event="onload">/* script content */</script>
     ```
