---
level: 2.5
---

# 谈谈 React 与 React Native 的区别

## 题目要点

两者虽然共享了 React 的组件化思想和部分抽象层，但目标平台和渲染方式截然不同。React 用于 Web，其组件最终渲染为 DOM 元素（如 div, span）。React Native 用于开发原生移动应用，其组件（如 View, Text）在运行时被映射为 iOS/Android 的原生 UI 控件进行渲染 。

## 参考答案

React 和 React Native 虽然师出同门（均源于 Meta/Facebook），并共享核心概念，但它们在目标平台、技术架构和应用场景上存在根本性的差异。理解这些区别对于技术选型至关重要。

### 核心定位与运行环境

**React** 的核心定位是一个用于构建**Web页面**用户界面的 **JavaScript 库**。它主要运行在**浏览器**环境中，其工作的基础是操作浏览器的**文档对象模型（DOM）**。开发者使用 React 来创建可交互的网页应用，最终产物是运行在浏览器中的网页。

**React Native** 的核心定位是一个用于开发**跨平台原生移动应用**的**框架**。它运行在 iOS 和 Android 等移动操作系统上。其最终产出物是真正的原生应用（如 .ipa 或 .apk 文件），可以通过应用商店分发和安装。

### 架构与渲染机制的根本区别

这是两者最本质的差异，决定了它们不同的工作方式。

**React 的渲染机制**：React 在浏览器中引入了一个**虚拟DOM（Virtual DOM）** 作为抽象层。当组件的状态发生变化时，React 会先在内存中构建一个新的虚拟DOM树，然后与旧的虚拟DOM树进行对比（Diff算法），计算出需要更新的最小变更集，最后再通过高效的批量操作来更新浏览器的真实DOM。这套机制的核心是为了解决直接操作真实DOM带来的性能瓶颈。

**React Native 的渲染机制**：React Native 并不渲染到浏览器的DOM上。它采用了类似的逻辑，但最终目标不同。当你的JSX代码被解析后，React Native 会通过一个称为 **“桥接（Bridge）”** 的通信层，将界面描述信息传递给原生端。原生端（iOS 或 Android）会将这些指令解释为真正的原生组件进行渲染。例如，React Native 中的 `<View>` 组件在 iOS 上会被渲染为 `UIView`，在 Android 上则被渲染为 `android.view.View`。这意味着用户体验是**原生**的，而非在 WebView 中运行的网页。

为了进一步提升性能，React Native 的新架构（通常被称为 **Fabric**）正在逐步取代旧的桥接架构。Fabric 将渲染器直接移至 C++ 层，允许更同步的UI操作，减少了通信延迟，并支持并发渲染特性，从而显著提升了应用的响应速度和流畅度。

### 开发体验的具体差异

由于渲染目标的不同，开发者在日常编码中会感受到诸多具体差异。

**组件体系**：React 使用标准的 HTML 标签（如 `<div>`, `<span>`, `<p>`）来构建界面。React Native 则提供了一套自己的、映射到原生控件的组件。例如，用于容器的 `<View>` 替代了 `<div>`，用于文本显示的 `<Text>` 替代了 `<p>` 或 `<span>`，而用于交互的 `<TouchableOpacity>` 则替代了 `<button>`。在 React Native 中直接使用 HTML 标签会导致错误。

**样式处理**：React 可以充分利用完整的 CSS 生态，包括样式表、CSS Modules、Styled Components 等，布局方式也非常丰富（Flexbox、Grid、定位等）。React Native 则使用 **JavaScript 对象**来定义样式，它不支持 CSS 文件或选择器。样式属性采用驼峰命名法（如 `backgroundColor`），布局主要依赖一个与 CSS 标准略有差异的 **Flexbox** 模型（默认主轴方向为垂直的 `column`）。尺寸单位通常是设备无关的逻辑像素点（dp/pt），而非 px 或 rem。

**事件处理与导航**：React 处理的是浏览器提供的 **DOM 事件**，如 `onClick`、`onChange`。React Native 则处理的是移动端的**手势事件**，如 `onPress`、`onLongPress`。在路由导航方面，React 通常使用 `react-router-dom` 等基于浏览器 History API 的库，而 React Native 则需要使用 `React Navigation` 或 `React Native Navigation` 等专为移动端栈式、标签式导航设计的库。

**原生功能访问**：React 应用的能力受限于浏览器提供的 **Web API**（如 `localStorage`, `fetch`）。React Native 则可以通过桥接或原生模块，直接调用设备的核心功能，如摄像头、地理位置、传感器、文件系统等，这些功能通常由 React Native 自带模块或庞大的第三方库社区提供。

### 性能考量与适用场景

**React** 的性能优化重点在于**减少不必要的真实DOM操作**，利用虚拟DOM和协调算法来提升效率。其挑战在于处理大型或复杂DOM树时可能出现的性能问题。

**React Native** 的性能优化重点则在于**最小化 JavaScript 线程与原生UI线程之间的通信开销**。在旧架构中，频繁的跨桥通信可能成为瓶颈。新架构（Fabric）正是为了解决这一问题而设计的。对于列表渲染、复杂动画等场景，需要采用特定的优化策略（如使用 `FlatList` 组件）。

**选择建议**：
*   **选择 React**：当你需要开发**网页、单页应用（SPA）**，或者目标是**浏览器兼容性和快速的Web迭代**时。
*   **选择 React Native**：当你需要开发**跨平台的移动应用**，追求**接近原生的用户体验**，并希望用一套代码覆盖 iOS 和 Android，同时能够调用设备原生功能时。
