---
level: 2
---

# Cookie 的 SameSite 属性有什么作用？

## 题目要点

**答题要点：**

Chrome 51 开始支持新的 Cookie 属性 SameSite，用于防止 CSRF 攻击和用户追踪。SameSite 属性有三个值：Strict、Lax 和 None。

- **Strict**：最严格的设置，完全禁止第三方 Cookie，只有当前网页的 URL 与请求目标一致时才会发送 Cookie。
- **Lax**：允许 GET 请求跨站发送 Cookie，包括链接、预加载请求和 GET 表单。
- **None**：允许任何类型的请求跨站发送 Cookie，但必须同时设置 Secure 属性。
SameSite 属性可以减少 CSRF 攻击的风险，但也可能影响用户体验，例如，点击外部链接时可能需要重新登录。

## 参考答案

Chrome 51 开始，浏览器的 Cookie 新增加了一个SameSite属性，用来防止 CSRF 攻击和用户追踪。

## 相关概念：

* 第一方cookie：第一方 cookie 指的是由网络用户访问的域创建的 cookie。
* 第三方cookie：第三方 cookie 是建立在别的域名不是你访问的域名（地址栏中的网址），比如：广告网络商就是最常见的第三方 cookies 的来源，他们用它们在多个网站上追踪用户的行为，当然这些活动可以用来调整广告。此外图像、 JavaScript 和 iframe 通常也会导致第三方 cookies 的生成。

## CSRF 攻击是什么？

Cookie 往往用来存储用户的身份信息，恶意网站可以设法伪造带有正确 Cookie 的 HTTP 请求，这就是 CSRF 攻击。

举例来说，用户登陆了银行网站your-bank.com，银行服务器发来了一个 Cookie。

```
```

```html
  ...
</form>
```

```html
  <input type="hidden" name="token" value="dad3weg34">
  ...
</form>
```

比如，Facebook 在第三方网站插入一张看不见的图片。

```
```

## SameSite 属性

Cookie 的SameSite属性用来限制第三方 Cookie，从而减少安全风险。

它可以设置三个值:

* Strict
* Lax
* None

### Strict

Strict最为严格，完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。换言之，只有当前网页的 URL 与请求目标一致，才会带上 Cookie。

```
```

### Lax

Lax规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。

```
```

|请求类型|示例|正常情况|Lax|
|--|--|--|--|
|链接|	<a href="..."></a>|	发送 Cookie|	发送 Cookie|
|预加载|	<link rel="prerender" href="..."/>|	发送 Cookie|	发送 Cookie|
|GET| 表单	<form method="GET" action="...">|发送 Cookie|	发送 Cookie|
|POST| 表单	<form method="POST" action="...">	|发送 Cookie|	不发送|
|iframe|	<iframe src="..."></iframe>|	发送 Cookie	|不发送|
|AJAX|	$.get("...")	|发送 Cookie|	不发送|
|Image|	<img src="...">	|发送 Cookie|	不发送|

设置了Strict或Lax以后，基本就杜绝了 CSRF 攻击。当然，前提是用户浏览器支持 SameSite 属性。

### None

网站可以选择显式关闭SameSite属性，将其设为None，这样无论是否跨站都会发送 Cookie。不过，前提是必须同时设置Secure属性（Cookie 只能通过 HTTPS 协议发送），否则无效。

下面的设置无效。

```
```

```
```
