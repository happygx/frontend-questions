---
level: 2
---

# 相邻的两个inline-block节点为什么会出现间隔，该如何解决？

## 题目要点

### 相邻`inline-block`元素间距问题

相邻的两个`inline-block`元素之间出现间隔，通常是由于以下原因：

1. **空白字符**：HTML代码中元素间的空格或换行被浏览器解析为间距。
2. **解决方案**：

   - **删除空白字符**：确保HTML中没有多余的空格或换行。
   - **`font-size: 0`技巧**：

     ```css
     .parent {
       font-size: 0;
     }
     .child {
       font-size: 16px; /* 恢复子元素字体大小 */
     }
     ```

   - **使用`letter-spacing`或`word-spacing`**：

     ```css
     .inline-block {
       letter-spacing: -1px; /* 负值抵消间距 */
     }
     ```

   - **使用`margin`负值**：通过设置负`margin`来抵消间距。
   - **使用`text-align: justify`**：均匀分布`inline-block`元素。
   - **使用Flexbox**：更灵活地控制布局和间距。

### 面试重点考察

- 对CSS布局细节的理解。
- 解决实际开发中间距问题的能力。

## 参考答案

### 一、现象描述

真正意义上的inline-block水平呈现的元素间，换行显示或空格分隔的情况下会有间距，很简单的个例子：

```html
```

![image.png](https://static.ecool.fun//article/b1a50051-8bf5-4e14-9460-cbe4ff2ee78d.png)

我们使用CSS更改非inline-block水平元素为inline-block水平，也会有该问题：

```css
    display: inline-block;
    padding: .5em 1em;
    background-color: #cad5eb;
}
```
<div class="space">
    <a href="##">惆怅</a>
    <a href="##">淡定</a>
    <a href="##">热血</a>
</div>
```


这种表现是符合规范的应该有的表现。

元素被当成行内元素排版的时候，元素之间的空白符（空格、回车换行等）都会被浏览器处理，根据white-space的处理方式（默认是normal，合并多余空白），原来HTML代码中的回车换行被转成一个空白符，在字体不为0的情况下，空白符占据一定宽度，所以inline-block的元素之间就出现了空隙。这些元素之间的间距会随着字体的大小而变化，当行内元素font-size:16px时，间距为8px。

不过，这类间距有时会对我们布局，或是兼容性处理产生影响，以下展示N种方法去掉。

### 二、方法之移除空格

元素间留白间距出现的原因就是标签段之间的空格，因此，去掉HTML中的空格，自然间距就木有了。考虑到代码可读性，显然连成一行的写法是不可取的，我们可以：

```html
    <a href="##">
    惆怅</a><a href="##">
    淡定</a><a href="##">
    热血</a>
</div>
```

```html
    <a href="##">惆怅</a
    ><a href="##">淡定</a
    ><a href="##">热血</a>
</div>
```

```html
    <a href="##">惆怅</a><!--
    --><a href="##">淡定</a><!--
    --><a href="##">热血</a>
</div>
```

### 三、使用margin负值

```css
    display: inline-block;
    margin-right: -3px;
}
```

![image.png](https://static.ecool.fun//article/4d07ee09-ad17-41a8-9dd6-01eab25e0e8a.png)

例如，对于12像素大小的上下文，Arial字体的`margin`负值为`-3`像素，Tahoma和Verdana就是`-4`像素，而Geneva为`-6`像素。

由于外部环境的不确定性，以及最后一个元素多出的父margin值等问题，这个方法不适合大规模使用。

### 四、让闭合标签吃胶囊

如下处理：

```html
    <a href="##">惆怅
    <a href="##">淡定
    <a href="##">热血</a>
</div>
```

在HTML5中，我们直接：

```html
    <a href="##">惆怅
    <a href="##">淡定
    <a href="##">热血
</div>
```

![image.png](https://static.ecool.fun//article/71ea9156-22a7-43a1-9a29-b04cd6ed9280.png)

### 五、使用font-size:0

类似下面的代码：

```css
    font-size: 0;
}
.space a {
    font-size: 12px;
}
```

### 六、使用letter-spacing

类似下面的代码：

```css
    letter-spacing: -3px;
}
.space a {
    letter-spacing: 0;
}
```

### 七、使用word-spacing

类似下面代码：

```css
    word-spacing: -6px;
}
.space a {
    word-spacing: 0;
}
```

与上面demo一样的效果，这里就不截图展示了。如果您使用Chrome浏览器，可能看到的是间距依旧存在。确实是有该问题，原因我是不清楚，不过我知道，可以添加`display: table;`或`display:inline-table;`让Chrome浏览器也变得乖巧。

```css
    display: inline-table;
    word-spacing: -6px;
}
```

下面展示的是YUI 3 CSS Grids 使用`letter-spacing`和`word-spacing`去除格栅单元见间隔方法（注意，其针对的是block水平的元素，因此对IE8-浏览器做了hack处理）：

```css
    letter-spacing: -0.31em; /* webkit */
    *letter-spacing: normal; /* IE < 8 重置 */
    word-spacing: -0.43em; /* IE < 8 && gecko */
}

.yui3-u {
    display: inline-block;
    zoom: 1; *display: inline; /* IE < 8: 伪造 inline-block */
    letter-spacing: normal;
    word-spacing: normal;
    vertical-align: top;
}
```

```css
    display:inline-block;
    background: orange;
    padding:10px;
    word-spacing:0;
    }
ul {
    width:100%;
    display:table;  /* 调教webkit*/
    word-spacing:-1em;
}

.nav li { *display:inline;}
```
