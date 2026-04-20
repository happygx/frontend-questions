---
level: 3
---

# VNode 有哪些属性？

## 题目要点

Vue内部定义的Vnode对象包含了多个属性，用于描述虚拟节点（Virtual DOM）的各个方面。这些属性包括：

1. **内部属性**：
   - `__v_isVNode: true`：标识该对象是一个Vnode。
   - `__v_skip: true`：标识是否跳过响应式转换。
   - `isCompatRoot?: true`：用于判断是否进行了兼容处理。
2. **类型和属性**：
   - `type`：虚拟节点的类型。
   - `props`：虚拟节点的props，包括静态和动态属性。
   - `key`：用于diff算法的key。
   - `ref`：虚拟节点的引用。
   - `scopeId`：单文件组件的scopeId。
   - `slotScopeIds`：与单文件组件的插槽有关。
   - `children`：子节点。
   - `component`：组件实例。
   - `dirs`：当前Vnode绑定的指令。
   - `transition`：TransitionHooks。
3. **DOM相关属性**：
   - `el`：宿主阶段的节点。
   - `anchor`：fragment的锚点。
   - `target`：teleport的目标。
   - `targetAnchor`：teleport的目标锚点。
   - `staticCount`：静态节点的数量。
4. **suspense相关属性**：
   - `suspense`：SuspenseBoundary。
   - `ssContent`：VNode。
   - `ssFallback`：VNode。
5. **优化属性**：
   - `shapeFlag`：表示节点的形状。
   - `patchFlag`：表示节点的patch标记。
   - `dynamicProps`：动态属性列表。
   - `dynamicChildren`：动态子节点列表。
6. **根节点属性**：
   - `appContext`：实例上下文。

## 参考答案

Vue内部定义的Vnode对象包含了以下属性：

* __v_isVNode: *true*，内部属性，有该属性表示为Vnode
* __v_skip: true，内部属性，表示跳过响应式转换，reactive转换时会根据此属性进行判断
* isCompatRoot?: *true*，用于是否做了兼容处理的判断
* type: VNodeTypes，虚拟节点的类型
* props: (VNodeProps & ExtraProps) | *null*，虚拟节点的props
* key: *string* | *number* | *null*，虚拟阶段的key，可用于diff
* ref: VNodeNormalizedRef | *null*，虚拟阶段的引用
* scopeId: *string* | *null*，仅限于SFC(单文件组件)，在设置currentRenderingInstance当前渲染实例时，一期设置
* slotScopeIds: *string*[] | *null*，仅限于单文件组件，与单文件组件的插槽有关
* children: VNodeNormalizedChildren，子节点
* component: ComponentInternalInstance | null，组件实例
* dirs: DirectiveBinding[] | null，当前Vnode绑定的指令
* transition: TransitionHooks<HostElement> | null，TransitionHooks
* DOM相关属性
	* el: HostNode | *null*，宿主阶段
	* anchor: HostNode | *null* // fragment anchor
	* target: HostElement | *null* ，teleport target 传送的目标
	* targetAnchor: HostNode | *null* // teleport target anchor
	* staticCount: *number*，包含的静态节点的数量
* suspense 悬挂有关的属性
	* suspense: SuspenseBoundary | *null*
	* ssContent: VNode | *null*
	* ssFallback: VNode | *null*
* optimization only 用于优化的属性
	* shapeFlag: *number*
	* patchFlag: *number*
	* dynamicProps: *string*[] | *null*
	* dynamicChildren: VNode[] | *null*
* 根节点会有的属性
	* appContext: AppContext | *null*，实例上下文

可以看到在Vue内部，对于一个Vnode描述对象的属性大概有二十多个。

Vue为了给用于减轻一定的负担，但又不至于太封闭，就创建了渲染h。可以在用户需要的时候，通过h函数创建对应的Vnode即可。

这样就给为一些高阶玩家保留了自由发挥的空间。
