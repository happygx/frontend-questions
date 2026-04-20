---
level: 1
---

# vue 中 $route 和 $router 有什么区别？

## 题目要点

1. $route：$route 是一个当前路由信息的对象，包括当前 URL 路径、查询参数、路径参数等信息。$route 对象是只读的，不可以直接修改其属性值，而需要通过路由跳转来更新。

2. $router：$router 是 Vue Router 的实例对象，包括了许多用于导航控制和路由操作的 API，例如 push、replace、go、forward 等方法。$router 可以用来动态地改变 URL，从而实现页面间的无刷新跳转。

因此，$route 和 $router 在功能上有所不同，$route 主要用于获取当前路由信息，$router 则是用于进行路由操作，例如跳转到指定的路由、前进、后退等。通常来说，$route 和 $router 是紧密关联的，并且常常一起使用。

## 参考答案

在 Vue.js 中，`$route` 和 `$router` 是 Vue Router 提供的两个不同的对象，分别用于不同的目的：

1. **`$route`**：
   - **功能**：`$route` 对象包含当前路由的信息，包括路径、参数、查询字符串、路由名称等。
   - **使用**：用于访问当前路由的详细信息和状态。你可以从 `$route` 对象中获取路由参数、查询参数等。
   - **示例**：
     ```javascript
     console.log(this.$route.path);        // 当前路由的路径
     console.log(this.$route.params);      // 路由参数
     console.log(this.$route.query);       // 查询字符串
     ```

2. **`$router`**：
   - **功能**：`$router` 对象提供了控制路由的功能，例如导航到不同的路由、替换当前路由等。
   - **使用**：用于编程式导航，控制路由的跳转。
   - **示例**：
     ```javascript
     this.$router.push('/new-path');       // 导航到新路径
     this.$router.replace('/another-path'); // 替换当前路径
     ```

### 总结

- **`$route`**：提供关于当前路由的信息。
- **`$router`**：提供操作路由的方法，控制路由导航。
