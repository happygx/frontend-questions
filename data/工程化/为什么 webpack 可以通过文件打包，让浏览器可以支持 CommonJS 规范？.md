---
level: 3.5
---

# 为什么 webpack 可以通过文件打包，让浏览器可以支持 CommonJS 规范？

## 题目要点

- **解析依赖**：构建依赖图。
- **转换模块**：使用加载器转换文件。
- **打包模块**：将模块合并成输出文件。
- **封装模块**：将模块代码封装为浏览器可以执行的格式。
- **生成输出**：输出打包好的 JavaScript 文件。

## 参考答案

尽管浏览器本身不直接支持 CommonJS 模块规范，Webpack 通过以下步骤将模块化的代码打包成浏览器可以读取的格式：

### 1. **解析依赖**

Webpack 会解析项目中所有的模块及其依赖关系。它会从入口文件开始，递归地分析所有导入的模块（`import` 或 `require`），构建出一个完整的依赖图（dependency graph）。

### 2. **转换模块**

Webpack 使用加载器（loaders）将不同类型的文件（如 JavaScript、CSS、图片等）转换成浏览器可以理解的格式。例如，使用 Babel 将 ES6+ 代码转换为兼容的 ES5 代码，或者将 SCSS 转换为 CSS。

### 3. **打包模块**

Webpack 将所有模块和它们的依赖关系打包成一个或多个文件。为了实现这一点，它会将所有模块的代码合并到一个输出文件中，通常是一个或多个 JavaScript 文件。

### 4. **封装模块**

为了使浏览器能够理解这些模块，Webpack 会将模块封装在一个自执行的函数中，并将模块代码转换成一个浏览器可以执行的格式。这包括：

- **定义模块**：将每个模块的代码包裹在一个匿名函数中，并将模块暴露为一个对象或函数。
- **管理模块加载**：使用一个模块加载器（如 Webpack 自带的 `__webpack_require__` 函数）来处理模块之间的依赖关系和加载。

### 5. **生成输出**

Webpack 将打包好的代码输出为一个或多个 JavaScript 文件。这些文件包含了所有的模块和依赖关系，以确保浏览器可以加载并执行模块化的代码。

### **示例**

假设有两个模块：`math.js` 和 `app.js`。

**math.js**:
```javascript
  return a + b;
}
```
```javascript
console.log(add(1, 2));
```

```javascript
  // Webpack 自定义的 require 函数
  function __webpack_require__(moduleId) {
    var module = { exports: {} };
    modules[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }

  // 入口点
  __webpack_require__(0);
})({
  // 模块定义
  0: function(module, exports, __webpack_require__) {
    var add = __webpack_require__(1).add;
    console.log(add(1, 2));
  },
  1: function(module, exports) {
    function add(a, b) {
      return a + b;
    }
    exports.add = add;
  }
});
```
