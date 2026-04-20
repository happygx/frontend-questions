---
level: 2
---

# 如何实现WebSocket的断线重连机制？

## 题目要点

1. **重连时是否保留消息队列**

   * 可以在断开时缓存未发送的消息，等重连后再补发。
2. **避免服务端踢出**

   * 需要和服务端约定心跳协议（如 `ping/pong`），否则可能会被网关/代理关闭连接。
3. **区分“主动关闭”与“异常关闭”**

   * 主动关闭时不需要重连。
4. **移动端环境**

   * 在 App/浏览器后台时可能会被系统挂起，需要特别处理。

## 参考答案

实现 **WebSocket 的断线重连机制**，一般需要在客户端（浏览器/前端）做一些健壮性处理。核心思路就是：

1. **捕获异常/断开事件**

   * 监听 `onclose`、`onerror`，在连接关闭或出错时，启动重连逻辑。
   * 可选：在 `onmessage` 里做心跳检测，发现服务端长时间未响应也触发重连。

2. **指数退避/固定间隔重连**

   * 避免频繁重连给服务器造成压力。
   * 典型策略：

     * 每次重连延迟 `delay = Math.min(maxDelay, baseDelay * 2^attempt)`
     * 或者使用固定间隔（如 5 秒）。

3. **心跳机制（保持长连接）**

   * 定时发送心跳包（如 `ping`），服务端回应（如 `pong`）。
   * 如果心跳超时未响应，则主动关闭并重连。


### 示例实现（JavaScript）

```js
  constructor(url, options = {}) {
    this.url = url;
    this.ws = null;
    this.lockReconnect = false; // 防止重复重连
    this.reconnectDelay = options.reconnectDelay || 2000; // 初始重连间隔
    this.maxDelay = options.maxDelay || 30000; // 最大重连间隔
    this.heartbeatInterval = options.heartbeatInterval || 10000; // 心跳间隔
    this.heartbeatTimer = null;
    this.reconnectTimer = null;

    this.createWebSocket();
  }

  createWebSocket() {
    try {
      this.ws = new WebSocket(this.url);

      this.initEventHandlers();
    } catch (e) {
      this.reconnect();
    }
  }

  initEventHandlers() {
    this.ws.onopen = () => {
      console.log("WebSocket 连接成功");
      this.startHeartbeat();
    };

    this.ws.onmessage = (msg) => {
      console.log("收到消息:", msg.data);
      // 服务端 pong 响应时，重置心跳
      if (msg.data === "pong") {
        this.resetHeartbeat();
      }
    };

    this.ws.onerror = () => {
      console.log("WebSocket 出错");
      this.reconnect();
    };

    this.ws.onclose = () => {
      console.log("WebSocket 关闭");
      this.reconnect();
    };
  }

  reconnect() {
    if (this.lockReconnect) return;
    this.lockReconnect = true;
    console.log("准备重连...");

    this.reconnectTimer && clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      this.createWebSocket();
      this.lockReconnect = false;
      // 增加延迟，避免频繁重连
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, this.maxDelay);
    }, this.reconnectDelay);
  }

  startHeartbeat() {
    this.heartbeatTimer && clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = setInterval(() => {
      if (this.ws.readyState === WebSocket.OPEN) {
        console.log("发送心跳 ping");
        this.ws.send("ping");
      }
    }, this.heartbeatInterval);
  }

  resetHeartbeat() {
    console.log("收到 pong，心跳正常");
  }

  send(msg) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(msg);
    } else {
      console.log("连接未建立，消息丢弃");
    }
  }
}

// 使用示例
const ws = new ReconnectWebSocket("wss://example.com/socket", {
  reconnectDelay: 2000,
  maxDelay: 30000,
  heartbeatInterval: 10000,
});
```
