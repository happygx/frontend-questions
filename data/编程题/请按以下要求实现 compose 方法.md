---
level: 3
---

# 请按以下要求实现 compose 方法

## 参考答案

## 实现思路

本题是个 `全组合` 的问题。

在介绍实现思路前先介绍一下笛卡尔积（摘自百度百科）：

> 笛卡尔乘积是指在数学中，两个集合X和Y的笛卡尔积（Cartesian product），又称直积，表示为X×Y，第一个对象是X的成员而第二个对象是Y的所有可能有序对的其中一个成员。假设集合A={a, b}，集合B={0, 1, 2}，则两个集合的笛卡尔积为{(a, 0), (a, 1), (a, 2), (b, 0), (b, 1), (b, 2)}。

全组合的实现，可以借鉴笛卡尔积的求法，实现思路如下：

* 如果输入list长度为0，则直接返回空数组
* 如果输入list长度大于等于1，则直接返回list[0]的每一项构成的单元素数组组成的数组，比如[[1,2]] => [[1],[2]]，记为result。对于list的第二项以及以后的每一项，都依次和result做笛卡尔积，并把笛卡尔积的每一项（类似[[ 1 ],'a' ]）中的第二项（值）追加到第一项（数组）后面，收集到一个新数组里，用这个数组替换result，只到list遍历完成。

## 代码实现

* for循环实现

```
	let result = []  
  if (!list.length) return result
  for (let subList of list) {
    if (!result.length) {
      result = subList.map(item => [item])
    } else {
      let subResult = []
      for (let r of result) {
        let tailList = subList.map(item => [...r, item])
        subResult.push(...tailList)
      }
      result = subResult
    }
  }
  return result
}
```

```js
  return list.reduce((result, subList) => {
    return subList.reduce((subResult, item) => {
      let tail = result.length ? result.map(l => [...l, item]) : [[item]]
      return subResult.concat(tail)
    }, [])
  }, [])
}
```

```js
  var res = list.reduce( (result, property) => {
    return property.reduce( (acc, value) => {
        return acc.concat(result.map( ele => [].concat(ele, value)));
    }, []);
  });
  return res.map(arr=>arr.join('+'))
}
```
