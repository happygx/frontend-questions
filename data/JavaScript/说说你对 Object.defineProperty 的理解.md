---
level: 3
---

# 说说你对 Object.defineProperty 的理解

## 题目要点

### Object.defineProperty() 方法

- **定义**：`Object.defineProperty()` 方法在对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
- **参数**：
  - `obj`：要定义属性的对象。
  - `prop`：要定义或修改的属性的名称或 Symbol。
  - `descriptor`：要定义或修改的属性描述符。

### 属性描述符

- **数据描述符**：包含值和可选的 `writable` 和 `configurable` 键。
  - `value`：属性的值。
  - `writable`：控制属性值是否可被重写。
  - `configurable`：控制属性是否可被删除或重新定义。
- **存取描述符**：包含 `get` 和 `set` 函数。
  - `get`：访问属性时调用的函数。
  - `set`：属性值被修改时调用的函数。

### 总结

- `Object.defineProperty()` 方法提供了更精细的控制来定义或修改对象的属性。
- 描述符允许开发者控制属性的可配置性、可枚举性、值的可写性，以及是否需要 getter 和 setter。
- 使用这些选项可以创建更安全、更易于管理的对象属性。

## 参考答案

Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

该方法接受三个参数，第一个参数是 obj：要定义属性的对象，第二个参数是 prop：要定义或修改的属性的名称或 Symbol，第三个参数是 descriptor：要定义或修改的属性描述符。

```javascript
Object.defineProperty(obj, "property", { value: 18 });
console.log(obj.property); // 18
```

函数的第三个参数 descriptor 所表示的属性描述符有两种形式：数据描述符和存取描述符。数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的。存取描述符是由 getter 函数和 setter 函数所描述的属性。一个描述符只能是这两者其中之一；不能同时是两者。

这两种同时拥有下列两种键值：

* configurable：是否可以删除目标属性或是否可以再次修改属性的特性（writable, configurable, enumerable）。设置为true可以被删除或可以重新设置特性；设置为false，不能被可以被删除或不可以重新设置特性。默认为false。
* enumerable：当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。默认为 false。

```javascript
Object.defineProperty(obj, "property", { configurable: true });
delete obj["property"]; // true
obj; // {}
// 改变状态
const obj = { property: 24 };
Object.defineProperty(obj, "property", { configurable: false });
delete obj["property"]; // false
obj; // {'property': 24}
```
const obj = { property1: 24, property2: 34, property3: 54 };
Object.defineProperty(obj, "property1", { enumerable: true });
for (i in obj) {
  console.log(i);
}
// property1
// property2
// property3
// 改状态

Object.defineProperty(obj, "property1", { enumerable: false });
for (i in obj) {
  console.log(i);
}
// property2
// property3

```

* value：该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
* writable：当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符改变。默认为 false。

```javascript
Object.defineProperty(obj, "property1", { value: 18 });
obj; // {'property1': 18}
```
const obj = {};
Object.defineProperty(obj, "property1", { value: 18, writable: false });
obj.property1 = 24;
obj; // {'property1': 18}

// 改变状态
const obj = {};
Object.defineProperty(obj, "property1", { value: 18, writable: true });
obj.property1 = 24;
obj; // {'property1': 24}

```

* get：属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的 this 并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。默认为 undefined。
* set：属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。默认为 undefined。

```javascript
Object.defineProperty(obj, "property1", {
  get(value) {
    return value;
  },
  set(newValue) {
    value = newValue;
  },
});

```
