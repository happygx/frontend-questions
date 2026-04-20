---
level: 3.5
---

# 如果你有一个业务组件库，希望打包输出为 esm + cjs + dts，有什么思路？

## 题目要点

1. 使用 `vite.build` 搭配 `vite-plugin-dts` 可以同时输出 ESM、CJS 和 `.d.ts`。
2. 保持 React、Vue 等为 external 避免重复打包。
3. 配置 `package.json` 的 `main/module/types` 字段，清晰指向输出结果。
4. 确保 tsconfig.json 中开启类型声明生成并指定输出路径。
5. 实际打包后建议用真实项目验证加载和类型提示是否正常。

## 参考答案

打包成 ESM、CJS 和生成 TypeScript 的 `.d.ts` 类型声明文件，关键是合理配置构建工具。

我们可以选用 `Rollup` 或 `Vite`（底层也是用 Rollup），下面以使用 **Vite 构建组件库** 为例，讲讲如何配置输出 ESM + CJS + DTS：

---

### 一、初始化项目结构

假设目录结构是：

```
  Button/index.tsx
  index.ts  // 组件库入口

package.json
vite.config.ts
tsconfig.json
```

### 二、Vite 配置打包输出

`vite.config.ts` 示例：

```ts
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // 组件库入口
      name: 'MyComponentLib',
      formats: ['es', 'cjs'],
      fileName: (format) => `my-component-lib.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // 避免打包这些外部依赖
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [dts()],
});
```

* `formats: ['es', 'cjs']`：表示输出两种格式。
* `external`: 保持 `react`、`react-dom` 是外部依赖（否则会被打进 bundle）。
* `vite-plugin-dts`：自动为库生成类型定义文件。

---

### 三、生成 `.d.ts` 类型文件

安装 `vite-plugin-dts` 插件：

```bash
```

---

### 四、tsconfig.json 配置

```json
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "declaration": true,
    "declarationDir": "dist/types",
    "emitDeclarationOnly": true,
    "jsx": "react-jsx",
    "outDir": "dist",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src"]
}
```

---

### 五、打包命令配置

在 `package.json` 中配置构建命令：

```json
  "main": "dist/my-component-lib.cjs.js",
  "module": "dist/my-component-lib.es.js",
  "types": "dist/types/index.d.ts",
  "scripts": {
    "build": "vite build"
  }
}
```
* `module` 是 ESM 的入口
* `types` 指向类型声明文件

---

### 六、验证输出

执行：

```bash
```

* `dist/my-component-lib.es.js`
* `dist/my-component-lib.cjs.js`
* `dist/types/index.d.ts`

此时组件库即可支持多种模块加载方式和类型提示。

---

### 其他建议

* 如果库中包含样式文件（如 `.scss`），要通过插件或 Vite 自定义配置将样式打包或分离。
* 发布前可以通过 `npm pack` 查看实际输出的文件内容。
* 如果考虑 tree-shaking，建议每个组件也单独导出，便于用户按需引入。
