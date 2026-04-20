---
level: 1.5
---

# HTML5 有哪些 drag 相关的 API ？


## 题目要点

HTML5 的拖拽 API 提供了一种标准化的方式来实现拖拽操作，支持从元素的拖拽到目标区域的放置。通过合理使用拖拽事件和 `dataTransfer` 对象，可以实现丰富的用户交互体验。虽然拖拽 API 提供了强大的功能，但在复杂的实现中需要注意浏览器兼容性和复杂的事件处理。

## 参考答案

HTML5 的拖拽（Drag and Drop）API 允许用户通过拖拽操作在网页上移动元素或数据。这个 API 是在 HTML5 中引入的，它提供了一种标准的方式来实现拖拽功能。以下是对 HTML5 拖拽 API 的详细介绍：

### 基本概念

- **拖拽源（Drag Source）**：可以被拖拽的元素。通过设置 `draggable` 属性为 `true`，元素可以成为拖拽源。
- **拖拽目标（Drop Target）**：接受被拖拽元素的区域。拖拽源元素被拖拽到目标区域时，目标区域会处理拖拽操作。

### 主要步骤

1. **使元素可拖拽**：
   - 在需要拖拽的元素上设置 `draggable="true"` 属性。

2. **处理拖拽事件**：
   - **`dragstart`**：当拖拽操作开始时触发。通常用于设置拖拽数据。
   - **`drag`**：在拖拽过程中不断触发。用于提供实时反馈。
   - **`dragend`**：拖拽操作结束时触发。用于清理或更新 UI。

3. **处理拖拽目标**：
   - **`dragenter`**：当拖拽元素进入目标区域时触发。
   - **`dragover`**：当拖拽元素悬停在目标区域上方时触发。必须调用 `event.preventDefault()` 才能接受拖拽。
   - **`dragleave`**：当拖拽元素离开目标区域时触发。
   - **`drop`**：当拖拽元素在目标区域放下时触发。用于处理放置逻辑。

### 示例代码

**HTML**：
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML5 Drag and Drop</title>
    <style>
        #drag-source {
            width: 100px;
            height: 100px;
            background-color: lightblue;
            margin: 20px;
            text-align: center;
            line-height: 100px;
            cursor: move;
        }
        #drop-target {
            width: 200px;
            height: 200px;
            background-color: lightgreen;
            border: 2px dashed gray;
            margin: 20px;
            text-align: center;
            line-height: 200px;
        }
    </style>
</head>
<body>
    <div id="drag-source" draggable="true">Drag me</div>
    <div id="drop-target">Drop here</div>

    <script>
        const dragSource = document.getElementById('drag-source');
        const dropTarget = document.getElementById('drop-target');

        // Drag start event
        dragSource.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', 'Dragged data');
        });

        // Drag over event
        dropTarget.addEventListener('dragover', (event) => {
            event.preventDefault(); // Necessary to allow dropping
            dropTarget.style.backgroundColor = 'lightyellow';
        });

        // Drag leave event
        dropTarget.addEventListener('dragleave', () => {
            dropTarget.style.backgroundColor = 'lightgreen';
        });

        // Drop event
        dropTarget.addEventListener('drop', (event) => {
            event.preventDefault();
            dropTarget.style.backgroundColor = 'lightgreen';
            const data = event.dataTransfer.getData('text/plain');
            dropTarget.textContent = `Dropped: ${data}`;
        });
    </script>
</body>
</html>
```

1. **`draggable` 属性**：使元素可以被拖拽。设置 `draggable="true"` 启用拖拽。
2. **`dataTransfer` 对象**：在 `dragstart` 事件中使用 `event.dataTransfer` 设置和获取拖拽数据。
3. **`preventDefault()`**：在 `dragover` 事件中调用 `event.preventDefault()` 允许放置操作。
4. **事件处理**：通过监听不同的拖拽事件来实现自定义的拖拽行为。

### 优点

- **标准化**：HTML5 拖拽 API 提供了浏览器一致的拖拽行为，避免了以前自定义拖拽实现的不一致性。
- **简洁**：使用标准的事件处理方式实现拖拽功能，无需依赖第三方库。

### 缺点

- **兼容性**：虽然现代浏览器都支持 HTML5 拖拽 API，但旧版浏览器和某些环境可能不完全支持。
- **复杂性**：处理拖拽事件可能涉及较多的事件监听和状态管理，特别是在复杂的应用中。
