---
level: 1
---

# 写一个 repeat 方法，实现字符串的复制拼接

## 参考答案

实现的方法有很多，以下介绍几种。

## 方法一

空数组 join

```js
  return (new Array(n + 1)).join(target);
}
```

改良方法1，省去创建数组这一步，提高性能。之所以创建一个带 length 属性的对象，是因为要调用数组的原型方法，需要指定 call 第一个参数为类数组对象。

```js
  return Array.prototype.join.call({
    length: n + 1
  }, target);
}
```

改良方法 2，利用闭包缓存 join，避免重复创建对象、寻找方法。

```js
  var join = Array.prototype.join, obj = {};
  return function(target, n) {
    obj.length = n + 1;
    return join.call(obj, target);
  };
})();
```

使用二分法，减少操作次数

```js
  var s = target, total = [];
  while (n > 0) {
    if (n % 2 === 1) {
      total[total.length] = s;
    }
    if (n === 1) {
      break;
    }

    s += s;
    n = n >> 1; // Math.floor(n / 2);
  }
  return total.join('');
}
```

方法 4 的变种，免去创建数组与使用 join。缺点是循环中创建的字符串比要求的长。

```js
  var s = target, c = s.length * n;
  do {
    s += s;
  } while (n = n >> 1)
  s = s.substring(0, c);
  return s;
}
```

方法 4 的改良。

```js
  var s = target, total = "";
  while (n > 0) {
    if (n % 2 === 1) {
      total += s;
    }
    if (n === 1) {
      break;
    }
    s += s;
    n = n >> 1;
  }
  return total;
}
```

与 6 相近，不过递归在浏览器中有优化。

```js
  if (n === 1) {
    return target;
  }
  var s = repeat(target, Math.floor(n / 2));
  s += s;
  if (n % 2) {
    s += target;
  }
  return s;
}
```

一则反例，很慢，但是可行。

```js
  return (n <= 0) ? "" : target.concat(repeat(target, --n));
}
```

```js
  String.prototype.repeat = function(count) {
    'use strict';
    if (this == null)
      throw new TypeError('can\'t convert ' + this + ' to object');

    var str = '' + this;
    // To convert string to integer.
    count = +count;
    // Check NaN
    if (count != count)
      count = 0;

    if (count < 0)
      throw new RangeError('repeat count must be non-negative');

    if (count == Infinity)
      throw new RangeError('repeat count must be less than infinity');

    count = Math.floor(count);
    if (str.length == 0 || count == 0)
      return '';

    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    if (str.length * count >= 1 << 28)
      throw new RangeError('repeat count must not overflow maximum string size');

    var maxCount = str.length * count;
    count = Math.floor(Math.log(count) / Math.log(2));
    while (count) {
       str += str;
       count--;
    }
    str += str.substring(0, maxCount - str.length);
    return str;
  }
}
```
