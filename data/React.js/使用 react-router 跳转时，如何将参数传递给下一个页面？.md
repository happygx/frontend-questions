---
level: 2.5
---

# 使用 react-router 跳转时，如何将参数传递给下一个页面？

## 题目要点

- **URL 参数**：用于路径中的动态数据，例如用户 ID。
- **查询字符串**：适用于非必需的、可选的参数。
- **状态**：适用于一次性数据传递，不显示在 URL 中。

## 参考答案

在 `react-router` 中实现页面跳转并传递参数，可以通过以下几种方式来完成：

### 1. **通过 URL 参数传递**

**定义路由时：**

在定义路由时，可以使用 URL 参数。例如：

```jsx
```

使用 `useHistory` 或 `useNavigate`（在 React Router v6 中）进行跳转时，可以将参数添加到 URL 中：

```jsx

function RedirectToUser() {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/user/123`); // 跳转到 /user/123
  };

  return <button onClick={handleClick}>Go to User 123</button>;
}
```
import { useNavigate } from 'react-router-dom'; // React Router v6

function RedirectToUser() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/123`); // 跳转到 /user/123
  };

  return <button onClick={handleClick}>Go to User 123</button>;
}
```

在目标组件中，可以使用 `useParams` 钩子（在 React Router v6 中也是 `useParams`）来接收 URL 参数：

```jsx

function User() {
  const { id } = useParams();
  return <div>User ID: {id}</div>;
}
```

**跳转时：**

可以将参数作为查询字符串添加到 URL 中：

```jsx

function RedirectToUser() {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/user?id=123`); // 跳转到 /user?id=123
  };

  return <button onClick={handleClick}>Go to User</button>;
}
```
import { useNavigate } from 'react-router-dom'; // React Router v6

function RedirectToUser() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user?id=123`); // 跳转到 /user?id=123
  };

  return <button onClick={handleClick}>Go to User</button>;
}
```

可以使用 `URLSearchParams` 来获取查询参数：

```jsx

function User() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get('id');
  return <div>User ID: {id}</div>;
}
```

**跳转时：**

可以将参数作为状态传递：

```jsx

function RedirectToUser() {
  const history = useHistory();

  const handleClick = () => {
    history.push({
      pathname: '/user',
      state: { id: 123 }
    });
  };

  return <button onClick={handleClick}>Go to User</button>;
}
```
import { useNavigate } from 'react-router-dom'; // React Router v6

function RedirectToUser() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/user', { state: { id: 123 } });
  };

  return <button onClick={handleClick}>Go to User</button>;
}
```

在目标组件中，可以通过 `useLocation` 钩子获取传递的状态：

```jsx

function User() {
  const location = useLocation();
  const id = location.state?.id;
  return <div>User ID: {id}</div>;
}
```
