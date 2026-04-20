---
level: 3
---

# react 中怎么捕获异常？

## 题目要点

在React中捕获异常，通常有以下几种方法：

**组件级别的错误边界（Error Boundaries）：**

错误边界是React组件，用于捕获其子组件树中JavaScript错误。错误边界组件本身不会捕获错误，但可以捕获其子组件的错误，然后记录这些错误，并显示备用UI，而不是整个组件树崩溃。

**全局错误处理：**

可以设置全局的异常处理器来捕获在任何地方抛出的异常。

**使用componentDidCatch生命周期方法**（仅在React 16及以前版本）：

在React 16及以前版本，可以使用componentDidCatch生命周期方法来捕获其子组件树中的异常。

从React 17开始，componentDidCatch已被弃用，并推荐使用错误边界。

**使用第三方库：**

有些第三方库，如redux，提供了中间件来捕获和记录异常。

## 参考答案

## ErrorBoundary   

`EerrorBoundary` 是16版本出来的，之前的 15 版本有`unstable_handleError`。    

关于 `ErrorBoundary` 官网介绍比较详细，它能捕捉以下异常：

* 子组件的渲染
* 生命周期函数
* 构造函数

```js
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}


<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

```js

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const ui = (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // reset the state of your app so the error doesn't happen again
    }}
  >
    <ComponentThatMayError />
  </ErrorBoundary>
)
```

* 事件处理程序
* 异步代码 (e.g. setTimeout or requestAnimationFrame callbacks)
* 服务端的渲染代码
* error boundaries自己抛出的错误

原文可见参见官网[introducing-error-boundaries](https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries)

其实官方也有解决方案：[how-about-event-handlers](https://reactjs.org/docs/error-boundaries.html#how-about-event-handlers)， 就是 try catch.    

```js
    try {
      // Do something that could throw
    } catch (error) {
      this.setState({ error });
    }
  }
```

我们先看看一张表格，罗列了我们能捕获异常的手段和范围。

| 异常类型                | 同步方法 | 异步方法 | 资源加载 | Promise |  async/await    
| ---                    | :---:   |:---:    |:---:    |:---:    |:---: |
| try/catch              | √       |         |         |         |     √|
| window.onerror         | √       | √       |         |         |      |
| error             | √       | √       | √       |         |      |
| unhandledrejection |         |         |         |√        | √    |

 ### try/catch
 
 可以捕获同步和async/await的异常。 
 
 ### window.onerror , error事件 
 
 ```js
     window.addEventListener('error', this.onError, true);
     window.onerror = this.onError
 ```
 `window.addEventListener('error')` 这种可以比 `window.onerror` 多捕获资源记载异常.
 
 请注意最后一个参数是 `true`, `false`的话可能就不如你期望。   
 
 当然你如果问题这第三个参数的含义，我就有点不想理你了。拜。
 
 ### unhandledrejection
 
 请注意最后一个参数是 `true`。
 
 ```js
 window.removeEventListener('unhandledrejection', this.onReject, true)
 ```
 
其捕获未被捕获的Promise的异常。

### XMLHttpRequest 与 fetch

`XMLHttpRequest` 很好处理，自己有onerror事件。

当然你99.99%也不会自己基于`XMLHttpRequest`封装一个库， `axios` 真香，有这完毕的错误处理机制。

至于`fetch`, 自己带着catch跑，不处理就是你自己的问题了。

其实有一个库 [react-error-catch](https://www.npmjs.com/package/react-error-catch) 是基于ErrorBoudary,error与unhandledrejection封装的一个组件。  

其核心如下

```js
        // event catch
        window.addEventListener('error', this.catchError, true);
        // async code
        window.addEventListener('unhandledrejection', this.catchRejectEvent, true);
    };
```

```js

const App = () => {
  return (
  <ErrorCatch
      app="react-catch"
      user="cxyuns"
      delay={5000}
      max={1}
      filters={[]}
      onCatch={(errors) => {
        console.log('报错咯');
        // 上报异常信息到后端，动态创建标签方式
        new Image().src = `http://localhost:3000/log/report?info=${JSON.stringify(errors)}`
      }}
    >
      <Main />
    </ErrorCatch>)
}

export default 
```

## 事件处理程序的异常捕获

### 示例

使用[decorator](http://es6.ruanyifeng.com/#docs/decorator)来重写原来的方法。

先看一下使用：

```js
    async createOrder() {
        const data = {...};
        const res = await createOrder();
        if (!res || res.errCode !== 0) {
            return Toast.error("创建订单失败");
        }
        
        .......
        其他可能产生异常的代码
        .......
        
       Toast.success("创建订单成功");
    }
```
* message： 出现错误时，打印的错误
* toast： 出现错误，是否Toast
* report: 出现错误，是否上报
* log: 使用使用console.error打印

再看一段代码

```js
    async createOrder() {
        const data = {...};
        const res = await createOrder();
        if (!res || res.errCode !== 0) {
            return Toast.error("创建订单失败");
        }
       
        .......
        其他可能产生异常的代码
        .......
        
       throw new CatchError("创建订单失败了，请联系管理员", {
           toast: true,
           report: true,
           log: false
       })
       
       Toast.success("创建订单成功");

    }
```

这个`methodCatch`可以捕获，同步和异步的错误，我们来一起看看全部的代码。

### 类型定义
```typescript
    report?: boolean;
    message?: string;
    log?: boolean;
    toast?: boolean;
}

// 这里写到 const.ts更合理
export const DEFAULT_ERROR_CATCH_OPTIONS: CatchOptions = {
    report: true,
    message: "未知异常",
    log: true,
    toast: false
}
```
```typescript

export class CatchError extends Error {

    public __type__ = "__CATCH_ERROR__";
    /**
     * 捕捉到的错误
     * @param message 消息
     * @options 其他参数
     */
    constructor(message: string, public options: CatchOptions = DEFAULT_ERROR_CATCH_OPTIONS) {
        super(message);
    }
}

```
```typescript
import { CatchOptions, DEFAULT_ERROR_CATCH_OPTIONS } from "@typess/errorCatch";
import { CatchError } from "@util/error/CatchError";


const W_TYPES = ["string", "object"];
export function methodCatch(options: string | CatchOptions = DEFAULT_ERROR_CATCH_OPTIONS) {

    const type = typeof options;

    let opt: CatchOptions;

    
    if (options == null || !W_TYPES.includes(type)) { // null 或者 不是字符串或者对象
        opt = DEFAULT_ERROR_CATCH_OPTIONS;
    } else if (typeof options === "string") {  // 字符串
        opt = {
            ...DEFAULT_ERROR_CATCH_OPTIONS,
            message: options || DEFAULT_ERROR_CATCH_OPTIONS.message,
        }
    } else { // 有效的对象
        opt = { ...DEFAULT_ERROR_CATCH_OPTIONS, ...options }
    }

    return function (_target: any, _name: string, descriptor: PropertyDescriptor): any {

        const oldFn = descriptor.value;

        Object.defineProperty(descriptor, "value", {
            get() {
                async function proxy(...args: any[]) {
                    try {
                        const res = await oldFn.apply(this, args);
                        return res;
                    } catch (err) {
                        // if (err instanceof CatchError) {
                        if(err.__type__ == "__CATCH_ERROR__"){
                            err = err as CatchError;
                            const mOpt = { ...opt, ...(err.options || {}) };

                            if (mOpt.log) {
                                console.error("asyncMethodCatch:", mOpt.message || err.message , err);
                            }

                            if (mOpt.report) {
                                // TODO::
                            }

                            if (mOpt.toast) {
                                Toast.error(mOpt.message);
                            }

                        } else {
                            
                            const message = err.message || opt.message;
                            console.error("asyncMethodCatch:", message, err);

                            if (opt.toast) {
                                Toast.error(message);
                            }
                        }
                    }
                }
                proxy._bound = true;
                return proxy;
            }
        })
        return descriptor;
    }
}
```

1. 利用装饰器重写原方法，达到捕获错误的目的
2. 自定义错误类，抛出它，就能达到覆盖默认选项的目的。增加了灵活性。

```js
    async createOrder() {
        const data = {...};
        const res = await createOrder();
        if (!res || res.errCode !== 0) {
            return Toast.error("创建订单失败");
        }
       Toast.success("创建订单成功");
       
        .......
        其他可能产生异常的代码
        .......
        
       throw new CatchError("创建订单失败了，请联系管理员", {
           toast: true,
           report: true,
           log: false
       })
    }
```

1. 扩大成果，支持更多类型，以及hooks版本。

```typescript
classs AAA{
    @YYYCatch
    method = ()=> {
    }
}
```

**当前方案存在的问题:**   
1. 功能局限
2. 抽象不够    
    获取选项,代理函数, 错误处理函数完全可以分离，变成通用方法。
3. 同步方法经过转换后会变为异步方法。     
    所以理论上，要区分同步和异步方案。
4. 错误处理函数再异常怎么办

之后，我们会围绕着这些问题，继续展开。


## Hooks版本

Hook的名字就叫useCatch

```typescript

    const [count, setCount] = useState(0);

    
    const doSomething  = useCatch(async function(){
        console.log("doSomething: begin");
        throw new CatchError("doSomething error")
        console.log("doSomething: end");
    }, [], {
        toast: true
    })

    const onClick = useCatch(async (ev) => {
        console.log(ev.target);
        setCount(count + 1);

        doSomething();

        const d = delay(3000, () => {
            setCount(count => count + 1);
            console.log()
        });
        console.log("delay begin:", Date.now())

        await d.run();
        
        console.log("delay end:", Date.now())
        console.log("TestView", this)
        throw new CatchError("自定义的异常，你知道不")
    },
        [count],
        {
            message: "I am so sorry",
            toast: true
        });

    return <div>
        <div><button onClick={onClick}>点我</button></div>
        <div>{count}</div>
    </div>
}

export default React.memo(TestView);
```

```typescript

    const opt =  useMemo( ()=> getOptions(options), [options]);
    
    const fn = useMemo((..._args: any[]) => {
        const proxy = observerHandler(callback, undefined, function (error: Error) {
            commonErrorHandler(error, opt)
        });
        return proxy;

    }, [callback, deps, opt]) as T;

    return fn;
}

```
