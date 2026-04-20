---
level: 3
---

# 使用 useState （const [test, setTest] = useState([])）时，为什么连续调用 setTest({...test, newValue}) 会出现值的丢失？

## 参考答案

useState是异步执行的，也就是执行 setTest 后，不会立即更新 test 的结果，多次调用时，出现了值覆盖的情况。

如果本次的状态更新依赖于上一次最近的状态更新，那么我们可以给 setTest 传递一个函数进去，函数的参数即为最后一次更新的状态的值：

```react
	...prevState,
    newValue
]))
```
