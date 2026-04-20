---
level: 1.5
---

# 对于 PC 端的 banner 组件，你会怎么适配超宽的屏幕？

## 题目要点

- 内容区域设置 `max-width` 居中是关键  
- 背景使用 cover/拉伸延展增强视觉体验  
- 保持视觉焦点在中间，避免 banner 被拉伸变形

## 参考答案

在 PC 端适配超宽屏幕的 banner 组件时，目标是让视觉中心不偏移，同时保证两边留白或延展自然：

1. **限制内容区域最大宽度，居中显示**
   ```css
   .banner-inner {
     max-width: 1440px;
     margin: 0 auto;
   }
   ```

2. **背景色或背景图延展至两侧**
   ```css
   .banner {
     background: url('banner-bg.jpg') center/cover no-repeat;
   }
   ```

3. **左右背景延展，内容区域居中**
   - 内容居中处理视觉聚焦
   - 背景可设置为**拉伸图像**、**渐变**或**重复填充**

4. **媒体查询控制布局变化**（如在超大屏时调整 padding/margin 等）
 
5. 使用一些工具库，通过拾取 banner 图片的背景色，实现灵活过度和模块背景色填充
