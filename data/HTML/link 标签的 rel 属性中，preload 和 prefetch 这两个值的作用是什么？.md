---
level: 2.5
---

#  link 标签的 rel 属性中，preload 和 prefetch 这两个值的作用是什么？

## 题目要点

- **`preload`**：优先加载当前页面需要的关键资源，以提升页面加载速度。
- **`prefetch`**：预取未来可能需要的资源，以提高未来导航的速度。

## 参考答案

在 HTML 中，`rel` 属性用于定义当前文档与目标资源之间的关系。`preload` 和 `prefetch` 是 `rel` 属性的两个值，主要用于优化资源的加载策略。

### **`preload`**

- **作用**：指定浏览器在页面加载时优先加载资源。适用于关键资源（如字体、脚本、样式表），可以提高页面加载速度和用户体验。
- **用法**：用于在文档加载时预加载资源，确保它们在需要时可以快速访问。
- **示例**：
  ```html
  <link rel="preload" href="styles.css" as="style">
  <link rel="preload" href="script.js" as="script">
  <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin="anonymous">
  ```

  在这个示例中：
  - `styles.css` 和 `script.js` 会在页面加载时被预加载。
  - `font.woff2` 也会被预加载，并指定了资源的类型和跨域策略。

### **`prefetch`**

- **作用**：指示浏览器预取资源，这些资源在未来的导航或用户交互中可能会被用到。适用于不是立即需要的资源，但预计在将来会用到的场景。
- **用法**：用于在空闲时加载资源，以加快未来页面的加载速度。
- **示例**：
  ```html
  <link rel="prefetch" href="next-page.html">
  <link rel="prefetch" href="extra-data.json">
  ```

  在这个示例中：
  - `next-page.html` 和 `extra-data.json` 会被预取，以便在用户访问时更快地加载。
