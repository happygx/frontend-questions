---
level: 3
---

# never 是什么类型，详细讲一下

## 题目要点

- **`never` 类型**：表示不可能发生的值，适用于不会返回值的函数或不可能到达的代码路径。
- **应用场景**：
  - **函数**：函数不会正常返回（例如抛出错误或无限循环）。
  - **类型保护**：确保所有分支都处理完毕。
  - **函数参数**：表示函数参数的值从不出现。

## 参考答案

在 TypeScript 中，`never` 是一个特殊的类型，它表示“从不”发生的值。换句话说，`never` 类型用于表示那些不可能存在的值或永远不会完成的情况。它通常用于以下几种场景：

### **1. 不可能的返回值**

`never` 类型常用于函数的返回类型，表示该函数不会正常返回。通常这种情况发生在函数抛出错误或者函数进入无限循环时。

**示例**：

```typescript
  throw new Error(message);  // 函数抛出错误，不会返回任何值
}

function infiniteLoop(): never {
  while (true) {
    // 永远不会退出循环
  }
}
```

### **2. 类型保护中的 `never`**

`never` 类型也可以用于类型保护来确保所有可能的情况都被处理。常用于 `switch` 语句或其他条件语句中，确保每个分支都已被处理。

**示例**：

```typescript

function getAnimalSound(animal: Animal): string {
  switch (animal) {
    case "dog":
      return "Woof!";
    case "cat":
      return "Meow!";
    default:
      // 确保所有可能的值都已处理
      const _exhaustiveCheck: never = animal;
      throw new Error(`Unhandled case: ${_exhaustiveCheck}`);
  }
}
```

### **3. 作为函数参数**

`never` 类型也可以用于函数参数中，表示函数参数类型应该从不出现这种情况。例如，某些类型保护函数可以返回 `never` 来表示某种类型的不存在。

**示例**：

```typescript
  throw new Error(`Unexpected value: ${x}`);
}

function handle(value: "a" | "b") {
  switch (value) {
    case "a":
      console.log("Handling 'a'");
      break;
    case "b":
      console.log("Handling 'b'");
      break;
    default:
      assertNever(value);  // 如果 value 不是 "a" 或 "b"，将会触发类型错误
  }
}
```
