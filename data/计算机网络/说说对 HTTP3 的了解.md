---
level: 3
---

# 说说对 HTTP3 的了解

## 题目要点

HTTP/3是基于QUIC协议的一种新型HTTP协议，旨在提高传输效率并克服TCP的一些限制。以下是HTTP/3的一些关键特性：

1. **零RTT建立连接**：HTTP/3通过使用新的DH秘钥交换算法，允许客户端和服务器在不需要预先建立连接的情况下直接传输数据。这种零RTT（Round-Trip Time）的连接建立方式大大提高了初始连接的速度。
2. **连接迁移**：当网络环境发生变化时，HTTP/3能够无缝迁移连接，而无需重新建立新的连接。这通过在客户端和服务器之间维护一个唯一的Connection ID来实现。
3. **队头阻塞/多路复用**：HTTP/3通过将数据分割成更小的Packet，并在不同的Stream中传输，从而避免了队头阻塞的问题。每个Stream可以独立于其他Stream进行数据传输，提高了整体的传输效率。
4. **拥塞控制**：HTTP/3在应用层实现了更精细的拥塞控制策略，如热拔插、前向纠错（FEC）和单调递增的Packet Number，这些机制可以动态调整发送速率，以适应网络拥塞情况，并提高数据传输的可靠性。
5. **流量控制**：HTTP/3通过接收方动态调整接受的窗口大小，实现了更有效的流量控制。接收方可以更灵活地控制数据流量，以避免接收过载或发送方发送速度过快的问题。

HTTP/3的这些新特性使得它在性能、可靠性和效率方面都有了显著的提升，尤其适合于需要实时数据传输和低延迟的应用场景。

## 参考答案

## HTTP/3的来源  

由于TCP和UDP两者在运输层存在一定差异，TCP的传递效率与UDP相比有天然劣势，于是Google基于UDP开发出了新的协议QUIC(Quick UDP Internet Connections)，希望取代TCP提高传输效率，后经过协商将QUIC协议更名为HTTP/3。

## QUIC概述

TCP、UDP是我们所熟悉的传输层协议，UDP比TCP相比效率更高但并不具备传输可靠性。而QUIC便是看中UDP传输效率这一特性，并结合了TCP、TLS、HTTP/2的优势，加以优化。  

于是在QUIC上层的应用层所运行的HTTP协议也就被称为HTTP/3。  

**HTTP over QUIC is HTTP/3**  
![](https://static.ecool.fun//article/d397a74e-093c-4079-8102-e4364cf500b8.jpeg)

## HTTP/3新特性

### 1. **零RTT建立连接**  
如下图，传统HTTP/2(所有HTTP/2的浏览器均基于HTTPS)传输数据前需要三次RTT，即使将第一次TLS握手的对称秘钥缓存也需要两次RTT才能传递数据。  
![](https://static.ecool.fun//article/47284cd9-afd5-4ef4-8dcd-6b7eca745aff.jpeg)  

对于HTTP/3而言，仅仅需要一次RTT即可传递数据，如果将其缓存，就可将RTT减少至零。 

其核心就是DH秘钥交换算法。  

* 客户端向服务端请求数据。  
* 服务端生成g、p、a三个随机数，用三个随机数生成A。将a保留后，将g、p、A(Server Config)传递到客户端。  
* 客户端生成随机数b，将b保留后，用g、p、b三个随机数生成B。  
* 客户端再使用A、b、p生成秘钥K，用K**加密HTTP数据**并与B一同发送到服务端。  
* 服务端再使用B、a、p得到相同秘钥K，并解密HTTP数据。

![](https://static.ecool.fun//article/1dbffd73-cfd3-495a-a95e-ce5bad3caaf0.jpeg)  

**至此即可完成一次RTT对连接的建立，当缓存Server Config后零RTT即可进行数据传递。**

### 2. **连接迁移**  

传统连接通过源IP、源端口、目的IP、目的端口进行连接，当网络发生更换后连接再次建立时延较长。  

HTTP/3使用Connection ID对连接保持，只要Connection ID不改变，连接仍可维持。  

![](https://static.ecool.fun//article/1c518a36-cf99-4a0f-bb01-4e0333dfeca0.jpeg)

### 3. **队头阻塞/多路复用**  

* TCP作为面向连接的协议，对每次请求序等到ACK才可继续连接，一旦中间连接丢失将会产生队头阻塞。  
* HTTP/1.1中提出Pipelining的方式，单个TCP连接可多次发送请求，但依旧会有中间请求丢失产生阻塞的问题。  
![](https://static.ecool.fun//article/468654bf-b409-48b2-9366-38a3d74dab28.jpeg)  
* HTTP/2中将请求粒度减小，通过Frame的方式进行请求的发送。但在TCP层Frame组合得到Stream进行传输，一旦出现Stream中的Frame丢失，其后方的Stream都将会被阻塞。  
![](https://static.ecool.fun//article/dc9fd0e1-8c83-475a-be3e-f93af8f7a0a8.jpeg)  
* 对于HTTP/2而言，浏览器会默认采取TLS方式传输，TLS基于Record组织数据，每个Record包含16K，其中有12个TCP的包，一旦其中一个TCP包出现问题将会导致整个Record无法解密。这也是网络环境较差时HTTP/2的传输速度比HTTP/1.1更慢的原因。  
![](https://static.ecool.fun//article/477f49a1-2ebf-4a82-aa35-a149e8d6719c.jpeg)  
* HTTP/3基于UDP的传输，不保证连接可靠性，也就没有对头阻塞的后果。同样传输单元与加密单元为Packet，在TLS下也可避免对头阻塞的问题。

### 4. **拥塞控制**  

* 热拔插：TCP对于拥塞控制在于传输层，QUIC可在应用层操作改变拥塞控制方法。  
* 前向纠错(FEC)：将数据切割成包后可对每个包进行异或运算，将运算结果随数据发送。一旦丢失数据可据此推算。(带宽换时间)  
* 单调递增的Packet Number：TCP在超时重传后的两次ACK接受情况并不支持的很好。导致RTT和RTO的计算有所偏差。HTTP/3对此进行改进，一旦重传后的Packet N会递增。  

![](https://static.ecool.fun//article/5ca47054-7a73-4538-ac6d-ade633ce0969.jpeg)  

* ACK Delay  

   HTTP/3在计算RTT时健壮的考虑了服务端的ACK处理时延。  
   
![](https://static.ecool.fun//article/77e62abe-4d0f-41cb-b08b-a68955279d15.jpeg)  

* 更多地ACK块  

   一般每次请求都会对应一个ACK，但这样也会浪费(下载场景只需返回数据即可)。  
   
   于是可设计成每次返回3个ACK block。在HTTP/3将其扩充成最多可携带256 个ACK block。
   
### 5. **流量控制**  

TCP使用滑动窗口的方式对发送方的流量进行控制。而对接收方并无限制。在QUIC中便补齐了这一短板。  

QUIC中接收方从单挑Stream和整条连接两个角度动态调整接受的窗口大小。
