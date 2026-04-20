---
level: 2
---

# Vue常用的修饰符有哪些？分别有什么应用场景？

## 题目要点

在Vue中，修饰符（Modifiers）是一种简写形式，用于给指令添加特殊的行为或约束。它们通过在指令名后面添加一个点（`.`）和一个特定的修饰符名来实现。以下是对Vue中修饰符的总结：

### 表单修饰符

- `.lazy`：将`v-model`的更新触发时机延迟到`change`事件。
- `.trim`：自动过滤用户输入的首尾空格。
- `.number`：自动将输入值转为数值类型。

### 事件修饰符

- `.stop`：阻止事件冒泡。
- `.prevent`：阻止事件的默认行为。
- `.self`：确保只有当事件是从元素本身触发时才触发回调。
- `.once`：事件将只会触发一次。
- `.capture`：添加事件监听器时使用捕获模式。
- `.passive`：指定事件监听器使用被动模式。
- `.native`：监听组件根元素的原生事件。

### 鼠标按钮修饰符

- `.left`：只当点击鼠标左键时触发。
- `.right`：只当点击鼠标右键时触发。
- `.middle`：只当点击鼠标中键时触发。

### 键盘修饰符

- `.enter`：当按下回车键时触发。
- `.tab`：当按下tab键时触发。
- `.delete`：当按下delete键时触发。
- `.space`：当按下空格键时触发。
- `.esc`：当按下esc键时触发。
- `.up`、`.down`、`.left`、`.right`：当按下方向键时触发。

### v-bind修饰符

- `.sync`：实现props的双向绑定。
- `.prop`：将数据属性绑定到DOM属性上，并转换为驼峰命名。
- `.camel`：将数据属性绑定到DOM属性上，并转换为小驼峰命名。

### 应用场景

- 使用`.stop`和`.prevent`来阻止事件冒泡和默认行为。
- 使用`.self`来确保事件仅在元素本身上触发。
- 使用`.once`来减少重复事件监听器的数量。
- 使用`.capture`来从父元素开始捕获事件。
- 使用`.passive`来减少内存使用和提高事件处理性能。
- 使用`.native`来监听组件根元素的原生事件。
- 使用`.enter`、`.tab`等键值修饰符来响应特定的键盘事件。
- 使用`.sync`来实现props的双向绑定。
- 使用`.prop`和`.camel`来更准确地控制数据属性和DOM属性的绑定。
、

## 参考答案

## 一、修饰符是什么

在程序世界里，修饰符是用于限定类型以及类型成员的声明的一种符号

在`Vue`中，修饰符处理了许多`DOM`事件的细节，让我们不再需要花大量的时间去处理这些烦恼的事情，而能有更多的精力专注于程序的逻辑处理

`vue`中修饰符分为以下五种：

- 表单修饰符
- 事件修饰符
- 鼠标按键修饰符
- 键值修饰符
- v-bind修饰符

## 二、修饰符的作用

### 表单修饰符

在我们填写表单的时候用得最多的是`input`标签，指令用得最多的是`v-model`

关于表单的修饰符有如下：

- lazy
- trim
- number

#### lazy

在我们填完信息，光标离开标签的时候，才会将值赋予给`value`，也就是在`change`事件之后再进行信息同步

```js
<p>{{value}}</p>
```

自动过滤用户输入的首空格字符，而中间的空格不会过滤

```js
```

自动将用户的输入值转为数值类型，但如果这个值无法被`parseFloat`解析，则会返回原来的值

```js
```

事件修饰符是对事件捕获以及目标进行了处理，有如下修饰符：

- stop
- prevent
- self
- once
- capture
- passive
- native

#### stop

阻止了事件冒泡，相当于调用了`event.stopPropagation`方法

```js
  <button @click.stop="shout(1)">ok</button>
</div>
//只输出1
```

阻止了事件的默认行为，相当于调用了`event.preventDefault`方法

```js
```

只当在 `event.target` 是当前元素自身时触发处理函数

```js
```

#### once

绑定了事件以后只能触发一次，第二次就不会触发

```js
```

使事件触发从包含这个元素的顶层开始往下触发

```js
    obj1
<div @click.capture="shout(2)">
    obj2
<div @click="shout(3)">
    obj3
<div @click="shout(4)">
    obj4
</div>
</div>
</div>
</div>
// 输出结构: 1 2 4 3 
```

在移动端，当我们在监听元素滚动事件的时候，会一直触发`onscroll`事件会让我们的网页变卡，因此我们使用这个修饰符的时候，相当于给`onscroll`事件整了一个`.lazy`修饰符

```js
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```
>
> `passive` 会告诉浏览器你不想阻止事件的默认行为

#### native

让组件变成像`html`内置标签那样监听根元素的原生事件，否则组件上使用 `v-on` 只会监听自定义事件

```js
```

### 鼠标按钮修饰符

鼠标按钮修饰符针对的就是左键、右键、中键点击，有如下：

- left 左键点击
- right 右键点击
- middle 中键点击

```js
<button @click.right="shout(1)">ok</button>
<button @click.middle="shout(1)">ok</button>
```

键盘修饰符是用来修饰键盘事件（`onkeyup`，`onkeydown`）的，有如下：

`keyCode`存在很多，但`vue`为我们提供了别名，分为以下两种：

- 普通键（enter、tab、delete、space、esc、up...）
- 系统修饰键（ctrl、alt、meta、shift...）

```js
<input type="text" @keyup.keyCode="shout()">
```

```js
```



v-bind修饰符主要是为属性进行操作，用来分别有如下：

- sync
- prop
- camel

#### sync

能对`props`进行一个双向绑定

```js
<comp :myMessage.sync="bar"></comp> 
//子组件
this.$emit('update:myMessage',params);
```

```js
<comp :myMessage="bar" @update:myMessage="func"></comp>
func(e){
 this.bar = e;
}
//子组件js
func2(){
  this.$emit('update:myMessage',params);
}
```

- 使用`sync`的时候，子组件传递的事件名格式必须为`update:value`，其中`value`必须与子组件中`props`中声明的名称完全一致

- 注意带有 `.sync` 修饰符的 `v-bind` 不能和表达式一起使用

- 将 `v-bind.sync` 用在一个字面量的对象上，例如 `v-bind.sync=”{ title: doc.title }”`，是无法正常工作的

#### props

设置自定义标签属性，避免暴露数据，防止污染HTML结构

```js
```

将命名变为驼峰命名法，如将` view-Box`属性名转换为 `viewBox`

```js
```

根据每一个修饰符的功能，我们可以得到以下修饰符的应用场景：

- .stop：阻止事件冒泡
- .native：绑定原生事件
- .once：事件只执行一次
- .self ：将事件绑定在自身身上，相当于阻止事件冒泡
- .prevent：阻止默认事件
- .capture：用于事件捕获
- .once：只触发一次
- .keyCode：监听特定键盘按下
- .right：右键
