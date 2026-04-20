---
level: 2
---

# escape、encodeURI、encodeURIComponent 有什么区别？

## 题目要点

- **`escape`**：已过时，不推荐使用。对非 ASCII 字符和某些特殊字符进行编码，但处理不完全准确。
- **`encodeURI`**：用于编码整个 URI，但保留 URI 中具有特殊意义的字符（如 `:`、`/`、`?`、`#`）。
- **`encodeURIComponent`**：用于编码 URI 组件（如查询参数），会编码所有非字母数字字符，包括具有特殊意义的字符。

选择哪个函数取决于你需要编码的内容是整个 URI 还是 URI 的一部分。如果是 URI 的一部分（如查询参数），使用 `encodeURIComponent`；如果是整个 URI，则使用 `encodeURI`。

## 参考答案

`escape`、`encodeURI` 和 `encodeURIComponent` 都是 JavaScript 中用于编码 URI 组件的函数，但它们的用途和处理方式有所不同。以下是对这三者的详细解释和区别：

### 1. `escape`

- **描述**：`escape` 是一个过时的函数，用于对字符串进行 URL 编码。它将非 ASCII 字符和一些特殊字符转换为百分号编码（%xx）格式。
- **语法**：`escape(string)`
- **用途**：在现代 Web 开发中，`escape` 已不推荐使用，因为它不能正确处理所有字符，并且对非 ASCII 字符和一些保留字符（如 `+`, `/`）的编码不完全准确。
- **示例**：
  ```javascript
  console.log(escape('Hello World!')); // 输出: Hello%20World%21
  ```

### 2. `encodeURI`

- **描述**：`encodeURI` 用于对整个 URI 进行编码，但保留 URI 中的特殊字符，如冒号、斜杠、问号和井号，这些字符在 URI 中有特定含义。
- **语法**：`encodeURI(uri)`
- **用途**：当你需要编码一个完整的 URI 时（例如，URL 中的查询参数），使用 `encodeURI` 是合适的，它会对 URI 中的非字母数字字符进行编码，但不会编码那些在 URI 中有特殊意义的字符。
- **示例**：
  ```javascript
  console.log(encodeURI('https://example.com/search?q=hello world')); 
  // 输出: https://example.com/search?q=hello%20world
  ```

### 3. `encodeURIComponent`

- **描述**：`encodeURIComponent` 用于对 URI 组件（例如，查询字符串中的参数）进行编码。它会编码所有非字母数字字符，包括那些在 URI 中有特殊意义的字符。
- **语法**：`encodeURIComponent(component)`
- **用途**：当你需要编码 URI 的一部分，例如查询参数的值，使用 `encodeURIComponent` 是合适的。它会将所有非字母数字字符（包括 `&`, `=`, `?`, `#` 等）都进行编码。
- **示例**：
  ```javascript
  console.log(encodeURIComponent('hello world&foo=bar')); 
  // 输出: hello%20world%26foo%3Dbar
  ```
