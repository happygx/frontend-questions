---
level: 4
---

# 相比于npm和yarn，pnpm的优势是什么？

## 题目要点

pnpm 是一个现代化的包管理器，它在 npm 和 yarn 的基础上进行了改进，提供了更快的依赖下载速度和更高效的磁盘空间利用。

以下是 pnpm 相对于 npm 和 yarn 的主要优点：

1. **更快速的依赖下载**：pnpm 通过其高效的依赖管理机制，实现了快速的依赖安装。
2. **更高效的利用磁盘空间**：通过使用硬链接和内容寻址的文件系统，pnpm 能够避免重复安装相同的依赖文件，从而节省磁盘空间。
3. **更优秀的依赖管理**：pnpm 解决了 npm 和 yarn 中的幽灵依赖问题，确保了项目中的依赖结构清晰，不会出现未声明的依赖。
pnpm 的设计原理是通过全局仓库（store）和虚拟仓库（node_modules/.pnpm）之间的硬链接和软链接来组织依赖关系。这种设计避免了依赖的重复安装，解决了路径长度限制的问题，并且通过全局仓库的硬链接，提高了安装速度。

## 参考答案

pnpm对比npm/yarn的优点：

* 更快速的依赖下载
* 更高效的利用磁盘空间
* 更优秀的依赖管理

我们按照包管理工具的发展历史，从 npm2 开始讲起：

## npm2

用 node 版本管理工具把 node 版本降到 4，那 npm 版本就是 2.x 了。

![](https://static.ecool.fun//article/620fe3a0-bc84-4b25-a6f5-9ba9c86f6257.jpeg)

然后找个目录，执行下 npm init -y，快速创建个 package.json。

然后执行 npm install express，那么 express 包和它的依赖都会被下载下来：

![](https://static.ecool.fun//article/2887153a-9fe1-4b27-8225-9cf566d11485.jpeg)

展开 express，它也有 node\_modules：

![](https://static.ecool.fun//article/7e02c8f1-c18e-45e1-882e-3307595b9925.jpeg)

再展开几层，每个依赖都有自己的 node\_modules：

![](https://static.ecool.fun//article/27611a70-202f-4329-9531-67b95af51976.jpeg)

也就是说 npm2 的 node\_modules 是嵌套的。

这很正常呀？有什么不对么？

这样其实是有问题的，多个包之间难免会有公共的依赖，这样嵌套的话，同样的依赖会复制很多次，会占据比较大的磁盘空间。

这个还不是最大的问题，致命问题是 windows 的文件路径最长是 260 多个字符，这样嵌套是会超过 windows 路径的长度限制的。

当时 npm 还没解决，社区就出来新的解决方案了，就是 yarn：

## yarn

yarn 是怎么解决依赖重复很多次，嵌套路径过长的问题的呢？

铺平。所有的依赖不再一层层嵌套了，而是全部在同一层，这样也就没有依赖重复多次的问题了，也就没有路径过长的问题了。

我们把 node\_modules 删了，用 yarn 再重新安装下，执行 yarn add express：

这时候 node\_modules 就是这样了：

![](https://static.ecool.fun//article/30119adb-3912-443b-9af8-9f56da6be114.jpeg)

全部铺平在了一层，展开下面的包大部分是没有二层 node\_modules 的：

![](https://static.ecool.fun//article/8c053898-f3df-4457-ba3f-f832fb988dc4.jpeg)

当然也有的包还是有 node\_modules 的，比如这样：

![](https://static.ecool.fun//article/2bd3408f-5342-429d-bb5d-5b10df60879f.jpeg)

为什么还有嵌套呢？

因为一个包是可能有多个版本的，提升只能提升一个，所以后面再遇到相同包的不同版本，依然还是用嵌套的方式。

npm 后来升级到 3 之后，也是采用这种铺平的方案了，和 yarn 很类似：

![](https://static.ecool.fun//article/5060b347-202a-43ef-80d5-d0495f6bd0e0.jpeg)

当然，yarn 还实现了 yarn.lock 来锁定依赖版本的功能，不过这个 npm 也实现了。

yarn 和 npm 都采用了铺平的方案，这种方案就没有问题了么？

并不是，扁平化的方案也有相应的问题。

最主要的一个问题是幽灵依赖，也就是你明明没有声明在 dependencies 里的依赖，但在代码里却可以 require 进来。

这个也很容易理解，因为都铺平了嘛，那依赖的依赖也是可以找到的。

但是这样是有隐患的，因为没有显式依赖，万一有一天别的包不依赖这个包了，那你的代码也就不能跑了，因为你依赖这个包，但是现在不会被安装了。

这就是幽灵依赖的问题。

而且还有一个问题，就是上面提到的依赖包有多个版本的时候，只会提升一个，那其余版本的包不还是复制了很多次么，依然有浪费磁盘空间的问题。

那社区有没有解决这俩问题的思路呢？

当然有，这不是 pnpm 就出来了嘛。

那 pnpm 是怎么解决这俩问题的呢？

## pnpm

回想下 npm3 和 yarn 为什么要做 node\_modules 扁平化？不就是因为同样的依赖会复制多次，并且路径过长在 windows 下有问题么？

那如果不复制呢，比如通过 link。

首先介绍下 link，也就是软硬连接，这是操作系统提供的机制，硬连接就是同一个文件的不同引用，而软链接是新建一个文件，文件内容指向另一个路径。当然，这俩链接使用起来是差不多的。

如果不复制文件，只在全局仓库保存一份 npm 包的内容，其余的地方都 link 过去呢？

这样不会有复制多次的磁盘空间浪费，而且也不会有路径过长的问题。因为路径过长的限制本质上是不能有太深的目录层级，现在都是各个位置的目录的 link，并不是同一个目录，所以也不会有长度限制。

没错，pnpm 就是通过这种思路来实现的。

再把 node\_modules 删掉，然后用 pnpm 重新装一遍，执行 pnpm install。

你会发现它打印了这样一句话：

![](https://static.ecool.fun//article/ec4ef89e-6db5-464e-aff1-00fa6d6ad090.jpeg)

包是从全局 store 硬连接到虚拟 store 的，这里的虚拟 store 就是 node\_modules/.pnpm。

我们打开 node\_modules 看一下：

![](https://static.ecool.fun//article/5a782293-75d0-492a-a601-d2cdb1ce265b.jpeg)

确实不是扁平化的了，依赖了 express，那 node\_modules 下就只有 express，没有幽灵依赖。

展开 .pnpm 看一下：

![](https://static.ecool.fun//article/3abd2471-1e10-446b-9680-8d7dd3927c10.jpeg)

所有的依赖都在这里铺平了，都是从全局 store 硬连接过来的，然后包和包之间的依赖关系是通过软链接组织的。

比如 .pnpm 下的 expresss，这些都是软链接，

![](https://static.ecool.fun//article/4c97a538-7fc3-4143-a851-be795b5fe9a0.jpeg)

也就是说，所有的依赖都是从全局 store 硬连接到了 node\_modules/.pnpm 下，然后之间通过软链接来相互依赖。

官方给了一张原理图，配合着看一下就明白了：

![](https://static.ecool.fun//article/a682875c-e2c3-48a1-b31b-337114305806.jpeg)

这就是 pnpm 的实现原理。

那么回过头来看一下，pnpm 为什么优秀呢？

首先，最大的优点是节省磁盘空间呀，一个包全局只保存一份，剩下的都是软硬连接，这得节省多少磁盘空间呀。

其次就是快，因为通过链接的方式而不是复制，自然会快。

这也是它所标榜的优点：

![](https://static.ecool.fun//article/92adbade-99b2-46e9-b812-e7a7c3dcb1e7.jpeg)

相比 npm2 的优点就是不会进行同样依赖的多次复制。

相比 yarn 和 npm3+ 呢，那就是没有幽灵依赖，也不会有没有被提升的依赖依然复制多份的问题。

这就已经足够优秀了，对 yarn 和 npm 可以说是降维打击。

## 总结

pnpm 最近经常会听到，可以说是爆火。本文我们梳理了下它爆火的原因：

npm2 是通过嵌套的方式管理 node\_modules 的，会有同样的依赖复制多次的问题。

npm3+ 和 yarn 是通过铺平的扁平化的方式来管理 node\_modules，解决了嵌套方式的部分问题，但是引入了幽灵依赖的问题，并且同名的包只会提升一个版本的，其余的版本依然会复制多次。

pnpm 则是用了另一种方式，不再是复制了，而是都从全局 store 硬连接到 node\_modules/.pnpm，然后之间通过软链接来组织依赖关系。

这样不但节省磁盘空间，也没有幽灵依赖问题，安装速度还快，从机制上来说完胜 npm 和 yarn。

pnpm 就是凭借这个对 npm 和 yarn 降维打击的。
