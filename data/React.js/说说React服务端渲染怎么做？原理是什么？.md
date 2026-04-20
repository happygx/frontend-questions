---
level: 2
---

# 说说React服务端渲染怎么做？原理是什么？

## 题目要点

React 服务端渲染（Server-Side Rendering，SSR）是一种在服务器端生成 HTML 内容并将其发送到客户端的技术。这种方式可以提高页面加载速度和 SEO 效果。

下面详细介绍 React 服务端渲染的实现方法和原理。

### 1. **服务端渲染的基本原理**

#### 1.1 原理概述

- **服务器生成 HTML**：在服务器端渲染过程中，服务器会执行 React 组件并生成相应的 HTML 内容。然后将这个 HTML 发送到客户端浏览器。
- **客户端渲染**：浏览器接收到 HTML 后，会解析并渲染页面，同时加载 JavaScript 代码以实现客户端交互。客户端 React 代码会接管服务器渲染的内容，进行后续的渲染和更新。

#### 1.2 优点

- **更快的初次加载**：由于页面在服务器端已经渲染好，用户可以更快地看到页面内容。
- **更好的 SEO**：搜索引擎爬虫可以抓取到完全渲染的 HTML，提高页面的搜索引擎排名。
- **更好的用户体验**：减少了客户端渲染的时间，提高了用户体验。

### 2. **实现 React 服务端渲染**

#### 2.1 基本步骤

1. **设置服务器**：
   - 使用 Node.js 服务器（如 Express）来处理 HTTP 请求并生成服务器渲染的 HTML。

2. **渲染 React 组件**：
   - 使用 `ReactDOMServer` 提供的 `renderToString` 方法将 React 组件渲染成 HTML 字符串。

3. **发送 HTML 到客户端**：
   - 将生成的 HTML 字符串作为响应发送到客户端，客户端接收并展示页面内容。

4. **客户端接管**：
   - 客户端 JavaScript 代码加载后，会接管由服务器渲染的内容，使其变得可交互。

#### 2.2 示例代码

**服务器端代码（Node.js + Express）**：

```javascript
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./App'); // 你的 React 组件
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('*', (req, res) => {
  const appHtml = ReactDOMServer.renderToString(<App />);

  fs.readFile(path.resolve(__dirname, 'public', 'index.html'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Some error happened');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    );
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
```

```javascript
import ReactDOM from 'react-dom';
import App from './App'; // 你的 React 组件

ReactDOM.hydrate(<App />, document.getElementById('root'));
```

#### 3.1 数据预取概述

- **定义**：在服务端渲染过程中，确保组件在渲染之前能够获取所需的数据。数据预取可以在服务端获取数据，然后将其传递给客户端。

#### 3.2 实现数据预取

1. **获取数据**：
   - 在服务端渲染前，调用数据获取函数来获取数据。

2. **传递数据**：
   - 将获取的数据嵌入到 HTML 中，并在客户端使用这些数据进行渲染。

3. **客户端初始化**：
   - 在客户端使用嵌入的数据来初始化组件状态。

**示例代码**：

**服务器端数据预取**：

```javascript
  const data = await fetchData(); // 假设这是一个异步数据获取函数
  const appHtml = ReactDOMServer.renderToString(<App data={data} />);

  fs.readFile(path.resolve(__dirname, 'public', 'index.html'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Some error happened');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root" data-initial-data='${JSON.stringify(data)}'>${appHtml}</div>`)
    );
  });
});
```

```javascript
import ReactDOM from 'react-dom';
import App from './App';

const initialData = JSON.parse(document.getElementById('root').getAttribute('data-initial-data'));

ReactDOM.hydrate(<App initialData={initialData} />, document.getElementById('root'));
```

- **服务端渲染**：通过在服务器端渲染 React 组件并将 HTML 发送到客户端，提高初次加载速度和 SEO 效果。
- **实现步骤**：设置服务器，渲染组件，发送 HTML，客户端接管。
- **数据预取**：在服务端获取数据并传递给客户端，确保组件在渲染时拥有必要的数据。

## 参考答案

## 一、是什么

服务端渲染（`Server-Side Rendering` ，简称`SSR`），指由服务侧完成页面的 `HTML` 结构拼接的页面处理技术，发送到浏览器，然后为其绑定状态与事件，成为完全可交互页面的过程

 ![](https://static.ecool.fun//article/27578d0b-7e0c-445e-8dab-7e3b19c5b9e6.png)

其解决的问题主要有两个：

- SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面
- 加速首屏加载，解决首屏白屏问题


## 二、如何做

在`react`中，实现`SSR`主要有两种形式：

- 手动搭建一个 SSR 框架
- 使用成熟的SSR 框架，如 Next.JS


这里主要以手动搭建一个`SSR`框架进行实现

首先通过`express`启动一个`app.js`文件，用于监听3000端口的请求，当请求根目录时，返回`HTML`，如下：

```js
const app = express()
app.get('/', (req,res) => res.send(`
<html>
   <head>
       <title>ssr demo</title>
   </head>
   <body>
       Hello world
   </body>
</html>
`))

app.listen(3000, () => console.log('Exampleapp listening on port 3000!'))
```

```jsx

const Home = () =>{

    return <div>home</div>

}

export default Home
```

```js
const nodeExternals = require('webpack-node-externals')

module.exports = {
    target:'node',
    mode:'development',           //开发模式
    entry:'./app.js',             //入口
    output: {                     //打包出口
        filename:'bundle.js',     //打包后的文件名
        path:path.resolve(__dirname,'build')    //存放到根目录的build文件夹
    },
    externals: [nodeExternals()],  //保持node中require的引用方式
    module: {
        rules: [{                  //打包规则
           test:   /\.js?$/,       //对所有js文件进行打包
           loader:'babel-loader',  //使用babel-loader进行打包
           exclude: /node_modules/,//不打包node_modules中的js文件
           options: {
               presets: ['react','stage-0',['env', { 
                                  //loader时额外的打包规则,对react,JSX，ES6进行转换
                    targets: {
                        browsers: ['last 2versions']   //对主流浏览器最近两个版本进行兼容
                    }
               }]]
           }
       }]
    }
}
```

```js
import React from 'react'//引入React以支持JSX的语法
import { renderToString } from 'react-dom/server'//引入renderToString方法
import Home from'./src/containers/Home'

const app= express()
const content = renderToString(<Home/>)
app.get('/',(req,res) => res.send(`
<html>
   <head>
       <title>ssr demo</title>
   </head>
   <body>
        ${content}
   </body>
</html>
`))

app.listen(3001, () => console.log('Exampleapp listening on port 3001!'))
```

但是像一些事件处理的方法，是无法在服务端完成，因此需要将组件代码在浏览器中再执行一遍，这种服务器端和客户端共用一套代码的方式就称之为**同构**

通俗讲，“同构”就是一套React代码在服务器上运行一遍，到达浏览器又运行一遍：

- 服务端渲染完成页面结构
- 浏览器端渲染完成事件绑定

浏览器实现事件绑定的方式为让浏览器去拉取`JS`文件执行，让`JS`代码来控制，因此需要引入`script`标签

通过`script`标签为页面引入客户端执行的`react`代码，并通过`express`的`static`中间件为`js`文件配置路由，修改如下：

```js
import React from 'react'//引入React以支持JSX的语法
import { renderToString } from'react-dom/server'//引入renderToString方法
import Home from './src/containers/Home'
 
const app = express()
app.use(express.static('public'));
//使用express提供的static中间件,中间件会将所有静态文件的路由指向public文件夹
 const content = renderToString(<Home/>)
 
app.get('/',(req,res)=>res.send(`
<html>
   <head>
       <title>ssr demo</title>
   </head>
   <body>
        ${content}
   <script src="/index.js"></script>
   </body>
</html>
`))

 app.listen(3001, () =>console.log('Example app listening on port 3001!'))
```

```js

module.exports = {
    mode:'development',                         //开发模式
    entry:'./src/client/index.js',              //入口
    output: {                                   //打包出口
        filename:'index.js',                    //打包后的文件名
        path:path.resolve(__dirname,'public')   //存放到根目录的build文件夹
    },
    module: {
        rules: [{                               //打包规则
           test:   /\.js?$/,                    //对所有js文件进行打包
           loader:'babel-loader',               //使用babel-loader进行打包
           exclude: /node_modules/,             //不打包node_modules中的js文件
           options: {
               presets: ['react','stage-0',['env', {     
                    //loader时额外的打包规则,这里对react,JSX进行转换
                    targets: {
                        browsers: ['last 2versions']   //对主流浏览器最近两个版本进行兼容
                    }
               }]]
           }
       }]
    }
}
```

 ![](https://static.ecool.fun//article/98837f11-c0c1-4ca8-9db9-4e742a146785.png)

在做完初始渲染的时候，一个应用会存在路由的情况，配置信息如下：

```js
import { Route } from 'react-router-dom'    //引入路由
import Home from './containers/Home'        //引入Home组件

export default (
    <div>
        <Route path="/" exact component={Home}></Route>
    </div>
)
```

```js
import ReactDom from 'react-dom'
import { BrowserRouter } from'react-router-dom'
import Router from'../Routers'

const App= () => {
    return (
        <BrowserRouter>
           {Router}
        </BrowserRouter>
    )
}

ReactDom.hydrate(<App/>, document.getElementById('root'))
```

解决方法只需要将路由信息在服务端执行一遍，使用使用`StaticRouter`来替代`BrowserRouter`，通过`context`进行参数传递

```js
import React from 'react'//引入React以支持JSX的语法
import { renderToString } from 'react-dom/server'//引入renderToString方法
import { StaticRouter } from 'react-router-dom'
import Router from '../Routers'
 
const app = express()
app.use(express.static('public'));
//使用express提供的static中间件,中间件会将所有静态文件的路由指向public文件夹

app.get('/',(req,res)=>{
    const content  = renderToString((
        //传入当前path
        //context为必填参数,用于服务端渲染参数传递
        <StaticRouter location={req.path} context={{}}>
           {Router}
        </StaticRouter>
    ))
    res.send(`
   <html>
       <head>
           <title>ssr demo</title>
       </head>
       <body>
       <div id="root">${content}</div>
       <script src="/index.js"></script>
       </body>
   </html>
    `)
})


app.listen(3001, () => console.log('Exampleapp listening on port 3001!'))
```



## 三、原理

整体`react`服务端渲染原理并不复杂，具体如下：

`node server` 接收客户端请求，得到当前的请求`url` 路径，然后在已有的路由表内查找到对应的组件，拿到需要请求的数据，将数据作为 `props`、`context`或者`store` 形式传入组件

然后基于 `react` 内置的服务端渲染方法 `renderToString()`把组件渲染为 `html`字符串在把最终的 `html `进行输出前需要将数据注入到浏览器端

浏览器开始进行渲染和节点对比，然后执行完成组件内事件绑定和一些交互，浏览器重用了服务端输出的 `html` 节点，整个流程结束
