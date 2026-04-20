---
level: 1.5
---

# 如何封装一个 AI 图片生成组件，支持选择模型、输入 prompt、展示图像并支持本地保存？

## 题目要点

1. **分层设计**：分离模型选择、Prompt输入、图片展示为独立子组件
2. **类型安全**：使用 TypeScript 严格定义接口和状态类型
3. **性能优化**：流式接收图片数据并显示进度
4. **可扩展性**：通过配置对象支持未来新增生成参数
5. **用户体验**：包含生成状态反馈和历史记录功能
6. **安全性**：前端基础内容过滤+后端二次验证

## 参考答案

以下是封装一个高可复用 AI 图片生成组件的完整方案，基于 React + TypeScript 实现，包含模型选择、Prompt 输入、实时展示和本地保存功能：


### 一、组件架构设计
```typescript
  model: string;          // 选择的模型ID
  prompt: string;         // 用户输入的提示词
  negativePrompt?: string; // 可选负面提示词
  width: number;          // 生成图片宽度
  height: number;         // 生成图片高度
}

type ImageGenStatus = 'idle' | 'generating' | 'success' | 'error';
```

#### 1. **模型选择模块**
```tsx
  models: Array<{ id: string; name: string }>;
  onChange: (modelId: string) => void;
}) => (
  <select 
    onChange={(e) => onChange(e.target.value)}
    className="model-selector"
  >
    {models.map(model => (
      <option key={model.id} value={model.id}>
        {model.name} 
        {model.id.includes('xl') && ' (高清)'}
      </option>
    ))}
  </select>
);
```
```tsx
  onGenerate: (config: ImageGenConfig) => void;
}) => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');

  const handleSubmit = () => {
    onGenerate({
      model: 'sd-xl-1.0',
      prompt,
      negativePrompt,
      width: 1024,
      height: 1024
    });
  };

  return (
    <div className="prompt-editor">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="描述你想要生成的图像..."
      />
      <AdvancedOptions>
        <input
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
          placeholder="不希望出现的元素"
        />
      </AdvancedOptions>
      <button onClick={handleSubmit}>生成</button>
    </div>
  );
};
```
```tsx
  imageData: string | null;
  status: ImageGenStatus;
}) => {
  if (status === 'generating') {
    return <ProgressBar />;
  }

  return imageData ? (
    <div className="image-container">
      <img 
        src={`data:image/png;base64,${imageData}`} 
        alt="生成的AI图片"
        onLoad={() => URL.revokeObjectURL(imageData)}
      />
      <ImageToolbar imageData={imageData} />
    </div>
  ) : (
    <Placeholder />
  );
};
```
```tsx
  const link = document.createElement('a');
  link.href = `data:image/png;base64,${base64Data}`;
  link.download = `${fileName}_${Date.now()}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 在组件中使用
<button onClick={() => saveImage(imageData!, prompt.substring(0, 20))}>
  保存图片
</button>
```

### 三、状态管理与 API 集成

#### 1. **封装 AI 服务调用**
```typescript
  config: ImageGenConfig,
  onProgress?: (progress: number) => void
): Promise<string> => {
  const response = await fetch('/api/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config)
  });

  if (!response.ok) throw new Error('生成失败');

  const reader = response.body?.getReader();
  const chunks: Uint8Array[] = [];
  let receivedLength = 0;
  const contentLength = parseInt(response.headers.get('Content-Length') || '0');

  while (reader) {
    const { done, value } = await reader.read();
    if (done) break;
    
    chunks.push(value);
    receivedLength += value.length;
    onProgress?.(Math.round((receivedLength / contentLength) * 100));
  }

  const blob = new Blob(chunks, { type: 'image/png' });
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(blob);
  });
};
```
```tsx
  const [config, setConfig] = useState<ImageGenConfig>(defaultConfig);
  const [imageData, setImageData] = useState<string | null>(null);
  const [status, setStatus] = useState<ImageGenStatus>('idle');

  const handleGenerate = async () => {
    setStatus('generating');
    try {
      const data = await generateImage(config, (progress) => {
        console.log(`生成进度: ${progress}%`);
      });
      setImageData(data);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.error(error);
    }
  };

  return (
    <div className="ai-image-generator">
      <ModelSelector 
        models={availableModels} 
        onChange={(model) => setConfig({...config, model})} 
      />
      <PromptInput onGenerate={handleGenerate} />
      <ImageDisplay imageData={imageData} status={status} />
    </div>
  );
};
```

### 四、增强功能实现

#### 1. **生成历史记录**
```tsx
  config: ImageGenConfig;
  imageData: string;
  timestamp: number;
}>>([]);

const addToHistory = (item: typeof history[0]) => {
  setHistory(prev => [item, ...prev.slice(0, 9)]);
};
```
```css
  position: relative;
  max-width: 100%;
  aspect-ratio: 1/1;
  background: #f0f0f0;
}

@media (min-width: 768px) {
  .ai-image-generator {
    grid-template-columns: 300px 1fr;
  }
}
```
```typescript
const filterPrompt = (prompt: string) => {
  const blockedTerms = ['暴力', '仇恨言论'];
  return blockedTerms.some(term => prompt.includes(term)) 
    ? null 
    : prompt;
};
```

### 五、组件使用示例
```tsx
const App = () => {
  const availableModels = [
    { id: 'sd-xl-1.0', name: 'Stable Diffusion XL' },
    { id: 'karlo-v1', name: 'Kakao Karlo' }
  ];

  return (
    <AIImageGenerator 
      models={availableModels}
      apiKey={import.meta.env.VITE_API_KEY}
    />
  );
};
```
