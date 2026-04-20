---
level: 1
---

# cool_secret 可访问多长时间？

## 参考答案

关闭 **tab 标签页** 后，`sessionStorage` 存储的数据才会删除。
如果使用 `localStorage`，那么数据将永远在那里，除非调用了 `localStorage.clear()`。
