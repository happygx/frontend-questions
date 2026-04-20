---
level: 2
---

# Husky 和 lint-staged 有什么区别？

## 题目要点

- **Husky** 用于管理 Git 钩子，执行某些操作（如校验、测试等）在 Git 提交前或推送前进行。
- **lint-staged** 主要用于只对暂存区的文件执行校验或格式化，避免浪费不必要的资源。

这两个工具通常一起使用，在提交时既能确保代码规范，又能提高效率。

## 参考答案

**Husky** 和 **lint-staged** 都是前端开发中常用的工具，用来提升代码质量，特别是在代码提交和推送阶段进行校验和格式化。它们各自有不同的作用和使用场景，通常可以配合使用。

### **1. Husky**
**Husky** 是一个 Git 钩子工具，允许你在 Git 提交（`commit`）、推送（`push`）等操作时，自动执行指定的命令。它让你能够在这些 Git 操作前后运行脚本，通常用于代码检查、格式化、单元测试等工作。

#### 主要作用：
- **Git 钩子管理**：它通过配置 Git 钩子（如 `pre-commit`、`pre-push` 等）来执行任务。
- **与 Git 操作集成**：可以在 Git 操作的不同生命周期内执行自定义的命令，比如在提交代码前运行 `eslint` 或者在推送前运行测试。

#### 常见用途：
- 在 `git commit` 之前，自动执行代码检查（如 `eslint` 或 `prettier`），保证代码符合规范。
- 在 `git push` 之前，自动执行单元测试，确保不会将未通过测试的代码推送到远程仓库。
  
#### 示例：
```bash
npx husky-init
npm install
```
```bash
```
**lint-staged** 是一个工具，用于仅对暂存（staged）的文件（即已经通过 `git add` 添加到暂存区的文件）执行 lint 校验或格式化。它的目的是提高效率，避免对整个项目的所有文件进行校验，只对即将提交的文件进行检查。

#### 主要作用：
- **只检查暂存的文件**：与 Husky 配合使用时，可以保证只检查那些已经加入 Git 暂存区的文件，而不是整个项目。
- **与 Husky 配合**：通常在 `pre-commit` 钩子中运行 `lint-staged`，确保只有被修改的文件通过 Lint 检查或格式化，避免对未修改的文件浪费计算资源。

#### 常见用途：
- 运行 `eslint`、`prettier`、`stylelint` 等工具，只对修改的文件进行检查和格式化。
- 执行 Git 钩子时，避免不必要的操作，提升效率。

#### 示例：
```bash
{
  "lint-staged": {
    "*.js": "eslint --fix",
    "*.css": "stylelint --fix",
    "*.json": "prettier --write"
  }
}
```

### **区别总结**

| **特性**          | **Husky**                        | **lint-staged**                  |
|-------------------|----------------------------------|----------------------------------|
| **作用**          | 管理和执行 Git 钩子             | 只对暂存的文件执行校验和格式化 |
| **工作原理**      | 触发 Git 提交、推送等操作时执行脚本 | 只检查 Git 暂存区中的文件       |
| **常见场景**      | 在 Git 操作前执行检查和脚本      | 在 Git 提交前只检查修改的文件   |
| **配置方式**      | 配置 Git 钩子，如 `pre-commit`  | 配置哪些文件需要执行哪些操作    |
| **是否与 Git 操作结合** | 是，直接与 Git 提交、推送操作挂钩 | 是，与 Git 提交操作结合，但只检查暂存文件 |

### **如何配合使用 Husky 和 lint-staged**

- **Husky** 负责在 Git 提交或推送时触发钩子事件。
- **lint-staged** 配合 `pre-commit` 钩子，只对暂存区中的文件进行 lint 校验和自动修复。

#### 配合示例：
1. 安装 Husky 和 lint-staged：
   ```bash
   npm install husky lint-staged --save-dev
   ```

2. 启用 Husky：
   ```bash
   npx husky-init
   npm install
   ```

3. 配置 `lint-staged` 来处理文件：
   在 `package.json` 中添加 `lint-staged` 配置：
   ```json
   {
     "lint-staged": {
       "*.js": "eslint --fix",
       "*.css": "stylelint --fix"
     }
   }
   ```

4. 配置 Husky 钩子：
   在 `.husky/pre-commit` 文件中添加：
   ```bash
   npx lint-staged
   ```

这样，每次提交时，Husky 会触发 `pre-commit` 钩子，运行 `lint-staged`，`lint-staged` 会只检查那些已经暂存的文件，并对其进行自动修复或格式化。
