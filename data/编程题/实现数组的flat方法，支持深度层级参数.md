---
level: 2
---

# 实现数组的flat方法，支持深度层级参数

## 参考答案

实现 `Array.prototype.flat` 方法，支持指定深度层级的数组扁平化，可以按照以下步骤进行：

1. **定义函数**：创建一个 `flat` 方法，接受一个可选的深度层级参数。
2. **递归处理**：根据深度层级递归地将嵌套的数组元素展开。
3. **处理非数组元素**：将非数组元素直接添加到结果中。

### 实现代码

```javascript
    // 如果深度为 0，直接返回当前数组的副本
    if (depth < 1) {
        return [...this];
    }

    // 递归扁平化数组
    const flatten = (arr, d) => {
        let result = [];
        for (const item of arr) {
            // 如果元素是数组并且深度大于 0，则递归扁平化
            if (Array.isArray(item) && d > 0) {
                result.push(...flatten(item, d - 1));
            } else {
                result.push(item);
            }
        }
        return result;
    };

    return flatten(this, depth);
};

// 示例用法
const arr = [1, [2, [3, [4, 5]]], 6];
console.log(arr.myFlat());       // 输出: [1, 2, [3, [4, 5]], 6]
console.log(arr.myFlat(1));      // 输出: [1, 2, [3, [4, 5]], 6]
console.log(arr.myFlat(2));      // 输出: [1, 2, 3, [4, 5], 6]
console.log(arr.myFlat(3));      // 输出: [1, 2, 3, 4, 5, 6]
console.log(arr.myFlat(0));      // 输出: [1, [2, [3, [4, 5]]], 6]
```

1. **深度检查**：
   - `depth = 1`：设定默认深度为 1。
   - 如果深度为 0，则返回数组的浅拷贝。

2. **递归扁平化函数 `flatten`**：
   - 遍历数组中的每个元素。
   - 如果元素是数组且当前深度大于 0，则递归调用 `flatten`，将深度减 1。
   - 否则，直接将元素推入结果数组中。

3. **合并结果**：
   - 使用展开运算符 `...` 合并递归结果。

### 总结

- **自定义 `flat` 方法**：实现了支持指定深度层级的数组扁平化。
- **递归处理**：处理多层嵌套数组，深度层级控制扁平化的程度。
- **灵活性**：支持不同深度层级的扁平化操作，可以处理各种嵌套结构。
