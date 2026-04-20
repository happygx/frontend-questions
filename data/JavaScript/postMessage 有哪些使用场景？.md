---
level: 2
---

# postMessage 有哪些使用场景？

## 题目要点

postMessage的使用场景主要包括以下几个方面：

1. **跨域通信**：postMessage是HTML5引入的API，它允许来自不同源的脚本采用异步方式进行有效的通信。这意味着它可以在不同文档（如页面、iframe或弹出窗口）之间进行跨域消息传递，从而解决了传统跨域通信的限制。这是postMessage最为常见的使用场景之一。

2. **Web Worker通信**：在JavaScript中，Web Worker提供了一种在后台线程中运行脚本的方法，以避免复杂或耗时的计算阻塞用户界面。通过postMessage，主线程可以与Web Worker之间发送和接收消息，实现数据的交互和通信。

3. **iframe与父页面通信**：在Web开发中，iframe经常用于嵌入外部页面或内容。通过postMessage，iframe可以安全地向父页面发送消息，父页面也可以向iframe发送消息，实现两者之间的数据交换和通信。

4. **页面与浏览器插件通信**：如果Web页面需要与浏览器插件进行通信，postMessage同样是一个有效的解决方案。通过postMessage，页面可以向插件发送消息，插件也可以向页面发送消息，实现两者之间的数据传递和功能调用。

5. **跨窗口通信**：在Web应用中，可能需要在不同浏览器窗口或标签页之间进行通信。postMessage允许这些窗口通过发送和接收消息来实现数据的共享和状态的同步。

## 参考答案

# window.postMessage 定义
 
`window.postMessage()` 方法可以安全地实现跨源通信。`window.postMessage()` 方法提供了一种受控机制来规避此限制，只要正确的使用，这种方法就很安全

## 用途
可用于两个不同的Ifrom（不同源） 之间的通讯

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage#syntax "Permalink to 语法")

```
```
-   `data`

    从其他 window 中传递过来的对象。

-   `origin`

    调用 `postMessage`  时消息发送方窗口的 [origin](https://developer.mozilla.org/en-US/docs/Origin "This is a link to an unwritten page") . 这个字符串由 协议、“://“、域名、“ : 端口号”拼接而成。例如 “`https://example.org` (隐含端口 `443`)”、“`http://example.net` (隐含端口 `80`)”、“`http://example.com:8080`”。请注意，这个origin不能保证是该窗口的当前或未来origin，因为postMessage被调用后可能被导航到不同的位置。

-   `source`

    对发送消息的[窗口](https://developer.mozilla.org/en-US/docs/Web/API/Window)对象的引用; 您可以使用此来在具有不同origin的两个窗口之间建立双向通信。

## 例子

### 子框架传递信息


```

// 子框架向父框架发送信息

function goParentIfromPostMessage(msg,parentUrl){

    var parentUrl = window.parent.location.origin;

        window.onload=function(){

        window.parent.postMessage(msg,parentUrl);

        }
    }
 }
 
    goParentIfromPostMessage('msgStr',parentIfromUrl)

</script>

```

```

        window.addEventListener('message',function(e){

            console.log(e.origin,e.data);

            console.log(e.data);

        })

</script>

 ```
这样即可以实现简单的框架跨域通信，但是会有一些安全问题

## [安全问题](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage#security_concerns "Permalink to 安全问题")

**如果您不希望从其他网站接收message，请不要为message事件添加任何事件侦听器。** 这是一个完全万无一失的方式来避免安全问题。

如果您确实希望从其他网站接收message，请**始终使用origin和source属性验证发件人的身份**。 任何窗口（包括例如http://evil.example.com）都可以向任何其他窗口发送消息，并且您不能保证未知发件人不会发送恶意消息。 但是，验证身份后，您仍然应该**始终验证接收到的消息的语法**。 否则，您信任只发送受信任邮件的网站中的安全漏洞可能会在您的网站中打开跨网站脚本漏洞。

**当您使用postMessage将数据发送到其他窗口时，始终指定精确的目标origin，而不是*。** 恶意网站可以在您不知情的情况下更改窗口的位置，因此它可以拦截使用postMessage发送的数据。

### [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage#example "Permalink to 示例")

```
 * A窗口的域名是<http://example.com:8080>，以下是A窗口的script标签下的代码：
 */

var popup = window.open(...popup details...);

// 如果弹出框没有被阻止且加载完成

// 这行语句没有发送信息出去，即使假设当前页面没有改变location（因为targetOrigin设置不对）
popup.postMessage("The user is 'bob' and the password is 'secret'",
                  "https://secure.example.net");

// 假设当前页面没有改变location，这条语句会成功添加message到发送队列中去（targetOrigin设置对了）
popup.postMessage("hello there!", "http://example.org");

function receiveMessage(event)
{
  // 我们能相信信息的发送者吗?  (也许这个发送者和我们最初打开的不是同一个页面).
  if (event.origin !== "http://example.org")
    return;

  // event.source 是我们通过window.open打开的弹出页面 popup
  // event.data 是 popup发送给当前页面的消息 "hi there yourself!  the secret response is: rheeeeet!"
}
window.addEventListener("message", receiveMessage, false);
```
/*
 * 弹出页 popup 域名是<http://example.org>，以下是script标签中的代码:
 */

//当A页面postMessage被调用后，这个function被addEventListener调用
function receiveMessage(event)
{
  // 我们能信任信息来源吗？
  if (event.origin !== "http://example.com:8080")
    return;

  // event.source 就当前弹出页的来源页面
  // event.data 是 "hello there!"

  // 假设你已经验证了所受到信息的origin (任何时候你都应该这样做), 一个很方便的方式就是把event.source
  // 作为回信的对象，并且把event.origin作为targetOrigin
  event.source.postMessage("hi there yourself!  the secret response " +
                           "is: rheeeeet!",
                           event.origin);
}

window.addEventListener("message", receiveMessage, false);
```
