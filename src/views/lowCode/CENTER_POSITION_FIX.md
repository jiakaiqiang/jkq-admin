# 组件中心位置修复

## 问题描述
组件放置时，组件的左上角对准鼠标位置，而不是组件的中心位置对准鼠标位置，导致用户体验不佳。

## 修复方案

### 1. 计算中心偏移
在组件放置时，计算组件尺寸的一半，然后从鼠标位置减去这个偏移量，使组件的中心对准鼠标位置。

```typescript
// 计算组件左上角位置（让组件中心对准鼠标位置）
const x = mouseX - componentWidth / 2
const y = mouseY - componentHeight / 2
```

### 2. 组件尺寸处理
为不同类型的组件设置了合理的默认尺寸：

- **文本组件**: 200×30px
- **按钮组件**: 120×40px  
- **图片组件**: 200×150px
- **输入框组件**: 200×40px
- **下拉选择组件**: 200×40px
- **容器组件**: 300×200px
- **分割线组件**: 200×1px

### 3. 辅助函数
创建了 `getComponentSize` 辅助函数来统一处理组件尺寸获取逻辑：

```typescript
const getComponentSize = (componentType: string, props: Record<string, any>) => {
  let width = props.width
  let height = props.height
  
  if (!width || !height) {
    // 根据组件类型设置默认尺寸
    switch (componentType) {
      case 'Text': width = 200; height = 30; break
      case 'Button': width = 120; height = 40; break
      // ... 其他组件类型
    }
  }
  
  return { width, height }
}
```

## 修复范围

### 1. 组件初始放置
- 从左侧拖拽组件到画布时，组件中心对准鼠标位置
- 支持所有组件类型

### 2. 组件拖拽移动
- 拖拽已放置的组件时，组件中心跟随鼠标移动
- 实时更新组件位置

## 技术实现

### 修改的文件
- `src/views/lowCode/index.vue`

### 主要变更
1. **handleDrop 函数**: 修改组件放置逻辑
2. **handleComponentDrag 函数**: 修改组件拖拽移动逻辑  
3. **getComponentSize 函数**: 新增组件尺寸获取辅助函数

### 代码示例
```typescript
// 处理拖拽放置
const handleDrop = (event: DragEvent) => {
  // ... 其他逻辑
  
  // 计算相对于画布的鼠标位置
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top
  
  // 获取组件默认尺寸
  const defaultProps = dragComponent.value.defaultProps
  const { width: componentWidth, height: componentHeight } = getComponentSize(dragComponent.value.type, defaultProps)
  
  // 计算组件左上角位置（让组件中心对准鼠标位置）
  const x = mouseX - componentWidth / 2
  const y = mouseY - componentHeight / 2
  
  // ... 创建组件
}
```

## 测试验证

### 测试场景
1. **文本组件放置**: 拖拽文本组件，验证中心对准鼠标位置
2. **按钮组件放置**: 拖拽按钮组件，验证中心对准鼠标位置
3. **图片组件放置**: 拖拽图片组件，验证中心对准鼠标位置
4. **组件移动**: 拖拽已放置的组件，验证中心跟随鼠标
5. **不同尺寸组件**: 测试不同尺寸的组件，验证中心计算正确

### 预期结果
- ✅ 所有组件放置时中心对准鼠标位置
- ✅ 组件拖拽移动时中心跟随鼠标
- ✅ 不同尺寸组件都能正确计算中心位置
- ✅ 用户体验更加直观和自然

## 兼容性说明
- 保持向后兼容，不影响现有功能
- 对没有设置尺寸的组件自动使用默认尺寸
- 已设置尺寸的组件使用实际尺寸进行计算

## 性能影响
- 新增的尺寸计算逻辑对性能影响极小
- 使用辅助函数避免代码重复
- 计算过程简单高效
