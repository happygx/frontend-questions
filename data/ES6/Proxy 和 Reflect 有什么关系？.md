---
level: 3
---

# Proxy 和 Reflect 有什么关系？

## 题目要点

- **Proxy**：用于创建代理对象，拦截并自定义对象操作（如 `get`、`set`、`apply` 等）。
- **Reflect**：提供底层的操作方法，通常用来在 `Proxy` 的拦截器中执行默认操作。

`Reflect` 提供的方法是 `Proxy` 的拦截操作的基础，能够简化并保持操作的一致性。在 `Proxy` 的拦截器中，使用 `Reflect` 方法可以保证对象操作的一致性，避免直接访问目标对象属性时带来的副作用。

## 参考答案

`Proxy` 和 `Reflect` 都是 JavaScript 中用于操作对象的一对新特性，主要用于拦截和操作对象的行为。它们通常一起使用，但各自有不同的作用和用途。

### 1. **Proxy**：拦截器（Handler）
`Proxy` 是一个用于创建代理对象的机制，它可以让你定义自定义的行为来拦截和修改对目标对象的操作（例如属性访问、赋值、方法调用等）。通过代理，你可以在对象操作之前或之后执行一些自定义逻辑，比如验证、日志、计数等。

#### 基本语法：
```javascript
```
- `handler` 是一个对象，它定义了代理对象的行为（拦截器），如 `get`、`set`、`apply` 等。

#### 示例：
```javascript
  message: "Hello, World!"
};

const handler = {
  get: function(target, prop, receiver) {
    if (prop === "message") {
      return target[prop].toUpperCase();  // 返回大写的 message
    }
    return prop in target ? target[prop] : `Property "${prop}" not found`;
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.message); // 输出：HELLO, WORLD!
console.log(proxy.nonExistent); // 输出：Property "nonExistent" not found
```
`Reflect` 是一个新的内置对象，它提供了与对象操作相关的静态方法。这些方法是 `Proxy` 操作的低层次 API，用于执行默认的操作，或在 `Proxy` 的拦截器中调用它们来执行实际的行为。`Reflect` 方法基本上是 `Object` 方法的扩展，目的是简化对象操作。

#### `Reflect` 的常用方法：
- `Reflect.get(target, prop)`：获取目标对象的属性值。
- `Reflect.set(target, prop, value)`：设置目标对象的属性值。
- `Reflect.deleteProperty(target, prop)`：删除目标对象的属性。
- `Reflect.has(target, prop)`：检查目标对象是否具有某个属性。
- `Reflect.apply(target, thisArg, argumentsList)`：调用目标函数。
- `Reflect.construct(target, argumentsList)`：创建目标函数的实例。

#### 示例：
```javascript

console.log(Reflect.get(obj, 'name')); // 输出：Alice
Reflect.set(obj, 'name', 'Bob');
console.log(obj.name); // 输出：Bob
```
`Proxy` 和 `Reflect` 经常一起使用，原因如下：
1. **Proxy 拦截器的操作通常会调用 Reflect**：`Proxy` 的处理程序（`handler`）定义了如何拦截目标对象的操作。在这些处理程序中，通常会调用 `Reflect` 方法来执行对象的默认操作，这样可以确保操作符合预期。

2. **Reflect 是 `Proxy` 的默认行为**：当你定义了 `Proxy` 拦截器时，如果你没有提供某个操作的具体实现，通常可以通过调用 `Reflect` 的方法来执行默认的行为。

#### 示例：使用 `Reflect` 在 `Proxy` 中实现默认行为
```javascript
  message: "Hello"
};

const handler = {
  get(target, prop, receiver) {
    if (prop === "message") {
      return `Hello, ${target[prop]}`;  // 自定义行为
    }
    // 对于其他属性，使用 Reflect 执行默认行为
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    if (prop === "message") {
      value = value.toUpperCase();  // 自定义行为：把 message 转成大写
    }
    return Reflect.set(...arguments);  // 使用 Reflect 来执行默认的 set 操作
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.message);  // 输出：Hello, Hello
proxy.message = "world";
console.log(proxy.message);  // 输出：Hello, WORLD
```
