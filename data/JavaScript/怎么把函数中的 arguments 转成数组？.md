---
level: 1
---

# 怎么把函数中的 arguments 转成数组？

## 题目要点

### 转换 `arguments` 为数组的几种方法

#### 1. 调用数组的原型方法

通过 `Array.prototype.slice.call(arguments)`，可以借用数组的 `slice` 方法将 `arguments` 转换为数组。

```js
  var arr = Array.prototype.slice.call(arguments);
  console.log(arr); // [1, 2]
};
foo(1, 2);
```

`Array.from()` 是 ES6 中新增的方法，用于将类数组对象转换为真正的数组。

```js
  var arr = Array.from(arguments);
  console.log(arr); // [1, 2]
};
foo(1, 2);
```

通过 `for` 循环遍历 `arguments` 对象，并将每个元素添加到新数组中。

```js
  var args = [];
  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  return args;
}
```

ES6 引入了 rest 参数，允许我们将不定数量的参数表示为一个数组。

```js
console.log(a(1, 2)); // [1, 2]
```

## 参考答案

函数中的 arguments 是一个对象，不是一个数组，严格来说它是一个类数组对象。

## 1、调用数组的原型方法来转换

```js
	var arr = Array.prototype.slice.call(arguments);
	console.log(arr)
}
foo(1,2) //(2) [1, 2]
```

`Array.from` 方法用于将两类对象转为真正的数组：类似数组的对象和可遍历对象（包括Set和Map）。

```js
	var arr = Array.from(arguments);
	console.log(arr)
}
foo(1,2) // (2) [1, 2]
```

使用 for 循环挨个将 arguments 对象中的内容复制给新数组中

```js
    var args = []; 
    for (var i = 1; i < arguments.length; i++) { 
        args.push(arguments[i]); 
    } 
    return args;
}
```

```js
```
