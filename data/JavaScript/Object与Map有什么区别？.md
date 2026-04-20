---
level: 1
---

# Object与Map有什么区别？

## 题目要点

Object与Map的区别如下：

1. **键的类型**：Object的键只能是字符串或Symbol，而Map的键可以是任意类型。

2. **顺序**：Object的属性顺序在ES6之前是不确定的，在ES6及以后虽然有所改进，但通常还是认为是无序的。而Map保持键值对的插入顺序。

3. **大小**：Object的大小（键值对数量）需要手动计算，Map有`size`属性直接获取。

4. **操作**：Object通过点（`.`）或中括号（`[]`）访问属性，Map通过`get(key)`、`set(key, value)`等方法操作键值对。

5. **迭代**：Object需要通过函数或方法（如`Object.keys()`）获取可迭代对象，Map直接支持`for...of`循环遍历。

6. **JSON序列化**：Object可以直接被`JSON.stringify()`序列化，Map需要转换成数组等可序列化格式。

7. **性能**：在频繁增删键值对的场景下，Map通常表现更好；对于静态数据，Object可能更快。

这些区别使得Object和Map在JavaScript中有不同的应用场景：Object更适合用于存储静态或简单的键值对数据，而Map则更适用于需要保持顺序或键类型多样的复杂数据结构。

## 参考答案

### 概念

*   Object

在ECMAScript中，`Object`是一个特殊的对象。它本身是一个顶级对象，同时还是一个构造函数，可以通过它（如：`new Object()`）来创建一个对象。我们可以认为JavaScript中所有的对象都是`Object`的一个实例，对象可以用字面量的方法const obj = {}即可声明。  

*   Map

`Object`本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键，这给它的使用带来了很大的限制。

为了解决这个问题，`ES6` 提供了 `Map` 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 `Hash` 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

通过 `const m = new Map();` 即可得到一个map实例。

### 访问

map: 通过map.get(key)方法去属性, 不存在则返回undefined

object: 通过obj.a或者obj\['a'\]去访问一个属性, 不存在则返回undefined

### 赋值

map: 通过map.set去设置一个值，key可以是任意类型

object: 通过object.a = 1或者object\['a'\] = 1，去赋值，key只能是字符串，数字或symbol

### 删除

map: 通过map.delete去删除一个值，试图删除一个不存在的属性会返回false

object: 通过delete操作符才能删除对象的一个属性，诡异的是，即使对象不存在该属性，删除也返回true，当然可以通过**Reflect.deleteProperty(target, prop)** 删除不存在的属性还是会返回true。

    var obj = {}; // undefined
    delete obj.a // true

### 大小

map: 通过map.size即可快速获取到内部元素的总个数

object: 需要通过Object.keys的转换才能将其转换为数组，再通过数组的length方法去获得或者使用Reflect.ownKeys(obj)也可以获取到keys的集合

### 迭代

map: 拥有迭代器，可以通过`for-of`、`forEach`去直接迭代元素，而且遍历顺序是确定的

object: 并没有实现迭代器，需要自行实现，不实现只能通过for-in循环去迭代，遍历顺序是不确定的

### 使用场景

1.  如果只需要简单的存储key-value的数据，并且key不需要存储复杂类型的，直接用对象
2.  如果该对象必须通过JSON转换的，则只能用对象，目前暂不支持Map
3.  map的阅读性更好，所有操作都是通过api形式去调用，更有编程体验
