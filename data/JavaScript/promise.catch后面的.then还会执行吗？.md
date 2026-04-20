---
level: 3
---

# promise.catch后面的.then还会执行吗？

## 参考答案

答案： **会继续执行**。

虽然**Promise**是开发过程中使用非常频繁的一个技术点，但是它的一些细节可能很多人都没有去关注过。我们都知道`.then`, `.catch`, `.finally`都可以链式调用，其本质上是因为返回了一个新的**Promise**实例。

catch的语法形式如下：

```javascript
```

`.catch(onRejected)`与`then(undefined, onRejected)`在表现上是一致的。

事实上，catch(onRejected)从内部调用了then(undefined, onRejected)。

* 如果`.catch(onRejected)`的`onRejected`回调中返回了一个状态为`rejected`的`Promise`实例，那么`.catch`返回的`Promise`实例的状态也将变成`rejected`。
* 如果`.catch(onRejected)`的`onRejected`回调中抛出了异常，那么`.catch`返回的`Promise`实例的状态也将变成`rejected`。
* 其他情况下，`.catch`返回的`Promise`实例的状态将是`fulfilled`。
