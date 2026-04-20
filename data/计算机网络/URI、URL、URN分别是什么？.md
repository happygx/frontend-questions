---
level: 1
---

# URI、URL、URN分别是什么？

## 题目要点

在网络通信中，URL（统一资源定位符）、URI（统一资源标志符）和URN（统一资源名称）是描述资源位置和身份的术语，它们之间有明确的区别和联系：

1. **URI**：统一资源标志符（Universal Resource Identifier）是一个广义的概念，它用于唯一标识互联网上的资源。URI可以是URL、URN或其他形式，如mailto:或news:。
2. **URL**：统一资源定位符（Universal Resource Locator）是URI的一个子集，它提供了一种具体的访问网络资源的方法，包括协议（如http://）、域名或IP地址以及路径。URL类似于现实世界的住址，它告诉你在互联网上如何找到特定的资源。
3. **URN**：统一资源名称（Universal Resource Name）也是URI的一个子集，它标识资源的名字，但不提供访问资源的方式。URN通常用于命名空间中的名称，如电子邮件地址（mailto:）或文件系统路径（file:///）。

## 参考答案

URL代表资源的路径地址，而URI代表资源的名称。

* URI: Universal Resource Identifier 统一资源标志符

* URL: Universal Resource Locator 统一资源定位符
URL类似于住址，它告诉你一种寻找目标的方式(在这个例子中，是通过街道地址找到一个人)。要知道，上述定义同时也是一个URI。

* URN: Universal Resource Name 统一资源名称
我们可以把一个人的名字看作是URN;因此可以用URN来唯一标识一个实体

URL是URI的一个子集，告诉我们访问网络位置的方式

URN是URI的子集，包括名字(给定的命名空间内)，但是不包括访问方式

URN 和 URL 都是URI的子集。
