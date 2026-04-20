---
level: 2
---

# 前端单页应用 History 路由模式， 需要如何配置 nginx？

## 题目要点

为支持 History 路由模式的 SPA，需要在 Nginx 配置中使用 `try_files` 指令，将所有未匹配到实际文件的请求重定向到 `index.html`。这样，前端路由才能正确处理路径。

## 参考答案

前端单页应用使用 History 路由模式，需要将路由的控制交给前端，而不是后端处理，因此需要配置 nginx 让其将所有请求都指向 index.html 页面，让前端来处理路由。

具体配置可以参考以下 nginx 配置：

```bash
    listen       80;
    server_name  example.com; # 域名或 IP 地址

    location / {
        root   /path/to/your/app; # 项目根目录
        index  index.html;
        try_files $uri $uri/ /index.html; # 将所有请求都指向 index.html 页面
    }
}
```
