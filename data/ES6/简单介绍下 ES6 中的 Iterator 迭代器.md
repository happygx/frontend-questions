---
level: 3
---

# 简单介绍下 ES6 中的 Iterator 迭代器

## 题目要点

### Iterator 迭代器的作用

- **定义**：Iterator 迭代器是为了解决不同数据结构遍历问题而设计的，它提供了一个统一的访问机制。
- **数据结构**：目前 Map、Set、Array 都支持 Iterator。
- **接口**：迭代器提供了一个统一的接口，使得不同数据结构的遍历方式一致。
- **for...of 依赖**：for...of 循环依赖于 Iterator 迭代器来实现遍历。

### Iterator 规范

- **规范定义**：Iterator 规范定义了迭代器必须有一个 `next()` 方法。
- **next 方法返回**：`next()` 方法调用时，返回一个包含 `value` 和 `done` 属性的对象。
- **可迭代对象**：要成为可迭代对象，一个对象必须实现 `@@iterator` 方法，该方法可以通过 `Symbol.iterator` 访问。
- **应用场景**：通过定义一个对象的 `Symbol.iterator` 属性，可以将其修改为迭代器对象，支持 `for...of` 遍历。

### 总结

- Iterator 迭代器提供了一个统一的接口，为不同的数据结构提供了统一的访问机制。
- 通过定义对象的 `Symbol.iterator` 属性，可以使其成为可迭代对象，支持 `for...of` 遍历。
- Iterator 规范定义了迭代器必须有一个 `next()` 方法，该方法返回包含 `value` 和 `done` 属性的对象。

## 参考答案

想必大家使用过for循环、while循环等，遍历Array获取其中的值，那其他数据结构如何通过遍历获取呢？或者这样说，是否可以提供一个统一的访问机制？来访问Object、Map、Set等。

轮到Iterator迭代器出场，Iterator迭代器就是为了解决这个问题，它提供统一的接口，为不同的数据结构提供统一的访问机制。(目前Map、Set、Array支持Iterator)。

顾名思义，Iterator迭代器的出现就是为了迭代而生，为不同的集合：Object、Array、Map、Set，提供了一个统一的接口（这里接口可以简单的理解为方法，就是遍历方法）。像我们常用的for...of就是依赖与Iterator迭代器。

在这里顺便提一嘴，我理解到的遍历、迭代的关系：遍历就是访问数据结构的所有元素，而迭代是遍历的一种形式。

```javascript
// 模拟next方法返回值
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true}
    }
  }
}
```

通过调用next函数，返回value和done两个属性；value属性返回当前位置的成员，done属性是一个布尔值，表示遍历是否结束，即是否还有必要再一次调用next方法；当done为true时，即遍历完成。

小结：Iterator迭代器就是一个接口方法，它为不同的数据结构提供了一个统一的访问机制；使得数据结构的成员能够按某种次序排列，并逐个被访问。

## Iterator规范

在上面的代码中，迭代器对象it包含一个next() 方法，调用next()方法，返回两个属性：布尔值done和值value，value的类型无限制。

迭代器对象包含的属性我们知道了，那么在日常开发中，我们如何让一个对象成为一个可迭代对象呢？（可迭代对象即支持迭代器规范的对象）

要成为可迭代对象， 一个对象必须实现@@iterator方法。这意味着对象（或者它原型链上的某个对象）必须有一个键为@@iterator的属性，可通过常量 Symbol.iterator 访问该属性。

```javascript
    a: 1,
    b: 2,
    c: 3
}
myIterable[Symbol.iterator] = function() {
  let self = this;
  let arr = Object.keys(self);
  let index = 0;
  return {
    next() {
      return index < arr.length ? {value: self[arr[index++]], done: false} : {value: undefined, done: true};
    }
  }
}

var it = myIterable[Symbol.iterator]();

it.next();

for(const i of myIterable) {
  console.log(i);
}
```

小结：Iterator规范————Iterator迭代器包含一个next()方法，方法调用返回返回两个属性：done和value；通过定义一个对象的Symbol.iterator属性，即可将此对象修改为迭代器对象，支持for...of遍历。
