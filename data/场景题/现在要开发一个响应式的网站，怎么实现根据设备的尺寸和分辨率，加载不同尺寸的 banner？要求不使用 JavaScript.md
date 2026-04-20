---
level: 3
---

# 现在要开发一个响应式的网站，怎么实现根据设备的尺寸和分辨率，加载不同尺寸的 banner？要求不使用 JavaScript

## 题目要点

### 1. `<picture>` 元素
- **优点**：
  - 支持根据媒体条件加载不同的图像，适应各种设备。
  - 语义清晰，便于维护和理解。
- **缺点**：
  - 需要较多的 HTML 代码。
  - 对老旧浏览器的支持有限。

### 2. `srcset` 属性
- **优点**：
  - 允许在同一 `<img>` 标签中定义多种图像，便于管理。
  - 根据设备的像素比加载合适的图片，优化性能。
- **缺点**：
  - 需要理解 `sizes` 属性的用法，有一定学习曲线。
  - 对于复杂的布局可能不够灵活。

### 3. 媒体查询
- **优点**：
  - 强大的 CSS 控制，适用于背景图像和其他元素。
  - 易于使用，不需要额外的 HTML 标签。
- **缺点**：
  - 只能用于背景图，不能直接替换 `<img>` 标签的内容。
  - 可能会导致 CSS 复杂度增加，影响可维护性。

### 4. `image-set()`
- **优点**：
  - 可以根据设备像素比选择合适的图像，提升清晰度。
  - 语法简洁，可以在 CSS 中直接使用。
- **缺点**：
  - 浏览器支持情况不如其他方法广泛，可能影响兼容性。
  - 对于不同屏幕尺寸的适配能力有限。

## 参考答案

### 使用 `<picture>` 元素

```html
    <source media="(min-width: 1200px)" srcset="banner-large.jpg">
    <source media="(min-width: 600px)" srcset="banner-medium.jpg">
    <img src="banner-small.jpg" alt="Banner Image">
</picture>
```

### 使用 `srcset` 属性

如果只想使用 `<img>` 标签，可以这样做：

```html
     srcset="banner-medium.jpg 600w,
             banner-large.jpg 1200w"
     sizes="(min-width: 1200px) 100vw,
            (min-width: 600px) 50vw,
            100vw"
     alt="Banner Image">
```

是的，媒体查询和 `image-set()` 也可以用于实现响应式图片，下面是如何使用它们：

### 媒体查询

你可以使用 CSS 媒体查询来根据屏幕尺寸设置背景图像。例如：

```css
    background-image: url('banner-small.jpg');
}

@media (min-width: 600px) {
    .banner {
        background-image: url('banner-medium.jpg');
    }
}

@media (min-width: 1200px) {
    .banner {
        background-image: url('banner-large.jpg');
    }
}
```

### `image-set()`

如果你使用 CSS，可以利用 `image-set()` 来根据设备像素比加载不同的图片：

```css
    background-image: image-set(
        url('banner-small.jpg') 1x,
        url('banner-medium.jpg') 2x,
        url('banner-large.jpg') 3x
    );
}
```
