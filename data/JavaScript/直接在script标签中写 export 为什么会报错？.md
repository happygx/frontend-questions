---
level: 1
---

# 直接在script标签中写 export 为什么会报错？

## 参考答案

现代浏览器可以支持用 script 标签引入模块或者脚本，如果要引入模块，必须给 script 标签添加 type=“module”。如果引入脚本，则不需要 type。
