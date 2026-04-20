---
level: 3
---

# vue-loader做了哪些事情？

## 题目要点

vue-loader主要做了以下几件事：

1. **解析Vue单文件组件**：将`.vue`文件中的模板、脚本、样式分别处理，模板编译成渲染函数，脚本和样式转换成可执行的JavaScript和CSS。

2. **支持预处理器**：允许使用如Pug、SCSS等预处理器编写模板和样式，通过webpack配置相应loader来处理这些预处理器。

3. **开发环境优化**：提供热重载功能，让开发者在修改`.vue`文件时能实时预览效果，无需手动刷新。

4. **模块化组件**：封装Vue组件的模板、脚本、样式为一个文件，支持组件间的嵌套和组合，提升代码可维护性和重用性。

5. **动态加载**：支持异步加载组件，提高应用性能和加载速度。

## 参考答案

## vue-loader 的使用配置

使用 **vue-loader** 的之前， 我们需要安装一些必要的 **loader**。。

必需的 **loader** 包括：**vue-loader**、**vue-style-loader**、**vue-template-compiler**、**css-loader**。 可能需要的 **loader** 包含：**sass-loader**、**less-loader**、**url-loader** 等。

一个包含 **vue-loader** 的简单 **webpack配置** 如下：

```
const { VueLoaderPlugin } = require('vue-loader')
const isProduction = process.env.NODE_ENV === 'production'
const extractLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
        publicPath: '../',
        hmr: process.env.NODE_ENV === 'development'
    },
}
const cssExtractplugin = new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
    ignoreOrder: false
})
const webpackConfig = {
    entry: {...},
    output: {...},
    optimization: {...},
    resolve: {...},
    modules: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.css$/,
            oneOf: [{
                resourceQuery: /\?vue/,
                use: [isProduction ? extractLoader  : 'vue-style-loader', 'css-loader']
            }, {
                use: [isProduction ? extractLoader  : 'style-loader', 'css-loader']
            }]
        },
        ...
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        isProduction ? cssExtractplugin : ''
    ]
    
}


```

### vue-loader 工作原理

通过 **vue-loader**， **webpack** 可以将 **.vue 文件** 转化为 **浏览器可识别的javascript**。

**vue-loader** 的工作流程， 简单来说，分为以下几个步骤:

1. 将一个 **.vue 文件** 切割成 **template**、**script**、**styles** 三个部分。
2. **template 部分** 通过 **compile** 生成 **render**、 **staticRenderFns**。
3. 获取 **script 部分** 返回的配置项对象 **scriptExports**。
4. **styles 部分**，会通过 **css-loader**、**vue-style-loader**， 添加到 **head** 中， 或者通过 **css-loader**、**MiniCssExtractPlugin** 提取到一个 **公共的css文件** 中。
5. 使用 **vue-loader** 提供的 **normalizeComponent** 方法， **合并 scriptExports、render、staticRenderFns**， 返回 **构建vue组件需要的配置项对象 - options**， 即 **{data, props, methods, render, staticRenderFns...}**。

通过 **vue-loader** 生成的 **js 文件** 如下:

```
import { render, staticRenderFns } from "./App.vue?vue&type=template&id=7ba5bd90&scoped=true&"
// 从 script区域块 获取 组件的配置项对象
import script from "./App.vue?vue&type=script&lang=js&"
export * from "./App.vue?vue&type=script&lang=js&"
// 获取 styles区域块的内容
import style0 from "./App.vue?vue&type=style&index=0&lang=css&"
// 获取 styles(scoped)区域块的内容
import style1 from "./App.vue?vue&type=style&index=1&id=7ba5bd90&scoped=true&lang=css&"


/* normalize component */
import normalizer from "!../node_modules/_vue-loader@15.7.1@vue-loader/lib/runtime/componentNormalizer.js"
// 返回构建组件需要的配置项对象， 包含 data、props、render、staticRenderFns 等
var component = normalizer(
  script,
  render,
  staticRenderFns,
  false,
  null,
  "7ba5bd90",
  null
  
)

component.options.__file = "src/App.vue"
// 输出组件完整的配置项
export default component.exports

```

当 **.vue 文件** 中的 **style 标签** 有 **scoped** 属性时，它的 **css 样式** 只作用于当前 **组件** 中的 **元素**。

**css scoped** 的 **工作流程** 如下:

1. 使用 **vue-loader** 处理 **.vue** 文件， 根据 **.vue 文件** 的 **请求路径** 和 **文件内容**， 生成 **.vue 文件** 的 **hash** 值, 如：**7ba5bd90**；
2. 如果 **.vue 文件** 的 **某一个 style 标签** 有 **scoped** 属性， 为 **.vue 文件** 生成一个 **scopedId**，**scopedId** 的格式为 **data-v-hash**， 如：**data-v-7ba5bd90**；
3. 使用 **vue-loader** 从 **.vue 文件** 中获取 **style区域块(scoped)** 的 **样式内容(字符串)**；如果使用了 **less** 或者 **sass**， 要使用 **less-loader** 或者 **sass-loader** 处理 **样式内容**，使 **样式内容** 变为 **浏览器可识别的css样式**； 然后使用 **PostCSS** 提供的 **parser** 处理 **样式内容**， 为 **样式内容** 中的每一个 **css选择器** 添加 **\[data-v-hash\]**； 再使用 **css-loader**；最后使用 **style-loader** 把 **css 样式** 添加到 **head** 中或者通过 **miniCssExtractPlugin** 将 **css 样式** 提取一个公共的 **css** 文件中。
4. 通过 **normalizer** 方法返回 **完整的组件配置项 options**， **options** 中有属性 **\_scopeId**, 如 **\_scopedId: data-v-7ba5bd90**;
5. 使用 **组件配置项 options** 构建组件实例， 给 **组件** 中每一个 **dom元素** 添加属性: **data-v-hash**。

经历上述过程，**style(scoped)** 中的样式就变成了 **组件的私有样式**。

### 深度作用选择器

我们可以通过 **\>>>** 操作符， 在 **组件** 中修改 **子组件** 的 **私有样式**。

```
.hello {...}

// parent component 
<style scoped>
    .parant .hello {...}
    .parent >>> .hello {...}
</style>

// 进过 postCSS 处理以后的 css
.parent .hello[data-v-xxx] {...}  // 无法影响子组件

.parant[data-v-xxx] .hello {....} // 可影响子组件

```

**深度作用选择器， 必须在含有 scoped 属性 的 style 标签中使用，否则无效**。 这是因为 **\>>>、/deep/、::v-deep** 需要被 **postCSS** 解析才能起作用。 只有 **style 标签** 中有 **scoped 属性**， **样式内容** 才会被 **postCSS** 解析。

**postCSS** 解析样式内容的时候， 会给 **\>>**\> 操作符 **前面** 的 **css选择器** 添加 **\[data-v-hash\]**。

> 注意： **父组件** 中修改 **子组件** 的 **私有样式** 时， **父组件** 中的 **样式的优先级** 要大于 **子组件** 中的 **样式的优先级**， 否则会导致 **父组件中定义的样式不生效**。

### CSS Modules

我们也可以在 **.vue 文件** 的 **style 标签** 上添加 **module 属性**， 使得 **style 标签** 中的 **样式** 变为 **组件私有**，具体使用方法详见 - [官网](https://vue-loader.vuejs.org/zh/guide/css-modules.html#%E7%94%A8%E6%B3%95)。

**css modules** 和 **css scoped** 都可以使 **样式** 变为 **组件私有**，但是 **原理** 不一样。

**css scoped** 的实质是利用 **css属性选择器** 使得 **样式** 称为 **局部样式**，而 **css modules** 的实质是让 **样式的类名、id名唯一** 使得 **样式** 称为 **局部样式**。

**css modules** 的 **工作流程** 如下:

1. 使用 **vue-loader** 处理 **.vue** 文件， 将 **.vue 文件内容** 转化为 **js 代码**。 如果 **.vue 文件** 中的 **style 标签** 中有 **module** 属性， 向 **js 代码** 中注入一个 **injectStyle** 方法， 如下：  
```
import script from "./App.vue?vue&type=script&lang=js&"  
export * from "./App.vue?vue&type=script&lang=js&"  
import style0 from "./App.vue?vue&type=style&index=0&module=a&lang=css&"  
import style1 from "./App.vue?vue&type=style&index=1&id=3512ffa2&module=true&scoped=true&lang=css&"  
// 通过injectStyle方法， 会向vue实例中添加属性  
function injectStyles (context) {  
    // 对应 <style module="a">...</style>  
    // 给vue实例添加属性a， 对应的值为使用css-loader处理样式内容以后返回的对象  
    this["a"] = (style0.locals || style0)  
    // 对应 <style module>...</style>  
    // 给vue实例添加属性$style, 对应的值为使用css-loader处理样式内容以后返回的对象  
    this["$style"] = (style1.locals || style1)  
}  
/* normalize component */  
import normalizer from "!../node_modules/_vue-loader@15.7.1@vue-loader/lib/runtime/componentNormalizer.js"  
// normalize 会返回一个组件完整配置项对象  
// 在执行过程中， 会将render方法重新包装成 renderWithStyleInjection 方法  
// 执行 renderWithStyleInjection 方法时的时候， 先执行 injectStyles 方法， 再执行 原来的render 方法  
var component = normalizer(  
  script,  
  render,  
  staticRenderFns,  
  false,  
  injectStyles,  
  "3512ffa2",  
  null  
    
)  
export default component.exports"  
```
```
// Module  
exports.push([module.id, "\n#_3cl756BP8kssTYTEsON-Ao {\n  font-family: 'Avenir', Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-align: center;\n  color: #2c3e50;\n  margin-top: 60px;\n}\n._3IbrnaW__7RJMXk4rh9tW- {\n  background-color: blue;\n}\n", ""]);  
// Exports  
exports.locals = {  
    // app是id名  
	"app": "_3cl756BP8kssTYTEsON-Ao",  
	// class 是 类名  
	"class1": "_3IbrnaW__7RJMXk4rh9tW-"  
}  
```
在执行 **步骤1** 的代码时，会执行上面的代码， 返回一个 **对象**， 即 **步骤一** 中的 **style0** 、**style1**， 格式如下:  
```
// 或者被 miniCssExtractPlugin 提取到一个 公共的css文件 中  
style0 = [[css模块 id, css样式内容字符串, ''], ...]  
style0.locals = {  
    "app": "_3cl756BP8kssTYTEsON-Ao",  
	"class1": "_3IbrnaW__7RJMXk4rh9tW-"  
}  
```
构建 **vue 实例** 时，执行 **renderWithStyleInjection** 方法， 此时会 **先** 执行 **injectStyles** 方法，给 **vue 实例** 添加 **$style**、**a** 属性，属性值为 **stlye0.locals**、**style1.locals**， 再执行原来的 **render** 方法。  
这样， 我们就可以通过 **vue 实例** 的 **$styl**e、**a** 属性访问 **样式** 的 **类名**、**id**名。

### 热更新

**开发模式** 下，当使用 **vue-loader**、 **vue-style-loader** 处理 **.vue 文件** 的时候， 会向 **生成的js代码** 中注入与 **热更新** 相关的代码逻辑。 当我们修改 **.vue 文件** 时， **dev-server** 会通知 **浏览器** 进行 **热更新**。

**.vue 文件** 的 **各个区域块(template、script、styles)** 对应的 **热更新逻辑** 都不一样。

* #### template & script  
**vue-loader** 会在 **打包代码** 中注入 **热更新 template、script 区域块** 的代码，如下:  
```
import { render, staticRenderFns } from "./App.vue?vue&type=template&id=7ba5bd90&scoped=true&"  
// 从 script区域块 获取 组件的配置项对象  
import script from "./App.vue?vue&type=script&lang=js&"  
export * from "./App.vue?vue&type=script&lang=js&"  
// 获取 styles区域块的内容  
import style0 from "./App.vue?vue&type=style&index=0&lang=css&"  
// 获取 styles(scoped)区域块的内容  
import style1 from "./App.vue?vue&type=style&index=1&id=7ba5bd90&scoped=true&lang=css&"  
/* normalize component */  
import normalizer from "!../node_modules/_vue-loader@15.7.1@vue-loader/lib/runtime/componentNormalizer.js"  
// 返回构建组件需要的配置项对象， 包含 data、props、render、staticRenderFns 等  
var component = normalizer(  
  script,  
  render,  
  staticRenderFns,  
  false,  
  null,  
  "7ba5bd90",  
  null  
    
)  
/* hot reload */  
// .vue 文件的 script 区域块更改时， 客户端执行这一段代码  
if (module.hot) {  
  var api = require("D:\\study\\demo\\webpack\\webpack-4-demo\\node_modules\\_vue-hot-reload-api@2.3.3@vue-hot-reload-api\\dist\\index.js")  
  api.install(require('vue'))  
  if (api.compatible) {  
    module.hot.accept()  
    if (!api.isRecorded('7ba5bd90')) {  
      api.createRecord('7ba5bd90', component.options)  
    } else {  
      // 执行 reload 方法， 触发更新  
      // 使用 新的 options 替换原来的 options  
      api.reload('7ba5bd90', component.options)  
    }  
    module.hot.accept("./App.vue?vue&type=template&id=7ba5bd90&scoped=true&", function () {  
      // 当 .vue 文件的 template 区域块更改时， 客户端执行这一段代码  
      // 使用新的 render、staticRenderFns 更新原来的render、staticRenderFns  
      api.rerender('7ba5bd90', {  
        render: render,  
        staticRenderFns: staticRenderFns  
      })  
    })  
  }  
}  
component.options.__file = "src/App.vue"  
// 输出组件完整的配置项  
export default component.exports  
```
   1. **服务端** 通过 **websocket 连接** 通知 **客户端** 更新；  
   2. **客户端** 通过 **动态添加script元素** 的方式获取 **更新以后的打包文件**；  
   3. **安装打包文件**，即执行 **新的打包文件** 中的 **js 代码**， 使用 **打包文件中的 module 更新浏览器缓存的同名 module**；  
   4. **重新安装组件对应的 module**， 即 **重新执行组件对应的js代码**， 获取 **render**、**staticRenderFns** 和 新的 **scriptExports**， 重新生成 **组件** 对应的 **完整配置项**；  
   5. 执行 **api** 提供的 **reload** 方法， **更新组件**。  
   在 **reload** 方法中，会通过执行 **父组件实例** 的 **$forceUpdate** 方法来 **更新组件**。  
   更新组件的时候， 由于**组件** 的 **配置项(data、props、methods等属性)** 发生变化， 需要为 **组件** 生成 **新的构造函数 VueComponent**， 然后使用 **新的构造函数**，构建 **新的组件实例**。  
   即， 每次修改 **.vue 文件** 的 **script** 部分， 都会为 **组件** 生成一个 **新的实例对象**， **销毁旧的实例对象**。  
如果我们只修改了 **.vue 文件** 的 **template** 部分, **客户端(即浏览器)** 会进行 **热更新**， 过程如下：  
   1. **同上**，**服务端** 通过 **websocket 连接** 通知 **客户端** 更新；  
   2. **同上**， **客户端** 通过 **动态添加script元素** 的方式获取 **更新以后的打包文件**；  
   3. **同上**， **安装打包文件**，即执行 **新的打包文件** 中的 **js 代码**， 使用 **打包文件中的 module 更新浏览器缓存的同名 module**；  
   4. 触发通过 **module.hot.accept** 注册的 **callback**；  
   5. 执行 **api** 提供的 **rerender** 方法， **更新组件**。  
   执行 **rerender** 方法时， 会先获取 **修改以后的template区域块** 对应的 **render**、**staticRenderFns**， 然后 **更新原组件的 render、staticRenderFns**， 然后执行 **组件实例** 的 **$forceUpdate** 方法来更新 **组件(更新组件的时候， 会使用新的render方法， 生成新的vnode节点树)**。  
如果我们 **同时** 修改了 **.vue 文件**的 **template**、 **script**部分， 会按照上面 **第一种情况** 进行 **热更新**，并且不会触发上面代码中通过 **module.hot.accept** 注册的 **callback**。
* #### style  
**vue-style-loader** 会在 **打包代码** 中注入 **热更新 style区域块** 的代码， 如下:  
```
var add = require("!../node_modules/_vue-style-loader@4.1.2@vue-style-loader/lib/addStylesClient.js").default  
var update = add("05835b6f", content, false, {});  
// Hot Module Replacement  
if(module.hot) {  
 // When the styles change, update the <style> tags  
 if(!content.locals) {  
   module.hot.accept("!!../node_modules/_css-loader@3.1.0@css-loader/dist/cjs.js!../node_modules/_vue-loader@15.7.1@vue-loader/lib/loaders/stylePostLoader.js!../node_modules/_vue-loader@15.7.1@vue-loader/lib/index.js??vue-loader-options!./App.vue?vue&type=style&index=0&lang=css&", function() {  
     // 当 .vue 文件的 styles 区域块更改时， 客户端执行这一段代码  
     var newContent = require("!!../node_modules/_css-loader@3.1.0@css-loader/dist/cjs.js!../node_modules/_vue-loader@15.7.1@vue-loader/lib/loaders/stylePostLoader.js!../node_modules/_vue-loader@15.7.1@vue-loader/lib/index.js??vue-loader-options!./App.vue?vue&type=style&index=0&lang=css&");  
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];  
     // 执行update方法， 更新styles  
     update(newContent);  
   });  
 }  
}  
...  
```
   1. 同上，**服务端** 通过 **websocket 连接** 通知 **客户端** 更新；  
   2. 同上，**客户端** 通过 **动态添加script元素** 的方式获取 **更新以后的打包文件**；  
   3. 同上，**安装打包文件**，即执行 **新的打包文件** 中的 **js 代码**， 使用 **打包文件中的 module 更新浏览器缓存的同名 module**;  
   4. 触发通过 **module.hot.accept** 注册的 **callback**；  
   5. 执行 **update** 方法， **更新样式**。  
   **更新样式** 的时候， 会先 **移除原来的 style 标签**， 然后 **添加新的 style 标签**。  
如果 **style 标签** 上有 **module 属性**，除了 **vue-style-loader** 会注入 **热更新代码** 外，**vue-loader** 也会在 **打包代码** 中注入 **热更新代码**，如下:  
```
    module.hot && module.hot.accept(["./App.vue?vue&type=style&index=1&id=7ba5bd90&module=true&scoped=true&lang=css&"], function () {  
      // 当.vue的style区域块发生变化， 且style标签有module属性， 执行这一段逻辑  
      var oldLocals = cssModules["$style"]  
      if (oldLocals) {  
        // 获取新的唯一类名、id名  
        var newLocals = require("./App.vue?vue&type=style&index=1&id=7ba5bd90&module=true&scoped=true&lang=css&")  
        if (JSON.stringify(newLocals) !== JSON.stringify(oldLocals)) {  
          // 更新vue实例的$style属性  
          cssModules["$style"] = newLocals  
          // 执行vue实例的 $forceUpdate 方法，重新执行 render 方法  
          require("D:\\study\\demo\\webpack\\webpack-4-demo\\node_modules\\_vue-hot-reload-api@2.3.3@vue-hot-reload-api\\dist\\index.js").rerender("7ba5bd90")  
        }  
      }  
    })  
```
一个 **style 区域块** 对应一个 **style 标签**。修改某一个 **style 区域块** 之后，会更新对应的 **style 标签**。  
**style 区域块** 的 **热更新** 和 **template**、**script 区域块**的 **热更新** 互不影响。

### tree shaking 副作用

**生产模式** 下， **webpack** 默认启用 **tree shaking**。如果此时项目 **根目录** 中的 **package.json** 中的 **sideEffects** 的值为 **false**，且 **.vue 文件** 的 **style 标签** 没有 **module 属性**，使用 **vue-loader** 处理 **.vue 文件** 的时候， 会产生 **样式丢失** 的情况，即 **styles 区域块 不会添加到 head 中或者 被提取到公共的css文件中**。

首先，先看一下 **.vue 文件** 经过处理以后生成的 **js代码**， 如下:

```
import { render, staticRenderFns } from "./App.vue?vue&type=template&id=7ba5bd90&scoped=true&"
// 从 script区域块 获取 组件的配置项对象
import scriptExports from "./App.vue?vue&type=script&lang=js&"
export * from "./App.vue?vue&type=script&lang=js&"
// 获取 styles区域块的内容
import style0 from "./App.vue?vue&type=style&index=0&lang=css&"
// 获取 styles(scoped)区域块的内容
import style1 from "./App.vue?vue&type=style&index=1&id=7ba5bd90&scoped=true&lang=css&"


/* normalize component */
import normalizer from "!../node_modules/_vue-loader@15.7.1@vue-loader/lib/runtime/componentNormalizer.js"
// 返回构建组件需要的配置项对象， 包含 data、props、render、staticRenderFns 等
var component = normalizer(
  scriptExports,
  render,
  staticRenderFns,
  false,
  null,
  "7ba5bd90",
  null
  
)

component.options.__file = "src/App.vue"
// 输出组件完整的配置项
export default component.exports

```

**解决方法**:

1. 修改 **package.json** 文件中的 **sideEffects 属性**， 告诉 **webpack** **.vue 文件**在使用 **tree shaking** 的时候会有 **副作用**， 如下:  
```
    "*.vue"  
 ]  
```
但是这种解决方法有一个问题， 如果 **script 区域块** 中通过 **import** 的方式引入了 **未使用的模块**，**未使用的模块在最后打包代码的时候不会被删除**。
2. 通过 **rule.sideEffects** 指定 **具体的模块** 在使用 **tree shaking** 的时候会有 **副作用**， 如下:  
```
    {  
        test: /\.css$/,  
        oneOf: [{  
            resourceQuery: /\?vue/,  
            // 指定.vue文件的 style区域块 使用 tree shaking 时会有副作用  
            sideEffects: true,  
            use: [isProduction ? MiniCssExtractPlugin.loader  : 'vue-style-loader', 'css-loader']  
        }, {  
            use: [isProduction ? MiniCssExtractPlugin.loader  : 'style-loader', 'css-loader']  
        }]  
    },  
    {  
        test: /\.scss$/,  
        oneOf: [{  
            resourceQuery: /\?vue/,  
            // 指定.vue文件的 style(lang=scss)区域块 使用 tree shaking 时会有副作用  
            sideEffects: true,  
            use: [isProduction ? MiniCssExtractPlugin.loader  : 'vue-style-loader', 'css-loader', 'sass-loader']  
        }, {  
            use: [isProduction ? MiniCssExtractPlugin.loader  : 'style-loader', 'css-loader', 'sass-loader']  
        }]  
    }  
      
    // package.json  
    {  
        sideEffects: false  
    }  
```
这样的话，样式不会丢失， 并且如果 **script 区域块** 中通过 **import** 的方式引入了 **未使用的模块**，**未使用的模块在最后打包代码的时候会被删除**
