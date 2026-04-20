---
level: 2
---

# 如何通过bind或箭头函数固定this指向？

## 题目要点

| 特点        | `bind`              | 箭头函数              |
| --------- | ------------------- | ----------------- |
| 绑定时机      | 调用 `bind` 时固定       | 定义时词法绑定           |
| 返回结果      | 返回一个新的函数            | 不生成新的 `this`      |
| 使用场景      | 需要显式传递 `this` 或预设参数 | 需要保持外层作用域的 `this` |
| 是否可作为构造函数 | 可以                  | 不可以               |

## 参考答案

## 一、问题背景

在 JavaScript 中，`this` 的指向不是在函数定义时确定的，而是 **在函数执行时，由调用方式决定**。
因此，很多情况下我们需要“固定”`this`，保证函数执行时内部的 `this` 始终指向期望的对象。

## 二、使用 **bind** 固定 `this`

`Function.prototype.bind` 会返回一个新的函数，**无论后续如何调用，内部的 `this` 都会固定为指定对象**。

### 示例

```js
  name: "Alice",
  sayHi: function() {
    console.log("Hi, I am " + this.name);
  }
};

const fn = obj.sayHi;
fn(); // 输出: Hi, I am undefined (this丢失)

const boundFn = obj.sayHi.bind(obj);
boundFn(); // 输出: Hi, I am Alice
```

1. `bind` 返回一个新的函数，不会立即执行。
2. 绑定的 `this` 一旦确定，无法再被更改。
3. 还可以 **预设参数**，形成偏函数。

   ```js
   function add(a, b) {
     return a + b;
   }
   const add5 = add.bind(null, 5);
   console.log(add5(3)); // 8
   ```

---

## 三、使用 **箭头函数** 固定 `this`

箭头函数没有自己的 `this`，**它的 `this` 来自定义时所在的词法作用域**。

### 示例

```js
  name: "Alice",
  sayHi: function() {
    const inner = () => {
      console.log("Hi, I am " + this.name);
    };
    inner();
  }
};

obj.sayHi(); // 输出: Hi, I am Alice
```

1. 箭头函数不会创建自己的 `this`，直接用外层函数的 `this`。
2. 不能用作构造函数（不能 `new`）。
3. 常用于 **回调函数** 或 **事件监听器**，避免丢失 `this`。
