---
level: 3
---

# TypeScript中的方法重写是什么?

## 题目要点

**作答思路：**

在TypeScript中，方法重写（Method Overriding）是指子类覆盖父类的方法。当子类的方法与父类的方法同名时，子类的方法会覆盖父类的方法。

**考察要点**：

1. **方法重写概念**：理解方法重写的概念和用途。
2. **覆盖规则**：了解方法重写的覆盖规则和条件。

## 参考答案

如果子类(子类)具有与父类中声明的相同的方法，则称为方法覆盖。换句话说，在派生类或子类中重新定义基类方法。

方法重写的规则

* 该方法必须具有与父类相同的名称
* 该方法必须具有与父类相同的参数。
* 必须有一个IS-A关系(继承)。

例子
```
    doPrint(): any {  
        super.doPrint();  
        console.log("Called Child class.");  
    }  
    doInkJetPrint(): any {  
        console.log("Called doInkJetPrint().");  
    }  
}  
let printer: new () => NewPrinter;  
printer.doPrint();  
printer.doInkJetPrint();  
```
