---
level: 3
---

# 说说你对Vue中 keep-alive 的理解

## 题目要点

`keep-alive`是Vue.js中一个内置组件，用于缓存不活动的组件实例，以避免重复渲染DOM，提高性能。它可以在组件切换时保持组件的状态，并在需要时重新使用之前的组件实例。`keep-alive`可以配合Vue的路由系统使用，以保持路由切换时页面的状态。

`keep-alive`组件可以设置一些属性，如`include`、`exclude`和`max`，来控制哪些组件需要被缓存，以及缓存的最大数量。

- `include`：设置需要被缓存的组件名称，可以是字符串、正则表达式或数组。
- `exclude`：设置不需要被缓存的组件名称，可以是字符串、正则表达式或数组。
- `max`：设置缓存的最大数量。
在使用`keep-alive`时，通常会将其包裹在动态组件周围，如`<keep-alive><component :is="view"></component></keep-alive>`，这样被包裹的组件就会被缓存。

`keep-alive`组件内部实现了一个缓存机制，它使用一个`cache`对象来存储缓存的组件实例，并通过一个`keys`数组来维护缓存组件的顺序。当组件被激活时，它会检查当前组件是否已经在缓存中，如果已经存在，则直接使用缓存的组件实例；如果不存在，则将其添加到缓存中。

当组件被缓存时，它会多出两个生命周期钩子：`activated`和`deactivated`。`activated`钩子在组件被激活时调用，而`deactivated`钩子在组件被移除缓存时调用。

在使用`keep-alive`时，需要注意以下几点：

- `include`和`exclude`属性可以用来控制缓存逻辑，确保只缓存需要的组件。
- `max`属性可以用来限制缓存数量，防止缓存过多。
- 服务器端渲染期间，`activated`钩子不会被调用，因为组件实例是在服务器端创建的。

在使用`keep-alive`时，可以配合Vue的路由系统，在路由配置中设置`meta`属性，以控制是否需要缓存该路由对应的组件。例如，在路由配置中设置`meta: { keepAlive: true }`，则该路由对应的组件会被缓存。

## 参考答案

## 一、Keep-alive 是什么

`keep-alive`是`vue`中的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染`DOM`

`keep-alive` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们

`keep-alive`可以设置以下`props`属性：

- `include` - 字符串或正则表达式。只有名称匹配的组件会被缓存
- `exclude` - 字符串或正则表达式。任何名称匹配的组件都不会被缓存
- `max` - 数字。最多可以缓存多少组件实例

关于`keep-alive`的基本用法：

```js
  <component :is="view"></component>
</keep-alive>
```

```js
  <component :is="view"></component>
</keep-alive>

<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```

设置了 keep-alive 缓存的组件，会多出两个生命周期钩子（`activated`与`deactivated`）：

- 首次进入组件时：`beforeRouteEnter` > `beforeCreate` > `created`> `mounted` > `activated` > ... ... > `beforeRouteLeave` > `deactivated`

- 再次进入组件时：`beforeRouteEnter` >`activated` > ... ... > `beforeRouteLeave` > `deactivated`

## 二、使用场景

使用原则：当我们在某些场景下不需要让页面重新加载时我们可以使用`keepalive`

举个栗子:

当我们从`首页`–>`列表页`–>`商详页`–>`再返回`，这时候列表页应该是需要`keep-alive`

从`首页`–>`列表页`–>`商详页`–>`返回到列表页(需要缓存)`–>`返回到首页(需要缓存)`–>`再次进入列表页(不需要缓存)`，这时候可以按需来控制页面的`keep-alive`

在路由中设置`keepAlive`属性判断是否需要缓存

```js
  path: 'list',
  name: 'itemList', // 列表页
  component (resolve) {
    require(['@/pages/item/list'], resolve)
 },
 meta: {
  keepAlive: true,
  title: '列表页'
 }
}
```

```js
    <keep-alive>
        <!-- 需要缓存的视图组件 --> 
        <router-view v-if="$route.meta.keepAlive"></router-view>
     </keep-alive>
      <!-- 不需要缓存的视图组件 -->
     <router-view v-if="!$route.meta.keepAlive"></router-view>
</div>
```

`keep-alive`是`vue`中内置的一个组件

源码位置：src/core/components/keep-alive.js

```js
  name: 'keep-alive',
  abstract: true,

  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },

  created () {
    this.cache = Object.create(null)
    this.keys = []
  },

  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  render() {
    /* 获取默认插槽中的第一个组件节点 */
    const slot = this.$slots.default
    const vnode = getFirstComponentChild(slot)
    /* 获取该组件节点的componentOptions */
    const componentOptions = vnode && vnode.componentOptions

    if (componentOptions) {
      /* 获取该组件节点的名称，优先获取组件的name字段，如果name不存在则获取组件的tag */
      const name = getComponentName(componentOptions)

      const { include, exclude } = this
      /* 如果name不在inlcude中或者存在于exlude中则表示不缓存，直接返回vnode */
      if (
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { cache, keys } = this
      /* 获取组件的key值 */
      const key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
     /*  拿到key值后去this.cache对象中去寻找是否有该值，如果有则表示该组件有缓存，即命中缓存 */
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key)
      }
        /* 如果没有命中缓存，则将其设置进缓存 */
        else {
        cache[key] = vnode
        keys.push(key)
        // prune oldest entry
        /* 如果配置了max并且缓存的长度超过了this.max，则从缓存中删除第一个 */
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }

      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}
```

`this.cache`是一个对象，用来存储需要缓存的组件，它将以如下形式存储：

```js
    'key1':'组件1',
    'key2':'组件2',
    // ...
}
```

```js
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key]
  /* 判断当前没有处于被渲染状态的组件，将其销毁*/
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}
```

```javascript
    this.$watch('include', val => {
        pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
        pruneCache(this, name => !matches(val, name))
    })
}
```

```javascript
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const cachedNode = cache[key]
    if (cachedNode) {
      const name = getComponentName(cachedNode.componentOptions)
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}
```

关于`keep-alive`的最强大缓存功能是在`render`函数中实现

首先获取组件的`key`值：

```javascript
componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
: vnode.key
```

```javascript
if (cache[key]) {
    vnode.componentInstance = cache[key].componentInstance
    /* 调整该组件key的顺序，将其从原来的地方删掉并重新放在最后一个 */
    remove(keys, key)
    keys.push(key)
} 
```

`this.cache`对象中没有该`key`值的情况，如下：

```javascript
else {
    cache[key] = vnode
    keys.push(key)
    /* 如果配置了max并且缓存的长度超过了this.max，则从缓存中删除第一个 */
    if (this.max && keys.length > parseInt(this.max)) {
        pruneCacheEntry(cache, keys[0], keys, this._vnode)
    }
}
```

此时再判断`this.keys`中缓存组件的数量是否超过了设置的最大缓存数量值`this.max`，如果超过了，则把第一个缓存组件删掉



## 四、思考题：缓存后如何获取数据

解决方案可以有以下两种：

- beforeRouteEnter
- actived

### beforeRouteEnter

每次组件渲染的时候，都会执行`beforeRouteEnter`

```js
    next(vm=>{
        console.log(vm)
        // 每次进入路由执行
        vm.getData()  // 获取数据
    })
},
```

在`keep-alive`缓存的组件被激活的时候，都会执行`actived`钩子

```js
	  this.getData() // 获取数据
},
```
