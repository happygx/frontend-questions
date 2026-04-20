---
level: 2
---

# Vue项目中有封装过axios吗？怎么封装的？

## 题目要点

封装axios的要点主要包括以下几个方面：

1. **创建axios实例**：
   - 使用`axios.create()`方法创建一个axios实例，这样可以根据不同的需求配置多个axios实例。
   - 设置基础URL（`baseURL`），这样请求时就不需要重复指定URL的前缀部分。
   - 设置请求超时时间（`timeout`），避免请求长时间无响应。

2. **请求拦截器（Request Interceptors）**：
   - 在发送请求之前进行预处理，比如添加认证token、设置请求头等。
   - 可以对请求进行错误处理，比如请求参数校验失败时直接取消请求。

3. **响应拦截器（Response Interceptors）**：
   - 在接收到响应后进行预处理，比如统一处理状态码、转换数据格式等。
   - 可以在这里处理全局的错误信息，比如网络错误、服务器错误等，并给用户友好的提示。

4. **错误处理**：
   - 在拦截器中，使用`Promise.reject()`将错误传递到调用链的下一层，方便调用者进行错误处理。
   - 可以在全局或组件级别添加错误处理逻辑，比如显示错误提示、重试请求等。

5. **模块化**：
   - 将封装的axios实例导出为模块，方便在项目中其他地方引入和使用。
   - 可以根据业务需求将不同的API请求封装成单独的函数或模块，提高代码的组织性和可维护性。

6. **环境变量**：
   - 使用环境变量（如`.env`文件）来管理API的基础URL等配置信息，便于在不同环境下（开发、测试、生产）使用不同的配置。

7. **可扩展性**：
   - 封装时考虑未来的扩展性，比如添加请求重试机制、日志记录等。

## 参考答案

## 一、axios是什么

`axios` 是一个轻量的 `HTTP`客户端

基于 `XMLHttpRequest` 服务来执行 `HTTP` 请求，支持丰富的配置，支持 `Promise`，支持浏览器端和 `Node.js` 端。自`Vue`2.0起，尤大宣布取消对 `vue-resource` 的官方推荐，转而推荐 `axios`。现在 `axios` 已经成为大部分 `Vue` 开发者的首选

### 特性

- 从浏览器中创建 `XMLHttpRequests`
- 从 `node.js` 创建 `http`请求
- 支持 `Promise` API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换` JSON` 数据
- 客户端支持防御`XSRF`

### 基本使用

安装

```js
npm install axios --S
// cdn 引入
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

```js
```

```js
  url:'xxx',    // 设置请求的地址
  method:"GET", // 设置请求方法
  params:{      // get请求使用params进行参数凭借,如果是post请求用data
    type: '',
    page: 1
  }
}).then(res => {  
  // res为后端返回的数据
  console.log(res);   
})
```

```js
    return axios.get('/user/12345');
}

function getUserPermissions() {
    return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
    .then(axios.spread(function (res1, res2) { 
    // res1第一个请求的返回的内容，res2第二个请求返回的内容
    // 两个请求都执行完成才会执行
}));
```

`axios` 的 API 很友好，你完全可以很轻松地在项目中直接使用。

不过随着项目规模增大，如果每发起一次`HTTP`请求，就要把这些比如设置超时时间、设置请求头、根据项目环境判断使用哪个请求地址、错误处理等等操作，都需要写一遍

这种重复劳动不仅浪费时间，而且让代码变得冗余不堪，难以维护。为了提高我们的代码质量，我们应该在项目中二次封装一下 `axios` 再使用

举个例子：

```js
  // 配置代码
  method: 'GET',
  timeout: 1000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'xxx',
  },
  transformRequest: [function (data, headers) {
    return data;
  }],
  // 其他请求配置...
})
.then((data) => {
  // todo: 真正业务逻辑代码
  console.log(data);
}, (err) => {
  // 错误处理代码  
  if (err.response.status === 401) {
  // handle authorization error
  }
  if (err.response.status === 403) {
  // handle server forbidden error
  }
  // 其他错误处理.....
  console.log(err);
});
```

这时候我们就需要对`axios`进行二次封装，让使用更为便利



## 三、如何封装

封装的同时，你需要和 后端协商好一些约定，请求头，状态码，请求超时时间.......

设置接口请求前缀：根据开发、测试、生产环境的不同，前缀需要加以区分

请求头 :  来实现一些具体的业务，必须携带一些参数才可以请求(例如：会员业务)

状态码:   根据接口返回的不同`status` ， 来执行不同的业务，这块需要和后端约定好

请求方法：根据`get`、`post`等方法进行一个再次封装，使用起来更为方便

请求拦截器:  根据请求的请求头设定，来决定哪些请求可以访问

响应拦截器： 这块就是根据 后端`返回来的状态码判定执行不同业务



### 设置接口请求前缀

利用`node`环境变量来作判断，用来区分开发、测试、生产环境

```js
  axios.defaults.baseURL = 'http://dev.xxx.com'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://prod.xxx.com'
}
```

```js
    proxy: {
      '/proxyApi': {
        target: 'http://dev.xxx.com',
        changeOrigin: true,
        pathRewrite: {
          '/proxyApi': ''
        }
      }
    }
  }
```

大部分情况下，请求头都是固定的，只有少部分情况下，会需要一些特殊的请求头，这里将普适性的请求头作为基础配置。当需要特殊请求头时，将特殊请求头作为参数传入，覆盖基础配置

```js
    ...
    timeout: 30000,  // 请求 30s 超时
	  headers: {
        get: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
        },
        post: {
          'Content-Type': 'application/json;charset=utf-8'
          // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
        }
  },
})
```

先引入封装好的方法，在要调用的接口重新封装成一个方法暴露出去

```js
export function httpGet({
  url,
  params = {}
}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    }).then((res) => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// post
// post请求
export function httpPost({
  url,
  data = {},
  params = {}
}) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'post',
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      // 发送的数据
      data,
      // url参数
      params

    }).then(res => {
      resolve(res.data)
    })
  })
}
```

```js
export const getorglist = (params = {}) => httpGet({ url: 'apps/api/org/list', params })
```

```js
import { getorglist } from '@/assets/js/api'

getorglist({ id: 200 }).then(res => {
  console.log(res)
})
```



### 请求拦截器

请求拦截器可以在每个请求里加上token，做了统一处理后维护起来也方便

```js
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况，此处token一般是用户完成登录后储存到localstorage里的
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.error(error)
  })
```

响应拦截器可以在接收到响应后先做一层操作，如根据状态码判断登录状态、授权

```js
axios.interceptors.response.use(response => {
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (response.status === 200) {
    if (response.data.code === 511) {
      // 未授权调取授权接口
    } else if (response.data.code === 510) {
      // 未登录跳转登录页
    } else {
      return Promise.resolve(response)
    }
  } else {
    return Promise.reject(response)
  }
}, error => {
  // 我们可以在这里对异常状态作统一处理
  if (error.response.status) {
    // 处理请求失败的情况
    // 对不同返回码对相应处理
    return Promise.reject(error.response)
  }
})
```

- 封装是编程中很有意义的手段，简单的`axios`封装，就可以让我们可以领略到它的魅力
- 封装 `axios` 没有一个绝对的标准，只要你的封装可以满足你的项目需求，并且用起来方便，那就是一个好的封装方案
