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
const hanldeDragLine = (item:Component,x:number,y:number,canvasContentLeft:number,canvasContentTop:number) => {
    console.log(item,x,y,'jkq')
  //新top 旧top
    if(Math.abs(item.clientY-y)<CANVAS_GRID_SIZE){
        addDragLine(item.clientx-canvasContentLeft,item.clientY-canvasContentTop,'vertical')
    }
  //新top 旧bottom
  //新bottom 旧bottom   
  //新bottom  旧 top
  //新left 旧left
  //新left 旧right
  //新right 旧right
  //新right 旧left
}  
export const dragline = (event: MouseEvent,AllComponent:Component[]) => {
     // 获取画布容器位置
  const canvasContent = document.querySelector('.canvas-content') as HTMLElement
  if (!canvasContent) return

  const rect = canvasContent.getBoundingClientRect()
  const canvasContentLeft = rect.left
  const canvasContentTop = rect.top
    //拖动之前删除之前的吸附线
    if(dargLines.length>0){
        clearDragLines()
    }
    console.log(event,'eventjkq')
  const { clientX, clientY } = event
 //遍历所有的元素并 查找最近的吸附元素

 for(let i=0;i<AllComponent.length;i++){
    let item =  AllComponent[i]
    hanldeDragLine(item,clientX,clientY,canvasContentLeft,canvasContentTop)


 }



  

  
}
//清楚所有指示线
export const clearDragLines = () => {
  
  dargLines = []
}