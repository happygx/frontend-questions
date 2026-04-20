---
level: 1.5
---

# 如何实现可过期的 localStorage 数据?

## 题目要点

- **存储数据**时，使用一个包含数据和过期时间戳的对象来保存。
- **读取数据**时，检查当前时间与存储的过期时间进行比较，决定是否返回数据或删除过期数据。

## 参考答案

实现可过期的 `localStorage` 数据，可以通过在存储数据时附加过期时间，并在读取数据时检查是否过期。

以下是一个简单的实现方法：

### **1. 存储数据**

在存储数据时，可以将数据和过期时间一起存储。在本例中，使用一个对象来保存数据和过期时间的时间戳。

#### **示例代码**

```javascript
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl, // ttl 是过期时间（以毫秒为单位）
  };
  localStorage.setItem(key, JSON.stringify(item));
}
```

读取数据时，需要检查数据是否已过期。如果数据已过期，则从 `localStorage` 中删除它，并返回 `null` 或其他标识过期的数据。

#### **示例代码**

```javascript
  const itemStr = localStorage.getItem(key);
  
  // 如果不存在数据，则直接返回 null
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  // 检查是否过期
  if (now.getTime() > item.expiry) {
    // 数据过期，删除数据
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}
```

#### **存储数据**

```javascript
setItemWithExpiry('myKey', 'myValue', 300000);
```

```javascript
console.log(value); // 如果未过期则输出 'myValue'，否则输出 null
```
