---
level: 2
---

# 刷新浏览器后，Vuex的数据是否存在？如何解决？

## 题目要点

在 Vue 项目中使用 Vuex 进行全局状态管理时，如果页面刷新，保存在 Vuex 实例 `store` 里的数据会丢失，因为这些数据是保存在运行内存中的。为了解决这个问题，有几种方法可以考虑：

1. **使用 `vuex-along`**：
   - `vuex-along` 是一个插件，它可以将 Vuex 中的数据存放到 `localStorage` 或者 `sessionStorage` 中。
   - 在 `store/index.js` 文件中配置 `vuex-along`，指定存储的名称和是否使用 `localStorage` 或 `sessionStorage`。
   - 使用 `vuex-along` 后，你仍然可以使用 Vuex 的读取数据方式来操作，插件会自动处理数据的存储和恢复。

2. **使用 `localStorage` 或者 `sessionStorage`**：
   - 在 Vue 组件的 `created` 钩子中，读取 `sessionStorage` 中的状态信息，并将其合并到 Vuex 的状态中。
   - 在页面刷新前，将 Vuex 的状态保存到 `sessionStorage` 中。
   - 通过监听 `beforeunload` 事件，在页面即将卸载时保存状态，并在页面加载时读取状态。

## 参考答案

在vue项目中用vuex来做全局的状态管理， 发现当刷新网页后，保存在vuex实例store里的数据会丢失。

原因：因为 `store` 里的数据是保存在运行内存中的，当页面刷新时，页面会重新加载vue实例，store里面的数据就会被重新赋值初始化。

我们有两种方法解决该问题：

1. 使用 `vuex-along`
2. 使用 `localStorage` 或者 `sessionStroage`

## 使用vuex-along

`vuex-along` 的实质也是将 `vuex` 中的数据存放到 `localStorage` 或者 `sessionStroage` 中，只不过这个存取过程组件会帮我们完成，我们只需要用vuex的读取数据方式操作就可以了，简单介绍一下 `vuex-along` 的使用方法。

安装 `vuex-along`:

> npm install vuex-along --save

配置 `vuex-along`: 在 `store/index.js` 中最后添加以下代码:

```js
export default new Vuex.Store({
    //modules: {
        //controler  //模块化vuex
    //},
    plugins: [VueXAlong({
        name: 'store',     //存放在localStroage或者sessionStroage 中的名字
        local: false,      //是否存放在local中  false 不存放 如果存放按照下面session的配置
        session: { list: [], isFilter: true } //如果值不为false 那么可以传递对象 其中 当isFilter设置为true时， list 数组中的值就会被过滤调,这些值不会存放在seesion或者local中
    })]
});
```

```js
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
},
```
