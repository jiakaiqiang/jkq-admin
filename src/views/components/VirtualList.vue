<template>
 <div style="height:100%;width:100%" ref="divRef">
   <canvas ref="canvasRes"  :width="canvasWidth" :height="canvasHeight"> </canvas>
 </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
//定义表头
let tableHead = 10
let ctx: CanvasRenderingContext2D | null = null
let canvasRes = ref<HTMLCanvasElement | null>(null)
let  divRef= ref(null)
let canvasWidth = 1000
let canvasHeight = 800
let tableBody =1000
//利用canvas 创造表格
function createTable(i,j){
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

 ctx =  canvasRes.value.getContext('2d')
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