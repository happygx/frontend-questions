---
level: 3
---

# ES5怎么实现继承

## 题目要点

在 ES5 中，实现继承的方法主要包括：

1. **原型链继承**：通过原型链，一个对象继承另一个对象的属性和方法。
2. **借用构造函数继承**：通过调用父类的构造函数来继承其属性，但不继承方法。
3. **组合继承**：结合原型链继承和借用构造函数继承的优点，继承属性和方法。
4. **原型式继承**：使用 `Object.create()` 方法创建一个新对象，该对象继承自另一个对象。
5. **寄生式继承**：创建一个继承自原型的对象，然后扩展这个对象，最后返回这个扩展后的对象。
6. **寄生组合式继承**：结合原型链继承和寄生式继承的优点，通过调用超类型的构造函数来继承属性，然后通过原型链继承方法。

详细实现参考答案

## 参考答案

在 ES5 中，实现继承主要有以下几种方式：
1. **原型链继承**：
   通过将一个对象的 `__proto__` 属性指向另一个对象的 `prototype` 属性，可以实现继承。
   ```javascript
   function Parent() {
     this.parentProperty = true;
   }
   Parent.prototype.getParentProperty = function() {
     return this.parentProperty;
   };
   function Child() {
     this.childProperty = false;
   }
   // 继承 Parent
   Child.prototype = new Parent();
   Child.prototype.getChildProperty = function() {
     return this.childProperty;
   };
   var child = new Child();
   console.log(child.getParentProperty()); // true
   console.log(child.getChildProperty()); // false
   ```
2. **借用构造函数继承**：
   通过复制一个对象的属性和方法到另一个对象，实现继承。
   ```javascript
   function Parent(name) {
     this.name = name;
     this.colors = ['red', 'blue', 'green'];
   }
   Parent.prototype.sayName = function() {
     console.log(this.name);
   };
   function Child(name, age) {
     Parent.call(this, name); // 借用构造函数
     this.age = age;
   }
   var child = new Child('Nicholas', 29);
   console.log(child.colors); // ['red', 'blue', 'green']
   console.log(child.age); // 29
   ```
3. **组合继承**：
   结合原型链继承和借用构造函数继承的优点。
   ```javascript
   function Parent(name) {
     this.name = name;
     this.colors = ['red', 'blue', 'green'];
   }
   Parent.prototype.sayName = function() {
     console.log(this.name);
   };
   function Child(name, age) {
     Parent.call(this, name); // 借用构造函数
     this.age = age;
   }
   Child.prototype = new Parent(); // 原型链继承
   Child.prototype.sayAge = function() {
     console.log(this.age);
   };
   var child = new Child('Nicholas', 29);
   console.log(child.colors); // ['red', 'blue', 'green']
   console.log(child.age); // 29
   console.log(child.sayName()); // Nicholas
   console.log(child.sayAge()); // 29
   ```
4. **原型式继承**（`Object.create()`）：
   使用 `Object.create()` 方法创建一个新对象，该对象继承自另一个对象。
   ```javascript
   var parent = {
     colors: ['red', 'blue', 'green']
   };
   var child = Object.create(parent);
   child.name = 'Nicholas';
   console.log(child.colors); // ['red', 'blue', 'green']
   ```
5. **寄生式继承**：
   通过创建一个继承自原型的对象，然后扩展这个对象，最后返回这个扩展后的对象。
   ```javascript
   function createAnother(original) {
     var clone = Object.create(original);
     clone.sayHi = function() {
       console.log('hi');
     };
     return clone;
   }
   var person = {
     name: 'Nicholas'
   };
   var anotherPerson = createAnother(person);
   anotherPerson.sayHi(); // hi
   ```
6. **寄生组合式继承**：
   结合原型链继承和寄生式继承的优点，通过调用超类型的构造函数来继承属性，然后通过原型链继承方法。
   ```javascript
   function inheritPrototype(subType, superType) {
     var prototype = Object.create(superType.prototype);
     prototype.constructor = subType;
     subType.prototype = prototype;
   }
   function Parent(name) {
     this.name = name;
     this.colors = ['red', 'blue', 'green'];
   }
   Parent.prototype.sayName
