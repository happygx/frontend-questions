---
level: 0.5
---

# html 中的视频，怎么添加字幕？

## 题目要点

通过在 `<video>` 标签中使用 `<track>` 标签，可以方便地为视频添加字幕，提升用户体验，尤其是在多语言环境中。确保字幕文件格式正确并正确设置属性，以便视频播放器能够识别和显示字幕。

## 参考答案

在 HTML 中，可以通过 `<track>` 标签为视频添加字幕。这个标签通常与 `<video>` 标签一起使用。以下是如何添加字幕的步骤和示例：

### **步骤**

1. **准备字幕文件**：通常使用 WebVTT 格式（.vtt 文件），其中包含时间戳和对应的字幕文本。

2. **使用 `<track>` 标签**：在 `<video>` 标签内添加 `<track>` 标签，指定字幕的属性。

### **示例代码**

```html
  <source src="video.mp4" type="video/mp4">
  <track src="subtitles.vtt" kind="subtitles" srclang="en" label="English">
  <track src="subtitles-zh.vtt" kind="subtitles" srclang="zh" label="中文">
  Your browser does not support the video tag.
</video>
```

- **src**：指定字幕文件的路径。
- **kind**：字幕类型，常用值有：
  - `subtitles`：表示字幕，通常用于翻译内容。
  - `captions`：表示听障者的字幕，包含额外的描述信息。
  - `descriptions`：描述性字幕，提供视频内容的额外信息。
  - `chapters`：章节标题。
- **srclang**：字幕语言的代码（如 `en`、`zh`）。
- **label**：用户界面中显示的语言名称。
