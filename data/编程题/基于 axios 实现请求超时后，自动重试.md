---
level: 1.5
---

# 基于 axios 实现请求超时后，自动重试

## 参考答案

使用 `axios` 封装请求超时自动重试的方法，可以通过设置请求拦截器和响应拦截器来实现。当请求发生超时错误时，递归调用该请求直到达到最大重试次数。

### 实现步骤
1. **设置默认超时时间**：在 `axios` 实例中配置超时时间。
2. **设置最大重试次数**：在配置中设置一个最大重试次数。
3. **重试逻辑**：在响应拦截器中，判断请求是否因为超时失败，如果超时则递归调用请求，直到达到最大重试次数。

### 示例代码

```javascript

// 创建 axios 实例并配置超时和重试次数
const axiosInstance = axios.create({
  timeout: 5000 // 设置超时时间为 5 秒
});

const MAX_RETRIES = 3; // 最大重试次数

// 封装请求方法
axiosInstance.interceptors.response.use(
  response => response, // 请求成功直接返回结果
  async error => {
    const config = error.config;

    // 设置请求的重试次数
    if (!config._retryCount) {
      config._retryCount = 0;
    }

    // 检查是否达到最大重试次数
    if (config._retryCount < MAX_RETRIES && error.code === 'ECONNABORTED') {
      config._retryCount += 1;
      console.warn(`请求超时，正在进行第 ${config._retryCount} 次重试...`);
      // 递归调用，重试请求
      return axiosInstance(config);
    }

    // 如果已达到最大重试次数，抛出错误
    return Promise.reject(error);
  }
);

// 使用示例
async function fetchData() {
  try {
    const response = await axiosInstance.get('/api/data');
    console.log('请求成功:', response.data);
  } catch (error) {
    console.error('请求失败:', error.message);
  }
}

export default axiosInstance;
```
1. **重试计数**：`config._retryCount` 用于记录请求的重试次数。
2. **重试逻辑**：当错误是超时错误 `ECONNABORTED` 且未达到最大重试次数时，递归调用 `axiosInstance(config)` 发起重试。
3. **失败处理**：达到最大重试次数后，错误会抛出到调用处。
