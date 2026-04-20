---
level: 1
---

# git merge master 与 git merge origin master 有什么区别？

## 题目要点

- `git merge master`：合并本地的 `master` 分支。
- `git merge origin master`：合并远程的 `master` 分支

在执行 `git merge origin master` 前，通常建议先执行 `git fetch origin`，以确保拉取了远程仓库的最新代码。

## 参考答案

`git merge master` 和 `git merge origin master` 之间的区别在于合并的分支来源：

1. **`git merge master`**：这是将**本地**的 `master` 分支合并到当前分支。假设你在另一个分支（比如 `feature-branch`）上，执行 `git merge master` 会将你本地 `master` 分支的最新更改合并到 `feature-branch`。注意，这里的 `master` 分支是指你机器上本地版本的 `master` 分支，而不是远程仓库的最新版本。

2. **`git merge origin master`**：这是将**远程**仓库中的 `master` 分支合并到当前分支。`origin` 是默认指向远程仓库的别名。执行 `git merge origin master` 时，合并的是从远程仓库拉取的 `master` 分支，而不是本地的 `master` 分支。
