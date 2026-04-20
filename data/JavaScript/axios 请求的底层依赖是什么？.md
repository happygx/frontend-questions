---
level: 2
---

# axios 请求的底层依赖是什么？

## 题目要点

* Axios 在浏览器中底层依赖 `XMLHttpRequest`，在 Node.js 中依赖 `http` / `https` 模块；
* 通过适配器模式抽象环境差异，使用统一的 API；
* 除了底层请求，Axios 提供了丰富的封装能力，增强了使用体验和灵活性。

## 参考答案

Axios 的请求底层依赖，其核心在于运行环境的差异化处理。

在 **浏览器端**，Axios 主要依赖的是 **`XMLHttpRequest`（XHR）对象**。当执行请求时，Axios 内部会构造一个配置对象并调用 `xhrAdapter`，这个适配器最终基于 `XMLHttpRequest` 实现请求的发送与响应的处理。它会自动处理请求头、响应数据解析（如 JSON 自动解析）、状态码判断、超时、取消请求等逻辑。

在 **Node.js 环境下**，Axios 不能使用 `XMLHttpRequest`，因此使用的是 **`http` 和 `https` 模块**。Axios 会根据请求的 URL 协议自动选择 `httpAdapter`，该适配器内部封装了 `http.request` 或 `https.request` 方法，同样提供配置项支持和响应封装（如 response 对象结构保持一致）。

Axios 使用了一种“适配器模式”来抽象环境差异，表现为对外统一的调用方式，内部根据运行环境动态选择适配器，使其在浏览器和 Node.js 中都能无缝工作。

此外，Axios 并不是直接透传底层请求能力，而是围绕请求流程做了很多增强，比如：

* 自动转换请求和响应的数据结构；
* 请求和响应拦截器；
* 请求取消机制（基于 AbortController 或 CancelToken）；
* 防止 CSRF 的默认设置；
* Promise 化的链式调用；
* 自定义实例（如带 baseURL、headers、timeout 的默认配置）等。

这些功能都建立在对底层请求能力的封装和抽象上。
