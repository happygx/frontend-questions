---
level: 1
---

# JSON.stringify 遇到 bigint 的类型的数据，会怎么处理？

## 题目要点

`JSON.stringify()` 无法直接序列化 `BigInt` 类型的数据

## 参考答案

`JSON.stringify()` **无法直接序列化 `BigInt` 类型的数据**，如果遇到 `BigInt` 值，会**抛出异常**。

来看个例子：

```js
JSON.stringify(obj);
```

```
```

JSON 规范本身并 **不支持 `BigInt` 类型**，只支持以下几种数据类型：

* string
* number（普通数字）
* boolean
* null
* object
* array

而 `BigInt` 是 ES2020 新增的类型，不属于 JSON 的标准类型。

---

### 常见解决方案：

#### 1. 在序列化前手动转换为字符串

```js
const json = JSON.stringify(obj, (_, value) =>
  typeof value === 'bigint' ? value.toString() : value
);
console.log(json); // {"id":"123"}
```

```js
  /^\d+$/.test(value) ? BigInt(value) : value
);
console.log(parsed.id); // 123n
```

像 `json-bigint` 这样的库可以支持 `BigInt` 的序列化与反序列化：

```bash
```

```js
const obj = { id: 123n };

const str = JSONbig.stringify(obj);
console.log(str); // {"id":123}

const parsed = JSONbig.parse(str);
console.log(parsed.id); // 123n
```
