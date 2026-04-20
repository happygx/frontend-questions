---
level: 2.5
---

# redux-thunk 和 redux 是什么关系？

## 题目要点

- **Redux** 主要用于同步状态管理。
- **`redux-thunk`** 作为中间件扩展了 Redux，支持异步操作和复杂的逻辑，使 Action Creators 可以返回函数以处理异步请求和状态更新。

## 参考答案

`redux-thunk` 是一个 Redux 中间件，用于处理异步操作和复杂的逻辑。它与 Redux 关系密切，但有不同的功能和作用。下面是它们之间的关系和作用：

### **1. Redux 的基本概念**

- **Redux**：一个状态管理库，用于管理 JavaScript 应用的状态。Redux 采用单一的全局状态树，状态通过 Reducers 进行管理和更新，状态的变更通过 Action 和 Dispatch 来触发。

### **2. Redux 的局限性**

- **同步操作**：Redux 本身仅支持同步操作。这意味着，当你在 Redux 中发起 Action 时，Redux 期望这些 Action 是纯粹的同步操作，没有涉及到异步的请求或复杂的逻辑。

### **3. `redux-thunk` 的作用**

- **异步操作**：`redux-thunk` 是一个中间件，用于处理异步操作。它允许 Action Creators 返回函数而不是普通的 Action 对象。这个函数可以执行异步操作（如 API 请求），然后在操作完成后 dispatch 其他 Actions 来更新状态。

- **中间件**：`redux-thunk` 是 Redux 的中间件之一。中间件是 Redux 的一种扩展机制，用于在 dispatch Action 之前或之后插入额外的逻辑。`redux-thunk` 使得 Action Creators 能够返回函数而不是普通的 Action 对象。

### **4. 使用示例**

- **没有 `redux-thunk`**：
  ```javascript
  // Action Creator
  function fetchData() {
    return {
      type: 'FETCH_DATA',
      payload: data
    };
  }
  ```

- **使用 `redux-thunk`**：
  ```javascript
  // Action Creator with redux-thunk
  function fetchData() {
    return function(dispatch) {
      // 异步操作
      fetch('https://api.example.com/data')
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: 'FETCH_DATA_SUCCESS',
            payload: data
          });
        })
        .catch(error => {
          dispatch({
            type: 'FETCH_DATA_FAILURE',
            payload: error
          });
        });
    };
  }
  ```

### **5. 集成**

- **配置 Store**：
  - 在 Redux Store 中使用 `redux-thunk` 中间件，需要通过 `applyMiddleware` 将其应用到 Redux Store 的创建过程中。

  ```javascript
  import { createStore, applyMiddleware } from 'redux';
  import thunk from 'redux-thunk';
  import rootReducer from './reducers';

  const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
  ```
