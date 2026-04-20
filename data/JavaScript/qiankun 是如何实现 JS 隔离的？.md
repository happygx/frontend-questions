---
level: 3.5
---

# qiankun 是如何实现 JS 隔离的？

## 题目要点

`qiankun` 的 JS 隔离主要依赖于以下技术：
1. **快照沙箱**：适合简单场景，兼容性好，但不支持多实例。
2. **Proxy 沙箱**：适合复杂场景，支持多实例并行运行，性能更好。
3. **结合子应用生命周期**，动态启用和停用沙箱。
4. 配合 **CSS 隔离** 和其他隔离手段，全面防止子应用对全局的干扰。

## 参考答案

`qiankun` 是基于 `single-spa` 实现的微前端框架，它通过沙箱机制实现了 JavaScript 的隔离，主要依赖 **快照沙箱** 和 **Proxy 沙箱** 来管理子应用的 JavaScript 环境。

以下是 qiankun 实现 JS 隔离的具体原理：

### **1. 沙箱机制**
`qiankun` 使用沙箱技术隔离子应用的 JavaScript 执行环境，避免子应用之间以及子应用和主应用之间的全局变量污染。具体实现方式分为两种：

#### **（1）快照沙箱**
- **原理**：
  1. 在加载子应用之前，保存 `window` 和 `document` 上的所有全局变量的快照（初始状态）。
  2. 当子应用运行时，记录子应用对全局变量的修改。
  3. 当子应用被卸载时，恢复全局变量为快照保存的状态。

- **实现代码**：
  ```javascript
  class SnapshotSandbox {
    constructor() {
      this.active = false;
      this.windowSnapshot = {};
    }

    // 激活沙箱
    activate() {
      if (!this.active) {
        this.windowSnapshot = { ...window }; // 保存快照
        this.active = true;
      }
    }

    // 恢复沙箱
    deactivate() {
      if (this.active) {
        Object.keys(window).forEach((key) => {
          if (!(key in this.windowSnapshot)) {
            delete window[key]; // 删除新增的全局变量
          } else {
            window[key] = this.windowSnapshot[key]; // 恢复修改的全局变量
          }
        });
        this.active = false;
      }
    }
  }
  ```

- **优点**：
  - 实现简单，兼容性好。
  - 适用于子应用之间没有并行运行的场景。
- **缺点**：
  - 无法支持多实例并行运行。
  - 恢复状态时性能可能较差。

#### **（2）Proxy 沙箱**
- **原理**：
  通过 ES6 的 `Proxy` 拦截对子应用全局对象（`window`）的访问，创建一个伪造的全局对象供子应用使用。子应用操作的实际上是 `Proxy` 对象，而不是原生 `window`。
  
- **实现代码**：
  ```javascript
  class ProxySandbox {
    constructor() {
      this.proxy = new Proxy(window, {
        get(target, key) {
          return key in this.fakeWindow ? this.fakeWindow[key] : target[key];
        },
        set(target, key, value) {
          this.fakeWindow[key] = value;
          return true;
        },
      });
      this.fakeWindow = {}; // 伪造的全局对象
      this.active = false;
    }

    activate() {
      this.active = true;
    }

    deactivate() {
      this.active = false;
      this.fakeWindow = {};
    }
  }
  ```

- **优点**：
  - 支持多实例隔离（不同子应用实例可以运行在不同的 `Proxy` 上）。
  - 性能较好，且子应用与全局对象完全隔离。
- **缺点**：
  - 需要现代浏览器支持 `Proxy`。

---

### **2. 沙箱的动态绑定**
在 `qiankun` 中，沙箱会根据子应用的生命周期进行动态切换：
- **加载子应用时**：启用沙箱，挂载子应用代码，修改的全局变量会保留在沙箱中。
- **卸载子应用时**：停用沙箱，恢复主应用的全局环境。
- **并行运行多个子应用时**：通过独立的 `Proxy` 实例实现每个子应用的环境隔离。

---

### **3. 微前端框架的挂载和卸载流程**
结合沙箱，`qiankun` 的子应用加载流程如下：
1. **加载子应用资源**：
   - 通过 `fetch` 加载子应用的 HTML、CSS 和 JavaScript。
   - 动态插入 `script` 标签以运行子应用代码。

2. **运行子应用代码**：
   - 使用沙箱（`Proxy` 或快照）控制代码的执行环境。
   - 子应用的全局变量、事件监听等都仅限于其沙箱范围内。

3. **卸载子应用**：
   - 停用沙箱，清理子应用的副作用（如事件监听、全局变量）。

---

### **4. 样式隔离**
除了 JS 隔离，`qiankun` 还会对样式进行隔离，防止子应用的样式污染全局：
- **CSS 前缀隔离**：
  为子应用的样式规则添加特定的前缀（如 `data-app="app1"`），使其作用范围限制在子应用内。
- **Shadow DOM**：
  使用 `Shadow DOM` 为子应用创建独立的样式作用域。
