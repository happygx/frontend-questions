---
level: 2
---

# 如何禁用a标签跳转页面或定位链接?

## 参考答案

当页面中a标签不需要任何跳转时，从原理上来讲，可分如下两种方法：

* 标签属性href，使其指向空或不返回任何内容。如：

```html

<a href="javascript:;" >点此无反应javascript:</a>
```

html方法：

```html
<a href="#" onclick="return false;">return false;</a>
```

```javascript
```
```css
```
