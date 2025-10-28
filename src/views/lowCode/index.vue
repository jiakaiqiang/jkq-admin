<template>
  <div class="low-code-platform">
    <!-- 顶部工具栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <el-button-group>
          <el-button 
            :disabled="historyIndex <= 0" 
            @click="undo"
            icon="el-icon-back"
            size="small"
          >
            撤销
          </el-button>
          <el-button 
            :disabled="historyIndex >= history.length - 1" 
            @click="redo"
            icon="el-icon-right"
            size="small"
          >
            恢复
          </el-button>
        </el-button-group>
        
        <el-divider direction="vertical" />
        
        <el-button-group>
          <el-button @click="save" icon="el-icon-document" size="small">
            保存
          </el-button>
          <el-button @click="preview" icon="el-icon-view" size="small">
            预览
          </el-button>
          <el-button @click="clear" icon="el-icon-delete" size="small">
            清空
          </el-button>
        </el-button-group>
      </div>
      
      <div class="toolbar-right">
        <el-button @click="showHistory" icon="el-icon-time" size="small">
          历史记录 ({{ history.length }})
        </el-button>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 左侧物料区 -->
      <div class="left-panel">
       <leftTool @change-active="changeActive"></leftTool>
        <LeftSchema 
        v-if="activeChange === 'component'"
          :schema="schema" 
          @drag-start="handleDragStart"
          @drag-end="handleDragEnd"
        />
      </div>

      <!-- 中间渲染区 -->
      <div class="center-panel">
        <ContentDraw 
          :components="components"
          :selected-id="selectedId"
          @select="handleSelect"
          @update="handleUpdate"
          @delete="handleDelete"
          @drop="handleDrop"
          @component-drop="handleComponentDrop"
          @drag="handleComponentDrag"
          @drag-end="handleComponentDragEnd"
        />
        <!-- 吸附线 -->
        <div 
          v-for="(line, index) in snapLines" 
          :key="index"
          class="snap-line"
          :class="line.type"
          :style="{
            [line.type === 'horizontal' ? 'top' : 'left']: `${line.position}px`,
            color: line.color
          }"
        ></div>
      </div>

      <!-- 右侧属性区 -->
      <div class="right-panel">
        <RightAttribute 
          :component="selectedComponent"
          @update="handlePropertyUpdate"
        />
      </div>
    </div>

    <!-- 历史记录弹窗 -->
    <el-dialog
      title="操作历史"
      :visible.sync="historyDialogVisible"
      width="600px"
    >
      <el-timeline>
        <el-timeline-item
          v-for="(record, index) in history"
          :key="index"
          :type="index === historyIndex ? 'primary' : 'info'"
          :timestamp="record.timestamp"
        >
          <div class="history-item">
            <strong>{{ record.action }}</strong>
            <p class="history-desc">{{ record.description }}</p>
          </div>
        </el-timeline-item>
      </el-timeline>
      
      <div slot="footer">
        <el-button @click="historyDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>

    <!-- 预览弹窗 -->
    <el-dialog
      title="预览"
      :model-value="previewVisible"
      width="80%"
      :before-close="handlePreviewClose"
    >
      <div class="preview-container">
        <ContentDraw 
          :components="components"
          :selected-id="''"
          :preview-mode="true"
        />
      </div>
    </el-dialog>
</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import LeftSchema from './layout/leftSchmea.vue'
import ContentDraw from './layout/contentDraw.vue'
import RightAttribute from './layout/rightAttribute.vue'
import schema from './core/schma.json'
import leftTool from './layout/leftTool.vue'
// 组件接口定义
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

interface HistoryRecord {
  action: string
  description: string
  timestamp: string
  data: Component[]
}

// 响应式数据
const components = ref<Component[]>([])
const selectedId = ref<string>('')
const history = ref<HistoryRecord[]>([])
const historyIndex = ref(-1)
const historyDialogVisible = ref(false)
const previewVisible = ref(false)
const dragComponent = ref<any>(null)
const draggingComponentId = ref<string>('')// 吸附线数据
const snapLines = ref<Array<{ type: 'horizontal' | 'vertical'; position: number; color: string }>>([]) 
const selectedComponent = computed(() => {
  return findComponentById(components.value, selectedId.value)
})
let activeChange =  ref('component')
let  changeActive =  (val:string)=>{
   activeChange.value = val
}
// 查找组件
const findComponentById = (components: Component[], id: string): Component | null => {
  for (const component of components) {
    if (component.id === id) {
      return component
    }
    if (component.children) {
      const found = findComponentById(component.children, id)
      if (found) return found
    }
  }
  return null
}

// 生成唯一ID
const generateId = (): string => {
  return 'comp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

// 获取组件尺寸的辅助函数
const getComponentSize = (componentType: string, props: Record<string, any>) => {
  let width = props.width
  let height = props.height
  
  if (!width || !height) {
    switch (componentType) {
      case 'Text':
        width = 200
        height = 30
        break
      case 'Button':
        width = 120
        height = 40
        break
      case 'Image':
        width = 200
        height = 150
        break
      case 'Input':
        width = 200
        height = 40
        break
      case 'Select':
        width = 200
        height = 40
        break
      case 'Container':
        width = 300
        height = 200
        break
      case 'Divider':
        width = 200
        height = 1
        break
      default:
        width = 100
        height = 40
    }
  }
  
  return { width, height }
}

// 添加到历史记录
const addToHistory = (action: string, description: string) => {
  // 如果当前不在历史记录的末尾，删除后面的记录
  if (historyIndex.value < history.value.length - 1) {
    history.value = history.value.slice(0, historyIndex.value + 1)
  }
  
  const record: HistoryRecord = {
    action,
    description,
    timestamp: new Date().toLocaleString(),
    data: JSON.parse(JSON.stringify(components.value))
  }
  
  history.value.push(record)
  historyIndex.value = history.value.length - 1
  
  // 限制历史记录数量
  if (history.value.length > 50) {
    history.value.shift()
    historyIndex.value--
  }
}

// 拖拽开始
const handleDragStart = (component: any) => {
  dragComponent.value = component
}

// 拖拽结束
const handleDragEnd = () => {
  dragComponent.value = null
}

// 处理拖拽放置
const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  
  // 检查是否是组件拖拽移动
  const isComponentMove = event.dataTransfer?.getData('application/component-move') === 'true'
  if (isComponentMove) {
    // 这是组件移动，不需要在这里处理
    return
  }
  
  // 检查是否有新组件要放置
  if (!dragComponent.value) return
  
  // 获取画布容器位置
  const canvasContainer = event.currentTarget as HTMLElement
  const canvasContent = canvasContainer.querySelector('.canvas-content') as HTMLElement
  const rect = canvasContent.getBoundingClientRect()
  console.log(rect,event.clientX,event.clientY,'canvasContent')
  // 计算相对于画布的鼠标位置
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top
  
  // 获取组件默认尺寸
  const defaultProps = dragComponent.value.defaultProps
  const { width: componentWidth, height: componentHeight } = getComponentSize(dragComponent.value.type, defaultProps)
  
  // 计算组件左上角位置（让组件中心对准鼠标位置）
  const x = mouseX - componentWidth / 2
  const y = mouseY - componentHeight / 2
  
  const newComponent: Component = {
    id: generateId(),
    type: dragComponent.value.type,
    props: JSON.parse(JSON.stringify(defaultProps)),
    children: [],
    position: { x, y }
  }
console.log(newComponent, 'newComponent')
  components.value.push(newComponent)
  selectedId.value = newComponent.id
  
  addToHistory('添加组件', `添加了 ${dragComponent.value.name} 组件`)
  
  dragComponent.value = null
}

// 选择组件
const handleSelect = (id: string) => {
  selectedId.value = id
}

// 更新组件
const handleUpdate = (id: string, updates: Partial<Component>) => {
  const component = findComponentById(components.value, id)
  if (component) {
    Object.assign(component, updates)
    addToHistory('更新组件', `更新了 ${component.type} 组件`)
  }
}

// 删除组件
const handleDelete = (id: string) => {
  const component = findComponentById(components.value, id)
  if (component) {
    removeComponent(components.value, id)
    if (selectedId.value === id) {
      selectedId.value = ''
    }
    addToHistory('删除组件', `删除了 ${component.type} 组件`)
  }
}

// 删除组件递归函数
const removeComponent = (components: Component[], id: string): boolean => {
  for (let i = 0; i < components.length; i++) {
    if (components[i].id === id) {
      components.splice(i, 1)
      return true
    }
    if (components[i].children && removeComponent(components[i].children!, id)) {
      return true
    }
  }
  return false
}

// 更新属性
const handlePropertyUpdate = (props: Record<string, any>) => {
  const component = selectedComponent.value
  if (component) {
    Object.assign(component.props, props)
    addToHistory('修改属性', `修改了 ${component.type} 组件的属性`)
  }
}

// 撤销操作
const undo = () => {
  if (historyIndex.value > 0) {
    historyIndex.value--
    components.value = JSON.parse(JSON.stringify(history.value[historyIndex.value].data))
    selectedId.value = ''
    ElMessage.success('已撤销')
  }
}

// 恢复操作
const redo = () => {
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value++
    components.value = JSON.parse(JSON.stringify(history.value[historyIndex.value].data))
    selectedId.value = ''
    ElMessage.success('已恢复')
  }
}

// 保存操作
const save = () => {
  const data = {
    components: components.value,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  }
  
  console.log(data, 'data')
  localStorage.setItem('lowcode_data', JSON.stringify(data))
  ElMessage.success('保存成功')
}

// 预览操作
const preview = () => {
  previewVisible.value = true
}

// 清空操作
const clear = () => {
  ElMessageBox.confirm('确定要清空所有组件吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    components.value = []
    selectedId.value = ''
    addToHistory('清空画布', '清空了所有组件')
    ElMessage.success('已清空')
  }).catch(() => {
    ElMessage.info('已取消清空')
  })
}

// 显示历史记录
const showHistory = () => {
  historyDialogVisible.value = true
}

// 关闭预览
const handlePreviewClose = () => {
  previewVisible.value = false
}
// 吸附对齐辅助函数
const applySnap = (x: number, y: number, componentId: string, componentWidth: number, componentHeight: number) => {
  const SNAP_THRESHOLD = 8 // 吸附阈值（像素）
  let snappedX = x
  let snappedY = y
  const newSnapLines: Array<{ type: 'horizontal' | 'vertical'; position: number; color: string }> = []

  // 获取画布尺寸
  const canvasContent = document.querySelector('.canvas-content') as HTMLElement
  const canvasRect = canvasContent.getBoundingClientRect()
  const canvasWidth = canvasRect.width
  const canvasHeight = canvasRect.height

  // 检查画布边界吸附
  if (Math.abs(x) < SNAP_THRESHOLD) {
    snappedX = 0 // 左边界
    newSnapLines.push({ type: 'vertical', position: 0, color: '#409eff' })
  } else if (Math.abs((x + componentWidth) - canvasWidth) < SNAP_THRESHOLD) {
    snappedX = canvasWidth - componentWidth // 右边界
    newSnapLines.push({ type: 'vertical', position: canvasWidth, color: '#409eff' })
  }

  if (Math.abs(y) < SNAP_THRESHOLD) {
    snappedY = 0 // 上边界
    newSnapLines.push({ type: 'horizontal', position: 0, color: '#409eff' })
  } else if (Math.abs((y + componentHeight) - canvasHeight) < SNAP_THRESHOLD) {
    snappedY = canvasHeight - componentHeight // 下边界
    newSnapLines.push({ type: 'horizontal', position: canvasHeight, color: '#409eff' })
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
      newSnapLines.push({ type: 'vertical', position: otherX, color: '#67c23a' })
    } else if (Math.abs((x + componentWidth) - (otherX + otherWidth)) < SNAP_THRESHOLD) {
      snappedX = otherX + otherWidth - componentWidth // 右对齐
      newSnapLines.push({ type: 'vertical', position: otherX + otherWidth, color: '#67c23a' })
    } else if (Math.abs((x + componentWidth / 2) - (otherX + otherWidth / 2)) < SNAP_THRESHOLD) {
      snappedX = otherX + otherWidth / 2 - componentWidth / 2 // 中心线对齐
      newSnapLines.push({ type: 'vertical', position: otherX + otherWidth / 2, color: '#e6a23c' })
    }
    
    // 垂直吸附（上对齐、下对齐、中心线对齐）
    if (Math.abs(y - otherY) < SNAP_THRESHOLD) {
      snappedY = otherY // 上对齐
      newSnapLines.push({ type: 'horizontal', position: otherY, color: '#67c23a' })
    } else if (Math.abs((y + componentHeight) - (otherY + otherHeight)) < SNAP_THRESHOLD) {
      snappedY = otherY + otherHeight - componentHeight // 下对齐
      newSnapLines.push({ type: 'horizontal', position: otherY + otherHeight, color: '#67c23a' })
    } else if (Math.abs((y + componentHeight / 2) - (otherY + otherHeight / 2)) < SNAP_THRESHOLD) {
      snappedY = otherY + otherHeight / 2 - componentHeight / 2 // 中心线对齐
      newSnapLines.push({ type: 'horizontal', position: otherY + otherHeight / 2, color: '#e6a23c' })
    }
  }
  
  // 结束函数时设置吸附线
  snapLines.value = newSnapLines
  
  // 返回吸附后的位置
  return { x: snappedX, y: snappedY }
}
// 处理组件拖拽移动
const handleComponentDrag = (id: string, event: DragEvent) => {
  event.preventDefault()
  
  draggingComponentId.value = id
  
  // 获取画布容器位置
  const canvasContent = document.querySelector('.canvas-content') as HTMLElement
  if (!canvasContent) return
  
  const rect = canvasContent.getBoundingClientRect()
  
  // 计算鼠标位置
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top
  
  // 实时更新组件位置
  const component = findComponentById(components.value, id)
  if (component) {
    // 获取组件尺寸
    const { width: componentWidth, height: componentHeight } = getComponentSize(component.type, component.props)
    
    // 计算组件左上角位置
    let x = mouseX - componentWidth / 2
    let y = mouseY - componentHeight / 2
    
    // 应用吸附对齐
    const snappedPosition = applySnap(x, y, id, componentWidth, componentHeight)
    
    // 确保位置不为负
    component.position = {
      x: Math.max(0, snappedPosition.x),
      y: Math.max(0, snappedPosition.y)
    }
  }
}

// 处理组件拖拽结束
const handleComponentDragEnd = (id: string) => {
  draggingComponentId.value = ''
  snapLines.value = [] // 清除吸附线
  
  const component = findComponentById(components.value, id)
  if (component) {
    addToHistory('移动组件', `移动了 ${component.type} 组件`)
  }
}

// 处理组件拖拽放置
const handleComponentDrop = (componentId: string, event: DragEvent) => {
  // 获取画布容器位置
  const canvasContent = event.currentTarget as HTMLElement
  const rect = canvasContent.getBoundingClientRect()
  console.log(rect,event.clientX,event.clientY,event,'canvasContentjkq')
  
  // 计算鼠标位置
  const mouseX = event.clientX - 570
  const mouseY = event.clientY - 280
  
  // 更新组件位置
  const component = findComponentById(components.value, componentId)
  if (component) {
    // 获取组件尺寸
    const { width: componentWidth, height: componentHeight } = getComponentSize(component.type, component.props)
    console.log(componentWidth,componentHeight,'componentWidthcomponentHeight',component)
    
    // 计算组件左上角位置（让组件中心对准鼠标位置）
    const x = mouseX 
    const y = mouseY 
   console.log(x,y,'x,y')
    
    
    // // 添加到历史记录
    // addToHistory('移动组件', `移动了 ${component.type} 组件`)
  }
}

// 监听组件变化，自动保存到本地存储
watch(components, () => {
  // 可以在这里添加自动保存逻辑
}, { deep: true })

// 组件挂载时加载数据
onMounted(() => {
  const savedData = localStorage.getItem('lowcode_data')
  if (savedData) {
    try {
      const data = JSON.parse(savedData)
      if (data.components) {
        components.value = data.components
        addToHistory('加载数据', '加载了保存的数据')
      }
    } catch (error) {
      console.error('加载数据失败:', error)
    }
  } else {
    addToHistory('初始化', '初始化画布')
  }
})
</script>

<style scoped lang="scss">
.low-code-platform {
  height: calc(100vh - 260px);
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
}

.toolbar {
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  .toolbar-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .toolbar-right {
    display: flex;
    align-items: center;
  }
}

.main-content {
  flex: 1;
  display: flex;
  height: calc(100vh - 240px);
}

.left-panel {
  width: 340px;
  background: #fff;
  border-right: 1px solid #e4e7ed;
  overflow: hidden;
  display: flex;
}

.center-panel {
  flex: 1;
  background: #f5f7fa;
  overflow: hidden;
  position: relative;
}

/* 吸附线样式 */
.snap-line {
  position: absolute;
  pointer-events: none;
  z-index: 10000;
  opacity: 0.8;
  transform: translateZ(0);
  background: none;
  
  &.horizontal {
    left: 0;
    right: 0;
    height: 1px;
    border-top: 1px dashed currentColor;
  }
  
  &.vertical {
    top: 0;
    bottom: 0;
    width: 1px;
    border-left: 1px dashed currentColor;
  }
}

.right-panel {
  width: 300px;
  background: #fff;
  border-left: 1px solid #e4e7ed;
  overflow: hidden;
}

.history-item {
  .history-desc {
    margin: 4px 0 0 0;
    color: #909399;
    font-size: 12px;
  }
}

.preview-container {
  height: 70vh;
  overflow: auto;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}
</style>
