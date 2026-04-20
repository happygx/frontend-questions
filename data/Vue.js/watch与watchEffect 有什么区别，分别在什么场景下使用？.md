---
level: 2.5
---

# watch与watchEffect 有什么区别，分别在什么场景下使用？

## 题目要点

- **`watch`**：适用于需要明确指定哪些响应式数据变化时才执行副作用的场景。它适用于监听特定数据并获取旧值，通常用于执行需要依赖旧值或多个源数据的逻辑。
- **`watchEffect`**：适用于需要自动响应多个响应式数据变化并立即执行副作用的场景，尤其是在你不关心旧值时，它简化了代码结构。

在选择时，如果你需要明确控制哪些数据触发副作用，或者需要旧值，可以使用 `watch`。如果你希望自动跟踪并响应多个数据的变化，可以使用 `watchEffect`，这样可以避免手动列出所有依赖。

## 参考答案

`watch` 和 `watchEffect` 是 Vue 3 中用于响应式数据变化的两个 API，它们都可以用于监听和响应数据的变化，但有一些关键的区别。理解这两个 API 的不同用途和行为对于有效地使用 Vue 3 的响应式系统非常重要。

### **1. `watch`**
`watch` 是 Vue 3 中用于监听特定的响应式数据变化的 API。你可以选择一个或多个响应式源，并在其变化时执行相应的回调函数。

#### **基本用法**
```javascript

const count = ref(0);

watch(count, (newVal, oldVal) => {
  console.log(`count changed from ${oldVal} to ${newVal}`);
});

// 修改 count 时触发 watch
count.value = 1;
```
- **监听指定的响应式数据**：你需要明确指定要监听的目标，可以是一个响应式数据、多个响应式数据或 getter 函数。
- **手动触发回调**：`watch` 只会在你指定的数据变化时触发回调函数，而不是自动运行。需要显式指定要监听的数据。
- **获取旧值**：你可以通过 `watch` 获取到变化前的旧值。

#### **用例**
- 监听单个或多个响应式数据的变化。
- 当数据变化时执行副作用，且可能需要使用旧值。
- 监听复杂的 getter 函数。

#### **示例**
```javascript

const count = ref(0);
const message = ref('Hello');

watch([count, message], ([newCount, newMessage], [oldCount, oldMessage]) => {
  console.log(`count: ${oldCount} -> ${newCount}, message: ${oldMessage} -> ${newMessage}`);
});

count.value = 1;
message.value = 'World';
```
`watchEffect` 是 Vue 3 中的一种更简洁的 API，它会自动追踪其内部使用的所有响应式数据并在这些数据变化时执行副作用。它通常用于执行副作用，而不需要显式声明你要监听的响应式数据。

#### **基本用法**
```javascript

const count = ref(0);

watchEffect(() => {
  console.log(`count is: ${count.value}`);
});

// 修改 count 时自动触发 watchEffect
count.value = 1;
```
- **自动追踪响应式数据**：`watchEffect` 会自动追踪其作用域内的所有响应式数据（如 `ref`、`reactive`）的变化，不需要显式指定要监听的数据。
- **立即执行**：`watchEffect` 在注册时会立即执行一次，且执行副作用时会跟踪其内部使用的响应式数据。
- **没有旧值**：`watchEffect` 不会提供旧值，它只关心当前的变化和执行副作用。

#### **用例**
- 执行副作用，如更新 DOM、进行计算或触发其他操作。
- 自动追踪所需的响应式数据，简化监听逻辑。

#### **示例**
```javascript

const count = ref(0);
const message = ref('Hello');

watchEffect(() => {
  console.log(`count is: ${count.value}, message is: ${message.value}`);
});

count.value = 1;
message.value = 'World';
```

| 特性               | `watch`                                         | `watchEffect`                                   |
|--------------------|------------------------------------------------|------------------------------------------------|
| **触发时机**       | 当指定的数据变化时才触发                      | 在注册时立即执行一次，之后每次所依赖的响应式数据变化时触发 |
| **数据追踪**       | 需要明确指定监听的目标（响应式数据或 getter） | 自动追踪其内部使用的所有响应式数据           |
| **旧值**           | 提供旧值和新值                                | 只有新值，没有旧值                           |
| **用途**           | 用于处理特定数据的变化，如执行计算、API 请求等 | 用于执行副作用，自动反应数据变化             |
| **性能开销**       | 因为明确指定数据，所以可能性能上更高效        | 更方便，但由于自动追踪所有数据，性能上稍高于 `watch` |
