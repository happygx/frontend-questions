---
level: 2
---

# vue3 为什么要引入 Composition API ？


## 题目要点

Vue 3 引入 Composition API 主要是为了提高代码的组织性和复用性。它允许开发者使用函数式的方式组织组件逻辑，从而更好地处理复杂的逻辑和状态共享，尤其在大型项目中。这种方法也提供了更好的类型推断支持（在 TypeScript 中尤为重要），并改善了代码的可维护性和可读性。

## 参考答案

Vue 3 引入 Composition API 的原因主要是为了更好地解决以下几个问题：

### 1. 更好的代码组织和重用

在 Vue 2 中，使用选项式 API（Options API）来定义组件的逻辑，通常将数据、方法、计算属性和生命周期钩子分开写在不同的配置对象中。当组件变得复杂时，不同功能的代码可能会散落在各个部分，难以维护和重用。

#### 示例：

```javascript
export default {
  data() {
    return {
      count: 0,
      message: 'Hello World'
    };
  },
  computed: {
    doubleCount() {
      return this.count * 2;
    }
  },
  methods: {
    increment() {
      this.count++;
    }
  },
  created() {
    console.log(this.message);
  }
};
```

#### 示例：

```javascript
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const message = ref('Hello World');
    
    const doubleCount = computed(() => count.value * 2);
    
    const increment = () => {
      count.value++;
    };
    
    onMounted(() => {
      console.log(message.value);
    });
    
    return {
      count,
      doubleCount,
      increment,
      message
    };
  }
};
```

在 Vue 2 中，逻辑复用主要通过 mixins 和 scoped slots 实现，但它们都有一些缺点，比如命名冲突和代码可读性差。

Composition API 通过组合函数（composable functions）来实现逻辑复用，这些函数可以在多个组件之间共享和复用逻辑，避免了 mixins 的缺点。

#### 示例：

```javascript
import { ref, onMounted } from 'vue';

export function useMessage() {
  const message = ref('Hello World');
  
  onMounted(() => {
    console.log(message.value);
  });
  
  return {
    message
  };
}
```

```javascript
import { useMessage } from './useMessage';

export default {
  setup() {
    const count = ref(0);
    const { message } = useMessage();
    
    const increment = () => {
      count.value++;
    };
    
    return {
      count,
      message,
      increment
    };
  }
};
```

Composition API 天然地支持 TypeScript，使得类型推断和类型检查更为自然和方便。相比于 Options API，通过 Composition API 定义的逻辑更容易进行类型声明和类型推断，提升了开发体验。

#### 示例：

```typescript

export default {
  setup() {
    const count = ref<number>(0);
    const doubleCount = computed<number>(() => count.value * 2);
    
    const increment = (): void => {
      count.value++;
    };
    
    return {
      count,
      doubleCount,
      increment
    };
  }
};
```

Composition API 借鉴了函数式编程的思想，将逻辑封装成函数，使得代码更加简洁、模块化、可测试，同时也更符合现代 JavaScript 开发趋势。

### 总结

Vue 3 引入 Composition API 主要是为了提升代码组织和复用性、提供更好的 TypeScript 支持、适应函数式编程趋势，并且解决 Vue 2 中存在的一些问题。通过 Composition API，可以让组件逻辑更加清晰、灵活和易于维护。
