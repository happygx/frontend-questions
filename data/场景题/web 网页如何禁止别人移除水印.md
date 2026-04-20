---
level: 4
---

# web 网页如何禁止别人移除水印

## 题目要点

使用 `MutationObserver` 这个较新的浏览器API，来检测DOM元素的删除事件、以及DOM元素属性的修改事件。

## 参考答案

## 防止DOM被删除

为了防止水印被删除，可以利用 `MutationObserver API` 监听 DOM 变化。`MutationObserver` 可以监控 DOM 树的变化并触发回调函数。回调函数可以用于检测水印是否被移除，并采取相应的措施进行恢复。

以下是一个示例代码，演示了如何使用 `MutationObserver` 监听 DOM 变化并检测水印的删除：

```javascript
const targetNode = document.body;

// 创建 MutationObserver 实例
const observer = new MutationObserver(mutationsList => {
    mutationsList.forEach(mutation => {
        // 检查是否有子节点被删除
        if (mutation.removedNodes.length > 0) {
            // 检查被删除的节点是否为水印
            // 如果是，则重新插入水印元素
            // targetNode.appendChild(watermarkElement);
        }
    });
});

// 配置 MutationObserver
const config = { childList: true, subtree: true };

// 开始观察目标节点
observer.observe(targetNode, config);
```

需要注意的是，`MutationObserver` 是现代浏览器的特性，可能不兼容老旧浏览器。因此，实际应用中应考虑浏览器兼容性。

此外，为了确保水印能迅速恢复，可以在检测到水印被删除时立即执行插入操作。

## 防止DOM被隐藏

除了防止DOM被删除，还要考虑DOM被隐藏的情况。

要检测到水印DOM被设置为 `display: none` 隐藏，可以通过 `MutationObserver` 观察元素的属性变化，而不是仅仅关注子节点的删除。监听 `attributes` 类型的变化，以检测到 `display` 样式属性的改变。

以下示例展示了如何监控 `display` 属性的变化：

```javascript
const watermarkElement = document.querySelector('.watermark');

// 创建 MutationObserver 实例
const observer = new MutationObserver(mutationsList => {
    mutationsList.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            // 检查水印的 display 属性是否被设置为 none
            if (getComputedStyle(watermarkElement).display === 'none') {
                // 如果水印被隐藏，重新显示水印
                watermarkElement.style.display = 'block';
            }
        }
    });
});

// 配置 MutationObserver
const config = { attributes: true, subtree: true, attributeFilter: ['style'] };

// 开始观察目标节点
observer.observe(document.body, config);
```
1. **目标节点**：在代码中，`watermarkElement` 代表水印元素。请确保选择器正确。
2. **MutationObserver 实例**：观察属性变化 (`attributes`) 和特定的属性 `style`。
3. **属性变化检测**：在回调函数中，使用 `getComputedStyle` 检查 `display` 属性的值。如果水印被设置为 `display: none`，则将其恢复为 `display: block`。
