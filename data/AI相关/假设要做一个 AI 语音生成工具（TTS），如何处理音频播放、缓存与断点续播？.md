---
level: 3.5
---

# 假设要做一个 AI 语音生成工具（TTS），如何处理音频播放、缓存与断点续播？

## 题目要点

- **播放层**：优先使用 Web Audio API 实现精细控制，兼容 `<audio>` 兜底  
- **缓存层**：内存+磁盘+服务端三级缓存，LRU 控制存储容量  
- **续播层**：持久化播放状态 + 时间戳同步 + 块队列管理  
- **健壮性**：网络中断恢复 + 解码错误降级 + 离线支持  
- **性能**：并行解码 + 智能预加载 + 内存回收

## 参考答案

构建一个健壮的 AI 语音生成工具（TTS）需要综合处理音频流处理、缓存策略和播放控制，以下是分层次的解决方案：

### 一、音频播放处理
#### 1. **流式播放技术**
- **Web Audio API** 实现低延迟播放
  ```javascript
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let activeSource = null;

  const playStream = (audioBuffer) => {
    if (activeSource) activeSource.stop(); // 中断当前播放
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
    activeSource = source;
  };
  ```
- **兼容性处理**：对旧版浏览器回退到 `<audio>` 标签

#### 2. **分块播放控制**
- 将长音频分割为 5-10s 的片段（chunks）
- 使用 `AudioBufferSourceNode` 队列管理播放顺序
- **无缝衔接**：通过 `onended` 事件预加载下一段


### 二、缓存策略设计
#### 1. **多级缓存体系**
| 缓存层级 | 存储介质              | 特性                     | 实现方案                  |
|----------|-----------------------|--------------------------|---------------------------|
| 内存缓存 | Memory                | 瞬时访问，容量有限       | `Map` 对象存储解码后音频  |
| 磁盘缓存 | IndexedDB             | 持久化，支持大文件       | 存储 ArrayBuffer 格式数据 |
| 服务缓存 | CDN/Edge Cache        | 分布式加速               | ETag 指纹校验             |

#### 2. **缓存键生成规则**
```javascript
const generateCacheKey = (text, config) => {
  return crypto.subtle.digest('SHA-256', 
    new TextEncoder().encode(`${text}_${config.voice}_${config.speed}`)
  ).then(hash => hex(hash));
};
```
- **LRU 淘汰机制**：限制 IndexedDB 存储条目（如最多 100 条）
- **版本控制**：当 TTS 模型更新时自动清空旧缓存


### 三、断点续播实现
#### 1. **播放状态持久化**
```typescript
  audioId: string;
  currentChunk: number;  // 当前片段索引
  progress: number;      // 当前片段内进度(秒)
  timestamp: number;     // 最后更新时间
}

// 使用 localStorage 保存状态
const savePlaybackState = (state: PlaybackState) => {
  localStorage.setItem('tts_playback', JSON.stringify(state));
};
```
```javascript
  const savedState = loadPlaybackState(audioId);
  if (!savedState) return;

  // 加载对应音频块
  const chunks = await loadAudioChunksFromCache(audioId);
  const startChunk = savedState.currentChunk;
  
  // 创建从断点开始的播放
  const source = audioContext.createBufferSource();
  source.buffer = chunks[startChunk];
  source.start(0, savedState.progress);
  
  // 设置后续块队列
  source.onended = () => playNextChunk(startChunk + 1);
};
```
- 使用 `requestAnimationFrame` 定期保存进度
  ```javascript
  let lastUpdate = 0;
  const trackProgress = () => {
    if (audioContext.currentTime - lastUpdate > 0.5) { // 每500ms保存
      savePlaybackState({
        audioId: currentAudioId,
        currentChunk: playingChunkIndex,
        progress: getCurrentChunkProgress(),
        timestamp: Date.now()
      });
      lastUpdate = audioContext.currentTime;
    }
    requestAnimationFrame(trackProgress);
  };
  ```

### 四、异常处理优化
#### 1. **网络中断恢复**
- 在 fetch 请求中使用 `AbortController` 实现超时重试
- 对未完成的音频块记录下载进度，恢复时优先补全缺失部分

#### 2. **播放错误降级**
```javascript
  if (e.target.error.code === MediaError.MEDIA_ERR_DECODE) {
    // 尝试重新解码或切换备用格式
    fallbackToMP3Version();
  }
});
```
- Service Worker 预缓存常用语音模板
- 显示离线存储的音频时长/质量提示


### 五、性能优化技巧
1. **并行解码**：使用 Web Worker 提前解码后续音频块  
2. **预加载策略**：根据用户行为预测加载可能需要的语音（如翻页时预载下一页内容）  
3. **内存管理**：释放非活跃音频块的 Web Audio 节点，避免内存泄漏  


实际开发中建议结合 WebRTC 的 `insertable streams` 处理实时流，并考虑添加 WASM 加速的音频处理模块。对于企业级应用，可引入音频指纹水印技术防止内容滥用。
