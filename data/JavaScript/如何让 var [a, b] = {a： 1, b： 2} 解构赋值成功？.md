---
level: 3
---

# 如何让 var [a, b] = {a: 1, b: 2} 解构赋值成功？

## 题目要点

### 思路和要点

1. **理解迭代协议**：
   - 迭代协议允许 JavaScript 对象定义或定制它们的迭代行为。
   - 对象要成为可迭代对象，必须实现 `@@iterator` 方法，即对象（或其原型链上的某个对象）必须有一个键为 `@@iterator` 的属性，可通过常量 `Symbol.iterator` 访问该属性。

2. **浏览器报错分析**：
   - 当 `var [a, b] = {a:1, b:2}` 运行时，会报错 "TypeError: obj is not iterable"，因为对象默认不可迭代。
   - 数组和 Map 是可迭代对象，因为它们有默认的 `Symbol.iterator` 方法。

3. **实现可迭代协议**：
   - 要使对象变得可迭代，需要在对象上实现 `Symbol.iterator` 方法。
   - 该方法应返回一个迭代器对象，该对象必须实现 `next` 方法。

4. **详细步骤**：
   - 在对象上添加 `Symbol.iterator` 方法。
   - 在 `Symbol.iterator` 方法中，返回一个具有 `next` 方法的迭代器对象。
   - `next` 方法在每次调用时返回一个对象，该对象具有 `value` 和 `done` 属性。

5. **示例代码**：
   - 创建一个对象，并实现其 `Symbol.iterator` 方法。
   - 通过迭代器对象的 `next` 方法，按序返回对象的属性值。

6. **示例实现**：

   ```javascript
   const obj = {
     a: '1',
     b: '2',
     [Symbol.iterator]() {
       let index = 0;
       const keys = Object.keys(this);
       return {
         next() {
           if (index < keys.length) {
             return {
               done: false,
               value: obj[keys[index++]]
             };
           }
           return { done: true, value: undefined };
         }
       };
     }
   };

   const [a, b] = obj;

## 参考答案

## 迭代协议

题目问怎么能让var \[a,b\] = {a:1,b:2} 成立，那么我们首先要运行一下，看看它是怎么个不成立法。

```js
    a:'1',
    b:'2',
}

const [a,b] = obj
```

运行之后打开控制台可以发现报错信息，它告诉我们obj这个对象是不可迭代的，那么我们想办法把obj变成可迭代的是不是就能解决这个问题，这要怎么做呢？想要搞明白这点我们需要先了解一下可迭代协议。

**可迭代协议的概念（** **MDN** **）**

> 可迭代协议允许 JavaScript 对象定义或定制它们的迭代行为，例如，在一个 `for..of` 结构中，哪些值可以被遍历到。一些内置类型同时是[内置的可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%86%85%E7%BD%AE%E7%9A%84%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%AF%B9%E8%B1%A1 "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%86%85%E7%BD%AE%E7%9A%84%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%AF%B9%E8%B1%A1")，并且有默认的迭代行为，比如 `Array` 或者 `Map`，而其他内置类型则不是（比如 `Object`）。
> 
> 要成为可迭代对象，该对象必须实现 `@@iterator` 方法，这意味着对象（或者它[原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain")上的某个对象）必须有一个键为 `@@iterator` 的属性，可通过常量 `Symbol.iterator` 访问该属性：
> 
> `[Symbol.iterator]`
> 
> 一个无参数的函数，其返回值为一个符合[迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%8D%8F%E8%AE%AE "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%8D%8F%E8%AE%AE")的对象。
> 
> 当一个对象需要被迭代的时候（比如被置入一个 `for...of` 循环时），首先，会不带参数调用它的 `@@iterator` 方法，然后使用此方法返回的迭代器获得要迭代的值。

说人话就是，要想让obj成为一个可迭代的对象，就需要它实现 `@@iterator` 方法，具体表现为对象身上要有一个名为`[Symbol.iterator]` 的方法。而数组和Map则是一开始就有这个方法，所以它们是可迭代的。而对象身上则没有这个默认行为，所以不可迭代。真的是这样吗？我们创建一个数组，看看数组身上到底有没有`[Symbol.iterator]` 方法。

```js
console.log(array)
```

点开原型查看

![](https://static.ecool.fun//article/0412f825-a681-48fb-905e-886514b24402.jpeg)

发现真的有一个Symbol.iterator()方法，该方法会返回一个迭代器对象。我们来调用一下

```js
const iterator = array[Symbol.iterator]()
console.log(iterator)
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
```

打印iterator对象后发现在它的原型上有一个next()方法，调用next()方法，会得到一个对象value就是当前迭代的值，done则代表当前迭代器是否已经迭代完成。

**数组** **解构** **的本质**

```js
var [a,b,c] = array
// 本质上是
const iterator = array[Symbol.iterator]()
var a = iterator.next().value
var b = iterator.next().value
var c = iterator.next().value
```

到此为止我们可知，要想满足迭代协议需要对象身上有一个名为`[Symbol.iterator]`的方法。再使用for..of或者解构赋值的时候会隐式的调用这个方法，得到一个迭代对象，通过迭代对象的next方法判断当前是否完成迭代和具体迭代的值。

也就是说我们要在obj上添加`[Symbol.iterator]`方法并且完成next方法的逻辑

最终代码如下：

```js
    a: '1',
    b: '2',
    [Symbol.iterator]() {
        let index = 0
        const keys = Object.keys(this)
        return {
            next() {
                if (index < keys.length) {
                    return {
                        done: false,
                        value: obj[keys[index++]]
                    }
                }
                return {done:true,value:undefined}
            }
        }
    }
}

const [a, b] = obj
```

```js
    console.log(i)
}
// 1
// 2
```
