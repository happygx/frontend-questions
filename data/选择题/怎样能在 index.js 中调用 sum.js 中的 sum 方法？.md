---
level: 1
---

# 怎样能在 index.js 中调用 sum.js 中的 sum 方法？

## 参考答案

使用符号 `*`，我们引入文件中的所有值，包括默认和具名。如果我们有以下文件：
```javascript
export const name = "Lydia";
export const age = 21;
export default "I love JavaScript";
// index.js
import * as info from "./info";
console.log(info);
```
```javascript
  default: "I love JavaScript",
  name: "Lydia",
  age: 21
}
```
```javascript
```
