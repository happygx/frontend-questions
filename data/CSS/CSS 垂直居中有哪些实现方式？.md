---
level: 2.5
---

# CSS 垂直居中有哪些实现方式？

## 参考答案

我们在布局一个页面时，通常都会用到水平居中和垂直居中，处理水平居中很好处理，不外乎就是设定margin:0 auto;或是text-align:center;,就可以轻松解决掉水平居中的问题，但一直以来最麻烦对齐问题就是「垂直居中」，以下将介绍几种单纯利用CSS垂直居中的方式，只需要理解背后的原理就可以轻松应用。

下面为公共代码：

```html
    <div class="small">small</div>
</div>
```
.box {
    width: 300px;
    height: 300px;
    background: #ddd;
}
.small {
    background: red;
}

```

方法一：

```css
    position: relative;
}
.small {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -50px 0 0 -50px;
    width: 100px;
    height: 100px;
}
```

```css
    position: relative;
}
.small {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 100px;
    height: 100px;
}
```

```css
    position: relative;
}
.small {
    position: absolute;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    width: 100px;
    height: 100px;
}
```

```css
    position: relative;
}
.small {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%,-50%,0);
    width: 100px;
    height: 100px;
}

```

```css
    line-height: 300px;
    text-align: center;
    font-size: 0px;
}
.small {
    padding: 6px 10px;
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
    line-height: 16px;
}
```

```
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.small {
    padding: 6px 10px;
    display: inline-block;
}
```

方法一：

```css
    display: flex;
    justify-content: center;
    align-items: center;
}
```

```css
    display: flex;
    justify-content: center;
}
.small {
    align-self: center;
}
```

网格布局（Grid）是最强大的 CSS 布局方案。

它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。以前，只能通过复杂的 CSS 框架达到的效果，现在浏览器内置了。

下面是4种使用grid实现水平垂直居中的例子。

方法一：

```css
    display: grid;
    justify-items: center;
    align-items: center;
}
```

```css
    display: grid;
}
.small {
    justify-self: center;
    align-self: center;
}
```

```css
    display: grid;
    justify-items: center;
}
.small {
    align-self: center;
}

```

```css
    display: grid;
    align-items: center;
}
.small {
    justify-self: center;
}
```
