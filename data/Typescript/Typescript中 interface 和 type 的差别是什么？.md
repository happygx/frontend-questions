---
level: 3
---

# Typescript中 interface 和 type 的差别是什么？

## 题目要点

**作答思路：**

在TypeScript中，`interface`和`type`都可以用来定义类型，但它们之间有一些区别：

1. **定义方式**：
   - `interface`用于定义对象的形状（Shape），可以包含方法和属性。
   - `type`用于定义类型别名，可以包含联合类型、元组、字面量等。
2. **扩展性**：
   - `interface`是可扩展的，可以合并多个接口。
   - `type`是不可扩展的，不能合并多个类型。
3. **默认值**：
   - `interface`可以包含默认值。
   - `type`不能包含默认值。
4. **属性要求**：
   - `interface`要求属性必须存在。
   - `type`不要求属性必须存在。
5. **使用场景**：
   - `interface`通常用于定义对象的形状，如组件的props和state。
   - `type`通常用于定义函数参数和返回值的类型。

**考察要点**：

1. **定义方式**：理解`interface`和`type`定义类型的不同方式。
2. **扩展性**：了解`interface`和`type`在扩展性方面的差异。
3. **使用场景**：了解`interface`和`type`在实际应用中的使用场景。

## 参考答案

## 相同点

* 都可以描述一个对象或者函数

**interface**
```typescript
  name: string
  age: number
}

interface SetUser {
  (name: string, age: number): void;
}
```
```typescript
  name: string
  age: number
};

type SetUser = (name: string, age: number)=> void;
```

interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。 虽然效果差不多，但是两者语法不同。

**interface extends interface**
```typescript
  name: string; 
}
interface User extends Name { 
  age: number; 
}
```
```typescript
  name: string; 
}
type User = Name & { age: number  };
```
```typescript
  name: string; 
}
interface User extends Name { 
  age: number; 
}
```
```typescript
  name: string; 
}
type User = Name & { 
  age: number; 
}
```

* type 可以而 interface 不行

**type 可以声明基本类型别名，联合类型，元组等类型**
```typescript
type Name = string

// 联合类型
interface Dog {
    wong();
}
interface Cat {
    miao();
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]
```
```typescript
let div = document.createElement('div');
type B = typeof div
```
```typescript
type Text = string | { text: string };  
type NameLookup = Dictionary<string, Person>;  
type Callback<T> = (data: T) => void;  
type Pair<T> = [T, T];  
type Coordinates = Pair<number>;  
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
```

**interface 能够声明合并**

```typescript
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/
```
