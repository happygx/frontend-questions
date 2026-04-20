---
level: 3
---

# 说说 Typscript 的 extends 关键字会在哪些场景下使用？

## 题目要点

`extends` 关键字常见的用途包括：
1. **接口继承**：使一个接口可以继承另一个接口。
2. **类继承**：允许一个类继承另一个类，获得父类的属性和方法。
3. **条件类型**：用来判断类型是否满足某个条件，并基于此做出不同的处理。
4. **泛型约束**：用来约束泛型参数，确保泛型类型满足特定条件。
5. **联合类型判断**：判断一个类型是否属于某个联合类型。
6. **索引签名继承**：在继承时加入对索引签名的支持。

## 参考答案

如果你有看过 `TypeScript` 官方文档，起码熟悉这两个：

1. `extends` 关键字可以实现 `interface` 类型的扩展，这个也是 `interface` 与 `type` 类型别名实现扩展的区别之一，类型别名通过 `&` 交叉类型来实现类型扩展
  
1. `extends` 关键字可用于 `class` 的继承

比如定义个 `Animal` 接口

```ts
   name: string
 }
 ​
 interface Person extends Animal {
   level: number
 }
 ​
 const person: Person = {
   name: 'Perter',
   level: 1
 }
 ​
 interface Dog extends Animal {
   leg: number
 }
 ​
 const dog: Dog = {
   name: 'BaGong',
   leg: 4
 }
 ​
```

```ts
   move() {
     console.log("Moving along!");
   }
 }
  
 class Person extends Animal {
   talk(info: string) {
     console.log(info)
   }
 }
 ​
 const person = new Person();
 // Base class method
 person.move();
 // Derived class method
 person.talk('hello world')
 ​
 class Dog extends Animal {
   woof(times: number) {
     for (let i = 0; i < times; i++) {
       console.log("woof!");
     }
   }
 }
  
 const d = new Dog();
 // Base class method
 d.move();
 // Derived class method
 d.woof(3);
 ​
```

## **`extends` 实现类型约束**

很贴切的列子就是 `Typescript` 的工具类型 `Pick`，可以通过从一个类型中选取一组属性集合来构造一个新的类型。

接下来让我们实现下：

```ts
   [key in Keys]: T[key] // error: Type 'key' cannot be used to index type 'T'.
 }
```

所以我们需要对属性集合 `Keys` **进行约束**，约束其必须为 `T` 的属性集合子集。

```ts
   [key in Keys]: T[key]
 }
 ​
 // 使用
 interface Todo {
   title: string;
   description: string;
   completed: boolean;
 }
  
 type TodoPreview = MyPick<Todo, "title" | "completed">;
  
 const todo: TodoPreview = {
   title: "Clean room",
   completed: false,
 };
  
 todo; // ok
```

## **`extends` 实现条件类型判断**

在 `TypeScript` 类型体操基础动作中，有一种动作叫：**条件类型**，条件类型主要用于去判断两个类型之间的关系。

比如工具类型 `Exclude` 的实现，就是基于条件类型：

```ts
```

```ts
 ​
 type T1 = MyExclude<"a" | "b" | "c", "a" | "b">; // type T1 = "c"
```

比如

* 实现一个 [DeepReadonly](https://github.com/type-challenges/type-challenges/blob/main/questions/00009-medium-deep-readonly/README.md) 工具类型，可以做到将对象类型的所有属性转为只读：

```text
   readonly [Key in keyof T]: DeepReadonly<T[Key]> : T[Key]
 } 
```

```ts
 type TrimLeft<S extends string> = S extends `${Space}${infer R}` ? TrimLeft<R> : S
 ​
 type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
```

```ts
   : `${Uncapitalize<F>}-${KebabCase<R>}`
   : T;
 ​
 type FooBarBaz = KebabCase<"FooBarBaz">;
 const foobarbaz: FooBarBaz = "foo-bar-baz";
 ​
 type DoNothing = KebabCase<"do-nothing">;
 const doNothing: DoNothing = "do-nothing";

```
