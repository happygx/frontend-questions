---
level: 1.5
---

# 怎么实现 commit lint？

## 题目要点

实现 Commit Lint 需要依赖 `commitlint` 和 `husky`，关键点是通过 Git 钩子（`commit-msg`）拦截不符合提交规范的信息。同时，你可以根据团队需求自定义规则，配合 `lint-staged` 等工具进一步规范开发流程。

## 参考答案

### **实现 Commit Lint 的步骤**

`Commit Lint` 是一种对 Git 提交信息进行格式化检查的工具，通常用于确保提交信息符合团队约定（例如 [Conventional Commits](https://www.conventionalcommits.org/) 标准），提高代码可维护性和提交信息的可读性。

以下是实现 Commit Lint 的具体步骤：

---

### **1. 安装必要的依赖**

**依赖工具**：

- `commitlint`：用于校验提交信息。
- `@commitlint/config-conventional`：遵循 Conventional Commits 的预设规则。
- `husky`：用于 Git 钩子管理。

执行以下命令：

```bash
```

### **2. 配置 Commit Lint**

在项目根目录创建 `commitlint.config.js` 文件：

```javascript
  extends: ['@commitlint/config-conventional'],
};
```

### **3. 初始化 Husky**

Husky 用于触发 Git 钩子，在 `commit-msg` 阶段执行 Commit Lint。

1. 初始化 Husky：

   ```bash
   npx husky install
   ```

2. 在 `package.json` 中添加一条安装后自动启用 Husky 的脚本：

   ```json
   {
     "scripts": {
       "prepare": "husky install"
     }
   }
   ```

3. 添加 `commit-msg` 钩子：

   ```bash
   npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
   ```

   这会在 `.husky/commit-msg` 文件中添加如下内容：

   ```bash
   #!/bin/sh
   . "$(dirname "$0")/_/husky.sh"

   npx --no-install commitlint --edit "$1"
   ```

---

### **4. 验证提交信息**

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范，以下是一些符合规范的提交示例：

- `feat: add new login feature`
- `fix: correct header display issue`
- `docs: update README with usage instructions`
- `style: fix formatting for CSS`

如果提交信息不符合规范，提交会被拦截，并提示错误信息。

---

### **5. 自定义规则（可选）**

如果团队有自定义的提交规范，可以在 `commitlint.config.js` 中添加规则。例如：

```javascript
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'],
    ],
    'header-max-length': [2, 'always', 72], // 限制标题长度为 72 字符
  },
};
```

### **6. 配合 lint-staged（可选）**

为了确保提交代码时执行代码格式化和检查，可以引入 `lint-staged`。

安装依赖：

```bash
```

```json
  "lint-staged": {
    "*.js": ["eslint --fix", "git add"]
  }
}
```

```bash
```

### **7. 测试流程**

1. 执行 `git commit`，输入符合或不符合规范的提交信息。
2. 检查是否会被拦截，确认 Commit Lint 是否生效。
