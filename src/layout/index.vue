<template>
  <div style="display: flex;">
    <aside class="aside">
        <logo></logo>
    </aside> 
    <main >
        <header>xx</header>
    <div class="container">
        <router-view></router-view>
    </div>
    </main>
   
   
  </div>
</template>

<script lang='ts' setup>
</script>

<style scoped lang='scss' >
.aside{
    width:200px;
    background: #f3efef;
    height: 100vh;
}
main{
    flex: 1;
    background: #f3efef;
    height: 100vh;
}
header{
    height: 60px;
    background: #f3efef;
    line-height: 60px;
    padding-left: 20px;
    box-sizing: border-box;
}
.container{
    height:calc(100vh - 60px);
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
}

/* Your styles here */
</style>