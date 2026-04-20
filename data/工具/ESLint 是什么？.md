---
level: 2
---

# ESLint 是什么？

## 参考答案

ESLint是一个用来识别 ECMAScript 并且按照规则给出报告的代码检测工具，使用它可以避免低级错误和统一代码的风格。如果每次在代码提交之前都进行一次eslint代码检查，就不会因为某个字段未定义为undefined或null这样的错误而导致服务崩溃，可以有效的控制项目代码的质量。

在许多方面，它和 JSLint、JSHint 相似，除了少数的例外：

* ESLint 使用 Espree 解析 JavaScript。
* ESLint 使用 AST 去分析代码中的模式。
* ESLint 是完全插件化的。每一个规则都是一个插件并且你可以在运行时添加更多的规则。
