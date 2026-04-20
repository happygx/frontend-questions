---
level: 2.5
---

# 如何在TypeScript中实现继承？

## 题目要点

**作答思路：**

在TypeScript中，可以通过`extends`关键字来实现继承。子类可以继承父类的属性和方法，并且可以覆盖父类的方法。

**考察要点**：

1. **继承概念**：理解继承的概念和用途。
2. **实现方式**：了解如何在TypeScript中使用`extends`关键字来实现继承。

## 参考答案

继承是一种从另一个类获取一个类的属性和行为的机制。它是OOPs语言的一个重要方面，并且具有从现有类创建新类的能力，继承成员的类称为基类，继承这些成员的类称为派生类。

继承可以通过使用extend关键字来实现。我们可以通过下面的例子来理解它。
```
   Area:number     
   constructor(area:number) {     
      this.Area = area    
   }     
}     
class Circle extends Shape {     
   display():void {     
      console.log("圆的面积: "+this.Area)     
   }     
}    
var obj = new Circle(320);     
obj.display()  
```
