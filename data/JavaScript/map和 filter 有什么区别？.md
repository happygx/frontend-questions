---
level: 1
---

# map和 filter 有什么区别？

## 题目要点

#### 参数

`map` 和 `filter` 函数在 JavaScript 中用于处理数组。它们都接受相同的三个参数：

1. **currentValue**：当前处理的数组元素。
2. **index**：当前元素在数组中的索引。
3. **arr**：包含所有元素的原始数组。
4. **thisValue**：可选参数，作为执行回调时使用的 `this` 的值。

#### 用途

尽管 `map` 和 `filter` 函数的参数相同，但它们的作用和使用场景却有所不同：

1. **map**：
   - **返回值**：返回一个新数组，其元素是原始数组中每个元素的映射版本。
   - **应用场景**：当你想要创建一个与原始数组具有相同长度的新数组，但每个元素都经过某种转换或处理时使用。
2. **filter**：
   - **返回值**：返回一个新数组，其包含原始数组中满足指定条件的所有元素。
   - **应用场景**：当你想要创建一个新数组，只包含原始数组中符合特定条件的元素时使用。

## 参考答案

## 参数

首先，map和filter函数的参数，是完全相同的

> array.map(function(currentValue,index,arr), thisValue)
> 
> array.filter(function(currentValue,index,arr), thisValue)

* currentValue：数组元素；
* index：索引
* arr：原数组；
* thisValue：作为该执行回调时使用，传递给函数，用作 "this" 的值

## 用途

但是在用途上，它们是有区别的：  

1. map方法返回的新数组是原数组的映射，何为映射？就是和原数组的长度相同，数值做相应处理。  
2. filter方法返回的值是过滤原数组后的新数组，和原数组长度不同，数值不变。  

**示例**：

```
let a = arr.map((item,index,a) =>{
    return item + 1
});
console.log(a);//["11", "21", "31"]
let b = arr.filter((item,index,a) =>{
    return item > 1
})
console.log(b);//["2", "3"]
```

```js
let newArr = arr.filter(item => item);
console.log(newArr);//["0", 1, 2, 3]
```
