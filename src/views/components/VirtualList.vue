<template>
 <div style="height:100%;width:100%" ref="divRef">
   <canvas ref="canvasRes"  :width="canvasWidth" :height="canvasHeight"> </canvas>
 </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
//定义表头
let tableHead = 10
//定义ctx 的类型

let ctx: CanvasRenderingContext2D;
let canvasRes = ref<HTMLCanvasElement>({} as HTMLCanvasElement)
let  divRef= ref(null)
let canvasWidth = 1000
let canvasHeight =30*1000
let tableBody =10000
//利用canvas 创造表格
function createTable(i:number,j:number){
  ctx.beginPath()
  ctx.moveTo(i*100,j*30)
  ctx.lineTo((i+1)*100, j*30)
  ctx.lineTo((i+1)*100, (j+1)*30)
  ctx.lineTo(i*100, (j+1)*30)
  ctx.lineTo(i*100,j*30)
  ctx.fillStyle = 'black'
//填充文字
  ctx.fillText(`表头${j+1}`, i*100 + 20, j*30 +20)

  ctx.stroke()
   ctx.closePath()

}

onMounted(()=>{

let dpr =  window.devicePixelRatio
  console.log(dpr)
  canvasRes.value.width = canvasWidth * dpr
  canvasRes.value.height = canvasHeight * dpr
  canvasRes.value.style.width = `${canvasWidth}px`
  canvasRes.value.style.height = `${canvasHeight}px`

 ctx =  canvasRes.value.getContext('2d') as CanvasRenderingContext2D;
  if(!ctx){
    throw new Error('获取canvas上下文失败')
  }
  // 设置字体大小
  ctx.font = '16px Arial'
  // 设置文字颜色
  ctx.fillStyle = 'black'
  // 设置线条颜色
  ctx.strokeStyle = 'black'
  // 设置线条宽度
  ctx.lineWidth = 1
  // 设置缩放比例
ctx.scale(dpr, dpr)
  for(let j =0; j < tableBody;j++){
    for(let i = 0; i < tableHead;i++){
      createTable(i,j)
    }
  }
  // 创建表格

})

</script>
<style lang="scss" scoped>

</style>