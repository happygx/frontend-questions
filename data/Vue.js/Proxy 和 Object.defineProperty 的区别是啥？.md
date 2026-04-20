---
level: 3
---

# Proxy 和 Object.defineProperty 的区别是啥？

## 题目要点

- **`Object.defineProperty`**：
  - **作用**：用于设置或修改对象的单个属性的详细特性。
  - **限制**：只对指定的属性生效，无法处理对象的其他操作。

- **`Proxy`**：
  - **作用**：用于创建代理对象，拦截并自定义对目标对象的各种操作。
  - **优点**：提供了全面的拦截功能和更灵活的操作方式，适合复杂的拦截需求。

选择使用 `Proxy` 还是 `Object.defineProperty` 主要取决于需求的复杂性和需要拦截的操作范围。

## 参考答案

`Proxy` 和 `Object.defineProperty` 都可以用来拦截和操作对象的属性访问，但它们在功能、灵活性和适用场景上有显著的区别。

### **1. `Object.defineProperty`**

#### **功能**
- 用于定义或修改对象的属性，包括属性的值、可写性、可枚举性、可配置性等。
- 主要用于对单个属性进行细粒度的控制。

#### **使用场景**
- 对象属性的拦截和修改，例如：
  - 定义 getter 和 setter。
  - 修改属性的配置。
  
#### **示例代码**

```javascript
Object.defineProperty(obj, 'name', {
  value: 'Alice',
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log(obj.name); // Alice

Object.defineProperty(obj, 'name', {
  get() {
    return 'Bob';
  }
});

console.log(obj.name); // Bob
```
- 只对定义的属性有效，不能拦截对对象的整体访问或操作。
- 需要针对每个属性分别进行定义，无法一次性处理多个属性或整个对象。

### **2. `Proxy`**

#### **功能**
- 用于创建一个代理对象，该对象可以拦截并自定义对目标对象的基本操作（如属性访问、赋值、删除等）。
- 提供了更多的拦截能力和灵活性，支持对整个对象的操作。

#### **使用场景**
- 可以用来拦截和修改对象的所有操作，例如：
  - 属性的读取、赋值、删除。
  - 函数调用。
  - 目标对象的创建和扩展。
  
#### **示例代码**

```javascript
  name: 'Alice'
};

const handler = {
  get(target, property) {
    return property in target ? target[property] : 'Default';
  },
  set(target, property, value) {
    target[property] = value.toUpperCase();
    return true;
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name); // Alice
proxy.name = 'Bob';
console.log(proxy.name); // BOB
console.log(proxy.age); // Default
```
- 可以拦截对象的所有操作，提供更全面的控制。
- 可以动态地应用拦截逻辑，不需要修改原始对象的定义。
