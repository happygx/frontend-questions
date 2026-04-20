---
level: 3
---

# 实现lodash的set和get方法

## 参考答案

* `set` 方法可以根据提供的路径（以点分隔）设置对象的值，如果路径上的嵌套对象不存在，则会递归创建。
* `get` 方法会根据提供的路径获取对象中的值，如果路径上的某个键不存在或对象中断，返回 `undefined`。

下面是提供的参考：

```javascript
  const keys = path.split('.');
  let current = object;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      // Create nested objects if the key doesn't exist
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
}

function get(object, path) {
  const keys = path.split('.');
  let current = object;

  for (const key of keys) {
    if (typeof current !== 'object' || !(key in current)) {
      return undefined;
    }
    current = current[key];
  }

  return current;
}
```

```javascript
  foo: {
    bar: {
      baz: 'Hello, World!'
    }
  }
};

set(obj, 'foo.bar.baz', 'New Value');
console.log(get(obj, 'foo.bar.baz')); // Output: New Value

console.log(get(obj, 'foo.bar.qux')); // Output: undefined
```
