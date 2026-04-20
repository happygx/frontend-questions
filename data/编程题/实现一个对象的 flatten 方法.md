---
level: 3
---

# 实现一个对象的 flatten 方法

## 参考答案

从结果入手，可以看出需要对象进行遍历，把里面的属性值依次输出。

核心方法体就是：传入对象的 key 值和 value，对 value 再进行递归遍历。

而 js 的数据类型可以分为`基础数据类型`和`引用数据类型`，对于题目而言，基础数据类型无需再进行深层次遍历，引用数据类型需要再次进行递归。

```js
  for (let [k, v] of Object.entries(obj)) { 
    if (Array.isArray(v)) { 
      let tmp = isArray ? key + "[" + k + "]" : key + k 
      flat(v, tmp, res, true) 
    } else if (typeof v === "object") { 
      let tmp = isArray ? key + "[" + k + "]." : key + k + "." 
      flat(v, tmp, res) 
    } else { 
      let tmp = isArray ? key + "[" + k + "]" : key + k 
      res[tmp] = v 
    } 
  } 
  return res 
}
```

```js
  const res = {}
  function flat(item , preKey = ''){
    Object.entries(item).forEach(([key,value]) => {
      let newKey = key
      if (Array.isArray(item)){
        // console.log('是数组')
        newKey = preKey ? `${preKey}[${key}]` : key
      }else{
        newKey = preKey ? `${preKey}.${key}` : key
      }
      if (value && typeof value === 'object'){
        flat(value , newKey)
      }else{
        res[newKey] = value
      }
    })
  }
  flat(obj)
  return res
}

const source = { a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } }
console.log(objectFlat(source));
const obj = {
  a: 1,
  b: [1, 2, { c: true }],
  c: { e: 2, f: 3 },
  g: null,
};
console.log(objectFlat(obj));
```
