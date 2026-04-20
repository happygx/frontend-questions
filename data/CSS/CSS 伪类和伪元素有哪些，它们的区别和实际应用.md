---
level: 1
---

# CSS 伪类和伪元素有哪些，它们的区别和实际应用

## 题目要点

- **伪类**：用于选择和样式化元素的状态和结构特征。
- **伪元素**：用于选择元素的部分或插入新的内容。

## 参考答案

CSS 伪类和伪元素用于选择和样式化 DOM 元素的特定状态或部分。它们有不同的作用和用法。以下是它们的区别、常见类型及实际应用：

### **CSS 伪类**

伪类用于选择元素的特定状态或特性。例如：

1. **`:hover`** - 选择当鼠标悬停在元素上时的状态。
   ```css
   a:hover {
     color: red;
   }
   ```

2. **`:focus`** - 选择当元素获得焦点时的状态，通常用于输入框。
   ```css
   input:focus {
     border-color: blue;
   }
   ```

3. **`:nth-child(n)`** - 选择父元素中第 `n` 个子元素。
   ```css
   li:nth-child(2) {
     color: green;
   }
   ```

4. **`:first-child`** - 选择父元素中的第一个子元素。
   ```css
   p:first-child {
     font-weight: bold;
   }
   ```

5. **`:last-child`** - 选择父元素中的最后一个子元素。
   ```css
   p:last-child {
     margin-bottom: 0;
   }
   ```

6. **`:not(selector)`** - 选择不匹配指定选择器的元素。
   ```css
   div:not(.active) {
     opacity: 0.5;
   }
   ```

7. **`:checked`** - 选择已选中的输入框（如复选框、单选框）。
   ```css
   input:checked {
     background-color: yellow;
   }
   ```

### **CSS 伪元素**

伪元素用于选择元素的特定部分，通常创建新的元素内容。例如：

1. **`::before`** - 在元素的内容之前插入内容。
   ```css
   p::before {
     content: "Note: ";
     font-weight: bold;
   }
   ```

2. **`::after`** - 在元素的内容之后插入内容。
   ```css
   p::after {
     content: " [end]";
     color: gray;
   }
   ```

3. **`::first-line`** - 选择元素的第一行文本。
   ```css
   p::first-line {
     font-weight: bold;
   }
   ```

4. **`::first-letter`** - 选择元素的第一个字母。
   ```css
   p::first-letter {
     font-size: 2em;
   }
   ```

### **区别**

- **伪类**：选择元素的状态或结构特征。伪类的选择器是 `:pseudo-class`，如 `:hover`、`:focus`。伪类主要用于根据用户交互或元素在文档中的位置来改变样式。

- **伪元素**：选择元素的特定部分或添加新的内容。伪元素的选择器是 `::pseudo-element`，如 `::before`、`::after`。伪元素主要用于插入额外的样式或内容到元素的特定位置。

### **实际应用**

- **伪类应用**：
  - **`:hover`**：用于在用户将鼠标悬停在元素上时改变样式，常用于按钮和链接。
  - **`:nth-child()`**：用于选中具有特定位置的子元素，常用于条目列表和表格行的样式。

- **伪元素应用**：
  - **`::before` 和 `::after`**：用于在元素前后插入内容，常用于图标、装饰性文本等。
  - **`::first-line` 和 `::first-letter`**：用于对文本的首行或首字母应用样式，常用于排版和设计效果。
