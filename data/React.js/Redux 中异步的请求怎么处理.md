---
level: 3
---

# Redux 中异步的请求怎么处理

## 参考答案

一般的异步请求，可以在 `componentDidmount` 中直接进⾏请求，⽆须借助redux。

但是在⼀定规模的项⽬中,上述⽅法很难进⾏异步流的管理,通常情况下我们会借助redux的异步中间件进⾏异步处理。

redux异步流中间件其实有很多，当下主流的异步中间件有两种`redux-thunk`、`redux-saga`。

## （1）使用react-thunk中间件

### redux-thunk优点:

* 体积⼩: redux-thunk的实现⽅式很简单，只有不到20⾏代码
* 使⽤简单: redux-thunk没有引⼊像`redux-saga`或者`redux-observable`额外的范式，上⼿简单

### redux-thunk缺陷:

* 样板代码过多: 与redux本身⼀样,通常⼀个请求需要⼤量的代码,⽽且很多都是重复性质的
* 耦合严重: 异步操作与redux的action偶合在⼀起,不⽅便管理
* 功能孱弱: 有⼀些实际开发中常⽤的功能需要⾃⼰进⾏封装

##（2）使用redux-saga中间件

### redux-saga优点:

* 异步解耦: 异步操作被被转移到单独 saga.js 中，不再是掺杂在 action.js 或 component.js 中
* action摆脱`thunk function`: dispatch 的参数依然是⼀个纯粹的 action (FSA)，⽽不是充满 “⿊魔法” thunk function
* 异常处理: 受益于 `generator function` 的 saga 实现，代码异常/请求失败 都可以直接通过 `try/catch` 语法直接捕获处理
* 功能强⼤: `redux-saga`提供了⼤量的 Saga 辅助函数和 Effect 创建器供开发者使⽤,开发者⽆须封装或者简单封装即可使⽤
* 灵活: redux-saga可以将多个Saga可以串⾏/并⾏组合起来,形成⼀个⾮常实⽤的异步flow
* 易测试，提供了各种case的测试⽅案，包括mock task，分⽀覆盖等等

### redux-saga缺陷:

* 额外的学习成本: `redux-saga`不仅在使⽤难以理解的 `generator function`，⽽且有数⼗个API，学习成本远超redux-thunk。最重要的是你的额外学习成本是只服务于这个库的，与`redux-observable`不同，`redux-observable`虽然也有额外学习成本但是背后是rxjs和⼀整套思想
* 体积庞⼤: 体积略⼤,代码近2000⾏，min版25KB左右
* 功能过剩: 实际上并发控制等功能很难⽤到，但是我们依然需要引⼊这些代码
* ts⽀持不友好: yield⽆法返回TS类型

`redux-saga`可以捕获action，然后执行一个函数，那么可以把异步代码放在这个函数中。
