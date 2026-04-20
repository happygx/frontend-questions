---
level: 3
---

# 页面加载的过程中，JS 文件是不是一定会阻塞 DOM 和 CSSOM 的构建？



## 题目要点

**作答思路：**

页面加载的过程中，JS文件不一定会阻塞DOM和CSSOM的构建。具体取决于以下几个因素：

1. **并行加载**：浏览器通常会并行加载多个资源，包括HTML、CSS和JavaScript文件。这意味着DOM和CSSOM的构建可以在加载JS文件的同时进行。
2. **异步加载**：如果JavaScript文件使用`async`或`defer`属性进行异步加载，那么它不会阻塞DOM和CSSOM的构建。`async`属性会使脚本在下载完成后立即执行，而`defer`属性会使脚本在HTML解析完成后执行。
3. **内联JavaScript**：如果JavaScript代码内联在HTML文档中，它会在DOM构建完成后立即执行，这可能会阻塞DOM的构建，但不会阻塞CSSOM的构建。
4. **阻塞行为**：如果JavaScript文件没有使用`async`或`defer`属性，或者使用了`<script>`标签的`type="text/javascript"`属性，它可能会阻塞DOM和CSSOM的构建，直到脚本加载并执行完毕。

**考察要点**：

1. **浏览器资源加载机制**：理解浏览器如何并行加载多个资源，包括HTML、CSS和JavaScript文件。
2. **异步加载**：了解如何使用`async`和`defer`属性来异步加载JavaScript文件，以及它们对DOM和CSSOM构建的影响。
3. **内联JavaScript的影响**：理解内联JavaScript如何影响DOM和CSSOM的构建。
4. **阻塞行为**：了解没有使用`async`或`defer`属性的JavaScript文件如何阻塞DOM和CSSOM的构建。

## 参考答案

答案：**不一定**

JavaScript阻塞DOM和CSSOM的构建的情况主要集中在以下两个方面：

* JavaScript文件被放置在head标签内部

当JavaScript文件被放置在head标签内部时，浏览器会先加载JavaScript文件并执行它，然后才会继续解析HTML文档。因此，如果JavaScript文件过大或服务器响应时间过长，就会导致页面一直处于等待状态，进而影响DOM和CSSOM的构建。

* JavaScript代码修改了DOM结构

在JavaScript代码执行时，如果对DOM结构进行了修改，那么浏览器需要重新计算布局（reflow）和重绘（repaint），这个过程会较为耗时，并且会阻塞DOM和CSSOM的构建。

除此之外，还有一些情况下JavaScript并不会阻塞DOM和CSSOM的构建：

* 通过设置 script 标签的 async 、defer 属性避免阻塞DOM和CSSOM的构建
	* **async**：异步加载JavaScript文件，脚本的下载和执行将与其他工作同时进行（例如从服务器请求其他资源、渲染页面等），而不必等到脚本下载完成才开始这些操作。因此，在使用 async 属性时，脚本的加载和执行是异步的，并且不保证脚本在页面中的顺序。
	* **defer属性** ：属性也告诉浏览器立即下载脚本文件，但有一个重要的区别：当文档解析时，脚本不会执行，直到文档解析完成后才执行。这意味着脚本将按照它们在页面上出现的顺序执行，并且在执行之前，整个文档已经被解析完毕了。
* Web Workers ：Web Workers 是一种运行在后台线程的JavaScript脚本，它不会阻塞DOM和CSSOM的构建，并且可以利用多核CPU提高JavaScript代码执行速度。

## 总结

在一定情况下，JavaScript的执行会阻塞DOM和CSSOM的构建。

但是，在实际应用中，我们可以通过设置 script 标签的 async、defer 属性、使用Web Workers等方式来避免这个问题。
