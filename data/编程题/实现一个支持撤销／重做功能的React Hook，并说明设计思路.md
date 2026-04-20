---
level: 4.5
---

# 实现一个支持撤销/重做功能的React Hook，并说明设计思路

## 题目要点

撤销 / 重做的本质是对状态时间线的管理；通过 past / present / future 的三段式模型，可以用 O(1) 的方式完成撤销和重做；在 React 中用自定义 Hook 封装这一模型，结合函数式 setState，既保证了可预测性，也便于在复杂编辑场景中复用和扩展。

## 参考答案

实现“撤销 / 重做”的核心是**状态历史的建模方式**。

下面从 **设计思路 → 数据结构 → Hook 实现 → 使用与边界** 四个层次说明。

---

## 一、核心设计思路

撤销 / 重做问题，本质是对**状态时间线**的管理：

* 撤销：回到上一个状态
* 重做：回到下一个状态
* 新操作发生时：未来状态失效

因此不能只保存“当前值”，而需要显式维护**过去、现在、未来**三段。

一个成熟的设计目标通常包括：

* 操作是纯同步、可预测的
* 撤销 / 重做是 O(1)
* 不依赖具体业务数据结构
* 与 React 更新模型天然契合

---

## 二、状态模型设计

最常见、也是最稳定的模型是三段式结构：

```ts
  past: T[]        // 历史状态
  present: T       // 当前状态
  future: T[]      // 可重做状态
}
```

* **set**

  * past += present
  * present = newState
  * future 清空
* **undo**

  * future.unshift(present)
  * present = past.pop()
* **redo**

  * past.push(present)
  * present = future.shift()

这是 Redux Undo/Redo、编辑器、协同系统中最常见的模型。

---

## 三、Hook 的实现

```ts

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

export function useUndoRedo<T>(initialValue: T) {
  const [state, setState] = useState<HistoryState<T>>({
    past: [],
    present: initialValue,
    future: [],
  });

  const set = useCallback((value: T) => {
    setState(prev => ({
      past: [...prev.past, prev.present],
      present: value,
      future: [],
    }));
  }, []);

  const undo = useCallback(() => {
    setState(prev => {
      if (prev.past.length === 0) return prev;

      const previous = prev.past[prev.past.length - 1];
      const newPast = prev.past.slice(0, -1);

      return {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState(prev => {
      if (prev.future.length === 0) return prev;

      const next = prev.future[0];
      const newFuture = prev.future.slice(1);

      return {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  return {
    state: state.present,
    set,
    undo,
    redo,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
  };
}
```

## 四、使用示例

```tsx
  state,
  set,
  undo,
  redo,
  canUndo,
  canRedo
} = useUndoRedo('');

<input
  value={state}
  onChange={e => set(e.target.value)}
/>

<button disabled={!canUndo} onClick={undo}>撤销</button>
<button disabled={!canRedo} onClick={redo}>重做</button>
```

## 五、关键设计点说明（面试重点）

### 为什么不用数组直接存所有历史？

因为撤销 / 重做不是线性回放，而是“时间分叉”问题。
三段式模型能明确区分“已发生”和“可重做”。

---

### 为什么新 set 要清空 future？

因为一旦产生新操作，原本的“未来时间线”已经不再成立，这是编辑器领域的基本约定。

---

### 为什么用函数式 setState？

确保在高频更新、并发渲染（Concurrent Mode）下状态是安全的，避免闭包读取旧 state。

---

## 六、工程级优化点（进阶）

### 限制历史长度（防止内存增长）

```ts

past: [...prev.past, prev.present].slice(-MAX)
```

### 支持函数式更新（类似 setState）

```ts
  setState(prev => {
    const next =
      typeof updater === 'function'
        ? (updater as any)(prev.present)
        : updater;

    return {
      past: [...prev.past, prev.present],
      present: next,
      future: [],
    };
  });
};
```

### 支持批量合并（如输入法、拖拽）

* debounce set
* 或提供 `commit()` API

---

## 七、适用与不适用场景

适用：

* 表单编辑
* 富文本 / 画布
* 配置面板
* 低频但可回退的用户操作

不适用：

* 高频实时数据（如动画帧）
* 大对象深拷贝成本极高的场景（需结构共享）
