---
level: 1
---

# Object.prototype.hasOwnProperty() 作用是什么？

## 参考答案

`Object.prototype.hasOwnProperty()` 是一个用于检查对象是否具有某个指定的自有属性的方法。这个方法的作用是确认对象自身是否包含某个属性，而不是通过原型链继承的属性。

### **作用**

- **检查自有属性**：`hasOwnProperty` 只检查对象自身是否具有指定的属性，不会检查原型链上的属性。
- **防止属性冲突**：在遍历对象属性时（如使用 `for...in` 循环），可以使用 `hasOwnProperty` 来过滤掉从原型链继承来的属性，确保只处理对象自身的属性。

### **用法示例**

```javascript
  name: 'John',
  age: 30
};

console.log(obj.hasOwnProperty('name')); // true
console.log(obj.hasOwnProperty('age'));  // true
console.log(obj.hasOwnProperty('toString')); // false, 'toString' 是从原型链继承来的属性
```

- 这个方法不检查属性的值，只检查属性的存在性。
- `hasOwnProperty` 也是 `Object.prototype` 上的方法，因此可以在任何对象上使用，前提是不要重写或遮蔽这个方法。
