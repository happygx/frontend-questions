---
level: 3
---

# 怎么解决canvas中获取跨域图片数据的问题？

## 题目要点

解决Canvas中获取跨域图片数据的问题，方法如下：

1. **配置CORS**：
   - 确保图片服务器支持CORS，并在HTTP响应中包含`Access-Control-Allow-Origin`头部，允许你的网站域名访问。

2. **使用代理**：
   - 如果无法控制图片服务器，设置一个代理服务器来转发请求，并在响应中添加CORS头部。

3. **使用同源图片**：
   - 尽可能使用与你的网站位于同一域或子域的图片，或者将图片保存在本地服务器上。

4. **HTML `crossOrigin` 属性**：
   - 在HTML的`<img>`标签中设置`crossOrigin="anonymous"`（或`"use-credentials"`，如果服务器需要认证），但这要求图片服务器支持CORS。

## 参考答案

## 背景

在一张图片添加相关文字，然后转化为base64数据，上传至服务器。当代码上线写完部署到测试环境，控制台报出如下错题：

```
```

## 为什么 canvas 认为跨域图片数据为 污染的数据

当请求跨域图片数据，而未满足跨域请求资源的条件时。如果canvas使用未经跨域允许的图片的原始数据，这些是不可信的数据，可能会暴露页面的数据。

## 请求图片资源 - 同域

Request Headers带有cookie。图片数据是被canvas信任的。

## 请求图片资源 - 跨域

默认情况下，直接请求跨域图片。因为不符合跨域请求资源的条件，图片数据是不被canvas信任的。

为了解决图片跨域资源共享的问题， <img> 元素提供了支持的属性：crossOrigin，该属性一共有两个值可选：anonymous 和 use-credentials，下面列举了两者的使用场景，以及满足的条件。

| |anonymous|use-credentials|
|--|--|--|
|用途|匿名请求跨域图片资源，不会发送证书（比如cookie等）|具名请求跨域图片资源，会携带证书数据|
|Request Headers|	origin	|origin、cookie|
|Response headers|	Access-Control-Allow-Origin|	Access-Control-Allow-Origin、Access-Control-Allow-Credentials|
|所需条件|	Access-Control-Allow-Origin 字段值需要包含请求域。	|Access-Control-Allow-Origin 字段值需要包含请求域，且不能为通配符 *。Access-Control-Allow-Credentials 字段值需要为 true，表明允许请求发送证书数据。|

## 代码示例

```js

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const img = new Image();
img.crossOrigin = 'anonymous';
img.onload = function () {
   context.drawImage(this, 0, 0);
   context.getImageData(0, 0, img.width, img.height);
};
img.src = 'https://b.com/a.png';
```

* img元素中设置crossorigin属性
* 图片允许跨域，设置响应头Access-Control-Allow-Origin
* 使用js方式请求图片资源, 需要避免使用缓存，设置url后加上时间戳，或者http头设置Cache-Control为no-cache

主要原因是：

* 如果使用跨域的资源画到canvas中，并且资源没有使用CORS去请求，canvas会被认为是被污染了, canvas可以正常展示，但是没办法使用toDataURL()或者toBlob()导出数据，见Allowing cross-origin use of images and canvas。 所以通过在img标签上设置crossorigin，启用CORS，属性值为anonymous，在CORS请求时不会发送认证信息,见HTML attribute: crossorigin。
* 在启用CORS请求跨域资源时，资源必须允许跨域，才能正常返回，最简单的方式设置响应头Access-Control-Allow-Origin
* 图片已经通过img标签加载过，浏览器默认会缓存下来，下次使用js方式再去请求，直接返回缓存的图片，如果缓存中的图片不是通过CORS 请求或者响应头中不存在Access-Control-Allow-Origin，都会导致报错。
