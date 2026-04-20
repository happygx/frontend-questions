---
level: 1
---

# 请实现下面的 treePath 方法

## 题目要点

**作答思路**：

实现思路是遍历二叉树并收集所有路径，然后将路径格式化为字符串形式。

1. **定义树节点类型**：首先，定义了一个`Tree`类型，表示二叉树节点，其中包含`value`、`left`和`right`属性。
2. **构建树结构**：使用一个对象来构建二叉树的示例结构，其中包含了根节点和两个子节点。
3. **定义树路径函数**：创建一个`treePath`函数，它接受一个`Tree`类型的根节点作为参数。
4. **初始化变量**：在`treePath`函数内部，初始化两个数组：`answer`用于存储所有路径的数组，`tmp`用于存储当前路径的数组。
5. **递归遍历函数**：定义一个`travel`函数，它是一个递归函数，用于遍历二叉树。
6. **递归遍历逻辑**：在`travel`函数中，首先检查当前节点是否为`null`，如果是，则返回。然后将当前节点的`value`添加到`tmp`数组中。如果当前节点是叶子节点（即左右子节点都为`null`），则将当前路径的副本添加到`answer`数组中，并将`tmp`数组重置为只包含当前节点的`value`。接着递归地调用`travel`函数来处理左子节点和右子节点。
7. **格式化路径**：在`treePath`函数的最后，使用`map`函数将`answer`数组中的路径数组转换为字符串数组，每个路径字符串由路径数组中的值通过`->`连接而成。。

## 参考答案

```ts
 * @file 二叉树所有路径
 */

type Tree = {
  value: number;
  left?: Tree;
  right?: Tree;
};

const tree: Tree = {
  value: 1,
  left: {
    value: 2,
    right: { value: 5 },
  },
  right: { value: 3 },
};

function treePath(root: Tree): string[] {
  const answer: [] = [];
  let tmp: [][] = [];
  const travel = (r: Tree) => {
    if (r == null) {
      return;
    }
    //@ts-ignore
    tmp.push(r.value);
    if (r.left == null && r.right == null) {
      //@ts-ignore
      answer.push(tmp);
      tmp = [tmp[0]];
      return;
    }
    if (r.left) travel(r.left);
    if (r.right) travel(r.right);
  };
  travel(root);
  //@ts-ignore
  return answer.map((t) => t.join("->"));
}
console.log(treePath(tree)); // [ '1->2->5', '1->3' ]

export default {};
```
