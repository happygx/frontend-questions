---
level: 2
---

# Vue项目中如何解决跨域问题？

## 题目要点

在Vue项目中，解决跨域问题通常采用CORS（跨域资源共享）或Proxy（代理）两种方法。

#### CORS（跨域资源共享）

CORS是一种机制，它允许服务器声明哪些网站可以访问哪些资源。通过在服务器端设置特定的HTTP头部，可以允许或拒绝跨域请求。

#### Proxy（代理）

代理是一种网络服务，它可以将请求转发到目标服务器，并转发响应给前端。

**Vue CLI中通过Webpack配置代理**：

1. 在`vue.config.js`中配置开发服务器（devServer）。
2. 设置代理规则，将特定的URL前缀（如`/api`）代理到目标服务器。
3. 在前端项目中配置`axios`的默认基础URL。

```javascript
  devServer: {
    host: '127.0.0.1',
    port: 8084,
    open: true,
    proxy: {
      '/api': {
        target: 'http://xxx.xxx.xx.xx:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 重写路径，去掉代理前缀
        }
      }
    }
  }
};
```

1. 定义一个服务器块。
2. 设置监听端口和主机名。
3. 在`location`块中设置代理规则。

```nginx
  listen 80;
  location / {
    root /var/www/html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html;
  }
  location /api {
    proxy_pass http://127.0.0.1:3000;
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

## 参考答案

解决跨域的方法有很多，下面列举了三种：

- JSONP
- CORS
- Proxy

而在`vue`项目中，我们主要针对`CORS`或`Proxy`这两种方案进行展开

### CORS

CORS （Cross-Origin Resource Sharing，跨域资源共享）是一个系统，它由一系列传输的HTTP头组成，这些HTTP头决定浏览器是否阻止前端 JavaScript 代码获取跨域请求的响应

`CORS` 实现起来非常方便，只需要增加一些 `HTTP` 头，让服务器能声明允许的访问来源

只要后端实现了 `CORS`，就实现了跨域

 ![](https://static.ecool.fun//article/1dab26ff-003d-49b3-ab94-f25032f40170.png)

以` koa`框架举例

添加中间件，直接设置`Access-Control-Allow-Origin`请求头

```js
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
})
```

### Proxy
代理（Proxy）也称网络代理，是一种特殊的网络服务，允许一个（一般为客户端）通过这个服务与另一个网络终端（一般为服务器）进行非直接的连接。一些网关、路由器等网络设备具备网络代理功能。一般认为代理服务有利于保障网络终端的隐私或安全，防止攻击


**方案一**

如果是通过`vue-cli`脚手架工具搭建项目，我们可以通过`webpack`为我们起一个本地服务器作为请求的代理对象

通过该服务器转发请求至目标服务器，得到结果再转发给前端，但是最终发布上线时如果web应用和接口服务器不在一起仍会跨域

在`vue.config.js`文件，新增以下代码

```js
    devServer: {
        host: '127.0.0.1',
        port: 8084,
        open: true,// vue项目启动时自动打开浏览器
        proxy: {
            '/api': { // '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的
                target: "http://xxx.xxx.xx.xx:8080", //目标地址，一般是指后台服务器地址
                changeOrigin: true, //是否跨域
                pathRewrite: { // pathRewrite 的作用是把实际Request Url中的'/api'用""代替
                    '^/api': "" 
                }
            }
        }
    }
}
```

```js
```

此外，还可通过服务端实现代理请求转发

以`express`框架为例

```js
const proxy = require('http-proxy-middleware')
const app = express()
app.use(express.static(__dirname + '/'))
app.use('/api', proxy({ target: 'http://localhost:4000', changeOrigin: false
                      }));
module.exports = app
```

通过配置`nginx`实现代理

```js
    listen    80;
    # server_name www.josephxia.com;
    location / {
        root  /var/www/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    location /api {
        proxy_pass  http://127.0.0.1:3000;
        proxy_redirect   off;
        proxy_set_header  Host       $host;
        proxy_set_header  X-Real-IP     $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
    }
}
```
