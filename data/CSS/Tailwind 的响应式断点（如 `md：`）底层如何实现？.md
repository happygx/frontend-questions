---
level: 2
---

# Tailwind 的响应式断点（如 `md:`）底层如何实现？

## 题目要点

Tailwind 的响应式断点基于构建期的变体系统实现。`md:` 在编译阶段被解析为 screen 变体，并根据 `screens` 配置生成对应的 `@media (min-width)` 包裹规则。所有响应式逻辑依赖原生 CSS media query，遵循 mobile-first 原则，通过规则生成管线支持多变体组合，不涉及运行时计算。

## 参考答案

这个问题的关键在于理解：
`md:` 不是运行时逻辑，而是 **构建期的变体（variant）展开机制**。

在 Tailwind CSS 中，响应式系统建立在三个核心之上：

* screens 配置映射
* 变体解析机制
* JIT 构建阶段规则生成

---

## 一、`md:` 本质是什么？

当写：

```html
```

* variant：`md`
* utility：`text-red-500`

然后生成如下 CSS：

```css
  .md\:text-red-500 {
    color: #ef4444;
  }
}
```

* `md:` 只是一个前缀标记
* 构建阶段转换成 `@media`
* 冒号会被转义为合法 CSS 选择器

---

## 二、断点从哪里来？

断点定义在配置文件中：

```js
module.exports = {
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    }
  }
}
```

```css
```

---

## 三、构建阶段做了什么？

在 JIT 模式下，流程是：

1. 扫描源码中的 class
2. 拆分出 variant 与 utility
3. 生成基础规则
4. 根据 variant 包裹规则

例如：

```html
```

* variant1：md
* variant2：hover
* utility：text-red-500

生成结果：

```css
  .md\:hover\:text-red-500:hover {
    color: #ef4444;
  }
}
```

---

## 四、为什么不是运行时判断？

原因有两个：

第一，性能稳定。
所有规则提前生成，浏览器只执行标准 CSS。

第二，逻辑简单。
完全依赖浏览器原生 `@media` 机制，不需要 JS 监听 resize。

---

## 五、移动优先原则

Tailwind 默认采用 mobile-first。

写法：

```html
```

* 默认红色
* 屏幕宽度 ≥ 768px 时变蓝

生成顺序保证：

* 基础规则在前
* media query 在后
* 利用 CSS 层叠覆盖

---

## 六、抽象理解

可以把 Tailwind 的响应式机制理解为：

对基础 utility 规则进行“包装”。

伪逻辑可以理解为：

```
如果有 screen 变体 → 用 @media 包裹
如果有伪类变体 → 添加伪类选择器
```
