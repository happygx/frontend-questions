---
level: 1.5
---

# 实现一个函数， 通过 id 来查找 tree 数据结构对应的节点

## 参考答案

参考答案：

```js
  if (!tree.length) return null; // 如果树是空的，则返回 null

  const search = (node) => {
    if (node.id === id) {
      // 如果找到一个匹配的节点，返回它
      return node;
    } else if (node.children) {
      // 否则，如果它有子节点，递归地搜索子节点
      for (const child of node.children) {
        const result = search(child);
        if (result) {
          return result; // 如果递归找到了一个匹配的节点，返回它
        }
      }
    }
    return null; // 如果什么都没找到，返回 null
  };

  for (const root of tree) {
    const result = search(root);
    if (result) {
      return result; // 如果在根节点中找到了一个匹配的节点，返回它
    }
  }

  // 如果循环遍历整个树完成后没有找到，返回 null
  return null;
}

// 使用
const foundNode = findNodeById(tree, 3);
console.log(foundNode); // 将打印出 id 为 3 的节点
```
