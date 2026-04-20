---
level: 2
---

# Vue中给对象添加新属性时，界面不刷新怎么办?

## 题目要点

在Vue.js中，直接向已创建的Vue实例的响应式数据对象中添加新属性时，可能会遇到一个问题：这些新属性不会自动变为响应式，因此不会触发视图的更新。这是因为Vue 2.x版本使用`Object.defineProperty`来实现数据响应式，该方法只对预先定义的属性起作用。

#### 原理分析

Vue 2.x使用`Object.defineProperty`来创建对象的响应式属性。这意味着当您访问或设置一个已通过这种方式定义的属性时，Vue会拦截这些操作并执行相应的getter和setter，从而使数据保持响应式。然而，当您添加一个新属性时，Vue不会自动将其设置为响应式，因为`Object.defineProperty`只对已经存在的属性有效。

#### 解决方案

为了解决这个问题，Vue提供了几种方法来确保新添加的属性也是响应式的：

1. **Vue.set()**：Vue提供了一个全局的`Vue.set`方法，它可以用来向响应式对象中添加新的响应式属性。
2. **Object.assign()**：如果您需要向对象添加多个新属性，可以创建一个新的对象，然后使用`Object.assign`方法将原对象和新属性合并。
3. **$forceUpdate()**：这是一个不太推荐的方法，它迫使Vue实例重新渲染，包括其所有子组件。

## 参考答案

## 一、直接添加属性的问题

我们从一个例子开始

定义一个`p`标签，通过`v-for`指令进行遍历

然后给`botton`标签绑定点击事件，我们预期点击按钮时，数据新增一个属性，界面也 新增一行

```html
    {{ value }}
</p>
<button @click="addProperty">动态添加新属性</button>
```

```js
    el:"#app",
   	data:()=>{
       	item:{
            oldProperty:"旧属性"
        }
    },
    methods:{
        addProperty(){
            this.items.newProperty = "新属性"  // 为items添加新属性
            console.log(this.items)  // 输出带有newProperty的items
        }
    }
})
```


## 二、原理分析

为什么产生上面的情况呢？

下面来分析一下

`vue2`是用过`Object.defineProperty`实现数据响应式

```js
Object.defineProperty(obj, 'foo', {
    get() {
        console.log(`get foo:${val}`);
        return val
    },
    set(newVal) {
        if (newVal !== val) {
            console.log(`set foo:${newVal}`);
            val = newVal
        }
    }
})
```

```js
obj.foo = 'new'
```

```js
```

## 三、解决方案

`Vue` 不允许在已经创建的实例上动态添加新的响应式属性

若想实现数据与视图同步更新，可采取下面三种解决方案：

- Vue.set()
- Object.assign()
- $forcecUpdated()



### Vue.set()

Vue.set( target, propertyName/index, value )

参数

- `{Object | Array} target`
- `{string | number} propertyName/index`
- `{any} value`

返回值：设置的值

通过`Vue.set`向响应式对象中添加一个`property`，并确保这个新 `property `同样是响应式的，且触发视图更新

关于`Vue.set`源码（省略了很多与本节不相关的代码）

源码位置：`src\core\observer\index.js`

```js
  ...
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```

关于`defineReactive`方法，内部还是通过`Object.defineProperty`实现属性拦截

大致代码如下：

```js
    Object.defineProperty(obj, key, {
        get() {
            console.log(`get ${key}:${val}`);
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                console.log(`set ${key}:${newVal}`);
                val = newVal
            }
        }
    })
}
```

直接使用`Object.assign()`添加到对象的新属性不会触发更新

应创建一个新的对象，合并原对象和混入对象的属性

```js
```

如果你发现你自己需要在 `Vue `中做一次强制更新，99.9% 的情况，是你在某个地方做错了事

`$forceUpdate`迫使` Vue` 实例重新渲染

PS：仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。



### 小结

- 如果为对象添加少量的新属性，可以直接采用`Vue.set()`

- 如果需要为新对象添加大量的新属性，则通过`Object.assign()`创建新对象

- 如果你实在不知道怎么操作时，可采取`$forceUpdate()`进行强制刷新 (不建议)
  

PS：`vue3`是用过`proxy`实现数据响应式的，直接动态添加新属性仍可以实现数据响应式
