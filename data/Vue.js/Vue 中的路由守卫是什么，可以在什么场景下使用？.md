---
level: 2
---

# Vue 中的路由守卫是什么，可以在什么场景下使用？

## 题目要点

Vue 中的路由守卫通过拦截路由的导航过程，提供了对页面跳转前、跳转时、跳转后进行控制的能力。它常用于身份验证、数据加载、页面跳转控制、SEO 优化等场景，是实现复杂路由逻辑的关键机制。

## 参考答案

路由守卫（Route Guards）是 Vue Router 提供的一种功能，用来在路由跳转过程中控制导航的行为。它可以帮助开发者在用户访问某个路由之前、路由发生变化时或路由完成之后，进行一些特定的逻辑处理。

#### **路由守卫的分类**
Vue 中的路由守卫分为三类：

1. **全局守卫**：作用于整个应用的路由系统，影响所有路由的导航。
   - `beforeEach`：在每个路由跳转前触发。
   - `beforeResolve`：在所有组件内守卫和异步路由组件被解析后触发。
   - `afterEach`：路由跳转结束后触发。

2. **路由独享守卫**：作用于单个路由定义。
   - `beforeEnter`：当进入某个特定路由前触发，仅作用于配置此守卫的路由。

3. **组件内守卫**：在路由组件内使用，针对组件级别的导航控制。
   - `beforeRouteEnter`：在路由进入该组件之前触发，可以访问组件实例。
   - `beforeRouteUpdate`：当复用的组件接收到新的参数或路由时触发。
   - `beforeRouteLeave`：在离开当前路由组件时触发，可以阻止导航。

---

### **常见使用场景**

1. **身份验证与权限控制**
   - 在用户进入某个页面前验证其身份，确保只有登录用户才能访问某些页面。如果未登录，可以在路由守卫中重定向到登录页面。
   ```js
   router.beforeEach((to, from, next) => {
     if (to.meta.requiresAuth && !isLoggedIn()) {
       next('/login'); // 未登录则重定向到登录页面
     } else {
       next(); // 继续导航
     }
   });
   ```

2. **数据加载与异步请求**
   - 在路由跳转时，预先获取页面所需的数据，在数据加载完成后再进行路由跳转。这样可以确保进入页面时所需的数据已经准备好。
   ```js
   router.beforeEach((to, from, next) => {
     fetchDataForRoute(to).then(data => {
       to.params.data = data;
       next();
     });
   });
   ```

3. **阻止路由跳转**
   - 在某些情况下，需要阻止用户离开页面，比如表单内容未保存时提醒用户确认，避免数据丢失。
   ```js
   beforeRouteLeave(to, from, next) {
     if (this.formHasUnsavedChanges) {
       const answer = window.confirm('您有未保存的更改，是否确认离开？');
       if (!answer) next(false); // 阻止跳转
       else next();
     } else {
       next();
     }
   }
   ```

4. **动态修改页面标题或元信息**
   - 可以通过守卫在每次路由跳转时动态更改页面标题或 SEO 相关的 meta 信息。
   ```js
   router.beforeEach((to, from, next) => {
     document.title = to.meta.title || '默认标题';
     next();
   });
   ```

5. **访问日志**
   - 在全局守卫中记录用户的路由访问历史或进行埋点统计，帮助分析用户行为。
   ```js
   router.afterEach((to, from) => {
     console.log(`Navigated from ${from.path} to ${to.path}`);
   });
   ```
