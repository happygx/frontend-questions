---
level: 3
---

# 微前端架构中，一般是如何做到 JavaScript 隔离的？

## 题目要点

JavaScript 隔离是微前端实现稳定性的重要一环。具体实现方式取决于性能要求、场景需求和技术选型：
- 如果需要彻底隔离，可以使用 `iframe`。
- 如果需要较好的性能和灵活性，可以使用 `Proxy` 沙箱。
- 配合微前端框架（如 `qiankun`），可以更快速实现隔离和集成。

## 参考答案

在微前端架构中，为了防止子应用之间的 JavaScript 互相干扰，通常需要实现 **JavaScript 隔离**。

以下是常见的隔离方式和实现思路：

### **1. 沙箱隔离**
沙箱机制是微前端实现 JavaScript 隔离的核心，分为两种类型：

#### **（1）基于 iframe 的隔离**
- **原理**：每个子应用运行在独立的 iframe 中，浏览器会为 iframe 创建独立的 JavaScript 环境和 DOM。
- **优点**：
  - 完全隔离，防止子应用之间的变量污染。
  - 子应用可以完全独立加载自己的资源。
- **缺点**：
  - 性能较差，加载速度较慢。
  - 跨域通信比较复杂。

#### **（2）基于 JavaScript 沙箱的隔离**
通过动态劫持 JavaScript 执行环境，提供一个隔离的运行上下文。
- **常用方法**：
  1. **快照沙箱**：
     - 保存全局变量（如 `window`）的初始状态，在子应用执行代码时对全局变量的修改会被记录，卸载子应用时回滚这些修改。
     - **实现原理**：
       ```javascript
       const rawWindow = { ...window };
       function clearWindow() {
         for (const key in window) {
           if (!(key in rawWindow)) {
             delete window[key];
           } else {
             window[key] = rawWindow[key];
           }
         }
       }
       ```
     - **优点**：实现简单，性能较好。
     - **缺点**：不支持多实例运行（一个子应用的多实例无法隔离）。

  2. **Proxy 沙箱**：
     - 利用 ES6 的 `Proxy` 拦截对子应用全局变量的访问和修改，子应用操作的实际上是一个伪造的 `window` 对象。
     - **实现原理**：
       ```javascript
       const fakeWindow = {};
       const proxy = new Proxy(window, {
         get(target, prop) {
           return prop in fakeWindow ? fakeWindow[prop] : target[prop];
         },
         set(target, prop, value) {
           fakeWindow[prop] = value;
           return true;
         },
       });
       ```
     - **优点**：支持多实例运行，隔离效果较好。
     - **缺点**：实现复杂，兼容性依赖 Proxy 支持。

---

### **2. 样式隔离**
虽然这部分不直接属于 JavaScript，但为了避免 CSS 污染，也会使用样式隔离。
- **Scoped CSS**：通过为子应用的所有样式添加独立的前缀（如 `data-app="app1"`），实现样式隔离。
- **Shadow DOM**：通过 `Shadow DOM` 创建独立的样式作用域。

---

### **3. 子应用独立构建**
为了进一步隔离，通常子应用会独立构建自己的 JavaScript 和依赖：
- **独立打包**：子应用通过 Webpack、Vite 等工具独立打包，生成独立的 JS 文件。
- **避免共享依赖**：不同子应用尽量不共享同一个第三方库（如 React），以防止版本冲突。
- **Library 模式**：子应用打包为库形式，导出指定的模块接口。

---

### **4. 防止全局变量污染**
通过以下方法减少全局变量对主应用或其他子应用的影响：
- **严格模式**：子应用中启用 JavaScript 严格模式，减少意外的全局变量声明。
- **封闭作用域**：子应用中的 JavaScript 尽量封装在 IIFE（立即执行函数）或 ES6 模块中。
  ```javascript
  (function () {
    // 子应用代码
  })();
  ```

---

### **5. 使用微前端框架的支持**
现代微前端框架通常自带隔离机制：
- **single-spa**：通过生命周期函数加载和卸载子应用，配合沙箱实现隔离。
- **qiankun**：基于 `Proxy` 和快照沙箱，提供完善的 JavaScript 隔离方案。
- **Module Federation**：Webpack 5 的动态模块加载机制，可以隔离和动态加载模块。
