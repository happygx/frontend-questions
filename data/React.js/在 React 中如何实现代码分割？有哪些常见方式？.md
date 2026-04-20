---
level: 3
---

# 在 React 中如何实现代码分割？有哪些常见方式？

## 题目要点

- **首选 `React.lazy + Suspense`** 进行懒加载，适用于组件级别的代码分割。  
- **对于路由懒加载**，可以结合 React Router 使用 `lazy`。  
- **`React Loadable`** 提供更丰富的加载状态控制。  
- **Webpack `splitChunks`** 适用于全局优化代码分割，避免重复加载。

## 参考答案

在 React 中，代码分割主要依赖于 **`React.lazy` + `Suspense`** 和 **`React Loadable`（第三方库）**，此外 Webpack 的 **`import()`** 也能实现代码分割。

常见方式如下：  

1. **`React.lazy` + `Suspense`**（官方推荐）  
   ```tsx
   const LazyComponent = React.lazy(() => import('./LazyComponent'));
   function App() {
     return (
       <Suspense fallback={<div>Loading...</div>}>
         <LazyComponent />
       </Suspense>
     );
   }
   ```

2. **`import()` 动态导入**（适用于路由懒加载）  
   ```tsx
   import { lazy } from 'react';
   const LazyPage = lazy(() => import('./pages/LazyPage'));
   ```

3. **`React Loadable`（第三方库，适用于更复杂的场景）**  
   ```tsx
   import Loadable from 'react-loadable';
   const LoadableComponent = Loadable({
     loader: () => import('./MyComponent'),
     loading: () => <div>Loading...</div>,
   });
   ```

4. **Webpack `import()` + `optimization.splitChunks`**（适用于手动分割多个模块）  
   ```js
   module.exports = {
     optimization: {
       splitChunks: {
         chunks: 'all',
       },
     },
   };
   ```
