---
level: 1
---

# 什么是HTML5，以及和HTML的区别是什么？

## 参考答案

HTML5是HTML的新标准，其主要目标是无需任何额外的插件如Flash、Silverlight等，就可以传输所有内容。它囊括了动画、视频、丰富的图形用户界面等。

HTML5是由万维网联盟（W3C）和 `Web Hypertext Application Technology Working Group` 合作创建的HTML新版本。

## 区别

从文档声明类型上看：

HTML是很长的一段代码，很难记住。如下代码：
```html
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
```

```
```

* HTML4.0：没有体现结构语义化的标签，通常都是这样来命名的 `<div id="header"></div>`，这样表示网站的头部。
* HTML5：在语义上却有很大的优势。提供了一些新的标签，比如：`<header><article><footer>`。

## 拓展

不输入<!DOCTYPE html>，浏览器将无法识别html文件，因此html将无法正常工作。
