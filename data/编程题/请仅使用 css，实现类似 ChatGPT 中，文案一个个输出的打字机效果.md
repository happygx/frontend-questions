---
level: 3
---

# 请仅使用 css，实现类似 ChatGPT 中，文案一个个输出的打字机效果

## 题目要点

使用 `@keyframes` + `steps()` + `overflow` 实现字符逐个显示的打字机效果，再配合 `border-right` 营造光标感。纯 CSS 可实现基本效果，复杂场景可结合 JS 控制 timing 和内容。

## 参考答案

可以使用纯 CSS 的动画 `@keyframes` 搭配 `ch` 单位实现。

下面是一个基础的示例：

### **HTML 结构**

```html
  <p class="text">你好，我是 xx 机器人，很高兴为你服务。</p>
</div>
```

```css
  width: fit-content;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid black; /* 光标效果 */
}

.text {
  display: inline-block;
  animation: typing 3s steps(20, end), blink 0.7s step-end infinite;
  font-family: monospace;
  font-size: 18px;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 21ch; /* 与文字字符数相同 */
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
```
- `steps(n)`：打字机的关键，让字符一个个出现。`n` 需要与字符数量匹配。
- `overflow: hidden + white-space: nowrap`：隐藏还未“打印”的字符。
- `border-right`：模拟打字机的光标，并配合 `blink` 动画闪烁。
