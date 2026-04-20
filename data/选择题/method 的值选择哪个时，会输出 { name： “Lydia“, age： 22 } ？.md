---
level: 1
---

# method 的值选择哪个时，会输出 { name: "Lydia", age: 22 } ?

## 参考答案

`fromEntries` 方法可以将二维数组转换为对象。在每个子数组的第一个元素是key，在每个子数组的第二个元素是value。在这个例子中，我们映射了 `keys` 数组，它返回了一个数组，数组的第一个元素为keys数组当前索引的值，第二个元素为values数组当前索引的值。
这样就创建了一个包含正确keys和values的子数组的数组，因此结果为`{ name: "Lydia", age: 22 }`。
