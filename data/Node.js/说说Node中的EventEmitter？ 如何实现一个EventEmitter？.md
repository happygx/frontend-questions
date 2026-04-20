---
level: 3
---

# 说说Node中的EventEmitter? 如何实现一个EventEmitter?

## 题目要点

**作答思路**：

Node.js中的`EventEmitter`是一个核心模块，用于实现事件驱动编程。它允许对象拥有多个事件监听器，当事件发生时，会通知所有注册的监听器。
实现一个简单的`EventEmitter`的基本步骤如下：

1. **定义构造函数**：创建一个构造函数，用于创建`EventEmitter`实例。
2. **创建事件监听器数组**：在构造函数内部，创建一个数组来存储事件监听器。
3. **添加事件监听器**：提供一个方法来添加事件监听器，该方法接收事件名称和回调函数。
4. **移除事件监听器**：提供一个方法来移除事件监听器，该方法接收事件名称和回调函数。
5. **触发事件**：提供一个方法来触发事件，该方法接收事件名称和可选的参数。
示例代码：

```javascript
  constructor() {
    this.events = {};
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }
  off(eventName, callback) {
    if (this.events[eventName]) {
      const index = this.events[eventName].indexOf(callback);
      if (index > -1) {
        this.events[eventName].splice(index, 1);
      }
    }
  }
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => callback(...args));
    }
  }
}
```

```javascript
eventEmitter.on('event', (arg1, arg2) => {
  console.log(`Event triggered with arguments: ${arg1}, ${arg2}`);
});
eventEmitter.emit('event', 'Hello', 'World');
eventEmitter.off('event');
eventEmitter.emit('event', 'Hello', 'World'); // 不会触发事件
```

1. **EventEmitter概念**：理解`EventEmitter`的作用和用途。
2. **事件监听器管理**：理解如何添加、移除事件监听器。
3. **事件触发**：理解如何触发事件，以及事件触发时的参数传递。

## 参考答案

## 一、是什么

我们了解到，`Node `采用了事件驱动机制，而`EventEmitter `就是`Node`实现事件驱动的基础

在`EventEmitter`的基础上，`Node `几乎所有的模块都继承了这个类，这些模块拥有了自己的事件，可以绑定／触发监听器，实现了异步操作

`Node.js` 里面的许多对象都会分发事件，比如 fs.readStream 对象会在文件被打开的时候触发一个事件

这些产生事件的对象都是 events.EventEmitter 的实例，这些对象有一个 eventEmitter.on() 函数，用于将一个或多个函数绑定到命名事件上


## 二、使用方法

`Node `的`events`模块只提供了一个`EventEmitter`类，这个类实现了`Node`异步事件驱动架构的基本模式——观察者模式

在这种模式中，被观察者(主体)维护着一组其他对象派来(注册)的观察者，有新的对象对主体感兴趣就注册观察者，不感兴趣就取消订阅，主体有更新的话就依次通知观察者们

基本代码如下所示：

```js

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter()

function callback() {
    console.log('触发了event事件！')
}
myEmitter.on('event', callback)
myEmitter.emit('event')
myEmitter.removeListener('event', callback);
```

关于其常见的方法如下：

- emitter.addListener/on(eventName, listener) ：添加类型为 eventName 的监听事件到事件数组尾部
- emitter.prependListener(eventName, listener)：添加类型为 eventName 的监听事件到事件数组头部  
- emitter.emit(eventName[, ...args])：触发类型为 eventName 的监听事件 
- emitter.removeListener/off(eventName, listener)：移除类型为 eventName 的监听事件   
- emitter.once(eventName, listener)：添加类型为 eventName 的监听事件，以后只能执行一次并删除           
- emitter.removeAllListeners([eventName])： 移除全部类型为 eventName 的监听事件



## 三、实现过程

通过上面的方法了解，`EventEmitter`是一个构造函数，内部存在一个包含所有事件的对象

```js
    constructor() {
        this.events = {};
    }
}
```

```js
  "event1": [f1,f2,f3]，
  "event2": [f4,f5]，
  ...
}
```

```js
    this.events[type].forEach((item) => {
        Reflect.apply(item, this, args);
    });
}
```

```js
    if (!this.events[type]) {
        this.events[type] = [];
    }
    this.events[type].push(handler);
}

addListener(type,handler){
    this.on(type,handler)
}

prependListener(type, handler) {
    if (!this.events[type]) {
        this.events[type] = [];
    }
    this.events[type].unshift(handler);
}
```

```js
    if (!this.events[type]) {
        return;
    }
    this.events[type] = this.events[type].filter(item => item !== handler);
}

off(type,handler){
    this.removeListener(type,handler)
}
```

```js
    this.on(type, this._onceWrap(type, handler, this));
  }

  _onceWrap(type, handler, target) {
    const state = { fired: false, handler, type , target};
    const wrapFn = this._onceWrapper.bind(state);
    state.wrapFn = wrapFn;
    return wrapFn;
  }

  _onceWrapper(...args) {
    if (!this.fired) {
      this.fired = true;
      Reflect.apply(this.handler, this.target, args);
      this.target.off(this.type, this.wrapFn);
    }
 }
```

```js
    constructor() {
        this.events = {};
    }

    on(type, handler) {
        if (!this.events[type]) {
            this.events[type] = [];
        }
        this.events[type].push(handler);
    }

    addListener(type,handler){
        this.on(type,handler)
    }

    prependListener(type, handler) {
        if (!this.events[type]) {
            this.events[type] = [];
        }
        this.events[type].unshift(handler);
    }

    removeListener(type, handler) {
        if (!this.events[type]) {
            return;
        }
        this.events[type] = this.events[type].filter(item => item !== handler);
    }

    off(type,handler){
        this.removeListener(type,handler)
    }

    emit(type, ...args) {
        this.events[type].forEach((item) => {
            Reflect.apply(item, this, args);
        });
    }

    once(type, handler) {
        this.on(type, this._onceWrap(type, handler, this));
    }

    _onceWrap(type, handler, target) {
        const state = { fired: false, handler, type , target};
        const wrapFn = this._onceWrapper.bind(state);
        state.wrapFn = wrapFn;
        return wrapFn;
    }

    _onceWrapper(...args) {
        if (!this.fired) {
            this.fired = true;
            Reflect.apply(this.handler, this.target, args);
            this.target.off(this.type, this.wrapFn);
        }
    }
}
```
