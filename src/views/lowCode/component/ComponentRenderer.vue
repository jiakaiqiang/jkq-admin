<template>
  <div 
    class="component-wrapper"
    :class="{ 
      'selected': selected && !previewMode,
      'preview-mode': previewMode,
      'dragging': isDragging
    }"
    :style="wrapperStyle"
    @click.stop="handleClick"
    @contextmenu="handleContextMenu"
    draggable="true"
    @dragstart="handleDragStart"
    @drag="handleDrag"
    @dragend="handleDragEnd"
  >
    <!-- 组件渲染 -->
    <div class="component-content" :style="componentStyle">
      <component 
        :is="componentType" 
        v-bind="componentProps"
        @click="handleComponentClick"
      />
    </div>

    <!-- 选中状态的操作栏 -->
    <div v-if="selected && !previewMode" class="component-actions">
      <div @click="handleCopy" title="复制">
        <el-icon><DocumentCopy /></el-icon>
      </div>

      <div @click="handleDelete" title="删除">
       <el-icon><CloseBold /></el-icon>
      </div>
     
    </div>

    <!-- 组件边框 -->
    <div v-if="selected && !previewMode" class="component-border"></div>

    <!-- 右键菜单 -->
    <el-dropdown
      ref="contextMenu"
      trigger="contextmenu"
      placement="bottom-start"
      @command="handleMenuCommand"
      v-if="!previewMode"
    >
      <div class="context-menu-trigger"></div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="copy">
          <i class="el-icon-copy-document"></i>
          复制
        </el-dropdown-item>
        <el-dropdown-item command="delete" divided>
          <i class="el-icon-delete"></i>
          删除
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { CloseBold, DocumentCopy } from '@element-plus/icons-vue'

// 导入组件
import TextComponent from './TextComponent.vue'
import ButtonComponent from './ButtonComponent.vue'
import ImageComponent from './ImageComponent.vue'
import InputComponent from './InputComponent.vue'
import SelectComponent from './SelectComponent.vue'
import ContainerComponent from './ContainerComponent.vue'
import DividerComponent from './DividerComponent.vue'

interface Component {
  id: string
  type: string
  props: Record<string, any>
  children?: Component[]
  parent?: string
  position?: {
    x: number
    y: number
  }
}

const props = defineProps<{
  component: Component
  selected: boolean
  previewMode?: boolean
}>()

const emit = defineEmits<{
  select: [id: string]
  delete: [id: string]
  update: [id: string, updates: Partial<Component>]
  drag: [id: string, event: DragEvent]
  dragEnd: [id: string]
}>()

const contextMenu = ref()
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })

// 组件类型映射
const componentMap: Record<string, any> = {
  Text: TextComponent,
  Button: ButtonComponent,
  Image: ImageComponent,
  Input: InputComponent,
  Select: SelectComponent,
  Container: ContainerComponent,
  Divider: DividerComponent
}

// 当前组件类型
const componentType = computed(() => {
  console.log(props.component.type,'props.component.type')
  return componentMap[props.component.type] || TextComponent
})

// 包装器样式
const wrapperStyle = computed(() => {
  const { position } = props.component
  if (!position) return {}
  
  return {
    position: 'absolute' as const,
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: props.selected ? 1000 : 1
  }
})

// 组件样式
const componentStyle = computed(() => {
  const { props: componentProps } = props.component
  
  return {
    // 基础样式
    width: componentProps.width ? `${componentProps.width}px` : 'auto',
    height: componentProps.height ? `${componentProps.height}px` : 'auto',
    backgroundColor: componentProps.backgroundColor || 'transparent',
    border: componentProps.border || 'none',
    borderRadius: componentProps.borderRadius ? `${componentProps.borderRadius}px` : '0',
    padding: componentProps.padding || '0',
    margin: componentProps.margin || '0',
    display: componentProps.display || 'block',
    
    // 文本样式
    fontSize: componentProps.fontSize ? `${componentProps.fontSize}px` : 'inherit',
    color: componentProps.color || 'inherit',
    fontWeight: componentProps.fontWeight || 'normal',
    textAlign: componentProps.textAlign || 'left',
    lineHeight: componentProps.lineHeight || 'normal',
    
    // 布局样式
    objectFit: componentProps.objectFit || 'cover'
  }
})

// 组件属性（排除样式属性）
const componentProps = computed(() => {
  const { props: componentProps } = props.component
  const styleProps = [
    'width', 'height', 'backgroundColor', 'border', 'borderRadius', 
    'padding', 'margin', 'display', 'fontSize', 'color', 'fontWeight', 
    'textAlign', 'lineHeight', 'objectFit'
  ]
  
  const filteredProps: Record<string, any> = {}
  Object.keys(componentProps).forEach(key => {
    if (!styleProps.includes(key)) {
      filteredProps[key] = componentProps[key]
    }
  })
  
  return filteredProps
})

// 处理点击
const handleClick = () => {
  emit('select', props.component.id)
}

// 处理组件内部点击
const handleComponentClick = (event: Event) => {
  if (props.previewMode) {
    // 预览模式下可以处理组件事件
    event.stopPropagation()
  } else {
    //出发选中
    emit('select', props.component.id)
    // 编辑模式下阻止默认行为，只选择组件
    event.preventDefault()
    event.stopPropagation()

  }
}

// 处理右键菜单
const handleContextMenu = (event: MouseEvent) => {
  if (!props.previewMode) {
    event.preventDefault()
    contextMenu.value?.handleOpen()
  }
}

// 处理菜单命令
const handleMenuCommand = (command: string) => {
  switch (command) {
    case 'copy':
      handleCopy()
      break
    case 'delete':
      handleDelete()
      break
  }
}

// 复制组件
const handleCopy = () => {
  // 这里可以实现复制功能
  ElMessage.success('复制功能待实现')
}

// 删除组件
const handleDelete = () => {
  emit('delete', props.component.id)
}

// 处理拖拽开始
const handleDragStart = (event: DragEvent) => {
  if (props.previewMode) {
    event.preventDefault()
    return
  }
  
  isDragging.value = true
  
  // 计算拖拽偏移量
  const rect = (event.target as HTMLElement).getBoundingClientRect()
  
  dragOffset.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
  
  // 设置拖拽效果
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', props.component.id)
    event.dataTransfer.setData('application/component-move', 'true') // 标识这是组件移动
  }
}

// 处理拖拽中
const handleDrag = (event: DragEvent) => {
  if (props.previewMode) return
  
  event.preventDefault()
  emit('drag', props.component.id, event)
}

// 处理拖拽结束
const handleDragEnd = () => {
  if (props.previewMode) return
  
  isDragging.value = false
  emit('dragEnd', props.component.id)
}
</script>

<style scoped lang="scss">
.component-wrapper {
  position: relative;
  display: block;
  min-width: 20px;
  min-height: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0;
  padding: 0;
  line-height: 0;

  &:hover:not(.preview-mode) {
    .component-content {
      outline: 1px dashed #409eff;
      outline-offset: 2px;
    }
  }

  &.selected:not(.preview-mode) {
    .component-content {
      outline: none;
    }
  }

  &.preview-mode {
    cursor: default;
  }

  &.dragging {
    opacity: 0.5;
    transform: rotate(2deg);
    cursor: move;
  }
}

.component-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
}

.component-actions {
  position: absolute;
  top: -24px;
  right: 0;
  z-index: 10;
  background: #fff;
  padding: 4px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: flex-end;
  transition: all 0.2s ease;
  >div{
    margin-left:4px;
    padding: 2px;
    border-radius: 2px;
    transition: all 0.2s ease;
  }
  >div:hover {
    background: #f0f2f5;
  }
  >div:nth-of-type(1){
    color:#409eff
  }
 >div:nth-of-type(2){
    color:red
  }
  :deep(.el-button) {
    background: transparent;
    border: none;
    color: #fff;
    padding: 4px 8px;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
}

.component-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid #409eff;
  border-radius: 4px;
  pointer-events: none;
  z-index: 1;
}

.context-menu-trigger {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  pointer-events: none;
}

// 预览模式样式
.preview-mode {
  .component-content {
    outline: none !important;
  }
}
</style>
