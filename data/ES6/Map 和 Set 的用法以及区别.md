---
level: 1
---

# Map 和 Set 的用法以及区别

## 参考答案

### 首先了解一下 Map
Map 是一组键值对的结构，和 JSON 对象类似。


**(1) Map数据结构如下**

这里我们可以看到的是Map的数据结构是一个键值对的结构

![image.png](https://static.ecool.fun//article/c88014da-ef2f-4626-89cc-d3b7729546e6.jpeg)


**(2) key 不仅可以是字符串还可以是对象**

```
let map = new Map()
map.set(obj,"111")
```

![image.png](https://static.ecool.fun//article/f85eb9e7-c056-4b49-82e4-20f8e8a3e8e7.jpeg)

**(3) Map常用语法如下**

```
let map = new Map();

//添加key和value值
map.set('Amy','女')
map.set('liuQi','男')

//是否存在key，存在返回true,反之为false
map.has('Amy') //true
map.has('amy') //false

//根据key获取value
map.get('Amy') //女

//删除 key为Amy的value
map.delete('Amy')
map.get('Amy') //undefined  删除成功
```

```
map.set('Amy',"女")
map.set('Amy',"男")
console.log(map) 
```

![image.png](https://static.ecool.fun//article/fff162fa-10e5-4de8-aa5f-49e04702374a.jpeg)

### 再来了解一下 Set
Set 对象类似于数组，且成员的值都是唯一的

**(1) 打印出的数据结构如下**

这里打印出来是一个对象

![image.png](https://static.ecool.fun//article/74e2e811-d1d8-488b-94ba-fefd47ee649c.jpeg)

**(2) 最常用来去重使用，去重方法有很多但是都没有它运行的快。**

```
// 这里原本是一个对象用了es6的语法 转化成了数组，就是转化数组之前已经过滤掉了重复的元素了
var arr2=[...new Set(arr)] //[1,3,4,2,5]
```

```
var set = new Set([1,2,3,5,6]) 
console.log(set)  // {1, 2, 3, 5, 6}

//添加元素到Set中
set.add(7) //{1, 2, 3, 5, 6, 7}

//删除Set中的元素
set.delete(3) // {1, 2, 5, 6, 7}

//检测是否含有此元素，有为true，没有则为false
set.has(2) //true
```

**(1) 这两种方法具有极快的查找速度;那么下面我们来对比一下Map，Set，Array 的执行时间**

```
var lng=100
var arr =new Array(lng).fill(2)
var set =new Set(arr)
let map =new Map()
for(var i=0;i<lng;i++){
arr[i]=i
map.set(i,arr[i])
}

// Array
console.time()
for(var j=0;j<lng;j++){
arr.includes(j)
}
console.timeEnd()  //default: 0.01220703125 ms


// Set
console.time()
for(var j=0;j<lng;j++){
set.has(j)
}
console.timeEnd()  // default: 0.005859375 ms

// Map
console.time()
for(var j=0;j<lng;j++){
map.has(j)
}
console.timeEnd()
// default: 0.007080078125 ms
```

**(2) 初始化需要的值不一样，Map需要的是一个二维数组，而Set 需要的是一维 Array 数组**

**(3) Map 和 Set 都不允许键重复**

**(4) Map的键是不能修改，但是键对应的值是可以修改的；Set不能通过迭代器来改变Set的值，因为Set的值就是键。**

**(5) Map 是键值对的存在，值也不作为健；而 Set 没有 value 只有 key，value 就是 key；**
