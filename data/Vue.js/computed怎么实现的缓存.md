---
level: 3
---

# computed怎么实现的缓存

## 题目要点

在Vue 2.x版本中，计算属性（computed）的实现涉及了几个关键步骤，包括初始化计算属性、依赖收集和派发更新。下面是这些步骤的详细解释：

1. **初始化计算属性**：
   - Vue在实例化时会调用`initState`方法，其中包含了对计算属性的初始化。
   - 对于每个计算属性，Vue会创建一个`Watcher`实例，并将其保存在`vm._computedWatchers`对象中。
   - 这些`Watcher`实例被标记为`lazy`，意味着它们的值只有在首次读取时才会计算。
2. **依赖收集**：
   - 当执行渲染watcher的getter时，它会访问计算属性的值，从而触发计算属性的getter。
   - 计算属性的getter会将当前的渲染watcher添加到`Dep.target`中，即当前激活的依赖收集器。
   - 计算属性的getter还会访问其依赖的数据（在这个例子中是`this.count`），从而触发数据属性的getter，将当前的渲染watcher添加到数据属性的dep中。
3. **派发更新**：
   - 当依赖的数据发生变化时，数据属性的setter会被触发，它会通知所有依赖它的dep。
   - 计算属性的dep会调用其`notify`方法，通知所有依赖它的watcher进行更新。
   - 计算属性的watcher会检查自己的`dirty`状态，如果为`true`，则执行`evaluate`方法重新计算值。
   - 重新计算的值会被返回给依赖它的渲染watcher，从而触发视图的更新。

整个流程可以总结为：

- 初始化时，Vue创建计算属性的watcher并收集其依赖。
- 当依赖的数据变化时，计算属性的dep通知watcher重新计算。
- 计算出的新值会被返回给依赖它的渲染watcher，触发视图更新。
这个流程确保了计算属性的值只有在需要时才会被计算，并且只有当依赖的数据变化时才会触发更新，从而提高了性能。

## 参考答案

下面将围绕一个例子，讲解一下computed初始化及更新时的流程，来看看计算属性是怎么实现的缓存，及依赖是怎么被收集的。

```js
  <span @click="change">{{sum}}</span>
</div>
<script src="./vue2.6.js"></script>
<script>
  new Vue({
    el: "#app",
    data() {
      return {
        count: 1,
      }
    },
    methods: {
      change() {
        this.count = 2
      },
    },
    computed: {
      sum() {
        return this.count + 1
      },
    },
  })
</script>
```

vue初始化时先执行init方法，里面的initState会进行计算属性的初始化

```js
```

```js
// 依次为每个 computed 属性定义一个计算watcher
for (const key in computed) {
  const userDef = computed[key]
  watchers[key] = new Watcher(
      vm, // 实例
      getter, // 用户传入的求值函数 sum
      noop, // 回调函数 可以先忽视
      { lazy: true } // 声明 lazy 属性 标记 computed watcher
  )
  // 用户在调用 this.sum 的时候，会发生的事情
  defineComputed(vm, key, userDef)
}
```

```js
    deps: [],
    dirty: true,
    getter: ƒ sum(),
    lazy: true,
    value: undefined
}
```

这个 dirty 属性其实是缓存的关键，先记住它。

接下来看看比较关键的 defineComputed，它决定了用户在读取 this.sum 这个计算属性的值后会发生什么，继续简化，排除掉一些不影响流程的逻辑。

```js
    get() {
        // 从刚刚说过的组件实例上拿到 computed watcher
        const watcher = this._computedWatchers && this._computedWatchers[key]
        if (watcher) {
          // 只有dirty了才会重新求值
          if (watcher.dirty) {
            // 这里会求值，会调用get，会设置Dep.target
            watcher.evaluate()
          }
          // 这里也是个关键 等会细讲
          if (Dep.target) {
            watcher.depend()
          }
          // 最后返回计算出来的值
          return watcher.value
        }
    }
})
```

首先 dirty 这个概念代表脏数据，说明这个数据需要重新调用用户传入的 sum 函数来求值了。我们暂且不管更新时候的逻辑，第一次在模板中读取到 {{sum}} 的时候它一定是 true，所以初始化就会经历一次求值。

```js
  // 调用 get 函数求值
  this.value = this.get()
  // 把 dirty 标记为 false
  this.dirty = false
}
```

## 依赖收集

初始化完成之后，最终会调用render进行渲染，而render函数会作为watcher的getter，此时的watcher为渲染watcher。

```js
  vm._update(vm._render(), hydrating)
}
// 创建一个渲染watcher，渲染watcher初始化时，就会调用其get()方法，即render函数，就会进行依赖收集
new Watcher(vm, updateComponent, noop, {}, true /* isRenderWatcher */)
```

```js
    // 将当前watcher放入栈顶，同时设置给Dep.target
    pushTarget(this)
    let value
    const vm = this.vm
    // 调用用户定义的函数，会访问到this.count，从而访问其getter方法，下面会讲到
    value = this.getter.call(vm, vm)
    // 求值结束后，当前watcher出栈
    popTarget()
    this.cleanupDeps()
    return value
 }
```

接着调用其get方法，就会访问到this.count，会触发count属性的getter（如下），就会将当前Dep.target存放的watcher收集到count属性对应的dep中。此时求值结束，调用`popTarget()`将该watcher出栈，此时上个渲染watcher就在栈顶了，Dep.target重新为渲染watcher。

```js
const dep = new Dep()
 
// 闭包中也会保留上一次 set 函数所设置的 val
let val
 
Object.defineProperty(obj, key, {
  get: function reactiveGetter () {
    const value = val
    // Dep.target 此时就是计算watcher
    if (Dep.target) {
      // 收集依赖
      dep.depend()
    }
    return value
  },
})
```
// dep.depend()
depend () {
  if (Dep.target) {
    Dep.target.addDep(this)
  }
}
```
// watcher 的 addDep函数
addDep (dep: Dep) {
  // 这里做了一系列的去重操作 简化掉 
  
  // 这里会把 count 的 dep 也存在自身的 deps 上
  this.deps.push(dep)
  // 又带着 watcher 自身作为参数
  // 回到 dep 的 addSub 函数了
  dep.addSub(this)
}
```
class Dep {
  subs = []
 
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }
}
```

接着执行`watcher.depend()`

```js
depend () {
  let i = this.deps.length
  while (i--) {
    this.deps[i].depend()
  }
}
```

```js
  subs = []
  
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
}
```

最终count的依赖收集完毕，它的dep为:

```js
    subs: [ sum的计算watcher，渲染watcher ]
}
```

那么来到了此题的重点，这时候 count 更新了，是如何去触发视图更新的呢？

再回到 count 的响应式劫持逻辑里去：

```js
const dep = new Dep()
 
// 闭包中也会保留上一次 set 函数所设置的 val
let val
 
Object.defineProperty(obj, key, {
  set: function reactiveSetter (newVal) {
      val = newVal
      // 触发 count 的 dep 的 notify
      dep.notify()
    }
  })
})
```

```js
  subs = []
  
  notify () {
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
```

1. 调用 计算watcher 的 update
2. 调用 渲染watcher 的 update

计算watcher的update

```js
  if (this.lazy) {
    this.dirty = true
  }
}
```

渲染watcher的update

这里其实就是调用 vm.\_update(vm.\_render()) 这个函数，重新根据 render 函数生成的 vnode 去渲染视图了。  
而在 render 的过程中，一定会访问到su 这个值，那么又回到sum定义的get上：

```js
    get() {
        const watcher = this._computedWatchers && this._computedWatchers[key]
        if (watcher) {
          // 上一步中 dirty 已经置为 true, 所以会重新求值
          if (watcher.dirty) {
            watcher.evaluate()
          }
          if (Dep.target) {
            watcher.depend()
          }
          // 最后返回计算出来的值
          return watcher.value
        }
    }
})
```

至此为止，整个计算属性更新的流程就结束了。

## 总结一下

1. 初始化data和computed,分别代理其set以及get方法, 对data中的所有属性生成唯一的dep实例。
2. 对computed中的sum生成唯一watcher,并保存在vm.\_computedWatchers中
3. 执行render函数时会访问sum属性，从而执行initComputed时定义的getter方法，会将Dep.target指向sum的watcher,并调用该属性具体方法sum。
4. sum方法中访问this.count，即会调用this.count代理的get方法，将this.count的dep加入sum的watcher,同时该dep中的subs添加这个watcher。
5. 设置vm.count = 2，调用count代理的set方法触发dep的notify方法，因为是computed属性，只是将watcher中的dirty设置为true。
6. 最后一步vm.sum，访问其get方法时，得知sum的watcher.dirty为true,调用其watcher.evaluate()方法获取新的值。
