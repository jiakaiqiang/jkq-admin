# 组件拖拽消失问题修复

## 问题描述
在渲染区域拖动组件时，组件在拖拽后会消失，无法正常移动。

## 问题原因分析
问题出现的原因是两个拖拽系统产生了冲突：

1. **新组件拖拽系统**: 从左侧组件库拖拽新组件到画布
2. **组件移动拖拽系统**: 在画布上拖拽已放置的组件进行位置调整

这两个系统都使用了相同的拖拽事件处理机制，导致：
- 组件移动时被误认为是新组件放置
- 拖拽事件处理逻辑混乱
- 组件在拖拽后消失

## 修复方案

### 1. 拖拽类型标识
为不同类型的拖拽添加标识，区分新组件放置和组件移动：

```typescript
// 在组件拖拽开始时添加标识
if (event.dataTransfer) {
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', props.component.id)
  event.dataTransfer.setData('application/component-move', 'true') // 标识这是组件移动
}
```

### 2. 事件处理分离
分别处理新组件放置和组件移动的事件：

```typescript
// ContentDraw.vue - 拖拽放置处理
const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  
  // 检查是否是组件移动
  const isComponentMove = event.dataTransfer?.getData('application/component-move') === 'true'
  if (isComponentMove) {
    // 处理组件移动的放置
    const componentId = event.dataTransfer?.getData('text/plain')
    if (componentId) {
      emit('componentDrop', componentId, event)
    }
    return
  }
  
  // 处理新组件的放置
  emit('drop', event)
}
```

### 3. 拖拽效果区分
根据拖拽类型显示不同的拖拽效果：

```typescript
// 处理拖拽悬停
const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  
  // 检查拖拽类型
  const dragTypes = event.dataTransfer?.types || []
  const isComponentMove = dragTypes.includes('application/component-move')
  
  if (isComponentMove) {
    event.dataTransfer!.dropEffect = 'move'  // 移动效果
  } else {
    event.dataTransfer!.dropEffect = 'copy'  // 复制效果
  }
}
```

### 4. 专门的组件移动处理
添加专门的组件移动放置处理：

```typescript
// 处理组件拖拽放置
const handleComponentDrop = (componentId: string, event: DragEvent) => {
  // 获取画布容器位置
  const canvasContent = event.currentTarget as HTMLElement
  const rect = canvasContent.getBoundingClientRect()
  
  // 计算鼠标位置
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top
  
  // 更新组件位置
  const component = findComponentById(components.value, componentId)
  if (component) {
    // 获取组件尺寸
    const { width: componentWidth, height: componentHeight } = getComponentSize(component.type, component.props)
    
    // 计算组件左上角位置（让组件中心对准鼠标位置）
    const x = mouseX - componentWidth / 2
    const y = mouseY - componentHeight / 2
    
    component.position = { x, y }
    
    // 添加到历史记录
    addToHistory('移动组件', `移动了 ${component.type} 组件`)
  }
}
```

## 修复的文件

### 1. ComponentRenderer.vue
- 在拖拽开始时添加组件移动标识
- 设置正确的拖拽数据类型

### 2. ContentDraw.vue
- 分离拖拽放置事件处理
- 区分新组件放置和组件移动
- 添加专门的组件移动放置处理
- 根据拖拽类型显示不同的拖拽效果

### 3. index.vue
- 添加组件拖拽放置事件处理
- 更新事件绑定
- 实现专门的组件移动逻辑

## 技术要点

### 1. HTML5 拖拽 API 限制
- 在 `dragover` 事件中不能读取 `dataTransfer` 数据
- 需要使用 `dataTransfer.types` 数组来检查拖拽类型
- 只能设置 `dropEffect` 来改变拖拽视觉效果

### 2. 事件处理顺序
1. `dragstart` - 设置拖拽数据和标识
2. `dragover` - 设置拖拽效果
3. `drop` - 处理拖拽放置
4. `dragend` - 清理拖拽状态

### 3. 数据传递机制
- 使用 `dataTransfer.setData()` 传递组件ID
- 使用自定义MIME类型标识拖拽类型
- 通过事件发射器在组件间传递数据

## 测试验证

### 测试场景
1. **新组件拖拽**: 从左侧拖拽组件到画布，验证正常放置
2. **组件移动**: 拖拽画布上的组件，验证正常移动
3. **多次移动**: 连续移动同一个组件，验证稳定性
4. **混合操作**: 先放置新组件，再移动，验证无冲突
5. **历史记录**: 验证组件移动操作被正确记录

### 预期结果
- ✅ 组件拖拽移动不再消失
- ✅ 新组件放置正常工作
- ✅ 两种拖拽操作互不干扰
- ✅ 拖拽效果正确显示
- ✅ 历史记录正常记录

## 兼容性说明
- 保持所有现有功能不变
- 向后兼容现有组件配置
- 不影响预览模式功能
- 保持撤销/恢复功能正常

## 性能优化
- 使用事件委托减少事件监听器数量
- 避免重复的DOM查询
- 优化拖拽事件处理逻辑
- 减少不必要的数据传递
