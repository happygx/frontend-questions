---
level: 2
---

# 说说你对Vue生命周期的理解

## 题目要点

#### 一、生命周期是什么

生命周期可以通俗地理解为组件从创建、初始化数据、编译模板、挂载到DOM、渲染、更新、销毁等一系列过程。这些生命周期钩子提供了一个时间点，允许开发者执行特定任务，例如数据获取、事件绑定、状态管理等。

#### 二、生命周期有哪些

Vue的生命周期钩子包括以下阶段：

- `beforeCreate`：组件实例被创建之初，`data`和`methods`还未定义。
- `created`：组件实例已经完全创建，`data`和`methods`已经定义，但尚未挂载到DOM上。
- `beforeMount`：组件挂载之前，模板已编译完成，但DOM还未被渲染。
- `mounted`：组件已经挂载到DOM上，`el`选项对应的真实DOM元素已被替换，可以访问和操作DOM元素。
- `beforeUpdate`：组件数据发生变化，即将重新渲染之前。
- `updated`：组件数据更新完成，所有状态都是最新的。
- `beforeDestroy`：组件实例销毁之前，可以清理定时器、解绑事件监听器等。
- `destroyed`：组件实例完全销毁，`data`和`methods`不可访问。
此外，还有特殊的生命周期钩子：
- `activated`：`keep-alive`缓存的组件激活时调用。
- `deactivated`：`keep-alive`缓存的组件停用时调用。
- `errorCaptured`：捕获一个来自子孙组件的错误时调用。

#### 三、生命周期整体流程

Vue的生命周期流程可以分为以下几个阶段：

1. **beforeCreate -> created**：初始化`Vue`实例，进行数据观测。
2. **created**：完成数据观测，属性与方法的运算，`watch`、`event`事件回调的配置。可以调用`methods`中的方法，访问和修改`data`数据触发响应式渲染`dom`，可通过`computed`和`watch`完成数据计算。
3. **created -> beforeMount**：判断是否存在`el`选项，若不存在则停止编译，直到调用`vm.$mount(el)`才会继续编译。
4. **beforeMount -> mounted**：此阶段`vm.el`完成挂载，`vm.$el`生成的`DOM`替换了`el`选项所对应的`DOM`。
5. **mounted**：`vm.el`已完成`DOM`的挂载与渲染。
6. **beforeUpdate**：更新的数据必须是被渲染在模板上的（`el`、`template`、`rende`r之一）。
7. **updated**：完成`view`层的更新。
8. **beforeDestroy**：实例被销毁前调用。
9. **destroyed**：组件实例完全销毁。

#### 四、题外话：数据请求在`created`和`mounted`的区别

`created`钩子在组件实例创建完成时立刻调用，此时页面`DOM`节点还未生成。而`mounted`钩子在页面`DOM`节点渲染完毕后立刻执行。

- `created`更适合用于数据请求，因为它在`mounted`之前调用，可以避免页面闪动。
- `mounted`适合用于页面交互，因为它在页面渲染完毕后调用，可以确保页面已经完全加载。

## 参考答案

## 一、生命周期是什么  

生命周期`（Life Cycle）`的概念应用很广泛，特别是在政治、经济、环境、技术、社会等诸多领域经常出现，其基本涵义可以通俗地理解为“从摇篮到坟墓”`（Cradle-to-Grave）`的整个过程在`Vue`中实例从创建到销毁的过程就是生命周期，即指从创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程我们可以把组件比喻成工厂里面的一条流水线，每个工人（生命周期）站在各自的岗位，当任务流转到工人身边的时候，工人就开始工作PS：在`Vue`生命周期钩子会自动绑定 `this` 上下文到实例中，因此你可以访问数据，对 `property` 和方法进行运算这意味着**你不能使用箭头函数来定义一个生命周期方法** \(例如 `created: () => this.fetchTodos()`\)

## 二、生命周期有哪些

Vue生命周期总共可以分为8个阶段：创建前后, 载入前后,更新前后,销毁前销毁后，以及一些特殊场景的生命周期

| 生命周期 | 描述 |
| :-- | :-- |
| beforeCreate | 组件实例被创建之初 |
| created | 组件实例已经完全创建 |
| beforeMount | 组件挂载之前 |
| mounted | 组件挂载到实例上去之后 |
| beforeUpdate | 组件数据发生变化，更新之前 |
| updated | 数据数据更新之后 |
| beforeDestroy | 组件实例销毁之前 |
| destroyed | 组件实例销毁之后 |
| activated | keep-alive 缓存的组件激活时 |
| deactivated | keep-alive 缓存的组件停用时调用 |
| errorCaptured | 捕获一个来自子孙组件的错误时被调用 |

## 三、生命周期整体流程

`Vue`生命周期流程图

 ![](https://static.ecool.fun//article/a3ce0701-cd4c-4486-9dfc-4aa32628b63a.png)

#### 具体分析

**beforeCreate -> created**

- 初始化`vue`实例，进行数据观测

**created**

- 完成数据观测，属性与方法的运算，`watch`、`event`事件回调的配置
- 可调用`methods`中的方法，访问和修改data数据触发响应式渲染`dom`，可通过`computed`和`watch`完成数据计算
- 此时`vm.$el` 并没有被创建

**created -> beforeMount**

- 判断是否存在`el`选项，若不存在则停止编译，直到调用`vm.$mount(el)`才会继续编译
- 优先级：`render` > `template` > `outerHTML`
- `vm.el`获取到的是挂载`DOM`的

**beforeMount**

- 在此阶段可获取到`vm.el`
- 此阶段`vm.el`虽已完成DOM初始化，但并未挂载在`el`选项上

**beforeMount -> mounted**

- 此阶段`vm.el`完成挂载，`vm.$el`生成的`DOM`替换了`el`选项所对应的`DOM`

**mounted**

- `vm.el`已完成`DOM`的挂载与渲染，此刻打印`vm.$el`，发现之前的挂载点及内容已被替换成新的DOM

**beforeUpdate**

- 更新的数据必须是被渲染在模板上的（`el`、`template`、`rende`r之一）
- 此时`view`层还未更新
- 若在`beforeUpdate`中再次修改数据，不会再次触发更新方法

**updated**

- 完成`view`层的更新
- 若在`updated`中再次修改数据，会再次触发更新方法（`beforeUpdate`、`updated`）

**beforeDestroy**

- 实例被销毁前调用，此时实例属性与方法仍可访问

**destroyed**

- 完全销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器
- 并不能清除DOM，仅仅销毁实例

  

**使用场景分析**

  

| 生命周期 | 描述 |
| :-- | :-- |
| beforeCreate | 执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务 |
| created | 组件初始化完毕，各种数据可以使用，常用于异步数据获取 |
| beforeMount | 未执行渲染、更新，dom未创建 |
| mounted | 初始化结束，dom已创建，可用于获取访问数据和dom元素 |
| beforeUpdate | 更新前，可用于获取更新前各种状态 |
| updated | 更新后，所有状态已是最新 |
| beforeDestroy | 销毁前，可用于一些定时器或订阅的取消 |
| destroyed | 组件已销毁，作用同上 |

## 四、题外话：数据请求在created和mouted的区别

`created`是在组件实例一旦创建完成的时候立刻调用，这时候页面`dom`节点并未生成`mounted`是在页面`dom`节点渲染完毕之后就立刻执行的触发时机上`created`是比`mounted`要更早的两者相同点：都能拿到实例对象的属性和方法讨论这个问题本质就是触发的时机，放在`mounted`请求有可能导致页面闪动（页面`dom`结构已经生成），但如果在页面加载前完成则不会出现此情况建议：放在`create`生命周期当中
