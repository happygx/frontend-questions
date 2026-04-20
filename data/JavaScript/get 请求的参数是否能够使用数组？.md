---
level: 2.5
---

# get 请求的参数是否能够使用数组？

## 题目要点

GET 请求中传递数组是可以实现的，但需要根据实际应用和后端处理的能力选择合适的方式。每种方式有其优缺点，选择时应考虑服务器端的解析能力、数据的复杂性及编码格式的可读性。

## 参考答案

GET 请求的参数可以使用数组。

虽然在 URL 查询字符串中直接表示数组略有复杂，但有几种常见的方式来实现数组的传递。以下是一些常见的处理数组参数的方法：

### 1. **使用重复的参数名**

最简单的方法是使用重复的参数名，每个数组元素作为一个独立的参数传递。例如，传递一个数组 `[1, 2, 3]` 可以表示为：

```
```

### 2. **使用方括号表示法**

在一些编程环境中，可以使用方括号表示法来传递数组，这种方式可以表示嵌套的数组和对象。例如：

```
```

### 3. **使用逗号分隔的字符串**

另一种常见的方法是将数组元素用逗号或其他分隔符连接成一个字符串。例如：

```
```

### 4. **使用 JSON 字符串**

在一些情况下，可以将数组序列化为 JSON 字符串进行传递。例如：

```
```

### **示例代码**

**前端示例：**

```javascript
const array = [1, 2, 3];
const queryString = array.map(value => `numbers=${value}`).join('&');
const url = `https://example.com?${queryString}`;

// 使用方括号表示法
const queryStringBrackets = array.map(value => `numbers[]=${value}`).join('&');
const urlBrackets = `https://example.com?${queryStringBrackets}`;

// 使用逗号分隔的字符串
const queryStringComma = `numbers=${array.join(',')}`;
const urlComma = `https://example.com?${queryStringComma}`;

// 使用 JSON 字符串
const queryStringJSON = `numbers=${encodeURIComponent(JSON.stringify(array))}`;
const urlJSON = `https://example.com?${queryStringJSON}`;
```

```javascript
  // 使用重复的参数名
  const numbers = req.query.numbers; // [1, 2, 3] - 自动解析为数组

  // 使用方括号表示法
  const numbersBrackets = req.query['numbers[]']; // [1, 2, 3] - 自动解析为数组

  // 使用逗号分隔的字符串
  const numbersComma = req.query.numbers.split(','); // ['1', '2', '3'] - 需要转换为数字数组

  // 使用 JSON 字符串
  const numbersJSON = JSON.parse(req.query.numbers); // [1, 2, 3]
});
```
