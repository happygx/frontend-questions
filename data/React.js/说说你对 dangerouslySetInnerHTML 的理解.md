---
level: 1
---

# 说说你对 dangerouslySetInnerHTML 的理解

## 题目要点

`dangerouslySetInnerHTML` 是 React 中一个非常强大但也非常危险的属性。它允许开发者直接将 HTML 字符串插入到 React 组件的 DOM 中,而不是使用 React 的标准 JSX 语法。

使用 `dangerouslySetInnerHTML` 有以下几个注意事项:

1. **XSS 风险**:
   - 由于直接插入 HTML 字符串,如果字符串中包含恶意的 JavaScript 代码,就可能导致 XSS (跨站脚本攻击)漏洞。
   - 这意味着恶意攻击者可以通过注入恶意代码来窃取用户数据或破坏页面。

2. **性能影响**:
   - 直接操作 DOM 可能会导致性能问题,因为 React 无法对其进行优化和diff。
   - 相比之下,使用标准 JSX 语法可以让 React 对 DOM 进行高效的更新和渲染。

3. **可维护性降低**:
   - 使用 `dangerouslySetInnerHTML` 会降低代码的可读性和可维护性,因为它打破了 React 的声明式渲染模型。
   - 代码中会出现一些难以理解的 HTML 字符串,使得代码变得难以维护。

因此,`dangerouslySetInnerHTML` 应该谨慎使用,只有在确实没有其他更好的解决方案时才可以考虑使用。通常情况下,我们应该尽量避免使用它,而是使用标准的 React 渲染方式。如果必须使用,则需要非常小心地对输入进行严格的过滤和消毒,以防止 XSS 攻击。

## 参考答案

本文介绍了在React应用程序中使用`dangerouslySetInnerHTML` 属性的原因，它相当于浏览器DOM中的`innerHTML` 属性。

## 什么是`dangerouslySetInnerHTML` ？

`dangerouslySetInnerHTML` 是一个属性，你可以在 React 应用程序中的 HTML 元素上使用，以编程方式设置其内容。你可以直接在元素上使用这个属性，而不是使用选择器来抓取HTML元素，然后设置其`innerHTML` 。

当使用`dangerouslySetInnerHTML` ，React也知道该特定元素的内容是动态的，对于该节点的子节点，它只是跳过与虚拟DOM的比较，以获得一些额外的性能。

正如该属性的名称所暗示的，使用它可能是危险的，因为它使你的代码容易受到跨站脚本（XSS）攻击。特别是当你从第三方来源获取数据或渲染用户提交的内容时，这就成为一个问题。

## 何时使用`dangerouslySetInnerHTML`

你需要设置DOM元素的HTML内容的一个用例是当你用来自富文本编辑器的数据填充一个`<div>` 。想象一下，你有一个网页，人们可以提交评论，你允许他们使用一个富文本编辑器。在这种情况下，富文本编辑器的输出很可能是带有标签的HTML，如`<p>`,`<b>`, 和`<img>` 。

考虑一下下面的代码片段，它将在不知道其中的`<b>` 标签的情况下渲染字符串--意味着输出的只是字符串本身，没有任何粗体字，就像这样：lorem **ipsum**。

```javascript
  const data = 'lorem <b>ipsum</b>';

  return (
    <div>
      {data}
    </div>
  );
}

export default App;
```

```ini
  const data = 'lorem <b>ipsum</b>';

  return (
    <div
      dangerouslySetInnerHTML={{__html: data}}
    />
  );
}

export default App;
```

传递对象的要求只是另一种保障措施，以防止开发者在没有阅读文档和意识到潜在危险的情况下使用它。

## 使用时的消毒`dangerouslySetInnerHTML`

上面的例子在渲染时不会造成危险。然而，在某些情况下，HTML元素可能会执行一个脚本。

考虑一下下面的例子，一个JavaScript事件被附加到一个HTML元素上。虽然这些是无害的例子，但它们是概念的证明，表明一个HTML元素如何被利用来运行恶意脚本。

```ini
  const data = `lorem <b onmouseover="alert('mouseover');">ipsum</b>`;

  return (
    <div
      dangerouslySetInnerHTML={{__html: data}}
    />
  );
}

export default App;


const App = () => {
  const data = `lorem ipsum <img src="" onerror="alert('message');" />`;

  return (
    <div
      dangerouslySetInnerHTML={{__html: data}}
    />
  );
}

export default App;
```

让我们使用它的[在线演示](https://cure53.de/purify)来对上述HTML代码进行消毒，看看它是如何检测并过滤掉代码中可能在执行时产生危险的部分的。

```less
lorem <b onmouseover="alert('mouseover');">ipsum</b>

Sanitized
lorem <b>ipsum</b>
```
Original
lorem ipsum <img src="" onerror="alert('message');" />

Sanitized
lorem ipsum <img src="">
```

```javascript

const App = () => {
  const data = `lorem <b onmouseover="alert('mouseover');">ipsum</b>`
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(data)
  })

  return (
    <div
      dangerouslySetInnerHTML={sanitizedData()}
    />
  );
}

export default App;
```

正如预期的那样，当我们将鼠标悬停在粗体字上时，并没有执行警报函数。

请注意，由于DOMPurify需要一个DOM树，而Node环境没有，你要么使用`jsdom` 包来创建一个`window` 对象，并用它来初始化`DOMPurify` ，要么单独使用`isomorphic-dompurify` 包来代替，它同时封装了`DOMPurify` 和`jsdom` 包。

如果你喜欢第一种选择，你可以参考以下来自`DOMPurify` 的文档片段。

```ini
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const clean = DOMPurify.sanitize(dirty);
```

总之，`dangerouslySetInnerHTML` 只不过是React中`innerHTML` 的替代品，应该谨慎使用。虽然这个名字暗示了使用它的危险性，但通过使用一个完善的净化器采取必要的措施，确保代码是干净的，在React节点内呈现时不会运行意外的脚本。
