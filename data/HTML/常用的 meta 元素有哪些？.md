---
level: 1
---

# 常用的 meta 元素有哪些？

## 题目要点

- **字符集**：`<meta charset="UTF-8">`
- **描述**：`<meta name="description" content="...">`
- **关键词**：`<meta name="keywords" content="...">`
- **作者**：`<meta name="author" content="...">`
- **视口**：`<meta name="viewport" content="...">`
- **刷新和重定向**：`<meta http-equiv="refresh" content="...">`
- **网页权限设置**：`<meta name="robots" content="...">`
- **兼容性**：`<meta http-equiv="X-UA-Compatible" content="IE=edge">`
- **Open Graph** 和 **Twitter Card** 元素用于社交媒体优化：`<meta property="og:image" content="...">`、`<meta name="twitter:card" content="summary_large_image">`

## 参考答案

> The <meta> tag provides metadata about the HTML document. Metadata will not be displayed on the page, but will be machine parsable.

<meta> 元素标签是提供有关HTML文档的元数据，元数据不会显示在页面上，但是能够被机器识别。

总而言之, meta标签是用来让机器识别的，同时它对SEO起着重要的作用。

## charset

指定了html文档的编码格式，常用的是utf-8(Unicode的字符编码)，还有ISO-8859-1(拉丁字母的字符编码)。当然还有其他的，但是一般不常用也就不介绍了

```html
```

指定元数据的名称(这部分对SEO非常有用)

* author——定义了页面的作者

```html
```

```html
```

```html
```

```
initial-scale=1.0——设置浏览器首次加载页面时的初始缩放比例(0.0-10.0正数)
maximum-scale=1.0——允许用户缩放的最大比例(0.0-10.0正数)，必须大于等于minimum-scale
minimum-scale=1.0——允许用户缩放的最小比例(0.0-10.0正数)，必须小于等于maximum-scale
user-scalable=no——是否允许用户手动缩放(yes或者no)
```
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minmum-scale=1.0">
```

> which contains the identifier of the software that generated the page.

```html
```

```html
```

> Provides an HTTP header for the information/value of the content attribute

* refresh——每30s刷新一次文档

```html
```

```html
```

* Cache-Control——请求和响应遵循的缓存机制，可以声明缓存的内容，修改过期时间，可多次声明

> no-transform——不得对资源进行转换或转变。
> no-siteapp——禁止百度进行转码

```html
<meta http-equiv="Cache-Control" content="no-siteapp">
```

可以让网页成为一个富媒体对象，同意网页内容被其他网站引用，同时在应用的时候不会只是一个链接，会提取相应的信息展现给用户。

```html
<meta property="og:url" content="https://zjgyb.github.io/index.html">
<meta property="og:site_name" content="tony's blog">
```
