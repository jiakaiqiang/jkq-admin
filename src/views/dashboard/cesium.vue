<template>
  <div id='cesium-container' style="width: 100%; height: 100%">
    <!-- Your code here -->
  </div>
</template>

<script lang='ts' setup>
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'


onMounted(() => {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZmUwODM5Ny1lZGJiLTQ4MDgtODM5NS1iM2UxNzQ2NGRhNzUiLCJpZCI6MjM1NzgyLCJpYXQiOjE3MjQxMjg5NjF9.xaF-7WVctZIZNlNaH1Q1Aj4S2GkA6YPHwKC-ucDVApI';
    const esri = new Cesium.
ArcGisMapServerImageryProvider({url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",enablePickFeatures: false})
const viewer = new Cesium.Viewer('cesium-container', {
  imageryProvider: esri,
    // 使用默认的影像图层和地形图层
    terrainProvider: Cesium.createWorldTerrain()//{ requestWaterMask: true } 水面特效
  })
  
  console.log(viewer)
})

</script>

<style scoped lang='scss' >
/* Your styles here */
</style>