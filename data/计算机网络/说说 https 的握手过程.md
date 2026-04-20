---
level: 2.5
---

# 说说 https 的握手过程

## 题目要点

HTTPS的详细握手过程包括以下步骤：

1. **TCP三次握手**：建立一个TCP连接。
2. **客户端发送Client Hello**：客户端发送包含TLS版本、随机数、加密套件候选列表等信息的数据包。
3. **服务端发送Server Hello**：服务端收到客户端的Client Hello后，选择一个TLS版本和加密套件，并发送Server Hello响应。
4. **服务端发送证书**：服务端发送自己的数字证书，证明其身份。
5. **服务端发送Server Key Exchange**：对于某些加密算法，服务端发送公钥参数。
6. **服务端发送Server Hello Done**：通知客户端Server Hello信息发送结束。
7. **客户端发送Client Key Exchange、Change Cipher Spec、Encrypted Handshake Message**：客户端发送公钥参数，通知使用协商的密钥和加密算法，并发送加密的握手消息以测试密钥的有效性。
8. **服务端发送New Session Ticket**：服务端发送会话票据，用于在超时时间内复用协商的密钥。
9. **服务端发送Change Cipher Spec**：服务端通知客户端后续通信将使用协商的密钥和加密算法。
10. **服务端发送Encrypted Handshake Message**：服务端发送加密的握手消息，用于验证客户端和服务端能正常加密和解密。
11. **完成密钥协商，开始发送数据**：双方使用协商的密钥加密和解密数据。
12. **完成数据发送，4次TCP挥手**：双方发送结束握手，关闭TCP连接。

整个握手过程确保了安全通信的建立，包括身份验证、密钥协商和加密配置。

## 参考答案

## https的详细握手过程

https在七层协议里面属于应用层，他基于tcp协议，所以，https握手的过程，一定先经过tcp的三次握手，tcp链接建立好之后，才进入https的对称密钥协商过程，对称密钥协商好之后，就开始正常的收发数据流程。

接下来拿实际网络数据包来解释https的整个详细的握手过程

打开wireshark抓包工具，并随手打开命令行，输入了如下一行命令

```

```

1. 为什么是wireshark，而不是fiddler 或者 charles  
> fiddler 和charles主要是用于抓取应用层协议https/http等上层的应用数据，都是建立链接成功后的数据，而wireshark是可以抓取所有协议的数据包（直接读取网卡数据）,我们的目的是抓取https建立链接成功前的过程，所以我们选择wireshark

2. 为什么是用curl， 而不是在浏览器打开https://www.baidu.com  
> curl是只发送一个请求，如果是用浏览器打开百度，那百度页面里面的各种资源也会发送请求，容易造成很多不必要的数据包

好，重点来了，开始上图：

![3.jpg](https://static.ecool.fun//article/5eb1e871-2272-4b5c-b3c2-4b997ca9cfed.jpeg)

![4.jpg](https://static.ecool.fun//article/edecff28-62c5-4063-aa63-c873697d25b8.jpeg)

遇到凡事不要慌，接下来待我给你慢慢道来（ack消息属于tcp协议里面的确认报文，不做解释）

#### 第一步

![BBDC09E23F6A440A9D8DF91C8988F884_20200706143251.jpg](https://static.ecool.fun//article/1af0a8a1-e0b9-498e-b89b-de1b1d517b1a.jpeg)

> 解释说明：tcp三次握手，这个不做解释，如果这块不清楚，比如ack，seq,mss,win都代表什么意思，这个可以在互动区留言，我视情况专门写几篇tcp的文章（这块太大了，没几篇是介绍不完的）

#### 第二步：客户端发送client\_hello

![6.jpg](https://static.ecool.fun//article/19971982-68c1-4388-b455-0cdac1618916.jpeg)

> 解释说明：客户端发送client\_hello，包含以下内容（请自行对照上图） 1\. 包含TLS版本信息 2\. 随机数（用于后续的密钥协商）random\_C 3\. 加密套件候选列表 4\. 压缩算法候选列表 5\. 扩展字段 6\. 其他

#### 第三步：服务端发送server\_hello

![0.jpg](https://static.ecool.fun//article/f217ddb9-11b9-4815-88bd-a6c145a9ec3b.jpeg)

> 解释说明：服务端收到客户端的client\_hello之后，发送server\_hello，并返回协商的信息结果 1\. 选择使用的TLS协议版本 version 2\. 选择的加密套件 cipher suite 3\. 选择的压缩算法 compression method 4\. 随机数 random\_S 5\. 其他

#### 第四步：服务端发送证书

![31.jpg](https://static.ecool.fun//article/af820a6a-12bd-4f1b-b126-6513a102aabc.jpeg)

> 解释说明：服务端发送完server\_hello后，紧接着开始发送自己的证书（不清楚证书是什么的，可以移步到[上一篇文章](https://juejin.cn/post/6845166890675863559)），从图可知：因包含证书的报文长度是3761，所以此报文在tcp这块做了分段，分了3个报文把证书发送完了

> 问自己： 1\. 分段的标准是什么？ 2\. 什么时候叫分段，什么时候叫分片？ 3\. 什么是MTU，什么是MSS

#### 第五步：服务端发送Server Key Exchange

![27.jpg](https://static.ecool.fun//article/f88e594d-8b3f-4589-8114-326c8a366560.jpeg)

> 解释说明:对于使用DHE/ECDHE非对称密钥协商算法的SSL握手，将发送该类型握手。RSA算法不会进行该握手流程（DH、ECDH也不会发送server key exchange）,也就是说此报文不一定要发送，视加密算法而定。SSL中的RSA、DHE、ECDHE、ECDH流程与区别可以参考[此篇文章](https://blog.csdn.net/mrpre/article/details/78025940)

#### 第六步：服务端发送Server Hello Done

![11.jpg](https://static.ecool.fun//article/36c979f7-35bc-4882-94fd-1e04adf3245c.jpeg)

> 解释说明:通知客户端 server\_hello 信息发送结束

#### 第七步：客户端发送.client\_key\_exchange+change\_cipher\_spec+encrypted\_handshake\_message

![10.jpg](https://static.ecool.fun//article/f7043a3f-aaed-4b76-9349-c41d24f03196.jpeg)

> 解释说明: 1\. client\_key\_exchange，合法性验证通过之后，向服务器发送自己的公钥参数，这里客户端实际上已经计算出了密钥 2\. change\_cipher\_spec，客户端通知服务器后续的通信都采用协商的通信密钥和加密算法进行加密通信 3\. encrypted\_handshake\_message，主要是用来测试密钥的有效性和一致性

#### 第八步：服务端发送New Session Ticket

![948.jpg](https://static.ecool.fun//article/de0beb4d-5eee-4d5c-8883-634773f2a2e2.jpeg)

> 解释说明:服务器给客户端一个会话，用处就是在一段时间之内（超时时间到来之前），双方都以协商的密钥进行通信。

#### 第九步：服务端发送change\_cipher\_spec

![37.jpg](https://static.ecool.fun//article/2c53bff9-2d84-49b4-953d-ae62a11911ea.jpeg)

> 解释说明:服务端解密客户端发送的参数，然后按照同样的算法计算出协商密钥，并通过客户端发送的encrypted\_handshake\_message验证有效性，验证通过，发送该报文，告知客户端，以后可以拿协商的密钥来通信了

#### 第十步：服务端发送encrypted\_handshake\_message

![03.jpg](https://static.ecool.fun//article/5fe5ee5a-eff9-4933-bb4c-d51d2ca8c80e.jpeg)

> 解释说明:目的同样是测试密钥的有效性，客户端发送该报文是为了验证服务端能正常解密，客户端能正常加密，相反：服务端发送该报文是为了验证客户端能正常解密，服务端能正常加密

#### 第十一步：完成密钥协商，开始发送数据

![0706182714.jpg](https://static.ecool.fun//article/b6823e50-f6dc-4570-b0f9-740fe0d8f5e6.jpeg)

> 解释说明：数据同样是分段发送的

#### 第十二步：完成数据发送，4次tcp挥手

![6183001.jpg](https://static.ecool.fun//article/95abd39e-df25-43d5-97fa-4861185ea860.jpeg)

> 解释说明：红框的意思是：客户端或服务器发送的，意味着加密通信因为某些原因需要中断，警告对方不要再发送敏感的数据,服务端数据发送完成也会有此数据包，可不关注

## 结语

最后用一张图来说明以下过程

![20190626125502435.png](https://static.ecool.fun//article/5fe6b973-9dc5-400c-a2c8-cdae7b5d8624.jpeg)
