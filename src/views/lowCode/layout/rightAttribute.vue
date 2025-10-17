<template>
  <div class="right-attribute">
    <div class="attribute-header">
      <h3>属性配置</h3>
    </div>
    
    <div class="attribute-content">
      <!-- 未选择组件时的提示 -->
      <div v-if="!component" class="empty-state">
        <div class="empty-icon">
          <i class="el-icon-setting"></i>
        </div>
        <p class="empty-text">请选择一个组件</p>
        <p class="empty-hint">在画布中点击组件进行配置</p>
      </div>

      <!-- 组件属性配置 -->
      <div v-else class="attribute-form">
        <!-- 基础信息 -->
        <div class="attribute-section">
          <div class="section-title">
            <i class="el-icon-info"></i>
            <span>基础信息</span>
          </div>
          <div class="section-content">
            <el-form-item label="组件类型">
              <el-input :value="component.type" disabled />
            </el-form-item>
            <el-form-item label="组件ID">
              <el-input :value="component.id" disabled />
            </el-form-item>
          </div>
        </div>

        <!-- 样式配置 -->
        <div class="attribute-section" v-if="hasStyleProps">
          <div class="section-title">
            <i class="el-icon-brush"></i>
            <span>样式配置</span>
          </div>
          <div class="section-content">
            <el-form 
              :model="formData" 
              label-width="80px"
              size="small"
              @submit.native.prevent
            >
              <!-- 尺寸 -->
              <template v-if="component.type !== 'Divider'">
                <el-form-item label="宽度" v-if="(styleSchema as any).width">
                  <el-input-number
                    v-model="formData.width"
                    :min="(styleSchema as any).width.min"
                    :max="(styleSchema as any).width.max"
                    controls-position="right"
                    @change="updateStyle('width', $event)"
                  />
                </el-form-item>
                
                <el-form-item label="高度" v-if="(styleSchema as any).height">
                  <el-input-number
                    v-model="formData.height"
                    :min="(styleSchema as any).height.min"
                    :max="(styleSchema as any).height.max"
                    controls-position="right"
                    @change="updateStyle('height', $event)"
                  />
                </el-form-item>
              </template>

              <!-- 颜色 -->
              <el-form-item label="背景色" v-if="(styleSchema as any).backgroundColor">
                <el-color-picker
                  v-model="formData.backgroundColor"
                  @change="updateStyle('backgroundColor', $event)"
                />
              </el-form-item>

              <el-form-item label="文字颜色" v-if="(styleSchema as any).color">
                <el-color-picker
                  v-model="formData.color"
                  @change="updateStyle('color', $event)"
                />
              </el-form-item>

              <el-form-item label="边框色" v-if="(styleSchema as any).borderColor">
                <el-color-picker
                  v-model="formData.borderColor"
                  @change="updateStyle('borderColor', $event)"
                />
              </el-form-item>

              <!-- 圆角 -->
              <el-form-item label="圆角" v-if="(styleSchema as any).borderRadius">
                <el-input-number
                  v-model="formData.borderRadius"
                  :min="(styleSchema as any).borderRadius.min"
                  :max="(styleSchema as any).borderRadius.max"
                  controls-position="right"
                  @change="updateStyle('borderRadius', $event)"
                />
              </el-form-item>

              <!-- 字体大小 -->
              <el-form-item label="字体大小" v-if="(styleSchema as any).fontSize">
                <el-input-number
                  v-model="formData.fontSize"
                  :min="(styleSchema as any).fontSize.min"
                  :max="(styleSchema as any).fontSize.max"
                  controls-position="right"
                  @change="updateStyle('fontSize', $event)"
                />
              </el-form-item>

              <!-- 字体粗细 -->
              <el-form-item label="字体粗细" v-if="(styleSchema as any).fontWeight">
                <el-select
                  v-model="formData.fontWeight"
                  @change="updateStyle('fontWeight', $event)"
                >
                  <el-option
                    v-for="option in (styleSchema as any).fontWeight.options"
                    :key="option"
                    :label="option"
                    :value="option"
                  />
                </el-select>
              </el-form-item>

              <!-- 对齐方式 -->
              <el-form-item label="对齐方式" v-if="(styleSchema as any).textAlign">
                <el-select
                  v-model="formData.textAlign"
                  @change="updateStyle('textAlign', $event)"
                >
                  <el-option
                    v-for="option in (styleSchema as any).textAlign.options"
                    :key="option"
                    :label="option"
                    :value="option"
                  />
                </el-select>
              </el-form-item>

              <!-- 行高 -->
              <el-form-item label="行高" v-if="(styleSchema as any).lineHeight">
                <el-input-number
                  v-model="formData.lineHeight"
                  :min="(styleSchema as any).lineHeight.min"
                  :max="(styleSchema as any).lineHeight.max"
                  :step="(styleSchema as any).lineHeight.step"
                  controls-position="right"
                  @change="updateStyle('lineHeight', $event)"
                />
              </el-form-item>

              <!-- 适应方式 -->
              <el-form-item label="适应方式" v-if="(styleSchema as any).objectFit">
                <el-select
                  v-model="formData.objectFit"
                  @change="updateStyle('objectFit', $event)"
                >
                  <el-option
                    v-for="option in (styleSchema as any).objectFit.options"
                    :key="option"
                    :label="option"
                    :value="option"
                  />
                </el-select>
              </el-form-item>

              <!-- 按钮类型 -->
              <el-form-item label="按钮类型" v-if="(styleSchema as any).type">
                <el-select
                  v-model="formData.type"
                  @change="updateStyle('type', $event)"
                >
                  <el-option
                    v-for="option in (styleSchema as any).type.options"
                    :key="option"
                    :label="option"
                    :value="option"
                  />
                </el-select>
              </el-form-item>

              <!-- 按钮大小 -->
              <el-form-item label="按钮大小" v-if="(styleSchema as any).size">
                <el-select
                  v-model="formData.size"
                  @change="updateStyle('size', $event)"
                >
                  <el-option
                    v-for="option in (styleSchema as any).size.options"
                    :key="option"
                    :label="option"
                    :value="option"
                  />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <!-- 数据配置 -->
        <div class="attribute-section" v-if="hasDataProps">
          <div class="section-title">
            <i class="el-icon-edit"></i>
            <span>数据配置</span>
          </div>
          <div class="section-content">
            <el-form 
              :model="formData" 
              label-width="80px"
              size="small"
              @submit.native.prevent
            >
              <!-- 文本内容 -->
              <el-form-item label="文本内容" v-if="(dataSchema as any).content">
                <el-input
                  type="textarea"
                  v-model="formData.content"
                  :rows="3"
                  @input="updateData('content', $event)"
                />
              </el-form-item>

              <!-- 按钮文字 -->
              <el-form-item label="按钮文字" v-if="(dataSchema as any).text">
                <el-input
                  v-model="formData.text"
                  @input="updateData('text', $event)"
                />
              </el-form-item>

              <!-- 图片地址 -->
              <el-form-item label="图片地址" v-if="(dataSchema as any).src">
                <el-input
                  v-model="formData.src"
                  @input="updateData('src', $event)"
                />
              </el-form-item>

              <!-- 占位符 -->
              <el-form-item label="占位符" v-if="(dataSchema as any).placeholder">
                <el-input
                  v-model="formData.placeholder"
                  @input="updateData('placeholder', $event)"
                />
              </el-form-item>

              <!-- 默认值 -->
              <el-form-item label="默认值" v-if="(dataSchema as any).value">
                <el-input
                  v-model="formData.value"
                  @input="updateData('value', $event)"
                />
              </el-form-item>

              <!-- 选项数据 -->
              <el-form-item label="选项数据" v-if="(dataSchema as any).options">
                <el-input
                  type="textarea"
                  v-model="optionsText"
                  :rows="4"
                  placeholder="请输入JSON格式的选项数据"
                  @input="updateOptions"
                />
              </el-form-item>
            </el-form>
          </div>
        </div>

        <!-- 事件配置 -->
        <div class="attribute-section" v-if="hasEventProps">
          <div class="section-title">
            <i class="el-icon-connection"></i>
            <span>事件配置</span>
          </div>
          <div class="section-content">
            <el-form 
              :model="formData" 
              label-width="80px"
              size="small"
              @submit.native.prevent
            >
              <!-- 点击事件 -->
              <el-form-item label="点击事件" v-if="(eventSchema as any).onClick">
                <el-input
                  type="textarea"
                  v-model="formData.onClick"
                  :rows="3"
                  placeholder="// JavaScript代码"
                  @input="updateEvent('onClick', $event)"
                />
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineEmits, defineProps } from 'vue'
import { ElMessage } from 'element-plus'
import schema from '../core/schma.json'

interface Component {
  id: string
  type: string
  props: Record<string, any>
  children?: Component[]
  parent?: string
}

const props = defineProps<{
  component: Component | null
}>()

const emit = defineEmits<{
  update: [props: Record<string, any>]
}>()

// 表单数据
const formData = ref<Record<string, any>>({})
const optionsText = ref('')

// 查找当前组件的schema配置
const componentSchema = computed(() => {
  if (!props.component) return null
  
  for (const group of schema.groups) {
    for (const comp of group.components) {
      if (comp.type === props.component.type) {
        return comp
      }
    }
  }
  return null
})

// 样式配置schema
const styleSchema = computed(() => {
  return componentSchema.value?.schema?.style || {}
})

// 数据配置schema
const dataSchema = computed(() => {
  return (componentSchema.value?.schema as any)?.data || {}
})

// 事件配置schema
const eventSchema = computed(() => {
  return (componentSchema.value?.schema as any)?.event || {}
})

// 是否有样式属性
const hasStyleProps = computed(() => {
  return Object.keys(styleSchema.value).length > 0
})

// 是否有数据属性
const hasDataProps = computed(() => {
  return Object.keys(dataSchema.value).length > 0
})

// 是否有事件属性
const hasEventProps = computed(() => {
  return Object.keys(eventSchema.value).length > 0
})

// 初始化表单数据
const initFormData = () => {
  if (props.component) {
    formData.value = JSON.parse(JSON.stringify(props.component.props))
    
    // 处理选项数据
    if (formData.value.options && Array.isArray(formData.value.options)) {
      optionsText.value = JSON.stringify(formData.value.options, null, 2)
    } else {
      optionsText.value = ''
    }
  } else {
    formData.value = {}
    optionsText.value = ''
  }
}

// 更新样式属性
const updateStyle = (key: string, value: any) => {
  if (props.component) {
    const updates = { [key]: value }
    emit('update', updates)
  }
}

// 更新数据属性
const updateData = (key: string, value: any) => {
  if (props.component) {
    const updates = { [key]: value }
    emit('update', updates)
  }
}

// 更新事件属性
const updateEvent = (key: string, value: any) => {
  if (props.component) {
    const updates = { [key]: value }
    emit('update', updates)
  }
}

// 更新选项数据
const updateOptions = () => {
  try {
    if (optionsText.value.trim()) {
      const options = JSON.parse(optionsText.value)
      if (Array.isArray(options)) {
        updateData('options', options)
      } else {
        ElMessage.error('选项数据必须是数组格式')
      }
    } else {
      updateData('options', [])
    }
  } catch (error) {
    ElMessage.error('JSON格式错误')
  }
}

// 监听组件变化
watch(() => props.component, () => {
  initFormData()
}, { immediate: true, deep: true })
</script>

<style scoped lang="scss">
.right-attribute {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.attribute-header {
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

.attribute-content {
  flex: 1;
  overflow-y: auto;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 300px;
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

.attribute-form {
  padding: 16px;
}

.attribute-section {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  font-weight: 600;
  color: #303133;

  i {
    margin-right: 8px;
    color: #409eff;
  }
}

.section-content {
  :deep(.el-form-item) {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(.el-form-item__label) {
    font-size: 12px;
    color: #606266;
    line-height: 1.5;
  }

  :deep(.el-input),
  :deep(.el-select),
  :deep(.el-input-number) {
    width: 100%;
  }

  :deep(.el-color-picker) {
    width: 100%;
  }

  :deep(.el-textarea) {
    .el-textarea__inner {
      resize: vertical;
      min-height: 80px;
    }
  }
}
</style>
