---
level: 2
---

# 为何`setup()`中直接解构`props`会丢失响应性？

## 题目要点

`setup` 中直接解构 `props` 会丢失响应性，是因为解构会把属性值拷贝为普通变量，打断了与 `props` Proxy 的引用关系，导致 Vue 无法进行依赖收集。正确做法是直接使用 `props.xxx`，或通过 `toRefs / toRef` 将属性转换为保持响应性的 `ref`。

## 参考答案

在 Vue 3 中，`setup()` 里**直接解构 `props` 会丢失响应性**，根本原因在于：**响应式是依赖引用关系实现的，而解构会打断这种引用关系**。

下面从原理、示例和正确做法三个层面说明。

---

## 一、根本原因：解构会“拷贝值”，不再是响应式引用

在 `setup(props)` 中：

* `props` 本身是一个 **浅只读的响应式对象（Proxy）**
* Vue 的响应式系统是 **基于 getter / setter（Proxy 拦截）+ 依赖收集** 实现的
* **解构会把属性的当前值“取出来”，赋值给一个普通变量**

一旦解构：

```js
```

* `title` 是一个 **普通变量**
* 它不再通过 `props.title` 访问
* Vue 无法拦截 `title` 的读取
* 依赖收集链路断裂 → 响应性丢失

---

## 二、对比示例：为什么一个会更新，一个不会

### ❌ 错误示例（丢失响应性）

```js
  props: {
    title: String
  },
  setup(props) {
    const { title } = props;

    return { title };
  }
};
```

* `props.title` 变了
* 但 `title` 变量不会重新赋值
* 模板中使用 `{{ title }}` 不会更新

---

### ✅ 正确示例 1：不解构，直接使用 props

```js
  return { props };
}
```

```html
```

* 每次访问都走 `props.title`
* 响应式链路完整

---

### ✅ 正确示例 2：使用 `toRefs`（官方推荐）

```js

setup(props) {
  const { title } = toRefs(props);
  return { title };
}
```

* `title` 是一个 `Ref`
* 内部仍然指向 `props.title`
* 响应式未被破坏

模板中：

```html
```

### ✅ 正确示例 3：使用 `toRef`（单个字段）

```js

setup(props) {
  const title = toRef(props, 'title');
  return { title };
}
```

---

## 三、为什么 Vue 不“自动处理解构”？

这是一个**语言层面的限制**，不是 Vue 的设计疏忽：

```js
```

```js
```
* Vue 无法在不破坏 JS 语义的前提下自动劫持

因此 Vue 选择：

* **明确规则**
* **显式 API（toRefs / toRef）**
* 避免“隐式魔法”带来的不可预测行为
