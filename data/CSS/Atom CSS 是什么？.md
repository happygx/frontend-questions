---
level: 2
---

#  Atom CSS 是什么？

## 参考答案

Atom CSS：原子CSS，意思是一个类只干一件事。

不同于大家常用的BEM这类规则，原子css就是拆分，所有 CSS 类都有一个唯一的 CSS 规则。例如如下

```css
  width:100%;
}
.h-full{
  height:100%;
}
```
```
  width:100%;
  height:100%;
}
```

```html
	<body>
    	<div id="app" class="w-full h-full">
        </div>
	</body>
</html>

```

* 优点
	* 减少了css体积，提高了css复用
	* 减少起名的复杂度
* 缺点
	* 增加了记忆成本。将css拆分为原子之后，你势必要记住一些class才能书写，哪怕tailwindcss提供了完善的工具链，你写background，也要记住开头是bg。
    * 增加了html结构的复杂性。当整个dom都是这样class名，势必会带来调试的麻烦，有的时候很难定位具体css问题
    * 你仍需要起class名。对于大部分属性而言，你可以只用到center,auto，100%，这些值，但是有时候你仍需要设定不一样的参数值，例如left，top，这时候你还需要起一个class名
