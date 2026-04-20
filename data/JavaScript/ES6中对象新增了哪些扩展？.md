---
level: 1.5
---

# ES6中对象新增了哪些扩展?

## 参考答案

## 一、属性的简写

ES6中，当对象键名与对应值名相等的时候，可以进行简写

```js

// 等同于
const baz = {foo}
```

```js
  method() {
    return "Hello!";
  }
};

// 等同于

const o = {
  method: function() {
    return "Hello!";
  }
}
```

```js
  const x = 1;
  const y = 10;
  return {x, y};
}

getPoint()
// {x:1, y:10}
```

```js
  f() {
    this.foo = 'bar';
  }
};

new obj.f() // 报错
```

ES6 允许字面量定义对象时，将表达式放在括号内

```js

const a = {
  'first word': 'hello',
  [lastWord]: 'world'
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"
```

```js
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.hello() // hi
```

```js
const foo = 'bar';
const bar = 'abc';
const baz = { [foo] };

// 正确
const foo = 'bar';
const baz = { [foo]: 'abc'};
```

```js
const keyB = {b: 2};

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};

myObject // Object {[object Object]: "valueB"}
```

`this`关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字`super`，指向当前对象的原型对象

```javascript
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto); // 为obj设置原型对象
obj.find() // "hello"
```

在解构赋值中，未被读取的可遍历的属性，分配到指定的对象上面

```js
x // 1
y // 2
z // { a: 3, b: 4 }
```

解构赋值是浅拷贝

```js
let { ...x } = obj;
obj.a.b = 2; // 修改obj里面a属性中键值
x.a.b // 2，影响到了结构出来x的值
```



## 五、属性的遍历

ES6 一共有 5 种方法可以遍历对象的属性。

- for...in：循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）

- Object.keys(obj)：返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名

- Object.getOwnPropertyNames(obj)：回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名

- Object.getOwnPropertySymbols(obj)：返回一个数组，包含对象自身的所有 Symbol 属性的键名

- Reflect.ownKeys(obj)：返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举

上述遍历，都遵守同样的属性遍历的次序规则：

- 首先遍历所有数值键，按照数值升序排列
- 其次遍历所有字符串键，按照加入时间升序排列
- 最后遍历所有 Symbol 键，按照加入时间升序排

```js
// ['2', '10', 'b', 'a', Symbol()]
```

关于对象新增的方法，分别有以下：

- Object.is()
- Object.assign()
- Object.getOwnPropertyDescriptors()
- Object.setPrototypeOf()，Object.getPrototypeOf()
- Object.keys()，Object.values()，Object.entries()
- Object.fromEntries()



### Object.is()

严格判断两个值是否相等，与严格比较运算符（===）的行为基本一致，不同之处只有两个：一是`+0`不等于`-0`，二是`NaN`等于自身

```js
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

`Object.assign()`方法用于对象的合并，将源对象`source`的所有可枚举属性，复制到目标对象`target`

`Object.assign()`方法的第一个参数是目标对象，后面的参数都是源对象

```javascript

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```



### Object.getOwnPropertyDescriptors()

返回指定对象所有自身属性（非继承属性）的描述对象

```js
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```

`Object.setPrototypeOf`方法用来设置一个对象的原型对象

```js

// 用法
const o = Object.setPrototypeOf({}, null);
```

用于读取一个对象的原型对象

```js
```

返回自身的（不含继承的）所有可遍历（enumerable）属性的键名的数组

```js
Object.keys(obj)
// ["foo", "baz"]
```

返回自身的（不含继承的）所有可遍历（enumerable）属性的键对应值的数组

```js
Object.values(obj)
// ["bar", 42]
```

返回一个对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对的数组

```js
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
```

用于将一个键值对数组转为对象

```js
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
```
