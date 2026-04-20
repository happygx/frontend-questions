---
level: 3
---

# async/await 和 Promise 有什么关系？

## 题目要点

`async/await` 是 JavaScript 的一种语法糖，它建立在 `Promise` 之上，用于简化异步代码的编写和阅读。

- **`Promise`** 是 JavaScript 中处理异步操作的基本机制。
- **`async/await`** 是基于 `Promise` 的语法糖，使异步代码更简洁、易读。
- `async/await` 使得异步代码的编写更像同步代码，提高了可读性，同时错误处理也变得更为直观。

## 参考答案

## Promise

> Promise 对象是一个代理对象（代理一个值），被代理的值在Promise对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的promise对象

## async/await

es2017的新语法，async/await就是generator + promise的语法糖

async/await 和 Promise 的关系非常的巧妙，await必须在async内使用，并装饰一个Promise对象，async返回的也是一个Promise对象。

async/await中的return/throw会代理自己返回的Promise的resolve/reject，而一个Promise的resolve/reject会使得await得到返回值或抛出异常。

* 如果方法内无await节点
	* return 一个字面量则会得到一个{PromiseStatus: resolved}的Promise。
	* throw 一个Error则会得到一个{PromiseStatus: rejected}的Promise。

* 如果方法内有await节点
	* async会返回一个{PromiseStatus: pending}的Promise（发生切换，异步等待Promise的执行结果）。
	* Promise的resolve会使得await的代码节点获得相应的返回结果，并继续向下执行。
	* Promise的reject 会使得await的代码节点自动抛出相应的异常，终止向下继续执行。
