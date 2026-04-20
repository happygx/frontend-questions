---
level: 4
---

# 说说你的ES6-ES12的了解

## 题目要点

### ES6（2015）

1. **类（class）**：允许开发者使用类来定义对象的属性和方法。
2. **模块化（ES Module）**：允许开发者将代码分割成多个文件，并按需导入导出。
3. **箭头（Arrow）函数**：简化函数的写法，允许更简洁的匿名函数。
4. **函数参数默认值**：为函数参数设置默认值。
5. **模板字符串**：使用反引号（`）创建多行字符串，并允许在字符串中嵌入变量。
6. **解构赋值**：从数组或对象中提取值，赋给多个变量。
7. **延展操作符**：将数组或对象扩展为另一个数组或对象。
8. **对象属性简写**：在对象字面量中，简化属性的写法。
9. **Promise**：用于处理异步操作的结果。
10. **let和const**：引入了块级作用域的变量声明。

### ES7（2016）

1. **Array.prototype.includes()**：检查数组是否包含某个值。
2. **指数操作符**：允许使用**运算符快速计算指数。

### ES8（2017）

1. **async/await**：异步编程的终极解决方案，使异步代码看起来像是同步代码。
2. **Object.values()**：返回一个给定对象自身可枚举属性值的数组。
3. **Object.entries()**：返回一个给定对象自身可枚举属性的键值对数组。
4. **String padding**：允许在字符串的开始或结束添加空格或其他字符。
5. **函数参数列表结尾允许逗号**：允许在函数参数列表末尾添加逗号。
6. **Object.getOwnPropertyDescriptors()**：获取一个对象的所有自身属性的描述符。
7. **SharedArrayBuffer对象**：表示一个通用的，固定长度的原始二进制数据缓冲区。
8. **Atomics对象**：提供了一组静态方法用来对SharedArrayBuffer对象进行原子操作。

### ES9（2018）

1. **异步迭代**：await可以和for...of循环一起使用，以串行的方式运行异步操作。
2. **Promise.finally()**：Promise.finally()方法返回一个Promise，它在执行完成时都会执行，无论结果是fulfilled还是rejected。
3. **Rest/Spread 属性**：允许属性名作为字符串来访问对象属性。
4. **正则表达式命名捕获组**：允许给正则表达式中的捕获组命名。
5. **正则表达式反向断言**：允许在正则表达式中指定字符串的位置。
6. **正则表达式dotAll模式**：允许点.匹配任意字符，包括换行符。

### ES10（2019）

1. **Array.flat()和Array.flatMap()**：用于将嵌套数组展平为一维数组。
2. **String.trimStart()和String.trimEnd()**：去除字符串首尾空白字符。
3. **String.prototype.matchAll**：返回一个迭代器，可以匹配所有匹配项。
4. **Symbol.prototype.description**：获取Symbol对象的可选描述的字符串。
5. **Object.fromEntries()**：返回一个给定对象自身可枚举属性的键值对数组。
6. **可选 Catch**：在try...catch语句中，允许省略catch块的参数。

### ES11（2020）

1. **Nullish coalescing Operator（空值处理）**：在左侧运算符为null或undefined时，返回右侧的表达式。
2. **Optional chaining（可选链）**：通过点号（.）来访问对象和数组，并在访问失败时返回undefined。
3. **Promise.allSettled**：返回一个在所有给定的promise已被决议或被拒绝后决议的promise。
4. **import()**：按需导入模块。
5. **新基本数据类型

## 参考答案

### ES6（2015）

#### 1\. 类（class）

```bash
  constructor(name) {
    this.name = '小豪';
  }
  console() {
    console.log(this.name);
  }
}
const man = new Man('小豪');
man.console(); // 小豪
```

```bash
export const sub = (a, b) => a + b;
// 模块 B 导入使用
import { sub } from './A';
console.log(sub(1, 2)); // 3
```

```bash
func(1, 2); // 3
```

```bash
```

```bash
const str = `Your name is ${name}`;
```

```bash
[a, b] = [b, a]; // a 2  b 1
```

```bash
```

```bash
const obj = { name };
```

```bash
console.log(1);
// 先打印 1 ，再打印 2
```

```bash
const arr = [];
```

#### 1\. Array.prototype.includes()

```bash
```

```bash
```

#### 1\. async/await

异步终极解决方案

```bash
    const res = await api.getTableData(); // await 异步任务
    // do something    
}
```

```bash
```

```bash
```

```bash
'hello'.padStart(10); // "     hello"
// padEnd
'hello'.padEnd(10) "hello     "
```

#### 6\. Object.getOwnPropertyDescriptors()

> 获取一个对象的所有自身属性的描述符,如果没有任何自身属性，则返回空对象。

#### 7\. SharedArrayBuffer对象

> SharedArrayBuffer 对象用来表示一个通用的，固定长度的原始二进制数据缓冲区，

```bash
 * 
 * @param {*} length 所创建的数组缓冲区的大小，以字节(byte)为单位。  
 * @returns {SharedArrayBuffer} 一个大小指定的新 SharedArrayBuffer 对象。其内容被初始化为 0。
 */
new SharedArrayBuffer(10)
```

> Atomics 对象提供了一组静态方法用来对 SharedArrayBuffer 对象进行原子操作。

### ES9（2018）

#### 1\. 异步迭代

await可以和for...of循环一起使用，以串行的方式运行异步操作

```bash
  for await (let i of array) {
    // doSomething(i);
  }
}
```

```bash
```

```bash
console.log( Math.max(...values) ); // 6
```

```bash
const match = reg.exec('2021-02-23');
```

```bash
(?!p)、(?<!p>) 除了 p 前面(位置)、除了 p 后面(位置)
```

> 正则表达式中点.匹配除回车外的任何单字符，标记s改变这种行为，允许行终止符的出现

```bash
```

#### 1\. Array.flat()和Array.flatMap()

flat()

```bash
```

```bash
```

去除字符串首尾空白字符

#### 3\. String.prototype.matchAll

> matchAll（）为所有匹配的匹配对象返回一个迭代器

```bash
const arr = [...raw_arr];
```

> 只读属性，回 Symbol 对象的可选描述的字符串。

```bash
```

> 返回一个给定对象自身可枚举属性的键值对数组

```bash
const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
console.log(Object.fromEntries(map)); // { foo: "bar", baz: 42 }
```

### ES11（2020）

#### 1\. Nullish coalescing Operator(空值处理)

表达式在 ?? 的左侧 运算符求值为undefined或null，返回其右侧。

```bash
    u1: 0,
    u2: false,
    u3: null,
    u4: undefined
    u5: '',
}
let u2 = user.u2 ?? '用户2'  // false
let u3 = user.u3 ?? '用户3'  // 用户3
let u4 = user.u4 ?? '用户4'  // 用户4
let u5 = user.u5 ?? '用户5'  // ''
```

?.用户检测不确定的中间节点

```bash
let u1 = user.childer.name // TypeError: Cannot read property 'name' of undefined
let u1 = user.childer?.name // undefined
```

> 返回一个在所有给定的promise已被决议或被拒绝后决议的promise，并带有一个对象数组，每个对象表示对应的promise结果

```bash
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => reject('我是失败的Promise_1'));
const promise4 = new Promise((resolve, reject) => reject('我是失败的Promise_2'));
const promiseList = [promise1,promise2,promise3, promise4]
Promise.allSettled(promiseList)
.then(values=>{
  console.log(values)
});
```

按需导入

#### 5\. 新基本数据类型BigInt

> 任意精度的整数

#### 6\. globalThis

-   浏览器：window
-   worker：self
-   node：global

### ES12（2021）

#### 1\. replaceAll

> 返回一个全新的字符串，所有符合匹配规则的字符都将被替换掉

```bash
str.replaceAll('l', ''); // "heo word"
```

> Promise.any() 接收一个Promise可迭代对象，只要其中的一个 promise 成功，就返回那个已经成功的 promise 。如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），就返回一个失败的 promise

```bash
const promise2 = new Promise((resolve, reject) => reject('我是失败的Promise_2'));
const promiseList = [promise1, promise2];
Promise.any(promiseList)
.then(values=>{
  console.log(values);
})
.catch(e=>{
  console.log(e);
});
```

> 使用WeakRefs的Class类创建对对象的弱引用(对对象的弱引用是指当该对象应该被GC回收时不会阻止GC的回收行为)

#### 4\. 逻辑运算符和赋值表达式

> 逻辑运算符和赋值表达式，新特性结合了逻辑运算符（&&，||，??）和赋值表达式而JavaScript已存在的 复合赋值运算符有：

```bash
//等价于
a = a || (a = b)

a &&= b
//等价于
a = a && (a = b)

a ??= b
//等价于
a = a ?? (a = b)
```

> 数字分隔符，可以在数字之间创建可视化分隔符，通过\_下划线来分割数字，使数字更具可读性

```bash
//等价于
const money = 1000000000;

1_000_000_000 === 1000000000; // true
```
