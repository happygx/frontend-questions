---
level: 2.5
---

# 说说你对 API IntersectionObserver 的理解，它有什么使用场景？

## 题目要点

`IntersectionObserver` API 可以高效地处理页面中元素与视口的交集状态检测，特别适用于 **懒加载**、**无限滚动**、**广告跟踪**、**可见性监控** 和 **动画效果** 等场景。

它相比传统的滚动事件和手动计算位置的方式，具有更好的性能和响应速度，是实现现代 Web 应用时非常有价值的 API。

## 参考答案

`IntersectionObserver` 是一个用于监听元素与其祖先元素或视口（viewport）交叉状态的 Web API。它允许我们异步观察元素与其它元素（如视口）的交集变化，而无需通过滚动事件、resize 事件等手动监听和计算位置来实现。这使得它在处理大量元素交互或视图可见性检查时，效率更高，不容易导致性能瓶颈。

### **工作原理**

`IntersectionObserver` 主要通过以下两个概念来工作：

1. **观察目标元素**：`IntersectionObserver` 通过 `observe()` 方法开始监听一个或多个目标元素的交集变化。
2. **回调函数**：每当目标元素的可见区域或与指定视口的交集发生变化时，回调函数会被触发。回调函数会接收到一个包含多个 `IntersectionObserverEntry` 的数组，这些条目描述了每个目标元素与观察区域的交集情况。

```js
  entries.forEach(entry => {
    // entry.isIntersecting: 判断元素是否在视口内
    if (entry.isIntersecting) {
      console.log('元素进入视口');
    }
  });
}, {
  root: null,  // 视口为浏览器窗口
  rootMargin: '0px', // 视口的 margin
  threshold: 0.5 // 目标元素至少有50%进入视口时触发回调
});

// 监听目标元素
const target = document.querySelector('#target');
observer.observe(target);
```

1. **root**：指定交集的根元素，通常设置为 `null`，表示视口。可以将其设置为某个容器元素，来监听该容器与目标元素的交集。
2. **rootMargin**：相对于根元素的 margin，可以通过它来拓宽或缩小视口边界（比如设置 `-100px` 来提前触发）。
3. **threshold**：一个数字或数字数组，表示目标元素与根元素交集的比例，只有交集比例满足这个阈值时，回调才会被触发。

### **返回值**

回调函数会接收到 `IntersectionObserverEntry` 的数组。每个 `IntersectionObserverEntry` 包含了以下信息：
- `target`：目标元素。
- `isIntersecting`：一个布尔值，表示目标元素是否与根元素发生交集（即是否在视口内）。
- `intersectionRatio`：交集比例，表示目标元素与根元素交集的面积占目标元素总面积的比例。
- `boundingClientRect`：目标元素的边界框（包括它的位置和尺寸）。
- `intersectionRect`：目标元素与根元素交集的区域。
- `time`：记录触发回调的时间戳。

### **使用场景**

`IntersectionObserver` 主要应用于检测元素是否在视口内，这在很多场景中都非常有用，尤其是在性能优化方面。以下是一些常见的使用场景：

#### 1. **懒加载（Lazy Loading）**
懒加载指的是只有当图片、视频、广告等元素接近视口时才加载它们。这种方式能显著提高页面加载速度，避免不必要的资源加载。

**示例：**

```js
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;  // 将图片的真实 src 地址设置到 img 标签上
      img.classList.remove('lazy-load');
      observer.unobserve(img);  // 停止观察该图片
    }
  });
}, {
  threshold: 0.1  // 图片至少 10% 进入视口时加载
});

images.forEach(img => {
  imageObserver.observe(img);
});
```
通过 `IntersectionObserver` 来检测分页内容是否已被滚动到底部，可以触发加载更多内容的操作，优化用户体验。

**示例：**

```js
const loadMoreObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadMore();  // 加载更多内容
    }
  });
}, {
  root: null, // 根元素为视口
  threshold: 1.0  // 目标元素完全进入视口时触发
});

loadMoreObserver.observe(loadMoreButton);
```
可以使用 `IntersectionObserver` 检测元素是否进入视口，进而触发动画或记录元素是否被用户看到。这常用于广告展示、内容分析等场景。

**示例：**

```js
const visibilityObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('广告展示给用户看了');
      // 触发广告展示统计
    }
  });
}, {
  threshold: 0.5  // 至少 50% 的广告元素进入视口时触发
});

visibilityObserver.observe(adBanner);
```
`IntersectionObserver` 可用于触发滚动时的动画效果。当目标元素进入视口时，可以启动动画，例如淡入效果或平滑滚动效果。

**示例：**

```js
const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
    }
  });
}, {
  threshold: 0.2  // 元素至少 20% 进入视口时触发动画
});

elements.forEach(element => {
  fadeInObserver.observe(element);
});
```

- **性能优势**：与传统的 `scroll` 事件相比，`IntersectionObserver` 能更高效地处理大量元素的可见性检测。它是异步的，不会阻塞主线程，也不会频繁触发，因此能够显著减少性能开销。
- **避免不必要的计算**：使用 `IntersectionObserver`，我们可以避免在每次滚动或调整窗口大小时进行计算。它只在交集状态变化时才触发回调，使得页面响应速度更快。
