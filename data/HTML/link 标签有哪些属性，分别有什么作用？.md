---
level: 2
---

# link 标签有哪些属性，分别有什么作用？

## 题目要点

- **`href`**：指定资源 URL。
- **`rel`**：定义文档与资源的关系。
- **`type`**：指定资源 MIME 类型（主要用于样式表）。
- **`media`**：定义样式表的媒体条件。
- **`sizes`**：定义图标的尺寸。
- **`as`**：指定预加载资源的类型。
- **`crossorigin`**：设置跨域请求处理方式。

## 参考答案

`<link>` 标签在 HTML 中用于链接外部资源，最常见的是用于引入样式表（CSS）。它可以有多个属性，每个属性具有不同的作用。

以下是常用的 `<link>` 标签属性及其作用：

### **常用属性**

1. **`href`**

   - **作用**：指定要链接的外部资源的 URL。
   - **示例**：
     ```html
     <link rel="stylesheet" href="styles.css">
     ```

2. **`rel`**

   - **作用**：定义当前文档与目标资源之间的关系。用于指示链接资源的类型。
   - **常见值**：
     - `stylesheet`：指示链接的资源是一个样式表。
     - `icon`：指示链接的资源是网站图标（favicon）。
     - `preload`：指示预加载资源（如字体、脚本）。
     - `prefetch`：指示预取资源，以便在用户可能需要时可以更快地加载。
   - **示例**：
     ```html
     <link rel="stylesheet" href="styles.css">
     <link rel="icon" href="favicon.ico">
     ```

3. **`type`**

   - **作用**：指定链接资源的 MIME 类型，通常用于描述资源的类型（主要用于 `<style>`）。
   - **示例**：
     ```html
     <link rel="stylesheet" type="text/css" href="styles.css">
     ```

4. **`media`**

   - **作用**：指定样式表应用的媒体类型或设备条件。用于响应式设计，决定样式表在哪些条件下应用。
   - **常见值**：
     - `all`：所有设备。
     - `screen`：屏幕设备。
     - `print`：打印设备。
     - `(min-width: 600px)`：具有至少 600 像素宽度的设备。
   - **示例**：
     ```html
     <link rel="stylesheet" media="print" href="print.css">
     <link rel="stylesheet" media="(min-width: 600px)" href="responsive.css">
     ```

5. **`sizes`**

   - **作用**：定义图标的尺寸。这对于不同尺寸的图标非常有用，例如用于高分辨率屏幕上的不同图标大小。
   - **示例**：
     ```html
     <link rel="icon" href="favicon.ico" sizes="32x32">
     <link rel="icon" href="favicon-large.ico" sizes="64x64">
     ```

6. **`as`**

   - **作用**：指定加载资源的类型，主要用于资源预加载（`rel="preload"`）。
   - **常见值**：
     - `script`：脚本。
     - `style`：样式表。
     - `font`：字体。
     - `image`：图像。
   - **示例**：
     ```html
     <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin="anonymous">
     ```

7. **`crossorigin`**

   - **作用**：设置如何处理跨域请求（尤其在涉及到字体和图像时）。通常与 `rel="preload"` 和 `as` 属性一起使用。
   - **常见值**：
     - `anonymous`：不发送凭证（cookies、HTTP认证信息等）。
     - `use-credentials`：发送凭证。
   - **示例**：
     ```html
     <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin="anonymous">
     ```
