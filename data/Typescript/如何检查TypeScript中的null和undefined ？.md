---
level: 4
---

# 如何检查TypeScript中的null和undefined ？

## 题目要点

**作答思路：**

在TypeScript中，可以通过类型保护（Type Guard）来检查`null`和`undefined`。以下是几种检查`null`和`undefined`的方法：

1. **使用typeof和===操作符**：

   ```typescript
   if (typeof value === 'undefined' || value === null) {
     // 处理null或undefined
   }
   ```

3. **使用`!`操作符进行强制类型转换**：

   ```typescript
   if (value !== null && value !== undefined) {
     // 确保value不是null或undefined
   }
   ```

4. **使用联合类型**：

   ```typescript
   function check(value: string | null | undefined): boolean {
     return value !== null && value !== undefined;
   }
   ```

5. **使用类型断言**：

   ```typescript
   if (value as string !== undefined) {
     // 假设value是string类型，并且不为undefined
   }
   ```

**考察要点**：

1. **类型保护**：理解如何使用类型保护来检查`null`和`undefined`。
2. **强制类型转换**：了解如何使用`!`操作符进行强制类型转换。

## 参考答案

通过使用一个缓冲检查，我们可以检查空和未定义:
```
}  
```

例子
```
var b: number = null;  
function check(x, name) {  
    if (x == null) {  
        console.log(name + ' == null');  
    }  
    if (x === null) {  
        console.log(name + ' === null');  
    }  
    if (typeof x === 'undefined') {  
        console.log(name + ' is undefined');  
    }  
}  
check(a, 'a');  
check(b, 'b');  
```
```
"a is undefined"  
"b == null"  
"b === null"  
```
