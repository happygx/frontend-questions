---
level: 1
---

# offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别？

## 题目要点

offsetWidth/offsetHeight：包含元素的边框、内边距和滚动条（如果有）的总宽度/高度，但不包括外边距。

clientWidth/clientHeight：元素内部可视区域的宽度/高度，包含内边距，但不包括边框、外边距和滚动条。

scrollWidth/scrollHeight：元素内容的实际宽度/高度，包括因overflow而溢出的部分。如果内容未溢出，则与clientWidth/clientHeight相同。

## 参考答案

`offsetWidth`、`offsetHeight`、`clientWidth`、`clientHeight`与`scrollWidth`、`scrollHeight`是JavaScript中用于获取元素尺寸的几个重要属性，它们各自有不同的应用场景和返回值。以下是它们之间的区别：

### 1. offsetWidth/offsetHeight

- **定义**：这两个属性分别表示元素的布局宽度和高度，包括元素的边框（border）、内边距（padding）和垂直/水平滚动条（如果存在的话）。但不包括外边距（margin）。
- **用途**：常用于计算元素在页面中占用的总空间大小。
- **示例**：如果一个元素的CSS样式为`width: 100px; padding: 10px; border: 5px solid black;`，且存在垂直滚动条（假设滚动条宽度为15px），则`offsetWidth`将返回`130px`（100px + 2*10px + 2*5px - 不包括margin，但包括滚动条宽度）。

### 2. clientWidth/clientHeight

- **定义**：这两个属性分别表示元素内部的可视区域宽度和高度，即元素内容加上内边距（padding），但不包括边框（border）、外边距（margin）和滚动条（scrollbar）的尺寸。
- **用途**：常用于获取元素内容区域的大小。
- **示例**：对于相同的元素样式（如上所述），`clientWidth`将返回`120px`（100px + 2*10px - 不包括border和scrollbar）。

### 3. scrollWidth/scrollHeight

- **定义**：这两个属性分别表示元素内容的实际宽度和高度，包括由于`overflow`属性导致溢出而不可见的部分。如果元素内容没有溢出，则它们的值分别与`clientWidth`和`clientHeight`相等。
- **用途**：常用于判断元素内容是否溢出，以及获取元素内容的完整尺寸。
- **示例**：如果元素的内容宽度为`150px`，但元素的可视区域宽度（`clientWidth`）只有`120px`，则`scrollWidth`将返回`150px`。

### 总结表格

| 属性           | 描述                                                                           | 包括的部分                           | 不包括的部分                       |
|----------------|--------------------------------------------------------------------------------|------------------------------------|----------------------------------|
| offsetWidth    | 元素的布局宽度，包括边框、内边距和滚动条（如果存在）                             | 边框、内边距、滚动条（如果存在）       | 外边距、溢出内容（不占用额外空间） |
| offsetHeight   | 元素的布局高度，包括边框、内边距和滚动条（如果存在）                             | 边框、内边距、滚动条（如果存在）       | 外边距、溢出内容（不占用额外空间） |
| clientWidth    | 元素内部可视区域的宽度，包括内边距，但不包括边框、外边距和滚动条                 | 内边距                               | 边框、外边距、滚动条、溢出内容     |
| clientHeight   | 元素内部可视区域的高度，包括内边距，但不包括边框、外边距和滚动条                 | 内边距                               | 边框、外边距、滚动条、溢出内容     |
| scrollWidth    | 元素内容的实际宽度，包括溢出的部分                                             | 内容宽度（包括溢出部分）             | 边框、外边距、滚动条（不占用额外空间）|
| scrollHeight   | 元素内容的实际高度，包括溢出的部分                                             | 内容高度（包括溢出部分）             | 边框、外边距、滚动条（不占用额外空间）|
