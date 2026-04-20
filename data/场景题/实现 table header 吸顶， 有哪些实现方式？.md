---
level: 3
---

# 实现 table header 吸顶， 有哪些实现方式？

## 题目要点

- **`position: sticky`**：简单且现代的 CSS 解决方案，易于实现，但兼容性需确认。
- **JavaScript 滚动监听**：更灵活，可自定义，但需处理额外的滚动事件。
- **第三方库**：提供丰富的功能，适合需要更多特性的场景，但增加了依赖。

## 参考答案

实现 table header 吸顶的效果有几种方法，主要包括使用 CSS 的 `position: sticky` 属性、JavaScript 的滚动监听、以及使用第三方库。

以下是常见的实现方式：

### **1. 使用 `position: sticky`**

- **定义**：CSS `position: sticky` 属性使元素在滚动到一定位置时固定在视口的某个位置。
- **实现**：
  ```html
  <style>
    .table-container {
      max-height: 400px; /* 限制表格容器的高度 */
      overflow-y: auto;  /* 启用垂直滚动条 */
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th {
      position: sticky;
      top: 0; /* 吸顶位置 */
      background: #f1f1f1; /* 背景色以遮盖滚动内容 */
      z-index: 1; /* 确保 th 在内容之上 */
    }
  </style>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </tr>
      </thead>
      <tbody>
        <!-- Table rows go here -->
      </tbody>
    </table>
  </div>
  ```

### **2. 使用 JavaScript 滚动监听**

- **定义**：通过监听滚动事件，将表头的 `position` 设置为 `fixed` 来实现吸顶效果。
- **实现**：
  ```html
  <style>
    .table-container {
      max-height: 400px; /* 限制表格容器的高度 */
      overflow-y: auto;  /* 启用垂直滚动条 */
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th.fixed {
      position: fixed;
      top: 0; /* 吸顶位置 */
      background: #f1f1f1; /* 背景色以遮盖滚动内容 */
      z-index: 1; /* 确保 th 在内容之上 */
    }
  </style>
  <div class="table-container" id="tableContainer">
    <table>
      <thead>
        <tr id="header">
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </tr>
      </thead>
      <tbody>
        <!-- Table rows go here -->
      </tbody>
    </table>
  </div>

  <script>
    const tableContainer = document.getElementById('tableContainer');
    const header = document.getElementById('header');

    tableContainer.addEventListener('scroll', () => {
      if (tableContainer.scrollTop > 0) {
        header.classList.add('fixed');
      } else {
        header.classList.remove('fixed');
      }
    });
  </script>
  ```

### **3. 使用第三方库**

- **例子**：可以使用像 [DataTables](https://datatables.net/) 或 [Sticky Table Headers](https://github.com/wycats/sticky-table-headers) 这样的库，它们提供了更复杂的表头固定功能和其他表格功能。
- **实现**：通常只需要引入库和配置选项即可实现固定表头的效果。例如，使用 DataTables 的配置选项：
  ```javascript
  $(document).ready(function() {
    $('#example').DataTable({
      scrollY: '400px',
      scrollCollapse: true,
      paging: false
    });
  });
  ```
