---
level: 1
---

# JQuery中的$(​document).ready与window.onload有什么区别？

## 题目要点

#### $(document).ready() 和 $(window).load()

- **$(document).ready()**：在DOM结构绘制完毕后立即执行，不必等到所有资源（如图片、样式表等）加载完成。
- **$(window).load()**：在页面中所有元素（包括图片、CSS文件等）完全加载到浏览器后才执行。

#### 执行顺序

- **ready**：在DOM完全构建完成后执行，包括图片和样式表等资源的加载。
- **load**：在页面完全加载完成（包括所有资源）后执行。

#### 区别

1. **执行时间**：`load` 需要等待所有资源加载完毕，而 `ready` 在DOM构建完成后立即执行。
2. **编写个数**：`load` 只能编写一次，而 `ready` 可以编写多次且都能执行。
3. **简化写法**：`ready` 可以使用简写 `$(function(){})` 或 `$().ready(function(){})`。
4. **执行效率**：在某些情况下（如添加事件监听器），`ready` 比 `load` 更高效。

## 参考答案

## 定义

再说两者之前先简单说明一下window与document的区别：

* window  
   1. window对象表示浏览器中打开的窗口。  
   2. window对象可以省略，如:`window.console.log()`等价于`console.log()`
* document  
   1. document对象是window对象的一部分,如：`document.body` 等价于 `window.document.body`  
   2. 浏览器的html文档成为document对象

### $(document).ready()

从字面的意思上理解，就是文档准备好了，也就是浏览器已经加载并解析完整个html文档，DOM树已经建立起来了,然后执行此函数。

原生的JavaScript写法如下：

```
 alert("ready"); 
}

```

```
 alert("ready");
});
//或者简写为
$(function(){
 alert("ready");
});

```

在网页中所有元素(包括页面中图片、css文件等所有关联文件)完全加载到浏览器后才执行。

原生JavaScript中的写法如下

```
 alert("onload"); 
};

```

```
 alert("onload");
});

```

先来看一下DOM文档加载的步骤：

```
    2.加载外部脚本和样式表文件
    3.解析并执行脚本代码
    4.构造HTML DOM模型 //ready
    5.加载图片等外部文件
    6.页面加载完毕 //load

```

## 两者区别

### 1.执行时间

* `$(window).load()`必须等到页面内包括图片的所有元素加载完毕后才能执行（比如图片和媒体资源，它们的加载速度远慢于DOM的加载速度）加载完成之后才执行。
* `$(document).ready()`是DOM结构绘制完毕后就执行，不必等到加载完毕。但这并不代表页面的所有数据已经全部加载完成，一些大的图片有会在建立DOM树之后很长一段时间才行加载完成

以浏览器装载文档为例，在页面加载完毕后，浏览器会通过 Javascript为DOM元素添加事件。在常规的Javascript 代码中，通常使用 window.onload 方法，而在 Jquery 中，使用的是 `$(document).ready()` 方法。 `$(document).ready()`方法是事件模块中最重要一个函数，可以极大的提高 Web 应用程序的速度。

### 2.编写个数不同

* `$(window).load`不能同时编写多个，如果有多个`$(window).load()`，那么只有最后一个`$(window).load()`里面的函数或者代码才会执行，之前的`$(window).load()`都将被覆盖。
* `$(document).ready()`可以同时编写多个，并且都可以得到执行。

示例如下：

以下代码无法正确执行,结果只输出第二个,:

```
    alert(“text1”); 
}); 
$(window).load(function(){ 
    alert(“text2”); 
}); 

```

```
    alert(“Hello World”); 
}); 
$(document).ready(function(){ 
    alert(“Hello again”); 
}); 

```

* `$(window).load`没有简化写法
* `$(document).ready(function(){})`可以简写成`$(function(){})`或者`$().ready(function(){})`

### 4.执行的效率不同

* 如要在dom的元素节点中添加onclick属性节点，这时用`$(document).ready()`就要比用`$(window).load()`的效率高
* 但是在某些时候还必须得用`$(window).load()`才行，比如按钮图片出现后添加事件
