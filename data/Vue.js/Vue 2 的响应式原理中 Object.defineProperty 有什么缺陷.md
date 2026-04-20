---
level: 1
---

# Vue 2 的响应式原理中 Object.defineProperty 有什么缺陷

## 参考答案

Vue 2 中使用`Object.defineProperty`来实现其响应式系统存在一些限制和问题：

1. **深度检测**：
   Vue 2中对于对象的处理是递归的；对于每个属性，Vue会逐层使用`Object.defineProperty`将其转换成 getter/setter。这样，当你访问或修改嵌套较深的属性时（如`a.b.c`），Vue已经提前将`a`、`a.b`和`a.b.c`的属性转换为响应式，能够追踪它们的变化。

2. **数组限制**：
   `Object.defineProperty`无法检测到数组索引的变化，因此Vue重写了数组的变异方法（如`push`、`pop`、`splice`等）来实现对数组的响应式监听。

3. **对象属性添加或删除的限制**：
   因为`Object.defineProperty`只能在初始化的时候应用于属性，当你在一个已经创建的Vue实例上添加新属性时，这个新属性是非响应式的。如果你想要它是响应式的，需要使用`Vue.set()`或`this.$set()`方法添加新属性。

4. **性能问题**：
   因为`Object.defineProperty`是递归地对对象的每一个属性进行处理，所以在处理具有大量属性或深层嵌套对象时，可能会有较大的性能开销。

关于处理`a.b.c`类型的属性，Vue 2内部会递归地遍历对象`a`的所有属性，为它们各自使用`Object.defineProperty`定义getter和setter。如果`b`是`a`的属性，那么同样会针对`b`做这样的处理，以及它的所有属性，包括`c`等。这样，在访问或修改`a.b.c`时，Vue可以追踪到这些变化并触发相关的更新。

```javascript
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      // 依赖收集等操作
      return val;
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return;
      val = newVal;
      // 触发更新视图等操作
    }
  });

  // 如果val本身还是对象，则递归处理
  if (typeof val === 'object') {
    reactive(val);
  }
}

function reactive(obj) {
  for (let key in obj) {
    defineReactive(obj, key, obj[key]);
  }
}
```
