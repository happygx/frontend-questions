---
level: 0.5
---

# 实现一个 cookies 解析函数，输出结果要求是一个对象

## 参考答案

可以先通过访问 `document.cookie` 来获取当前页面的所有 cookie 字符串，然后将其解析为一个对象，其中每个 cookie 的名称和值都会作为对象的键值对。

以下是一个简单的实现：

```javascript
  const cookies = document.cookie;  // 获取所有 cookie 字符串
  const cookieObj = {};  // 用于存储解析结果的对象

  // 如果 cookies 非空，开始解析
  if (cookies) {
    // 将 cookies 字符串按 '; ' 分割成数组
    const cookieArray = cookies.split('; ');

    // 遍历数组，逐个解析 cookie
    cookieArray.forEach(cookie => {
      const [name, value] = cookie.split('=');  // 按 '=' 分割每个 cookie
      cookieObj[decodeURIComponent(name)] = decodeURIComponent(value);  // 解码并存入对象
    });
  }

  return cookieObj;
}

// 示例使用
console.log(parseCookies());
```
1. `document.cookie` 会返回当前页面的所有 cookie 字符串，多个 cookie 之间是以 `;` 分隔的。
2. 我们将整个 `cookie` 字符串通过 `split('; ')` 分割成一个数组，每个元素对应一个 `name=value` 形式的 cookie。
3. 对于每个 cookie，通过 `split('=')` 将它拆分为名称和值。
4. 使用 `decodeURIComponent` 对 cookie 的名称和值进行解码，以防止存在编码过的特殊字符。
5. 最后，将解析后的 cookie 名称和值存入一个对象中并返回。

### 示例：
假设浏览器中的 `document.cookie` 包含如下 cookies：

```
```

```javascript
  user: "JohnDoe",
  sessionId: "abc123",
  theme: "dark"
}
```
- 如果 cookie 字符串包含特殊字符（如空格、`=`, `;` 等），`decodeURIComponent` 会确保它们正确地被解码。
- `document.cookie` 获取的值会受到同源策略的限制，也就是说，只有与当前页面相同域名下的 cookies 才能被访问。
