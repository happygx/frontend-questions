---
level: 3
---

# 实现 compose 函数, 类似于 koa 的中间件洋葱模型

## 参考答案

```js
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */
function compose (middleware) {
  // 校验传入的参数是数组，校验数组中每一项是函数
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      // 一个函数中多次调用报错
      // await next()
      // await next()
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      // 取出数组里的 fn1, fn2, fn3...
      let fn = middleware[i]
      // 最后 相等，next 为 undefined
      if (i === middleware.length) fn = next
      // 直接返回 Promise.resolve()
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}


```
