---
level: 3
---

# 如何判断页面是通过PC端还是移动端访问？

## 题目要点

#### 一、navigator.userAgent

通过检查 `navigator.userAgent` 字符串来识别移动设备。此方法简单但可能不可靠，因为用户代理字符串可以被修改。

```javascript
  // 当前设备是移动设备
}
```

#### 二、window.screen 和 window.innerWidth

使用屏幕宽度和浏览器窗口宽度来判断设备类型。这种方法简单，但可能不准确，尤其是当设备横屏使用时。

```javascript
  // 当前设备是移动设备
}
```

检测屏幕方向，这是一个移动设备特有的属性。如果 `window.orientation` 不是 `undefined`，则可能是移动设备。

```javascript
  // 当前设备是移动设备
}
```

检测 `ontouchstart` 属性或尝试创建 `TouchEvent` 来判断是否为移动设备。

```javascript
  return ('ontouchstart' in document.documentElement);
}
```

使用 CSS 媒体查询来检测设备类型。通过 `window.matchMedia()` 检查特定的 CSS 查询是否匹配。

```javascript
```

使用第三方工具包，如 `react-device-detect`，来检测设备类型。

```javascript
if (isMobile) {
  // 当前设备是移动设备
}
```

## 参考答案

## 一、navigator.userAgent

最简单的方法就是分析浏览器的 user agent 字符串，它包含了设备信息。

JS 通过`navigator.userAgent`属性拿到这个字符串，只要里面包含`mobi`、`android`、`iphone`等关键字，就可以认定是移动设备。

```javascript
  // 当前设备是移动设备
}
 
// 另一种写法
if (
  navigator.userAgent.match(/Mobi/i) ||
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/iPhone/i)
) {
  // 当前设备是移动设备
}
 
```

Chromium 系的浏览器，还有一个`navigator.userAgentData`属性，也是类似的作用。不同之处是它将 user agent 字符串解析为一个对象，该对象的`mobile`属性，返回一个布尔值，表示用户是否使用移动设备。

```javascript
```

此外，还有一个已经废除的[navigator.platform属性](https://stackoverflow.com/questions/19877924/what-is-the-list-of-possible-values-for-navigator-platform-as-of-today)，所有浏览器都支持，所以也可以用。它返回一个字符串，表示用户的操作系统。

```javascript
 // 当前设备是移动设备
} 
```

另一种方法是通过屏幕宽度，判断是否为手机。

`window.screen`对象返回用户设备的屏幕信息，该对象的`width`属性是屏幕宽度（单位为像素）。

```javascript
 // 当前设备是移动设备 
}

```

这个方法的缺点在于，如果手机横屏使用，就识别不了。

另一个属性`window.innerWidth`返回浏览器窗口里面的网页可见部分的宽度，比较适合指定网页在不同宽度下的样式。

```javascript
 if (window.innerWidth < 768) {
   return "xs";
 } else if (window.innerWidth < 991) {
   return "sm";
 } else if (window.innerWidth < 1199) {
   return "md";
 } else {
   return "lg";
 }
};
```

第三种方法是侦测屏幕方向，手机屏幕可以随时改变方向（横屏或竖屏），桌面设备做不到。

`window.orientation`属性用于获取屏幕的当前方向，只有移动设备才有这个属性，桌面设备会返回`undefined`。

```javascript
 // 当前设备是移动设备 
}

```

## 四、touch 事件

第四种方法是，手机浏览器的 DOM 元素可以通过`ontouchstart`属性，为`touch`事件指定监听函数。桌面设备没有这个属性。

```javascript
 return ('ontouchstart' in document.documentElement); 
}

// 另一种写法
function isMobile() {
try {
   document.createEvent("TouchEvent"); return true;
 } catch(e) {
   return false; 
 }
}
```

最后一种方法是结合 CSS 来判断。

CSS 通过 media query（媒介查询）为网页指定响应式样式。如果某个针对手机的 media query 语句生效了，就可以认为当前设备是移动设备。

`window.matchMedia()`方法接受一个 CSS 的 media query 语句作为参数，判断这个语句是否生效。

```javascript

```

除了通过屏幕宽度判断，还可以通过指针的精确性判断。

```javascript

```

有些设备支持多种指针，比如同时支持鼠标和触摸。`pointer:coarse`只用来判断主指针，此外还有一个`any-pointer`命令判断所有指针。

```javascript

```

## 六、工具包

除了上面这些方法，也可以使用别人写好的工具包。这里推荐 [react-device-detect](https://www.npmjs.com/package/react-device-detect)，它支持多种粒度的设备侦测。

```javascript

if (isMobile) {
 // 当前设备是移动设备
}

```
