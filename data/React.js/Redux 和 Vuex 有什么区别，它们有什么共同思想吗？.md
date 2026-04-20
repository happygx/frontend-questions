---
level: 2.5
---

# Redux 和 Vuex 有什么区别，它们有什么共同思想吗？

## 参考答案

## Redux 和 Vuex区别

### 相同点

* state 共享数据
* 流程一致：定义全局state，触发，修改state
* 原理相似，通过全局注入store。

### 不同点

* 从实现原理上来说：
	* Redux 使用的是不可变数据，而Vuex的数据是可变的。Redux每次都是用新的state替换旧的state，而Vuex是直接修改
	* Redux 在检测数据变化的时候，是通过 diff 的方式比较差异的，而Vuex其实和Vue的原理一样，是通过 getter/setter来比较的
* 从表现层来说：
	* vuex定义了state、getter、mutation、action四个对象；redux定义了state、reducer、action。
	* vuex中state统一存放，方便理解；reduxstate依赖所有reducer的初始值
	* vuex有getter,目的是快捷得到state；redux没有这层，react-redux mapStateToProps参数做了这个工作。
	* vuex中mutation只是单纯赋值(很浅的一层)；redux中reducer只是单纯设置新state(很浅的一层)。他俩作用类似，但书写方式不同
	* vuex中action有较为复杂的异步ajax请求；redux中action中可简单可复杂,简单就直接发送数据对象（{type:xxx, your-data}）,复杂需要调用异步ajax（依赖redux-thunk插件）。
	* vuex触发方式有两种commit同步和dispatch异步；redux同步和异步都使用dispatch

通俗点理解就是，vuex 弱化 dispatch，通过commit进行 store状态的一次更变；取消了action概念，不必传入特定的 action形式进行指定变更；弱化reducer，基于commit参数直接对数据进行转变，使得框架更加简易;

## 共同思想

* 单一的数据源
* 变化可以预测

本质上∶ redux与vuex都是对mvvm思想的服务，将数据从视图中抽离的一种方案。
