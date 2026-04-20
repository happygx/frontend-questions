---
level: 2
---

# 纯 TS 项目工程中, 如何使用 alias path?

## 题目要点

在纯 TypeScript 项目中使用 alias path 主要涉及以下步骤：
1. **配置 `tsconfig.json`**：设置 `baseUrl` 和 `paths`。
2. **配置构建工具**：根据使用的工具配置路径别名（Webpack、Vite 等）。
3. **使用别名**：在代码中按配置的别名路径进行模块导入。
4. **IDE 支持**：确保 IDE 支持路径别名配置。

## 参考答案

在纯 TypeScript 项目中使用 alias path 可以简化模块的导入路径，以下是关键的步骤：

### **1. 配置 `tsconfig.json`**

首先，在项目的根目录中找到或创建 `tsconfig.json` 文件。然后，使用 `paths` 和 `baseUrl` 属性来配置路径别名。

#### **示例 `tsconfig.json` 配置**：

```json
  "compilerOptions": {
    "baseUrl": "./", // 基础目录，所有路径别名都是相对于这个目录
    "paths": {
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"],
      "@models/*": ["src/models/*"]
    },
    "moduleResolution": "node",
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true
  },
  "include": ["src/**/*"]
}
```

如果你的项目使用了构建工具（如 Webpack、Vite），还需要配置相应的工具来识别这些别名。

#### **Webpack 配置**：

在 `webpack.config.js` 文件中，配置 `resolve.alias`。

```javascript

module.exports = {
  // ...其他配置
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@models': path.resolve(__dirname, 'src/models/')
    },
    extensions: ['.ts', '.js']
  }
};
```

在 `vite.config.ts` 文件中，配置 `resolve.alias`。

```typescript
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@models': resolve(__dirname, 'src/models')
    }
  }
});
```

在代码中使用路径别名进行模块导入。

#### **示例**：

```typescript
// import Button from '../../components/Button';

// 使用别名
import Button from '@components/Button';
```

确保你的 IDE 支持 TypeScript 路径别名。例如，在 VSCode 中，TypeScript 支持自动识别别名路径，但可能需要重启编辑器来应用更改。

### **5. 运行和测试**

在配置完成后，运行构建和测试过程，确保路径别名配置正确，模块导入能够正常工作。
