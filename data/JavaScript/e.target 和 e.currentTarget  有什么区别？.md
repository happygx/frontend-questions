---
level: 0.5
---

# e.target 和 e.currentTarget  有什么区别？

## 题目要点

在 JavaScript 中，事件对象（通常表示为 `e`）在事件处理函数中被传递，用于描述事件的具体信息。`e.target` 和 `e.currentTarget` 是事件对象中的两个属性，它们都提供了事件发生时相关联的 DOM 元素，但它们的指向略有不同。

1. **e.target**：
   - 它指的是触发事件的实际元素。
   - 举例来说，如果你有一个按钮点击事件，`e.target` 就是那个按钮元素。
   - 即使事件是委托给另一个元素（比如一个包含多个按钮的容器），`e.target` 仍然是那个触发点击的按钮。

2. **e.currentTarget**：
   - 它指的是事件处理函数正在被调用的元素。
   - 举例来说，如果你有一个按钮点击事件，并且这个事件处理函数被委托给一个容器元素，那么 `e.currentTarget` 就是那个容器元素。
   - 即使点击事件是由按钮触发的，`e.currentTarget` 仍然是那个容器元素，而不是按钮本身。

总结来说，`e.target` 是触发事件的元素，而 `e.currentTarget` 是事件处理函数所在的元素。在事件委托中，这两个属性通常会指向不同的元素。

## 参考答案

## 冒泡 & 捕获

当你触发一个元素的事件的时候，该事件从该元素的祖先元素传递下去，此过程为` 捕获 `，而到达此元素之后，又会向其祖先元素传播上去，此过程为` 冒泡 `

```html
      <div id="b">
        <div id="c">
          <div id="d">哈哈哈哈哈</div>
        </div>
      </div>
    </div>
```

## addEventListener

` addEventListener `是为元素绑定事件的方法，他接收三个参数：
- 第一个参数：绑定的事件名
- 第二个参数：执行的函数
- 第三个参数：
  - false：默认，代表冒泡时绑定
  - true：代表捕获时绑定
  
## target & currentTarget

### false

我们给四个div元素绑定事件，且` addEventListener `第三个参数不设置，则默认设置为` false `

```js
const b = document.getElementById('b')
const c = document.getElementById('c')
const d = document.getElementById('d')
a.addEventListener('click', (e) => {
  const {
    target,
    currentTarget
  } = e
  console.log(`target是${target.id}`)
  console.log(`currentTarget是${currentTarget.id}`)
})
b.addEventListener('click', (e) => {
  const {
    target,
    currentTarget
  } = e
  console.log(`target是${target.id}`)
  console.log(`currentTarget是${currentTarget.id}`)
})
c.addEventListener('click', (e) => {
  const {
    target,
    currentTarget
  } = e
  console.log(`target是${target.id}`)
  console.log(`currentTarget是${currentTarget.id}`)
})
d.addEventListener('click', (e) => {
  const {
    target,
    currentTarget
  } = e
  console.log(`target是${target.id}`)
  console.log(`currentTarget是${currentTarget.id}`)
})
```
```js
target是d currentTarget是c
target是d currentTarget是b
target是d currentTarget是a
```

我们把四个事件第三个参数都设置为` true `，我们看看输出结果，可以看出触发的是d，而执行的元素是捕获的顺序
```js
target是d currentTarget是b
target是d currentTarget是c
target是d currentTarget是d
```

我们可以总结出：
- ` e.target `：**触发**事件的元素
- ` e.currentTarget `：**绑定**事件的元素
