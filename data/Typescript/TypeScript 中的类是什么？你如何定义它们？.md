---
level: 2
---

# TypeScript 中的类是什么？你如何定义它们？

## 参考答案

类表示一组相关对象的共享行为和属性。

例如，我们的类可能是Student，其所有对象都具有该attendClass方法。另一方面，John是一个单独的 type 实例，Student可能有额外的独特行为，比如attendExtracurricular.

你使用关键字声明类class：
```
    studCode: number;    
    studName: string;    
    constructor(code: number, name: string) {    
    	this.studName = name;    
    	this.studCode = code; 
    }
 }
```
