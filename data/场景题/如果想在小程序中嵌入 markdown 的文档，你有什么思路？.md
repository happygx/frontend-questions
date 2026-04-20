---
level: 3
---

# 如果想在小程序中嵌入 markdown 的文档，你有什么思路？

## 题目要点

* 转成 html 后，使用 `rich-text` 或者其他方式进行渲染
* 使用第三方库渲染 `markdown`文档，比如 `wxParse` 或 `towxml`

## 参考答案

小程序不支持直接渲染 `markdown`，但是支持富文本的渲染，可以将文档转成 html 后进行渲染，或者使用一些第三方的库直接进行 `markdown`完成渲染。

### **1. 转成 html 后渲染**

- **步骤**：
  1. 使用 Markdown 解析库（如 `marked`、`markdown-it` 等）将 Markdown 文本转换为 HTML。
  2. 使用小程序的 `<web-view>` 、`<rich-text>` 组件，或者自定义的组件渲染转换后的 HTML。

- **示例**：
  ```javascript
  // 在 JavaScript 文件中
  import marked from 'marked';

  // 将 Markdown 转换为 HTML
  const markdownText = '# Hello World\nThis is a Markdown document.';
  const html = marked(markdownText);

  // 将转换后的 HTML 传递给小程序的页面或组件
  this.setData({ html });
  ```

  ```html
  <!-- 在 WXML 文件中 -->
  <rich-text nodes="{{html}}" />
  ```

### **2. 使用第三方的组件库**

可以使用第三方库，如 `wxParse` 或 `towxml` 进行渲染。这些库可以将 Markdown 文本解析为微信小程序可以理解的组件和数据。

以下是使用 `wxParse` 的基本步骤：

1. 下载并导入 `wxParse` 到你的项目中。
2. 在需要使用的页面的 JS 文件中，引入 `wxParse.js`。
3. 使用 `wxParse.wxParse('markdown', 'md', markdownContent, this)` 方法将 Markdown 文本解析为数据和组件。
4. 在对应的 WXML 文件中，使用 `<import src="wxParse.wxml"/>` 导入 `wxParse` 的 WXML。
5. 在需要显示 Markdown 的地方，使用 `<template is="wxParse" data="{{wxParseData:markdown.nodes}}"/>` 显示解析后的内容。

以下是使用 `wxParse` 渲染 Markdown 的代码示例：

```javascript
var wxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    markdown: ''
  },
  onLoad: function(options) {
    var that = this;
    var markdownContent = '# 这是一个标题\n这是一段普通的文本';
    wxParse.wxParse('markdown', 'md', markdownContent, that);
  }
});
```
<!-- 引入 wxParse.wxml -->
<import src="../../wxParse/wxParse.wxml"/>
<view>
  <!-- 显示解析后的内容 -->
  <template is="wxParse" data="{{wxParseData:markdown.nodes}}"/>
</view>
```
