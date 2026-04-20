---
level: 3.5
---

# 如何实现jwt鉴权机制？说说你的思路

## 题目要点

**作答思路**：

实现JWT（JSON Web Token）鉴权机制的基本思路如下：

1. **生成JWT**：在用户登录成功后，服务器端生成一个JWT，并将其发送给前端。
2. **前端保存JWT**：前端收到JWT后，将其存储在客户端，通常存储在localStorage或sessionStorage中。
3. **发送JWT**：前端在每次与服务器端通信时，将JWT作为请求头（如Authorization: Bearer <token>）发送给服务器端。
4. **服务器端验证JWT**：服务器端收到请求后，从请求头中提取JWT，并验证其有效性。
5. **访问控制**：根据JWT中的信息，服务器端决定是否允许用户访问受保护的资源。

**考察要点**：

1. **JWT生成**：理解服务器端如何生成JWT，包括签名的算法、密钥等。
2. **JWT存储和传递**：理解前端如何存储和传递JWT，以及JWT在请求头中的格式。
3. **JWT验证**：理解服务器端如何验证JWT的有效性，包括验证签名和检查过期时间。
4. **访问控制逻辑**：理解服务器端如何根据JWT中的信息控制用户对资源的访问。

## 参考答案

## 一、是什么

JWT（JSON Web Token），本质就是一个字符串书写规范，如下图，作用是用来在用户和服务器之间传递安全可靠的信息

![](https://static.ecool.fun//article/d9c35117-2ed2-4a8e-950e-b124994e9d92.png)

在目前前后端分离的开发过程中，使用`token`鉴权机制用于身份验证是最常见的方案，流程如下：

- 服务器当验证用户账号和密码正确的时候，给用户颁发一个令牌，这个令牌作为后续用户访问一些接口的凭证
- 后续访问会根据这个令牌判断用户时候有权限进行访问

`Token`，分成了三部分，头部（Header）、载荷（Payload）、签名（Signature），并以`.`进行拼接。其中头部和载荷都是以`JSON`格式存放数据，只是进行了编码

 ![](https://static.ecool.fun//article/20d0a8a6-ee1c-4e20-82d2-eb1696e65eed.png)



### header

每个JWT都会带有头部信息，这里主要声明使用的算法。声明算法的字段名为`alg`，同时还有一个`typ`的字段，默认`JWT`即可。以下示例中算法为HS256

```json
```

```tex
```

载荷即消息体，这里会存放实际的内容，也就是`Token`的数据声明，例如用户的`id`和`name`，默认情况下也会携带令牌的签发时间`iat`，通过还可以设置过期时间，如下：

```json
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

```tex
```

签名是对头部和载荷内容进行签名，一般情况，设置一个`secretKey`，对前两个的结果进行`HMACSHA25`算法，公式如下：

```js
```



## 二、如何实现

`Token`的使用分成了两部分：

- 生成token：登录成功的时候，颁发token
- 验证token：访问某些资源或者接口时，验证token



### 生成 token

借助第三方库`jsonwebtoken`，通过`jsonwebtoken` 的 `sign` 方法生成一个 `token`：

- 第一个参数指的是 Payload

- 第二个是秘钥，服务端特有

- 第三个参数是 option，可以定义 token 过期时间

```js
  jwt = require("jsonwebtoken");
// TODO:使用数据库
// 这里应该是用数据库存储，这里只是演示用
let userList = [];

class UserController {
  // 用户登录
  static async login(ctx) {
    const data = ctx.request.body;
    if (!data.name || !data.password) {
      return ctx.body = {
        code: "000002", 
        message: "参数不合法"
      }
    }
    const result = userList.find(item => item.name === data.name && item.password === crypto.createHash('md5').update(data.password).digest('hex'))
    if (result) {
      // 生成token
      const token = jwt.sign(  
        {
          name: result.name
        },
        "test_token", // secret
        { expiresIn: 60 * 60 } // 过期时间：60 * 60 s
      );
      return ctx.body = {
        code: "0",
        message: "登录成功",
        data: {
          token
        }
      };
    } else {
      return ctx.body = {
        code: "000002",
        message: "用户名或密码错误"
      };
    }
  }
}

module.exports = UserController;
```

```js
  const token = localStorage.getItem('token');
  config.headers.common['Authorization'] = 'Bearer ' + token; // 留意这里的 Authorization
  return config;
})
```

使用 `koa-jwt` 中间件进行验证，方式比较简单

```js
app.use(koajwt({
  secret: 'test_token'
}).unless({ // 配置白名单
  path: [/\/api\/register/, /\/api\/login/]
}))
```
- 可以通过 unless 配置接口白名单，也就是哪些 URL 可以不用经过校验，像登陆/注册都可以不用校验
- 校验的中间件需要放在需要校验的路由前面，无法对前面的 URL 进行校验

获取`token`用户的信息方法如下：

```js
```

在分布式系统中，每个子系统都要获取到秘钥，那么这个子系统根据该秘钥可以发布和验证令牌，但有些服务器只需要验证令牌

这时候可以采用非对称加密，利用私钥发布令牌，公钥验证令牌，加密算法可以选择`RS256`


## 三、优缺点

优点：

- json具有通用性，所以可以跨语言
- 组成简单，字节占用小，便于传输
- 服务端无需保存会话信息，很容易进行水平扩展
- 一处生成，多处使用，可以在分布式系统中，解决单点登录问题
- 可防护CSRF攻击

缺点：

- payload部分仅仅是进行简单编码，所以只能用于存储逻辑必需的非敏感信息
- 需要保护好加密密钥，一旦泄露后果不堪设想
- 为避免token被劫持，最好使用https协议
