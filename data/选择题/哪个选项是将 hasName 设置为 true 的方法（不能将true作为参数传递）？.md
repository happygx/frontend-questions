---
level: 1
---

# 哪个选项是将 hasName 设置为 true 的方法（不能将true作为参数传递）?

## 参考答案

使用逻辑非运算符`!`，将返回一个布尔值，使用`!! name`，我们可以确定`name`的值是真的还是假的。 如果`name`是真实的，那么`!name`返回`false`。 `!false`返回`true`。
通过将`hasName`设置为`name`，可以将`hasName`设置为等于传递给`getName`函数的值，而不是布尔值`true`。
`new Boolean（true）`返回一个对象包装器，而不是布尔值本身。
`name.length`返回传递的参数的长度，而不是布尔值`true`。
