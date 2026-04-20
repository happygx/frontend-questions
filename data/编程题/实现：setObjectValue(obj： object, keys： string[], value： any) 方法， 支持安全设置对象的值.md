---
level: 3
---

# 实现：setObjectValue(obj: object, keys: string[], value: any) 方法， 支持安全设置对象的值

## 参考答案

要实现一个 `setObjectValue` 方法，能够安全地设置对象的值，并支持通过键路径访问和设置值，可以按照以下步骤进行：

### **功能说明**

- **`obj`**: 需要修改的对象。
- **`keys`**: 一个字符串数组，表示键路径，例如 `['a', 'b', 'c']` 代表 `obj.a.b.c`。
- **`value`**: 要设置的值。

### **实现代码**

```typescript
  if (!keys.length) return;

  // 遍历 keys 除了最后一个键
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    // 如果当前路径的对象不存在，则创建它
    if (!(key in current)) {
      // 使用空对象作为默认值
      (current as any)[key] = {};
    }
    
    // 移动到下一个嵌套的对象
    current = (current as any)[key];
  }

  // 设置最后一个键的值
  const lastKey = keys[keys.length - 1];
  (current as any)[lastKey] = value;
}

// 示例用法
const obj = {};
setObjectValue(obj, ['a', 'b', 'c'], 42);
console.log(obj); // 输出: { a: { b: { c: 42 } } }
```

1. **初始化检查**: 如果 `keys` 数组为空，则直接返回，不执行任何操作。
2. **遍历键路径**: 遍历 `keys` 除了最后一个键。对于每个键，如果当前对象中不存在这个键，则创建一个新的对象。这样可以确保嵌套路径的所有中间对象都存在。
3. **设置值**: 在最后一个键的位置设置目标值。

### **注意事项**

- **对象检测**: 在遍历中，使用 `(current as any)[key]` 来动态访问对象属性。确保中间对象可以被正确初始化。
- **深度克隆**: 如果需要避免对已有对象的影响，可以考虑实现深度克隆，但这超出了当前需求范围。

这种实现方式可以有效地处理复杂的嵌套路径，并保证在设置值之前路径中的所有部分都被正确创建。
