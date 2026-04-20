---
level: 1.5
---

# addEventListener 第三个参数

## 题目要点

## 延伸知识

在标准事件模型中，`stopPropagation()` 和 `stopImmediatePropagation()` 都用于控制事件的传播，但它们的作用略有不同。下面是对这两个方法的详细比较：

### 1\. `stopPropagation()`

-   **功能**：`stopPropagation()` 方法用于阻止事件在当前阶段的传播（即阻止事件从目标节点向上传播到父节点或从根节点向目标节点的捕获阶段）。
-   **使用场景**：适用于需要阻止事件冒泡到父元素的情况。例如，点击事件在嵌套元素上触发时，可以使用 `stopPropagation()` 来防止父元素的事件处理程序被调用。  
    

### 2\. `stopImmediatePropagation()`

-   **功能**：`stopImmediatePropagation()` 方法不仅阻止事件在当前阶段的传播，还会阻止当前节点上的其他事件处理程序的执行。这意味着如果一个元素上注册了多个事件处理程序，调用 `stopImmediatePropagation()` 将阻止该元素上后续的事件处理程序执行。
-   **使用场景**：适用于需要完全停止当前事件处理程序的执行并阻止事件进一步传播的情况。例如，当一个事件处理程序需要确保不执行其他处理程序时，可以使用 `stopImmediatePropagation()`。
-   **示例**：  
    

### 3\. 比较

-   **`stopPropagation()`**：  
    

-   阻止事件的冒泡和捕获阶段的传播。
-   不影响当前节点上的其他事件处理程序的执行。

-   **`stopImmediatePropagation()`**：  
    

-   阻止事件的冒泡和捕获阶段的传播。
-   同时阻止当前节点上其他所有的事件处理程序的执行。

### 4\. 注意事项

-   使用 `stopPropagation()` 时，其他事件处理程序仍然可以在当前节点上执行。
-   使用 `stopImmediatePropagation()` 时，除了阻止事件的传播外，还会阻止其他事件处理程序的执行，这可能会影响页面的行为和用户体验。

理解这两个方法的区别，可以帮助你更精确地控制事件处理逻辑，确保事件处理符合预期。

## 参考答案

addEventListener 语法

```
```

`type`表示监听[事件类型](https://developer.mozilla.org/zh-CN/docs/Web/Events)的大小写敏感的字符串。

`listener`当所监听的事件类型触发时，会接收到一个事件通知（实现了 `[Event](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)` 接口的对象）对象。`listener` 必须是一个实现了 `[EventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)` 接口的对象，或者是一个[函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions)。有关回调本身的详细信息，请参阅[事件监听回调](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#%E4%BA%8B%E4%BB%B6%E7%9B%91%E5%90%AC%E5%9B%9E%E8%B0%83)

`options` 可选一个指定有关 `listener` 属性的可选参数对象。可用的选项如下：

-   `capture` 可选一个布尔值，表示 `listener` 会在该类型的事件捕获阶段传播到该 `EventTarget` 时触发。
-   `once` 可选一个布尔值，表示 `listener` 在添加之后最多只调用一次。如果为 `true`，`listener` 会在其被调用之后自动移除。
-   `passive` 可选一个布尔值，设置为 `true` 时，表示 `listener` 永远不会调用 `preventDefault()`。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。查看[使用 passive 改善滚屏性能](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#%E4%BD%BF%E7%94%A8_passive_%E6%94%B9%E5%96%84%E6%BB%9A%E5%B1%8F%E6%80%A7%E8%83%BD)以了解更多。
-   `signal` 可选`[AbortSignal](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal)`，该 `AbortSignal` 的 `[abort()](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/abort)` 方法被调用时，监听器会被移除。

`useCapture` 可选一个布尔值，表示在 DOM 树中注册了 `listener` 的元素，是否要先于它下面的 `EventTarget` 调用该 `listener`。当 useCapture（设为 true）时，沿着 DOM 树向上冒泡的事件不会触发 listener。当一个元素嵌套了另一个元素，并且两个元素都对同一事件注册了一个处理函数时，所发生的事件冒泡和事件捕获是两种不同的事件传播方式。事件传播模式决定了元素以哪个顺序接收事件。进一步的解释可以查看 [DOM Level 3 事件](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)及 [JavaScript 事件顺序](https://www.quirksmode.org/js/events_order.html#link4)文档。如果没有指定，`useCapture` 默认为 `false`。

  
**备注：** 对于事件目标上的事件监听器来说，事件会处于“目标阶段”，而不是冒泡阶段或者捕获阶段。捕获阶段的事件监听器会在任何非捕获阶段的事件监听器之前被调用。
