import {ref} from 'vue'
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


//目标元素距离拖动元素的距离
let CANVAS_GRID_SIZE=5

interface lineType{
    x: number,
    y: number
    type:'vertical'|'horizontal'
}
//吸附对其的指示线垂直水平
export let dargLines = ref<lineType[]>([])

// 存储找到的第一条吸附线
let foundLine: lineType | null = null

// 修改addDragLine函数，确保只添加一条吸附线
export const addDragLine = (x: number, y: number, type: 'vertical' | 'horizontal') => {
  // 如果还没有找到吸附线，则添加这条
  if (!foundLine) {
    foundLine = { x, y, type }
    dargLines.value = [foundLine]
  }
}   

export const getCurrentComponent =(id:string)=>{
 let documentRect =  document.getElementById(id).getBoundingClientRect()
 return {
    x:documentRect.left,
    y:documentRect.top,
    width:documentRect.width,
    height:documentRect.height
 }
}

const hanldeDragLine = (item:Component,component:Component) => {
 
  // 如果已经找到吸附线，则不再检查其他元素
  if (foundLine) return
  
  // 排除自身
  if (item?.id === component?.id) return
  
  const {width, height} = getCurrentComponent(component.id)
  const {width: originWidth, height: originHeight} = getCurrentComponent(item.id)
  
  // 垂直对齐检查（top, bottom）
  // 新top 旧top
  if (Math.abs(component.position.y - item.position.y) < CANVAS_GRID_SIZE) {
    addDragLine(0, item.position.y, 'horizontal')
    return
  }
  
  // 新top 旧bottom
  if (Math.abs(component.position.y - (item.position.y + originHeight)) < CANVAS_GRID_SIZE) {
    addDragLine(0, item.position.y + originHeight, 'horizontal')
    return
  }
  
  // 新bottom 旧bottom
  if (Math.abs((component.position.y + height) - (item.position.y + originHeight)) < CANVAS_GRID_SIZE) {
    addDragLine(0, item.position.y + originHeight, 'horizontal')
    return
  }
  
  // 新bottom 旧top
  if (Math.abs((component.position.y + height) - item.position.y) < CANVAS_GRID_SIZE) {
    addDragLine(0, item.position.y, 'horizontal')
    return
  }
  
  // 水平对齐检查（left, right）
  // 新left 旧left
  if (Math.abs(component.position.x - item.position.x) < CANVAS_GRID_SIZE) {
    addDragLine(item.position.x, 0, 'vertical')
    return
  }
  
  // 新left 旧right
  if (Math.abs(component.position.x - (item.position.x + originWidth)) < CANVAS_GRID_SIZE) {
    addDragLine(item.position.x + originWidth, 0, 'vertical')
    return
  }
  
  // 新right 旧right
  if (Math.abs((component.position.x + width) - (item.position.x + originWidth)) < CANVAS_GRID_SIZE) {
    addDragLine(item.position.x + originWidth, 0, 'vertical')
    return
  }
  
  // 新right 旧left
  if (Math.abs((component.position.x + width) - item.position.x) < CANVAS_GRID_SIZE) {
    addDragLine(item.position.x, 0, 'vertical')
    return
  }
}

/**
 * 拖动元素时 计算元素的位置 并添加吸附线
 * @param event 鼠标事件
 * @param AllComponent 所有组件
 * @param componets 当前拖动的组件
 */
export const dragline = (event: MouseEvent, AllComponent: Component[], componets: Component) => {
  // 重置找到的吸附线
  foundLine = null
  clearDragLines()
  
  // 获取画布容器位置
  const canvasContent = document.querySelector('.canvas-content') as HTMLElement
  if (!canvasContent) return

  // 遍历所有元素并查找最近的吸附元素
  for (let i = 0; i < AllComponent.length; i++) {
    let item = AllComponent[i]
    hanldeDragLine(item, componets)
    
    // 如果已经找到吸附线，则停止遍历
    if (foundLine) break
  }
}

// 清除所有指示线
export const clearDragLines = () => {
  dargLines.value = []
}