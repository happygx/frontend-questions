---
level: 3
---

# 谈谈 Object.defineProperty 与 Proxy 的区别

## 题目要点

### Vue2.x 中的双向绑定实现

- **基于**：Vue2.x 的双向绑定是基于 `Object.defineProperty` 实现的。
- **问题**：这种方式存在一些局限性：
  1. **数组监听**：无法直接监听数组的变化，需要重写数组的方法来模拟。
  2. **属性遍历**：需要遍历对象的每个属性来定义属性描述符。
  3. **嵌套对象监听**：需要递归遍历嵌套对象的所有属性。

### Vue3.x 中的双向绑定实现

- **基于**：Vue3.x 使用 `Proxy` 代理的方式实现双向绑定。
- **优势**：
  1. **对象深度监听**：Proxy 可以针对整个对象进行代理，无需遍历每个属性，解决了深度递归的问题。
  2. **数组监听**：Proxy 可以直接监听数组的变化，无需重写数组方法。
  3. **拦截方法**：Proxy 提供更多的拦截方法，如 `get`、`set`、`deleteProperty` 等，使得数据劫持更加灵活。
  4. **性能优化**：Proxy 可能得到浏览器针对性的优化，有助于性能提升。

## 参考答案

在 Vue2.x 的版本中，双向绑定是基于 Object.defineProperty 方式实现的。而 Vue3.x 版本中，使用了 ES6 中的 Proxy 代理的方式实现。

## Object.defineProperty(obj, prop, descriptor)

使用 Object.defineProperty 会产生三个主要的问题：

* 不能监听数组的变化

在 Vue2.x 中解决数组监听的方法是将能够改变原数组的方法进行重写实现（比如：push、 pop、shift、unshift、splice、sort、reverse），举例：

```javascript
const originalPush = Array.prototype.push

Array.prototype.push = function() {
  // 我们在这个位置就可以进行 数据劫持 了
  console.log('数组被改变了')

  originalPush.apply(this, arguments)
}
```

可以通过 Object.keys() 来实现

* 必须深层遍历嵌套的对象

通过递归深层遍历嵌套对象，然后通过 Object.keys() 来实现对每个属性的劫持

## Proxy

* Proxy 针对的整个对象，Object.defineProperty 针对单个属性，这就解决了 需要对对象进行深度递归（支持嵌套的复杂对象劫持）实现对每个属性劫持的问题

```javascript
const obj = {
    obj: {
        children: {
            a: 1
        }
    }
}

const objProxy = new Proxy(obj, {
    get(target, property, receiver){
        console.log('-- target --')
        return Reflect.get(target, property, receiver)
    },

    set(target, property, value, receiver) {
        console.log('-- set --')
        return Reflect.set(target, property, value, receiver)
    }
})

console.log(objProxy.obj) // 输出 '-- target --'
console.log(objProxy.a = 2) // 输出 '-- set --'
```

```javascript

const aryProxy = new Proxy(ary, {
    get(target, property, receiver){
        console.log('-- target --')
        return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
        console.log('-- set --')
        return Reflect.set(target, property, value, receiver)
    }
})

console.log(aryProxy[0]) // 输出 '-- target --'
console.log(aryProxy.push(1)) // 输出 '-- set --'
```
