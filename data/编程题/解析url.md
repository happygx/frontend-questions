---
level: 1
---

# 解析url

## 参考答案

## 方案一
```javascript
    var result = {};
    var keys = ['href', 'origin', 'protocol', 'host',
                'hostname', 'port', 'pathname', 'search', 'hash'];
    var i, len;
    var regexp = /(([^:]+:)\/\/(([^:\/\?#]+)(:\d+)?))(\/[^?#]*)?(\?[^#]*)?(#.*)?/;

    var match = regexp.exec(url);
	 console.info('match=', match);
	 
    if (match) {
        for (i = keys.length - 1; i >= 0; --i) {
            result[keys[i]] = match[i] ? match[i] : '';
        }
    }
	 console.info('result=', result);
    return result;
}
```

```javascript
  //创建一个 a 标签，并将 url 赋值给标签的 href 属性。
  const a = document.createElement('a')
  a.href = url
  return {
    source: url,
    protocol: a.protocol.replace(':', ''), // 协议
    host: a.hostname,   // 主机名称
    port: a.port,   // 端口号
    query: a.search,  // 查询字符串
    params: (function () {  // 查询参数
      let ret = {},
        seg = a.search.replace(/^\?/, '').split('&'),
        len = seg.length, i = 0, s
      for (; i < len; i++) {
        if (!seg[i]) {
          continue
        }
        s = seg[i].split('=')
        ret[s[0]] = decodeURIComponent(s[1])
      }
      return ret
    })(),
    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1], // 文件名
    hash: a.hash.replace('#', ''), // 哈希参数
    path: a.pathname.replace(/^([^\/])/, '/$1'), // 路径
    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],  // 相对路径
    segments: a.pathname.replace(/^\//, '').split('/') // 路径片段
  }
}

parseUrl("http://test.com:8080?name=1&password=2#page1");
```
