---
level: 2.5
---

# koa和express有哪些不同？

## 题目要点

**答题思路：**

koa和express作为Node.js平台上两个流行的Web开发框架，它们在多个方面存在不同。从以下几个方面对比阐述：

- 1. 启动方式

- 2. 中间件机制

- 3. 异步编程方式

- 4. 错误处理

- 5. 社区和文档

- 6. 设计理念

koa和express在启动方式、中间件机制、异步编程方式、错误处理、社区和文档以及设计理念等方面都存在明显的不同。开发者在选择框架时，应根据项目的具体需求和个人的技术栈来做出决策。

## 参考答案

## 框架介绍

express框架是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，主要基于 Connect 中间件，并且自身封装了路由、视图处理等功能。

koa是 Express 原班人马基于 ES6 新特性重新开发的框架，主要基于 co 中间件，框架自身不包含任何中间件，很多功能需要借助第三方中间件解决，但是由于其基于 ES6 generator 特性的异步流程控制，解决了 "callback hell" 和麻烦的错误处理问题。

## 相同点

两个框架都对http进行了封装。相关的api都差不多，同一批人所写。

## 不同点

express内置了许多中间件可供使用，而koa没有。

express包含路由，视图渲染等特性，而koa只有http模块。

express的中间件模型为线型，而koa的中间件模型为U型，也可称为洋葱模型构造中间件。

express通过回调实现异步函数，在多个回调、多个中间件中写起来容易逻辑混乱。

```js
app.get('/test', function (req, res) {
    fs.readFile('/file1', function (err, data) {
        if (err) {
            res.status(500).send('read file1 error');
        }
        fs.readFile('/file2', function (err, data) {
            if (err) {
                res.status(500).send('read file2 error');
            }
            res.type('text/plain');
            res.send(data);
        });
    });
});

```

```js
    await next();
    var data = await doReadFile();
    ctx.response.type = 'text/plain';
    ctx.response.body = data;
});

```

**Express**  
 优点：线性逻辑，通过中间件形式把业务逻辑细分、简化，一个请求进来经过一系列中间件处理后再响应给用户，清晰明了。   
缺点：基于 callback 组合业务逻辑，业务逻辑复杂时嵌套过多，异常捕获困难。

  
**Koa**  
 优点：首先，借助 co 和 generator，很好地解决了异步流程控制和异常捕获问题。其次，Koa 把 Express 中内置的 router、view 等功能都移除了，使得框架本身更轻量。   
缺点：社区相对较小。
