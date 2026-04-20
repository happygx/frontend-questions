---
level: 3
---

# 如何让 Proxy 去监听基本数据类型？

## 参考答案

`Proxy`无法直接监听基本数据类型（如字符串、数字、布尔值等），因为它们是不可变的。`Proxy`只能在对象级别上进行操作，而不是基本数据类型。

当我们尝试使用`Proxy`包装基本数据类型时，会得到一个`TypeError`错误，因为基本数据类型不具有属性和方法。

以下展示了尝试在基本数据类型上应用`Proxy`时会发生的错误：

```javascript

const handler = {
  set(target, property, value) {
    console.log(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  }
};

const proxyValue = new Proxy(value, handler); // TypeError: Cannot create proxy with a non-object as target
```

以下是一个示例，演示如何使用自定义的数据包装器来监听基本数据类型的更改：

```javascript
  this.value = value;
  this.onChange = null;
}

ValueWrapper.prototype.setValue = function(newValue) {
  this.value = newValue;
  if (typeof this.onChange === 'function') {
    this.onChange(this.value);
  }
};

const wrapper = new ValueWrapper('Hello');

const handler = {
  set(target, property, value) {
    console.log(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    if (typeof target.onChange === 'function') {
      target.onChange(target.value);
    }
    return true;
  }
};

const proxyWrapper = new Proxy(wrapper, handler);

proxyWrapper.onChange = newValue => {
  console.log(`Value changed: ${newValue}`);
};

proxyWrapper.setValue('Hi'); // 输出: Setting property 'value' to 'Hi', Value changed: Hi
```

通过这种方式，可以实现对基本数据类型的更改进行监听和响应。
