---
level: 2
---

# Proxy 能够监听到对象中的对象的引用吗？

## 题目要点

### 题目解析

`Proxy` 能够监听对象中的对象的引用。使用 `Proxy` 时，可以为对象的任何属性设置拦截器，包括属性值为对象的情况。这样，`Proxy` 不仅能够监听对象的直接属性，还能递归地监听嵌套对象的属性。

### 关键点

1. **嵌套对象的代理**：
   - 当 `Proxy` 代理一个对象时，任何对该对象的属性访问都可以被拦截。如果某个属性的值是一个对象，`Proxy` 可以通过**递归**创建新的 `Proxy` 实现对嵌套对象的监听。
   - 通过这种方式，可以实现对嵌套对象的属性进行拦截和监听。

2. **拦截器的使用**：
   - `get` 拦截器：用于拦截对对象属性的读取操作。可以在 `get` 拦截器中检查属性值是否为对象，如果是，则返回一个新的 `Proxy` 对象，这样嵌套对象也会被代理。
   - `set` 拦截器：用于拦截对对象属性的写入操作。可以在 `set` 拦截器中定义对属性赋值操作的处理逻辑。

## 参考答案

`Proxy`可以监听到对象中的对象的引用。

当使用`Proxy`包装一个对象时，可以为该对象的任何属性创建一个拦截器，包括属性值为对象的情况。

下面展示了如何使用`Proxy`来监听对象中对象引用的变化：

```javascript
  nestedObj: { foo: 'bar' }
}

const handler = {
  get(target, prop, receiver) {
    const value = Reflect.get(target, prop, receiver)
    if (typeof value === 'object' && value !== null) {
      return new Proxy(value, handler)
    }
    console.log('get', prop, target[prop])
    return value
  },
  set(target, property, value) {
    target[property] = value
    console.log(`Setting property '${property}' to '${value}'`)
    return true
  }
}

const proxyObj = new Proxy(obj, handler)
proxyObj.nestedObj.foo = 'baz'  // 输出: Setting property 'foo' to 'baz'
```

通过使用适当的拦截器函数，可以实现对对象中对象引用的监听和修改。这使得我们可以在需要时执行自定义的操作，例如记录更改、验证或触发其他事件等。
