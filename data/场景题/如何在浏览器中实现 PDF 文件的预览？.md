---
level: 2
---

# 如何在浏览器中实现 PDF 文件的预览？

## 题目要点

- **简单的嵌入方式**：使用 `<embed>` 或 `<iframe>` 标签直接嵌入 PDF 文件，适合简单预览。
- **复杂的交互需求**：使用 **PDF.js**，可以实现多页显示、缩放、旋转等交互功能，适合需要更高自定义的场景。
- **第三方库或插件**：可以使用现成的解决方案如 **PDFObject** 或 **react-pdf**，便于快速集成。

## 参考答案

以下是几种实现思路：

### 1. **使用 HTML 的 `<embed>` 标签**
`<embed>` 标签可以用来嵌入 PDF 文件，直接在浏览器中显示预览。大多数现代浏览器都内置了对 PDF 文件的支持。

#### 示例代码：

```html
```
- `type`：指定文件类型为 `application/pdf`，这样浏览器会知道应该如何处理该文件。
- `width` 和 `height`：指定预览区域的大小。

**优点**：实现简单，兼容性较好。

**缺点**：功能相对简单，无法进行交互操作（如跳转页面、放大缩小等）。

### 2. **使用 `<iframe>` 标签**
你可以使用 `<iframe>` 标签嵌入 PDF 文件，浏览器会自动加载 PDF 文件并显示预览。

#### 示例代码：

```html
```
- `width` 和 `height`：指定 `iframe` 的大小，控制预览区域。

**优点**：与 `<embed>` 类似，简单易用，且支持浏览器内置的 PDF 阅读器。

**缺点**：功能有限，交互性较弱。

### 3. **使用 `PDF.js` 库**
[PDF.js](https://mozilla.github.io/pdf.js/) 是 Mozilla 提供的一个开源库，允许在网页中渲染和查看 PDF 文件。它可以让你自定义 PDF 的渲染，并提供更多的交互功能，例如翻页、缩放等。

#### 步骤：
1. 引入 PDF.js 库：
   
```html
```

3. 使用 PDF.js 加载并渲染 PDF 文件。

#### 示例代码：

```html

<script>
  // 加载 PDF 文件
  const url = 'path/to/your/file.pdf';
  
  // 使用 PDF.js 加载 PDF 文件
  pdfjsLib.getDocument(url).promise.then(function (pdf) {
    console.log('PDF loaded');
    
    // 获取第一页
    pdf.getPage(1).then(function (page) {
      console.log('Page loaded');
      
      const scale = 1.5; // 设置缩放比例
      const viewport = page.getViewport({ scale: scale });
      
      // 获取渲染上下文
      const canvas = document.getElementById('pdf-canvas');
      const context = canvas.getContext('2d');
      
      // 设置 canvas 的尺寸
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      // 渲染 PDF 页面
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    });
  });
</script>
```
1. 使用 `pdfjsLib.getDocument(url)` 加载 PDF 文件。
2. 使用 `pdf.getPage(1)` 获取第一页，并使用 `<canvas>` 渲染该页面。
3. 可以通过 `scale` 参数设置渲染的缩放比例。

**优点**：功能强大，支持多页、缩放、旋转等多种交互功能。

**缺点**：实现较复杂，需要引入 PDF.js 库，适合需求较高的场景。

### 4. **使用第三方插件或组件**
如果不想自己实现 PDF 渲染，可以使用一些现成的第三方组件或插件，它们提供了丰富的功能和配置选项。

- **[react-pdf](https://github.com/wojtekmaj/react-pdf)**：如果你使用 React，可以使用这个库来加载和显示 PDF 文件。
- **[PDFObject](https://pdfobject.com/)**：这是一个简单的 JavaScript 库，用于嵌入 PDF 文件到网页中，支持更多的自定义选项。

#### 示例：使用 PDFObject

```html
<div id="pdf-container" style="width: 600px; height: 400px;"></div>

<script>
  PDFObject.embed("path/to/your/file.pdf", "#pdf-container");
</script>
```

**缺点**：与自定义方案相比，灵活性略低。

### 5. **使用浏览器的内置 PDF 阅读器**
如果不想使用额外的库，浏览器本身通常都自带 PDF 阅读器。只需使用 `<embed>` 或 `<iframe>` 标签嵌入 PDF 文件，浏览器会自动使用内置的 PDF 阅读器显示文件。或者直接在新标签页中打开 pdf 文件实现显示。
