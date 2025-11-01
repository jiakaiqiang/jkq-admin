<template>
  <div class="left-schema">
    <div class="schema-header">
      <h3>组件库</h3>
    </div>
    <div class="schema-content">
      <div v-for="group in schemaTree.children">
         <div style="font-size: 16px; font-weight: bold;background-color: #f5f5f5;padding: 5px;">
          {{ group.name }}
         </div>
         <div style="display: flex;flex-wrap: wrap;">
            <div v-for="item in group.children" :key="item.id" 
              class="component-item"
              draggable="true"
              @dragstart="handleDragStart($event, item)"
              @dragend="handleDragEnd">
           <div class="component-icon">
                <i :class="item.icon"></i>
              </div>
              <div class="component-name">{{ item.name }}</div>
         </div>
         </div>
      </div>
      <!-- <el-collapse v-model="activeGroups" accordion>
        <el-collapse-item 
          v-for="group in schema.groups" 
          :key="group.id"
          :title="group.name"
          :name="group.id"
        >
          <div class="component-grid">
            <div
              v-for="component in group.components"
              :key="component.id"
              class="component-item"
              draggable="true"
              @dragstart="handleDragStart($event, component)"
              @dragend="handleDragEnd"
            >
              <div class="component-icon">
                <i :class="component.icon"></i>
              </div>
              <div class="component-name">{{ component.name }}</div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import {schemaTree,componentTypeMap} from '../core/basicSchmaTree.ts'


interface Component {
  id: string
 
  type: string
  icon: string
 
  defaultProps: Record<string, any>
  schema: Record<string, any>
}
interface itemType {
  icon:string,
      id: string,
      name: string,
      type: string
}
interface Group {
  id: string
  name: string
  icon: string
  components: Component[]
}

interface Schema {
  version: string
  groups: Group[]
}

defineProps<{
  schema: Schema
}>()

const emit = defineEmits<{
  dragStart: [component: Component, event: DragEvent]
  dragEnd: []
}>()
2
const activeGroups = ref<string[]>([])
// 吸附对齐辅助函数
const applySnap = (x: number, y: number, componentId: string, componentWidth: number, componentHeight: number) => {
  const SNAP_THRESHOLD = 10 // 吸附阈值（像素）
  let snappedX = x
  let snappedY = y
  
  // 获取画布尺寸
  const canvasContent = document.querySelector('.canvas-content') as HTMLElement
  const canvasRect = canvasContent.getBoundingClientRect()
  const canvasWidth = canvasRect.width
  const canvasHeight = canvasRect.height
  
  // 检查画布边界吸附
  if (Math.abs(x) < SNAP_THRESHOLD) {
    snappedX = 0 // 左边界
  } else if (Math.abs((x + componentWidth) - canvasWidth) < SNAP_THRESHOLD) {
    snappedX = canvasWidth - componentWidth // 右边界
  }
  
  if (Math.abs(y) < SNAP_THRESHOLD) {
    snappedY = 0 // 上边界
  } else if (Math.abs((y + componentHeight) - canvasHeight) < SNAP_THRESHOLD) {
    snappedY = canvasHeight - componentHeight // 下边界
  }
  
  // 检查其他组件的吸附
  for (const otherComponent of components.value) {
    if (otherComponent.id === componentId || !otherComponent.position) continue
    
    const { width: otherWidth, height: otherHeight } = getComponentSize(otherComponent.type, otherComponent.props)
    const otherX = otherComponent.position.x
    const otherY = otherComponent.position.y
    
    // 水平吸附（左对齐、右对齐、中心线对齐）
    if (Math.abs(x - otherX) < SNAP_THRESHOLD) {
      snappedX = otherX // 左对齐
    } else if (Math.abs((x + componentWidth) - (otherX + otherWidth)) < SNAP_THRESHOLD) {
      snappedX = otherX + otherWidth - componentWidth // 右对齐
    } else if (Math.abs((x + componentWidth / 2) - (otherX + otherWidth / 2)) < SNAP_THRESHOLD) {
      snappedX = otherX + otherWidth / 2 - componentWidth / 2 // 中心线对齐
    }
    
    // 垂直吸附（上对齐、下对齐、中心线对齐）
    if (Math.abs(y - otherY) < SNAP_THRESHOLD) {
      snappedY = otherY // 上对齐
    } else if (Math.abs((y + componentHeight) - (otherY + otherHeight)) < SNAP_THRESHOLD) {
      snappedY = otherY + otherHeight - componentHeight // 下对齐
    } else if (Math.abs((y + componentHeight / 2) - (otherY + otherHeight / 2)) < SNAP_THRESHOLD) {
      snappedY = otherY + otherHeight / 2 - componentHeight / 2 // 中心线对齐
    }
  }
  
  return { x: snappedX, y: snappedY }
}
const handleDragStart = (event: DragEvent, component: itemType) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'copy'
    event.dataTransfer.setData('application/json', JSON.stringify(component))
  }
  emit('dragStart', {...component,...componentTypeMap[component.id as keyof typeof componentTypeMap]}, event)
}

const handleDragEnd = () => {
  emit('dragEnd')
}
</script>

<style scoped lang="scss">
.left-schema {
  width: 280px;
  height: 100%;
  background: #fff;
  border-right: 1px solid #e4e7ed;
  display: flex;
  flex-direction: column;

  .schema-header {
    padding: 16px;
    border-bottom: 1px solid #e4e7ed;
    background: #f5f7fa;

    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #303133;
    }
  }

  .schema-content {
    flex: 1;
    overflow-y: auto;
    padding: 16px;

    :deep(.el-collapse) {
      border: none;

      .el-collapse-item__header {
        background: #fafafa;
        border: 1px solid #e4e7ed;
        border-radius: 4px;
        margin-bottom: 8px;
        padding: 0 16px;
        height: 40px;
        line-height: 40px;
        font-weight: 500;
        color: #606266;

        &:hover {
          background: #f0f2f5;
        }
      }

      .el-collapse-item__wrap {
        border: none;
        background: transparent;
      }

      .el-collapse-item__content {
        padding: 0;
      }
    }
  }

  .component-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 8px 0;
  }

  .component-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 8px;
    border: 1px solid #e4e7ed;
    border-radius: 6px;
    background: #fff;
    cursor: grab;
    transition: all 0.2s ease;
    user-select: none;
    margin-right:10px;
    margin-top: 10px;
    margin-bottom:10px;

    &:hover {
      border-color: #409eff;
      background: #f0f9ff;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
    }

    &:active {
      cursor: grabbing;
      transform: scale(0.95);
    }

    .component-icon {
      font-size: 24px;
      color: #409eff;
      margin-bottom: 6px;
    }

    .component-name {
      font-size: 12px;
      color: #606266;
      text-align: center;
      line-height: 1.2;
    }
  }
}
</style>
