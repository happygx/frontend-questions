---
level: 3
---

# 使用Promise封装一个异步加载图片的方法

## 参考答案

这个比较简单，只需要在图片的onload函数中，使用resolve返回一下就可以了。

```js
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function() {
      resolve(img);
    };
    img.onerror = function() {
    	reject(new Error('Could not load image at' + url));
    };
    img.src = url;
  });

```
