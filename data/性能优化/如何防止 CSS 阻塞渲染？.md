---
level: 2
---

# 如何防止 CSS 阻塞渲染？

## 题目要点

- **内联关键 CSS**：加快页面渲染，减少外部请求。
- **延迟加载非关键 CSS**：通过 `rel="preload"` 延迟加载不重要的 CSS 文件。
- **CSS 分块和优化**：减少 CSS 文件的大小和复杂度。
- **使用 `media` 属性**：将 CSS 文件标记为仅在特定条件下加载。

## 参考答案

CSS 阻塞渲染是指浏览器在加载和解析 CSS 时，会阻止页面的渲染，直到 CSS 被完全下载和解析完毕。这会导致页面加载变慢。以下是一些防止或减轻 CSS 阻塞渲染的策略：

### **1. 使用 `media` 属性**

通过使用 `media` 属性将 CSS 文件标记为在特定条件下才需要加载，可以防止不必要的 CSS 阻塞渲染。

```html
```

### **2. 将 CSS 文件置于 `<head>` 中**

虽然将 CSS 文件放在 `<head>` 部分会阻塞渲染，但它是保证页面样式准确加载的必要方式。要确保在 `<head>` 部分中尽量精简和优化 CSS 以减少阻塞时间。

### **3. 内联关键 CSS**

将关键 CSS 直接嵌入到 HTML 的 `<head>` 中，减少外部请求：

```html
  /* 关键 CSS 代码 */
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  /* 其他关键样式 */
</style>
```

### **4. 延迟加载非关键 CSS**

使用 `rel="preload"` 或 `rel="stylesheet"` 来延迟加载非关键 CSS 文件，这些 CSS 文件对首屏渲染不是必需的：

```html
```

### **5. 使用 CSS 分块**

将 CSS 文件拆分为多个较小的文件，仅加载当前视图所需的 CSS 文件。这样可以减少单个 CSS 文件的体积，提高加载效率。

```html
<link rel="stylesheet" href="home.css" media="(min-width: 600px)">
```

### **6. 优化 CSS 文件**

- **压缩 CSS**：使用工具（如 CSSnano 或 Clean-CSS）来压缩 CSS 文件，去除空格和注释，以减少文件大小。
- **删除未使用的 CSS**：通过工具（如 PurgeCSS）去除未使用的 CSS 代码，减小文件体积。

### **7. 使用 CSS 自定义属性（变量）**

尽量减少 CSS 文件中的重复代码，使用 CSS 变量来优化样式的管理。

```css
  --primary-color: #3498db;
}
body {
  color: var(--primary-color);
}
```
