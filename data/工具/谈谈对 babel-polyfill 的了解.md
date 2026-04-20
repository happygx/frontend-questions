---
level: 3
---

# 谈谈对 babel-polyfill 的了解

## 题目要点

- **`babel-polyfill`**：是用于向 JavaScript 环境添加缺失特性的库，特别是在旧版浏览器中提供现代特性支持。
- **`core-js` 和 `regenerator-runtime`**：从 Babel 7.4 开始，推荐使用这两个库来替代 `babel-polyfill`。
- **兼容性**：通过 polyfill，可以让现代 JavaScript 代码在旧版浏览器中运行，避免兼容性问题。

## 参考答案

babel polyfill 有三种：

* babel-polyfill
* babel-runtime
* babel-plugin-transform-runtime

## babel-polyfill

babel-polyfill通过向全局对象和内置对象的prototype上添加方法来实现的。所以这会造成全局空间污染。

babel-polyfill使用的两种方式：

* webpack.config.js 中：

配置webpack.config.js里的entry设置为entry: ['babel-polyfill',path.join(__dirname, 'index.js')]

* 业务 js 中：

在webpack.config.js配置的主入口index.js文件的最顶层键入

```js
```

两则相差大概81.6倍。原因是webpack把babel-polyfill整体全部都打包进去了。而babel-polyfill肯定也实现了所有ES6新API的垫片,文件一定不会小。

那么有没有一种办法,根据实际代码中用到的ES6新增API ,来使用对应的垫片,而不是全部加载进去呢?

是的，有的。那就是 `babel-runtime & babel-plugin-transform-runtime`，他们可以实现按需加载。

## babel-runtime

简单说 babel-runtime 更像是一种按需加载的实现，比如你哪里需要使用 Promise，只要在这个文件头部

```js
```

不过如果你许多文件都要使用 Promise，难道每个文件都要 import 一下吗？当然不是，Babel 官方已考虑这种情况，只需要使用 babel-plugin-transform-runtime 就可以解决手动 import 的苦恼了。

## babel-plugin-transform-runtime

babel-plugin-transform-runtime 装了就不需要装 babel-runtime了，因为前者依赖后者。
总的来说，babel-plugin-transform-runtime 就是可以在我们使用新 API 时 自动 import babel-runtime 里面的 polyfill，具体插件做了以下三件事情：

* 当我们使用 async/await 时，自动引入 babel-runtime/regenerator
* 当我们使用 ES6 的静态事件或内置对象时，自动引入 babel-runtime/core-js
* 移除内联 babel helpers 并替换使用 babel-runtime/helpers  来替换

babel-plugin-transform-runtime 优点：

* 不会污染全局变量
* 多次使用只会打包一次
* 依赖统一按需引入,无重复引入,无多余引入
* 避免 babel 编译的工具函数在每个模块里重复出现，减小库和工具包的体积

使用方式：

在 .babelrc 中配置：

```
```
