---
level: 2.5
---

# 在 React 项目中， 是否可以不用 react-router， 使用浏览器原生 history 路由来组织页面路由？

## 题目要点

虽然 `react-router` 提供了很多便捷的功能，能够快速处理各种路由场景，但完全可以通过原生 `history` API 来管理 React 项目的路由，尤其是在简单的项目中。在选择时，需要根据项目的复杂度和需求来权衡是否使用第三方路由库。

## 参考答案

在 React 项目中，**可以不用 `react-router`**，直接使用浏览器原生的 **`history`** API 来组织页面路由。实际上，`react-router` 本质上也是基于浏览器的 `history` API 实现的路由功能，它提供了一个封装好的、更易于使用的路由管理工具。

### 使用浏览器原生 `history` API 进行路由管理

React 提供了 `history` API 作为浏览器的原生路由系统，包含了 `window.history` 相关方法（如 `pushState`, `replaceState`, `popState` 等）。你可以通过这些 API 手动实现路由的控制，并结合 React 状态管理来更新页面视图。

以下是使用原生 `history` API 管理路由的基本步骤：

### 1. **创建路由管理逻辑**

使用原生 `history` API，你需要自己处理 URL 的变化、浏览器历史栈的管理以及与 React 组件的匹配。

#### 示例代码：

```javascript

// 简单的路由管理器
function useHistory() {
  const [location, setLocation] = useState(window.location.pathname);

  useEffect(() => {
    // 监听浏览器的历史变化
    const handlePopState = () => {
      setLocation(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const push = (path) => {
    window.history.pushState(null, '', path);
    setLocation(path);  // 更新当前路径
  };

  const replace = (path) => {
    window.history.replaceState(null, '', path);
    setLocation(path);  // 更新当前路径
  };

  return { location, push, replace };
}

const Route = ({ path, component }) => {
  return window.location.pathname === path ? component : null;
};

// 主应用组件
function App() {
  const { location, push } = useHistory();

  return (
    <div>
      <nav>
        <button onClick={() => push('/')}>Home</button>
        <button onClick={() => push('/about')}>About</button>
      </nav>

      <div>
        <Route path="/" component={<div>Home Page</div>} />
        <Route path="/about" component={<div>About Page</div>} />
      </div>
    </div>
  );
}

export default App;
```

- `useHistory` 是自定义 Hook，用来管理路由的变化和浏览器的历史记录。
- `window.history.pushState` 用来修改浏览器的 URL，而不刷新页面。它会向历史记录栈中添加一个新的记录。
- `window.history.replaceState` 用来替换当前的 URL，而不新增历史记录。
- 通过监听 `popstate` 事件来处理浏览器后退、前进操作，确保页面和历史状态同步。
- `Route` 组件根据当前的 `window.location.pathname` 来判断是否匹配当前路由并渲染对应的内容。

### 3. **优缺点分析**

#### 优点：
- **控制性更强**：使用原生的 `history` API，你完全控制路由的行为，可以根据需求自由设计路由逻辑。
- **依赖较少**：不需要额外安装第三方路由库（如 `react-router`），减少了项目的依赖。
- **更细粒度的控制**：可以在路由变更时执行自定义逻辑，比如路由过渡动画、权限控制等。

#### 缺点：
- **代码复杂度较高**：需要自己处理路由匹配、页面切换、浏览器历史栈管理等逻辑，容易出现重复代码和潜在的 bug。
- **缺少功能**：像 `react-router` 提供的路由嵌套、动态路由、参数提取、重定向等功能需要你自己实现。
- **性能优化问题**：手动管理路由时，需要自己优化性能，尤其是与 React 组件的渲染结合时，可能需要更多的工作来确保视图的高效更新。

### 4. **与 `react-router` 的比较**

`react-router` 提供了大量现成的功能，如路由嵌套、重定向、动态路由匹配、路由守卫等，这些都是你使用原生 `history` API 时需要自己实现的。如果你的应用比较简单，不需要复杂的路由功能，使用原生 `history` API 是完全可行的。

但对于大型应用，`react-router` 提供了更加简洁、可扩展的路由管理方式，能大大减少开发成本，并且有广泛的社区支持。

### 5. **何时选择原生 `history` API**

你可以选择使用原生 `history` API 的情况包括：
- 应用的路由需求简单，不需要复杂的路由嵌套、动态路由、权限控制等功能。
- 希望减少第三方库的依赖，或者希望自己对路由的行为进行更细粒度的控制。
- 学习或实践如何在前端实现路由。
