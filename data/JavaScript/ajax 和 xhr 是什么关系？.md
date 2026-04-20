---
level: 2
---

# ajax 和 xhr 是什么关系？

## 题目要点

1. **包含关系**：AJAX 是技术理念，XHR 是其最初的底层实现工具  
2. **发展关系**：现代 AJAX 应用可能使用 Fetch 或 WebSocket，但 XHR 仍是兼容性最广的方案  
3. **能力边界**：XHR 提供更底层的控制（如进度监控），而 AJAX 更关注整体数据交互体验

## 参考答案

### 一、概念定位差异
| **维度**       | **AJAX**                          | **XMLHttpRequest (XHR)**            |
|----------------|-----------------------------------|-------------------------------------|
| **本质**       | 一种前端技术范式/方法论           | 浏览器提供的底层 API 对象           |
| **层级**       | 应用层概念                        | 协议层实现                          |
| **诞生时间**   | 2005年（Jesse James Garrett提出） | 1999年（IE5首次实现）               |


### 二、技术实现关系
#### 1. **AJAX 依赖 XHR 实现**
AJAX 技术的核心是通过 **XHR 对象** 实现异步通信：
```javascript
function ajaxRequest(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText); // 回调处理数据
        }
    };
    xhr.open('GET', url, true); // 异步请求
    xhr.send();
}
```
XHR 也可用于同步请求（尽管不推荐）：
```javascript
xhr.open('GET', '/api/data', false); // 第三个参数为 false
xhr.send();
console.log(xhr.responseText);
```
#### 1. **现代 AJAX 的实现方式**
| **技术**            | **特点**                          | **示例                          |
|---------------------|-----------------------------------|---------------------------------|
| Fetch API           | Promise-based，更现代的替代方案   | `fetch(url).then(res => res.json())` |
| Axios              | 基于 XHR 的封装库                 | `axios.get(url).then(...)`      |
| WebSocket          | 全双工通信                        | `new WebSocket('ws://...')`     |

#### 2. **XHR 的扩展能力**
即使在新标准下，XHR 仍保留独特功能：
```javascript
xhr.upload.onprogress = (e) => {
    console.log(`进度: ${(e.loaded / e.total) * 100}%`);
};
```
| **特性**               | **AJAX 体系**                    | **原生 XHR**                     |
|------------------------|----------------------------------|----------------------------------|
| 异步支持               | 必须异步                         | 支持同步/异步                    |
| 数据格式               | 任意（JSON/XML/Text等）          | 依赖手动设置 `responseType`      |
| 跨域处理               | 依赖 CORS/JSONP                  | 需手动处理 `withCredentials`     |
| 事件机制               | 由封装库决定（如 Axios 拦截器）  | 原生事件（onload/onerror等）     |


### 五、工作流程图示
```mermaid
    participant Client
    participant XHR
    participant Server

    Client->>XHR: 创建 new XMLHttpRequest()
    XHR->>Server: 发送 HTTP 请求（异步）
    Server-->>XHR: 返回响应数据
    XHR->>Client: 触发 onreadystatechange
    Client->>Client: 执行 AJAX 回调逻辑
```
1. **1999**：IE5 引入 XHR 对象
2. **2005**：Google Maps/Gmail 应用 AJAX 技术
3. **2006**：XHR 被 W3C 标准化
4. **2015**：Fetch API 成为新标准
