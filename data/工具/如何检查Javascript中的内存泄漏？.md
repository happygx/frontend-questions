---
level: 2
---

# 如何检查Javascript中的内存泄漏？

## 参考答案

## 浏览器

Chrome 浏览器查看内存占用，按照以下步骤操作。

![image.png](https://static.ecool.fun//article/b822300b-cf04-4c9f-9d88-06bd331726c0.png)

```
2、在顶部的Capture字段里面勾选 Memory
3、点击左上角的录制按钮。
4、在页面上进行各种操作，模拟用户的使用情况。
5、一段时间后，点击对话框的 stop 按钮，面板上就会显示这段时间的内存占用情况。
```

![image.png](https://static.ecool.fun//article/5b616638-2dbc-49a7-9bde-97271ec206b1.png)

反之，就是内存泄漏了。

![image.png](https://static.ecool.fun//article/a05a6942-5cbe-42c8-a213-9122a9a851db.png)

## 命令行

命令行可以使用 Node 提供的process.memoryUsage方法。

```js
// { rss: 27709440,
//  heapTotal: 5685248,
//  heapUsed: 3449392,
//  external: 8772 }
```

![image.png](https://static.ecool.fun//article/518da811-c80c-4bc2-a4d6-ba02bf8c508b.png)

```
heapTotal："堆"占用的内存，包括用到的和没用到的。
heapUsed：用到的堆的部分。
external： V8 引擎内部的 C++ 对象占用的内存。
```
