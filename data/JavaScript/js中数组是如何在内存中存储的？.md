---
level: 3.5
---

# js中数组是如何在内存中存储的？

## 题目要点

在JavaScript中，数组是一种特殊的对象，用于存储一系列的值。数组的内部实现细节由JavaScript引擎（如V8）决定

### 数组在内存中的存储

1. **对象基础**：在JavaScript中，数组和其他对象一样，都是对象。数组对象有一个特殊的键，即索引，它是一个整数。
2. **存储方式**：数组的值可以通过索引直接访问，这通常意味着它们是按照索引顺序存储在内存中的。但是，这并不意味着数组在内存中是一个连续的块。
3. **稀疏数组**：稀疏数组是指数组中存在空位的情况。对于稀疏数组，V8引擎优化了内存使用，将这些空位视为未分配的内存。
4. **元素存储**：数组中的元素可以是任意类型的数据，包括其他对象。这意味着数组可以包含各种类型的引用，这些引用指向堆内存中的其他对象。
5. **内存分配**：数组的大小可以在运行时动态增加。当数组中的元素超过其当前大小时，JavaScript引擎会重新分配内存以容纳更多的元素。
6. **索引访问**：数组的索引访问是通过哈希表来实现的，这意味着查找元素的过程是O(1)的。

### 参考资料

V8引擎的开发者博客提供了一些关于数组内部实现的细节，包括数组的存储方式、内存分配策略等。这些信息可以帮助我们更好地理解数组在内存中的存储方式。

### 总结

在JavaScript中，数组是一个复杂的数据结构，它在内存中的存储方式依赖于JavaScript引擎的具体实现。虽然数组看起来像是一个简单的数据结构，但其内部实现涉及了对象、哈希表和内存管理等复杂概念。通过了解这些细节，我们可以编写更高效的代码，并更好地利用JavaScript数组的功能。

## 参考答案

数组不是以一组连续的区域存储在内存中，而是一种哈希映射的形式。它可以通过多种数据结构来实现，其中一种是链表。

js分为基本类型和引用类型：

* 基本类型是保存在栈内存中的简单数据段，它们的值都有固定的大小，保存在栈空间，通过按值访问；
* 引用类型是保存在堆内存中的对象，值大小不固定，栈内存中存放的该对象的访问地址指向堆内存中的对象，JavaScript不允许直接访问堆内存中的位置，因此操作对象时，实际操作对象的引用

## js的数据类型

js的数据分为两种， 一种是原始类型（Boolean,Null,Undefined,Number,BigInt,String,Symbol）， 一种是对象（Object）。  
原始类型的数据放在栈中，对象的数据放在堆中。

### 堆栈的区别

* 堆（heap）是不连续的内存区域，即数据可以任意存放， 主要存放的是对象等。  

( 栈（stack）是一块连续的内存区域，每个区块按照一定次序存放（后进先出），栈中主要存放的是基本类型的变量的值以及指向堆中的数组或者对象的地址。

### 为什么要区分堆栈

> 变量主要是两种形式，一种内容短小（比如一个int整数），需要频繁访问，但是生命周期很短，通常只在一个方法内存活，而另一种内容可能很多（比如很长一个字符串），可能不需要太频繁的访问，但生命周期较长，通常很多个方法中可能都要用到，那么自然将这两类变量分开就显得比较理性，一类存储* 区，通常是局部变量、操作符栈、函数参数传递和返回值，另一类存储在堆区，通常是较大的结构体（或者OOP中的对象）、需要反复访问的全局变量。 堆区就是各种慢，申请内存慢，访问慢，修改慢，释放慢，整理慢（或者说GC垃圾回收），但优点也不言而喻，访问随机灵活，空间超大，在不超可用内存的情况下你要多大就给多大。 栈区就像临时工，干完就跑，所以超快，但是缺点也很多，比如生命周期短，一般只能在一个方法内存活，又比如你需要事先知道需要多大的栈（事实上绝大多数语言栈区要分配的大小编译期就确定了，Java就是这样），而且通常最大栈区可用内存都很小，你不可能往栈区里堆很多数据。

### 原始类型

原始类型有一个特点就是不可变。示例代码如下

```js
var str = "abc";
str[0] = "d";
console.log(str) // abc  

// 例子2
var str2 = "abc";
str2 = "dbc";
console.log(str2) // dbc

```

简单点来讲， 就是假设栈中存放了一个数据如"abc"， 那么这个数据就永远不会改变， 而如果是如例子2中赋值了一个其他的字符串或者任何其他改变值的情况下， 栈中都会保留原来的"abc"， 然后新开一个地方存放"dbc"。 类似下图：  

![image](https://static.ecool.fun//article/bb5d1191-ed99-40b7-b557-c70114208619.jpeg)

**为什么要把基础类型的值设成不可变**

1. 为了安全  
假设基础类型的值是可变的， 那么下面的代码会变得很奇怪

```
var fun = (str) => { str + "---ok" };
fun(strTest);
console.log(strTest) // varaiable---ok

// 可以看到strTest的值被改变了， 特别是在map之类的对象中更为显著  
var map = new Map()
var strTest = "t1";
map.set(strTest, 10);
strTest = "notT1";
map.get("t1"); // undefined;
map.get("notT1"); // 10

```

1. 为了共享  
实际上， 基础类型中， 值一样的变量是共享一个内存区域的。  
![image](https://static.ecool.fun//article/c14cedeb-7b95-4d63-8b78-7337dff6398d.jpeg)

这样做的好处是避免额外的内存开销，提升效能。  
当然， 这个前提是基础类型不可变， 不然如果str1的值变化了， str2的值也会跟着变化（实际上并没有对其操作）。

### 对象类型

V8中的对象（数组也是对象）存储相对来说比较复杂，他们是存放在堆里面的数据。并且格式大致如下:  

![image](https://static.ecool.fun//article/f231cfc8-947c-4af7-9cd4-c4309206760e.jpeg)

这和很多资料说的是用Map实现不同， 很明显， 根据上图（[来自v8的博客](https://v8.dev/blog/fast-properties)）,起码可以说明不是使用Map来处理的。

V8是把对象中的属性分成两类， 一类是字符常量， 一类是数字or数字字符串（如"1"这种），并分别放在了两个数组，Properties和Elements。

**普通的字符常量**  
先从普通的字符常量说起， 字符常量的存放方式又细分为三类。

第一类： In-object  
实际上， 在生成一个对象的时候， v8会给该对象留下一些空间以分配属性（数量由对象的初始大小预先确定），这些属性直接存储在对象本身上。这些是V8中最快的属性，因为无需任何间接访问即可访问它们，如下图：

![image](https://static.ecool.fun//article/7ba6b644-2aa0-4d41-93fd-99fbba737e77.jpeg)

第二类： Fast properties  
v8的In-object空间并不多，通过对象字面量创建的无属性对象分配 4 个对象内属性存储（inobject\_properties）空间。当这些空间被使用完之后， 即会通过HideClass(隐藏类，有些也叫Map，这里统一叫隐藏类)来协助完成属性的快速访问。

HiddenClasses and DescriptorArrays  
HiddenClass存储有关对象的元信息，包括该对象上的属性数量以及对该对象原型的引用。除此之外，HiddenClasses里面还有一个DescriptorArrays数组， 该数组存储了对象属性的信息。  
即如下图：  

![image](https://static.ecool.fun//article/7a23abb3-5f63-4bdd-9c79-4f27c2d1f338.jpeg)

这里一般会有一个疑惑， 为什么需要一个隐藏类， 我直接搞一个hashTable不是更快吗？  
关于隐藏类及ICs的概率， 推荐阅读这一篇文章[JavaScript 引擎基础：Shapes 和 Inline Caches](https://zhuanlan.zhihu.com/p/38202123), 概念清晰易懂，图文并茂。  
这里简单说一下概念：  
首先看下， 隐藏类是怎么来的  

![image](https://static.ecool.fun//article/2010441b-9031-47ee-aee1-67466ad11094.jpeg)

从图中可以看出， 隐藏类是通过一颗树来不断生成的，每添加一个属性都会新生成一个隐藏类节点（添加数组索引属性不会创建新的）， 然后呢， 具有相同结构（相同属性，顺序相同）的对象具有相同的隐藏类。也就是说， 如果在上面的代码中加一个代码如下：

```
a.a = "ddd";

var b = {};
b.a = "3";
b.b = "test";

```
大致就是每次将代码编译成字节码并读取属性时，都会根据隐藏类把该属性的位置保存起来，在下一次读取或者遇到拥有相同隐藏类的对象读取时，可以根据隐藏类提供的属性位置直接读取，而避免查找过程。

第三类： Slow properties  
最后一种方式即是字典存储方式。字典存储模式相对来说比较简单， 先看下官方提供的图：  

![image](https://static.ecool.fun//article/8a8c9b4a-05d4-40c3-a17d-ebbb909165be.jpeg)

  
简单点说， 就是隐藏类里面的DescriptorArrays会直接置为空， 然后把属性的值和元信息直接存储在properties数组中，并通过hash的方式进行get和set。  
既然上面说了拥有隐藏类可以带来效能的提升， 为什么还要提供字典方式？  
v8的原文如下： 

> However, if many properties get added and deleted from an object, it can generate a lot of time and memory overhead to maintain the descriptor array and HiddenClasses

大致意思是说，增加删除属性的操作过多会使用大量的时间和内存开销来维护descriptorArray 和 HiddenClasses。

最后， 什么时候是Fast properties（隐藏类）， 什么时候是slow properties(字典模式)?  
关于这一方面，推荐该系列文章[奇技淫巧学 V8 之一，对象访问模式优化](https://zhuanlan.zhihu.com/p/28777722), 以下部分为引用 新创建的小对象为Fast properties。执行如下操作的时候会变成slow properties

1. 动态添加过多的属性
2. 删除属性（delete）
3. 删除非最后添加的属性（V8 >= 6.0）

**数组类型**  
数组的话种类比较多， 按官方的话说多达20种类型。  
实际上， 数组一般是放到了一开始提的elements数组里面， 然后按索引读值， 这个比较简单， 说下其中比较典型的两种。

1. 存在缺失的元素，会按原型链串上去拿值，实际上就是对象原型链..

```
console.log(o[1]);          // Prints 'b'.

delete o[1];                // Introduces a hole in the elements store.
console.log(o[1]);          // Prints 'undefined'; property 1 does not exist.
o.__proto__ = {1: 'B'};     // Define property 1 on the prototype.

console.log(o[0]);          // Prints 'a'.
console.log(o[1]);          // Prints 'B'.
console.log(o[2]);          // Prints 'c'.
console.log(o[3]);          // Prints undefined

```

1. 稀疏数组， 如果存在这种情况， 那么elements会存在大量的内存没有使用， 所以v8优化成字典模式，也就是和上面的字符串一样。

```
sparseArray[9999] = 'foo'; // Creates an array with dictionary elements.

```
