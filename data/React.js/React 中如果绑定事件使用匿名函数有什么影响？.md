---
level: 1
---

# React 中如果绑定事件使用匿名函数有什么影响？

## 参考答案

```react.js
class Demo {
  render() {
    return <button onClick={(e) => {
      alert('我点击了按钮')
    }}>
      按钮
    </button>
  }
}

```
