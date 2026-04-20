---
level: 1
---

# 手写实现一个缓存函数 memoize

## 参考答案

下面是一个简单的手写 `memoize` 函数实现：

### 实现

```javascript
    // 创建一个 Map 对象，用于存储缓存结果
    const cache = new Map();

    // 返回一个新的函数，这个函数会使用缓存
    return function(...args) {
        // 将参数转换为一个唯一的键
        const key = JSON.stringify(args);

        // 检查缓存中是否已有结果
        if (cache.has(key)) {
            return cache.get(key);
        }

        // 调用原始函数并存储结果
        const result = fn(...args);
        cache.set(key, result);

        return result;
    };
}

// 示例用法
function slowFunction(n) {
    // 模拟一个耗时操作
    for (let i = 0; i < 1e6; i++) {}
    return n * n;
}

// 创建一个缓存版本的 slowFunction
const memoizedSlowFunction = memoize(slowFunction);

console.time('First call');
console.log(memoizedSlowFunction(5)); // 输出: 25
console.timeEnd('First call'); // 第一次调用会比较慢

console.time('Second call');
console.log(memoizedSlowFunction(5)); // 输出: 25
console.timeEnd('Second call'); // 第二次调用会更快，因为结果被缓存了
```

1. **`memoize` 函数**：
   - 接受一个函数 `fn` 作为参数。
   - 创建一个 `Map` 对象 `cache` 用于存储函数调用的结果，`Map` 是用于存储键值对的结构，支持按键访问。
   - 返回一个新函数，该函数首先检查缓存中是否存在对应参数的结果：
     - 如果存在，直接返回缓存中的结果。
     - 如果不存在，计算结果、缓存它，并返回结果。

2. **`JSON.stringify(args)`**：
   - 将函数参数转换为一个唯一的键，以便在 `Map` 中存储和检索结果。这种方式适用于简单参数（如基本数据类型和对象），但对于复杂对象（如函数、日期等），可能需要更复杂的键生成策略。

3. **性能测试**：
   - 使用 `console.time` 和 `console.timeEnd` 测量函数调用的时间。第一次调用通常较慢，因为需要计算并缓存结果；第二次调用较快，因为结果已经在缓存中。

### 注意事项

- **键的唯一性**：`JSON.stringify` 对于复杂的对象或参数可能会生成不唯一的键。如果需要处理更复杂的参数或数据类型，可以考虑其他方法来生成唯一键（例如，使用哈希函数）。
- **缓存清理**：上面的实现没有清理缓存。如果函数的输入参数非常多或者结果很大，可能需要实现缓存清理策略来避免内存泄漏。

### 扩展

可以根据实际需求对 `memoize` 函数进行扩展，例如添加缓存大小限制、定时缓存清理等。
