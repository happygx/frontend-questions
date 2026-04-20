---
level: 3
---

# Next.js 中的 AppRouter 和 PageRouter 有什么区别？

## 题目要点

* Page Router 基于 `pages` 目录，依赖传统的数据获取 API，逻辑偏向客户端，适合早期项目。
* App Router 基于 `app` 目录，默认 Server Components，支持 Streaming/Suspense，更现代化，适合复杂和长生命周期的项目。
* 本质区别在于渲染模型、数据获取方式和架构组织理念，App Router 是 Next.js 的演进方向。

## 参考答案

在 Next.js 中，App Router 和 Page Router 代表了两种不同的路由体系，它们不仅仅是目录结构上的差异，更深层次上体现了 Next.js 从传统页面路由向以 React Server Components 为核心的现代应用架构的转变。

**Page Router** 是 Next.js 自早期版本就存在的路由机制，遵循的是 `pages` 目录驱动的约定式路由。它的设计理念非常接近传统的 SPA 框架：

* 所有页面组件都是客户端组件，页面切换通过内置的 `Link` 组件完成。
* 数据获取方式依赖 `getServerSideProps`、`getStaticProps` 和 `getInitialProps`，这种模式有一定约束性，开发者需要明确区分静态渲染和服务端渲染的场景。
* 在代码组织上，业务逻辑和页面视图容易耦合到同一组件中，长远来看会影响代码的模块化和可维护性。

**App Router** 则是自 Next.js 13 引入的新一代路由方案，它以 `app` 目录为核心，充分利用了 React 18 的新特性，尤其是 Server Components：

* 默认支持 **React Server Components**，意味着页面和组件可以天然地运行在服务端，减少了前端 bundle 体积，提升性能。
* 提供了全新的 **数据获取模式**，通过 `fetch` 的服务端调用和 `async` 组件来实现，开发者无需再显式区分 SSR/SSG，而是以“组件即数据边界”的思路来组织逻辑。
* 更加灵活的 **布局系统**，支持嵌套 Layout、模板以及 Server Actions，使得应用在结构化、模块化和复用性上有显著提升。
* 渲染模型也更先进，例如 Streaming 和 Suspense 的原生支持，使得用户能更快看到页面的首屏内容。

如果从项目实际落地来看，Page Router 更适合传统的中小型项目或老项目迁移时的平滑过渡，而 App Router 则面向中大型、需要可扩展性和性能优化的新项目。它代表了 Next.js 的未来方向，后续生态和新特性都会优先支持 App Router。
