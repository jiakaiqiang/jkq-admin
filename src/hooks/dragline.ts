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
let CANVAS_GRID_SIZE=2

interface lineType{
    x: number,
    y: number
    type:'vertical'|'horizontal'
}
//吸附对其的指示线垂直水平
export let dargLines = ref<lineType[]>([])
export const addDragLine = (x: number, y: number,type:'vertical'|'horizontal') => {
  dargLines.value.push({ x, y,type })
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
  const  {width,height} = getCurrentComponent(component.id)
  const {width:originWidth,height:originHeight} = getCurrentComponent(item.id)
     

  
   
  //新top 旧top
    if(Math.abs(component.position.y-item.position.y)< CANVAS_GRID_SIZE){
      //添加吸附线
        addDragLine(item.position.x,item.position.y,'vertical')
    }
  
  //新top 旧bottom    主要对于拖动元素的x,y偏移
    if(Math.abs(component.position.y-item.position.y-originHeight)< CANVAS_GRID_SIZE){
      //添加吸附线
        addDragLine(item.position.x,item.position.y+originHeight,'vertical')
    }
    
  //新bottom 旧bottom  
    if(Math.abs((item.position.y + originHeight)-(item.position.y + height) )< CANVAS_GRID_SIZE){ 
       addDragLine(item.position.x,item.position.y+originHeight,'vertical')
    }

  
  //新bottom  旧 top
    if(Math.abs(component.position.y-item.position.y-height) < CANVAS_GRID_SIZE){ 
       addDragLine(item.position.x,item.position.y,'vertical')
    }

  //新left 旧left
  if(Math.abs(component.position.x-item.position.y) < CANVAS_GRID_SIZE){
    addDragLine(item.position.x,item.position.y,'horizontal')
  }
  //新left 旧right
  if(Math.abs(component.position.x-item.position.x-originWidth) < CANVAS_GRID_SIZE){
    addDragLine(item.position.x+originWidth,item.position.y,'horizontal')
  }
  
  //新right 旧right
  if(Math.abs(component.position.x+width-item.position.x-originWidth) < CANVAS_GRID_SIZE){
    addDragLine(item.position.x+originWidth,item.position.y,'horizontal')
  }
  //新right 旧left
  if(Math.abs((component.position.x+width)-(item.position.x+originWidth)) < CANVAS_GRID_SIZE){
    addDragLine(item.position.x+originWidth,item.position.y,'horizontal')
  }
}  
/**
 * 拖动元素时 计算元素的位置 并添加吸附线
 * @param event 鼠标事件
 * @param AllComponent 所有组件
 * @param componets 当前拖动的组件
 */
export const dragline = (event: MouseEvent,AllComponent:Component[],componets:Component) => {
    clearDragLines()
     // 获取画布容器位置
  const canvasContent = document.querySelector('.canvas-content') as HTMLElement
  if (!canvasContent) return

  const canvasRect = canvasContent.getBoundingClientRect()

    
  
  
 //遍历所有的元素并 查找最近的吸附元素

 for(let i=0;i<AllComponent.length;i++){
    let item =  AllComponent[i]
    hanldeDragLine(item,componets)


 }



  

  
}
//清楚所有指示线
export const clearDragLines = () => {
  
  dargLines.value = []
}