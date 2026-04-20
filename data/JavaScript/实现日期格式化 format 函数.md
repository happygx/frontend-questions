---
level: 1
---

# 实现日期格式化 format 函数

## 参考答案

```ts
//
// YYYY 对应年
// MM 对应月
// DD 对应日
//
// HH 对应 24 小时制度
// hh 对应 12 小时制度
// mm 对应分钟
// ss 对应秒

const date = new Date();
const formattedDate = date.format('YYYY-MM-DD HH:mm:ss');
console.log(formattedDate); // 输出结果为当前日期和时间的格式化字符串
```

```javascript
Date.prototype.format = function (format) {
  const date = this;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  format = format.replace('YYYY', year);
  format = format.replace('MM', month.toString().padStart(2, '0'));
  format = format.replace('DD', day.toString().padStart(2, '0'));
  format = format.replace('HH', hours.toString().padStart(2, '0'));
  format = format.replace('hh', (hours % 12).toString().padStart(2, '0'));
  format = format.replace('mm', minutes.toString().padStart(2, '0'));
  format = format.replace('ss', seconds.toString().padStart(2, '0'));

  return format;
};

// 示例用法
const date = new Date();
const formattedDate = date.format('YYYY-MM-DD HH:mm:ss');
console.log(formattedDate); // 输出结果为当前日期和时间的格式化字符串
```
