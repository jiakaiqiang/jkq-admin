//吸附对其的指示线垂直水平
let dargLines = []
export const addDragLine = (x: number, y: number) => {
  dargLines.push({ x, y })
}   
export const dragline = (event: DragEvent,component:Component) => {
  const { clientX, clientY } = event
}
//清楚所有指示线
export const clearDragLines = () => {
  
  dargLines = []
}