---
level: 2
---

# 你了解哪些 AI 前端工具或库？

## 题目要点

| 类型 | 工具/库 | 用途 |
|------|---------|------|
| 模型调用 | LangChain.js、openai SDK | 接入 LLM 模型 |
| 文本/代码 | react-markdown、highlight.js | 展示 AI 输出 |
| 图像/视觉 | TensorFlow.js、Replicate.js | 图像生成与识别 |
| UI | ChatUI、Gradio | 快速搭建交互界面 |
| 工具辅助 | Copilot、Cursor | 提高开发效率 |

## 参考答案

## 一、**模型接入与调用相关**

### 1. **LangChain.js**
- 用于构建多轮对话、智能代理等 AI 应用的 JS 框架；
- 支持 OpenAI、Anthropic、Cohere、HuggingFace 等模型；
- 适合前后端一体化接入 LLM；
- 可结合 React、Next.js 使用。

> 适合构建带工具调用、记忆能力、多轮推理的 LLM 应用。

---

### 2. **openai SDK（官方）**
- 官方提供的 JS SDK，用于调用 GPT 接口；
- 支持 Chat Completions、Embeddings、File 上传等能力；
- 常用于前端配合后端服务调用 OpenAI。

---

### 3. **Replicate.js**
- 可用于调用 [replicate.com](https://replicate.com) 上开源模型（如图像生成、视频生成等）；
- 封装了 HTTP 请求，方便调用图像类模型（如 Stable Diffusion）；

---

## 二、**文本处理与交互增强**

### 4. **react-markdown / markdown-it**
- 渲染大模型返回的 markdown 文本；
- 可拓展支持语法高亮、数学公式、表格等；
- 常见于 ChatGPT 类产品中的助手回答展示。

---

### 5. **highlight.js / prismjs**
- 用于代码高亮（配合 markdown 一起用）；
- 常用于模型输出包含代码片段时的展示优化。

---

## 三、**AI 可视化与工具类**

### 6. **gradio**
- 虽是后端工具，但有嵌入式前端 UI；
- 适合快速为 AI 模型生成交互界面；
- 主要用于快速测试 LLM、图像生成、分类器等模型。

---

### 7. **ChatUI (by Alibaba)**
- 专注构建智能对话界面的 UI 组件库；
- 提供标准化聊天气泡、输入框、流式加载等能力；
- 可用于构建 LLM + Chat UI 应用。

---

## 四、**AI 编辑与创作辅助类**

### 8. **Cursor / Copilot / Tabnine**
- 代码智能补全，部分支持前端编辑器集成；
- 虽不是库，但属于前端 AI 能力提升工具。

---

## 五、**视觉相关工具**

### 9. **TensorFlow.js**
- 在浏览器中运行 AI 模型的 JS 框架；
- 支持图像识别、姿态检测、实时音频处理等；
- 适合离线场景或无需调用云端模型时使用。

---

### 10. **Teachable Machine**
- Google 出品，无需代码即可训练简单模型；
- 支持人脸识别、音频识别等，导出后前端可直接加载运行。
