---
level: 2
---

# async/await 怎么进行错误处理？


## 题目要点

`async/await`进行错误处理的方式如下：

`async/await`允许你以几乎同步的方式编写异步代码，使得异步操作的流程更加清晰易懂。在`async`函数内部，你可以使用`await`来等待`Promise`的解决或拒绝。如果`Promise`被拒绝（即异步操作失败），`await`会抛出一个错误，这个错误可以像处理同步代码中的错误一样，通过外部的`try...catch`语句来捕获和处理。

具体来说，当你在`async`函数内部使用`await`等待一个`Promise`时，你应该将这个`await`调用包裹在`try...catch`语句中。这样，如果`Promise`被拒绝，`catch`块就会捕获到这个错误，允许你在其中进行错误处理，比如重试操作、记录日志、给用户显示错误消息等。

这种错误处理方式使得异步代码的错误处理变得更加直观和一致，减少了回调地狱（Callback Hell）的困扰，提高了代码的可读性和可维护性。

最后，需要注意的是，由于`async`函数总是返回一个`Promise`，因此如果在一个更外层的异步函数或事件处理器中调用这个`async`函数，你也可以在那个外层函数的`try...catch`中捕获到由这个`async`函数抛出的错误（如果它没有在内部被捕获的话）。这提供了更灵活的错误处理机制。

## 参考答案

一般情况下 async/await 在错误处理方面，主要使用 try/catch，像这样

```js
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('fetch data is me')
        }, 1000)
    })
}

(async () => {
    try {
        const data = await fetchData()
        console.log('data is ->', data)
    } catch(err) {
        console.log('err is ->', err)
    }
})()

```

```js
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('fetch data is A')
        }, 1000)
    })
}

const fetchDataB = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('fetch data is B')
        }, 1000)
    })
}

const fetchDataC = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('fetch data is C')
        }, 1000)
    })
}

(async () => {
    try {
        const dataA = await fetchDataA()
        console.log('dataA is ->', dataA)
    } catch(err) {
        console.log('err is ->', err)
    }

    try {
        const dataB = await fetchDataB()
        console.log('dataB is ->', dataB)
    } catch(err) {
        console.log('err is ->', err)
    }

    try {
        const dataC = await fetchDataC()
        console.log('dataC is ->', dataC)
    } catch(err) {
        console.log('err is ->', err)
    }
})()

```

```js

(async () => {
    try {
        const dataA = await fetchDataA()
        console.log('dataA is ->', dataA)
        const dataB = await fetchDataB()
        console.log('dataB is ->', dataB)
        const dataC = await fetchDataC()
        console.log('dataC is ->', dataC)
    } catch(err) {
        console.log('err is ->', err)
        // 难道要定义 err 类型，然后判断吗？？
        /**
         * if (err.type === 'dataA') {
         *  console.log('dataA err is', err)
         * }
         * ......
         * */
    }
})()

```

```js
    const fetchData = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('fetch data is me')
            }, 1000)
        })
    }

    const data = await fetchData().then(data => data ).catch(err => err)
    console.log(data)
})()

```

```js
    const fetchData = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('fetch data is me')
            }, 1000)
        })
    }

    const [err, data] = await fetchData().then(data => [null, data] ).catch(err => [err, null])
    console.log('err', err)
    console.log('data', data)
    // err null
    // data fetch data is me
})()

```

```js
    const fetchData = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('fetch data is me')
            }, 1000)
        })
    }

    // 抽离成公共方法
    const awaitWrap = (promise) => {
        return promise
            .then(data => [null, data])
            .catch(err => [err, null])
    }

    const [err, data] = await awaitWrap(fetchData())
    console.log('err', err)
    console.log('data', data)
    // err null
    // data fetch data is me
})()

```

```ts
    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, null]>(err => [err, null])
}
```
