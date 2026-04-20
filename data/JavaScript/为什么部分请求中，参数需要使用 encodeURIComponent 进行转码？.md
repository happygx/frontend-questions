---
level: 3
---

# 为什么部分请求中，参数需要使用 encodeURIComponent 进行转码？

## 题目要点

URL（统一资源定位符）在构成上有着严格的限制，只能使用英文字母（a-z，A-Z）、阿拉伯数字（0-9）以及某些特定的标点符号。这一限制源于网络标准RFC 1738的规定，该标准明确指出，URL中只能使用字母数字字符、特定的特殊字符（如"$-_.+!*'(),"，不包括引号），以及用于其预定目的的保留字符。

由于这一规定，URL中不能直接使用汉字或其他非ASCII字符。如果URL中包含这些字符，就必须进行编码处理。然而，RFC 1738并没有为URL编码指定一个统一的方法，而是将编码的实现交给了应用程序（如浏览器）自行决定。这导致了URL编码领域的混乱，因为不同的操作系统、浏览器和网页字符集可能会导致完全不同的编码结果。

为了确保客户端向服务器发送的数据格式统一，可以使用Javascript进行URL编码。Javascript提供以下三个函数用于URL编码：

1. **escape()**：这是最古老的Javascript编码函数，它对ASCII字母、数字和特定标点符号（"@ * _ + - . /"）之外的字符进行编码。虽然这个函数现在已经不推荐使用，但由于历史原因，它在一些地方仍然被采用。

2. **encodeURI()**：这个函数是专门用于对整个URL进行编码的。它不会对ASCII字母、数字、特定标点符号以及URL中有特殊含义的符号（如"; / ? : @ & = + $ , #"）进行编码。编码后，它会输出符号的UTF-8形式，并在每个字节前加上"%"符号。

3. **encodeURIComponent()**：这个函数用于对URL的组成部分进行个别编码，而不是对整个URL进行编码。与encodeURI()不同的是，encodeURIComponent()会对"; / ? : @ & = + $ , #"这些在encodeURI()中不被编码的符号进行编码。具体的编码方法与encodeURI()相同。

对于解码，encodeURIComponent()函数对应的解码函数是**decodeURIComponent()**，它用于将encodeURIComponent()编码的字符串解码回原始形式。

总结来说，为了避免因不同浏览器和系统导致的URL编码不一致问题，可以使用Javascript的encodeURI()和encodeURIComponent()函数来确保URL编码的统一性，并通过decodeURIComponent()函数进行相应的解码。

## 参考答案

一般来说，URL只能使用英文字母、阿拉伯数字和某些标点符号，不能使用其他文字和符号。

这是因为网络标准RFC 1738做了硬性规定：

> "...Only alphanumerics [0-9a-zA-Z], the special characters "$-_.+!*'()," [not including the quotes - ed], and reserved characters used for their reserved purposes may be used unencoded within a URL."

这意味着，如果URL中有汉字，就必须编码后使用。但是麻烦的是，RFC 1738没有规定具体的编码方法，而是交给应用程序（浏览器）自己决定。这导致"URL编码"成为了一个混乱的领域。

不同的操作系统、不同的浏览器、不同的网页字符集，将导致完全不同的编码结果。如果程序员要把每一种结果都考虑进去，是不是太恐怖了？有没有办法，能够保证客户端只用一种编码方法向服务器发出请求？

就是使用Javascript先对URL编码，然后再向服务器提交，不要给浏览器插手的机会。因为Javascript的输出总是一致的，所以就保证了服务器得到的数据是格式统一的。

Javascript语言用于编码的函数，一共有三个，最古老的一个就是escape()。虽然这个函数现在已经不提倡使用了，但是由于历史原因，很多地方还在使用它，所以有必要先从它讲起。

它的具体规则是，除了ASCII字母、数字、标点符号"@ * _ + - . /"以外，对其他所有字符进行编码。

encodeURI()是Javascript中真正用来对URL编码的函数。

它着眼于对整个URL进行编码，因此除了常见的符号以外，对其他一些在网址中有特殊含义的符号"; / ? : @ & = + $ , #"，也不进行编码。编码后，它输出符号的utf-8形式，并且在每个字节前加上%。

最后一个Javascript编码函数是encodeURIComponent()。与encodeURI()的区别是，它用于对URL的组成部分进行个别编码，而不用于对整个URL进行编码。

因此，"; / ? : @ & = + $ , #"，这些在encodeURI()中不被编码的符号，在encodeURIComponent()中统统会被编码。至于具体的编码方法，两者是一样。

它对应的解码函数是decodeURIComponent()。
