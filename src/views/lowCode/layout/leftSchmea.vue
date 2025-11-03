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
              @mousedown="handleMouseDown($event, item)">
           <div class="component-icon">
                <i :class="item.icon"></i>
              </div>
              <div class="component-name">{{ item.name }}</div>
            </div>
         </div>
         </div>
      </div>
      
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import {schemaTree,componentTypeMap} from '../core/basicSchmaTree.ts'


interface itemType {
  icon:string,
      id: string,
      name: string,
      type: string
}

const emit = defineEmits<{
  addComponent: [component: Component, position: { x: number; y: number }]
}>()
2
const activeGroups = ref<string[]>([])
// 辅助线逻辑已删除
const handleMouseDown = (event: MouseEvent, component: itemType) => {
  event.preventDefault()
  
  // 存储选中的组件信息
  const selectedComponent = { ...component, ...componentTypeMap[component.id as keyof typeof componentTypeMap] }
  
  // 创建一个临时的组件预览元素
  const canvasContent = document.querySelector('.canvas-content') as HTMLElement
  if (!canvasContent) return
  
  const preview = document.createElement('div')
  preview.className = 'component-preview'
  preview.style.position = 'absolute'
  preview.style.zIndex = '1000'
  preview.style.pointerEvents = 'none'
  preview.style.opacity = '0.7'
  preview.style.width = '100px'
  preview.style.height = '60px'
  preview.style.backgroundColor = '#f0f9ff'
  preview.style.border = '2px dashed #409eff'
  preview.style.display = 'flex'
  preview.style.alignItems = 'center'
  preview.style.justifyContent = 'center'
  preview.style.color = '#409eff'
  preview.style.fontSize = '12px'
  preview.textContent = component.name
  
  canvasContent.appendChild(preview)
  
  // 处理鼠标移动
  const handleMouseMove = (moveEvent: MouseEvent) => {
    const rect = canvasContent.getBoundingClientRect()
    const x = moveEvent.clientX - rect.left - 50 // 居中
    const y = moveEvent.clientY - rect.top - 30 // 居中
    
    preview.style.left = `${Math.max(0, x)}px`
    preview.style.top = `${Math.max(0, y)}px`
  }
  
  // 处理鼠标释放
  const handleMouseUp = (upEvent: MouseEvent) => {
    const rect = canvasContent.getBoundingClientRect()
    const x = upEvent.clientX - rect.left - 50 // 居中
    const y = upEvent.clientY - rect.top - 30 // 居中
    
    // 发送组件添加事件
    emit('addComponent', selectedComponent, { x: Math.max(0, x), y: Math.max(0, y) })
    
    // 清理
    canvasContent.removeChild(preview)
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  // 添加全局事件监听
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
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
