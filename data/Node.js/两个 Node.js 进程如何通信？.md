---
level: 3
---

# 两个 Node.js 进程如何通信？

## 题目要点

**回答思路**：
在 Node.js 中，两个进程可以通过 IPC（Inter-Process Communication，进程间通信）机制进行通信。常用的 IPC 方法包括：

1. **使用文件**：在两个进程之间共享文件，并通过文件进行通信。
2. **使用消息队列**：通过消息队列（如 RabbitMQ 或 Kafka）来发送和接收消息。
3. **使用共享内存**：在支持共享内存的操作系统上，通过共享内存进行高速通信。
4. **使用管道**：在 Linux 上，通过管道（如 `process.stdin` 和 `process.stdout`）进行简单的单向通信。
这些方法中，选择哪种方法取决于具体的需求和场景。

## 参考答案

两个 Node.js 进程之间如何进行通信呢？这里要分两种场景：

1.  不同电脑上的两个 Node.js 进程间通信
2.  同一台电脑上两个 Node.js 进程间通信

对于第一种场景，通常使用 TCP 或 HTTP 进行通信，而对于第二种场景，又分为两种子场景：

1.  Node.js 进程和自己创建的 Node.js 子进程通信
2.  Node.js 进程和另外不相关的 Node.js 进程通信

前者可以使用内置的 IPC 通信通道，后者可以使用自定义管道，接下来进行详细介绍：

## 不同电脑上的两个 Node.js 进程间通信

要想进行通信，首先得搞清楚如何标识网络中的进程？网络层的 ip 地址可以唯一标识网络中的主机，而传输层的协议和端口可以唯一标识主机中的应用程序（进程），这样利用三元组（ip 地址，协议，端口）就可以标识网络的进程了。

### 使用 TCP 套接字

TCP 套接字（socket）是一种基于 TCP/IP 协议的通信方式，可以让通过网络连接的计算机上的进程进行通信。一个作为 server 另一个作为 client，server.js 代码如下：

```js
const server = net.createServer(socket => {
  console.log('socket connected')
  socket.on('close', () => console.log('socket disconnected'))
  socket.on('error', err => console.error(err.message))
  socket.on('data', data => {
    console.log(`receive: ${data}`)
    socket.write(data)
    console.log(`send: ${data}`)
  })
})
server.listen(8888)

```

```js
const client = net.connect(8888, '192.168.10.105')

client.on('connect', () => console.log('connected.'))
client.on('data', data => console.log(`receive: ${data}`))
client.on('end', () => console.log('disconnected.'))
client.on('error', err => console.error(err.message))

setInterval(() => {
  const msg = 'hello'
  console.log(`send: ${msg}`)
  client.write(msg)
}, 3000)

```

```sh
client connected
receive: hello
send: hello

$ node client.js
connect to server
send: hello
receive: hello

```

因为 HTTP 协议也是基于 TCP 的，所以从通信角度看，这种方式本质上并无区别，只是封装了上层协议。server.js 代码为：

```js
http.createServer((req, res) => res.end(req.url)).listen(8888)

```

```js
const options = {
  hostname: '192.168.10.105',
  port: 8888,
  path: '/hello',
  method: 'GET',
}
const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)
  res.on('data', d => process.stdout.write(d))
})
req.on('error', error => console.error(error))
req.end()

```

```sh
url /hello

$ node client.js
statusCode: 200
hello

```

虽然网络 socket 也可用于同一台主机的进程间通讯（通过 loopback 地址 127.0.0.1），但是这种方式需要经过网络协议栈、需要打包拆包、计算校验和、维护序号和应答等，就是为网络通讯设计的，而同一台电脑上的两个进程可以有更高效的通信方式，即 IPC（Inter-Process Communication），在 unix 上具体的实现方式为 unix domain socket，这是服务器端和客户端之间通过本地打开的套接字文件进行通信的一种方法，与 TCP 通信不同，通信时指定本地文件，因此不进行域解析和外部通信，所以比 TCP 快，在同一台主机的传输速度是 TCP 的两倍。

### 使用内置 IPC 通道

如果是跟自己创建的子进程通信，是非常方便的，child_process模块中的 fork 方法自带通信机制，无需关注底层细节，例如父进程 parent.js 代码：

```js
const path = require("path")
const child = fork(path.resolve("child.js"), [], { stdio: "inherit" });
child.on("message", (message) => {
  console.log("message from child:", message)
  child.send("hi")
})
```

```js
  console.log("message from parent:", message);
})

if (process.send) {
  setInterval(() => process.send("hello"), 3000)
}

```

```sh
message from child: hello
message from parent: hi
message from child: hello
message from parent: hi

```

如果是两个独立的 Node.js 进程，如何建立通信通道呢？在 Windows 上可以使用命名管道（Named PIPE），在 unix 上可以使用 unix domain socket，也是一个作为 server，另外一个作为 client，其中 server.js 代码如下：

```js
const fs = require('fs')

const pipeFile = process.platform === 'win32' ? '\\\\.\\pipe\\mypip' : '/tmp/unix.sock'

const server = net.createServer(connection => {
  console.log('socket connected.')
  connection.on('close', () => console.log('disconnected.'))
  connection.on('data', data => {
    console.log(`receive: ${data}`)
    connection.write(data)
    console.log(`send: ${data}`)
  })
  connection.on('error', err => console.error(err.message))
})

try {
  fs.unlinkSync(pipeFile)
} catch (error) {}

server.listen(pipeFile)
```

```js

const pipeFile = process.platform === 'win32' ? '\\\\.\\pipe\\mypip' : '/tmp/unix.sock'

const client = net.connect(pipeFile)
client.on('connect', () => console.log('connected.'))
client.on('data', data => console.log(`receive: ${data}`))
client.on('end', () => console.log('disconnected.'))
client.on('error', err => console.error(err.message))

setInterval(() => {
  const msg = 'hello'
  console.log(`send: ${msg}`)
  client.write(msg)
}, 3000)


```

```sh
socket connected.
receive: hello
send: hello

$ node client.js
connected.
send: hello
receive: hello

```
