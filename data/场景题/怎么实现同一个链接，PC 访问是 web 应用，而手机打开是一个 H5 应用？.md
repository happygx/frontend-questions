---
level: 2
---

# 怎么实现同一个链接，PC 访问是 web 应用，而手机打开是一个 H5 应用？

## 题目要点

1. **服务器端检测**：根据 `User-Agent` 处理不同设备的请求。
2. **客户端检测**：在客户端 JavaScript 中根据 `navigator.userAgent` 进行判断并重定向。
3. **响应式设计**：使用 CSS 媒体查询在同一 URL 上适配不同设备。
4. **框架支持**：使用支持设备适配的前端框架或库。

## 参考答案

要实现同一个链接在 PC 上打开 Web 应用，在手机上打开 H5 应用，可以利用用户代理检测和条件渲染。以下是常见的实现方法：

### **1. 服务器端检测用户代理**

在服务器端，根据用户的请求头中的 `User-Agent` 字段来判断是 PC 还是手机访问，并返回不同的应用内容。

#### **示例（Node.js/Express）**

```javascript
const app = express();

app.get('/', (req, res) => {
  const userAgent = req.headers['user-agent'];
  const isMobile = /mobile/i.test(userAgent);

  if (isMobile) {
    // 返回 H5 应用
    res.sendFile(__dirname + '/path/to/mobile/index.html');
  } else {
    // 返回 Web 应用
    res.sendFile(__dirname + '/path/to/pc/index.html');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

在客户端使用 JavaScript 检测用户设备类型，然后动态加载适合的内容或重定向到不同的页面。

#### **示例（客户端 JavaScript）**

```javascript
  // 重定向到 H5 应用
  window.location.href = 'https://m.example.com';
} else {
  // 继续显示 Web 应用
}
```

通过响应式设计来适配不同设备，所有内容都可以在同一 URL 上访问，但会根据设备的屏幕尺寸和特性显示不同的内容。

#### **示例（CSS 媒体查询）**

```css
@media only screen and (max-width: 600px) {
  .web-app {
    display: none;
  }
  .h5-app {
    display: block;
  }
}

/* PC 样式 */
@media only screen and (min-width: 601px) {
  .web-app {
    display: block;
  }
  .h5-app {
    display: none;
  }
}
```

有些前端框架和库支持根据设备类型动态加载不同的内容。你可以利用这些工具进行设备适配。

#### **示例（React）**

```javascript
import { useMediaQuery } from 'react-responsive';

const App = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  return (
    <div>
      {isMobile ? <MobileApp /> : <PCApp />}
    </div>
  );
};
```
