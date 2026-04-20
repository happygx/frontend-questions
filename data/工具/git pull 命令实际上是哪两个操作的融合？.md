---
level: 1
---

# git pull 命令实际上是哪两个操作的融合？

## 题目要点

`git pull` 是**获取远程更新 + 合并到本地分支**的快捷操作，本质就是 `fetch + merge` 的组合。

可以把它理解为一个“一步完成远程更新”的高层命令，但在处理冲突时仍然需要人工干预。

## 参考答案

`git pull` 实际上是 **`git fetch` + `git merge`** 两个操作的组合。

---

### 1. **`git fetch`**

* 从远程仓库获取最新的分支和提交信息，但 **不会自动合并到当前分支**。
* 它只是把远程仓库的变化更新到本地的远程分支（如 `origin/main`）。

```bash
```

---

### 2. **`git merge`**

* 将某个分支的更新合并到当前分支。
* 如果有冲突需要手动解决。

```bash
```

---

### 3. **`git pull`**

```bash
```

```bash
git merge origin/main
```

  1. 拉取远程分支的最新提交到本地（`fetch`）。
  2. 将这些更新合并到当前分支（`merge`）。

* 可选参数：

  * `--rebase`：用 `rebase` 替代 `merge`，保持提交历史线性。

    ```bash
    git pull --rebase origin main
    ```
