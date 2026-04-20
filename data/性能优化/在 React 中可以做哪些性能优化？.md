---
level: 2.5
---

# 在 React 中可以做哪些性能优化？

## 题目要点

**答题思路**：

1. 使用`React.memo`或`PureComponent`减少不必要的渲染。
2. 利用`useCallback`和`useMemo`缓存函数和计算结果。
3. 合理使用`shouldComponentUpdate`生命周期方法。
4. 使用懒加载（`React.lazy`和`Suspense`）按需加载组件。
5. 优化渲染列表，使用`key`属性帮助React识别列表项。
6. 避免在渲染方法中创建新的对象或函数。
7. 使用`useReducer`代替在复杂组件中的多个`useState`调用。
8. 减少组件层级，避免不必要的嵌套。
9. 使用Web Workers处理复杂计算，避免阻塞主线程。
10. 使用`React.Fragment`避免额外的DOM层级。

**考察要点**：对React性能优化策略的理解和应用。

## 参考答案

* 使用 shouldComponentUpdate 避免不需要的渲染，但是如果对 props 和 state 做深比较，代价很大，所以需要根据业务进行些取舍；在有子组件的情况下，为了避免子组件的重复渲染，可以通过父组件来判断子组件是否需要 PureRender。

* 将 props 设置为数组或对象：每次调用 React 组件都会创建新组件，就算传入的数组或对象的值没有改变，他们的引用地址也会发生改变，比如，如果按照如下的写法，那么每次渲染时 style 都是一个新对象

```react.js
// 不推荐
<button style={{ color: 'red' }} />

// 推荐
const style = { color: 'red' }
<button style={style} />

// 不推荐
<button style={this.props.style || {} } />  

// 推荐
const defaultStyle = {}
<button style={this.props.style || defaultStyle } />   
```
* 使用 immutable 不可变数据，在我们项目中使用引用类型时，为了避免对原始数据的影响，一般建议使用 shallowCopy 和 deepCopy 对数据进行处理，但是这样会造成 CPU 和 内存的浪费，所以推荐使用 immutable，优点如下
	* 降低了“可变”带来的复杂度
	* 节省内存，immutable 使用结构共享尽量复用内存，没有被引用的对象会被垃圾回收
	* 可以更好的做撤销/重做，复制/粘贴，时间旅行
	* 不会有并发问题（因为数据本身就是不可变的）
	* 拥抱函数式编程
* 给子组件设置一个唯一的 key，因为在 diff 算法中，会用 key 作为唯一标识优化渲染
