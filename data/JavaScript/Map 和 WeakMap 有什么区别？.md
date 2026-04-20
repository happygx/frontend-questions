---
level: 2.5
---

# Map 和 WeakMap 有什么区别？

## 题目要点

#### Map

1. **键值对集合**：Map 是一个键值对的集合，不同于传统对象，其键可以不是字符串，可以是任何类型的值。
2. **优势**：
   - 键类型灵活：可以是非字符串类型。
   - 键值对个数可轻松获取：通过 `size` 属性。
   - 性能优势：在频繁增删键值对的场景下，性能优于传统对象。
3. **适用场景**：
   - 键名和对象默认键名冲突。
   - 需要使用非字符串类型作为键。
   - 需要计算键值对数量。
   - 频繁增删键值对。

#### WeakMap

1. **弱引用键**：WeakMap 的键是弱引用，意味着如果一个对象没有其他引用，那么这个键值对会自动从 WeakMap 中移除。
2. **特性**：
   - 只接受对象作为键：不能使用其他类型的值作为键。
   - 不可遍历：因为键值对的个数可能随垃圾回收机制的变化而变化。
3. **适用场景**：
   - 当某个对象的引用需要在其他地方被释放时，使用 WeakMap 可以避免内存泄漏。
   - 存储DOM节点时，使用 WeakMap 可以让这些节点在不再需要时被自动回收。

#### Map 和 WeakMap 区别

- **键的类型**：Map 的键可以是任意类型，WeakMap 只接受对象作为键。
- **键的引用强度**：Map 的键是强引用，WeakMap 的键是弱引用。
- **遍历能力**：Map 可以被遍历，WeakMap 不能被遍历。

## 参考答案

### Map

##### 1.传统对象结构
Map本质上是一个键值对的集合。和传统对象结构相比，传统对象只能用字符串作为键名，这在使用上造成了很大的限制。

```javascript
//element为节点对象
const element = document.querySelector('.node')
console.log(element)  //输出div.node对象
console.log(element.toString())
//用点操作符不能有空格，所以采用中括号的形式给对象赋值
data[element] = 'objectData'
//输出objectData，说明在对象中存在[object HTMLDivElement]键名
console.log(data['[object HTMLDivElement]'])

```

上面的代码证明了传统对象的键名会通过toString方法转化为字符串类型

注意：在我们访问对象成员的时，键名有空格时不能采用点访问，例如data.ab c
这是错误的。我们可以用data['ab c']的形式访问

##### 2.Map结构

Map类似于对象，但是键名不限于字符串，可以说Object结构提供键值对应，Map提供值值对应，因此采用Map结构会优于传统对象。

```javascript
const element = document.querySelector('.node')
dataMap.set(element,'objectData')
console.log(dataMap.get(element))
console.log(dataMap)
```

##### 3.Map的特点

1. Map默认情况下不包含任何键，所有键都是自己添加进去的。不同于Object原型链上有一写默认的键。
2. Map的键可以时任何类型数据，就连函数都可以。
3. Map的键值对个数可以轻易通过size属性获取，Object需要手动计算。
4. Map在频繁增删键值对的场景下性能比Object更好。

##### 4.什么时候用Map

1. 想要添加的键值名和Object上的默认键值名冲突，又不想改名，用Map。
2. 需要String和Symbol以外的数据类型做键值时，用Map。
3. 键值对很多，有时需要计算数量，用Map。
4. 需要频繁地增删键值对时，用Map。

### WeakMap
#### 什么是WeakMap

WeakMap是ES6中新增的一种集合类型，叫做'弱映射'。它和Map是兄弟关系，与Map的区别在于这个弱字，API还是Map那套API

#### WeakMap的特性

##### 1. WeakMap只能将对象作为键名
只接受对象作为键名(null除外)，不接受其它类型的值作为键名。

##### 2.WeakMap的键名引用的对象是弱引用

首先我们需要知道什么是强引用什么是弱引用

**强引用**

```javascript
const e2 = document.getElementById('bar')
const arr = [
    [e1,'foo'],
    [e2,'bar'],
];
```

```javascript
arr[1] = null;
```

是指不能确保其引用的对象不会被垃圾回收器回收的引用。一个对象若只被弱引用所引用，则被认为是不可访问的，并因此可能在任何时刻被回收。

也就是说当我们创建一个弱引用的对象时，我们就可以静静地等待其被垃圾回收器回收。

总的来说，局势WeakMap保持了对键名所引用对象的弱引用，即垃圾回收机制不将该引用考虑在内。只要所引用的对象的其它引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap里面的键名对象和所对应的键值对会自动消失，不需要手动删除引用。

##### 3.不可遍历

正因为WeakMap对键名引用的对象是弱引用关系 ，因此WeakMap内部成员是会取决于垃圾回收机制有没有执行，运行前后成员个数很可能是不一样的，而垃圾回收机制的执行又是不可预测的，因此不可遍历。

## Map和WeakMap区别

- Map的键可以是任意类型，WeakMap只接受对象作为键，不接受其它类型的值作为键
- Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键；WeakMap的键是弱引用，键所指向的对象是可以被垃圾回收，此时键是无效的。
- Map可以被遍历，WeakMap不能被遍历
