---
level: 3.5
---

# react是否支持给标签设置自定义的属性，比如给video标签设置webkit-playsinline？

## 题目要点

React 确实支持给标签设置自定义属性,包括 `webkit-playsinline` 这样的非标准属性。

在 React 中,您可以通过标准的 JSX 语法直接将自定义属性添加到元素上:

```jsx
```

```jsx
```

需要注意的是,虽然 React 支持自定义属性,但并不意味着所有浏览器都会识别和处理这些属性。一些非标准属性可能只在特定的浏览器环境下有效,所以在使用时需要谨慎,并做好跨浏览器的兼容性测试。

## 参考答案

如果你在react中这么样写：

```js
<div mycustomattribute="something" />
```

```js
<div />
```

```js
<div mycustomattribute="something" />
```

所以目前可以这样添加 webkit-playsinline 属性：

```js
	<source src="https://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4"/>
</video>
```

```js
import { Component } from 'react';

export class VideoComponent extends Component {
  videoContainer: HTMLDivElement;
  componentDidMount() {
    const video = document.createElement('video');
    video.autoplay = true;
    video.loop = true;
    video.muted = true; // fixes autoplay in chrome
    video.setAttribute('playsinline', 'true'); // fixes autoplay in webkit (ie. mobile safari)

    const source = document.createElement('source');
    source.src = '/path/to/your/video.mp4';
    source.type = 'video/mp4';
    video.appendChild(source);

    this.videoContainer.appendChild(video);
  }
  render() {
    return (
      <div ref={(ref) => { this.videoContainer = ref; }} />
    );
  }
}

```
