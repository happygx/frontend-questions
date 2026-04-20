---
level: 3
---

# 斐波拉契数列是什么，用 JS 实现，用尾调优化斐波拉契数列

## 题目要点

- **斐波那契数列**：每个数是前两个数的和，常见的递归和迭代实现方式。
- **尾调用优化**：通过尾递归实现可以提高性能和避免栈溢出问题，特别是在处理大规模的递归调用时。

尾调用优化在某些 JavaScript 引擎中可能不被完全支持，但良好的编程实践是尽量使用尾递归来避免性能瓶颈。

## 参考答案

斐波那契数列（Fibonacci Sequence）是一种经典的数列，每个数都是前两个数的和。通常的数列从 0 和 1 开始，数列的定义如下：

- \( F(0) = 0 \)
- \( F(1) = 1 \)
- 对于 \( n > 1 \)，\( F(n) = F(n-1) + F(n-2) \)

### JavaScript 实现

斐波那契数列可以用递归方法、迭代方法或尾调用优化方法来实现。尾调用优化（Tail Call Optimization, TCO）是一种优化技术，允许编译器在函数的最后一步调用另一个函数时，重用当前函数的栈帧，从而避免栈溢出。

### 1. 基本递归实现（不优化）

```javascript
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 输出: 55
```

尾调用优化需要确保递归调用是函数的最后一步。下面是尾调用优化的斐波那契数列实现：

```javascript
    function tailRecursiveFib(n, a = 0, b = 1) {
        if (n === 0) return a;
        if (n === 1) return b;
        return tailRecursiveFib(n - 1, b, a + b);
    }
    
    return tailRecursiveFib(n);
}

console.log(fibonacci(10)); // 输出: 55
```

1. **尾递归函数 `tailRecursiveFib`**：
   - 该函数接收三个参数：`n`（剩余的步骤）、`a`（当前的斐波那契数）和 `b`（下一个斐波那契数）。
   - 如果 `n` 为 0，返回 `a`，否则，如果 `n` 为 1，返回 `b`。
   - 否则，递归调用 `tailRecursiveFib`，将 `n-1` 作为新的步骤，`b` 作为当前的斐波那契数，`a + b` 作为下一个斐波那契数。

2. **尾调用优化**：
   - 在递归调用中，`tailRecursiveFib` 是函数的最后一步调用，因此可以进行尾调用优化，避免了传统递归中的栈深度问题。
