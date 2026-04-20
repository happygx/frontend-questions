---
level: 2
---

# vuex中的辅助函数怎么使用？

## 题目要点

Vuex 辅助函数是用于简化 Vuex 状态管理和方法调用的语法糖。这些函数可以将 Vuex 状态和操作映射到 Vue 组件中，从而简化代码，提高开发效率。

辅助函数包括：

1. **mapState**：将 Vuex 状态映射到组件的计算属性上。
2. **mapGetters**：将 Vuex 计算属性（getters）映射到组件的计算属性上。
3. **mapMutations**：将 Vuex 方法（mutations）映射到组件的方法（methods）上。
4. **mapActions**：将 Vuex 方法（actions）映射到组件的方法（methods）上。
使用这些辅助函数，可以在组件中直接使用映射后的属性和方法，而不需要每次都手动调用 Vuex 的方法。

辅助函数的使用方式是在组件的 `computed` 或 `methods` 对象中通过 `...` 语法引入，并将映射关系作为参数传递。

命名空间是 Vuex 4.0 引入的一个新特性，用于模块化 Vuex 状态管理。通过设置模块的 `namespaced: true`，可以给每个模块设置独立的命名空间，避免不同模块间状态和方法的命名冲突。

在引入命名空间后，模块内的状态和方法访问方式会发生变化，需要在模块名前加上 `/` 来访问模块内的状态和方法。

例如，如果模块名为 `todo`，那么访问模块内的状态 `inputVal` 需要写成 `this.$store.state.todo.inputVal`。

## 参考答案

在实际开发中，我们经常会用到 vuex 来对数据进行管理，随着数据越来越多，我们逐渐开始使用一些语法糖来帮助我们快速开发。 即 vuex 中的 mapState、mapGetters、mapMutations、mapActions 等辅助函数是我们经常使用到的。

## 辅助函数

通过辅助函数`mapState`、`mapActions`、`mapMutations`，把`vuex.store`中的属性映射到`vue`实例身上，这样在`vue`实例中就能访问`vuex.store`中的属性了，对于操作`vuex.store`就很方便了。

`state`辅助函数为`mapState`，`actions`辅助函数为`mapActions`，`mutations`辅助函数为`mapMutations`。（`Vuex`实例身上有`mapState`、`mapActions`、`mapMutations`属性，属性值都是函数）

## 如何使用辅助函数

首先，需要在当前组件中引入`Vuex`。

然后，通过Vuex来调用辅助函数。

## 辅助函数如何去映射vuex.store中的属性

### 1、mapState:把state属性映射到computed身上

```js
  ...Vuex.mapState({
    input:state=>state.inputVal,
    n:state=>state.n
  })   
}

```

响应式原因：`state`里面有一个`getters`、`setters`方法；`data`中的数据也是响应式的，因为里面也有`getters`和`setters`方法

在`computed`属性中来接收`state`中的数据,接收方式有2种（数组和对象，推荐对象）.

优点：

*   本身key值是别名，要的是val的值，key的值a 和 val="a"一样就行，随意写。减少state里面长的属性名。
*   可以在函数内部查看state中的数据，数组方式的话，必须按照state中的属性名。

```js
    key:state=>state.属性
  })
```

```js
    ...Vuex.mapState({
       key:state=>state.属性
    })
  }
```

```js
        ...Vuex.mapActions({
            add:"handleTodoAdd",    //val为actions里面的方法名称
            change:"handleInput"     
        })
    }

```

等价于如下的函数调用，

```js
	handleInput(e){           
		let val = e.target.value;
		this.$store.dispatch("handleInput",val )
	},
	handleAdd(){
		this.$store.dispatch("handleTodoAdd")
	}
}

```

### 3、mapMutations：把mutations里面的方法映射到methods中

只是做简单的数据修改（例如n++），它没有涉及到数据的处理，没有用到业务逻辑或者异步函数，可以直接调用mutations里的方法修改数据。

```js
        ...Vuex.mapMutations({
            handleAdd:"handlMutationseAdd"
        })
    }

```

理解`state`、`actions`、`mutations`，可以参考`MVC`框架。

*   `state`看成一个数据库，只是它是响应式的，刷新页面数据就会改变；
*   `actions`看成controller层，做数据的业务逻辑；
*   `mutations`看成model层，做数据的增删改查操作。

### 4、mapGetters:把getters属性映射到computed身上

```js
        ...Vuex.mapGetters({
            NumN:"NumN"
        })
    }

```

### 5、modules属性:  模块

把公共的状态按照模块进行划分

* 每个模块都相当于一个小型的Vuex
* 每个模块里面都会有`state` `getters` `actions` `mutations`
* 切记在导出模块的时候加一个 `namespaced:true` 主要的作用是将每个模块都有独立命名空间
* `namespace：true`在多人协作开发的时候，可能子模块和主模块中的函数名字会相同，这样在调用函数的时候，相同名字的函数都会被调用，就会发生问题。为了解决这个问题，导出模块的时候要加`namespace：true`.

那么怎么调用子模块中的函数呢？假如我的子模块名字为todo.js。 函数名字就需要改成todo/函数名字。输出模块后的store实例如下图所示：

![image.png](https://static.ecool.fun//article/00e48252-2d3b-4dd5-9a39-97112785b566.png)

可以看到模块化后，store实例的state属性的访问方式也改变了，`this.$store.state.todo.inputVal`

可以简单总结一下辅助函数通过vuex使用，比喻成映射关系为：

*   `mapState/mapGettes---&gt;computed` ；
*   `mapAcions/mapMutations----&gt;methods`

## 命名空间

模块开启命名空间后，享有独自的命名空间。示例代码如下：

```js
	namespaced: true,
	....
}
```

```js

mapXXXs('命名空间名称',{

　　'组件中的新名称1':'Vuex中的原名称1',

　　'组件中的新名称2':'Vuex中的原名称2',

})
```
