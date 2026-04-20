---
level: 2
---

# 说说 axios 的拦截器原理及应用，并简单手写核心逻辑

## 题目要点

`Axios` 拦截器的原理是通过在请求和响应的过程中插入自定义的处理逻辑来实现全局的处理和修改。通过注册拦截器，可以在请求发送之前或响应到达之后对数据进行处理，提供了强大的灵活性和可扩展性。

## 参考答案

`Axios` 的拦截器（interceptors）允许你在请求或响应被处理之前，进行一些自定义的处理或修改。拦截器提供了一个强大的机制来对请求和响应进行全局处理，比如添加认证信息、处理错误、或修改请求数据等。

### **1. 拦截器原理**

1. **请求拦截器**：在请求发送到服务器之前，可以对请求进行修改、添加头信息、处理请求数据等。
2. **响应拦截器**：在接收到响应数据之前，可以对响应数据进行修改或处理错误。

### **2. 拦截器应用**

**常见应用场景**：

- **请求拦截器**：
  - 添加认证令牌（Token）到请求头。
  - 对请求数据进行统一的格式化或加密。

- **响应拦截器**：
  - 统一处理错误码或异常情况。
  - 对响应数据进行统一的格式化或解密。

### **3. 简单手写核心逻辑**

手写核心逻辑可以帮助理解拦截器的基本实现原理。以下是一个简化的 `Axios` 拦截器的实现：

#### **简化 Axios 实现**

```javascript
  constructor() {
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  // 添加请求拦截器
  useRequestInterceptor(fn) {
    this.requestInterceptors.push(fn);
  }

  // 添加响应拦截器
  useResponseInterceptor(fn) {
    this.responseInterceptors.push(fn);
  }

  // 发送请求
  async request(config) {
    // 执行请求拦截器
    for (const interceptor of this.requestInterceptors) {
      config = interceptor(config);
    }

    // 模拟发送请求
    let response = await this._sendRequest(config);

    // 执行响应拦截器
    for (const interceptor of this.responseInterceptors) {
      response = interceptor(response);
    }

    return response;
  }

  // 模拟请求发送
  async _sendRequest(config) {
    // 这里模拟返回一个响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: 'response data', config });
      }, 1000);
    });
  }
}

// 使用示例
const axios = new SimpleAxios();

// 添加请求拦截器
axios.useRequestInterceptor(config => {
  console.log('Request Interceptor:', config);
  config.headers = { Authorization: 'Bearer token' };
  return config;
});

// 添加响应拦截器
axios.useResponseInterceptor(response => {
  console.log('Response Interceptor:', response);
  response.data = `Processed: ${response.data}`;
  return response;
});

// 发送请求
axios.request({ url: '/api/data', method: 'GET' })
  .then(response => {
    console.log('Response:', response);
  });
```

- **`SimpleAxios` 类**：模拟了 `Axios` 的核心功能，包括请求和响应拦截器的添加及处理。
- **`useRequestInterceptor` 和 `useResponseInterceptor`**：用于注册请求和响应拦截器。
- **`request` 方法**：在发送请求之前和之后分别执行请求和响应拦截器。
- **`_sendRequest` 方法**：模拟发送请求并返回响应。
