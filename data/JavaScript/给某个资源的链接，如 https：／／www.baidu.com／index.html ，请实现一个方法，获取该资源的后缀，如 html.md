---
level: 1
---

# 给某个资源的链接，如 https://www.baidu.com/index.html ，请实现一个方法，获取该资源的后缀，如 html

## 参考答案

本题主要考察字符串相关的方法，实现比较简单，下面列举两个实现方法。

```js

function getFileExtension(url){
	if(typeof url !== 'string'){
    	return ''
    }
    
    // 方法一
    return url.substring(url.lastIndexOf('.') + 1);
    
    // 方法二
    //return url.split('.').pop().toLowerCase();
}
```
