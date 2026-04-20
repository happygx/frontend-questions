---
level: 1.5
---

# JavaScript中的事件模型有哪些

## 题目要点

### 事件与事件流

- **事件定义**：JavaScript 中的事件可以理解是在 HTML 文档或浏览器中发生的一种交互操作，使得网页具备互动性。
- **事件流**：事件流描述的是事件在 DOM 树中的传播顺序，事件流会经历三个阶段：
  - 事件捕获阶段：事件从 `document` 开始，逐级向下传播到目标元素。
  - 目标阶段：事件到达目标元素并触发目标元素的监听函数。
  - 事件冒泡阶段：事件从目标元素开始，逐级向上传播到 `document`。
- **事件冒泡**：事件从最具体的元素开始，逐级向上传播到最不具体的元素。

### 事件模型

- **原始事件模型（DOM0级）**：
  - 绑定方式：通过 HTML 属性绑定或 JavaScript 代码绑定。
  - 特性：
    - 绑定速度快。
    - 只支持冒泡，不支持捕获。
    - 同一个类型的事件只能绑定一次。
- **标准事件模型（DOM2级）**：
  - 绑定方式：`addEventListener` 和 `removeEventListener`。
  - 特性：
    - 可以在一个 DOM 元素上绑定多个事件处理器。
    - 执行时机由 `useCapture` 参数决定。
- **IE事件模型**：
  - 绑定方式：`attachEvent` 和 `detachEvent`。
  - 特性：
    - 事件处理阶段：事件到达目标元素并触发目标元素的监听函数。
    - 事件冒泡阶段：事件从目标元素开始，逐级向上传播到 `document`。

## 参考答案

## 一、事件与事件流

`javascript`中的事件，可以理解就是在`HTML`文档或者浏览器中发生的一种交互操作，使得网页具备互动性， 常见的有加载事件、鼠标事件、自定义事件等

由于`DOM`是一个树结构，如果在父子节点绑定事件时候，当触发子节点的时候，就存在一个顺序问题，这就涉及到了事件流的概念

事件流都会经历三个阶段：

- 事件捕获阶段(capture phase)
- 处于目标阶段(target phase)
- 事件冒泡阶段(bubbling phase)

 ![](https://static.ecool.fun//article/cda1838d-f839-4588-9787-bbaa0bec65ea.png)

事件冒泡是一种从下往上的传播方式，由最具体的元素（触发节点）然后逐渐向上传播到最不具体的那个节点，也就是`DOM`中最高层的父节点

```html
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Event Bubbling</title>
    </head>
    <body>
        <button id="clickMe">Click Me</button>
    </body>
</html>
```

```js

button.onclick = function() {
  console.log('1.Button');
};
document.body.onclick = function() {
  console.log('2.body');
};
document.onclick = function() {
  console.log('3.document');
};
window.onclick = function() {
  console.log('4.window');
};
```

```js
2.body
3.document
4.window
```

事件捕获与事件冒泡相反，事件最开始由不太具体的节点最早接受事件, 而最具体的节点（触发节点）最后接受事件



## 二、事件模型

事件模型可以分为三种：

- 原始事件模型（DOM0级）
- 标准事件模型（DOM2级）
- IE事件模型（基本不用）



### 原始事件模型

事件绑定监听函数比较简单, 有两种方式：

- HTML代码中直接绑定

```js
```

```js
btn.onclick = fun;
```

- 绑定速度快

`DOM0`级事件具有很好的跨浏览器优势，会以最快的速度绑定，但由于绑定速度太快，可能页面还未完全加载出来，以至于事件可能无法正常运行

- 只支持冒泡，不支持捕获

- 同一个类型的事件只能绑定一次

```js

var btn = document.getElementById('.btn');
btn.onclick = fun2;
```

删除 `DOM0` 级事件处理程序只要将对应事件属性置为`null`即可

```js
```

在该事件模型中，一次事件共有三个过程:

- 事件捕获阶段：事件从`document`一直向下传播到目标元素, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行
- 事件处理阶段：事件到达目标元素, 触发目标元素的监听函数
- 事件冒泡阶段：事件从目标元素冒泡到`document`, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行

事件绑定监听函数的方式如下:

```
```

```
```

- `eventType`指定事件类型(不要加on)
- `handler`是事件处理函数
- `useCapture`是一个`boolean`用于指定是否在捕获阶段进行处理，一般设置为`false`与IE浏览器保持一致

举个例子：

```js
btn.addEventListener(‘click’, showMessage, false);
btn.removeEventListener(‘click’, showMessage, false);
```

- 可以在一个`DOM`元素上绑定多个事件处理器，各自并不会冲突

```js
btn.addEventListener(‘click’, showMessage2, false);
btn.addEventListener(‘click’, showMessage3, false);
```

当第三个参数(`useCapture`)设置为`true`就在捕获过程中执行，反之在冒泡过程中执行处理函数

下面举个例子：

```js
    <p id='p'>
        <span id='span'>Click Me!</span>
    </p >
</div>
```

```js
var p = document.getElementById('p');

function onClickFn (event) {
    var tagName = event.currentTarget.tagName;
    var phase = event.eventPhase;
    console.log(tagName, phase);
}

div.addEventListener('click', onClickFn, false);
p.addEventListener('click', onClickFn, false);
```

点击`Click Me!`，输出如下

```js
DIV 3
```

如果把第三个参数都改为`true`

```js
p.addEventListener('click', onClickFn, true);
```

```js
P 1
```



### IE事件模型

IE事件模型共有两个过程:

- 事件处理阶段：事件到达目标元素, 触发目标元素的监听函数。
- 事件冒泡阶段：事件从目标元素冒泡到`document`, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行

事件绑定监听函数的方式如下:

```
```

```
```

```js
btn.attachEvent(‘onclick’, showMessage);
btn.detachEvent(‘onclick’, showMessage);
```
