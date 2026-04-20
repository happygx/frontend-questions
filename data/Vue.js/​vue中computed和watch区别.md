---
level: 2
---

# ​vue中computed和watch区别 

## 题目要点

### computed 计算属性

- **定义**：基于其他响应式数据计算得出新值。
- **特点**：
  - **缓存**：依赖数据不变时，不会重新计算，直接使用缓存结果。
  - **高效**：只有相关数据变化时才会重新计算。
  - **读写分离**：具有getter和setter方法，可以分别处理读取和设置操作。
- **使用场景**：用于模板内的复杂逻辑计算。

### watch 监听属性

- **定义**：用于观察和响应Vue实例上的数据变动。
- **特点**：
  - **实时性**：数据变化时立即执行回调函数。
  - **异步操作**：适合执行数据变化后的异步操作。
  - **深度监听**：可以监听对象内部属性的变化。
- **使用场景**：用于数据变化后执行的业务逻辑，特别是异步操作。

### 区别

- **缓存**：computed有缓存，watch没有。
- **使用方式**：computed更侧重于计算得出新值，watch更侧重于观察变化后执行操作。
- **场景**：computed适合计算密集型操作，watch适合观察变化后执行的业务逻辑。

## 参考答案

computed 和 watch看似都能实现对数据的监听，但还是有区别。

以下通过一个小栗子来理解一下这两者的区别。

## **computed 计算属性**  

计算属性基于 data 中声明过或者父组件传递的 props 中的数据通过计算得到的一个**新值**，这个新值只会根据已知值的变化而变化，简言之：这个属性依赖其他属性，由**其他属性计算而来**的。

```js
... ...
data: {
    firstName: 'David',
    lastName: 'Beckham'
},
computed: {
    fullName: function() { //方法的返回值作为属性值
            return this.firstName + ' ' + this.lastName
    }
}
```

**注**：计算属性 fullName 不能在 data 中定义，而计算属性值的相关已知值在data中；  
如果 fullName 在 data 中定义了会报错如下图：

![image.png](https://static.ecool.fun//article/6900ccea-aa97-463e-ae1f-bd6682dcc000.png)

因为如果 computed 属性值是一个函数，那么默认会走 get 方法，必须要有一个返回值，函数的返回值就是属性的属性值。计算属性定义了 fullName 并返回对应的结果给这个变量，变量不可被重复定义和赋值。

在官方文档中，还强调了 computed 一个重要的特点，就是 **computed 带有缓存功能**。比如我在页面中多次显示 fullName：

```js
<p>姓名：{{ fullName }}</p>
<p>姓名：{{ fullName }}</p>
<p>姓名：{{ fullName }}</p>
<p>姓名：{{ fullName }}</p>
... ... 

computed: {
    fullName: function () {
         console.log('computed') // 在控制台只打印了一次
         return this.firstName + ' ' + this.lastName
    }
}
```
而 computed 属性值默认会缓存计算结果，计算属性是基于它们的响应式依赖进行缓存的；  
只有当 computed 属性被使用后，才会执行 computed 的代码，在重复的调用中，只要依赖数据不变，直接取缓存中的计算结果。只有**依赖型数据**发生**改变**，computed 才会重新计算。

## **计算属性的高级**：  
 在computed 中的属性都有一个 **get** 和一个 **set** 方法，当数据变化时，调用 set 方法。下面我们通过计算属性的 getter/setter 方法来实现对属性数据的显示和监视，即双向绑定。

```js
    fullName: {
        get() { //读取当前属性值的回调，根据相关的数据计算并返回当前属性的值
            return this.firstName + ' ' + this.lastName
        },
        set(val) { // 当属性值发生改变时回调，更新相关的属性数据，val就是fullName的最新属性值
            const names = val ? val.split(' ') : [];
            this.firstName = names[0]
            this.lastName = names[1]
        }
    }
}
```

通过 vm 对象的 $watch() 或 watch 配置来监听 Vue 实例上的属性变化，或某些特定数据的变化，然后执行某些具体的业务逻辑操作。当属性变化时，回调函数自动调用，在函数内部进行计算。其可以监听的数据来源：data，props，computed 内的数据。

以上示例通过 watch 来实现：

```js
    // 监听 data 中的 firstName，如果发生了变化，就把变化的值给 data 中的 fullName， val 就是 firstName 的最新值
    firstName: function(val) { 
        this.fullName = val + ' ' + this.lastName
    },
    lastName: function(val) {
        this.fullName = this.firstName + ' ' + val
    }    
}
// 由上可以看出 watch 要监听两个数据，而且代码是同类型的重复的，所以相比用 computed 更简洁
```

在使用时选择 watch 还是 computed，还有一个参考点就是官网说的：当需要在数据变化时执行异步或开销较大的操作时，watch方式是最有用的。所以 watch 一定是**支持异步**的。

上面仅限监听简单数据类型，监听复杂数据类型就需要用到深度监听 deep。  

**deep：**为了发现对象内部值的变化，可以在选项参数中指定 deep: true。注意监听数组的变更不需要这么做。

```js
    fullName: {
        firstName: 'David',
        lastName: 'Beckham'
    }
},
watch: {
    fullName: {
        handler(newVal, oldVal) {
            console.log(newVal);
            console.log(oldVal);
        },
        deep: true
    }
}
```

![image.png](https://static.ecool.fun//article/24940fc3-0709-4fa1-8fec-b21eafef35c3.png)

打印出来的 newVal 和 oldVal 值是一样的，所以深度监听虽然可以监听到对象的变化，但是无法监听到对象里面哪个具体属性的变化。这是因为它们的引用指向同一个对象/数组。Vue 不会保留变更之前值的副本。

若果要监听对象的单个属性的变化，有两种方法：  
1.直接监听对象的属性

```js
    fullName.firstName: function(newVal,oldVal){
        console.log(newVal,oldVal);
    }
}
```

```js
    firstNameChange() {
    return this.fullName.firstName
    }
},
watch: {
    firstNameChange() {
        console.log(this.fullName)
    }
}
```

**watch和computed都是以Vue的依赖追踪机制为基础**的，当某一个依赖型数据（依赖型数据：简单理解即放在 data 等对象下的实例数据）发生变化的时候，所有依赖这个数据的相关数据会自动发生变化，即自动调用相关的函数，来实现数据的变动。

**当依赖的值变化时，在watch中，是可以做一些复杂的操作的，而computed中的依赖，仅仅是一个值依赖于另一个值，是值上的依赖。** 

### 应用场景：  
 computed：用于处理复杂的逻辑运算；一个数据受一个或多个数据影响；用来处理watch和methods无法处理的，或处理起来不方便的情况。例如处理模板中的复杂表达式、购物车里面的商品数量和总金额之间的变化关系等。  
 watch：用来处理当一个属性发生变化时，需要执行某些具体的业务逻辑操作，或要在数据变化时执行异步或开销较大的操作；一个数据改变影响多个数据。例如用来监控路由、inpurt 输入框值的特殊处理等。

### 区别：

#### **computed**

* 初始化显示或者相关的 data、props 等属性数据发生变化的时候调用；
* 计算属性不在 data 中，它是基于data 或 props 中的数据通过计算得到的一个新值，这个新值根据已知值的变化而变化；
* 在 computed 属性对象中定义计算属性的方法，和取data对象里的数据属性一样，以属性访问的形式调用；
* 如果 computed 属性值是函数，那么默认会走 get 方法，必须要有一个返回值，函数的返回值就是属性的属性值；
* computed 属性值默认会**缓存**计算结果，在重复的调用中，只要依赖数据不变，直接取缓存中的计算结果，只有**依赖型数据**发生**改变**，computed 才会重新计算；
* 在computed中的，属性都有一个 get 和一个 set 方法，当数据变化时，调用 set 方法。

#### **watch**

* 主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作，可以看作是 computed 和 methods 的结合体；
* 可以监听的数据来源：data，props，computed内的数据；
* watch**支持异步**；
* **不支持缓存**，监听的数据改变，直接会触发相应的操作；
* 监听函数有两个参数，第一个参数是最新的值，第二个参数是输入之前的值，顺序一定是新值，旧值。
