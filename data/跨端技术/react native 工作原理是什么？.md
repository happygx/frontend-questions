---
level: 3
---

# react native 工作原理是什么？

## 题目要点

React Native 的工作原理包括跨平台渲染、JavaScript 与原生代码的桥接、虚拟 DOM 和原生组件的更新、动态更新和热重载、原生模块的支持以及性能优化。通过这些机制，React Native 能够让开发者使用熟悉的 JavaScript 和 React 技术栈来构建高性能的移动应用。

## 参考答案

React Native 是一个用于构建跨平台移动应用的框架，它允许开发者使用 JavaScript 和 React 构建原生的 iOS 和 Android 应用。其工作原理可以从以下几个方面进行解释：

### **1. 跨平台渲染**

React Native 通过将 JavaScript 代码与原生代码桥接，从而在 iOS 和 Android 上实现跨平台渲染。它的工作原理如下：

- **JavaScript 代码**：开发者使用 JavaScript 和 React 编写组件，定义应用的界面和行为。
- **原生代码**：React Native 提供了原生组件（如 `View`、`Text`、`Image`）的 JavaScript 封装。这些组件在 JavaScript 中定义，但实际的渲染工作由原生平台负责。
- **桥接（Bridge）**：JavaScript 代码通过桥接机制与原生代码进行通信。这些桥接使 JavaScript 可以调用原生 API，也使原生代码能够将数据传回 JavaScript。

### **2. 渲染流程**

React Native 的渲染流程与 React Web 的基本相似，但针对移动设备进行了优化：

- **虚拟 DOM**：React Native 使用虚拟 DOM 来描述组件的状态，并将这些状态与实际的原生组件进行比较。
- **Diff 算法**：React Native 使用类似于 React 的 Diff 算法来计算虚拟 DOM 与实际 DOM 之间的差异。
- **更新原生组件**：差异计算完成后，React Native 会将需要更新的内容发送到原生层，通过桥接机制将更新请求发送到原生平台。

### **3. 动态更新和热重载**

- **热重载（Hot Reloading）**：React Native 支持热重载，可以在不重新编译整个应用的情况下，实时查看代码更改的效果。开发者在修改代码后，应用会自动更新，保持应用的状态不变。
- **快速刷新（Fast Refresh）**：React Native 引入了快速刷新功能，它能保留组件的状态，并快速应用代码更改。

### **4. 原生模块**

React Native 允许开发者创建自定义的原生模块，这些模块可以在 JavaScript 代码中调用：

- **原生模块**：使用 Java 或 Swift/Objective-C 编写原生模块，并将其暴露给 JavaScript。通过这种方式，开发者可以使用原生平台特有的功能或性能优化。
- **第三方模块**：React Native 生态系统中有许多第三方模块和插件，它们封装了常见的原生功能，例如地图、相机等。

### **5. 组件生命周期**

React Native 中的组件生命周期与 React Web 类似，但也会涉及到原生平台的生命周期：

- **挂载和更新**：组件的生命周期方法（如 `componentDidMount`、`componentDidUpdate`）会在组件挂载和更新时被调用，这些方法允许开发者处理副作用和进行额外的配置。
- **卸载**：在组件卸载时，React Native 会清理相关资源，确保没有内存泄漏。

### **6. 性能优化**

React Native 提供了一些性能优化工具和技术：

- **Native Driver**：使用原生驱动来处理动画，可以提高动画性能。
- **PureComponent**：React Native 中的 `PureComponent` 可以避免不必要的重新渲染，提高性能。
- **Code Splitting**：通过按需加载模块来减少初始加载时间。
