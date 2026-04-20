---
level: 3
---

# 请按以下要求实现方法 fn ：遇到退格字符就删除前面的字符，遇到两个退格就删除两个字符

## 参考答案

```js

  const doDelete = (str) => {
    let flag = 0;// 0 - 正常字符；1 - <；2 - <-
    const stack = [];
    for(let i = 0; i < str.length; i++) {
      const char = str[i];
      stack.push(char);

      if(char === '<' && !flag) {
        flag += 1
      } else if(flag === 1) {
        if(char === '-') {
          flag += 1
        } else {
          flag -= 1
        }
      }

      if(flag === 2) {
        stack.pop();
        stack.pop();
        stack.pop();
        flag = 0
      }
    }
    // console.log(String(stack))
    return String(stack);
  }

  return doDelete(str1) === doDelete(str2);
}

console.log(fn("a<-b<-", "c<-d<-"))
console.log(fn("<-<-ab<-", "<-<-<-<-a"))
console.log(fn("<-<ab<-c", "<<-<a<-<-c"))
```
