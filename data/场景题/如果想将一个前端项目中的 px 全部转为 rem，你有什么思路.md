---
level: 2
---

# 如果想将一个前端项目中的 px 全部转为 rem，你有什么思路

## 题目要点

1. **自动化工具**（如 PostCSS 插件）能够高效地将所有 `px` 转换为 `rem`，适合大规模项目。
2. 通过 **Sass 或 Less** 自定义函数，也可以实现自动化转换，适用于有预处理器的项目。

## 参考答案

对于大型项目，手动转换显然不现实，可以使用一些自动化工具来处理 `px` 到 `rem` 的转换。

- **PostCSS 插件**：使用 [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 插件来自动将 `px` 转换为 `rem`。
  
  安装：
  ```bash
  npm install postcss-pxtorem --save-dev
  ```

  配置 `postcss.config.js`：
  ```js
  module.exports = {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 16,    // 根元素字体大小
        propList: ['*'],  // 需要转换的属性，* 表示所有
        minPixelValue: 2  // 小于 2px 的不会被转换
      }
    }
  }
  ```

  这样，所有 `px` 单位将根据根元素的字体大小自动转换为 `rem`。

- **CSS 预处理器方案（如 Sass 或 Less）**

还可以使用 Sass 或 Less 结合一些函数来进行转换。例如，使用 Sass 自定义函数来实现 `px` 到 `rem` 的转换：

```scss

@function px-to-rem($px) {
  @return $px / $base-font-size * 1rem;
}

body {
  font-size: px-to-rem(16px);  // 转换为 rem
}
```
