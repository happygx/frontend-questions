---
level: 1.5
---

# 前端项目里，一般对请求 request 做哪些统一的封装？

## 题目要点

- **统一配置**：集中管理基础配置，如 baseURL 和 headers。
- **请求拦截器**：在请求发出前处理如添加认证 token。
- **响应拦截器**：处理响应数据和错误。
- **错误处理**：集中处理错误信息。
- **请求方法封装**：简化常见请求类型的调用。
- **统一响应格式**：确保响应数据格式一致。
- **请求超时和重试**：处理超时和重试机制。

## 参考答案

在前端项目中，对请求（request）的统一封装可以提高代码的可维护性、复用性，并简化对请求的管理。

以下是一些常见的请求封装做法：

### 1. **统一配置**

**目的**：集中管理所有请求的基础配置，如 baseURL、请求头、超时设置等。

```javascript

// 创建 Axios 实例
const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

export default apiClient;
```

**目的**：在请求发出之前，统一处理请求的设置，如添加认证 token、处理请求参数等。

```javascript
  config => {
    // 添加认证 token
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
```

**目的**：统一处理响应数据和错误，简化处理逻辑，如格式化数据、全局错误处理等。

```javascript
  response => response.data, // 只返回数据部分
  error => {
    // 处理 HTTP 错误
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);
```

**目的**：集中处理所有请求错误，例如展示用户友好的错误信息。

```javascript
  if (error.response) {
    // 请求已发出，但服务器响应状态码不在 2xx 范围内
    console.error('Server Error:', error.response.data);
  } else if (error.request) {
    // 请求已发出，但没有收到响应
    console.error('Network Error:', error.request);
  } else {
    // 其他错误
    console.error('Error:', error.message);
  }
}

// 在响应拦截器中调用
apiClient.interceptors.response.use(
  response => response.data,
  error => {
    handleError(error);
    return Promise.reject(error);
  }
);
```

**目的**：创建通用的方法来处理特定的请求类型（GET、POST、PUT、DELETE），简化请求调用。

```javascript
  get(url, params) {
    return apiClient.get(url, { params });
  },
  post(url, data) {
    return apiClient.post(url, data);
  },
  put(url, data) {
    return apiClient.put(url, data);
  },
  delete(url, params) {
    return apiClient.delete(url, { params });
  }
};

export default api;
```

**目的**：保持响应数据格式的一致性，通常是将响应数据封装在一个特定的结构中，便于处理。

```javascript
  response => {
    // 例如：{ code: 200, data: ..., message: ... }
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Unknown error');
    }
  },
  error => {
    handleError(error);
    return Promise.reject(error);
  }
);
```

**目的**：处理请求超时的情况，和自动重试机制。

```javascript

// 配置 Axios 重试
axiosRetry(apiClient, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

// 在拦截器中设置超时
apiClient.defaults.timeout = 15000;
```
