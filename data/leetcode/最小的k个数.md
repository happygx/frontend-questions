---
level: 1
---

# 最小的k个数

## 参考答案

## 题目分析

虽然这题在 leetcode 上标注的「简单」，但是本题还是很有研究意义的。本文介绍了 3 种解法，时间复杂度依次降低，都是基于经典的算法或者数据结构。

## 解法 1: 直接排序

先说最简单、最直观的做法：直接排序。将数组按照从小到大的顺序排序，并且返回前 k 个数字。代码实现如下：

```javascript
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
    return arr.sort((a, b) => a - b).slice(0, k);
};
```

## 解法 2: 最大堆

堆是一种非常常用的数据结构。最大堆的性质是：节点值大于子节点的值，堆顶元素是最大元素。利用这个性质，整体的算法流程如下：

-   创建大小为 k 的最大堆
-   将数组的前 k 个元素放入堆中
-   从下标 k 继续开始依次遍历数组的剩余元素：
    -   如果元素小于堆顶元素，那么取出堆顶元素，将当前元素入堆
    -   如果元素大于/等于堆顶元素，不做操作

由于堆的大小是 K，空间复杂度是`O(K)`，时间复杂度是`O(NlogK)`。

由于 JavaScript 中没有堆，所以需要手动实现。代码如下：

```javascript
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

class MaxHeap {
    constructor(arr = []) {
        this.container = [];
        if (Array.isArray(arr)) {
            arr.forEach(this.insert.bind(this));
        }
    }

    insert(data) {
        const { container } = this;

        container.push(data);
        let index = container.length - 1;
        while (index) {
            let parent = Math.floor((index - 1) / 2);
            if (container[index] <= container[parent]) {
                break;
            }
            swap(container, index, parent);
            index = parent;
        }
    }

    extract() {
        const { container } = this;
        if (!container.length) {
            return null;
        }

        swap(container, 0, container.length - 1);
        const res = container.pop();
        const length = container.length;
        let index = 0,
            exchange = index * 2 + 1;

        while (exchange < length) {
            // 如果有右节点，并且右节点的值大于左节点的值
            let right = index * 2 + 2;
            if (right < length && container[right] > container[exchange]) {
                exchange = right;
            }
            if (container[exchange] <= container[index]) {
                break;
            }
            swap(container, exchange, index);
            index = exchange;
            exchange = index * 2 + 1;
        }

        return res;
    }

    top() {
        if (this.container.length) return this.container[0];
        return null;
    }
}

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
    const length = arr.length;
    if (k >= length) {
        return arr;
    }

    const heap = new MaxHeap(arr.slice(0, k));
    for (let i = k; i < length; ++i) {
        if (heap.top() > arr[i]) {
            heap.extract();
            heap.insert(arr[i]);
        }
    }
    return heap.container;
};
```

解法 1 中使用了快速排序，但其实并需要对全部元素进行排序，题目只需要前 k 个元素。

回顾快速排序中的 partition 操作，可以将元素`arr[0]`放入排序后的正确位置，并且返回这个位置`index`。利用 partition 的特点，算法流程如下：

-   如果`index = k`，说明第 k 个元素已经放入正确位置，返回前 k 个元素
-   如果`k < index`，前 k 个元素在`[left, index - 1]`之间，缩小查找范围，继续查找
-   如果`index < k`，前 k 个元素在`[index + 1, right]` 之间，缩小查找范围，继续查找

为了方便理解，可以使用`2, 8, 1, 1, 0, 11, -1, 0`这个例子在纸上画一下过程。

代码实现如下：

```javascript
 *
 * @param {number[]} arr
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
function partition(arr, start, end) {
    const k = arr[start];
    let left = start + 1,
        right = end;
    while (1) {
        while (left <= end && arr[left] <= k) ++left;
        while (right >= start + 1 && arr[right] >= k) --right;

        if (left >= right) {
            break;
        }

        [arr[left], arr[right]] = [arr[right], arr[left]];
        ++left;
        --right;
    }
    [arr[right], arr[start]] = [arr[start], arr[right]];
    return right;
}

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
    const length = arr.length;
    if (k >= length) return arr;
    let left = 0,
        right = length - 1;
    let index = partition(arr, left, right);
    while (index !== k) {
        if (index < k) {
            left = index + 1;
            index = partition(arr, left, right);
        } else if (index > k) {
            right = index - 1;
            index = partition(arr, left, right);
        }
    }

    return arr.slice(0, k);
};
```
