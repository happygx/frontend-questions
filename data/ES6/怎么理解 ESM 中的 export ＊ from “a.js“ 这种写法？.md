---
level: 2
---

# 怎么理解 ESM 中的 export * from "a.js" 这种写法？

## 题目要点

- `export * from 'a.js'` 是将 `a.js` 的所有**命名导出**重新导出；
- 常用于统一封装模块接口，提升模块复用性；
- 不导出默认值，若需要导出默认值，需要显式写 `export { default } from 'a.js'`。

## 参考答案

在 ESM（ES Modules）中，`export * from "a.js"` 的作用是：**将 `a.js` 中的所有命名导出（`named exports`）重新导出（re-export）**，供当前模块的使用者使用。

---

### 等价理解：

```js
export const foo = 'foo';
export const bar = 'bar';

// 那么在 b.js 中写：
export * from './a.js';
// 相当于重新导出了 foo 和 bar

// 使用时
import { foo, bar } from './b.js'; // 可以正常使用
```

### 注意事项：
1. 不会导出 `a.js` 中的默认导出（`export default`）。
2. 如果当前模块中已经存在相同名称的导出，会发生冲突，抛出错误。
3. 它是 **重新导出**，并不会在当前模块声明变量或函数。

---

### 应用场景：

- **统一出口模块（barrel 文件）**：

```js
export * from './math.js';
export * from './string.js';
export * from './date.js';

// 在其他地方可以统一引入
import { formatDate, sum } from './utils';
```
