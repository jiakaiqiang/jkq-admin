<template>
 <div class="loading-box">
  <div class="loading loading-1">
  <span>l</span>
  <span>o</span>
  <span>a</span>
  <span>d</span>
  <span>i</span>
  <span>n</span>
  <span>g</span>
  <span>.</span>
  <span>.</span>
  <span>.</span>
</div>
 </div>


</template>

<script>
export default {
  name: "Load",
};
</script>

<style lang="scss">
.loading-box{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 15, 15, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:99999;
  color:var(--el-color-primary)
}
.loading {
  margin: 100px;
  height: 100px;
  line-height: 100px;
}
.loading > span {
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: loadingWord 800ms ease-in infinite alternate;
}
/* 10个字母，每一个的延迟都不同 */
.loading-1 > span:nth-of-type(1){ animation-delay: 200ms; }
.loading-1 > span:nth-of-type(2){ animation-delay: 300ms; }
.loading-1 > span:nth-of-type(3){ animation-delay: 400ms; }
.loading-1 > span:nth-of-type(4){ animation-delay: 500ms; }
.loading-1 > span:nth-of-type(5){ animation-delay: 600ms; }
.loading-1 > span:nth-of-type(6){ animation-delay: 700ms; }
.loading-1 > span:nth-of-type(7){ animation-delay: 800ms; }
.loading-1 > span:nth-of-type(8){ animation-delay: 900ms; }
.loading-1 > span:nth-of-type(9){ animation-delay: 1000ms; }
.loading-1 > span:nth-of-type(10){ animation-delay: 1100ms; }
@keyframes loadingWord {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-16px);
  }
}

</style>
