---
level: 1.5
---

# 如何用webpack来优化前端性能

## 题目要点

**答题思路**：阐述使用Webpack优化前端性能的方法，并简要说明每个方法的作用。

1\. 使用最新版本的Webpack，以利用其性能优化特性。

2\. 减少Loader的使用，尽量减少处理步骤。

3\. 利用Webpack的缓存功能，如使用cache-loader或HardSourceWebpackPlugin。

4\. 使用externals功能，将第三方库排除在bundle之外，减少构建时间。

5\. 分割代码，使用SplitChunksPlugin进行代码分割，减少单文件大小。

6\. 压缩代码，使用TerserPlugin等插件进行压缩。

7\. 利用tree-shaking去除无用代码。

8\. 使用动态导入（如import()）实现懒加载，按需加载资源。

9\. 设置合理的resolve.extensions和resolve.alias，减少解析时间。

10\. 使用Webpack Bundle Analyzer分析打包结果，进一步优化。

**考察要点**：对Webpack优化策略的掌握程度。

## 参考答案

用webpack优化前端性能是指优化webpack的输出结果，让打包的最终结果在浏览器运行快速高效。  

-   压缩代码:删除多余的代码、注释、简化代码的写法等等方式。可以利用webpack的`UglifyJsPlugin`和`ParallelUglifyPlugin`来压缩JS文件， 利用`cssnano`（css-loader?minimize）来压缩css

-   利用CDN加速: 在构建过程中，将引用的静态资源路径修改为CDN上对应的路径。可以利用webpack对于`output`参数和各loader的`publicPath`参数来修改资源路径
-   Tree Shaking: 将代码中永远不会走到的片段删除掉。可以通过在启动webpack时追加参数`--optimize-minimize`来实现
-   Code Splitting: 将代码按路由维度或者组件分块(chunk),这样做到按需加载,同时可以充分利用浏览器缓存
-   提取公共第三方库: SplitChunksPlugin插件来进行公共模块抽取,利用浏览器缓存可以长期缓存这些无需频繁变动的公共代码
