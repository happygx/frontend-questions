---
level: 3
---

# 实现一个 useTimeout Hook

## 参考答案

`useTimeout` 是可以在函数式组件中，处理 `setTimeout` 计时器函数

## 解决了什么问题？

如果直接在函数式组件中使用 `setTimeout` ，会遇到以下问题：

* 多次调用setTimeout  

```js
    const [state, setState] = useState(1);  
    setTimeout(() => {  
        setState(state + 1);  
    }, 3000);  
    return (  
        // 我们原本的目的是在页面渲染完3s后修改一下state，但是你会发现当state+1后，触发了页面的重新渲染，就会重新有一个3s的定时器出现来给state+1，既而变成了每3秒+1。  
        <div> {state} </div>  
    );  
  }; 
```

```js
  const [count, setCount] = useState(0)  
  const [countTimeout, setCountTimeout] = useState(0)  
  useEffect(() => {  
      setTimeout(() => {  
          setCountTimeout(count)  
      }, 3000)  
      setCount(5)  
  }, [])  
  return (  
       //count发生了变化，但是3s后setTimout的count却还是0  
      <div>  
          Count: {count}  
          <br />  
          setTimeout Count: {countTimeout}  
      </div>  
  )  
}
```

```js
  const memorizeCallback = useRef();

  useEffect(() => {
    memorizeCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const timer = setTimeout(() => {
        memorizeCallback.current();
      }, delay);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [delay]);
};
```

```js
  useTimeout(callback, delay);
```
