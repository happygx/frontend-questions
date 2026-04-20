---
level: 2.5
---

# Cache-Control 有哪些常见配置值？

## 题目要点

Cache-Control头部字段用于控制缓存的行为，包括请求首部和响应首部。

**请求首部（Request Headers）**:

- `no-cache`：请求时携带，要求缓存服务器不使用缓存，而是转发请求到源服务器。
- `no-store`：请求或响应中包含敏感信息，不缓存任何内容。
- `max-age`：指定缓存资源的最大年龄。
- `max-stale`：指定缓存资源过期的最大年龄。
- `min-fresh`：指定缓存资源的最小新鲜度。
- `no-transform`：指定缓存不能更改资源的内容类型。
- `only-if-cached`：要求缓存服务器只返回本地缓存资源。
- `cache-extension`：允许扩展Cache-Control指令。

**响应首部（Response Headers）**:

- `public`：响应可以被任何缓存服务器缓存。
- `private`：响应只能被单个用户缓存。
- `no-cache`：响应不能被缓存服务器缓存。
- `no-store`：同请求首部。
- `no-transform`：同请求首部。
- `max-age`：指定缓存资源的最大年龄。
- `s-maxage`：指定共享缓存的最大年龄。
- `must-revalidate`：要求缓存服务器在返回响应前必须重新验证缓存的有效性。
- `proxy-revalidate`：要求缓存服务器在返回响应前必须重新验证缓存的有效性。
- `cache-extension`：同请求首部。

Cache-Control头部字段与Expires头部字段（仅HTTP/1.0版本）相比，在HTTP/1.1版本中，缓存服务器优先处理max-age指令。

## 参考答案

Cache-Control的值有十几种，其中包含了请求首部可携带的和响应首部携带的。

咱们先看看 **request首部** Cache-Control的值

* no-cache

当客户端请求时携带这个首部字段的时候，通过中间的缓存服务器时，会不去拿缓存资源，而是让中间服务器转发给资源服务器，资源服务器看看一下这个资源过期没有，如果没有就会告知中间服务器，可以使用缓存资源。否则资源服务器就会直接返回新的资源。

* no-store

这个字段非常有意思，就是告知服务器或者客户端以及中间服务器，我请求或者响应的内容里面有机密信息，这些响应的内容是永远不会得到响应的。

* max-age

`max-age`指令标示了客户端不愿意接收一个`age`大于设定时间的响应，这个字段表达是最大缓存时长，请求中单单添加这个字段，实现不了缓存时长，必须结合响应的max-age。一会，会在响应中的max-age 详细说明

* max-stale 

这个指令表达的是缓存时长过期以后，还可以有效。比如现在max-age：60秒，那么max-stale：60秒，现在的缓存时长就是120秒，

* min-fresh

设定能够容忍的最小**新鲜度（缓存时长）**。`min-fresh`标示了客户端不愿意接受**新鲜度**不多于当前的`age`加上`min-fresh`设定的时间之和的响应。  

* no-transfrom

使用 no-transform 指令规定无论是在请求还是响应中，缓存都不能改 变实体主体的媒体类型。

* only-if-cache

使用 only-if-cached 指令表示客户端仅在缓存服务器本地缓存目标资源的情况下，才会要求其返回。换言之，该指令要求缓存服务器不重新加载响应，也不会再次确认资源有效性。若发生请求缓存服务器的本 地缓存无响应，则返回状态码 504 Gateway Timeout。

* cache-extension

通过 cache-extension 标记（token），可以扩展 Cache-Control 首部字 段内的指令。

  
咱们再看看 **response首部** Cache-Control的值  

* pulic

这个字段和private是相对的，Cache-Control: public时，则表明所有的用户在通过缓存服务器的时候，都可以缓存这个资源。

* private

这个字段和pulic是相对的，Cache-Control: private时，则表明只有某个在通过缓存服务器的时候，得到缓存资源  

* no-cache

如果服务器返回的响应中包含 no-cache 指令，那么缓存服务器不能对 资源进行缓存。源服务器以后也将不再对缓存服务器请求中提出的资 源有效性进行确认，且禁止其对响应资源进行缓存操作。

* no-store  

同请求首部的no-store指令一样  

* no-transfrom

同请求首部的no-transfrom指令一样

* max-age

在Response中设置max-age的时间信息，可以在客户端生成缓存文件，在缓存不过期的情况下，客户端不会直接向服务器请求数据，在缓存过期的情况下，客户端会向服务器直接请求生成新的缓存。  

如果同时设置了Response和Request中的max-age 缓存时间，如果Request中的max-age时间小于Response中的max-age时间，客户端会根据Request中max-age时间周期去直接进行网络请求，如果碰到断网或者网络请求不通的情况，即使缓存还在有效期内（Response中设置的max-age时间足够大），在Request设置的max-age过期之后，APP也会直接去进行网络请求。 因此可以考虑在客户端的设计中一个和好的网络缓存场景，用Response的max-age控制缓存的时间，用Request中max-age控制刷新的时间和机制  

**应用 HTTP/1.1 版本的缓存服务器遇到同时存在 Expires 首部字段的情 况时，会优先处理 max-age 指令，而忽略掉 Expires 首部字段。而 HTTP/1.0 版本的缓存服务器的情况却相反，max-age 指令会被忽略**

* s-max-age

和max-age类似，它们的不同点是 s- maxage 指令只适用于供多位用户使用的公共缓存服务器 

* must-revalidate

使用 must-revalidate 指令，代理会向源服务器再次验证即将返回的响 应缓存目前是否仍然有效。

若代理无法连通源服务器再次获取有效资源的话，缓存必须给客户端 一条 504（Gateway Timeout）状态码。

另外，使用 must-revalidate 指令会忽略请求的 max-stale 指令（即使已 经在首部使用了 max-stale，也不会再有效果）。

* proxy-revalidate

proxy-revalidate 指令要求所有的缓存服务器在接收到客户端带有该指 令的请求返回响应之前，必须再次验证缓存的有效性。

* cache-extension

同请求首部的cache-extension指令一样

> 本答案由“前端面试题宝典”收集整理，PC端访问请前往： https://fe.ecool.fun/
