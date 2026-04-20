---
level: 2
---

# 如何将 unknown 类型指定为一个更具体的类型？

## 题目要点

**作答思路：**

在TypeScript中，可以将`unknown`类型指定为一个更具体的类型，通过类型断言（Type Assertion）或类型保护（Type Guard）来实现。

1. **类型断言**：

   ```typescript
   let value: unknown;
   if (typeof value === 'string') {
     value = 'hello';
   }
   ```

2. **类型保护**：

   ```typescript
   let value: unknown;
   if (typeof value === 'string') {
     value = 'hello';
   } else if (typeof value === 'number') {
     value = 42;
   }
   ```

**考察要点**：

1. **类型断言**：理解如何使用类型断言将`unknown`类型指定为一个更具体的类型。
2. **类型保护**：理解如何使用类型保护来安全地处理`unknown`类型。

## 参考答案

* 使用 typeof 进行类型判断（这些缩小类型范围的技术都有助于TS基于控制流程下的类型分析）
```ts
    if (typeof value === "string") {
     return value;
    }
  
    return String(value);
  }
```

要强制编译器信任类型为 unknown 的值为给定类型，则可以使用类型断言：

```ts
  const foo: string = value; // Error
  const bar: string = value as string; // OK
```

```ts

  const bar: number = value as number; // runtime Error
```
