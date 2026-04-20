---
level: 1.5
---

# 在开发过程中， 使用过哪些 TS 的特性或者能力？

## 题目要点

- **类型注解**：增强类型安全，避免运行时错误。
- **接口和类型别名**：定义结构清晰的类型，保证代码的可维护性。
- **泛型**：提高代码复用性和灵活性。
- **类型守卫**：确保在运行时处理正确的类型。
- **模块化和声明文件**：增强模块化支持，处理 JavaScript 库的类型定义。

## 参考答案

可以从以下这些方向作答：

### 1. **类型注解（Type Annotations）**
使用类型注解来显式地声明变量、函数参数和返回值的类型，从而保证代码的类型安全，避免类型错误。

#### 示例：
```typescript
let age: number = 30;

function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

### 2. **接口（Interfaces）**
接口定义了对象的结构，常用于类型约束、函数参数和返回值的类型定义，确保代码符合预期的结构。

#### 示例：
```typescript
  name: string;
  age: number;
  greet(): void;
}

const person: Person = {
  name: "Alice",
  age: 30,
  greet() {
    console.log("Hello!");
  },
};
```

### 3. **类型推导（Type Inference）**
TS 会根据变量或表达式的值自动推导出类型，在不显式声明类型时，依然能享受到类型安全的优势。

#### 示例：
```typescript
greeting = 42; // 错误：类型 'number' 不能赋给类型 'string'
```

### 4. **联合类型（Union Types）**
允许一个变量或参数可以是多种类型中的任意一种，使用 `|` 符号来表示。

#### 示例：
```typescript
  console.log(id);
}

printId(123); // OK
printId("abc"); // OK
```

### 5. **字面量类型（Literal Types）**
允许将特定的值作为类型，从而使得类型更加精确。通常用于枚举类型、状态码等场景。

#### 示例：
```typescript

function move(direction: Direction) {
  console.log(`Moving ${direction}`);
}

move("up"); // OK
move("north"); // 错误：'north' 不能赋给类型 'Direction'
```

### 6. **泛型（Generics）**
泛型使得函数、类、接口能够支持多种类型，而不需要具体指定类型。通过泛型，开发者能够编写更具复用性的代码。

#### 示例：
```typescript
  return value;
}

let result = identity("Hello"); // 推导出 T 为 string
let numberResult = identity(42); // 推导出 T 为 number
```

### 7. **类型别名（Type Aliases）**
通过 `type` 关键字可以为复杂的类型定义一个别名，简化类型定义并提高可读性。

#### 示例：
```typescript
const point: Point = { x: 10, y: 20 };
```

### 8. **交叉类型（Intersection Types）**
交叉类型允许将多个类型合并成一个类型，表示该类型需要满足多个类型的要求。

#### 示例：
```typescript
  name: string;
}

interface Employee {
  employeeId: number;
}

type EmployeePerson = Person & Employee;

const emp: EmployeePerson = {
  name: "Alice",
  employeeId: 123,
};
```

### 9. **类型守卫（Type Guards）**
类型守卫用于在运行时检查一个值的类型，并相应地缩小其类型范围。

#### 示例：
```typescript
  return typeof value === "string";
}

let input: unknown = "Hello";

if (isString(input)) {
  console.log(input.length); // input 被认为是 string 类型
}
```

### 10. **声明文件（Declaration Files）**
TS 支持声明文件（`.d.ts`），使得 JavaScript 库或模块可以被类型检查，增强对第三方库的类型支持。

#### 示例：
```typescript
  export function someFunction(): void;
}
```

### 11. **装饰器（Decorators）**
装饰器是 TypeScript 提供的一种元编程技术，通常用于类和类成员的修饰，可以用于注入依赖、方法拦截等场景。

#### 示例：
```typescript
  console.log(`Method ${key} was called`);
}

class MyClass {
  @log
  myMethod() {
    console.log("Executing method");
  }
}
```

### 12. **模块系统（Module System）**
TypeScript 默认使用 ES6 模块系统，可以通过 `import` 和 `export` 引入和导出模块，这使得代码更具模块化、可维护性更强。

#### 示例：
```typescript
export function add(a: number, b: number): number {
  return a + b;
}

// app.ts
import { add } from './math';
console.log(add(2, 3));
```
