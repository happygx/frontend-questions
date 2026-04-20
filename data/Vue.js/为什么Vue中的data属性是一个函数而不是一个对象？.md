---
level: 2
---

# 为什么Vue中的data属性是一个函数而不是一个对象？

## 题目要点

在Vue中，实例和组件的`data`定义有一些区别。对于根Vue实例，`data`可以是一个对象或者函数。然而，对于Vue组件，`data`必须是一个函数。

#### 组件`data`定义函数与对象的区别

组件中的`data`必须是一个函数，这是因为在Vue组件创建时，它会通过`Vue.extend()`创建组件构造函数，然后实例化多个组件实例。如果`data`定义为对象，这些组件实例将共享同一个`data`对象，导致数据污染。而如果`data`定义为函数，每个组件实例在创建时都会调用该函数，得到一个新的`data`对象，从而避免数据污染。

#### 原理分析

当组件创建时，Vue会进行选项合并，其中包括`data`选项。如果在合并过程中发现`data`类型不是函数，Vue会发出警告。这是因为Vue期望每个组件实例都有自己独立的`data`对象，以保证组件间的数据隔离。

## 参考答案

## 一、实例和组件定义data的区别

`vue`实例的时候定义`data`属性既可以是一个对象，也可以是一个函数

```js
    el:"#app",
    // 对象格式
    data:{
        foo:"foo"
    },
    // 函数格式
    data(){
        return {
             foo:"foo"
        }
    }
})
```

如果为组件`data`直接定义为一个对象

```js
    template:`<div>组件</div>`,
    data:{
        foo:"foo"
    }
})
```


 ![image.png](https://static.ecool.fun//article/c401c122-b612-4693-bc1a-5d4744f89d8b.png)


警告说明：返回的`data`应该是一个函数在每一个组件实例中

## 二、组件data定义函数与对象的区别

上面讲到组件`data`必须是一个函数，不知道大家有没有思考过这是为什么呢？

在我们定义好一个组件的时候，`vue`最终都会通过`Vue.extend()`构成组件实例

这里我们模仿组件构造函数，定义`data`属性，采用对象的形式

```js
 
}
Component.prototype.data = {
	count : 0
}
```

```
const componentB = new Component()
```

```js
componentA.data.count = 1
console.log(componentB.data.count)  // 1
```

如果我们采用函数的形式，则不会出现这种情况（函数返回的对象内存地址并不相同）

```js
	this.data = this.data()
}
Component.prototype.data = function (){
    return {
   		count : 0
    }
}
```

```js
componentA.data.count = 1
console.log(componentB.data.count)  // 0
```

## 三、原理分析

首先可以看看`vue`初始化`data`的代码，`data`的定义可以是函数也可以是对象

源码位置：`/vue-dev/src/core/instance/state.js`

```js
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
    ...
}
```

别急，继续看下文

组件在创建的时候，会进行选项的合并

源码位置：`/vue-dev/src/core/util/options.js`

自定义组件会进入`mergeOptions`进行选项合并

```js
    ...
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    ...
  }
```

源码位置：`/vue-dev/src/core/instance/init.js`

这时候`vm`实例为`undefined`，进入`if`判断，若`data`类型不是`function`，则出现警告提示

```js
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  if (!vm) {
    if (childVal && typeof childVal !== "function") {
      process.env.NODE_ENV !== "production" &&
        warn(
          'The "data" option should be a function ' +
            "that returns a per-instance value in component " +
            "definitions.",
          vm
        );

      return parentVal;
    }
    return mergeDataOrFn(parentVal, childVal);
  }
  return mergeDataOrFn(parentVal, childVal, vm);
};
```

- 根实例对象`data`可以是对象也可以是函数（根实例是单例），不会产生数据污染情况
- 组件实例对象`data`必须为函数，目的是为了防止多个组件实例对象之间共用一个`data`，产生数据污染。采用函数的形式，`initData`时会将其作为工厂函数都会返回全新`data`对象
