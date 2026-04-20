---
level: 1.5
---

# 手写实现 Object.create

## 题目要点

- **目的**：`Object.create` 创建一个新对象，指定其原型，并可选地定义对象属性。
- **实现**：
  - 使用临时构造函数来设置新对象的原型。
  - 可选地使用 `Object.defineProperties` 定义新对象的属性。
  
这种实现方式模拟了 `Object.create` 的基本功能，提供了对对象原型链和属性的控制。

## 参考答案

`Object.create` 方法用于创建一个新对象，使用指定的原型对象和可选的属性描述符来初始化新对象。手写实现 `Object.create` 涉及到设置新对象的原型并定义可选的属性。

以下是 `Object.create` 的简单手写实现：

### 实现

```javascript
    // 创建一个临时构造函数
    function Temp() {}
    
    // 将临时构造函数的原型指向指定的原型对象
    Temp.prototype = proto;
    
    // 创建新对象，并设置其原型
    const obj = new Temp();
    
    // 如果传入了属性描述符对象，则使用 Object.defineProperties 来定义属性
    if (propertiesObject !== undefined) {
        Object.defineProperties(obj, propertiesObject);
    }
    
    return obj;
}

// 示例用法
const personPrototype = {
    greet() {
        console.log('Hello!');
    }
};

const john = create(personPrototype, {
    name: {
        value: 'John',
        writable: true,
        configurable: true,
        enumerable: true
    },
    age: {
        value: 30,
        writable: true,
        configurable: true,
        enumerable: true
    }
});

console.log(john.name); // 输出: John
john.greet(); // 输出: Hello!
```

1. **临时构造函数**：
   ```javascript
   function Temp() {}
   ```
   - 创建一个临时构造函数 `Temp` 用于设置新对象的原型。这个构造函数不会有实际的功能，只是为了创建一个新对象来设置原型链。

2. **设置原型**：
   ```javascript
   Temp.prototype = proto;
   ```
   - 将 `Temp.prototype` 设置为传入的原型对象 `proto`。这样，通过 `new Temp()` 创建的新对象就会具有指定的原型。

3. **创建新对象**：
   ```javascript
   const obj = new Temp();
   ```
   - 使用临时构造函数 `Temp` 创建一个新对象 `obj`，其原型链上会包含 `proto`。

4. **定义属性**（可选）：
   ```javascript
   if (propertiesObject !== undefined) {
       Object.defineProperties(obj, propertiesObject);
   }
   ```
   - 如果传入了属性描述符对象 `propertiesObject`，使用 `Object.defineProperties` 方法来定义新对象的属性。这样可以设置属性的值、是否可写、是否可配置等。

5. **返回新对象**：
   ```javascript
   return obj;
   ```
   - 返回创建的新对象。
