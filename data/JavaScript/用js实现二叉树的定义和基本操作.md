---
level: 3
---

# 用js实现二叉树的定义和基本操作

## 题目要点

二叉排序树是一种特殊的二叉树，它的每个节点都包含一个数据域、一个左指针域和一个右指针域。在二叉排序树中，每个节点的数据域都满足特定的顺序关系，即左子树的所有节点数据都小于根节点的数据，右子树的所有节点数据都大于根节点的数据。这种有序性使得二叉排序树在查找、插入和删除操作上具有很高的效率。

在JavaScript中实现二叉排序树，通常会定义一个节点类来表示树中的每个节点，这个类包含数据域、左指针域和右指针域。然后，会定义一个树类来封装对二叉排序树的操作，包括插入节点、删除节点、查找节点和获取最小值和最大值等。

**插入操作的思路是**：从根节点开始，按照数据的大小关系递归地在左子树或右子树中查找插入位置。如果找到一个空的节点位置，则创建一个新的节点并将其插入到该位置。

**删除操作的思路是**：根据待删除节点的数据值，递归地在树中查找对应的节点。如果找到该节点，则根据节点的子节点情况（无子节点、一个子节点或两个子节点）来决定如何删除该节点。如果节点有左子节点但没有右子节点，则将左子节点提升为父节点；如果节点有右子节点但没有左子节点，则将右子节点提升为父节点；如果节点有两个子节点，则找到右子树上的最小值，将其值复制到待删除节点，然后递归删除右子树上的最小值节点。

**查找操作的思路是**：从根节点开始，按照数据的大小关系递归地在左子树或右子树中查找。如果找到目标节点，则返回该节点；如果没有找到，则返回null。

## 参考答案

树是计算机科学中经常用到的一种数据结构。树是一种非线性的数据结构，以分层的方式存储数据。树被用来存储具有层级关系的数据，比如文件系统中的文件；树还被用来存储有序列表。

二叉树具有诸多优点。相对于链表来说，二叉树在进行查找时速度非常快，而相对于数组来说，为二叉树添加或删除元素也非常快。

## 二叉树

二叉树是一种特殊的树，表现在它的子节点个数不超过两个。且二叉树的子树有左右之分，其次序不能任意颠倒。

在实现二叉树时，采用的存储结构为链式存储结构，链式结构的意思是采用一个链表来存储一颗二叉树，二叉树中每一个节点用链表的一个节点来存储，在二叉树中，节点结构至少有三个域：数据域data，左指针域left，右指针域right，如下图所示：

![](https://static.ecool.fun//article/c2c927d0-7758-4e59-85ef-84a698e7c867.jpeg)

二叉链表的存储结构描述如下：

```js
    constructor(data, left, right){
        this.data = data;
        this.left = left;
        this.right = right;
        this.count = 1;
    }
}

```

使用不同的存储结构，实现二叉树的链表的算法也不同。因此接下来的算法全都基于当前所选的存储结构。

其次，将要实现的并不是普通的二叉树，而是二叉排序树，其定义为：

> 二叉排序树或者是一棵空树，或者是具有下列性质的二叉树：  
> （1）若左子树不空，则左子树上所有结点的值均小于它的根结点的值；  
> （2）若右子树不空，则右子树上所有结点的值均大于它的根结点的值；  
> （3）左、右子树也分别为二叉排序树；  
> （4）没有键值相等的节点。

  
## 二叉排序树

在二叉排序树的实现了一些基本操作：插入节点，删除节点，寻找节点，以及获取最小值和最大值。

代码框架：

```js
    constructor() {
        this.root = null;
    }

    // 删除一个节点
    _removeNode(node, data) {
       
    }

    // 删除给定的数据节点
    remove(data) {
        this.root = this._removeNode(this.root, data);
    }

    // 向二叉树中插入节点
    insert(data) {
        
    }

    // 寻找给定数据的节点
    find(data) {
        
    }

    // 获得最小值的节点
    getMinNode(node = this.root) {
        
    }

    // 获得最大值的节点
    getMaxNode(node = this.root) {
        
    }
}

```

首先是insert(data)方法，从总体上来说，插入操作可以分为两步，新建值为data的节点，然后在二叉排序树中找到合适的位置插入即可。

建立以data为值的新的节点比较容易，只要

```js

```

这里使用parentNode来记录当前节点的父节点，初始时，该变量为null，当前节点为currNode，初始时为该二叉树的根节点。

* 如果在插入时，root节点为空，则直接将新节点赋给root节点即可。
* 如果新的节点值小于当前节点值，说明待插入的位置应在在当前节点的左子树上，那么在大于时，就应该在当前节点的右子树上。进而更新当前节点所指向的节点，直到当前节点为空时，说明找到了正确的插入位置。

insert()的具体代码如下：

```js
    insert(data) {
        let newNode = new Node(data, null, null);

        if (this.root == null) {
            this.root = newNode;
        } else {
            let currNode = this.root;
            let parentNode = null;

            while (true) {
                parentNode = currNode;

                if (newNode.data < currNode.data) {
                    currNode = currNode.left;  // 更新当前指点的指向

                    if (!currNode) {  // 当前节点为空时，说明找到了正确的插入位置
                        parentNode.left = newNode;
                        break;
                    }
                } else if (newNode.data > currNode.data) {
                    currNode = currNode.right;   // 更新当前指点的指向

                    if (!currNode) {  // // 当前节点为空时，说明找到了正确的插入位置
                        parentNode.right = newNode;
                        break;
                    }
                } else if (newNode.data == currNode.data) {
                    // 如果给定的数据再次出现，就更新计数值
                    currNode.count++;
                    break;
                }
            }
        }
    }

```

```js
    getMinNode(node = this.root) {
        let currNode = node;
        while (currNode.left) {
            currNode = currNode.left;
        }
        return currNode;
    }

```

```js
    getMaxNode(node = this.root) {
        let currNode = node;
        while (currNode.right) {
            currNode = currNode.right;
        }
        return currNode;
    }

```

```js
    find(data) {
        let currNode = this.root;
        while (currNode) {
            if (currNode.data == data) {
                return currNode;
            } else if (data < currNode.data) {
                currNode = currNode.left;
            } else {
                currNode = currNode.right;
            }
        }
        return null;
    }

```

```js

```

这里在remove()方法中调用了这个函数：

```js
    this.root = this._removeNode(this.root, data);
}

```

1. 待删除的节点是叶子节点。
2. 待删除的节点没有左子节点，或者没有右子节点。
3. 待删除的节点的左右子节点均存在。

当待删除的节点时叶子节点时，这种情况比较简单，直接将待删除的节点置空返回即可。

当待删除的节点没有左子节点时，返回该节点的右孩子节点，并删除该节点。待删除节点没有右节点时类似处理。

比较麻烦的是最后一种情况，待删除的节点的左右子节点均存在时，可以有两种做法：要么查找待删除节点左子树上的最大值，要么查找其右子树上的最小值。

这里使用查找其右子树上的最小值的方法。在找到待删除节点的右子树上的最小值后，创建一个临时节点，将临时节点上的值复制到待删除节点，然后再删除临时节点。

```js
    _removeNode(node, data) {
        if (node == null) {
            return null;
        }
        if (data == node.data) {
            // 叶子节点
            if (node.left == null && node.right == null) {
                return null;
            }

            // 没有左节点的节点
            if (node.left == null) return node.right;


            //没有右节点的节点
            if (node.right == null) return node.left;
     

            // 有两个节点的节点
            /*  
             做法：
                找到待删除节点的右子树上的最小值创建一个临时节点。
                将临时节点上的值复制到待删除节点，然后再删除临时节点
            */

            // 寻找右子树上的最小值
            let tmpNode = this.getMinNode(node.right);
            node.data = tmpNode.data;
            node.right = this._removeNode(node.right, tmpNode.data);
            return node;
        } else if (data < node.data) {  // 待删除节点在左子树上
            node.left = this._removeNode(node.left, data);
            return node;
        } else {  // 待删除节点在右子树上
            node.right = this._removeNode(node.right, data);
            return node;
        }
    }

```
  
  
## 测试

由于准备将二叉排序树的遍历操作写在下一篇中，所以担心方法可能写错了的小伙伴可能展示无法测试所写的插入和删除操作正确与否。先用写的获取最大值和最小值来测试下吧。

```js

myTree.insert(20);
myTree.insert(13);
myTree.insert(7);
myTree.insert(9);
myTree.insert(15);
myTree.insert(14);
myTree.insert(42);
myTree.insert(22);
myTree.insert(21);
myTree.insert(24);
myTree.insert(57);

```

![](https://static.ecool.fun//article/fad63b51-599a-4113-a217-0c26201abf2a.jpeg)

  
获取最大值试一下：

```js

```

最小值：

```js

```

删除节点7，模拟下删除时有右子节点的情况：

```js
console.log(myTree.getMinNode());  // Node {data: 9, left: null, right: null, count: 1}

```

删除节点42，模拟下删除时左右子树均存在的情况：

```js
console.log(myTree.getMaxNode());  // Node {data: 57, left: Node, right: null, count: 1}

```

根据返回的结果来看，删除后最大值为57，其右子树为空。可见是正确的。
