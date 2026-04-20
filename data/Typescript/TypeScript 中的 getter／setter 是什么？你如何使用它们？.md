---
level: 3
---

# TypeScript 中的 getter/setter 是什么？你如何使用它们？

## 题目要点

**作答思路：**

在TypeScript中，`getter`和`setter`是一对用于读取和修改类属性的方法。它们用于封装对属性的访问，以提供更好的数据保护和类型检查。
使用`getter`和`setter`的步骤如下：

1. **定义属性**：在类中定义一个属性。
2. **定义getter**：为属性定义一个getter方法，它没有参数，并返回属性值。
3. **定义setter**：为属性定义一个setter方法，它接受一个参数，并设置属性值。
4. **使用getter和setter**：通过属性名来调用getter和setter，而不是直接访问属性。

**考察要点**：

1. **getter和setter概念**：理解getter和setter的基本概念和用途。
2. **使用步骤**：了解如何定义和使用getter和setter。

## 参考答案

Getter 和 setter 是特殊类型的方法，可帮助你根据程序的需要委派对私有变量的不同级别的访问。

Getters 允许你引用一个值但不能编辑它。Setter 允许你更改变量的值，但不能查看其当前值。这些对于实现封装是必不可少的。

例如，新雇主可能能够了解get公司的员工人数，但无权set了解员工人数。

```typescript
class Employee {
  private _fullName: string = "";
  get fullName(): string {
    return this._fullName;
  }
  set fullName(newName: string) {
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error("fullName has a max length of " + fullNameMaxLength);
    }
    this._fullName = newName;
  }
}
let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
  console.log(employee.fullName);
}
```
