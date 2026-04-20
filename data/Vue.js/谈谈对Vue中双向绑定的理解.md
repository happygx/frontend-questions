---
level: 2
---

# 谈谈对Vue中双向绑定的理解

## 题目要点

Vue中的双向绑定是其核心特性之一，它极大地简化了数据在视图（View）和模型（Model）之间的同步过程。双向绑定意味着当数据发生变化时，视图会自动更新以反映这些变化，反之亦然，用户在视图上的操作（如输入）也会自动更新到数据中。

#### 实现原理

Vue的双向绑定主要依赖于其响应式系统（Reactivity System）和模板引擎（Template Engine）。

1. **响应式系统**：Vue使用Object.defineProperty（在Vue 3中使用了Proxy）来劫持（或说“代理”）对象的getter和setter。当组件的data中的属性被访问或修改时，Vue会拦截这些操作，并执行相应的依赖更新逻辑。这样，Vue就能追踪到数据的变化，并在需要时更新视图。

2. **模板引擎**：Vue的模板引擎使用基于HTML的模板语法，允许开发者声明式地将DOM绑定到底层Vue实例的数据上。当数据变化时，Vue的模板引擎会重新渲染模板，生成新的虚拟DOM树，并通过高效的DOM diff算法更新真实的DOM，以反映数据的最新状态。

## 参考答案

## 一、什么是双向绑定

我们先从单向绑定切入单向绑定非常简单，就是把`Model`绑定到`View`，当我们用`JavaScript`代码更新`Model`时，`View`就会自动更新双向绑定就很容易联想到了，在单向绑定的基础上，用户更新了`View`，`Model`的数据也自动被更新了，这种情况就是双向绑定举个栗子

 ![](https://static.ecool.fun//article/129e9076-eae0-4f4c-87e5-3330cbb35e23.png)

当用户填写表单时，`View`的状态就被更新了，如果此时可以自动更新`Model`的状态，那就相当于我们把`Model`和`View`做了双向绑定关系图如下

 ![](https://static.ecool.fun//article/042320e1-1cc9-4439-ac9d-bf6a7ababccf.png)

## 二、双向绑定的原理是什么

我们都知道 `Vue` 是数据双向绑定的框架，双向绑定由三个重要部分构成

- 数据层（Model）：应用的数据及业务逻辑
- 视图层（View）：应用的展示效果，各类UI组件
- 业务逻辑层（ViewModel）：框架封装的核心，它负责将数据与视图关联起来

而上面的这个分层的架构方案，可以用一个专业术语进行称呼：`MVVM`这里的控制层的核心功能便是 “数据双向绑定” 。自然，我们只需弄懂它是什么，便可以进一步了解数据绑定的原理

### 理解ViewModel

它的主要职责就是：

- 数据变化后更新视图
- 视图变化后更新数据

当然，它还有两个主要部分组成

- 监听器（Observer）：对所有数据的属性进行监听
- 解析器（Compiler）：对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数

### 三、实现双向绑定

我们还是以`Vue`为例，先来看看`Vue`中的双向绑定流程是什么的

1.  `new Vue()`首先执行初始化，对`data`执行响应化处理，这个过程发生`Observe`中
2.  同时对模板执行编译，找到其中动态绑定的数据，从`data`中获取并初始化视图，这个过程发生在`Compile`中
3.  同时定义⼀个更新函数和`Watcher`，将来对应数据变化时`Watcher`会调用更新函数
4.  由于`data`的某个`key`在⼀个视图中可能出现多次，所以每个`key`都需要⼀个管家`Dep`来管理多个`Watcher`
5.  将来data中数据⼀旦发生变化，会首先找到对应的`Dep`，通知所有`Watcher`执行更新函数

流程图如下：

 ![](https://static.ecool.fun//article/7e2d907a-e80d-4e00-ab72-4f829010bd47.png)

### 实现

先来一个构造函数：执行初始化，对`data`执行响应化处理

```js
  constructor(options) {  
    this.$options = options;  
    this.$data = options.data;  
        
    // 对data选项做响应式处理  
    observe(this.$data);  
        
    // 代理data到vm上  
    proxy(this);  
        
    // 执行编译  
    new Compile(options.el, this);  
  }  
}  
```

```js
  if (typeof obj !== "object" || obj == null) {  
    return;  
  }  
  new Observer(obj);  
}  
  
class Observer {  
  constructor(value) {  
    this.value = value;  
    this.walk(value);  
  }  
  walk(obj) {  
    Object.keys(obj).forEach((key) => {  
      defineReactive(obj, key, obj[key]);  
    });  
  }  
}  
```

对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数

 ![](https://static.ecool.fun//article/81fac2e4-25a8-4a51-adff-143803d0099a.png)

```
  constructor(el, vm) {  
    this.$vm = vm;  
    this.$el = document.querySelector(el);  // 获取dom  
    if (this.$el) {  
      this.compile(this.$el);  
    }  
  }  
  compile(el) {  
    const childNodes = el.childNodes;   
    Array.from(childNodes).forEach((node) => { // 遍历子元素  
      if (this.isElement(node)) {   // 判断是否为节点  
        console.log("编译元素" + node.nodeName);  
      } else if (this.isInterpolation(node)) {  
        console.log("编译插值⽂本" + node.textContent);  // 判断是否为插值文本 {{}}  
      }  
      if (node.childNodes && node.childNodes.length > 0) {  // 判断是否有子元素  
        this.compile(node);  // 对子元素进行递归遍历  
      }  
    });  
  }  
  isElement(node) {  
    return node.nodeType == 1;  
  }  
  isInterpolation(node) {  
    return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent);  
  }  
}  
  
```

视图中会用到`data`中某`key`，这称为依赖。同⼀个`key`可能出现多次，每次都需要收集出来用⼀个`Watcher`来维护它们，此过程称为依赖收集多个`Watcher`需要⼀个`Dep`来管理，需要更新时由`Dep`统⼀通知

 ![](https://static.ecool.fun//article/7a337c07-fe16-4da1-ba47-28c28a4a61c6.png)

实现思路

 1. `defineReactive`时为每⼀个`key`创建⼀个`Dep`实例
 2. 初始化视图时读取某个`key`，例如`name1`，创建⼀个`watcher1`
 3. 由于触发`name1`的`getter`方法，便将`watcher1`添加到`name1`对应的Dep中
 4. 当`name1`更新，`setter`触发时，便可通过对应`Dep`通知其管理所有`Watcher`更新

```js
class Watcher {  
  constructor(vm, key, updater) {  
    this.vm = vm  
    this.key = key  
    this.updaterFn = updater  
  
    // 创建实例时，把当前实例指定到Dep.target静态属性上  
    Dep.target = this  
    // 读一下key，触发get  
    vm[key]  
    // 置空  
    Dep.target = null  
  }  
  
  // 未来执行dom更新函数，由dep调用的  
  update() {  
    this.updaterFn.call(this.vm, this.vm[this.key])  
  }  
}  
```

```js
  constructor() {  
    this.deps = [];  // 依赖管理  
  }  
  addDep(dep) {  
    this.deps.push(dep);  
  }  
  notify() {   
    this.deps.forEach((dep) => dep.update());  
  }  
}  
```

```js
  constructor(vm, key, updateFn) {  
    Dep.target = this;  
    this.vm[this.key];  
    Dep.target = null;  
  }  
}  
  
```

```js
  this.observe(val);  
  const dep = new Dep();  
  Object.defineProperty(obj, key, {  
    get() {  
      Dep.target && dep.addDep(Dep.target);// Dep.target也就是Watcher实例  
      return val;  
    },  
    set(newVal) {  
      if (newVal === val) return;  
      dep.notify(); // 通知dep执行更新方法  
    },  
  });  
}  
```
