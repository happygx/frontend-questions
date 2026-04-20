---
level: 2
---

# Vue2 动态给 data 添加一个新的属性时会发生什么

## 参考答案

**直接添加属性的问题**

我们从一个例子开始

定义一个`p`标签，通过`v-for`指令进行遍历

然后给`botton`标签绑定点击事件，我们预期点击按钮时，数据新增一个属性，界面也 新增一行

```vue
  <p v-for="(value,key) in item" :key="key">
    {{ value }}
  </p>
  <button @click="addProperty">动态添加新属性</button>
</template>
```

```js
  el: "#app",
  data: () => {
    item:{
      oldProperty:"旧属性"
    }
  },
  methods: {
    addProperty() {
      this.item.newProperty = "新属性"  // 为items添加新属性
      console.log(this.items)  // 输出带有newProperty的items
    }
  }
})
```

**原理分析**

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

**解决方案**

`Vue` 不允许在已经创建的实例上动态添加新的响应式属性

若想实现数据与视图同步更新，可采取下面三种解决方案：

- `Vue.set()`
- `Object.assign()`
- `$forcecUpdated()`

**`Vue.set()`**

`Vue.set( target, propertyName/index, value )`

参数

- `{Object | Array} target`
- `{string | number} propertyName/index`
- `{any} value`

返回值：设置的值

通过`Vue.set`向响应式对象中添加一个`property`，并确保这个新 `property` 同样是响应式的，且触发视图更新

关于`Vue.set`源码

源码位置：`src\core\observer\index.js`
```js
  ...
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```

关于 `defineReactive` 方法，内部还是通过 `Object.defineProperty` 实现属性拦截

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

直接使用Object.assign()添加到对象的新属性不会触发更新

应创建一个新的对象，合并原对象和混入对象的属性
```js
```

如果你发现你自己需要在 Vue 中做一次强制更新，99.9% 的情况，是你在某个地方做错了事

`$forceUpdate` 迫使 Vue 实例重新渲染

PS：仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

**小结**

如果为对象添加少量的新属性，可以直接采用`Vue.set()`

如果需要为新对象添加大量的新属性，则通过`Object.assign()`创建新对象

如果你实在不知道怎么操作时，可采取`$forceUpdate()`进行强制刷新 (不建议)
