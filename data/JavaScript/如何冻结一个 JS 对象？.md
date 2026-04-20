---
level: 2
---

# 如何冻结一个 JS 对象？

## 题目要点

- **`Object.freeze()`**：用于冻结对象，阻止修改、添加或删除属性。
- **深度冻结**：对于嵌套对象，需使用递归函数来完全冻结对象及其所有嵌套属性。
- **冻结效果**：冻结后，尝试修改、添加或删除属性将不会生效。

冻结对象可以提高代码的安全性和稳定性，防止对象被意外或恶意修改。

## 参考答案

可以使用 `Object.freeze()` 方法冻结一个 JavaScript 对象。

冻结对象会阻止对对象的修改，包括添加新属性、删除现有属性以及修改现有属性的值。

### 使用 `Object.freeze()`

```javascript
const person = {
    name: 'Alice',
    age: 25
};

// 冻结对象
Object.freeze(person);

// 尝试修改对象的属性
person.name = 'Bob'; // 不会改变，因为对象已被冻结
person.gender = 'female'; // 不会添加，因为对象已被冻结
delete person.age; // 不会删除属性，因为对象已被冻结

console.log(person); // 输出: { name: 'Alice', age: 25 }
```

1. **不可变性**：
   - 对象被冻结后，现有的属性变得不可修改。
   - 新属性不能被添加。
   - 现有属性不能被删除。

2. **嵌套对象**：
   - `Object.freeze()` 只会冻结对象的第一层。嵌套的对象属性不会被递归冻结。

   ```javascript
   const person = {
       name: 'Alice',
       address: {
           city: 'Wonderland'
       }
   };

   Object.freeze(person);

   // 修改嵌套对象的属性不会被阻止
   person.address.city = 'New Wonderland';
   console.log(person.address.city); // 输出: 'New Wonderland'
   ```

### 深度冻结

要完全冻结对象及其所有嵌套属性，可以编写一个递归函数来实现深度冻结：

```javascript
    // 获取对象的所有属性名
    const propNames = Object.getOwnPropertyNames(obj);

    // 遍历所有属性
    propNames.forEach(name => {
        const value = obj[name];

        // 如果属性值是对象，则递归冻结
        if (typeof value === 'object' && value !== null) {
            deepFreeze(value);
        }
    });

    // 冻结对象本身
    return Object.freeze(obj);
}

const person = {
    name: 'Alice',
    address: {
        city: 'Wonderland'
    }
};

deepFreeze(person);

// 尝试修改嵌套对象的属性
person.address.city = 'New Wonderland'; // 不会改变，因为对象及其嵌套对象已被冻结

console.log(person.address.city); // 输出: 'Wonderland'
```
