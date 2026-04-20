---
level: 3
---

# react 中，在什么场景下需要使用 useContext？

## 题目要点

- **`useContext` 适用于**：跨组件树共享数据、避免属性钻取、全局状态管理、跨组件通信等场景。
- **避免滥用**：仅在必要时使用 `useContext`，以避免不必要的复杂性和性能开销。

## 参考答案

在 React 中，`useContext` 是一个用于在组件树中共享状态或数据的钩子。它允许我们在没有通过属性逐层传递的情况下，将数据从祖先组件传递到后代组件。`useContext` 主要用于避免 prop drilling 问题，即当需要将数据从顶层组件传递到深层嵌套的组件时，可能会涉及多层组件传递属性，代码会变得冗长和难以维护。

### 使用 `useContext` 的场景

1. **全局状态管理**：
   - 当你需要在多个组件之间共享全局状态时，`useContext` 是一个简单而有效的工具。例如，用户认证状态、主题设置或语言选择等全局数据可以通过 `useContext` 在整个应用中访问。
   
   ```javascript
   const UserContext = React.createContext();

   function App() {
       const [user, setUser] = useState(null);

       return (
           <UserContext.Provider value={user}>
               <UserProfile />
           </UserContext.Provider>
       );
   }

   function UserProfile() {
       const user = useContext(UserContext);
       return <div>{user ? `Welcome, ${user.name}` : 'Not logged in'}</div>;
   }
   ```

2. **避免 prop drilling**：
   - 当数据需要从顶层组件传递到深层嵌套的子组件时，使用 `useContext` 可以避免将数据逐层通过 `props` 传递。这样可以减少中间组件不必要的属性传递，保持代码的简洁和清晰。

   ```javascript
   const ThemeContext = React.createContext();

   function App() {
       const theme = 'dark';

       return (
           <ThemeContext.Provider value={theme}>
               <Toolbar />
           </ThemeContext.Provider>
       );
   }

   function Toolbar() {
       return (
           <div>
               <ThemedButton />
           </div>
       );
   }

   function ThemedButton() {
       const theme = useContext(ThemeContext);
       return <button className={theme}>Themed Button</button>;
   }
   ```

3. **跨组件通信**：
   - 在组件树的不同部分之间进行通信时，`useContext` 提供了一种简单的方式来共享信息，而不需要通过复杂的回调或全局事件总线。

4. **复杂应用中的配置和设置**：
   - 在需要全局配置（如路由、表单验证、国际化等）的复杂应用中，`useContext` 使得这些配置可以被所有需要的组件访问，而不需要反复传递。

5. **在与 `useReducer` 结合使用时**：
   - `useReducer` 可以用来管理复杂的本地状态。将 `useReducer` 与 `useContext` 结合使用时，可以将状态和分发函数提供给需要的组件，而无需逐层传递。

   ```javascript
   const CountContext = React.createContext();

   function reducer(state, action) {
       switch (action.type) {
           case 'increment':
               return { count: state.count + 1 };
           case 'decrement':
               return { count: state.count - 1 };
           default:
               throw new Error();
       }
   }

   function Counter() {
       const [state, dispatch] = useReducer(reducer, { count: 0 });

       return (
           <CountContext.Provider value={{ state, dispatch }}>
               <ChildComponent />
           </CountContext.Provider>
       );
   }

   function ChildComponent() {
       const { state, dispatch } = useContext(CountContext);
       return (
           <div>
               Count: {state.count}
               <button onClick={() => dispatch({ type: 'increment' })}>+</button>
               <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
           </div>
       );
   }
   ```

### 适用性与注意事项

- **适用性**：
  - `useContext` 适用于需要跨多个组件共享状态的场景，避免不必要的属性传递，特别是在状态涉及到多个组件层级时。

- **注意事项**：
  - 不要滥用 `useContext`。如果数据仅在少量组件之间共享，或局部状态足够处理问题，可能并不需要使用 `useContext`。
  - `useContext` 提供的数据是引用类型的，如果上下文中的数据变化会导致使用该上下文的所有组件重新渲染。因此，确保合理组织和管理上下文的数据以避免性能问题。
