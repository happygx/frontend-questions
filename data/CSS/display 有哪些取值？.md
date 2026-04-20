---
level: 1
---

# display 有哪些取值？

## 题目要点

- **`none`**：元素不会被显示，也不占据空间。
- **`block`**：元素会显示为块级元素，占据整行。
- **`inline`**：元素会显示为行内元素，不占据整行。
- **`inline-block`**：元素会显示为行内块级元素，可以设置宽度和高度，但仍保持行内元素的特性。
- **`table`**：元素会显示为表格。
- **`table-row`**：元素会显示为表格行。
- **`table-cell`**：元素会显示为表格单元格。
- **`list-item`**：元素会显示为列表项，通常与 `<ul>` 或 `<ol>` 元素一起使用。
- **`table-column`**：元素会显示为表格列。
- **`table-column-group`**：元素会显示为表格列组。
- **`table-footer-group`**：元素会显示为表格页脚组。
- **`table-header-group`**：元素会显示为表格头部组。
- **`flex`**：元素会显示为弹性盒子容器。
- **`inline-flex`**：元素会显示为行内弹性盒子容器。
- **`grid`**：元素会显示为网格容器。
- **`inline-grid`**：元素会显示为行内网格容器。
- **`ruby`**：元素会显示为对齐文本。
- **`contents`**：元素的子元素会被当作父元素的子元素处理。

## 参考答案

display 属性可以设置元素的内部和外部显示类型。

* 元素的外部显示类型将决定该元素在流式布局中的表现（块级或内联元素）；
* 元素的内部显示类型可以控制其子元素的布局（例如：flow layout，grid 或 flex）。

以下是一些关于display比较常用的属性值：

| 值 | 描述 |
|--|--|
|none|元素不会显示|
|block|此元素将显示为块级元素，此元素前后会带有换行符。|
|inline|默认。此元素会被显示为内联元素，元素前后没有换行符。|
|inline-block|行内块元素。（CSS2.1 新增的值）[IE6/7不支持]|
|inline-table|此元素会作为内联表格来显示（类似 table），表格前后没有换行符。|
|table|此元素会作为块级表格来显示（类似 table），表格前后带有换行符。|
|inherit|规定应该从父元素继承 display 属性的值。|
|grid|网格布局（Grid）是最强大的CSS 布局方案。 它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。 |
|flex|弹性布局，用来为盒状模型提供最大的灵活性。|

从大的分类来讲，`display`的`32`种写法可以分为`6`个大类，再加上`1`个全局类，一共是`7`大类：

*   [外部值](#外部值)
*   [内部值](#内部值)
*   [列表值](#列表值)
*   [属性值](#属性值)
*   [显示值](#显示值)
*   [混合值](#混合值)
*   [全局值](#全局值)

## 外部值

所谓外部值，就是说这些值只会直接影响一个元素的外部表现，而不影响元素里面的儿子级孙子级元素的表现。

### display: block

这个值大家不陌生，我们最熟悉的`<div>`缺省就是这个值，最基本的块级元素，属于`css`入门初学者都知道的概念，只要是容器类型的元素基本都是这个值。除`<div>`之外，还有`<h1>`到`<h6>`，`<p>`，`<form>`，`<header>`，`<footer>`，`<section>`，`<article>`天生都是这个值。

### display: inline

这个值大家也不陌生，行内元素嘛，只要是个行内元素都是这个值，最典型的是`<span>`，还有`<a>`，`<img>`，以及古代`html`语言当中的`<b>`，`<i>`都属于这一类型。

### display: run-in

这个值有点奇怪，通常没人用它，但你可以知道它。因为除了`IE`和`Opera`支持它以外，其他所有主流浏览器包括`Chrome`, `Safari`, `Firefox`全都对它置若罔闻。这东西说白了也没什么神秘，它的意思就是说如果我们命令一个元素`run-in`，中文意思就是『`闯入`』！那么这个元素就直接闯入下一行。比如说这样：

![image.png](https://static.ecool.fun//article/2cbc365c-776e-4a81-86ec-702b74ef25d2.png)

写起来大概就是这样：

```html
<div class="b">bbb</div>
```
.a {
  font-size: 36px;
  display: run-in;
}
```

## 内部值

谈完了外部值，我们来看看内部值。这一组值比较有意思了，在`css3`如火如荼的今天，你要玩不转这些值，怕是哪儿也找不到工作的。内部值主要是用来管束自己下属的儿子级元素的排布的，规定它们或者排成`S`形，或者排成`B`形这样的。

### display: flow

含义不清，实验室阶段产品，`Chrome`不支持。如果还不够说服你暂时不要碰它的话，试着理解以下英文原文：

> If its outer display type is inline or run-in, and it is participating in a block or inline formatting context, then it generates an inline box. Otherwise it generates a block container box.

### display: flow-root

不同于刚才谈到的`flow`，现在用`flow-root`的渐渐多起来了，因为它可以撑起被你`float`掉的块级元素的高度。外容器本来是有高度的，就像这样：

![image.png](https://static.ecool.fun//article/bd08aa59-0327-44c7-be00-25fdd7de8062.png)

```html
  <div class="item"></div>
  Example one
</div>
```
.container {
  border: 2px solid #3bc9db;
  border-radius: 5px;
  background-color: #e3fafc;
  width: 400px;
  padding: 5px;
}
.item {
  height: 100px;
  width: 100px;
  background-color: #1098ad;
  border: 1px solid #0b7285;
  border-radius: 5px;
}
```

![image.png](https://static.ecool.fun//article/9245b61d-9640-4541-af54-4e06977b0adc.png)

现在我们给`.container`加上`display: flow-root;`再看一下：

![image.png](https://static.ecool.fun//article/42f5d8fd-bdcf-44d7-94ac-5ace2d751cfa.png)

喏，外容器高度又回来了，这效果是不是杠杠的？

可能就有同学要说了，我们用`clear: both;`不是一样可以达到这效果吗？

```css
  content: '';
  clear: both;
  display: table;
}
```

### display: table

这一个属性，以及下面的另外`8`个与`table`相关的属性，都是用来控制如何把`div`显示成`table`样式的，因为我们不喜欢`<table>`这个标签嘛，所以我们想把所有的`<table>`标签都换成`<div>`标签。`<div>`有什么好？无非就是能自动换行而已，但其实你完全可以做一个`<table><tr><td>`标签，把它全都替换成`display: block;`也可以自动折行，只不过略微麻烦而已。

关于`display: table;`的详细用法，大家可以参考mdn上的文章，这里就不细说了。

### display: flex

敲黑板，划重点！作为新一代的前端工程师，这个属性你必须烂熟于胸中。`display: flex;`以及与它相关联的一系列属性：`flex-direction`, `flex-wrap`, `flex-flow`, `justify-content`, `align-items`, `align-content`，并且包括所有这些属性的取值，都是你需要反复研磨的。`2009`年诞生的这个属性可以说是不亚于`css`界一场蒸汽机诞生一样的工业革命，它的诞生标志着马车一样的`float`被彻底抛进历史的垃圾堆。

没有一张图能完整地展现`flex`的神韵，就放这张我比较喜欢的图片吧：

![image.png](https://static.ecool.fun//article/7e891f54-161f-41af-add8-764106a90829.png)

### display: grid

会`flex`很吊吗？会`grid`更吊哦！也许这就是下次前端面试的重点哦！

![image.png](https://static.ecool.fun//article/e8c17847-dc43-4584-a556-f54538e6e9d2.png)

`grid`布局，中文翻译为`网格布局`。学习`grid`布局有两个重点：一个重点是`grid`布局引入了一个全新的单位：`fr`，它是`fraction`（`分数`）的缩写，所以从此以后，你的兵器库里除了`px`, `em`, `rem`, `百分比`这些常见兵器以及`vw`, `vh`这些新式武器之外，又多了一样旁门暗器`fr`，要想用好`grid`，必须充分掌握`fr`。另一个重点是`斜杠操作符`，这可不是`分数`哦。它表示的是`起始位置`和`结束位置`。比如说`3 / 4`，这可不是`四分之三`的意思，这是指一个元素从第`3`行开始，到第`4`行结束，但又不包括第`4`行。

同样，与`grid`相关联的也有一大堆旁门属性，是在学习`display: grid;`的同时必须掌握的。包括`grid`, `grid-column-start`, `grid-column-end`, `grid-row-start`, `grid-row-end`, `grid-template`, `grid-template-columns`, `grid-template-rows`, `grid-template-areas`, `grid-gap`, `grid-column-gap`, `grid-row-gap`, `grid-auto-columns`, `grid-auto-rows`, `grid-auto-flow`, `grid-column`, `grid-row`。不能详述，关于这个写起来又是一大篇文章。详情还是参考 csstrick 上[这篇文章](https://css-tricks.com/snippets/css/complete-guide-grid/)，讲得非常细致非常清楚。

### display: ruby

`ruby`这个取值对于我们亚洲人来说其实是非常有用的一个东西，但是目前除了`Firefox`以外其它浏览器对它的支持都不太好。简而言之，`display: ruby;`的作用就是可以做出下面这样的东西：

![image.png](https://static.ecool.fun//article/035fde95-407c-4109-84e3-332f4a9220c3.png)

很好的东西，对吧？如果可以用的话，对我国的小学教育可以有极大的促进。但可惜我们现在暂时还用不了。

`ruby`这个词在英语里的意思是`红宝石`，但在日语里是`ルビ`，翻译成中文是`旁注标记`的意思，我们中文的旁注标记就是汉语拼音。可以想见，这个标准的制定者肯定是日本人，如果是我们中国人的话，那这个标签就不是`ruby`，而是`pinyin`了。还有一个`ruby`语言，发明者也是一个日本人，和`html`里这个`ruby`是两码事，不要搞混了。

`ruby`的语法大致如下：

![image.png](https://static.ecool.fun//article/65b43976-d8dd-43c3-964e-561d34a141b1.png)

### display: subgrid

`subgrid`总的思想是说大网格里还可以套小网格，互相不影响。但如果`grid`里可以再套`subgrid`的话，那我`subgrid`里还想再套`subgrid`怎么办？`subsubgrid`吗？况且，到底是`grid: subgrid;`还是`display: subgrid;`这个也没有达成共识。

## 列表值

### display: list-item

`display: list-item;`和`display: table;`一样，也是一帮痛恨各种`html`标签，而希望只使用`<div>`来写遍一切`html`的家伙搞出来的鬼东西，实际使用极少，效果就是这样：

![image.png](https://static.ecool.fun//article/b3a1c0ba-7e65-4c5f-b040-b7a091725b4c.png)

看，你用`<ul><li>`能实现的效果，他可以用`<div>`实现出来，就是这个作用。

## 属性值

属性值一般是附属于主值的，比如主值里设置了`display: table;`，就可以在子元素里使用`display: table-row-group;`等等属性，不过并不绝对。关于它们的作用，主要参考主值就够了。

### display: table-row-group

详情参考[display: table;](#display-table)。

### display: table-header-group

详情参考[display: table;](#display-table)。

### display: table-footer-group

详情参考[display: table;](#display-table)。

### display: table-row

详情参考[display: table;](#display-table)。

### display: table-cell

详情参考[display: table;](#display-table)。这个属性有必要详细说说，因为它完全可以单独应用，用在高度不固定元素的垂直居中上。效果如下图所示：

![image.png](https://static.ecool.fun//article/98de9407-e6be-4ec1-8b2e-6f2eb207bb30.png)

### display: table-column-group

详情参考[display: table;](#display-table)。

### display: table-column

详情参考[display: table;](#display-table)。

### display: table-caption

详情参考[display: table;](#display-table)。

### display: ruby-base

详情参考[display: ruby;](#display-ruby)。

### display: ruby-text

详情参考[display: ruby;](#display-ruby)。

### display: ruby-base-container

详情参考[display: ruby;](#display-ruby)。

### display: ruby-text-container

详情参考[display: ruby;](#display-ruby)。

## 显示值

`MDN`里把它叫做`<display-box> values`（`盒子值`），我把它叫做`显示值`，主要是为了便于理解。

### display: contents

![image.png](https://static.ecool.fun//article/b723d2a2-a13b-4cc4-bab7-8290d832a30b.png)

你给中间那个`div`加上`display: contents;`之后，它就变成这样了：

![image.png](https://static.ecool.fun//article/c6fcbe0c-ede3-4808-8505-b5af9d46cd51.png)

这就是`display: contents;`的作用，它让子元素拥有和父元素一样的布局方式，仅此而已。

### display: none

这么著名的值还用多说吗？

## 混合值

### display: inline-block

关于`display: inline-block;`的作用恐怕只要做过`3`天以上前端的工程师都应该知道。什么也不说了，上一张著名的图片作总结吧：

![image.png](https://static.ecool.fun//article/9581c1ef-bfda-46cd-9398-c7cf925eff8d.png)

### display: inline-table

你要能理解`inline-block`，你就能理解`inline-table`。在行内显示一个表格，就像这样：

![image.png](https://static.ecool.fun//article/80a56bc7-7d12-46d6-a629-a5cd7436b760.png)

### display: inline-flex

这个就不用多说了吧？跟上面一样，在行内进行弹性布局，参考[display: flex;](#display-flex)。

### display: inline-grid

同上，在行内进行网格布局，参考[display: grid;](#display-grid)。

## 全局值

这些值不是`display`属性的专利，几乎其它任意属性都可以用，列在这里凑个数。

### display: inherit

继承父元素的`display`属性。

### display: initial

不管父元素怎么设定，恢复到浏览器最初始时的`display`属性。

### display: unset

`unset`混合了`inherit`和`initial`。如果父元素设值了，就用父元素的设定，如果父元素没设值，就用浏览器的缺省设定。直接看图最明白：

![image.png](https://static.ecool.fun//article/4b1deb11-c35e-476c-b1e1-4eb9f0a4b16d.png)

## 总结

以上就是在`css`里`display`的`32`种写法。谈了这么多，不知道你记住了多少呢？其实，单纯理解每一个`display`属性的取值都不难，难的是融会贯通，在恰当的地方运用恰当的值，毕竟我们的目的是为了把代码写短，而不是把代码写长。
