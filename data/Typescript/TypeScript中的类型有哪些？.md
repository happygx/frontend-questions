---
level: 3
---

# TypeScript中的类型有哪些？

## 题目要点

* TypeScript 类型系统包含基本类型、对象类型、特殊类型、工具类型等多个层级；
* 支持高级特性如泛型、条件类型、映射类型等，使类型系统更具表达力；
* 熟练使用类型系统可大幅提升开发效率、增强代码可维护性与可读性；
* TypeScript 的核心价值不仅是“加类型”，更是通过类型构造语言提升开发质量。

## 参考答案

### 一、原始类型（Primitive Types）

这些与 JavaScript 的基本类型一致：

* `string`：字符串，例如 `'hello'`
* `number`：数字，例如 `42`
* `boolean`：布尔值，例如 `true`
* `null`：表示空值（需开启 strictNullChecks 才完全生效）
* `undefined`：未定义
* `bigint`：任意精度整数
* `symbol`：独一无二的值


### 二、对象类型（Object Types）

包括：

* `object`：非原始类型的集合
* 接口（`interface`）：声明对象的结构
* 类型别名（`type`）：更灵活的结构定义
* 类（`class`）：面向对象编程结构
* 数组类型：`string[]`、`Array<number>`
* 元组（Tuple）：固定长度与类型的数组，如 `[string, number]`
* 函数类型：定义输入输出签名，如 `(x: number, y: number) => number`


### 三、特殊类型

* `any`：关闭类型检查，允许任何值（**不推荐在生产环境滥用**）
* `unknown`：更安全的 `any`，必须先类型缩小才能使用
* `never`：永远不会发生的值，通常用于抛错或死循环
* `void`：通常用于无返回值的函数
* `enum`：枚举类型，表示一组命名常量


### 四、联合类型与交叉类型

* **联合类型（Union）**：值可以是多种类型之一，例如 `string | number`
* **交叉类型（Intersection）**：同时拥有多个类型的特性，例如 `{ name: string } & { age: number }`


### 五、类型工具与泛型系统

#### 泛型（Generics）

通过参数化定义可复用的类型逻辑：

```ts
  return value;
}
```

基于类型判断的逻辑分支：

```ts
```

用于批量构造新类型：

```ts
  [P in keyof T]: T[P];
}
```

取类型中的某个属性类型：

```ts
```

TypeScript 提供了丰富的内置工具类型，用于操作已有类型：

* `Partial<T>`：将所有属性设为可选
* `Required<T>`：将所有属性设为必填
* `Readonly<T>`：将所有属性设为只读
* `Pick<T, K>`：从 T 中挑选某些属性
* `Omit<T, K>`：从 T 中排除某些属性
* `Record<K, T>`：构造键为 K，值为 T 的对象类型
* `Exclude<T, U>`：从 T 中排除 U
* `Extract<T, U>`：从 T 中提取 U

### 七、字面量类型与模板字面量类型

* **字面量类型**：`'GET' | 'POST'` 等限定值
* **模板字面量类型**（TypeScript 4.1+）：

```ts
```

* 类型守卫：如 `typeof`、`instanceof`、用户自定义类型谓词（`x is T`）；
* 类型推导：TS 能自动推断变量、函数返回值等的类型，减少冗余注解。
