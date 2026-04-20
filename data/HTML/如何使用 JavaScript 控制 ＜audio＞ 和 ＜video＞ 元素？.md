---
level: 0.5
---

# 如何使用 JavaScript 控制 <audio> 和 <video> 元素？

## 参考答案

可以通过 DOM 方法和属性来操作这些媒体元素。

以下是一些常见的操作方法和示例：

### **1. 获取元素**

首先，使用 `document.getElementById()` 或其他选择器获取音频或视频元素的引用：

```javascript
const videoElement = document.getElementById('myVideo');
```

可以使用 `.play()` 和 `.pause()` 方法控制音频和视频的播放。

```javascript
audioElement.play();
videoElement.play();

// 暂停
audioElement.pause();
videoElement.pause();
```

使用 `.volume` 属性设置音量，范围是 0.0（静音）到 1.0（最大音量）。

```javascript
videoElement.volume = 0.7; // 设置音量为70%
```

使用 `.currentTime` 属性设置或获取当前播放时间（以秒为单位）。

```javascript
audioElement.currentTime = 30;
videoElement.currentTime = 30;

// 获取当前时间
const currentAudioTime = audioElement.currentTime;
const currentVideoTime = videoElement.currentTime;
```

可以为音频或视频元素添加事件监听器，例如监听播放、暂停、结束等事件。

```javascript
  console.log('Audio ended');
});

videoElement.addEventListener('play', () => {
  console.log('Video is playing');
});
```

使用 `.controls` 属性来显示或隐藏默认的音频/视频控件。

```javascript
videoElement.controls = false;  // 隐藏控件
```

```html
<video id="myVideo" src="video.mp4" width="640" height="360"></video>
<button id="playButton">Play</button>
<button id="pauseButton">Pause</button>

<script>
  const audioElement = document.getElementById('myAudio');
  const videoElement = document.getElementById('myVideo');
  const playButton = document.getElementById('playButton');
  const pauseButton = document.getElementById('pauseButton');

  playButton.addEventListener('click', () => {
    audioElement.play();
    videoElement.play();
  });

  pauseButton.addEventListener('click', () => {
    audioElement.pause();
    videoElement.pause();
  });
</script>
```
