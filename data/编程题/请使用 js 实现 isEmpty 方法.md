---
level: 2
---

# 请使用 js 实现 isEmpty 方法

## 题目要点

- `null` / `undefined` → 空  
- 空数组 / 空对象 / 空字符串 → 空  
- `0` 被视为空（根据题意）  
- 空 Map / Set 判断 `size === 0`  
- 其他值都视为非空

## 参考答案

示例代码：

```js
  if (value == null) return true; // null 或 undefined
  if (typeof value === 'string' && value.trim() === '') return true;
  if (typeof value === 'number' && value === 0) return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  return false;
}
```
