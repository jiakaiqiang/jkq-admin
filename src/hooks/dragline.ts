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

//吸附对其的指示线垂直水平
let dargLines = []
//目标元素距离拖动元素的距离
let CANVAS_GRID_SIZE= 5

interface lineType{
    x: number,
    y: number
    type:'vertical'|'horizontal'
}
export const addDragLine = (x: number, y: number,type:'vertical'|'horizontal') => {
  dargLines.push({ x, y,type })
}   
//计算鼠标点和拖动元素上下左右的位置
export const computedComponentPosition =(rect:DOMRect,mouse:{x:number,y:number})=>{
    console.log(rect,mouse)

}
const hanldeDragLine = (item:Component,x:number,y:number,canvasContentLeft:number,canvasContentTop:number,rect:DOMRect) => {
    let position = computedComponentPosition(rect,{x,y})
    //获取当前参考元素的数据
   let  documentDom =  document.getElementById(item.id) as HTMLElement
   const { width, height } = documentDom.getBoundingClientRect()
  
    //相对于画布的距离
    let offsetX = x-canvasContentLeft
    let offsetY = y-canvasContentTop
  //新top 旧top
    if(Math.abs(offsetY-item.position.y)<CANVAS_GRID_SIZE&&Math.abs(offsetY-item.position.y)>(height/2)){
        addDragLine(offsetX -item.position.x,offsetY-item.position.y,'vertical')
    }
  
  //新top 旧bottom
    if(Math.abs(offsetY-item.position.y-height)<CANVAS_GRID_SIZE&&Math.abs(offsetY-item.position.y-height)>(height/2)){
        addDragLine(offsetX -item.position.x,offsetY-item.position.y-height,'vertical')
    }
  //新bottom 旧bottom  
  
  //新bottom  旧 top
  //新left 旧left
  //新left 旧right
  //新right 旧right
  //新right 旧left
}  
export const dragline = (event: MouseEvent,AllComponent:Component[],rect:DOMRect) => {
     // 获取画布容器位置
  const canvasContent = document.querySelector('.canvas-content') as HTMLElement
  if (!canvasContent) return

  const canvasRect = canvasContent.getBoundingClientRect()
  const canvasContentLeft = canvasRect.left
  const canvasContentTop = canvasRect.top
    //拖动之前删除之前的吸附线
    if(dargLines.length>0){
        clearDragLines()
    }
    console.log(event,'eventjkq')
  const { clientX, clientY } = event
 //遍历所有的元素并 查找最近的吸附元素

 for(let i=0;i<AllComponent.length;i++){
    let item =  AllComponent[i]
    hanldeDragLine(item,clientX,clientY,canvasContentLeft,canvasContentTop,rect)


 }



  

  
}
//清楚所有指示线
export const clearDragLines = () => {
  
  dargLines = []
}