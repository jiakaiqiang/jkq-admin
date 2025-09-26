<template>
  <div class="left-schema">
    <div class="schema-header">
      <h3>组件库</h3>
    </div>
    <div class="schema-content">
      <el-collapse v-model="activeGroups" accordion>
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
      </el-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

interface Component {
  id: string
  name: string
  type: string
  icon: string
  category: string
  defaultProps: Record<string, any>
  schema: Record<string, any>
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

const props = defineProps<{
  schema: Schema
}>()

const emit = defineEmits<{
  dragStart: [component: Component, event: DragEvent]
  dragEnd: []
}>()

const activeGroups = ref<string[]>([])

const handleDragStart = (event: DragEvent, component: Component) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'copy'
    event.dataTransfer.setData('application/json', JSON.stringify(component))
  }
  emit('dragStart', component, event)
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
