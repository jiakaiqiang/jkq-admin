<template>
  <div 
    class="content-draw"
    :class="{ 'preview-mode': previewMode }"
    @click="handleCanvasClick"
  >
    <!-- 画布头部 -->
    <div class="canvas-header" v-if="!previewMode">
      <div class="canvas-info">
        <span class="canvas-title">设计画布</span>
        <span class="canvas-size">{{ canvasSize.width }} × {{ canvasSize.height }}</span>
      </div>
      <div class="canvas-actions">
        <el-button size="small" @click="adjustCanvasSize('mobile')">手机</el-button>
      
        <el-button size="small" @click="adjustCanvasSize('desktop')">桌面</el-button>
        <el-button size="small" @click="adjustCanvasSize('full')">全屏</el-button>
      </div>
    </div>

    <!-- 画布内容区 -->
    <div class="canvas-container" :style="canvasStyle">
      <div class="canvas-content">
        <!-- 空状态 -->
        <div v-if="components.length === 0" class="empty-canvas">
          <div class="empty-icon">
            <i class="el-icon-plus"></i>
          </div>
          <p class="empty-text">拖拽左侧组件到此处开始设计</p>
          <p class="empty-hint">支持文本、按钮、图片、表单等组件</p>
        </div>

        <!-- 组件渲染区 -->
        <div v-else class="components-area">
          <ComponentRenderer
            v-for="component in components"
            :key="component.id"
            :component="component"
            :all-components="components"
            :selected="component.id === selectedId"
            :preview-mode="previewMode"
            @select="handleSelect"
            @delete="handleDelete"
            @update="handleUpdate"
            @drag="handleDrag"
            @drag-end="handleDragEnd"
          />
        </div>
      </div>
    </div>

    <!-- 画布网格线 -->
    <div class="canvas-grid" v-if="!previewMode"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, defineProps } from 'vue'
import ComponentRenderer from '../component/ComponentRenderer.vue'

interface Component {
  id: string
  type: string
  props: Record<string, any>,
  style: Record<string, any>
  children?: Component[]
  parent?: string
  position?: {
    x: number
    y: number
  }
}

defineProps<{
  components: Component[]
  selectedId: string
  previewMode?: boolean
}>()

const emit = defineEmits<{
  select: [id: string]
  update: [id: string, updates: Partial<Component>]
  delete: [id: string]
  drag: [id: string, event: MouseEvent, offset: {x: number, y: number}]
  dragEnd: [id: string]
}>()

// 画布尺寸
const canvasSize = ref<{
  width: number | string
  height: number | string
}>({
  width: 1200,
  height: 580
})

// 预设尺寸
const presetSizes = {
  mobile: { width: 375, height: 667 },

  desktop: { width: 1200, height:580 },
  full: { width: 1200, height: 580 }
}

// 画布样式
const canvasStyle = computed(() => {
  const { width, height } = canvasSize.value
  return {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    maxWidth: '100%',
    margin: '20px auto'
  }
})

// 调整画布尺寸
const adjustCanvasSize = (size: keyof typeof presetSizes) => {
  if (size === 'full') {
    canvasSize.value = { width: '100%', height: '100%' }
  } else {
    canvasSize.value = { ...presetSizes[size] }
  }
}

// 处理组件拖拽
const handleDrag = (id: string, event: MouseEvent, offset: {x: number, y: number}) => {
  emit('drag', id, event, offset)
}

// 处理画布点击
const handleCanvasClick = (event: MouseEvent) => {
  // 点击空白区域取消选择
  if (event.target === event.currentTarget) {
    emit('select', '')
  }
}

// 选择组件
const handleSelect = (id: string) => {
  emit('select', id)
}

// 删除组件
const handleDelete = (id: string) => {
  emit('delete', id)
}

// 更新组件
const handleUpdate = (id: string, updates: Partial<Component>) => {
  emit('update', id, updates)
}

// 处理组件拖拽结束
const handleDragEnd = (id: string) => {
  emit('dragEnd', id)
}
</script>

<style scoped lang="scss">
.content-draw {
  height: 100%;
  background: #f5f7fa;
  position: relative;
  overflow: auto;

  &.preview-mode {
    background: #fff;
    
    .canvas-header,
    .canvas-grid {
      display: none;
    }
    
    .canvas-container {
      margin: 0;
      box-shadow: none;
      border: none;
    }
  }
}

.canvas-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .canvas-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .canvas-title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
    }

    .canvas-size {
      font-size: 12px;
      color: #909399;
      background: #f0f2f5;
      padding: 2px 8px;
      border-radius: 4px;
    }
  }

  .canvas-actions {
    display: flex;
    gap: 8px;
  }
}

.canvas-container {
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  min-height: 600px;
}

.canvas-content {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: default;
}

.empty-canvas {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
  color: #c0c4cc;

  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  .empty-text {
    font-size: 16px;
    margin: 0 0 8px 0;
    color: #909399;
  }

  .empty-hint {
    font-size: 12px;
    margin: 0;
    color: #c0c4cc;
  }
}

.components-area {
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 400px;
  user-select: none;
}

.canvas-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background-image: 
    linear-gradient(to right, #e4e7ed 1px, transparent 1px),
    linear-gradient(to bottom, #e4e7ed 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.3;
  z-index: 1;
}

// 预览模式样式
.preview-mode {
  .canvas-container {
    background: #fff;
    border: none;
    box-shadow: none;
  }
}
</style>
