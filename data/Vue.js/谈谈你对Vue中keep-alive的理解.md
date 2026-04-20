---
level: 2.5
---

# 谈谈你对Vue中keep-alive的理解

## 题目要点

`<keep-alive>` 是 Vue 提供的内置组件，用于缓存那些不需要频繁创建和销毁的组件实例。这样，当这些组件再次被需要时，可以避免重新创建和渲染，从而提高性能。

- **include** 和 **exclude** 属性用于指定哪些组件需要被缓存或排除在外。
- **activated** 和 **deactivated** 钩子函数会在组件被激活或失活时触发。

`<keep-alive>` 常用于以下场景：

- 详情页：当用户查看表格中的某条数据详情时，返回时希望保持之前的筛选结果或页面状态。
- 表单：用户填写了表单内容后，如果路由跳转，返回时希望表单内容仍然保持，无需用户重新填写。

原理上，`<keep-alive>` 内部维护了一个包含组件实例的列表。当一个组件被切换到时，它会将该组件的实例添加到列表中，并记录下组件的名称。当该组件再次被切换到时，它会检查组件名称是否已经在列表中，如果是，则直接使用缓存的组件实例，而不是重新创建一个新的组件实例。

## 参考答案

## 什么是 keep-alive

在平常开发中，有部分组件没有必要多次初始化，这时，我们需要将组件进行持久化，使组件的状态维持不变，在下一次展示时，也不会进行重新初始化组件。

也就是说，keepalive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染，也就是所谓的组件缓存。

<keep-alive>是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。

> <keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 <transition> 相似，<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

## include和exclude指定是否缓存某些组件

* include属性

include 包含的意思。值为字符串或正则表达式或数组。只有组件的名称与include的值相同的才会被缓存，即指定哪些被缓存，可以指定多个被缓存。这里以字符串为例，指定多个组件缓存，语法是用逗号隔开。如下：

```js
<keep-alive include="home,about" >
    <router-view></router-view>
</keep-alive>
```

exclude相当于include的反义词，就是除了的意思，指定哪些组件不被缓存，用法和include类似，如下：

```js
<keep-alive exclude="home,about" >
    <router-view></router-view>
</keep-alive>
```

首先使用了keep-alive的组件以后，组件上就会自动加上了`activated`钩子和`deactivated`钩子。

* `activated` 当组件被激活（使用）的时候触发 可以简单理解为进入这个页面的时候触发
* `deactivated` 当组件不被使用（inactive状态）的时候触发 可以简单理解为离开这个页面的时候触发

假设我们只缓存home组件，我们先看一下代码，再在钩子中打印出对应的顺序。就知道钩子执行的顺序了，自己动手印象深刻

```js
<div>
  <el-checkbox v-model="checked">备选项</el-checkbox>
</div>
</template>
<script>
export default {
name: "home",
data() { return { checked: false } },
created() {
  console.log("我是created钩子");
},
mounted() {
  console.log("我是mounted钩子");
},
activated() {
  console.log("我是activated钩子");
},
deactivated() {
  console.log("我是deactivated钩子");
},
beforeDestroy() {
  console.log("我是beforeDestroy钩子");所以我们可以得出结论：
},
};
</script>
```

```
我是mounted钩子
我是activated钩子
```

```
```

```
后续进入和离开 activated --> deactivated
```

* 查看表格某条数据详情页，返回还是之前的状态，比如还是之前的筛选结果，还是之前的页数等
* 填写的表单的内容路由跳转返回还在，比如input框、下选择拉框、开关切换等用户输入了一大把东西，跳转再回来不能清空啊，不用让用户再写一遍
