<template>
  <div class="low-code-platform">
    <!-- 顶部工具栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <el-button-group>
          <el-button :disabled="historyIndex <= 0" @click="undo" icon="el-icon-back" size="small">
            撤销
          </el-button>
          <el-button :disabled="historyIndex >= history.length - 1" @click="redo" icon="el-icon-right" size="small">
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
          <el-button @click="exportPage" icon="el-icon-view" size="small">
            导出页面
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
        <LeftSchema v-if="activeChange === 'component'" :schema="schema" @add-component="handleAddComponent" />
      </div>

      <!-- 中间渲染区 -->
      <div class="center-panel">
        <ContentDraw :components="components" :selected-id="selectedId" @select="handleSelect" @update="handleUpdate"
        @delete="handleDelete" @drag="handleComponentDrag"
            @drag-end="handleComponentDragEnd" />
        
      </div>

      <!-- 右侧属性区 -->
      <div class="right-panel">
        <RightAttribute :component="selectedComponent" @update="handlePropertyUpdate" />
      </div>
    </div>

    <!-- 历史记录弹窗 -->
    <el-dialog title="操作历史" :visible.sync="historyDialogVisible" width="600px">
      <el-timeline>
        <el-timeline-item v-for="(record, index) in history" :key="index"
          :type="index === historyIndex ? 'primary' : 'info'" :timestamp="record.timestamp">
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
    <el-dialog title="预览" :model-value="previewVisible" width="80%" :before-close="handlePreviewClose">
      <div class="preview-container">
        <ContentDraw :components="components" :selected-id="''" :preview-mode="true" />
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
  props: Record<string, any>,
  style: Record<string, any>,
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
const draggingComponentId = ref<string>('')
const selectedComponent = computed(() => {
  return findComponentById(components.value, selectedId.value)
})
let activeChange = ref('component')
let changeActive = (val: string) => {
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
const getPageConfig = () => {
  return JSON.parse(localStorage.getItem('lowcode_data'))

}
const exportPage = () => {
  //获取总体的配置
  const pageConfig = getPageConfig()
  const template = generateTemplate(pageConfig.components)
  console.log(template,'template')

}
//style转成字符串
const styleToString = (style: Record<string, any>): string => {
  
  return Object.entries(style)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ')
}
// prop转成字符串
function propsToString(props = {}) {
  return Object.entries(props)
    .map(([k, v]) => {
      // 处理Vue指令
      if (k.startsWith('v-')) {
        // 标准v-指令如v-if, v-show等
        if (typeof v === 'boolean') {
          return k // 对于布尔值指令，只需要指令名即可
        }
        return `${k}="${v}"`
      } else if (k === "vModel") {
        // v-model 特殊处理
        return `v-model="${v}"`
      } else if (k.startsWith(':')) {
        // 已绑定的属性
        return typeof v === "string" ? `${k}="${v}"` : `${k}='${JSON.stringify(v)}'`
      } else if (k.startsWith('@')) {
        // 事件处理
        return `${k}="${v}"`
      } else if (typeof v === "string" && v.includes('{{') && v.includes('}}')) {
        // 包含插值表达式的字符串，需要使用绑定
        return `:${k}="${v.replace(/{{|}}/g, '')}"`
      } else if (typeof v === "string") {
        // 普通字符串属性
        return `${k}="${v}"`
      } else {
        // 非字符串属性，需要使用绑定
        return `:${k}='${JSON.stringify(v)}'`
      }
    })
    .join(" ")
}
let tagMap = {
  Text: 'el-text',
  Button: 'el-button',
  Image: 'el-image',
  Input: 'el-input',
  Select: 'el-select',
  Container: 'el-container',
  Divider: 'el-divider',
}
// 渲染单个组件（递归）
function renderComponent(comp: any) {
  const tag = tagMap[comp.type as keyof typeof tagMap] || 'div'
  
  // 合并props和style，确保指令能够正确处理
  const mergedProps = { ...comp.props }
  
  // 如果有style属性，将其转换为字符串并添加到mergedProps中
  if (comp.style) {
    mergedProps.style = styleToString(comp.style)
  }
  
  // 处理事件绑定，确保与propsToString兼容
  if (comp.events) {
    Object.entries(comp.events).forEach(([event, handler]) => {
      const eventName = `@${event.replace(/^on/, "").toLowerCase()}`
      mergedProps[eventName] = handler
    })
  }
  
  // 生成属性字符串
  const propsStr = propsToString(mergedProps)
  
  // 插槽渲染
  let slotContent = ""
  if (comp.slot) {
    slotContent = `<template #${comp.slot.name}>${comp.slot.content}</template>`
  }

  // 子组件递归
  let children = ""
  if (comp.children && comp.children.length > 0) {
    children = comp.children.map(renderComponent).join("\n")
  } else if (comp.props?.text) {
    // 检查text是否包含插值表达式
    if (typeof comp.props.text === 'string' && comp.props.text.includes('{{') && comp.props.text.includes('}}')) {
      // 对于包含插值的文本，使用v-html或保持原样
      children = comp.props.text
    } else {
      children = comp.props.text
    }
  }

  return `
<${tag} ${propsStr}>
  ${slotContent}
  ${children}
</${tag}>`
}
// 生成 <template>
function generateTemplate(components: any) {
  return components.map(renderComponent).join("\n")
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

// 处理添加组件
const handleAddComponent = (component: any, position: { x: number; y: number }) => {
  // 获取组件默认尺寸
  const defaultProps = component.defaultProps
  const { width: componentWidth, height: componentHeight } = getComponentSize(component.type, defaultProps)

  const newComponent: Component = {
    id: generateId(),
    type: component.type,
    style: JSON.parse(JSON.stringify(defaultProps)),
    props: JSON.parse(JSON.stringify(component?.props ?? {})),
    children: [],
    position: {
      x: position.x,
      y: position.y
    }
  }
  
  components.value.push(newComponent)
  selectedId.value = newComponent.id
  
  addToHistory('添加组件', `添加了 ${component.name} 组件`)
}

// 不再需要dragComponent和handleDragEnd

// 不再需要handleDrop函数

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
    localStorage.removeItem('lowcode_data')
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
// 移除了吸附线功能
// 处理组件拖拽移动
const handleComponentDrag = (id: string, event: MouseEvent, offset: {x: number, y: number}) => {
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
    // 使用拖拽偏移量计算组件左上角位置
    // 这样组件会从鼠标按下的位置开始移动，而不是从组件中心
    let x = mouseX - offset.x
    let y = mouseY - offset.y

    // 确保位置不为负
    component.position = {
      x: Math.max(0, x),
      y: Math.max(0, y)
    }
  }
}

// 处理组件拖拽结束
const handleComponentDragEnd = (id: string) => {
  draggingComponentId.value = ''

  const component = findComponentById(components.value, id)
  if (component) {
    addToHistory('移动组件', `移动了 ${component.type} 组件`)
  }
}

// 组件移动逻辑现在通过handleComponentDrag实时更新，不需要单独的drop处理

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
    height: 34px;
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

// 移除了吸附线样式

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
