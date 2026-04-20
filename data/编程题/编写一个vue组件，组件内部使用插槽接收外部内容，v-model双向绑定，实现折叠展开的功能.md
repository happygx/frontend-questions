---
level: 3.5
---

# 编写一个vue组件，组件内部使用插槽接收外部内容，v-model双向绑定，实现折叠展开的功能

## 参考答案

下面是示例代码：

```html
  <div>
    <button @click="toggleCollapse">
      {{ collapsed ? '展开' : '折叠' }}
    </button>
    <div v-show="!collapsed">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'collapsed',
    event: 'toggle',
  },
  props: {
    collapsed: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    toggleCollapse() {
      this.$emit('toggle', !this.collapsed);
    },
  },
};
</script>
```

组件内部有一个`v-show`指令，根据`collapsed`属性的值决定是否显示插槽内容。当`collapsed`为`true`时，插槽内容将被隐藏；当`collapsed`为`false`时，插槽内容将显示出来。

在使用该组件时，可以使用`v-model`来进行双向绑定：

```html
  <div>
    <collapse-panel v-model="isCollapsed">
      <!-- 插入要折叠展开的内容 -->
      <p>这是要折叠展开的内容</p>
    </collapse-panel>
  </div>
</template>

<script>
import CollapsePanel from '@/components/CollapsePanel.vue';

export default {
  components: {
    CollapsePanel,
  },
  data() {
    return {
      isCollapsed: true,
    };
  },
};
</script>
```
