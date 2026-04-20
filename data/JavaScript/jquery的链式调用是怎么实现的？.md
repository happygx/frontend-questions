---
level: 2
---

# jquery的链式调用是怎么实现的？

## 题目要点

jQuery的链式调用之所以能够实现，主要是因为它的每个方法在执行完自己的任务后，都会返回调用该方法的jQuery对象本身（即`return this;`）。这样，你就可以在这个返回的对象上继续调用其他方法，从而实现链式调用。

简而言之，链式调用的秘诀在于：**每个方法都返回`this`**。

## 参考答案

我们都知道 jQuery 可以链式调用，比如：

```js
```

## 实现一个简单的链式调用

```js
class listFunc {
 // 初始化
  constructor(val) {
    this.arr = [...val];
    return this;
  }
  // 打印这个数组
  get() {
    console.log(this.arr);
    return this;
  }
  // 向数组尾部添加数据
  push(val) {
    console.log(this.arr);
    this.arr.push(val);
    return this;
  }
  // 删除尾部数据
  pop() {
    console.log(this.arr);
    this.arr.pop();
    return this;
  }
}
const list = new listFunc([1, 2, 3]);
list.get().pop().push('ldq')
```
