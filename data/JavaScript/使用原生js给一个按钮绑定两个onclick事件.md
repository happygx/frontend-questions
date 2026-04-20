---
level: 0.5
---

# 使用原生js给一个按钮绑定两个onclick事件

## 参考答案

```javascript
var btn = document.getElementById("btn");

btn.addEventListener("click",hello1);
btn.addEventListener("click",hello2);

function hello1(){
 alert("hello 1");
}
function hello2(){
 alert("hello 2");
}
```
