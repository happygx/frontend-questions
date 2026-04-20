---
level: 2
---

# npm script 生命周期有哪些?

## 参考答案

在 `npm` 中，`scripts` 部分允许你定义和运行自定义的脚本命令。`npm` 脚本有一个生命周期的概念，其中包括一系列的预定义和自定义的生命周期钩子。生命周期钩子的执行顺序和作用如下：

### **1. 生命周期钩子概述**

在 `npm` 中，生命周期钩子是一些特定的脚本命令，`npm` 会在特定的时间点自动运行这些命令。例如，安装包之前、之后或者在发布时。

### **2. 生命周期钩子的具体阶段**

1. **`prepublish`**
   - **触发时间**：在 `npm publish` 和 `npm install` 时。
   - **作用**：用于在包发布之前进行准备工作（如构建、测试等）。
   - **说明**：`prepublish` 在 `npm install` 和 `npm publish` 之前执行。

2. **`prepare`**
   - **触发时间**：在 `npm install` 和 `npm publish` 时。
   - **作用**：用于构建、准备包的内容等（如运行编译、构建脚本）。这个阶段在 `prepublish` 之后执行。
   - **说明**：`prepare` 主要用于在本地开发和发布之前执行准备工作。

3. **`prepublishOnly`**
   - **触发时间**：在 `npm publish` 时。
   - **作用**：仅在发布包时执行。不会在 `npm install` 时触发。
   - **说明**：这个钩子在 `npm publish` 时执行，但在 `npm install` 时不会触发。

4. **`postpublish`**
   - **触发时间**：在 `npm publish` 后。
   - **作用**：用于在包发布之后进行清理或其他操作（如发送通知）。
   - **说明**：`postpublish` 在包发布之后执行。

5. **`preinstall`**
   - **触发时间**：在包的安装之前。
   - **作用**：用于在包安装之前执行任何必要的操作（如设置环境）。
   - **说明**：`preinstall` 在运行 `npm install` 之前执行。

6. **`install`**
   - **触发时间**：在包的安装过程中。
   - **作用**：用于在包安装过程中执行自定义操作。
   - **说明**：`install` 在 `preinstall` 之后执行。

7. **`postinstall`**
   - **触发时间**：在包安装之后。
   - **作用**：用于在包安装后执行清理、构建或其他操作（如启动本地服务器）。
   - **说明**：`postinstall` 在 `install` 之后执行。

8. **`preuninstall`**
   - **触发时间**：在包卸载之前。
   - **作用**：用于在包卸载之前执行任何必要的操作（如清理）。
   - **说明**：`preuninstall` 在包卸载之前执行。

9. **`uninstall`**
   - **触发时间**：在包卸载过程中。
   - **作用**：用于在包卸载过程中执行自定义操作。
   - **说明**：`uninstall` 在 `preuninstall` 之后执行。

10. **`postuninstall`**
    - **触发时间**：在包卸载之后。
    - **作用**：用于在包卸载之后执行清理或其他操作。
    - **说明**：`postuninstall` 在包卸载之后执行。

### **3. 脚本执行顺序**

当执行 `npm install` 或 `npm publish` 时，`npm` 会按照以下顺序运行这些脚本：

1. `preinstall`
2. `install`
3. `postinstall`
4. `prepublish` （在 `npm publish` 时）
5. `prepare`
6. `publish` （在 `npm publish` 时）
7. `postpublish`

当卸载包时，执行顺序为：

1. `preuninstall`
2. `uninstall`
3. `postuninstall`

### **4. 使用脚本**

在 `package.json` 中定义的自定义脚本与生命周期钩子无关，但可以与这些钩子一起使用。例如：

```json
  "scripts": {
    "build": "webpack",
    "test": "jest",
    "prepublishOnly": "npm run build",
    "postinstall": "npm run test"
  }
}
```
- `prepublishOnly` 钩子在发布前运行 `npm run build`。
- `postinstall` 钩子在安装后运行 `npm run test`。

通过合理利用生命周期钩子，可以在不同阶段自动执行必要的操作，确保项目的一致性和可靠性。
