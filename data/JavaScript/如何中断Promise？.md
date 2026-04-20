---
level: 2
---

# 如何中断Promise？

## 题目要点

首先我们要搞清楚一点，`Promise`有一个很明显的缺点：**一旦创建就无法取消**。所以从本质上来说`Promise`一旦创建就无法终止。这一点我们在答题的时候一定要提到。

## 思路

1.  当函数返回一个新的`Promise`对象时，原`Promise`对象的状态将跟新对象保持一致，因此，当新对象保持`Pending`状态时，原`Promise`链将会中止执行，所以我们可以利用这一特性中断调用链。
2.  把`pending`状态的`Promise`给`reject`掉，这个应该是比较熟悉的吧，不就是我们平时设置的网络超时吗，利用这一点也可以实中断`Promise`。
3.  在`then`中直接抛错，这样就不会执行后面的`then`，直接跳到`catch`方法打印`error`。

## 实现:

* 当新对象保持pending状态时，原Promise链会中止执行

```js
    console.log('1')
    return new Promise(() => {})
})
.then(() => console.log('2'))
.then(() => console.log('3'))
.catch((err) => console.log(err))
```

```js
    const wait = new Promise((resolve,reject) => {
        setTimeout(() => {
            reject('请求超时')
        },timeout)
    })
    return Promise.race([p, wait])
}
fun(new Promise(() => console.log('1')), 2000)
```

```js
.then(() => console.log('1'))
.then(() => {
    console.log('2')
    throw '错误'
})
.then(() => console.log('3'))
.catch((err) => console.log(err))
```

## 参考答案

Promise 有个缺点就是一旦创建就无法取消，所以本质上 Promise 是无法被终止的，但我们在开发过程中可能会遇到下面两个需求：

* 中断调用链

就是在某个 then/catch 执行之后，不想让后续的链式调用继续执行了。

```
  .then(() => {})
  .then(() => {
    // 终止 Promise 链，让下面的 then、catch 和 finally 都不执行
  })
  .then(() => console.log('then'))
  .catch(() => console.log('catch'))
  .finally(() => console.log('finally'))
```

Promise的then方法接收两个参数：
```javascript
```

因此，当新对象保持“pending”状态时，原Promise链将会中止执行。

```javascript
    console.log('then 1')
    return new Promise(() => {})
}).then(() => {
    console.log('then 2')
}).then(() => {
    console.log('then 3')
}).catch((err) => {
    console.log(err)
})
```

注意这里是中断而不是终止，因为 Promise 无法终止，这个中断的意思是：在合适的时候，把 pending 状态的 promise 给 reject 掉。例如一个常见的应用场景就是希望给网络请求设置超时时间，一旦超时就就中断，我们这里用定时器模拟一个网络请求，随机 3 秒之内返回。

```javascript
  const wait = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('请求超时')
    }, timeout)
  })
  return Promise.race([p, wait])
}
```
