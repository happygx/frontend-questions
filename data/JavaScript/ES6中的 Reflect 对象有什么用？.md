---
level: 3
---

# ES6中的 Reflect 对象有什么用？

## 题目要点

### Reflect 对象

- **定义**：Reflect 对象不是构造函数，因此在创建时不需要使用 `new` 关键字。
- **目的**：
  1. **统一内部方法**：将一些明显属于语言内部的方法（如 `Object.defineProperty`）从 `Object` 对象转移到 `Reflect` 对象上。
  2. **改进方法行为**：修改某些 `Object` 方法的返回结果，使其行为更合理。
  3. **命令式操作函数化**：将某些 `Object` 操作（如 `name in obj` 和 `delete obj[name]`）转换为函数行为。
  4. **与 Proxy 对象对应**：Reflect 对象的方法与 Proxy 对象的方法一一对应，提供了一种调用默认行为的机制。

### Reflect 对象与 Proxy 对象

- **对应关系**：Reflect 对象的方法与 Proxy 对象的方法一一对应。
- **功能**：Proxy 对象通过调用对应的 Reflect 方法来执行默认行为，同时可以修改行为。

## 参考答案

Reflect 对象不是构造函数，所以创建时不是用 new 来进行创建。

在 ES6 中增加这个对象的目的：

- 将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到 Reflect 对象上。现阶段，某些方法同时在 Object 和 Reflect 对象上部署，未来的新方法将只部署在 Reflect 对象上。也就是说，从 Reflect 对象上可以拿到语言内部的方法。
- 修改某些 Object 方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而 Reflect.defineProperty(obj, name, desc)则会返回 false。
- 让 Object 操作都变成函数行为。某些 Object 操作是命令式，比如 name in obj 和 delete obj[name]，而 Reflect.has(obj, name)和 Reflect.deleteProperty(obj, name)让它们变成了函数行为。
- Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。

```javascript
  get(target, name) {
    console.log("get", target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log("delete" + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log("has" + name);
    return Reflect.has(target, name);
  },
});

```
