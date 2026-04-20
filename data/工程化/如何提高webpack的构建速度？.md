---
level: 3
---

# 如何提高webpack的构建速度？

## 题目要点

* Webpack 构建慢的根源在于**模块数量多、体积大、处理流程长**；
* 提升构建速度需从**缓存、并发、范围控制、按需加载**四个方向优化；
* 区分开发和生产环境进行有针对性的配置调整；
* 借助生态工具（如 thread-loader、BundleAnalyzer、TerserPlugin）提升自动化与调试效率；
* 保持依赖精简、代码可维护，有助于从源头优化构建时间。

## 参考答案

Webpack 的构建过程本质上包括**模块解析、加载、编译、优化、输出**等多个阶段，因此优化手段也需从多个维度入手。

以下从**开发模式（`webpack-dev-server`）和生产模式（`webpack build`）两个阶段**，分别分析提高构建速度的关键策略。

---

## 一、通用优化策略

### 1. **合理使用缓存**

* **开启持久化缓存**（Webpack 5）：

  ```js
  module.exports = {
    cache: {
      type: 'filesystem',
    },
  };
  ```

  能将模块编译结果缓存到磁盘，避免重复编译。

* **`babel-loader` 开启缓存**：

  ```js
  {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    }
  }
  ```

### 2. **减少模块解析范围**

* **使用 `include` / `exclude` 精准匹配**

  ```js
  {
    test: /\.js$/,
    loader: 'babel-loader',
    include: path.resolve(__dirname, 'src'),
    exclude: /node_modules/
  }
  ```

* **配置 `resolve.extensions` 精简后缀解析**

  ```js
  resolve: {
    extensions: ['.js', '.ts']
  }
  ```

* **配置 `resolve.alias` 减少深层查找**

  ```js
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
  ```

### 3. **并行/多进程处理**

* **使用 `thread-loader`** 处理 JS/TS 转译等耗时任务：

  ```js
  {
    test: /\.js$/,
    use: ['thread-loader', 'babel-loader']
  }
  ```

* **使用 `terser-webpack-plugin` 的并行压缩**：
  Webpack 5 中默认已启用，手动配置时可设置：

  ```js
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ parallel: true })]
  }
  ```

---

## 二、开发阶段优化（提升热更新和增量编译速度）

### 1. **使用 `webpack-dev-server` + HMR**

* 启用热模块替换（HMR），只更新变更部分，提高效率；
* 配合 React Fast Refresh、Vue HMR 插件，提升开发体验。

### 2. **开启 `source-map` 优化模式**

* 开发阶段推荐：

  ```js
  devtool: 'cheap-module-source-map'
  ```

  比 `eval-source-map` 更快，调试体验仍可接受。

### 3. **使用模块缓存机制**

* Webpack 会将未变更模块缓存，如果未配置 `module.id`，建议开启：

  ```js
  optimization: {
    moduleIds: 'deterministic'
  }
  ```

---

## 三、生产阶段优化（压缩构建产物）

### 1. **Tree Shaking（摇树优化）**

* 确保使用 `ESModule` 规范（`import`/`export`），否则无法移除无用代码；
* 设置 `sideEffects: false`，移除副作用模块（需谨慎）：

  ```json
  // package.json
  {
    "sideEffects": false
  }
  ```

### 2. **合理分包 + 动态引入**

* 利用 `SplitChunksPlugin` 拆分公共依赖和第三方库，减少重复打包：

  ```js
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  }
  ```

* 对大型路由模块按需加载，减少初始构建体积。

### 3. **缩小构建目标范围**

* 使用 `IgnorePlugin` 忽略无用语言包等：

  ```js
  new webpack.IgnorePlugin({
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/,
  });
  ```

* 精简 polyfill，例如使用 `core-js-pure` 或按需引入。

---

## 四、其他技巧与工具

### 1. **使用 `webpack-bundle-analyzer` 分析体积**

```js
```

### 2. **使用轻量替代库**

* 用 `dayjs` 替代 `moment`；
* 用 `lodash-es` + Tree Shaking 替代整个 lodash。

### 3. **升级到 Webpack 5**

Webpack 5 提供了更好的缓存机制、更快的构建性能和内置优化能力。
