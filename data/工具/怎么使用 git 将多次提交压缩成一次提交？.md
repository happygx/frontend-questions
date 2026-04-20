---
level: 3
---

# 怎么使用 git 将多次提交压缩成一次提交？

## 参考答案

在使用 Git 作为版本控制的时候，我们可能会由于各种各样的原因提交了许多临时的 commit，而这些 commit 拼接起来才是完整的任务。那么我们为了避免太多的 commit 而造成版本控制的混乱，通常我们推荐将这些 commit 合并成一个。

* 查看提交历史，git log

首先你要知道自己想合并的是哪几个提交，可以使用git log命令来查看提交历史，假如最近4条历史如下：

```

commit 1b4056686d1b494a5c86757f9eaed844......

commit 53f244ac8730d33b353bee3b24210b07......

commit 3a4226b4a0b6fa68783b07f1cee7b688.......
```

* git rebase

想要合并1-3条，有两个方法：

1.从HEAD版本开始往过去数3个版本
```
```
```
```

* 选取要合并的提交

1.执行了rebase命令之后，会弹出一个窗口，头几行如下：
```

pick 1b40566   '注释*********'

pick 53f244a   '注释**********'
```

```

s 1b40566   '注释*********'

s 53f244a   '注释**********'
```
```

git rebase --continue  
```

```
```
```
#The first commit’s message is:  
注释......
# The 2nd commit’s message is:  
注释......
# The 3rd commit’s message is:  
注释......
# Please enter the commit message for your changes. Lines starting # with ‘#’ will be ignored, and an empty message aborts the commit.
```
