---
level: 3.5
---

# 说说 Vue 中 CSS scoped 的原理

## 题目要点

在 Vue.js 中，使用 `scoped` 属性可以为组件的样式创建一个局部作用域。这意味着组件的样式只会应用于该组件内部，而不会泄漏到其他组件。

#### 原理解析

1. **模块化**：
   - Vue 组件设计为自包含的模块，包括模板、JavaScript 和 CSS。

2. **深度选择器**：
   - 当 CSS 被标记为 `scoped` 时，Vue 会使用 CSS 选择器的深度（例如 `>>>` 或 `/deep/`）来确保样式只影响当前组件。

3. **编译时处理**：
   - 在构建过程中，Vue 会对 `scoped` 的 CSS 进行编译，将所有选择器替换为具有更高特异性的选择器。

4. **动态作用域**：
   - 在运行时，Vue 通过动态生成唯一的属性（如 `data-v-xxx`）来标识组件的元素，确保样式的作用域。

5. **避免全局污染**：
   - 通过 `scoped`，可以避免样式全局污染，提高组件的可重用性和可维护性。

#### 考察重点

- 理解：Vue 中 scoped 的作用和工作原理。
- 应用：在组件开发中使用 scoped 来实现样式隔离。

## 参考答案

## 前言

在日常的Vue项目开发过程中，为了让项目更好的维护一般都会使用模块化开发的方式进行。也就是每个组件维护独立的`template`，`script`，`style`。今天主要介绍一下使用`<style scoped>`为什么在页面渲染完后样式之间并不会造成污染。

## 示例

搭建一个简单的Vue项目测试一下：

![](https://static.ecool.fun//article/a05b22d7-2657-486f-a20c-896b7f1b54b2.jpeg)

给个目录结构吧，代码并不是我们讲解的重点，如果需要源码测试的话后续我放到github上去。  
终端执行`npx webpack`输出dist目录，我们在浏览器打开index.html调试一下看看现象：

![](https://static.ecool.fun//article/5150ea02-e887-4120-9e29-8a57fe9c0223.jpeg)

1. 每个组件都会拥有一个`[data-v-hash:8]`插入HTML标签，子组件标签上也具体父组件`[data-v-hash:8]`;
2. 如果style标签加了`scoped属性`，里面的选择器都会变成`(Attribute Selector) [data-v-hash:8]`;
3. 如果子组件选择器跟父组件选择器完全一样，那么就会出现子组件样式被父组件覆盖，因为`子组件会优先于父组件mounted`，有兴趣可以测试一下哦。

## webpack.config.js配置

我们先看看在`webpack.config.js`中的配置：

![](https://static.ecool.fun//article/7d7879fb-5772-4ede-b015-8bc9ccc832ee.jpeg)

## vue-loader工作流

以下就是vue-loader工作大致的处理流程：

![](https://static.ecool.fun//article/1148995d-c04f-49bf-a353-f7090a0554ca.jpeg)

开启`node调试模式`进行查看阅读，package.json中配置如下：

```
    "debug": "node --inspect-brk ./node_modules/webpack/bin/webpack.js"  
 },

```

先从入口文件`lib/index.js`开始分析，因为我的Webpack是4.x版本，所以`VueLoaderPlugin = require('./plugin-webpack4')`，重点来看看这个`lib/plugin-webpack4.js`文件:

```
const RuleSet = require('webpack/lib/RuleSet')

const id = 'vue-loader-plugin'
const NS = 'vue-loader'
// 很明显这就是一个webpack插件写法
class VueLoaderPlugin {
  apply (compiler) {
    if (compiler.hooks) {
      // 编译创建之后，执行插件
      compiler.hooks.compilation.tap(id, compilation => {
        const normalModuleLoader = compilation.hooks.normalModuleLoader
        normalModuleLoader.tap(id, loaderContext => {
          loaderContext[NS] = true
        })
      })
    } else {
      // webpack < 4
      compiler.plugin('compilation', compilation => {
        compilation.plugin('normal-module-loader', loaderContext => {
          loaderContext[NS] = true
        })
      })
    }

    // webpack.config.js 中配置好的 module.rules
    const rawRules = compiler.options.module.rules
    // 对 rawRules 做 normlized
    const { rules } = new RuleSet(rawRules)

    // 从 rawRules 中检查是否有规则去匹配 .vue 或 .vue.html 
    let vueRuleIndex = rawRules.findIndex(createMatcher(`foo.vue`))
    if (vueRuleIndex < 0) {
      vueRuleIndex = rawRules.findIndex(createMatcher(`foo.vue.html`))
    }
    const vueRule = rules[vueRuleIndex]
    if (!vueRule) {
      throw new Error(
        `[VueLoaderPlugin Error] No matching rule for .vue files found.\n` +
        `Make sure there is at least one root-level rule that matches .vue or .vue.html files.`
      )
    }
    if (vueRule.oneOf) {
      throw new Error(
        `[VueLoaderPlugin Error] vue-loader 15 currently does not support vue rules with oneOf.`
      )
    }

    // 检查 normlized rawRules 中 .vue 规则中是否具有 vue-loader
    const vueUse = vueRule.use
    const vueLoaderUseIndex = vueUse.findIndex(u => {
      return /^vue-loader|(\/|\\|@)vue-loader/.test(u.loader)
    })

    if (vueLoaderUseIndex < 0) {
      throw new Error(
        `[VueLoaderPlugin Error] No matching use for vue-loader is found.\n` +
        `Make sure the rule matching .vue files include vue-loader in its use.`
      )
    }

    // make sure vue-loader options has a known ident so that we can share
    // options by reference in the template-loader by using a ref query like
    // template-loader??vue-loader-options
    const vueLoaderUse = vueUse[vueLoaderUseIndex]
    vueLoaderUse.ident = 'vue-loader-options'
    vueLoaderUse.options = vueLoaderUse.options || {}

    // 过滤出 .vue 规则，其他规则调用 cloneRule 方法重写了 resource 和 resourceQuery 配置
    // 用于编译vue文件后匹配依赖路径 query 中需要的loader
    const clonedRules = rules
      .filter(r => r !== vueRule)
      .map(cloneRule)

    // 加入全局 pitcher-loader，路径query有vue字段就给loader添加pitch方法
    const pitcher = {
      loader: require.resolve('./loaders/pitcher'),
      resourceQuery: query => {
        const parsed = qs.parse(query.slice(1))
        return parsed.vue != null
      },
      options: {
        cacheDirectory: vueLoaderUse.options.cacheDirectory,
        cacheIdentifier: vueLoaderUse.options.cacheIdentifier
      }
    }

    // 修改原始的 module.rules 配置
    compiler.options.module.rules = [
      pitcher,
      ...clonedRules,
      ...rules
    ]
  }
}

```

## vue-loader

继续来看看`vue-loader`是如何操作.vue文件的，目前只关心`style`部分，逻辑在`lib/index.js`：

### vue文件解析

```
module.exports = function (source) {
    const loaderContext = this
    // ...
    const {
        target,
        request, // 请求资源路径
        minimize,
        sourceMap, 
        rootContext, // 根路径
        resourcePath, // vue文件的路径
        resourceQuery // vue文件的路径 query 参数
      } = loaderContext
    // ...
    
    // 解析 vue 文件，descriptor 是AST抽象语法树的描述
    const descriptor = parse({
        source,
        compiler: options.compiler || loadTemplateCompiler(loaderContext),
        filename,
        sourceRoot,
        needMap: sourceMap
    })
    /**
    *
    */
    // hash(文件路径 + 开发环境 ？文件内容 : "")生成 id
    const id = hash(
        isProduction
          ? (shortFilePath + '\n' + source)
          : shortFilePath
    )
    // descriptor.styles 解析后是否具有 attrs: {scoped: true}
    const hasScoped = descriptor.styles.some(s => s.scoped)
    /**
    *
    */
    let stylesCode = ``
    if (descriptor.styles.length) {
        // 最终生成一个import依赖请求
        stylesCode = genStylesCode(
            loaderContext,
            descriptor.styles,
            id,
            resourcePath,
            stringifyRequest,
            needsHotReload,
            isServer || isShadow // needs explicit injection?
        )
    }
}

```

![](https://static.ecool.fun//article/27e47892-fad8-4f98-bfa2-899428688dbb.jpeg)

### 依赖解析

vue文件解析完之后template，script，style等都有个依赖的路径，后续可以通过配置的loader进行解析了，因为我们已经在`VuePluginLoader`中修改了module.rules的配置，而且依赖的路径中query中都拥有vue字段，所以会先走到pitcher-loader,现在来分析`lib/loaders/pitcher.js`中的逻辑：

```
 *
*/
module.exports = code => code

module.exports.pitch = function (remainingRequest) {
    const options = loaderUtils.getOptions(this)
    const { cacheDirectory, cacheIdentifier } = options
    const query = qs.parse(this.resourceQuery.slice(1))

    let loaders = this.loaders
    if (query.type) {
        if (/\.vue$/.test(this.resourcePath)) {
            // 过滤eslint-loader
            loaders = loaders.filter(l => !isESLintLoader(l))
        } else {
            loaders = dedupeESLintLoader(loaders)
        }
    }
    // 过滤pitcher-loader
    loaders = loaders.filter(isPitcher)
    
    const genRequest = loaders => {
        const seen = new Map()
        const loaderStrings = []

        loaders.forEach(loader => {
          const identifier = typeof loader === 'string'
            ? loader
            : (loader.path + loader.query)
          const request = typeof loader === 'string' ? loader : loader.request
          if (!seen.has(identifier)) {
            seen.set(identifier, true)
            // loader.request contains both the resolved loader path and its options
            // query (e.g. ??ref-0)
            loaderStrings.push(request)
          }
        })

        return loaderUtils.stringifyRequest(this, '-!' + [
          ...loaderStrings,
          this.resourcePath + this.resourceQuery
        ].join('!'))
    }
    
    
    if (query.type === `style`) {
        const cssLoaderIndex = loaders.findIndex(isCSSLoader)
        // 调整loader执行顺序
        if (cssLoaderIndex > -1) {
            const afterLoaders = loaders.slice(0, cssLoaderIndex + 1)
            const beforeLoaders = loaders.slice(cssLoaderIndex + 1)
            const request = genRequest([
                ...afterLoaders, // [style-loader,css-loader]
                stylePostLoaderPath, // style-post-loader
                ...beforeLoaders // [vue-loader]
            ])
            return `import mod from ${request}; export default mod; export * from ${request}`
        }
   }
   /**
   *
   */
   const request = genRequest(loaders)
   return `import mod from ${request}; export default mod; export * from ${request}`
}

```

![](https://static.ecool.fun//article/67b0bf0e-cf0f-4d2b-bc90-89213de288e1.jpeg)

### 新的依赖解析

分析`{tyep：style}`的处理流程顺序：

* vue-loader、style-post-loader、css-loader、style-loader。

处理资源的时候先走的是`vue-loader`，这时vue-loader中的处理逻辑与第一次解析vue文件不一样了：

```
// 拥有{type:style}
if (incomingQuery.type) {
    return selectBlock(
      descriptor,
      loaderContext,
      incomingQuery,
      !!options.appendExtension
    )
 }
 
 
 // lib/select.js
 module.exports = function selectBlock (
  descriptor,
  loaderContext,
  query,
  appendExtension
) {
   // ...
  if (query.type === `style` && query.index != null) {
    const style = descriptor.styles[query.index]
    if (appendExtension) {
      loaderContext.resourcePath += '.' + (style.lang || 'css')
    }
    loaderContext.callback(
      null,
      style.content,
      style.map
    )
    return
  }

```

再来看一下`style-post-loader`是如何生成`data-v-hash:8`的,逻辑主要在`lib/loaders/stylePostLoaders.js`中：

```
const { compileStyle } = require('@vue/component-compiler-utils')

module.exports = function (source, inMap) {
  const query = qs.parse(this.resourceQuery.slice(1))
  const { code, map, errors } = compileStyle({
    source,
    filename: this.resourcePath,
    id: `data-v-${query.id}`,
    map: inMap,
    scoped: !!query.scoped,
    trim: true
  })

  if (errors.length) {
    this.callback(errors[0])
  } else {
    this.callback(null, code, map)
  }
}

```

![](https://static.ecool.fun//article/021f3c9e-2b42-4398-98e0-cffafaf70ce4.jpeg)
