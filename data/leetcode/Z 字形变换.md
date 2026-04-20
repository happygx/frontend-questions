---
level: 3
---

# Z 字形变换

## 参考答案

## 方法一：按行排序

### 思路

通过从左向右迭代字符串，我们可以轻松地确定字符位于 Z 字形图案中的哪一行。

### 算法

我们可以使用 `min(numRows,len(s))` 个列表来表示 Z 字形图案中的非空行。

从左到右迭代 s，将每个字符添加到合适的行。可以使用当前行和当前方向这两个变量对合适的行进行跟踪。

只有当我们向上移动到最上面的行或向下移动到最下面的行时，当前方向才会发生改变。

```javascript
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
     // 行数为1直接返回
    if (numRows === 1) return s;
    let res = '';
    // 遍历行数
    for (let i = 0; i < numRows; i++) {
        let next, // 下一个字符
            dire = i === numRows - 1 ? false : true, // 添加的方向
            nextIndex = i;
        // 添加当前行下一个直达不存在
        while (next = s[nextIndex]) {
            res += next;
            nextIndex = nextIndex + 2 * (dire ? numRows - i : i + 1) - 2;
            if (i !== 0 && i !== numRows - 1) {
                dire = !dire
            }
        }
    }
    return res;
};
```

* 时间复杂度：O(n)，其中 n == len(s)
* 空间复杂度：O(n)


## 方法二：按行访问

### 思路

按照与逐行读取 Z 字形图案相同的顺序访问字符串。

### 算法

首先访问 `行0` 中的所有字符，接着访问 `行1`，然后 `行2`，依此类推...

对于所有整数 k，

* `行0` 中的字符位于索引 `k(2⋅numRows−2)` 处;
* `行numRows−1` 中的字符位于索引 `k(2⋅numRows−2)+numRows−1` 处;
* 内部的 `行 i` 中的字符位于索引 `k(2⋅numRows−2)+i` 以及 `(k+1)(2⋅numRows−2)−i` 处;

```javascript
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
    if(numRows===1) return s;
    let row = [],// 存储对应行的字符
        cur = numRows-2, // 代表当前行数（0 <= cur <= numRows-1）
        curDire = true; // 方向
    for (let i = 0; i < s.length; i++) {
        if (i < numRows) {
            // 每一行的首位元素
            row[i] = s[i];
        }else{
            // 达到拐角的元素，变更方向
             if(cur===(numRows-1) || cur===0){
                curDire = !curDire;
            }
            // 添加行数到对应行
            row[cur] += s[i]
            // 行数变化
            if(curDire){
                cur--;
            }else{
                cur++;
            }
           
        }
    }
    // 合并每一行的字符串
    let res = row.reduce((pre,cur)=>pre+cur,'')
    return res;
};
```
