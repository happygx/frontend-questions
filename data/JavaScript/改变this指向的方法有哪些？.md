---
level: 1
---

# 改变this指向的方法有哪些？

## 参考答案

有以下几种常用的方法可以改变`this`的指向：

1. 使用`bind()`方法：`bind()`方法会创建一个新的函数，并将其内部的`this`绑定到指定的对象。例如：

```javascript
  console.log("Hello, " + this.name);
}

const person = { name: "John" };
const boundFunction = sayHello.bind(person);
boundFunction(); // 输出: Hello, John
```

```javascript
  name: "Alice",
  sayHello: function() {
    setTimeout(() => {
      console.log("Hello, " + this.name);
    }, 1000);
  }
};

obj.sayHello(); // 输出: Hello, Alice
```

```javascript
  console.log("Hello, " + this.name);
}

const person = { name: "John" };
sayHello.call(person); // 输出: Hello, John

// 或者使用 apply()
sayHello.apply(person); // 输出: Hello, John
```
