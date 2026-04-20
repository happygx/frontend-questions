---
level: 1
---

# label标签有什么用？

## 参考答案

label标签来定义表单控制间的关系。当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

```html
<input type='text' name="Name" id="Name"/>

<label>Date:<input type="text" name="B"/></label>
```
