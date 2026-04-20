---
level: 4
---

# 手写 vue 的双向绑定

## 题目要点

- **Vue 2**：使用 `Object.defineProperty()` 实现响应式数据，并利用 `watcher` 更新 DOM。
- **Vue 3**：使用 `Proxy` 实现响应式数据，直接代理数据对象，提高性能和简化实现。

## 参考答案

手写 Vue 的双向绑定可以通过使用 JavaScript 的 `Object.defineProperty()`（在 Vue 2 中）或 `Proxy`（在 Vue 3 中）来实现数据响应式。下面是一个简单的实现示例，展示了如何手动实现双向绑定。

### **1. 使用 `Object.defineProperty()` 实现 Vue 2 风格的双向绑定**

**步骤**：
1. **创建一个 Vue 实例**。
2. **实现数据的响应式**。
3. **创建一个简单的 `watcher` 用于更新 DOM**。
4. **实现双向绑定**。

**示例代码**：

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue-like Two-way Binding</title>
</head>
<body>
    <div id="app">
        <input type="text" v-model="message">
        <p>{{ message }}</p>
    </div>

    <script>
        // 实现 Vue 实例
        class Vue {
            constructor(options) {
                this.data = options.data;
                this.el = document.querySelector(options.el);
                this.bindings = [];

                // 数据响应式
                this.observe(this.data);

                // 编译模板
                this.compile(this.el);
            }

            // 将数据转换为响应式
            observe(data) {
                Object.keys(data).forEach(key => {
                    let value = data[key];
                    const bindings = [];
                    
                    Object.defineProperty(data, key, {
                        get() {
                            // 这里添加依赖
                            if (Dep.target) {
                                bindings.push(Dep.target);
                            }
                            return value;
                        },
                        set(newValue) {
                            value = newValue;
                            bindings.forEach(fn => fn());
                        }
                    });
                });
            }

            // 编译模板
            compile(el) {
                const nodes = el.childNodes;
                nodes.forEach(node => {
                    if (node.nodeType === 1) { // 处理元素节点
                        const attr = node.getAttribute('v-model');
                        if (attr) {
                            this.bindings.push({
                                node,
                                key: attr,
                                update: () => {
                                    node.value = this.data[attr];
                                }
                            });
                            node.addEventListener('input', e => {
                                this.data[attr] = e.target.value;
                            });
                        }
                    } else if (node.nodeType === 3) { // 处理文本节点
                        const text = node.textContent.trim();
                        const regExp = /\{\{\s*(\w+)\s*\}\}/;
                        const match = text.match(regExp);
                        if (match) {
                            const key = match[1];
                            this.bindings.push({
                                node,
                                key,
                                update: () => {
                                    node.textContent = this.data[key];
                                }
                            });
                        }
                    }
                });

                // 更新绑定
                this.updateBindings();
            }

            // 更新所有绑定
            updateBindings() {
                this.bindings.forEach(binding => binding.update());
            }
        }

        // 依赖管理
        class Dep {
            static target = null;
        }

        // 创建 Vue 实例
        new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!'
            }
        });
    </script>
</body>
</html>
```

**步骤**：
1. **创建一个 Vue 实例**。
2. **实现数据的响应式使用 `Proxy`**。
3. **实现双向绑定**。

**示例代码**：

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue-like Two-way Binding</title>
</head>
<body>
    <div id="app">
        <input type="text" data-bind="message">
        <p>{{ message }}</p>
    </div>

    <script>
        // 实现 Vue 实例
        function Vue(options) {
            this.data = options.data;
            this.el = document.querySelector(options.el);

            // 数据响应式
            this.proxyData(this.data);

            // 编译模板
            this.compile(this.el);
        }

        Vue.prototype.proxyData = function(data) {
            this._data = new Proxy(data, {
                get: (target, key) => {
                    // 返回数据值
                    return target[key];
                },
                set: (target, key, value) => {
                    // 更新数据
                    target[key] = value;
                    // 触发视图更新
                    this.update();
                    return true;
                }
            });
        };

        Vue.prototype.compile = function(el) {
            const nodes = el.childNodes;
            nodes.forEach(node => {
                if (node.nodeType === 1) { // 处理元素节点
                    const attr = node.getAttribute('data-bind');
                    if (attr) {
                        node.value = this._data[attr];
                        node.addEventListener('input', e => {
                            this._data[attr] = e.target.value;
                        });
                    }
                } else if (node.nodeType === 3) { // 处理文本节点
                    const text = node.textContent.trim();
                    const regExp = /\{\{\s*(\w+)\s*\}\}/;
                    const match = text.match(regExp);
                    if (match) {
                        const key = match[1];
                        node.textContent = this._data[key];
                    }
                }
            });
        };

        Vue.prototype.update = function() {
            const nodes = this.el.querySelectorAll('[data-bind]');
            nodes.forEach(node => {
                const key = node.getAttribute('data-bind');
                node.value = this._data[key];
            });

            const textNodes = this.el.querySelectorAll('p');
            textNodes.forEach(node => {
                const regExp = /\{\{\s*(\w+)\s*\}\}/;
                const text = node.textContent.trim();
                const match = text.match(regExp);
                if (match) {
                    const key = match[1];
                    node.textContent = this._data[key];
                }
            });
        };

        // 创建 Vue 实例
        new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!'
            }
        });
    </script>
</body>
</html>
```
