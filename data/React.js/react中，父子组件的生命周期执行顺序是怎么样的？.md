---
level: 2
---

# react中，父子组件的生命周期执行顺序是怎么样的？

## 参考答案

React的生命周期从广义上分为三个阶段：挂载、渲染、卸载，因此可以把React的生命周期分为两类：挂载卸载过程和更新过程。

## 一、挂载卸载过程

1. constructor，完成了React数据的初始化；

2. componentWillMount，组件初始化数据后，但是还未渲染DOM前；

3. componentDidMount，组件第一次渲染完成，此时dom节点已经生成；

4. componentWillUnmount，组件的卸载和数据的销毁。

## 二、更新过程

1. componentWillReceiveProps (nextProps)，父组件改变后的props需要重新渲染组件时；

2. shouldComponentUpdate(nextProps,nextState)，主要用于性能优化(部分更新)，因为react父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，在这里return false可以阻止组件的更新；

3. componentWillUpdate (nextProps,nextState)，shouldComponentUpdate返回true后，组件进入重新渲染的流程；

4. componentDidUpdate(prevProps,prevState)，组件更新完毕后触发；

5. render()，渲染时触发。

## 三、父子组件加载顺序

观察父子组件的挂载生命周期函数，可以发现挂载时，子组件的挂载钩子先被触发；卸载时，子组件的卸载钩子后被触发。

我们经常在挂载函数上注册监听器，说明此时是可以与页面交互的，也就是说其实所有挂载钩子都是在父组件实际挂载到dom树上才触发的，不过是在父组件挂载后依次触发子组件的 componentDidmount ，最后再触发自身的挂载钩子，说白了，componentDidMount 其实是异步钩子。

相反，卸载的时候父节点先被移除，再从上至下依次触发子组件的卸载钩子；

但是我们也经常在卸载钩子上卸载监听器，这说明 componentWillUnmount 其实在父组件从dom树上卸载前触发的，先触发自身的卸载钩子，但此时并未从dom树上剥离，然后依次尝试触发所有子组件的卸载钩子，最后，父组件从dom树上完成实际卸载。
