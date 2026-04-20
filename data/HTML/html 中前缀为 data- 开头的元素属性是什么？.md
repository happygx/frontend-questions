---
level: 3
---

# html 中前缀为 data- 开头的元素属性是什么？

## 题目要点

`data-` 属性提供了一种简洁的方法来将自定义数据存储在 HTML 元素中，这些数据可通过 JavaScript 进行访问和操作，而不会影响页面的标准表现。它们是现代 Web 开发中用于处理元素相关数据的有用工具。

## 参考答案

在 HTML 中，前缀为 `data-` 的元素属性被称为 **自定义数据属性**（Custom Data Attributes）。这些属性用于存储与元素相关的私有数据，供 JavaScript 使用，而不会影响页面的样式或行为。

### 主要特点

1. **自定义数据存储**：
   - 自定义数据属性允许开发者在 HTML 元素上存储额外的信息，这些信息不会影响 HTML 的标准行为或样式。

2. **不影响页面表现**：
   - `data-` 属性不会被浏览器默认处理或渲染，它们只用于存储数据并可通过 JavaScript 访问。

3. **灵活性**：
   - 自定义数据属性名称是自由定义的，只需以 `data-` 为前缀，并且后面跟着自定义的名称。例如，`data-user-id` 和 `data-info` 都是合法的自定义数据属性。

### 语法

```html
  ...
</element>
```

```html
  User Info
</div>
```

**使用 JavaScript 访问**：

```javascript

// 获取自定义数据属性
const userId = element.getAttribute('data-user-id');
const role = element.getAttribute('data-role');

console.log(userId); // 输出: 12345
console.log(role);   // 输出: admin

// 使用 dataset 访问
const data = element.dataset;
console.log(data.userId); // 输出: 12345
console.log(data.role);   // 输出: admin
```

- `dataset` 属性是一个对象，包含了所有以 `data-` 开头的属性，以驼峰命名的形式作为键（例如，`data-user-id` 会被访问为 `dataset.userId`）。
- 属性名称中只允许使用字母、数字、`-` 和 `_`。在 JavaScript 中访问时，连字符（-）会被转换为驼峰命名法（例如，`data-user-id` 变成 `dataset.userId`）。

### 使用场景

- **存储动态数据**：如用户信息、状态标识等。
- **实现交互**：通过将数据附加到元素上，可以在事件处理程序中使用这些数据来控制行为或更新 UI。
- **避免在 HTML 中硬编码数据**：在不修改 DOM 结构的情况下存储和访问附加数据。
