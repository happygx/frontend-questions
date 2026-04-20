---
level: 2
---

# JavaScript中的错误有哪几种类型？

## 题目要点

### Error

- **描述**：`Error` 是所有其他错误类型的基类。当开发者需要自定义错误时，通常会创建一个继承自 `Error` 的类。

### EvalError

- **描述**：当 `eval()` 函数被不当使用时（例如尝试调用 `new eval()` 或将 `eval` 重新赋值给其他变量）会抛出此错误。

### RangeError

- **描述**：当数值超出JavaScript允许的范围时抛出，例如尝试创建一个长度超过 `Array.MAX_LENGTH` 的数组，或者尝试将字符串转换为一个超出其数值范围的整数。

### ReferenceError

- **描述**：当尝试访问一个未声明或未定义的变量时抛出。例如，在变量声明之前就尝试使用它。

### SyntaxError

- **描述**：当JavaScript解析器遇到无效的语法时抛出。这通常发生在解析代码时，如果代码不符合JavaScript语法规则，则抛出此错误。

### TypeError

- **描述**：当尝试执行操作，但操作数或运算对象不是预期的类型时抛出。例如，尝试对一个非字符串对象调用 `.toUpperCase()`。

### URIError

- **描述**：当尝试使用 `encodeURI()` 或 `decodeURI()` 对不合法的URI字符串进行编码或解码时抛出。
这些错误类型为开发者提供了详细的错误信息，帮助他们定位和修复代码中的问题。正确地处理错误是编写健壮和可靠JavaScript代码的关键部分。

## 参考答案

## JavaScript中的错误类型

* Error
* EvalError
* RangeError
* ReferenceError
* SyntaxError
* TypeError
* URIError

### Error

`Error`是最基本的错误类型，其他的错误类型都继承自该类型。因此，所有错误的类型共享了一组相同的属性。 这个类型的错误很少见。一般使用开发人员自定义抛出的错误。

### EvalError

这个错误会在使用`eval()`函数发生异常时候抛出。两种情况会出错：

```js
eval = foo;
```
这个错误基本上不会遇到，因为`eval`函数本来用的就不多。不过需要注意的是，`eval`是一个关键字。

### RangeError

这个错误会在数值超出相应范围时触发。比如使用`new Array()`的时候传递一个负数或者是超过数组最大长度（4,294,967,295）的数，比如Number.MAX_VALUE，Number.MIN_VALUE。注意递归爆炸也有这个错误。

### ReferenceError

这个错误一般就是出现在变量找不到的情况，比如：
```js
Uncaught ReferenceError: b is not defined
```

### SyntaxError

当Javascript语言解析代码时,Javascript引擎发现了不符合语法规范的tokens或token顺序时抛出SyntaxError。

### TypeError

这个错误在JavaScript中是经常遇到的，不管是初学者还是老手。在变量中保存着以外的类型时，或者在访问不存在的方法时。都会导致这种错误。但是归根结底还是由于在执行特定于类型的操作时，变量的类型并不符合要求所致。比如：
```
a.style.widht = "10px";
```

### URIError

在使用encodeURI或者decodeURI因为URL格式不正确时，就会导致URIError错误。这种错误也很少见。
