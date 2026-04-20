---
level: 1.5
---

# js 函数参数有默认值时，如果传递的参数是 undefined 那么会被默认值赋值吗？

## 题目要点

在 JavaScript 中，当函数参数具有默认值时，传递 `undefined` 作为参数会导致该参数使用默认值。这种机制使得默认值能够在未提供参数或明确传递 `undefined` 时生效。

## 参考答案

在 JavaScript 中，如果函数参数有默认值，并且调用函数时传递的参数是 `undefined`，那么该参数会被赋予默认值。这是由于 JavaScript 的参数默认值机制的设计。

### 默认值机制

当函数参数具有默认值时，默认值机制会在以下情况下生效：

- **未传递参数**：如果调用函数时没有提供该参数，则会使用默认值。
- **传递 `undefined`**：如果显式地将 `undefined` 作为参数传递，默认值机制会将其视为未提供参数，从而使用默认值。

### 示例

```javascript
    console.log(`Hello, ${name}!`);
}

greet();             // 输出: Hello, Guest!
greet('Alice');      // 输出: Hello, Alice!
greet(undefined);    // 输出: Hello, Guest!
```

- **`greet()`**：没有传递参数，因此 `name` 使用默认值 `'Guest'`。
- **`greet('Alice')`**：传递了 `'Alice'`，因此 `name` 的值是 `'Alice'`。
- **`greet(undefined)`**：显式传递了 `undefined`，所以 `name` 使用默认值 `'Guest'`。

### 注意事项

- 如果传递其他假值（如 `null`, `0`, `false`）作为参数，它们不会触发默认值机制，除非明确传递 `undefined`。

```javascript
    console.log(value);
}

test(null);  // 输出: null
test(0);     // 输出: 0
test(false); // 输出: false
```
