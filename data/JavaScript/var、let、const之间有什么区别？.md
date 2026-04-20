---
level: 1.5
---

# var、let、const之间有什么区别？

## 题目要点

可以从以下要点来阐述：

### 1. **声明提升（Hoisting）**

- **`var`**：变量声明会被提升到作用域的顶部，但赋值不会。即在变量声明之前可以访问到变量，但值为 `undefined`。
- **`let` 和 `const`**：声明不会被提升。变量在声明之前不可访问（会导致“暂时性死区”，Temporal Dead Zone）。

### 2. **作用域（Scope）**

- **`var`**：具有函数作用域（function scope），即仅在函数内有效，或者在全局作用域中。
- **`let` 和 `const`**：具有块级作用域（block scope），即在 `{}` 代码块内有效。

### 3. **变量重声明（Re-declaration）**

- **`var`**：可以在相同作用域内多次声明同名变量，不会报错。
- **`let` 和 `const`**：在相同作用域内不能重复声明同名变量，会报错。

### 4. **变量赋值（Re-assignment）**

- **`var`** 和 **`let`**：允许重新赋值，即可以改变变量的值。
- **`const`**：声明的变量不能被重新赋值，但需要注意，`const` 对象的内容（如数组或对象的属性）是可以修改的。

### 5. **初始化**

- **`var`**：可以在声明时不初始化，默认为 `undefined`。
- **`let` 和 `const`**：必须在声明时初始化，`const` 不能不初始化。

### 6. **全局对象属性（Global Object Property）**

- **`var`**：在全局作用域中声明的变量会成为全局对象的属性（在浏览器中是 `window` 对象）。
- **`let` 和 `const`**：在全局作用域中声明的变量不会成为全局对象的属性。

## 参考答案

## 一、var

在ES5中，顶层对象的属性和全局变量是等价的，用`var`声明的变量既是全局变量，也是顶层变量

注意：顶层对象，在浏览器环境指的是`window`对象，在 `Node` 指的是`global`对象

```js
console.log(window.a) // 10
```

```js
var a = 20
```

```js
console.log(a)
a = 20
```

```js
var a = 30
console.log(a) // 30
```

```js
function change(){
    var a = 30
}
change()
console.log(a) // 20 
```

```js
function change(){
   a = 30
}
change()
console.log(a) // 30 
```

`let`是`ES6`新增的命令，用来声明变量

用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块内有效

```js
    let a = 20
}
console.log(a) // ReferenceError: a is not defined.
```

```js
let a = 2
```

只要块级作用域内存在`let`命令，这个区域就不再受外部影响

```js
if (true) {
    a = 'abc' // ReferenceError
    let a;
}
```

最后，`let`不允许在相同作用域中重复声明

```js
let a = 30
// Uncaught SyntaxError: Identifier 'a' has already been declared
```

```js
{
    let a = 30
}
```

```js
  let arg;
}
func()
// Uncaught SyntaxError: Identifier 'arg' has already been declared
```

`const`声明一个只读的常量，一旦声明，常量的值就不能改变

```js
a = 3
// TypeError: Assignment to constant variable.
```

```js
// SyntaxError: Missing initializer in const declaration
```

```js
let b = 20
const a = 30
const b = 30
// 都会报错
```

对于简单类型的数据，值就保存在变量指向的那个内存地址，因此等同于常量

对于复杂类型的数据，变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的，并不能确保改变量的结构不变

```js

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

## 四、区别

`var`、`let`、`const`三者区别可以围绕下面五点展开：

- 变量提升
- 暂时性死区
- 块级作用域
- 重复声明
- 修改声明的变量
- 使用



### 变量提升

`var `声明的变量存在变量提升，即变量可以在声明之前调用，值为`undefined`

// 2023.4.25 更新

~~`let`和`const`不存在变量提升，即它们所声明的变量一定要在声明后使用，否则报错~~

let / const 不存在变量提升是不完全正确的，只能说由于暂时性死区的存在使得我们无法直观感受到变量提升的效果。

let 和 const 定义的变量都会被提升，但是不会被初始化，不能被引用，不会像var定义的变量那样，初始值为undefined。

当进入let变量的作用域时，会立即给它创建存储空间，但是不会对它进行初始化。

变量的赋值可以分为三个阶段：

* 创建变量，在内存中开辟空间
* 初始化变量，将变量初始化为undefined
* 真正赋值

关于let、var和const：
* let 的「创建」过程被提升了，但是初始化没有提升。
* var 的「创建」和「初始化」都被提升了。
* const 的「创建」「初始化」和「赋值」都被提升了。

```js
console.log(a)  // undefined
var a = 10

// let 
console.log(b)  // Cannot access 'b' before initialization
let b = 10

// const
console.log(c)  // Cannot access 'c' before initialization
const c = 10
```

`var`不存在暂时性死区

`let`和`const`存在暂时性死区，只有等到声明变量的那一行代码出现，才可以获取和使用该变量

```js
console.log(a)  // undefined
var a = 10

// let
console.log(b)  // Cannot access 'b' before initialization
let b = 10

// const
console.log(c)  // Cannot access 'c' before initialization
const c = 10
```

`var`不存在块级作用域

`let`和`const`存在块级作用域

```js
{
    var a = 20
}
console.log(a)  // 20

// let
{
    let b = 20
}
console.log(b)  // Uncaught ReferenceError: b is not defined

// const
{
    const c = 20
}
console.log(c)  // Uncaught ReferenceError: c is not defined
```

`var`允许重复声明变量

`let`和`const`在同一作用域不允许重复声明变量

```js
var a = 10
var a = 20 // 20

// let
let b = 10
let b = 20 // Identifier 'b' has already been declared

// const
const c = 10
const c = 20 // Identifier 'c' has already been declared
```

`var`和`let`可以

`const`声明一个只读的常量。一旦声明，常量的值就不能改变

```js
var a = 10
a = 20
console.log(a)  // 20

//let
let b = 10
b = 20
console.log(b)  // 20

// const
const c = 10
c = 20
console.log(c) // Uncaught TypeError: Assignment to constant variable
```
能用`const`的情况尽量使用`const`，其他情况下大多数使用`let`，避免使用`var`
