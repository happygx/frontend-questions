---
level: 3
---

# token过期后，页面如何实现无感刷新？

## 题目要点

通过使用刷新 `token` 机制和请求拦截器，可以实现 `token` 过期后的无感刷新，确保用户体验不受影响。如果刷新 `token` 失败，则通常需要用户重新登录。整个过程对用户是透明的，最大限度地提升了用户体验。

## 参考答案

当用户的身份验证 `token` 过期时，可以通过以下方法实现页面的无感刷新（即用户无感知的情况下自动刷新 `token` 并继续操作），通常是针对基于 `JWT`（JSON Web Token）的身份验证流程。

### 实现步骤

1. **设置刷新 `token` 机制**：
   - **短生命周期的访问 `token`**：访问 `token` 应该有较短的有效期，以确保较高的安全性。
   - **长生命周期的刷新 `token`**：刷新 `token` 有较长的有效期，用于在访问 `token` 过期后获取新的访问 `token`。

2. **拦截请求**：
   - 使用拦截器（如 Axios 拦截器）来监控所有的 HTTP 请求。每次请求时，检查 `token` 是否存在且有效。
   - 在拦截器中处理 401 Unauthorized 响应，这是 `token` 过期的常见标志。

3. **尝试获取新 `token`**：
   - 当收到 401 响应时，拦截器会自动发起刷新 `token` 的请求。使用保存的刷新 `token` 通过专门的 API 来获取新的访问 `token`。
   - 如果刷新成功，更新存储中的 `token`（如 `localStorage` 或 `sessionStorage`），并重试原来的请求。

4. **无感刷新 `token` 并重发请求**：
   - 如果刷新 `token` 成功，则将新的访问 `token` 附加到原始请求的头部，然后重新发起该请求。用户在这个过程中不会感知到 `token` 的刷新和请求的重试。

5. **处理刷新失败**：
   - 如果刷新 `token` 失败（如刷新 `token` 也过期了），则通常需要让用户重新登录。此时可以重定向到登录页面或显示提示信息。

### 示例代码（使用 Axios 拦截器）

```javascript

const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器，添加 token
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器，处理 401 错误并尝试刷新 token
apiClient.interceptors.response.use(response => {
  return response;
}, async error => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post('https://api.example.com/refresh-token', {
        refreshToken: refreshToken,
      });
      const newToken = response.data.accessToken;
      localStorage.setItem('accessToken', newToken);
      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
      return apiClient(originalRequest); // 重试原来的请求
    } catch (refreshError) {
      // 刷新 token 失败，可能需要重新登录
      console.log('Refresh token failed:', refreshError);
      // 可以在这里重定向到登录页面
    }
  }
  return Promise.reject(error);
});

export default apiClient;
```
