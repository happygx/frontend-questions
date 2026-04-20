---
level: 2
---

# 说说你对vue的mixin的理解，以及有哪些应用场景？

## 题目要点

在Vue中，`mixin`是一种将可复用功能分发给Vue组件的机制。它允许你定义一个`mixin`对象，该对象可以包含组件的任意功能选项，如`data`、`methods`、`created`、`computed`等。当你将一个`mixin`对象混入到一个Vue组件中时，该组件将自动获得`mixin`对象中的所有功能选项。

##### 局部混入

可以定义一个`mixin`对象，并将其作为组件的`mixins`选项之一。这样，当你创建这个组件时，它将继承并使用这个`mixin`对象的功能。

##### 全局混入

如果你想要在整个项目中应用`mixin`，你可以通过`Vue.mixin()`进行全局混入。这种混入会影响到项目中每一个组件实例，包括第三方组件。

#### 注意事项

- 当组件和`mixin`对象具有相同的选项时，组件的选项会覆盖`mixin`的选项。
- 如果选项是生命周期钩子，它们会被合并成一个数组，先执行`mixin`的钩子，再执行组件的钩子。

#### 使用场景

`mixin`通常用于封装可复用的功能，比如表单验证、数据加载逻辑、事件处理等。

#### 源码分析

Vue的`mixin`实现是通过`Vue.mixin()`函数进行的。它会将`mixin`对象中的所有选项合并到Vue组件的选项中。在合并时，Vue使用了不同的策略来处理不同类型的选项。

- 替换型策略：`props`、`methods`、`inject`、`computed`，它们会替换掉组件中的同名选项。
- 合并型策略：`data`，它通过递归合并两个数据对象。
- 队列型策略：生命周期钩子和`watch`，它们被合并成一个数组。
- 叠加型策略：`component`、`directives`、`filters`，它们通过原型链进行层层的叠加。

## 参考答案

## 一、mixin是什么

`Mixin`是面向对象程序设计语言中的类，提供了方法的实现。其他类可以访问`mixin`类的方法而不必成为其子类

`Mixin`类通常作为功能模块使用，在需要该功能时“混入”，有利于代码复用又避免了多继承的复杂

### Vue中的mixin
先来看一下官方定义
> `mixin`（混入），提供了一种非常灵活的方式，来分发 `Vue` 组件中的可复用功能。

本质其实就是一个`js`对象，它可以包含我们组件中任意功能选项，如`data`、`components`、`methods `、`created`、`computed`等等

我们只要将共用的功能以对象的方式传入 `mixins`选项中，当组件使用 `mixins`对象时所有`mixins`对象的选项都将被混入该组件本身的选项中来

在`Vue`中我们可以**局部混入**跟**全局混入**

### 局部混入

定义一个`mixin`对象，有组件`options`的`data`、`methods`属性

```js
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
```

```js
  mixins: [myMixin]
})
```

### 全局混入

通过`Vue.mixin()`进行全局的混入

```js
  created: function () {
      console.log("全局混入")
    }
})
```

PS：全局混入常用于插件的编写

### 注意事项：

当组件存在与`mixin`对象相同的选项的时候，进行递归合并的时候组件的选项会覆盖`mixin`的选项

但是如果相同选项为生命周期钩子的时候，会合并成一个数组，先执行`mixin`的钩子，再执行组件的钩子



## 二、使用场景

在日常的开发中，我们经常会遇到在不同的组件中经常会需要用到一些相同或者相似的代码，这些代码的功能相对独立

这时，可以通过`Vue`的`mixin`功能将相同或者相似的代码提出来

举个例子

定义一个`modal`弹窗组件，内部通过`isShowing`来控制显示

```js
  template: '#modal',
  data() {
    return {
      isShowing: false
    }
  },
  methods: {
    toggleShow() {
      this.isShowing = !this.isShowing;
    }
  }
}
```

```js
  template: '#tooltip',
  data() {
    return {
      isShowing: false
    }
  },
  methods: {
    toggleShow() {
      this.isShowing = !this.isShowing;
    }
  }
}
```

首先抽出共同代码，编写一个`mixin`

```js
  data() {
    return {
      isShowing: false
    }
  },
  methods: {
    toggleShow() {
      this.isShowing = !this.isShowing;
    }
  }
}
```

```js
  template: '#modal',
  mixins: [toggle]
};
 
const Tooltip = {
  template: '#tooltip',
  mixins: [toggle]
}
```



## 三、源码分析

首先从`Vue.mixin`入手

源码位置：/src/core/global-api/mixin.js

```js
  Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
```

源码位置：/src/core/util/options.js

```js
  parent: Object,
  child: Object,
  vm?: Component
): Object {

if (child.mixins) { // 判断有没有mixin 也就是mixin里面挂mixin的情况 有的话递归进行合并
    for (let i = 0, l = child.mixins.length; i < l; i++) {
    parent = mergeOptions(parent, child.mixins[i], vm)
    }
}

  const options = {} 
  let key
  for (key in parent) {
    mergeField(key) // 先遍历parent的key 调对应的strats[XXX]方法进行合并
  }
  for (key in child) {
    if (!hasOwn(parent, key)) { // 如果parent已经处理过某个key 就不处理了
      mergeField(key) // 处理child中的key 也就parent中没有处理过的key
    }
  }
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key) // 根据不同类型的options调用strats中不同的方法进行合并
  }
  return options
}
```

- 优先递归处理 `mixins`
- 先遍历合并`parent` 中的`key`，调用`mergeField`方法进行合并，然后保存在变量`options`
- 再遍历 `child`，合并补上 `parent` 中没有的`key`，调用`mergeField`方法进行合并，保存在变量`options`
- 通过 `mergeField` 函数进行了合并

下面是关于`Vue`的几种类型的合并策略

- 替换型
- 合并型
- 队列型
- 叠加型

### 替换型

替换型合并有`props`、`methods`、`inject`、`computed`

```js
strats.methods =
strats.inject =
strats.computed = function (
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
): ?Object {
  if (!parentVal) return childVal // 如果parentVal没有值，直接返回childVal
  const ret = Object.create(null) // 创建一个第三方对象 ret
  extend(ret, parentVal) // extend方法实际是把parentVal的属性复制到ret中
  if (childVal) extend(ret, childVal) // 把childVal的属性复制到ret中
  return ret
}
strats.provide = mergeDataOrFn
```

### 合并型

和并型合并有：`data`

```js
    return mergeDataOrFn(
        parentVal, childVal, vm
    )
};

function mergeDataOrFn(parentVal, childVal, vm) {    
    return function mergedInstanceDataFn() {        
        var childData = childVal.call(vm, vm) // 执行data挂的函数得到对象
        var parentData = parentVal.call(vm, vm)        
        if (childData) {            
            return mergeData(childData, parentData) // 将2个对象进行合并                                 
        } else {            
            return parentData // 如果没有childData 直接返回parentData
        }
    }
}

function mergeData(to, from) {    
    if (!from) return to    
    var key, toVal, fromVal;    
    var keys = Object.keys(from);   
    for (var i = 0; i < keys.length; i++) {
        key = keys[i];
        toVal = to[key];
        fromVal = from[key];    
        // 如果不存在这个属性，就重新设置
        if (!to.hasOwnProperty(key)) {
            set(to, key, fromVal);
        }      
        // 存在相同属性，合并对象
        else if (typeof toVal =="object" && typeof fromVal =="object") {
            mergeData(toVal, fromVal);
        }
    }    
    return to
}
```

- 当目标 data 对象不包含当前属性时，调用 `set` 方法进行合并（set方法其实就是一些合并重新赋值的方法）
- 当目标 data 对象包含当前属性并且当前值为纯对象时，递归合并当前对象值，这样做是为了防止对象存在新增属性

### 队列性

队列性合并有：全部生命周期和`watch`

```js
  parentVal: ?Array<Function>,
  childVal: ?Function | ?Array<Function>
): ?Array<Function> {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})

// watch
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};
```

### 叠加型

叠加型合并有：`component`、`directives`、`filters`

```js
strats.directives=

strats.filters = function mergeAssets(
    parentVal, childVal, vm, key
) {    
    var res = Object.create(parentVal || null);    
    if (childVal) { 
        for (var key in childVal) {
            res[key] = childVal[key];
        }   
    } 
    return res
}
```



### 小结：

- 替换型策略有`props`、`methods`、`inject`、`computed`，就是将新的同名参数替代旧的参数
- 合并型策略是`data`, 通过`set`方法进行合并和重新赋值
- 队列型策略有生命周期函数和`watch`，原理是将函数存入一个数组，然后正序遍历依次执行
- 叠加型有`component`、`directives`、`filters`，通过原型链进行层层的叠加
