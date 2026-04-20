---
level: 3
---

# Node.js 是单线程的，那该如何充分利用多核 CPU 呢？

## 题目要点

Node.js 可以通过 Cluster 模块、Child Process 模块、Worker Threads 模块、PM2 集群模式和负载均衡等方式充分利用多核 CPU。选择方案时应根据应用的特性和场景来决定，计算密集型任务推荐 Worker Threads，而 PM2 是生产环境中简单且稳定的多核管理工具。

## 参考答案

虽然 Node.js 是单线程运行的，但可以通过多种方式利用多核 CPU 来提升性能，尤其是在需要处理大量并发请求或计算密集型任务时。

以下是常用的多核利用方案：

### 1. **使用 Cluster 模块**
   - **原理**：Cluster 模块可以轻松地创建多个 Node.js 进程（称为工作进程），每个进程都运行相同的代码，并共享相同的服务器端口。
   - **实现**：在主进程中创建多个子进程，每个子进程独立运行，分配给 CPU 核心，让多个进程共享负载。Cluster 模块会自动根据系统的核心数量生成对应数量的子进程，以提高多核利用率。

   **示例代码**：
   ```javascript
   const cluster = require('cluster');
   const http = require('http');
   const numCPUs = require('os').cpus().length;

   if (cluster.isMaster) {
     console.log(`主进程 ${process.pid} 正在运行`);

     // 为每个 CPU fork 一个工作进程
     for (let i = 0; i < numCPUs; i++) {
       cluster.fork();
     }

     cluster.on('exit', (worker, code, signal) => {
       console.log(`工作进程 ${worker.process.pid} 已退出`);
       // 这里可以设置重新 fork 新的进程，以保证服务的高可用
       cluster.fork();
     });
   } else {
     // 工作进程可以共享相同的 TCP 连接
     http.createServer((req, res) => {
       res.writeHead(200);
       res.end('Hello World\n');
     }).listen(8000);

     console.log(`工作进程 ${process.pid} 已启动`);
   }
   ```

### 2. **使用 Child Process 模块**
   - **原理**：`child_process` 模块允许 Node.js 创建独立的子进程并与主进程进行通信，适用于需要在主进程之外完成计算密集型任务的情况。
   - **实现**：通过 `fork()`、`exec()`、`spawn()` 等方法创建子进程并执行任务，可以利用不同的 CPU 核心来分担计算负载。

   **示例代码**：
   ```javascript
   const { fork } = require('child_process');

   // 创建一个子进程
   const compute = fork('./compute.js'); // 假设有一个计算密集型的文件 compute.js

   compute.on('message', result => {
     console.log('从子进程收到结果:', result);
   });

   // 发送任务到子进程
   compute.send('开始计算');
   ```

### 3. **使用 Worker Threads 模块**
   - **原理**：Worker Threads 模块允许在单个 Node.js 进程中创建多个线程，用于运行 JavaScript。每个线程都有自己的事件循环，适合计算密集型任务且避免了进程间的资源开销。
   - **实现**：在主线程中启动多个 worker 线程来并行处理任务，通过共享 `SharedArrayBuffer` 或传递消息实现数据共享与通信。

   **示例代码**：
   ```javascript
   const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

   if (isMainThread) {
     // 主线程
     const worker = new Worker(__filename, { workerData: 42 });
     worker.on('message', (message) => {
       console.log('主线程收到消息:', message);
     });
   } else {
     // 子线程
     const result = workerData * 2; // 简单的计算任务
     parentPort.postMessage(result);
   }
   ```

### 4. **负载均衡和反向代理**
   - **原理**：通过 Nginx 或 PM2 等工具对多个 Node.js 进程进行负载均衡，将请求分配给不同进程以充分利用多核 CPU。
   - **实现**：例如使用 Nginx 作为反向代理，配置多个 Node.js 服务实例并进行轮询分发；或使用 PM2 启动集群模式，自动管理 Node.js 进程和多核利用。

### 5. **使用 PM2 集群模式**
   - **原理**：PM2 是一个强大的进程管理器，支持多核自动分配。它可以一键启动多个 Node.js 实例，让每个实例利用不同的 CPU 核心，并管理进程状态，自动重启失败进程。
   - **实现**：PM2 的集群模式可根据服务器的 CPU 核心数量自动启动等量的进程。

   **命令示例**：
   ```bash
   pm2 start app.js -i max  # 自动根据 CPU 核数启动进程
   pm2 start app.js -i 4    # 手动指定 4 个进程
   ```
