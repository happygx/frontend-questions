---
level: 4
---

# 说说你对 Iterator, Generator 和 Async/Await 的理解

## 题目要点

#### Iterator

- **定义**：Iterator 是一个简单的循环接口，用于支持 `for...of` 循环遍历数据。
- **特点**：任何实现了 Iterator 接口的数据都可以被 `for...of` 循环遍历。
- **适用场景**：适用于任何需要循环遍历数据的情况。

#### Generator

- **定义**：Generator 是一种特殊的函数，可以暂停和继续执行，类似于状态机。
- **特点**：可以实现 Iterator 的功能，并且由于可以保存上下文，适合实现简单的状态机。
- **适用场景**：适合需要流程控制和状态管理的情况，尤其是需要进行异步操作时。

#### Async/Await

- **定义**：Async/Await 是 Generator 进行异步操作的语法糖。
- **特点**：通过 `async` 关键字和 `await` 关键字，使得异步代码的编写更加直观和易于理解。
- **适用场景**：适用于任何需要异步操作的情况，是目前最广泛使用的异步编程方式。

## 参考答案

这里重点理解他们三者分别是什么，有什么区别，以及分别适用什么场景

# Iterator

Iterator是最简单最好理解的。

简单的说，我们常用的 `for of` 循环，都是通过调用被循环对象的一个特殊函数 `Iterator` 来实现的，但是以前这个函数是隐藏的我们无法访问， 从 `Symbol` 引入之后，我们就可以通过 `Symbol.iterator` 来直接读写这个特殊函数。

对于循环语句来说，他并不关心被循环的对象到底是什么，他只负责调用 `data[Symbol.iterator]` 函数，然后根据返回值来进行循环。所以任何对象只要提供了标准的 Iterator 接口即可被循环，比如我们现在来创造一个自定义的数据：

```
students[Symbol.iterator] = function() {
  let index = 1;
  return { next() {
    return {done: index>100, value: index++} }
  }
}

for(var i of students) { console.log(i); }
```

# Generator 基本语法

Generator 是ES6引入的新语法，Generator是一个可以暂停和继续执行的函数。简单的用法，可以当做一个Iterator来用，进行一些遍历操作。复杂一些的用法，他可以在内部保存一些状态，成为一个状态机。

Generator 基本语法包含两部分：
* 函数名前要加一个星号
* 函数内部用 `yield` 关键字返回值

下面是一个简单的示例：

```js
  yield 1
  yield 2
  return 3
}
var c = count()
console.log(c.next()) // { value: 1, done: false }
console.log(c.next()) // { value: 2, done: false }
console.log(c.next()) // { value: 3, done: true }
console.log(c.next()) // { value: undefined, done: true }
```

```js
  yield 1
  yield 2
  return 3
}
var c = count()
for (i of c) console.log(i) // 1, 2
```

另外 `yeild*` 语法可以用来在 `Generator` 中调用另一个 `Generator`，参见 [yield* MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield%2A)

# Generator VS Iterator

Generator 可以看做是一个更加灵活的 `Iterator` ，他们之间是可以互相替代的，但是， `Generator` 由于可以通过 `yield` 随时暂停，因此可以很方便进行流程控制和状态管理，而 `Iterator` 就可能需要你写更多的代码进行相同的操作：

比如 Stack Overflow 上的这个中序遍历代码：

```js
    if (node == null) return;
    yield* traverseTree(node.left);
    yield node.value;
    yield* traverseTree(node.right);
}
```

Generator 也是实现简单的状态机的最佳选择，因为他是在函数内部进行 `yield` 操作，因此不会丢失当前状态：

```js
  yield 'tick'
  yield 'tock'
}
```

```js
function clock() {
  tick = !tick
  return tick ? 'tick' : 'tock'
}
```

```js

function clock() {
  return regeneratorRuntime.wrap(function clock$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'tick';

        case 2:
          _context.next = 4;
          return 'tock';

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}
```

# Generator 异步操作

Generator 的设计，可以很方便执行异步操作，现在我们需要写一个小函数，可以取到用户信息然后打印出来，我们用generator来写就是这样的：

```js
  const user = yield ajax()
  console.log(user)
}
```

```js
```

```js
  const user = yield ajax()
  console.log(user)
}

const f = fetchUser()

// 加入的控制代码
const result = f.next()
result.value.then((d) => {
  f.next(d)
})
```

# Async/Await

我最开始接触到 Async/Await 的时候把它当成了一个 `promise` 的语法糖，但是经过我们对 `Generator` 的理解后，明白了其实他就是 `Generator` 的一个语法糖：

* `async` 对应的是 `*`
* `await` 对应的是 `yield`

他只是自动帮我们进行了 `Generator` 的流程控制而已。

和上面的获取用户信息实现一样的功能的话，基本语法如下：

```js
  const user = await ajax()
  console.log(user)
}
```

如果有兴趣的话，可以参考一下 `Babel` 是如何编译 `Async/Await` 的，简单的说，代码分成了两部分，一部分是编译了一个 `Generator`，另一部分是通过 promise 实现了generator的流程控制。

对于如下代码：

```js
  let a = await 1;
  let b = await 2;
  return a+b
}
```

```js
  // 下面这部分是 generator 的一个实现
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var a, b;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return 1;

            // 省略...
        }
      }
    }, _callee, this);
  }));

  return function count() {
    return _ref.apply(this, arguments);
  };
}();

// 下面这部分是用 promise 实现了流程控制。
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
```

# async/await 并发

我们的代码在执行到await的时候会等待结果返回才执行下一行，这样如果我们有很多需要异步执行的操作就会变成一个串行的流程，可能会导致非常慢。

比如如下代码，我们需要遍历获取redis中存储的100个用户的信息：

```js
for (var i=0;i<ids.length;i++) {
  users.push(await db.get(ids))
}
```

```js
```

* `Iterator` 是一个循环接口，任何实现了此接口的数据都可以被 `for of` 循环遍历
* `Generator` 是一个可以暂停和继续执行的函数，他可以完全实现 `Iterator` 的功能，并且由于可以保存上下文，他非常适合实现简单的状态机。另外通过一些流程控制代码的配合，可以比较容易进行异步操作。
* `Async/Await` 就是generator进行异步操作的语法糖。而这个语法糖反而是被使用最广泛的，比如著名的 `Koa`
