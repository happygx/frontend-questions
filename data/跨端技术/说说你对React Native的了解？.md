---
level: 1
---

# 说说你对React Native的了解？

## 参考答案

`React Native` 是一个由 `Facebook` 于 2015 年 9 月发布的一款开源的 `JavaScript` 框架，它可以让开发者使用 JavaScript 和 React 来开发跨平台的移动应用。

它既保留了 React 的开发效率，又同时拥有 Native 应用的良好体验，加上 `Virtual DOM` 跨平台的优势，实现了真正意义上的：`Learn Once,Write Anywhere`.

## React Native的特点

* 跨平台

React Native 使用了 Virtual DOM(虚拟 DOM)，只需编写一套代码，便可以将代码打包成不同平台的 App，极大提高了开发效率，并且相对全部原生开发的应用来说，维护成本也相对更低。

* 上手快

相比于原生开发，JavaScript 学习成本低、语法灵活。允许让 Web 开发者更多地基于现有经验开发 App。React Native 只需使用 JavaScript 就能编写移动原生应用，它和 React 的设计理念是一样的，因此可以毫不夸张地说：你如果会写 React，就会写 React Native!

* 原生体验

由于 `React Native` 提供的组件是对原生 API 的暴露，虽然我们使用的是 `JavaScript` 语言编写的代码，但是实际上是调用了原生的 API 和原生的 UI 组件。因此，体验和性能足以媲美原生应用。

* 热更新

`React Native` 开发的应用支持热更新，因为 `React Native` 的产物是 `bundle` 文件，其实本质上就是 `JS` 代码，在 App 启动的时候就会去服务器上获取 `bundle` 文件，我们只需要更新 `bundle` 文件，从而使得 App 不需要重新前往商店下载包体就可以进行版本更新，开发者可以在用户无感知的情况下进行功能迭代或者 bug 修复。

但是值得注意的是，AppStore 禁止热更新的功能中有调用私有 API、篡改原生代码和改变 App 的行为。

## React Native 的不足

由于 `React Native` 和原生交互依赖的只有一个 `Bridge`，而且 JS 和 Native 交互是异步的，所以对需要和 `Native` 大量实时交互的功能可能会有性能上的不足，比如动画效率，性能是不如原生的。

`React Native` 始终是依赖原生的能力，所以摆脱不了对原生的依赖，相对 `Flutter` 的自己来画 UI 来说，`React Native` 显得有些尴尬。
