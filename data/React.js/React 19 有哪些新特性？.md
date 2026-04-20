---
level: 3
---

# React 19 有哪些新特性？

## 参考答案

### Action

React 应用的一个常见场景是执行数据突变，然后更新状态作为响应。举个栗子，当用户提交表单更改姓名时，我们会发出 API 请求，然后处理响应。

回首往昔，我们需要手动处理待定状态、错误、乐观更新和顺序请求。

举个栗子，我们会这样处理 `useState` 中的待定状态和错误状态：

```jsx
function UpdateName({}) {
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const handleSubmit = async () => {
    setIsPending(true)
    const error = await updateName(name)
    setIsPending(false)

    if (error) {
      setError(error)
      return
    }
    redirect('/path')
  }

  return (
    <div>
      <input value={name} onChange={event => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  )
}
```

举个栗子，我们可以使用 `useTransition` 处理待定状态：

```jsx
function UpdateName({}) {
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const [isPending, startTransition] = useTransition()
  const handleSubmit = async () => {
    startTransition(async () => {
      const error = await updateName(name)

      if (error) {
        setError(error)
        return
      }
      redirect('/path')
    })
  }

  return (
    <div>
      <input value={name} onChange={event => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  )
}
```

粉丝请注意，**按照惯例，使用异步过渡的函数称为“Action”（操作）**。

Action 会自动为我们管理提交数据：

-   **待定状态**：Action 提供待定状态，该状态在请求开始时启动，且在提交最终状态更新时自动重置。
-   **乐观更新**：Action 支持全新的 `useOptimistic` hook，因此我们可以在提交请求时，向用户表演即时反馈。
-   **错误处理**：Action 提供错误处理，这样我们可以在请求失败时显示错误边界，且自动将乐观更新恢复为其原始值。
-   **表单**：`<form>` 元素现在支持将函数传递给 `action` 和 `formAction` 属性。将函数传递给 `action` 属性默认使用 Action，并在提交后自动重置表单。

React 19 构建于 Action 之上，引入 `useOptimistic` 来管理乐观更新，并引入全新的 `React.useActionState` hook 来处理 Action 的常见情况。

在 `react-dom` 中，我们添加了 `<form>` Action 自动管理表单，并添加了 `useFormStatus` 支持表单中 Action 的常见情况。

在 React 19 中，上述例子可以简化为：

```jsx
function ChangeName({ name, setName }) {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const error = await updateName(formData.get('name'))
      if (error) {
        return error
      }
      redirect('/path')
    }
  )

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </form>
  )
}
```

为了使 Action 更容易处理常见情况，我们添加了一个全新的 `useActionState` hook：

```jsx
  async (previousState, newName) => {
    const error = await updateName(newName)
    if (error) {
      // 我们可以返回该 Action 的任何结果。
      // 比如，这里我们只返回了 error。
      return error
    }
    // 处理成功的逻辑
  }
)
```

这能奏效，因为 Action 可以组合。当调用包装的 Action 时，`useActionState` 会返回 Action 的结果作为 `data`，并将 Action 的待定状态返回为 `pending`。

请注意，`React.useActionState` 以前在 Canary 版本中被称为 `ReactDOM.useFormState`，但我们已将其重命名，并弃用 `useFormState`。

### React DOM：`<form>` Action

Action 还集成了 React 19 `react-dom` 中的 `<form>` 新功能。

我们添加了对将函数作为 `action` 和 `<form>`、`<input>`、`<button>` 等元素的 `formAction` 属性传递的支持，使用 Action 自动提交表单的元素：

```jsx
```

### React DOM：新型 hook：`useFormStatus`

在设计系统中，通常会编写需要访问其所在 `<form>` 信息的设计组件，而无需将 `props` 向下透传到组件。

这可以通过 Context 实现，但为了使常见情况更容易，我们添加了一个全新的 `useFormStatus` Hook：

```jsx

function DesignButton() {
  const { pending } = useFormStatus()
  return <button type="submit" disabled={pending} />
}
```

### 新型 hook：`useOptimistic`

执行数据突变时的另一种常见 UI 模式是，在异步请求进行时乐观地展示最终状态。

在 React 19 中，我们添加了一个全新的 `useOptimistic` hook，从而简化此操作：

```jsx
  const [optimisticName, setOptimisticName] = useOptimistic(currentName)

  const submitAction = async formData => {
    const newName = formData.get('name')
    setOptimisticName(newName)
    const updatedName = await updateName(newName)
    onUpdateName(updatedName)
  }

  return (
    <form action={submitAction}>
      <p>Your name is: {optimisticName}</p>
      <p>
        <label>Change Name:</label>
        <input
          type="text"
          name="name"
          disabled={currentName !== optimisticName}
        />
      </p>
    </form>
  )
}
```

### 新型 API：`use`

在 React 19 中，我们引入了一个全新的 `use` API 来读取渲染中的资源。

举个栗子，我们可以使用 `use` 读取 promise 对象，React 会暂停直到该 promise 对象解决：

```jsx

function Comments({ commentsPromise }) {
  // use 会暂停直到 promise 解决。
  const comments = use(commentsPromise)
  return comments.map(comment => <p key={comment.id}>{comment}</p>)
}

function Page({ commentsPromise }) {
  // 当 use 在 Comments 组件中暂停时，
  // 这个 Suspense 会展示出来。
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  )
}
```

如果我们尝试将渲染中创建的 promise 对象传递给 `use`，React 会发出警告。

要修复此问题，我们需要传递一个支持缓存 promise 对象的框架或 Suspense 驱动的库中的 promise 对象。将来，我们计划发布某些功能，更轻松地在渲染中缓存 promise 对象。

我们还可以使用 `use` 读取 Context，这允许我们条件读取 Context，比如在提前返回后：

```jsx
import ThemeContext from './ThemeContext'

function Heading({ children }) {
  if (children == null) {
    return null
  }
  // 由于提前返回，
  // 这里使用 useContext 无法奏效。
  const theme = use(ThemeContext)
  return <h1 style={{ color: theme.color }}>{children}</h1>
}
```

## React 服务器组件

### 服务器组件

服务器组件是一个新选项，允许在打包之前在与客户端应用或 SSR 服务器分开的环境中提前渲染组件。

这个独立的环境是服务器组件中的“服务器”。服务器可以在构建时在 CI 服务器上运行一次，也可以使用 Web 服务器针对每个请求运行。

React 19 包含 Canary 版本中包含的所有服务器组件功能。这意味着，伴随服务器组件一起提供的库现在可以将 React 19 作为具有 `react-server` 导出条件的 peer 依赖，以便在支持全栈 React 架构的框架中使用。

粉丝请注意，**如何建立对服务器组件的支持**？

虽然 React 19 的服务器组件是稳定的，且不会在主版本间损坏，但用于实现服务器组件的打包器器或框架的底层 API 不遵循语义化版本规范，且可能在 React 19.x 的次版本间损坏。

为了支持服务器组件作为打包器或框架，我们建议锁定特定的 React 版本，或者使用 Canary 版本。我们会继续与打包器和框架合作，以稳定将来用于实现服务器组件的 API。

### Server Action（服务器操作）

服务器操作允许客户端组件调用在服务器上执行的异步函数。

当使用 `"use server"` 指令定义服务器操作时，您的框架会自动创建对服务器函数的引用，并将该引用传递给客户端组件。当客户端调用该函数时，React 会向服务器发送请求来执行该函数，并返回结果。

请注意，**没有专属服务器组件的指令**。

一个常见的误区是，服务器组件会使用 `"use server"` 表示，但其实服务器组件没有专属指令。`"use server"` 指令用于服务器操作。

服务器操作可以在服务器组件中创建，并作为属性传递给客户端组件，也可以在客户端组件中导入和使用。
