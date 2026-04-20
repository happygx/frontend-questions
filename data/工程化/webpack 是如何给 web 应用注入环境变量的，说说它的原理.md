---
level: 3
---

# webpack 是如何给 web 应用注入环境变量的，说说它的原理

## 题目要点

Webpack 通过 `DefinePlugin` 插件注入环境变量，这些变量在编译时会被替换成对应的值。你可以使用操作系统环境变量、`cross-env` 工具、或者 `dotenv` 插件来设置和管理这些环境变量。这样可以在不同环境下（开发、测试、生产）注入不同的配置，实现环境依赖的代码优化和安全管理。

## 参考答案

Webpack 注入环境变量的原理主要通过插件和内置的定义机制来实现。具体步骤如下：

### **1. 使用 `DefinePlugin` 插件**

Webpack 的 `DefinePlugin` 插件可以用来创建全局常量，这些常量会在编译时替换代码中的变量。这是注入环境变量的常见方式。

#### **配置步骤**

1. **安装 Webpack**：
   ```bash
   npm install webpack --save-dev
   ```

2. **配置 `DefinePlugin`**：
   在 Webpack 配置文件 (`webpack.config.js`) 中使用 `DefinePlugin` 插件来定义环境变量。

   ```javascript
   const webpack = require('webpack');
   
   module.exports = {
     // 其他配置
     plugins: [
       new webpack.DefinePlugin({
         'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
         'process.env.API_URL': JSON.stringify(process.env.API_URL),
       })
     ]
   };
   ```

   - `process.env.NODE_ENV` 和 `process.env.API_URL` 在代码中将被替换为对应的环境变量值。

3. **在代码中使用**：
   ```javascript
   console.log('API URL:', process.env.API_URL);
   ```

   在构建时，`process.env.API_URL` 会被替换为配置中的实际值。

### **2. 环境变量的定义**

环境变量通常通过操作系统、CI/CD 环境、或 `.env` 文件进行定义。在开发过程中，可以通过 `cross-env` 等工具来设置环境变量：

#### **设置环境变量**

1. **安装 `cross-env`**：
   ```bash
   npm install cross-env --save-dev
   ```

2. **在 `package.json` 的 `scripts` 部分配置**：
   ```json
   "scripts": {
     "start": "cross-env NODE_ENV=development webpack serve",
     "build": "cross-env NODE_ENV=production webpack"
   }
   ```

   - `cross-env` 用于在不同操作系统上统一设置环境变量。

### **3. 使用 `dotenv` 插件（可选）**

为了更方便地管理环境变量，特别是在开发环境中，可以使用 `dotenv` 插件将 `.env` 文件中的变量加载到 `process.env` 中。

#### **配置步骤**

1. **安装 `dotenv`**：
   ```bash
   npm install dotenv --save
   ```

2. **在 Webpack 配置中加载环境变量**：
   ```javascript
   const path = require('path');
   const webpack = require('webpack');
   require('dotenv').config();
   
   module.exports = {
     // 其他配置
     plugins: [
       new webpack.DefinePlugin({
         'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
         'process.env.API_URL': JSON.stringify(process.env.API_URL),
       })
     ]
   };
   ```

3. **创建 `.env` 文件**：
   ```plaintext
   NODE_ENV=development
   API_URL=https://api.example.com
   ```
