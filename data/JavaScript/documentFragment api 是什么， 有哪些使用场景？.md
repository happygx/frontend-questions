---
level: 1
---

# documentFragment api 是什么， 有哪些使用场景？

## 题目要点

`DocumentFragment` 是一个轻量级的 DOM 容器，允许在内存中构建 DOM 结构并进行操作，直到最后一步才将内容插入到实际页面中。它的主要优点是能够减少页面重排和重绘，提高性能，尤其适用于批量插入节点、动态内容生成和模板渲染等场景。

## 参考答案

### `DocumentFragment` API 介绍

`DocumentFragment` 是一个轻量级的 **Document** 对象，旨在将多个 DOM 元素操作批量化，从而提升性能。它可以理解为一个临时的“容器”，用于在内存中存储和操作 DOM 元素，但它本身并不会直接影响页面的渲染。`DocumentFragment` 的主要优势是可以减少频繁的重排（reflow）和重绘（repaint），因此在大规模操作 DOM 时，使用 `DocumentFragment` 可以显著提高性能。

### `DocumentFragment` 的特点
- **不引起页面重新渲染**：将元素添加到 `DocumentFragment` 中不会直接影响页面的渲染，直到 `DocumentFragment` 被插入到真实的 DOM 中。
- **轻量级容器**：`DocumentFragment` 是一个轻量级的容器，不会创建额外的节点，也不占据实际页面的渲染位置，因此不会对页面的性能造成额外的负担。
- **可以容纳多个 DOM 元素**：可以将多个节点、元素或文本节点等添加到 `DocumentFragment` 中，进行批量操作。

### `DocumentFragment` 常见用法

#### 1. **批量插入节点**
   当你需要一次性插入多个 DOM 元素时，使用 `DocumentFragment` 可以避免每次插入元素时都引发页面重排，提升性能。

   **示例：**

   ```javascript
   const fragment = document.createDocumentFragment();
   const ul = document.querySelector('ul');
   
   for (let i = 0; i < 1000; i++) {
     const li = document.createElement('li');
     li.textContent = `Item ${i + 1}`;
     fragment.appendChild(li); // 将元素添加到 fragment 中
   }

   ul.appendChild(fragment); // 一次性插入所有 li 元素
   ```

   这样，你将所有的 `<li>` 元素添加到 `DocumentFragment` 中，直到所有元素都准备好后，再将它们批量插入到 `<ul>` 中，避免了每次添加 `<li>` 时都会触发页面的重排和重绘。

#### 2. **提高动态内容插入的性能**
   如果你需要通过 JavaScript 动态生成大量内容并将它们插入 DOM，可以使用 `DocumentFragment` 来在内存中构建整个 DOM 结构，再一次性将其添加到页面中，避免频繁操作 DOM 带来的性能问题。

   **示例：**

   ```javascript
   const fragment = document.createDocumentFragment();
   
   // 假设你要插入的元素列表
   const items = ['Item 1', 'Item 2', 'Item 3'];

   items.forEach(item => {
     const div = document.createElement('div');
     div.textContent = item;
     fragment.appendChild(div); // 将元素添加到 DocumentFragment 中
   });

   document.body.appendChild(fragment); // 一次性插入到页面中
   ```

   在这种场景下，`DocumentFragment` 是一个在内存中完成所有 DOM 操作的临时容器，只有最后一步将所有内容插入到页面中。

#### 3. **避免影响现有 DOM 元素**
   你可以使用 `DocumentFragment` 来处理不希望立即影响现有 DOM 结构的情况。例如，当你需要在 DOM 中进行一系列修改，但又不希望用户看到这些修改的过程时，可以使用 `DocumentFragment`。

   **示例：**

   ```javascript
   const fragment = document.createDocumentFragment();
   
   // 创建新节点，并添加到 fragment 中
   const newElement = document.createElement('div');
   newElement.textContent = 'New Element';
   fragment.appendChild(newElement);

   // 进行其他 DOM 操作
   // 最后，将 fragment 插入到 DOM 中
   document.body.appendChild(fragment);
   ```

   在这个例子中，所有的元素操作都是在 `DocumentFragment` 内部进行的，只有在所有操作完成后，才将结果插入到页面中。

#### 4. **模板生成**
   `DocumentFragment` 也常用于从模板生成 DOM 元素。例如，结合 `<template>` 标签，可以在不立即渲染的情况下将模板内容批量处理。

   **示例：**

   ```html
   <template id="my-template">
     <div class="item">Item</div>
   </template>
   ```

   ```javascript
   const fragment = document.createDocumentFragment();
   const template = document.getElementById('my-template');

   // 创建多个实例
   for (let i = 0; i < 5; i++) {
     const clone = document.importNode(template.content, true); // 克隆模板内容
     fragment.appendChild(clone); // 添加到 DocumentFragment 中
   }

   document.body.appendChild(fragment); // 批量插入页面中
   ```

### 使用场景总结

- **批量 DOM 操作**：当需要插入多个元素时，通过 `DocumentFragment` 先在内存中完成所有 DOM 操作，最后一次性插入到页面中，避免频繁的页面重排和重绘。
- **动态内容生成**：在构建动态内容时，可以使用 `DocumentFragment` 在内存中处理这些内容，避免页面在处理过程中不断更新，提升性能。
- **高效的渲染**：使用 `DocumentFragment` 可以避免中途对页面造成不必要的影响，尤其在需要处理大量数据或复杂交互时，能够提升页面的响应速度和渲染效率。
