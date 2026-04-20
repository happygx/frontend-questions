---
level: 3.5
---

# 实现一个类，其实例可以链式调用，它有一个 sleep 方法，可以 sleep 一段时间后再后续调用

## 参考答案

实现思想：创建一个任务队列，在每个方法中都往任务队列里追加一个函数，利用队列的先进先出的思想来控制函数的执行顺序。

```js
class PlayBoy {
  constructor(name) {
    this.name = name
    this.queue = []  //创建一个任务队列（利用队列的先进先出性质来模拟链式调用函数的执行顺序）
    setTimeout(()=>{ // 进入异步任务队列 也是开启 自定义任务队列 queue 的入口
      this.next()  // next是类PlayBoy 原型上的方法，用来从queue 任务队列中取出函数执行 
    },0)
 
    return this
  }
}

PlayBoy.prototype.sayHi = function () {
 
  const fn = () => {
    console.log('hi')
    this.next()
  }
  this.queue.push(fn)
  return this
}

PlayBoy.prototype.sleep = function (timer) {
 
  const fn = () => {
    setTimeout(() => {
      this.next()
    }, timer)
  }
  this.queue.push(fn)
  return this
}

PlayBoy.prototype.play = function () {
 
  const fn = () => {
    console.log('play')
    this.next()
  }
  this.queue.push(fn)
  return this
}

PlayBoy.prototype.next = function () {
  const fn = this.queue.shift()  // 从任务队列中取出函数 函数存在的话即调用
 
  fn && fn()
}

new PlayBoy().sayHi().sleep(5000).play()
```
