---
level: 3
---

# 如何在富文本中插入可控组件，如“可编辑 AI 卡片”、“模型输入块”等？会有哪些技术难点？

## 题目要点

- **节点抽象**：将交互组件建模为富文本的特殊节点类型
- **沙箱隔离**：防止组件行为干扰编辑器核心功能
- **数据同步**：双向绑定组件状态与编辑器文档模型
- **历史管理**：统一撤销/重做堆栈
- **跨平台处理**：自定义剪贴板序列化方案
- **性能优化**：动态加载与虚拟滚动支持

## 参考答案

### 一、核心实现方案

#### 1. **自定义节点嵌入（推荐方案）**
基于现代富文本框架的原子化节点设计：
```javascript
const insertAICard = (editor) => {
  const cardNode = {
    type: 'ai-card',
    model: 'gpt-4',
    prompt: '',
    children: [{ text: '' }], // 必须包含空文本节点
    id: nanoid()
  };
  Transforms.insertNodes(editor, cardNode);
};

// 渲染自定义元素
const Element = ({ attributes, children, element }) => {
  if (element.type === 'ai-card') {
    return (
      <div {...attributes} contentEditable={false}>
        <AICard 
          model={element.model}
          data={element}
          onChange={(newData) => updateNode(editor, element.id, newData)}
        />
        {children}
      </div>
    );
  }
  // ...其他元素处理
};
```
解决富文本与React/Vue组件共存问题：
```tsx
const SandboxedComponent = ({ component }) => {
  const shadowRoot = useRef<ShadowRoot>();

  useEffect(() => {
    const host = document.createElement('div');
    shadowRoot.current = host.attachShadow({ mode: 'open' });
    ReactDOM.render(component, shadowRoot.current);
    return () => ReactDOM.unmountComponentAtNode(shadowRoot.current!);
  }, [component]);

  return <div ref={(node) => node?.appendChild(shadowRoot.current!.host)} />;
};
```
设计可序列化的组件数据格式：
```typescript
  type: 'ai-card';
  version: 1;
  config: {
    model: string;
    temperature?: number;
    maxTokens?: number;
  };
  contentHash: string; // 用于缓存校验
}
```

#### 1. **光标跳跃问题**
- **现象**：聚焦自定义组件时失去编辑位置
- **解决方案**：
  ```javascript
  // 在组件外层包裹 contentEditable=false 的 div
  // 并维护一个隐藏的文本节点保持光标
  <div contentEditable={false}>
    <InteractiveComponent />
    <span style={{ display: 'none' }}>​</span> // 零宽空格
  </div>
  ```

#### 2. **撤销/重做兼容性**
- **难点**：富文本的历史记录与组件状态不同步
- **方案**：
  - 将组件状态变化转化为原子操作（如 `{ type: 'UPDATE_AI_CARD', id, payload }`）
  - 集成到编辑器的历史堆栈中

#### 3. **跨平台复制粘贴**
- **问题**：自定义组件在复制时丢失
- **处理**：
  ```javascript
  // 监听复制事件，转换为特殊标记
  editor.on('copy', (event) => {
    if (isAICardNode(selectedNode)) {
      event.preventDefault();
      const cardData = serializeCard(selectedNode);
      event.clipboardData.setData('text/html', `<!--ai-card:${cardData}-->`);
    }
  });

  // 粘贴时解析标记
  editor.on('paste', (event) => {
    const html = event.clipboardData.getData('text/html');
    const match = html.match(/<!--ai-card:(.+?)-->/);
    if (match) {
      insertAICard(editor, deserializeCard(match[1]));
    }
  });
  ```

#### 4. **响应式布局冲突**
- **挑战**：组件宽度与编辑器流式布局不匹配
- **解决**：
  ```css
  /* 限制组件最大宽度并保持居中 */
  .editor-ai-card {
    max-width: min(100%, 600px);
    margin: 1rem auto;
    border: 1px solid #eee;
    border-radius: 8px;
  }
  ```

#### 5. **动态数据加载**
- **场景**：AI卡片需要异步获取数据
- **实现**：
  ```tsx
  const AICard = ({ id }) => {
    const [content, setContent] = useState('');
    const editor = useSlateStatic();

    useEffect(() => {
      fetchAIData(id).then(data => {
        setContent(data);
        // 更新编辑器节点
        Transforms.setNodes(editor, { content }, { at: findNodePath(editor, id) });
      });
    }, [id]);

    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };
  ```

### 三、推荐技术栈组合

| 技术领域       | 推荐方案                          |
|----------------|-----------------------------------|
| 富文本框架     | Slate.js / TipTap (ProseMirror)   |
| 状态管理       | Redux Toolkit / Zustand           |
| 组件沙箱       | Shadow DOM + IFrame 混合策略      |
| 数据同步       | CRDT (如 Y.js) 用于协同编辑       |
| 持久化格式     | 自定义 Markdown 扩展或 JSON Schema |

### 四、高级优化方向

1. **懒加载组件**：
   ```tsx
   const LazyAICard = React.lazy(() => import('./AICard'));
   <Suspense fallback={<Skeleton />}>
     <LazyAICard {...props} />
   </Suspense>
   ```

2. **版本兼容迁移**：
   ```typescript
   function migrateLegacyCard(data: any): AICardNode {
     if (data.version === 1) return data;
     return {
       ...data,
       version: 1,
       config: { 
         model: data.model || 'gpt-3',
         temperature: data.temp ?? 0.7
       }
     };
   }
   ```

3. **移动端适配**：
   - 针对触摸屏优化组件操作区
   - 使用 `@media (hover: none)` 区分交互模式
